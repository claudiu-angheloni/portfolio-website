(function () {
  const siteContent = window.SiteContent;

  if (!siteContent || !siteContent.routeTemplates || !siteContent.translations) {
    return;
  }

  const PROJECT_BODY_CLASS = "project-page project-page-dark";
  const PROJECT_PAGE_STYLE = "project.css";
  const PROJECT_THEME_COLOR = "#050608";
  const SHELTER_DRINKS_ICON_DEFS = [
    { src: "assets/portfolio/shg-project/shelter-icons-01.svg", label: "Shelter drinks icon 01", width: 28.58, height: 51.966 },
    { src: "assets/portfolio/shg-project/shelter-icons-02.svg", label: "Shelter drinks icon 02", width: 22.97, height: 48.052 },
    { src: "assets/portfolio/shg-project/shelter-icons-03.svg", label: "Shelter drinks icon 03", width: 29.382, height: 46.83 },
    { src: "assets/portfolio/shg-project/shelter-icons-04.svg", label: "Shelter drinks icon 04", width: 24.339, height: 59.513 },
    { src: "assets/portfolio/shg-project/shelter-icons-05.svg", label: "Shelter drinks icon 05", width: 29.71, height: 54.37 },
    { src: "assets/portfolio/shg-project/shelter-icons-06.svg", label: "Shelter drinks icon 06", width: 24.366, height: 55.052 },
    { src: "assets/portfolio/shg-project/shelter-icons-07.svg", label: "Shelter drinks icon 07", width: 21.434, height: 48.981 },
    { src: "assets/portfolio/shg-project/shelter-icons-08.svg", label: "Shelter drinks icon 08", width: 20.114, height: 35.328 },
    { src: "assets/portfolio/shg-project/shelter-icons-09.svg", label: "Shelter drinks icon 09", width: 35.897, height: 25.256 },
    { src: "assets/portfolio/shg-project/shelter-icons-10.svg", label: "Shelter drinks icon 10", width: 24.358, height: 42.167 },
    { src: "assets/portfolio/shg-project/shelter-icons-11.svg", label: "Shelter drinks icon 11", width: 22.658, height: 52.295 },
    { src: "assets/portfolio/shg-project/shelter-icons-12.svg", label: "Shelter drinks icon 12", width: 32.187, height: 48.951 }
  ];

  const PROJECT_SHELL = `
    <p class="corner-text corner-text-left project-corner-left corner-text-deferred" data-i18n="cornerLeft">Reach
perfection</p>
    <div class="bottom-logo footer-mark-deferred">
      <img class="bottom-logo-base" src="assets/logo.svg" alt="Claudiu Angheloni logo" width="36" height="36" decoding="async">
      <span class="bottom-logo-layer bottom-logo-layer-a" aria-hidden="true"></span>
      <span class="bottom-logo-layer bottom-logo-layer-b" aria-hidden="true"></span>
      <span class="bottom-logo-layer bottom-logo-layer-c" aria-hidden="true"></span>
    </div>
    <div class="project-scroll-indicator" aria-hidden="true">
      <span class="project-scroll-indicator-label">Scroll</span>
      <span class="project-scroll-indicator-track"></span>
      <span class="project-scroll-indicator-thumb"></span>
      <span class="project-scroll-indicator-progress">00</span>
    </div>
    <p class="corner-text corner-text-right project-corner-right corner-text-deferred" data-i18n="projectFooter">Case
study</p>
  `;

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function createDataText(lines, accent) {
    return [...lines, accent || ""].join(" ").replace(/\s+/g, " ").trim();
  }

  function createImageStyle(media) {
    const styleParts = [`--project-glitch-image: url('${media.src}')`];

    if (media.position) {
      styleParts.push(`--project-glitch-position: ${media.position}`);
      styleParts.push(`--project-media-position: ${media.position}`);
    }

    if (media.frameWidth) {
      styleParts.push(`--project-frame-max-width: ${media.frameWidth}`);
    }

    return escapeHtml(styleParts.join("; "));
  }

  function renderHeroHeading(hero) {
    const lines = hero.titleLines || [];
    const accent = hero.titleAccent || "";
    const dataText = escapeHtml(createDataText(lines, accent));
    const logoMarkup = hero.logoSrc
      ? `
        <span class="glitch-heading-line project-title-logo-line">
          <img
            class="project-title-logo"
            src="${escapeHtml(hero.logoSrc)}"
            alt="${escapeHtml(hero.logoAlt || "")}"
            width="156"
            height="121"
            loading="eager"
            decoding="async"
            style="width: clamp(108px, 12vw, 156px); height: auto; display: block;"
          >
        </span>
      `
      : "";

    return `
      <h1 class="project-contact-heading glitch-heading" data-text="${dataText}">
        ${logoMarkup}
        ${lines.map((line, index) => {
          const key = `projectHeroTitleLine${index + 1}`;

          if (accent && index === lines.length - 1) {
            return `
              <span class="glitch-heading-line glitch-heading-line-inline">
                <span data-i18n="${key}">${escapeHtml(line)}</span>
                <span class="glitch-heading-muted" data-i18n="projectHeroTitleAccent">${escapeHtml(accent)}</span>
              </span>
            `;
          }

          return `<span class="glitch-heading-line" data-i18n="${key}">${escapeHtml(line)}</span>`;
        }).join("")}
      </h1>
    `;
  }

  function renderSectionHeading(lines, keyPrefix) {
    const dataText = escapeHtml(createDataText(lines || []));

    return `
      <h2 class="project-section-title glitch-heading" data-text="${dataText}">
        ${(lines || []).map((line, index) => `
          <span class="glitch-heading-line" data-i18n="${keyPrefix}${index + 1}">${escapeHtml(line)}</span>
        `).join("")}
      </h2>
    `;
  }

  function renderHeroMedia(media) {
    if (media.type === "video") {
      const posterAttr = media.poster ? ` poster="${escapeHtml(media.poster)}"` : "";

      return `
        <div class="project-hero-media project-hero-media-main project-glitch-media project-glitch-media-video">
          <div class="project-glitch-layer project-glitch-layer-a" aria-hidden="true">
            <video class="project-glitch-clone" autoplay muted loop playsinline preload="metadata" tabindex="-1"${posterAttr}>
              <source src="${escapeHtml(media.src)}" type="video/mp4">
            </video>
          </div>
          <div class="project-glitch-layer project-glitch-layer-b" aria-hidden="true"></div>
          <div class="project-glitch-fracture project-glitch-fracture-a" aria-hidden="true"></div>
          <div class="project-glitch-fracture project-glitch-fracture-b" aria-hidden="true"></div>
          <span class="project-glitch-chip project-glitch-chip-tl" aria-hidden="true"></span>
          <span class="project-glitch-chip project-glitch-chip-br" aria-hidden="true"></span>
          <video class="project-hero-video project-glitch-media-base" autoplay muted loop playsinline preload="metadata" aria-label="${escapeHtml(media.alt || "")}"${posterAttr}>
            <source src="${escapeHtml(media.src)}" type="video/mp4">
          </video>
        </div>
      `;
    }

    return `
      <figure class="project-hero-media project-hero-media-main project-glitch-media project-glitch-media-image" style="${createImageStyle(media)}">
        <span class="project-glitch-layer project-glitch-layer-a" aria-hidden="true"></span>
        <span class="project-glitch-layer project-glitch-layer-b" aria-hidden="true"></span>
        <span class="project-glitch-fracture project-glitch-fracture-a" aria-hidden="true"></span>
        <span class="project-glitch-fracture project-glitch-fracture-b" aria-hidden="true"></span>
        <span class="project-glitch-chip project-glitch-chip-tl" aria-hidden="true"></span>
        <span class="project-glitch-chip project-glitch-chip-br" aria-hidden="true"></span>
        <img class="project-glitch-media-base" src="${escapeHtml(media.src)}" alt="${escapeHtml(media.alt || "")}" loading="eager" decoding="async">
      </figure>
    `;
  }

  function renderStats(stats) {
    return (stats || []).map((item, index) => `
      <div class="project-stat">
        <span class="project-stat-label" data-i18n="projectStatLabel${index + 1}">${escapeHtml(item.label)}</span>
        <span class="project-stat-value" data-i18n="projectStatValue${index + 1}">${escapeHtml(item.value)}</span>
      </div>
    `).join("");
  }

  function renderDetailRows(items, labelPrefix, valuePrefix) {
    return (items || []).map((item, index) => `
      <div class="project-detail-row">
        <span class="project-detail-label" data-i18n="${labelPrefix}${index + 1}">${escapeHtml(item.label)}</span>
        <span class="project-detail-value" data-i18n="${valuePrefix}${index + 1}">${escapeHtml(item.value)}</span>
      </div>
    `).join("");
  }

  function renderMarksSection(marks) {
    if (!marks || !Array.isArray(marks.items) || !marks.items.length) {
      return "";
    }

    const logosOnly = marks.items.every((item) => item && typeof item === "object" && item.logoSrc);

    return `
      <section class="project-venues reveal-block">
        <div class="project-content-shell project-content-shell-rail">
          <div class="project-copy-column">
            <div class="project-section-head">
              <span class="project-contact-kicker" data-i18n="projectMarksKicker">${escapeHtml(marks.kicker)}</span>
            </div>
            <div class="project-venues-grid${logosOnly ? " project-venues-grid-logos-only" : ""}">
              ${marks.items.map((item, index) => `
                <div
                  class="project-venue-mark${item && typeof item === "object" && item.logoSrc ? " project-venue-mark-has-logo" : ""}"
                  ${item && typeof item === "object" && item.logoSrc
                    ? `aria-label="${escapeHtml(item.logoAlt || item.label || "")}"`
                    : `data-i18n="projectMark${index + 1}"`}
                >
                  ${item && typeof item === "object" && item.logoSrc
                    ? `
                      <img
                        class="project-venue-mark-logo${item.logoClass ? ` ${escapeHtml(item.logoClass)}` : ""}"
                        src="${escapeHtml(item.logoSrc)}"
                        alt="${escapeHtml(item.logoAlt || item.label || "")}"
                        loading="lazy"
                        decoding="async"
                      >
                    `
                    : escapeHtml(item && typeof item === "object" ? item.label : item)}
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderFrameworkItems(items) {
    return (items || []).map((item, index) => {
      const itemNumber = String(index + 1).padStart(2, "0");

      return `
        <article class="project-framework-item">
          <span class="project-framework-index">${itemNumber}</span>
          <h3 data-i18n="projectFrameworkItem${index + 1}Title">${escapeHtml(item.title)}</h3>
          <p data-i18n="projectFrameworkItem${index + 1}Body">${escapeHtml(item.body)}</p>
        </article>
      `;
    }).join("");
  }

  function renderGalleryCard(item, extraClasses = "") {
    const imageClass = item.imageClass
      ? `${escapeHtml(item.imageClass)} project-glitch-media-base`
      : "project-glitch-media-base";
    const cardClassName = ["project-gallery-card", "project-glitch-media", "project-glitch-media-image", extraClasses]
      .filter(Boolean)
      .join(" ");

    return `
      <figure class="${cardClassName}" style="${createImageStyle(item)}">
        <span class="project-glitch-layer project-glitch-layer-a" aria-hidden="true"></span>
        <span class="project-glitch-layer project-glitch-layer-b" aria-hidden="true"></span>
        <span class="project-glitch-fracture project-glitch-fracture-a" aria-hidden="true"></span>
        <span class="project-glitch-fracture project-glitch-fracture-b" aria-hidden="true"></span>
        <span class="project-glitch-chip project-glitch-chip-tl" aria-hidden="true"></span>
        <span class="project-glitch-chip project-glitch-chip-br" aria-hidden="true"></span>
        <img class="${imageClass}" src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt || "")}" loading="lazy" decoding="async">
      </figure>
    `;
  }

  function renderGalleryItems(items) {
    return (items || []).map((item) => {
      if (item.layout === "pair" && Array.isArray(item.items) && item.items.length === 2) {
        const shellStyles = [];
        if (item.frameWidth) {
          shellStyles.push(`--project-frame-max-width: ${item.frameWidth}`);
        }

        return `
          <div class="project-gallery-media-band project-gallery-media-band-pair reveal-block">
            <div class="project-gallery-pair-shell"${shellStyles.length ? ` style="${escapeHtml(shellStyles.join("; "))}"` : ""}>
              ${item.items.map((pairItem, index) => renderGalleryCard(
                pairItem,
                `project-gallery-card-pair project-gallery-card-pair-${index + 1}`
              )).join("")}
            </div>
          </div>
        `;
      }

      return `
        <div class="project-gallery-media-band reveal-block">
          ${renderGalleryCard(item, "project-gallery-card-full")}
        </div>
      `;
    }).join("");
  }

  function renderGalleryFocus(content) {
    if (!content || !content.kicker || !content.href || !content.label) {
      return "";
    }

    return `
      <div class="project-gallery-focus reveal-block">
        <div class="project-gallery-focus-copy">
          <span class="project-contact-kicker" data-i18n="projectGalleryFocusKicker">${escapeHtml(content.kicker)}</span>
          <a
            class="project-gallery-focus-link"
            href="${escapeHtml(content.href)}"
            target="_blank"
            rel="noreferrer noopener"
            data-i18n="projectGalleryFocusLabel"
          >${escapeHtml(content.label)}</a>
        </div>
      </div>
    `;
  }

  function renderDrinksIconsSection(content) {
    if (!content || !Array.isArray(content.icons) || !content.icons.length) {
      return "";
    }

    return `
      <section class="project-drinks-icons">
        <div class="project-content-shell project-content-shell-rail reveal-block">
          <div class="project-copy-column">
            <div class="project-section-head">
              <span class="project-contact-kicker" data-i18n="projectDrinksIconsKicker">${escapeHtml(content.kicker)}</span>
            </div>
            <p class="project-overview-lead" data-i18n="projectDrinksIconsBody">${escapeHtml(content.body)}</p>
            <div class="project-drinks-icons-grid">
              ${content.icons.map((icon) => `
                <figure
                  class="project-drinks-icon"
                  aria-label="${escapeHtml(icon.label)}"
                  style="--icon-width: ${escapeHtml(icon.width)}; --icon-height: ${escapeHtml(icon.height)};"
                >
                  <img
                    src="${escapeHtml(icon.src)}"
                    alt="${escapeHtml(icon.label)}"
                    loading="lazy"
                    decoding="async"
                  >
                </figure>
              `).join("")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function renderOutcomeItems(items) {
    return (items || []).map((item, index) => `
      <p data-i18n="projectOutcomeItem${index + 1}">${escapeHtml(item)}</p>
    `).join("");
  }
  function renderCreditsSection(credits) {
    if (!credits || !Array.isArray(credits.items) || !credits.items.length) {
      return "";
    }

    return `
      <section class="project-overview project-credits reveal-block">
        <div class="project-content-shell project-content-shell-rail">
          <div class="project-copy-column">
            <div class="project-section-head">
              <span class="project-contact-kicker" data-i18n="projectCreditsKicker">${escapeHtml(credits.kicker)}</span>
            </div>
            <div class="project-detail-table">
              ${renderDetailRows(credits.items, "projectCreditLabel", "projectCreditValue")}
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function createProjectDictionary(content) {
    const dictionary = {
      projectFooter: content.footer,
      projectHeroKicker: content.hero.kicker,
      projectHeroTitleAccent: content.hero.titleAccent || "",
      projectOverviewKicker: content.overview.kicker,
      projectOverviewLead: content.overview.lead,
      projectFrameworkKicker: content.framework.kicker,
      projectGalleryKicker: content.gallery.kicker,
      projectGalleryIntro: content.gallery.intro,
      projectOutcomeKicker: content.outcomes.kicker,
      projectExploreLink: content.explore.link
    };

    (content.hero.titleLines || []).forEach((line, index) => {
      dictionary[`projectHeroTitleLine${index + 1}`] = line;
    });

    (content.overview.stats || []).forEach((item, index) => {
      dictionary[`projectStatLabel${index + 1}`] = item.label;
      dictionary[`projectStatValue${index + 1}`] = item.value;
    });

    (content.overview.details || []).forEach((item, index) => {
      dictionary[`projectDetailLabel${index + 1}`] = item.label;
      dictionary[`projectDetailValue${index + 1}`] = item.value;
    });

    if (content.marks && Array.isArray(content.marks.items) && content.marks.items.length) {
      dictionary.projectMarksKicker = content.marks.kicker;
      content.marks.items.forEach((item, index) => {
        dictionary[`projectMark${index + 1}`] = item && typeof item === "object" ? item.label : item;
      });
    }

    if (content.gallery && content.gallery.focus) {
      dictionary.projectGalleryFocusKicker = content.gallery.focus.kicker;
      dictionary.projectGalleryFocusLabel = content.gallery.focus.label;
    }

    if (content.drinksIcons) {
      dictionary.projectDrinksIconsKicker = content.drinksIcons.kicker;
      dictionary.projectDrinksIconsBody = content.drinksIcons.body;
    }

    (content.framework.titleLines || []).forEach((line, index) => {
      dictionary[`projectFrameworkTitleLine${index + 1}`] = line;
    });

    (content.framework.items || []).forEach((item, index) => {
      dictionary[`projectFrameworkItem${index + 1}Title`] = item.title;
      dictionary[`projectFrameworkItem${index + 1}Body`] = item.body;
    });

    (content.outcomes.titleLines || []).forEach((line, index) => {
      dictionary[`projectOutcomeTitleLine${index + 1}`] = line;
    });

    (content.outcomes.items || []).forEach((item, index) => {
      dictionary[`projectOutcomeItem${index + 1}`] = item;
    });

    if (content.credits && Array.isArray(content.credits.items) && content.credits.items.length) {
      dictionary.projectCreditsKicker = content.credits.kicker;
      content.credits.items.forEach((item, index) => {
        dictionary[`projectCreditLabel${index + 1}`] = item.label;
        dictionary[`projectCreditValue${index + 1}`] = item.value;
      });
    }

    return dictionary;
  }

  function createProjectTemplate(definition) {
    const content = definition.locales.en;

    return {
      route: definition.routeId,
      path: definition.path,
      aliases: definition.aliases.slice(),
      bodyClass: PROJECT_BODY_CLASS,
      pageStyle: PROJECT_PAGE_STYLE,
      title: definition.title,
      description: definition.description,
      themeColor: PROJECT_THEME_COLOR,
      shell: PROJECT_SHELL,
      page: `
        <div class="page-shell">
          <div class="project-scroll-shell">
            <main class="project-layout">
              <section class="project-intro">
                <div class="project-contact-layout">
                  <aside class="project-contact-rail" aria-hidden="true">
                    <div class="project-contact-rail-stack">
                      <div class="project-contact-rail-word">${escapeHtml(definition.rail.primary)}</div>
                      <div class="project-contact-rail-divider"></div>
                      <div class="project-contact-rail-word project-contact-rail-word-secondary">${escapeHtml(definition.rail.secondary)}</div>
                    </div>
                  </aside>

                  <section class="project-contact-content">
                    <div class="project-contact-intro reveal-block is-visible">
                      <div class="project-contact-intro-meta">
                        <span class="project-contact-kicker" data-i18n="projectHeroKicker">${escapeHtml(content.hero.kicker)}</span>
                      </div>

                      <div class="project-contact-stage">
                        <div class="project-contact-stage-head">
                          ${renderHeroHeading(content.hero)}
                          <p class="project-contact-watermark" aria-hidden="true">${escapeHtml(content.hero.watermark)}</p>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </section>

              <section class="project-hero-media-section reveal-block is-visible">
                <div class="project-hero-media-band">
                  ${renderHeroMedia(definition.heroMedia)}
                </div>
              </section>

              <section class="project-overview reveal-block">
                <div class="project-content-shell project-content-shell-rail">
                  <div class="project-copy-column">
                    <div class="project-section-head">
                      <span class="project-contact-kicker" data-i18n="projectOverviewKicker">${escapeHtml(content.overview.kicker)}</span>
                    </div>
                    <div class="project-overview-grid">
                      <p class="project-overview-lead" data-i18n="projectOverviewLead">${escapeHtml(content.overview.lead)}</p>
                      <div class="project-overview-stats">
                        ${renderStats(content.overview.stats)}
                      </div>
                    </div>

                    <div class="project-detail-table">
                      ${renderDetailRows(content.overview.details, "projectDetailLabel", "projectDetailValue")}
                    </div>
                  </div>
                </div>
              </section>

              ${renderMarksSection(content.marks)}

              <section class="project-framework reveal-block">
                <div class="project-content-shell project-content-shell-rail">
                  <div class="project-copy-column">
                    <div class="project-section-head">
                      <span class="project-contact-kicker" data-i18n="projectFrameworkKicker">${escapeHtml(content.framework.kicker)}</span>
                    </div>
                    <div class="project-framework-grid">
                      ${renderSectionHeading(content.framework.titleLines, "projectFrameworkTitleLine")}
                      <div class="project-framework-list">
                        ${renderFrameworkItems(content.framework.items)}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section class="project-gallery">
                <div class="project-content-shell project-content-shell-rail reveal-block">
                  <div class="project-copy-column">
                    <div class="project-section-head">
                      <span class="project-contact-kicker" data-i18n="projectGalleryKicker">${escapeHtml(content.gallery.kicker)}</span>
                    </div>
                    <p class="project-overview-lead" data-i18n="projectGalleryIntro">${escapeHtml(content.gallery.intro)}</p>
                  </div>
                </div>
                <div class="project-gallery-media-band">
                  ${renderGalleryFocus(content.gallery.focus)}
                </div>
                <div class="project-gallery-media-stack">
                  ${renderGalleryItems(definition.gallery)}
                </div>
              </section>

              ${renderDrinksIconsSection(content.drinksIcons)}

              <section class="project-outcomes reveal-block">
                <div class="project-content-shell project-content-shell-rail">
                  <div class="project-copy-column">
                    <div class="project-section-head">
                      <span class="project-contact-kicker" data-i18n="projectOutcomeKicker">${escapeHtml(content.outcomes.kicker)}</span>
                    </div>
                    <div class="project-outcomes-grid">
                      ${renderSectionHeading(content.outcomes.titleLines, "projectOutcomeTitleLine")}
                      <div class="project-outcomes-list">
                        ${renderOutcomeItems(content.outcomes.items)}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              ${renderCreditsSection(content.credits)}

              <section class="project-explore reveal-block">
                <div class="project-content-shell project-content-shell-rail">
                  <div class="project-copy-column">
                    <a class="project-explore-link" href="index.html#portfolio" data-i18n="projectExploreLink">
                      <span class="project-explore-link-label">${escapeHtml(content.explore.link)}</span>
                    </a>
                  </div>
                </div>
              </section>
            </main>
          </div>
        </div>
      `
    };
  }

  const caseStudies = [
    {
      routeId: "projectShgCalgary",
      pinId: "calgary-ca",
      path: "/project-shg-calgary.html",
      aliases: ["/projects/linxx", "/projects/linxx/", "/project-shg-calgary.html"],
      title: "Syndicate Hospitality Group | Claudiu Angheloni",
      description: "A dedicated case study exploring hospitality brand systems, menus, campaigns and immersive guest-facing design work created for Syndicate Hospitality Group.",
      rail: {
        primary: "PROJECT",
        secondary: "ONE"
      },
      heroMedia: {
        type: "video",
        src: "assets/portfolio/shg-project/shg-1.mp4",
        poster: "assets/portfolio/shg-project/calgary.png",
        alt: "Syndicate Hospitality Group hero reel"
      },
      gallery: [
        {
          src: "assets/portfolio/shg-project/shelter-01.jpg",
          alt: "Shelter Cocktail Bar hospitality brand application overview",
          position: "50% 50%",
          frameWidth: "1440px"
        },
        {
          layout: "pair",
          frameWidth: "1440px",
          items: [
            {
              src: "assets/portfolio/shg-project/shelter-02.jpg",
              alt: "Shelter Cocktail Bar branded print detail",
              position: "50% 50%"
            },
            {
              src: "assets/portfolio/shg-project/shelter-04.jpg",
              alt: "Shelter Cocktail Bar branded collateral detail",
              position: "50% 50%"
            }
          ]
        },
        {
          src: "assets/portfolio/shg-project/shelter-03.png",
          alt: "Shelter Cocktail Bar menu and identity presentation",
          position: "50% 50%",
          frameWidth: "1440px"
        },
        {
          src: "assets/portfolio/shg-project/shelter-06.jpg",
          alt: "Shelter Cocktail Bar brand system surface",
          position: "50% 50%",
          frameWidth: "1440px"
        },
        {
          layout: "pair",
          frameWidth: "1440px",
          items: [
            {
              src: "assets/portfolio/shg-project/shelter-05.jpg",
              alt: "Shelter Cocktail Bar menu composition detail",
              position: "50% 50%"
            },
            {
              src: "assets/portfolio/shg-project/shelter-07.jpg",
              alt: "Shelter Cocktail Bar campaign framing detail",
              position: "50% 50%"
            }
          ]
        },
        {
          src: "assets/portfolio/shg-project/shelter-08.png",
          alt: "Shelter Cocktail Bar hospitality brand presentation wide layout",
          position: "50% 50%",
          frameWidth: "1440px"
        }
      ],
      panel: {
        title: "Syndicate Hospitality Group",
        clientName: "SHG - Syndicate Hospitality Group",
        meta: "Brand systems / hospitality / campaigns",
        year: "2017 - Present",
        status: "Active collaboration",
        description: "Visual systems for hospitality concepts, launch assets, menus, event moments and high-touch brand storytelling tailored for premium guest experiences.",
        mediaType: "video",
        mediaSrc: "assets/portfolio/shg-project/shg-1.mp4",
        mediaPoster: "assets/portfolio/shg-project/calgary.png",
        highlights: [
          "Identity evolution across multiple restaurant brands",
          "Menu systems and seasonal campaign rollout",
          "Immersive brand moments for in-venue touchpoints"
        ],
        ctaHref: "/project-shg-calgary.html",
        ctaLabel: "See the full project"
      },
      locales: {
        en: {
          footer: "Case\nstudy",
          hero: {
            kicker: "Hospitality brand system",
            titleLines: ["SYNDICATE", "HOSPITALITY", "GROUP"],
            titleAccent: "(SHG)",
            watermark: "SHG"
          },
          overview: {
            kicker: "Overview",
            lead: "A hospitality design system shaped to feel elevated and cinematic while staying useful across menus, launches, seasonal campaigns and venue touchpoints.",
            stats: [
              { label: "Deliverables", value: "Menus, campaign assets, identity extensions" },
              { label: "Focus", value: "Consistency across venues without flattening personality" },
              { label: "Tone", value: "Premium, atmospheric, guest-centered" }
            ],
            details: [
              { label: "Location", value: "Calgary, Alberta, Canada" },
              { label: "Collaboration", value: "2017 - Present" },
              { label: "Industry", value: "Hospitality / Food & Beverage" },
              { label: "Services", value: "Brand systems, menu design, campaigns, launch assets, print and venue touchpoints" }
            ]
          },
          marks: {
            kicker: "Venues included",
            items: [
              {
                label: "SHELTER COCKTAIL BAR",
                logoSrc: "assets/portfolio/shg-project/shelter-logo.svg",
                logoAlt: "Shelter Cocktail Bar logo",
                logoClass: "project-venue-mark-logo-shelter"
              },
              {
                label: "FORTUNA'S ROW",
                logoSrc: "assets/portfolio/shg-project/fortunas-row-logo.svg",
                logoAlt: "Fortuna's Row logo",
                logoClass: "project-venue-mark-logo-fortunas-row"
              }
            ]
          },
          framework: {
            kicker: "Goals of the project",
            titleLines: ["BUILT TO SCALE", "WITH ATMOSPHERE"],
            items: [
              {
                title: "Create consistency across multiple hospitality brands",
                body: "Establish a shared standard of polish, typography and art direction while allowing each venue to preserve its own mood and personality."
              },
              {
                title: "Turn everyday assets into part of the guest experience",
                body: "Menus, event pieces and printed materials were designed to feel integrated into the atmosphere rather than treated as support collateral."
              },
              {
                title: "Build a flexible system for launches and seasonal refreshes",
                body: "The structure needed to support iteration, campaign updates and future venue expansion without sacrificing quality or coherence."
              }
            ]
          },
          gallery: {
            kicker: "Selected work",
            intro: "A Shelter-focused sequence to preview how the SHG case study can open up into venue-specific visual chapters without losing the pacing of the larger system.",
            focus: {
              kicker: "Shelter Cocktail Bar",
              href: "https://shelteryyc.com/",
              label: "shelteryyc.com"
            }
          },
          drinksIcons: {
            kicker: "Drinks icons",
            body: "A modular icon language for presenting glassware, ingredients and drink details in a way that feels tactile, inventive and unmistakably Shelter.",
            icons: SHELTER_DRINKS_ICON_DEFS
          },
          outcomes: {
            kicker: "Outcome",
            titleLines: ["A SYSTEM FOR", "GROWTH AND", "ATMOSPHERE"],
            items: [
              "A clearer and more premium guest-facing brand presence across venues, campaigns and service materials.",
              "Design assets that feel cinematic and intentional while remaining practical for ongoing rollout and iteration.",
              "A scalable visual framework that supports launches, refinements and future concepts without losing consistency."
            ]
          },
          credits: {
            kicker: "Project details",
            items: [
              { label: "Role", value: "Senior Graphic Designer" },
              { label: "Collaboration model", value: "Embedded long-term partner" },
              { label: "Core surfaces", value: "Menus, campaigns, print, venue moments" },
              { label: "Status", value: "Active collaboration" }
            ]
          },
          explore: {
            link: "Explore my work"
          }
        },
        ro: {
          footer: "Studiu\nde caz",
          hero: {
            kicker: "Sistem de brand pentru hospitality",
            titleLines: ["SYNDICATE", "HOSPITALITY", "GROUP"],
            titleAccent: "(SHG)",
            watermark: "SHG"
          },
          overview: {
            kicker: "Overview",
            lead: "Un sistem de design pentru hospitality gandit sa para elevat si cinematic, dar sa ramana util in meniuri, lansari, campanii sezoniere si touchpoint-uri de venue.",
            stats: [
              { label: "Deliverables", value: "Meniuri, asset-uri de campanie, extensii de identitate" },
              { label: "Focus", value: "Coerenta intre venue-uri fara sa piarda personalitatea" },
              { label: "Ton", value: "Premium, atmosferic, centrat pe experienta" }
            ],
            details: [
              { label: "Locatie", value: "Calgary, Alberta, Canada" },
              { label: "Colaborare", value: "2017 - Prezent" },
              { label: "Industrie", value: "Hospitality / Food & Beverage" },
              { label: "Servicii", value: "Sisteme de brand, design de meniu, campanii, asset-uri de lansare, print si touchpoint-uri de venue" }
            ]
          },
          marks: {
            kicker: "Venues incluse",
            items: [
              {
                label: "SHELTER COCKTAIL BAR",
                logoSrc: "assets/portfolio/shg-project/shelter-logo.svg",
                logoAlt: "Shelter Cocktail Bar logo",
                logoClass: "project-venue-mark-logo-shelter"
              },
              {
                label: "FORTUNA'S ROW",
                logoSrc: "assets/portfolio/shg-project/fortunas-row-logo.svg",
                logoAlt: "Fortuna's Row logo",
                logoClass: "project-venue-mark-logo-fortunas-row"
              }
            ]
          },
          framework: {
            kicker: "Obiectivele proiectului",
            titleLines: ["CONSTRUIT SA CREASCA", "CU ATMOSFERA"],
            items: [
              {
                title: "Sa creeze consistenta intre mai multe branduri hospitality",
                body: "Sa stabileasca un standard comun de polish, tipografie si directie vizuala, permitand totodata fiecarui venue sa-si pastreze propria stare si personalitate."
              },
              {
                title: "Sa transforme asset-urile de zi cu zi in parte din experienta guest-ului",
                body: "Meniurile, piesele de eveniment si materialele printate au fost gandite ca extensii ale atmosferei, nu ca simple materiale de suport."
              },
              {
                title: "Sa construiasca un sistem flexibil pentru lansari si refresh-uri sezoniere",
                body: "Structura trebuia sa sustina iteratia, actualizarile de campanie si extinderea viitoare fara sa sacrifice calitatea sau coerenta."
              }
            ]
          },
          gallery: {
            kicker: "Lucrari selectate",
            intro: "O secventa concentrata pe Shelter, gandita ca preview pentru felul in care studiul de caz SHG poate fi deschis in capitole vizuale dedicate fiecarui venue fara sa piarda ritmul general.",
            focus: {
              kicker: "Shelter Cocktail Bar",
              href: "https://shelteryyc.com/",
              label: "shelteryyc.com"
            }
          },
          drinksIcons: {
            kicker: "Drinks icons",
            body: "Un limbaj modular de iconuri gandit sa prezinte pahare, ingrediente si detalii de bauturi intr-un mod tactil, inventiv si recognoscibil Shelter.",
            icons: SHELTER_DRINKS_ICON_DEFS
          },
          outcomes: {
            kicker: "Rezultat",
            titleLines: ["UN SISTEM PENTRU", "CRESTERE SI", "ATMOSFERA"],
            items: [
              "O prezenta de brand mai clara si mai premium in venue-uri, campanii si materiale orientate catre experienta guest-ului.",
              "Asset-uri de design care se simt cinematice si intentionate, dar raman practice pentru rollout si iteratie constanta.",
              "Un cadru vizual scalabil care sustine lansari, rafinari si concepte noi fara sa piarda consistenta."
            ]
          },
          credits: {
            kicker: "Detalii proiect",
            items: [
              { label: "Rol", value: "Senior Graphic Designer" },
              { label: "Model de colaborare", value: "Partener integrat pe termen lung" },
              { label: "Suprafete cheie", value: "Meniuri, campanii, print, momente de venue" },
              { label: "Status", value: "Colaborare activa" }
            ]
          },
          explore: {
            link: "Exploreaza proiectele"
          }
        }
      }
    },
    {
      routeId: "projectPortfolioSystem",
      pinId: "lugoj-ro",
      path: "/project-portfolio-system.html",
      aliases: ["/projects/portfolio-system", "/projects/portfolio-system/", "/project-portfolio-system.html"],
      title: "Portfolio System | Claudiu Angheloni",
      description: "A case study of the Claudiu Angheloni portfolio system, blending cinematic interaction, modular content architecture and a custom-built frontend shell.",
      rail: {
        primary: "PROJECT",
        secondary: "TWO"
      },
      heroMedia: {
        type: "image",
        src: "portfolio-state.png",
        alt: "Claudiu Angheloni portfolio system overview",
        position: "50% 62%",
        frameWidth: "1440px"
      },
      gallery: [
        {
          src: "home-desktop.png",
          alt: "Home scene of the Claudiu Angheloni portfolio",
          position: "50% 50%",
          frameWidth: "1440px"
        },
        {
          layout: "pair",
          frameWidth: "1440px",
          items: [
            {
              src: "about-desktop-mid.png",
              alt: "About page editorial layout focused on the chapter marker and title",
              position: "28% 50%"
            },
            {
              src: "about-desktop-mid.png",
              alt: "About page editorial layout focused on the story body and oversized year marker",
              position: "72% 50%"
            }
          ]
        },
        {
          src: "contact-desktop.png",
          alt: "Contact page interaction surface",
          position: "50% 50%",
          frameWidth: "1440px"
        }
      ],
      panel: {
        title: "Claudiu Angheloni Portfolio System",
        clientName: "Claudiu Angheloni",
        meta: "Art direction / frontend system / motion language",
        year: "2026",
        status: "In active development",
        description: "A self-initiated portfolio system built to feel cinematic, modular and scalable, turning personal presentation into a stronger case-study platform.",
        mediaType: "image",
        mediaSrc: "portfolio-state.png",
        highlights: [
          "Globe-led home scene and interactive portfolio focus",
          "Bilingual route system with modular page architecture",
          "A reusable case-study layer for future client work"
        ],
        ctaHref: "/project-portfolio-system.html",
        ctaLabel: "See the full project"
      },
      locales: {
        en: {
          footer: "Case\nstudy",
          hero: {
            kicker: "Portfolio system / art direction / frontend build",
            titleLines: ["PORTFOLIO", "SYSTEM"],
            titleAccent: "(CA)",
            watermark: "CA"
          },
          overview: {
            kicker: "Overview",
            lead: "A personal portfolio rebuilt as a presentation system: globe-led navigation, bilingual routing, modular content and a case-study structure designed to scale without losing atmosphere.",
            stats: [
              { label: "Deliverables", value: "Interface system, motion direction, content architecture" },
              { label: "Focus", value: "Turn a personal site into a living, authored showcase" },
              { label: "Stack", value: "Vanilla JS, Three.js, modular frontend architecture" }
            ],
            details: [
              { label: "Location", value: "Lugoj, Romania" },
              { label: "Timeline", value: "2026 - Current" },
              { label: "Type", value: "Personal brand / portfolio system" },
              { label: "Services", value: "Creative direction, UI systems, motion, frontend development" }
            ]
          },
          marks: {
            kicker: "System surfaces",
            items: ["HOME SCENE", "ABOUT TIMELINE", "CONTACT DESK", "PROJECT PAGES"]
          },
          framework: {
            kicker: "Goals of the project",
            titleLines: ["BUILT FOR", "IMMERSION AND", "EXPANSION"],
            items: [
              {
                title: "Give the first screen one unforgettable idea",
                body: "The home page had to behave like a poster with depth: globe, stars, wordmark and minimal UI working as one composition."
              },
              {
                title: "Keep every route distinct while preserving one language",
                body: "About, contact and project pages shift tone, but stay tied together through typography, pacing, grids and controlled motion."
              },
              {
                title: "Turn one custom case study into a reusable system",
                body: "The site needed a content layer that could absorb future projects without rebuilding templates or weakening the visual direction."
              }
            ]
          },
          gallery: {
            kicker: "Selected surfaces",
            intro: "Each surface handles a different job: home as poster, about as editorial rhythm, contact as interaction desk and project pages as proof structure."
          },
          outcomes: {
            kicker: "Outcome",
            titleLines: ["A PORTFOLIO", "THAT FEELS", "AUTHORED"],
            items: [
              "A stronger first impression built around one visual thesis instead of a generic portfolio layout.",
              "A modular frontend shell that can grow into more case studies without collapsing into one-off pages.",
              "A clearer bridge between visual identity, interaction design and the actual proof of work."
            ]
          },
          credits: {
            kicker: "Project details",
            items: [
              { label: "Role", value: "Creative direction, design, frontend engineering" },
              { label: "Motion language", value: "CSS choreography and custom runtime behaviors" },
              { label: "Core tools", value: "HTML, CSS, Vanilla JS, Three.js" },
              { label: "Status", value: "In active development" }
            ]
          },
          explore: {
            link: "Explore my work"
          }
        },
        ro: {
          footer: "Studiu\nde caz",
          hero: {
            kicker: "Sistem de portofoliu / art direction / frontend build",
            titleLines: ["PORTOFOLIU", "SYSTEM"],
            titleAccent: "(CA)",
            watermark: "CA"
          },
          overview: {
            kicker: "Overview",
            lead: "Un portofoliu reconstruit ca sistem de prezentare: navigare condusa de globe, routing bilingv, continut modular si o structura de studii de caz gandita sa scaleze fara sa piarda atmosfera.",
            stats: [
              { label: "Deliverables", value: "Sistem de interfata, directie de motion, arhitectura de continut" },
              { label: "Focus", value: "Transformarea unui site personal intr-un showcase viu si autoral" },
              { label: "Stack", value: "Vanilla JS, Three.js, arhitectura frontend modulara" }
            ],
            details: [
              { label: "Locatie", value: "Lugoj, Romania" },
              { label: "Perioada", value: "2026 - Prezent" },
              { label: "Tip", value: "Brand personal / sistem de portofoliu" },
              { label: "Servicii", value: "Creative direction, UI systems, motion, frontend development" }
            ]
          },
          marks: {
            kicker: "Suprafete ale sistemului",
            items: ["SCENA HOME", "TIMELINE ABOUT", "DESK CONTACT", "PAGINI DE PROIECT"]
          },
          framework: {
            kicker: "Obiectivele proiectului",
            titleLines: ["CONSTRUIT PENTRU", "IMERSIUNE SI", "EXTINDERE"],
            items: [
              {
                title: "Sa dea primului ecran o idee imposibil de confundat",
                body: "Home-ul trebuia sa functioneze ca un poster cu profunzime: globe, stele, wordmark si UI minim lucrand intr-o singura compozitie."
              },
              {
                title: "Sa mentina fiecare ruta distincta, dar in aceeasi limba vizuala",
                body: "About, contact si paginile de proiect isi schimba tonul, dar raman legate prin tipografie, ritm, grid si motion controlat."
              },
              {
                title: "Sa transforme un studiu de caz custom intr-un sistem reutilizabil",
                body: "Site-ul avea nevoie de un layer de continut care sa poata absorbi proiecte noi fara sa reconstruiasca template-uri sau sa slabeasca directia vizuala."
              }
            ]
          },
          gallery: {
            kicker: "Suprafete selectate",
            intro: "Fiecare suprafata are o functie clara: home ca poster, about ca ritm editorial, contact ca desk de interactiune si paginile de proiect ca structura de proof."
          },
          outcomes: {
            kicker: "Rezultat",
            titleLines: ["UN PORTOFOLIU", "CARE PARE", "AUTORAL"],
            items: [
              "O prima impresie mai puternica, construita in jurul unei singure teze vizuale, nu a unui layout generic de portofoliu.",
              "Un shell frontend modular care poate creste catre mai multe studii de caz fara sa se transforme in pagini disparate.",
              "O legatura mai clara intre identitatea vizuala, interaction design si dovada reala a muncii."
            ]
          },
          credits: {
            kicker: "Detalii proiect",
            items: [
              { label: "Rol", value: "Creative direction, design, frontend engineering" },
              { label: "Limbaj de motion", value: "Coregrafie CSS si comportamente runtime custom" },
              { label: "Unelte cheie", value: "HTML, CSS, Vanilla JS, Three.js" },
              { label: "Status", value: "In dezvoltare activa" }
            ]
          },
          explore: {
            link: "Exploreaza proiectele"
          }
        }
      }
    },
    {
      routeId: "projectTheNaturalNipple",
      pinId: "florida-us",
      path: "/project-the-natural-nipple.html",
      aliases: ["/projects/the-natural-nipple", "/projects/the-natural-nipple/", "/project-the-natural-nipple.html"],
      title: "The Natural Nipple | Claudiu Angheloni",
      description: "A complete brand and product design project developed in Florida, translating a complex research-driven feeding system into a clear and emotionally reassuring experience.",
      rail: {
        primary: "PROJECT",
        secondary: "THREE"
      },
      heroMedia: {
        type: "image",
        src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-hero-02.png",
        alt: "The Natural Nipple cinematic hero image",
        position: "50% 50%",
        frameWidth: "1440px"
      },
      gallery: [
        {
          src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-06.png",
          alt: "The Natural Nipple product and packaging overview",
          position: "50% 50%",
          frameWidth: "1440px"
        },
        {
          layout: "pair",
          frameWidth: "1440px",
          items: [
            {
              src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-03.png",
              alt: "The Natural Nipple product system detail image",
              position: "50% 50%"
            },
            {
              src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-01.png",
              alt: "The Natural Nipple product and packaging portrait composition",
              position: "50% 50%"
            }
          ]
        },
        {
          src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-08.png",
          alt: "The Natural Nipple cinematic lifestyle composition",
          position: "50% 50%",
          frameWidth: "1440px"
        }
      ],
      panel: {
        title: "The Natural Nipple",
        clientName: "The Natural Nipple",
        meta: "Branding / packaging / product visualization",
        year: "2022",
        status: "thenaturalnipple.com",
        description: "A complete brand and product design project developed in Florida, focused on translating a complex, research-driven feeding system into a clear, intuitive, and emotionally reassuring experience.",
        mediaType: "image",
        mediaSrc: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-01.png",
        highlights: [
          "End-to-end design direction across brand, packaging and visualization",
          "Minimal, human and intentional design that reduces noise",
          "Warm cinematic art direction with premium minimal compositions"
        ],
        ctaHref: "/projects/the-natural-nipple",
        ctaLabel: "See the full project"
      },
      locales: {
        en: {
          footer: "Case\nstudy",
          hero: {
            kicker: "Designing a feeding system that feels natural.",
            titleLines: ["THE NATURAL", "NIPPLE"],
            titleAccent: "",
            watermark: "TNN",
            logoSrc: "assets/portfolio/the-natural-nipple-project/logo/naturalNipple_secondary_color-logo.svg",
            logoAlt: "The Natural Nipple logo"
          },
          overview: {
            kicker: "Overview",
            lead: "A complete brand and product design project developed in Florida, focused on translating a complex, research-driven feeding system into a clear, intuitive, and emotionally reassuring experience.",
            stats: [
              { label: "System", value: "The Natural Nipple is a fully customizable infant feeding system built around natural breastfeeding principles - shape, feel, and flow." },
              { label: "Focus", value: "In 2022, the project focused on transforming a complex concept into a refined and accessible brand experience." },
              { label: "Approach", value: "Minimal, human, and intentional design focused on reducing noise and improving clarity." }
            ],
            details: [
              { label: "Location", value: "Florida" },
              { label: "Year", value: "2022" },
              { label: "Website", value: "thenaturalnipple.com" },
              { label: "My role", value: "End-to-end design direction including branding, packaging, product visualization, and art direction." }
            ]
          },
          framework: {
            kicker: "Key decisions",
            titleLines: ["CLARITY THROUGH", "SOFTNESS AND", "STRUCTURE"],
            items: [
              {
                title: "Challenge",
                body: "Simplifying a complex, research-driven product while maintaining trust, clarity, and emotional softness."
              },
              {
                title: "Approach",
                body: "Minimal, human, and intentional design focused on reducing noise and improving clarity."
              },
              {
                title: "Packaging",
                body: "Cylindrical packaging system with clear hierarchy, structured information, and strong visual balance."
              }
            ]
          },
          gallery: {
            kicker: "Visual direction",
            intro: "Cinematic lighting, warm tones, natural textures, premium minimal compositions."
          },
          outcomes: {
            kicker: "Outcome",
            titleLines: ["A COHESIVE", "SYSTEM THAT", "BUILDS TRUST"],
            items: [
              "A cohesive design system that builds trust and simplifies a complex product experience."
            ]
          },
          credits: {
            kicker: "Project details",
            items: [
              { label: "Tools", value: "Adobe Illustrator, Adobe Photoshop, 3D mockup workflows" },
              { label: "Design system", value: "Soft neutral palette, clean typography, minimal layouts, premium feel" },
              { label: "Visual direction", value: "Cinematic lighting, warm tones, natural textures, premium minimal compositions." },
              { label: "Website", value: "thenaturalnipple.com" }
            ]
          },
          explore: {
            link: "Explore my work"
          }
        },
        ro: {
          footer: "Studiu\nde caz",
          hero: {
            kicker: "Designul unui sistem de hranire care se simte natural.",
            titleLines: ["THE NATURAL", "NIPPLE"],
            titleAccent: "",
            watermark: "TNN",
            logoSrc: "assets/portfolio/the-natural-nipple-project/logo/naturalNipple_secondary_color-logo.svg",
            logoAlt: "The Natural Nipple logo"
          },
          overview: {
            kicker: "Overview",
            lead: "Un proiect complet de branding si product design dezvoltat in Florida, concentrat pe traducerea unui sistem de hranire complex, bazat pe cercetare, intr-o experienta clara, intuitiva si linistitoare emotional.",
            stats: [
              { label: "Sistem", value: "The Natural Nipple este un sistem de hranire infantila complet personalizabil, construit in jurul principiilor naturale ale alaptarii - forma, senzatie si flux." },
              { label: "Focus", value: "In 2022, proiectul s-a concentrat pe transformarea unui concept complex intr-o experienta de brand rafinata si accesibila." },
              { label: "Abordare", value: "Design minimal, uman si intentionat, concentrat pe reducerea zgomotului si cresterea claritatii." }
            ],
            details: [
              { label: "Locatie", value: "Florida" },
              { label: "An", value: "2022" },
              { label: "Website", value: "thenaturalnipple.com" },
              { label: "Rolul meu", value: "Directie de design end-to-end incluzand branding, packaging, vizualizare de produs si art direction." }
            ]
          },
          framework: {
            kicker: "Decizii cheie",
            titleLines: ["CLARITATE PRIN", "STRUCTURA SI", "DELICATETE"],
            items: [
              {
                title: "Provocare",
                body: "Simplificarea unui produs complex, bazat pe cercetare, pastrand in acelasi timp increderea, claritatea si delicatetea emotionala."
              },
              {
                title: "Abordare",
                body: "Design minimal, uman si intentionat, concentrat pe reducerea zgomotului si cresterea claritatii."
              },
              {
                title: "Packaging",
                body: "Sistem cilindric de ambalare cu ierarhie clara, informatie structurata si un echilibru vizual puternic."
              }
            ]
          },
          gallery: {
            kicker: "Directie vizuala",
            intro: "Lumina cinematica, tonuri calde, texturi naturale, compozitii minimale premium."
          },
          outcomes: {
            kicker: "Rezultat",
            titleLines: ["UN SISTEM", "COEZIV CARE", "CONSTRUIESTE INCREDERE"],
            items: [
              "Un sistem de design coerent care construieste incredere si simplifica experienta unui produs complex."
            ]
          },
          credits: {
            kicker: "Detalii proiect",
            items: [
              { label: "Tools", value: "Adobe Illustrator, Adobe Photoshop, fluxuri 3D mockup" },
              { label: "Sistem de design", value: "Paleta neutra, tipografie curata, layout-uri minimale, feel premium" },
              { label: "Directie vizuala", value: "Lumina cinematica, tonuri calde, texturi naturale, compozitii minimale premium." },
              { label: "Website", value: "thenaturalnipple.com" }
            ]
          },
          explore: {
            link: "Exploreaza proiectele"
          }
        }
      }
    }
  ];

  siteContent.caseStudies = Object.create(null);

  caseStudies.forEach((definition) => {
    siteContent.caseStudies[definition.routeId] = definition;
    siteContent.routeTemplates[definition.routeId] = createProjectTemplate(definition);
    siteContent.portfolioProjectDetails[definition.pinId] = { ...definition.panel };
    siteContent.translations.en[definition.routeId] = createProjectDictionary(definition.locales.en);
    siteContent.translations.ro[definition.routeId] = createProjectDictionary(definition.locales.ro);
  });

})();
