const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 4173;

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const routeAliases = new Map([
  ["/", "/index.html"],
  ["/index.html", "/index.html"],
  ["/about.html", "/about.html"],
  ["/contact.html", "/contact.html"],
  ["/project-shg-calgary.html", "/project-shg-calgary.html"],
  ["/project-portfolio-system.html", "/project-portfolio-system.html"],
  ["/projects/linxx", "/project-shg-calgary.html"],
  ["/projects/linxx/", "/project-shg-calgary.html"],
  ["/projects/portfolio-system", "/project-portfolio-system.html"],
  ["/projects/portfolio-system/", "/project-portfolio-system.html"]
]);

function getCacheControl(type) {
  if (type.startsWith("text/html") || type.startsWith("text/css") || type.startsWith("application/javascript")) {
    return "no-store";
  }

  return "public, max-age=3600";
}

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": getCacheControl(type),
    "X-Content-Type-Options": "nosniff"
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  const rawPath = decodeURIComponent(req.url.split("?")[0]);
  const requestPath = routeAliases.get(rawPath) || rawPath;
  const safePath = path.normalize(requestPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(root, safePath);

  if (!filePath.startsWith(root)) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, error.code === "ENOENT" ? 404 : 500, error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, mimeTypes[ext] || "application/octet-stream");
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
