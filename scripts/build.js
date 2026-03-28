const fs = require("fs/promises");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const entryNames = [
  "index.html",
  "about.html",
  "contact.html",
  "portfolio-classic.html",
  "project-shg-calgary.html",
  "project-the-natural-nipple.html",
  "project-portfolio-system.html",
  "styles.css",
  "about.css",
  "contact.css",
  "portfolio-classic.css",
  "project.css",
  "audio.js"
];

const scanExts = new Set([".html", ".css", ".js"]);
const assetExtPattern = /\.(?:png|jpe?g|svg|mp4|mp3|woff2?|css|js|html)$/i;

function normalizePathSeparators(value) {
  return value.replace(/\\/g, "/");
}

function shouldIgnoreReference(value) {
  return !value
    || value.startsWith("http://")
    || value.startsWith("https://")
    || value.startsWith("data:")
    || value.startsWith("mailto:")
    || value.startsWith("#");
}

function shouldMinify(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return extension === ".html" || extension === ".css";
}

function minifyText(filePath, content) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".html") {
    return content
      .replace(/<!--(?!\[if)([\s\S]*?)-->/gi, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n");
  }

  if (extension === ".css") {
    return content
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n");
  }

  return content;
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

async function readSourceBuffer(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);

  try {
    return await fs.readFile(sourcePath);
  } catch (error) {
    if (error.code !== "EPERM" && error.code !== "EACCES") {
      throw error;
    }

    const fallbackUrl = `http://127.0.0.1:4173/${normalizePathSeparators(relativePath).replace(/^\/+/, "")}`;
    const response = await fetch(fallbackUrl);
    if (!response.ok) {
      throw error;
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  }
}

async function copyFileToDist(relativePath) {
  const sourcePath = path.join(rootDir, relativePath);
  const destinationPath = path.join(distDir, relativePath);
  await ensureDir(path.dirname(destinationPath));

  if (shouldMinify(sourcePath)) {
    const sourceText = (await readSourceBuffer(relativePath)).toString("utf8");
    await fs.writeFile(destinationPath, minifyText(sourcePath, sourceText), "utf8");
    return;
  }

  const fileBuffer = await readSourceBuffer(relativePath);
  await fs.writeFile(destinationPath, fileBuffer);
}

function extractLocalReferences(content) {
  const references = new Set();
  const patterns = [
    /(?:src|href|poster)=["']([^"'?#]+(?:\?[^"']*)?)["']/gi,
    /url\((?:'|")?([^'")?#]+(?:\?[^'")]+)?)(?:'|")?\)/gi,
    /["'`]([^"'`?#\r\n]+\.(?:png|jpe?g|svg|mp4|mp3|woff2?|css|js|html))(?:\?[^"'`]*)?["'`]/gi
  ];

  patterns.forEach((pattern) => {
    let match = pattern.exec(content);
    while (match) {
      const candidate = match[1].split("?")[0].trim();
      if (!shouldIgnoreReference(candidate) && assetExtPattern.test(candidate)) {
        references.add(candidate.replace(/^\/+/, ""));
      }
      match = pattern.exec(content);
    }
  });

  return references;
}

async function collectReferencedFiles(relativePaths) {
  const referencedFiles = new Set();

  for (const relativePath of relativePaths) {
    const extension = path.extname(relativePath).toLowerCase();
    if (!scanExts.has(extension)) {
      continue;
    }

    const absolutePath = path.join(rootDir, relativePath);
    const content = await fs.readFile(absolutePath, "utf8");

    for (const reference of extractLocalReferences(content)) {
      const normalizedReference = normalizePathSeparators(reference);
      const referencePath = path.join(rootDir, normalizedReference);

      if (await pathExists(referencePath)) {
        referencedFiles.add(normalizedReference);
      }
    }
  }

  return referencedFiles;
}

async function collectFilesRecursive(relativeDir, baseDir = rootDir) {
  const results = [];
  const sourceDir = path.join(baseDir, relativeDir);
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });

  for (const entry of entries) {
    const relativePath = normalizePathSeparators(path.join(relativeDir, entry.name));
    if (entry.isDirectory()) {
      results.push(...await collectFilesRecursive(relativePath, baseDir));
      continue;
    }

    results.push(relativePath);
  }

  return results;
}

async function createBuildReport() {
  const files = await collectFilesRecursive(".", distDir);
  const productionFiles = [];
  let totalBytes = 0;

  for (const file of files) {
    const stat = await fs.stat(path.join(distDir, file));
    if (!stat.isFile()) {
      continue;
    }

    productionFiles.push({
      file,
      bytes: stat.size
    });
    totalBytes += stat.size;
  }

  productionFiles.sort((left, right) => right.bytes - left.bytes);

  const report = {
    generatedAt: new Date().toISOString(),
    totalFiles: productionFiles.length,
    totalBytes,
    largestFiles: productionFiles.slice(0, 20)
  };

  await fs.writeFile(
    path.join(distDir, "build-report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8"
  );

  return report;
}

async function run() {
  await fs.rm(distDir, { recursive: true, force: true });
  await ensureDir(distDir);

  for (const entryName of entryNames) {
    await copyFileToDist(entryName);
  }

  const scannedFiles = [
    ...entryNames,
    "main.js",
    ...await collectFilesRecursive("js")
  ];

  const referencedFiles = await collectReferencedFiles(scannedFiles);
  const copiedRootAssets = new Set();

  for (const relativePath of referencedFiles) {
    if (entryNames.includes(relativePath)) {
      continue;
    }

    await copyFileToDist(relativePath);
    copiedRootAssets.add(relativePath);
  }

  const report = await createBuildReport();

  console.log(`Build complete: ${path.relative(rootDir, distDir)}`);
  console.log(`Copied ${entryNames.length} entry files.`);
  if (copiedRootAssets.size) {
    console.log(`Copied ${copiedRootAssets.size} referenced dependency file(s): ${Array.from(copiedRootAssets).join(", ")}`);
  }
  console.log(`Top production asset: ${report.largestFiles[0]?.file || "n/a"} (${report.largestFiles[0]?.bytes || 0} bytes)`);
  console.log(`Total production footprint: ${report.totalBytes} bytes across ${report.totalFiles} files.`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
