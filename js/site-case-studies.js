(function () {
  const siteContent = window.SiteContent;

  if (!siteContent || !siteContent.routeTemplates || !siteContent.translations) {
    return;
  }

  const PROJECT_BODY_CLASS = "project-page project-page-dark";
  const PROJECT_PAGE_STYLE = "project.css";
  const PROJECT_THEME_COLOR = "#050608";

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

    return `
      <h1 class="project-contact-heading glitch-heading" data-text="${dataText}">
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

    return `
      <section class="project-venues reveal-block">
        <div class="project-content-shell project-content-shell-rail">
          <div class="project-copy-column">
            <div class="project-section-head">
              <span class="project-contact-kicker" data-i18n="projectMarksKicker">${escapeHtml(marks.kicker)}</span>
            </div>
            <div class="project-venues-grid">
              ${marks.items.map((item, index) => `
                <div class="project-venue-mark" data-i18n="projectMark${index + 1}">${escapeHtml(item)}</div>
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
        dictionary[`projectMark${index + 1}`] = item;
      });
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
                <div class="project-gallery-media-stack">
                  ${renderGalleryItems(definition.gallery)}
                </div>
              </section>

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
        src: "assets/portfolio/shg-1.mp4",
        poster: "assets/portfolio/calgary.png",
        alt: "Syndicate Hospitality Group hero reel"
      },
      gallery: [
        {
          src: "assets/portfolio/calgary.png",
          alt: "Syndicate Hospitality Group brand presentation overview"
        },
        {
          src: "assets/portfolio/calgary.png",
          alt: "Syndicate Hospitality Group venue-facing visual system detail",
          position: "50% 38%",
          imageClass: "project-gallery-image-secondary"
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
        mediaSrc: "assets/portfolio/shg-1.mp4",
        mediaPoster: "assets/portfolio/calgary.png",
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
            items: ["FORTUNA'S ROW", "SHELTER COCKTAIL BAR", "ORCHARD RESTAURANT", "MASA MAMA TAQUERIA"]
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
            intro: "The project spans multiple venues and asset types, so the visual sequence focuses on atmosphere first, then the framing and polish that hold the system together."
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
            items: ["FORTUNA'S ROW", "SHELTER COCKTAIL BAR", "ORCHARD RESTAURANT", "MASA MAMA TAQUERIA"]
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
            intro: "Proiectul acopera mai multe venue-uri si multe tipuri de asset-uri, asa ca secventa vizuala pune accent pe atmosfera, apoi pe framing-ul si polish-ul care tin sistemul unitar."
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
