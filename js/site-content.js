const portfolioClassicChapters = [
  {
    id: "shg",
    index: "01",
    loaderClassName: "classic-loader-shell-shg",
    imageSrc: "assets/portfolio/shg-project/shelter-08.png",
    imageAlt: "Shelter Cocktail Bar chandelier installation",
    href: "project-shg-calgary.html",
    kickerKey: "project1Kicker",
    titleKeys: ["project1Line1", "project1Line2"],
    bodyKey: "project1Body",
    leadKey: "project1Lead",
    detailKeys: ["project1Detail1", "project1Detail2"],
    meta: [
      { labelKey: "metaLocationLabel", valueKey: "project1Location" },
      { labelKey: "metaScopeLabel", valueKey: "project1Scope" },
      { labelKey: "metaYearLabel", valueKey: "project1Year" },
      { labelKey: "metaRoleLabel", valueKey: "project1Role" }
    ],
    gallery: {
      wide: {
        src: "assets/portfolio/shg-project/calgary.png",
        alt: "Syndicate Hospitality Group case-study overview"
      },
      pair: [
        {
          src: "assets/portfolio/shg-project/shelter-04.jpg",
          alt: "Shelter Cocktail Bar menu and print detail"
        },
        {
          src: "assets/portfolio/shg-project/shelter-07.jpg",
          alt: "Shelter Cocktail Bar identity detail"
        }
      ]
    },
    signalKeys: [
      { titleKey: "project1Signal1Title", bodyKey: "project1Signal1Body" },
      { titleKey: "project1Signal2Title", bodyKey: "project1Signal2Body" },
      { titleKey: "project1Signal3Title", bodyKey: "project1Signal3Body" }
    ],
    linkKey: "project1Link",
    caseClassName: "classic-case-shg"
  },
  {
    id: "tnn",
    index: "02",
    loaderClassName: "classic-loader-shell-neutral",
    imageSrc: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-06.png",
    imageAlt: "The Natural Nipple packaging composition",
    href: "project-the-natural-nipple.html",
    kickerKey: "project2Kicker",
    titleKeys: ["project2Line1", "project2Line2"],
    bodyKey: "project2Body",
    leadKey: "project2Lead",
    detailKeys: ["project2Detail1", "project2Detail2"],
    meta: [
      { labelKey: "metaLocationLabel", valueKey: "project2Location" },
      { labelKey: "metaScopeLabel", valueKey: "project2Scope" },
      { labelKey: "metaYearLabel", valueKey: "project2Year" },
      { labelKey: "metaRoleLabel", valueKey: "project2Role" }
    ],
    gallery: {
      wide: {
        src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-02.png",
        alt: "The Natural Nipple packaging showcase"
      },
      pair: [
        {
          src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-01.png",
          alt: "The Natural Nipple detail close-up"
        },
        {
          src: "assets/portfolio/the-natural-nipple-project/the-natural-nipple-05.png",
          alt: "The Natural Nipple product presentation"
        }
      ]
    },
    signalKeys: [
      { titleKey: "project2Signal1Title", bodyKey: "project2Signal1Body" },
      { titleKey: "project2Signal2Title", bodyKey: "project2Signal2Body" },
      { titleKey: "project2Signal3Title", bodyKey: "project2Signal3Body" }
    ],
    linkKey: "project2Link",
    caseClassName: "classic-case-tnn"
  },
  {
    id: "system",
    index: "03",
    loaderClassName: "classic-loader-shell-system",
    imageSrc: "portfolio-state.png",
    imageAlt: "Portfolio system screen composition",
    href: "project-portfolio-system.html",
    kickerKey: "project3Kicker",
    titleKeys: ["project3Line1", "project3Line2"],
    bodyKey: "project3Body",
    leadKey: "project3Lead",
    detailKeys: ["project3Detail1", "project3Detail2"],
    meta: [
      { labelKey: "metaLocationLabel", valueKey: "project3Location" },
      { labelKey: "metaScopeLabel", valueKey: "project3Scope" },
      { labelKey: "metaYearLabel", valueKey: "project3Year" },
      { labelKey: "metaRoleLabel", valueKey: "project3Role" }
    ],
    gallery: {
      wide: {
        src: "portfolio-state.png",
        alt: "Portfolio system full-page composition"
      },
      pair: [
        {
          src: "home-desktop.png",
          alt: "Portfolio home scene detail"
        },
        {
          src: "about-desktop-mid.png",
          alt: "Portfolio about page detail"
        }
      ]
    },
    signalKeys: [
      { titleKey: "project3Signal1Title", bodyKey: "project3Signal1Body" },
      { titleKey: "project3Signal2Title", bodyKey: "project3Signal2Body" },
      { titleKey: "project3Signal3Title", bodyKey: "project3Signal3Body" }
    ],
    linkKey: "project3Link",
    caseClassName: "classic-case-system"
  }
];

const portfolioClassicChapterCount = portfolioClassicChapters.length;

function renderPortfolioClassicChapter(chapter, nextChapter) {
  return `
    <section class="classic-chapter ${chapter.caseClassName}" data-classic-chapter>
      <div class="classic-chapter-track ${chapter.loaderClassName}" data-classic-loader>
        <div class="classic-chapter-pin">
          <div class="classic-chapter-stage">
            <img class="classic-chapter-media" src="${chapter.imageSrc}" alt="${chapter.imageAlt}" loading="eager" decoding="async">
            <div class="classic-chapter-film" aria-hidden="true"></div>
            <div class="classic-chapter-noise" aria-hidden="true"></div>

            <div class="classic-chapter-loader">
              <div class="classic-chapter-head">
                <span class="classic-chapter-tag"><span data-i18n="chapterLabel">Classic view</span><span aria-hidden="true"> / ${chapter.index}</span></span>
                <span class="classic-chapter-kicker" data-i18n="${chapter.kickerKey}"></span>
              </div>

              <h2 class="classic-chapter-title">
                ${chapter.titleKeys.map((key) => `<span data-i18n="${key}"></span>`).join("")}
              </h2>

              <p class="classic-chapter-copy" data-i18n="${chapter.bodyKey}"></p>

              <div class="classic-chapter-progress-shell">
                <div class="classic-chapter-progress-row">
                  <span class="classic-chapter-progress-label" data-i18n="chapterLoadingLabel">Loading chapter</span>
                  <span class="classic-chapter-progress-value" data-classic-progress>000%</span>
                </div>
                <span class="classic-chapter-progress-bar" aria-hidden="true"><span></span></span>
                <div class="classic-chapter-phase-row">
                  <span class="classic-chapter-progress-label" data-i18n="chapterStatusLabel">Archive status</span>
                  <span class="classic-chapter-phase" data-classic-phase>Initializing archive</span>
                </div>
                <div class="classic-chapter-phase-bank" hidden aria-hidden="true">
                  <span data-classic-phase-copy="0" data-i18n="chapterPhase1">Initializing archive</span>
                  <span data-classic-phase-copy="1" data-i18n="chapterPhase2">Streaming materials</span>
                  <span data-classic-phase-copy="2" data-i18n="chapterPhase3">Building chapter</span>
                  <span data-classic-phase-copy="3" data-i18n="chapterPhase4">Aligning details</span>
                  <span data-classic-phase-copy="4" data-i18n="chapterPhase5">Chapter unlocked</span>
                </div>
                <p class="classic-chapter-ready" data-classic-ready>
                  <span class="classic-chapter-ready-label" data-i18n="chapterReadyLabel">Chapter unlocked</span>
                  <span class="classic-chapter-ready-copy" data-i18n="chapterReadyHint">Scroll to reveal the case study.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <article class="classic-story">
        <div class="classic-story-shell">
          <section class="classic-story-section classic-story-section-intro">
            <div class="classic-chapter-panel-head">
              <span class="classic-case-kicker" data-i18n="chapterRailLabel">Case file</span>
              <span class="classic-case-index">${chapter.index} / ${String(portfolioClassicChapterCount).padStart(2, "0")}</span>
            </div>

            <div class="classic-case-label-row">
              <span class="classic-case-kicker" data-i18n="sectionOverviewLabel">Overview</span>
              <span class="classic-case-index">${chapter.index}</span>
            </div>

            <div class="classic-chapter-panel-grid">
              <div class="classic-chapter-panel-copy">
                <h2 class="classic-case-title">
                  ${chapter.titleKeys.map((key) => `<span data-i18n="${key}"></span>`).join("")}
                </h2>
                <p class="classic-chapter-panel-prompt" data-i18n="chapterRailPrompt">Scroll through the proof.</p>
                <p class="classic-chapter-panel-lead" data-i18n="${chapter.leadKey}"></p>
                <a class="classic-case-link classic-project-link" href="${chapter.href}" data-i18n="${chapter.linkKey}"></a>
              </div>

              <dl class="classic-case-meta classic-case-meta-panel">
                ${chapter.meta.map((item) => `
                  <div>
                    <dt data-i18n="${item.labelKey}"></dt>
                    <dd data-i18n="${item.valueKey}"></dd>
                  </div>
                `).join("")}
              </dl>
            </div>
          </section>

          <section class="classic-story-section classic-story-section-details">
            <div class="classic-case-section-head">
              <span class="classic-case-section-kicker" data-i18n="sectionDetailsLabel">System lens</span>
            </div>
            <div class="classic-case-details-grid">
              <div class="classic-case-details-copy">
                ${chapter.detailKeys.map((key) => `<p data-i18n="${key}"></p>`).join("")}
              </div>
              <figure class="classic-gallery-frame classic-gallery-frame-wide classic-story-frame">
                <img src="${chapter.gallery.wide.src}" alt="${chapter.gallery.wide.alt}" loading="lazy" decoding="async">
              </figure>
            </div>
          </section>

          <section class="classic-story-section classic-story-section-gallery">
            <div class="classic-case-section-head">
              <span class="classic-case-section-kicker" data-i18n="sectionGalleryLabel">Selected frames</span>
            </div>
            <div class="classic-gallery-pair classic-gallery-pair-story">
              ${chapter.gallery.pair.map((item) => `
                <figure class="classic-gallery-frame">
                  <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async">
                </figure>
              `).join("")}
            </div>
          </section>

          <section class="classic-story-section classic-story-section-signals">
            <div class="classic-case-section-head">
              <span class="classic-case-section-kicker" data-i18n="sectionSignalsLabel">Signals</span>
            </div>
            <div class="classic-case-notes-grid">
              ${chapter.signalKeys.map((item) => `
                <article>
                  <h3 data-i18n="${item.titleKey}"></h3>
                  <p data-i18n="${item.bodyKey}"></p>
                </article>
              `).join("")}
            </div>
          </section>

          <section class="classic-story-section classic-story-transition">
            <div class="classic-case-section-head">
              <span class="classic-case-section-kicker" data-i18n="${nextChapter ? "chapterTransitionLabel" : "finalKicker"}">${nextChapter ? "Next chapter" : "Next step"}</span>
              <span class="classic-case-index">${nextChapter ? nextChapter.index : "04"}</span>
            </div>

            ${nextChapter ? `
              <div class="classic-case-transition-grid">
                <div class="classic-case-transition-copy">
                  <p class="classic-case-transition-index">${nextChapter.index}</p>
                  <h3 class="classic-case-transition-title">
                    ${nextChapter.titleKeys.map((key) => `<span data-i18n="${key}"></span>`).join("")}
                  </h3>
                  <p class="classic-case-transition-body" data-i18n="chapterTransitionPrompt">Keep scrolling to load the next project.</p>
                </div>
                <figure class="classic-case-transition-preview">
                  <img src="${nextChapter.imageSrc}" alt="${nextChapter.imageAlt}" loading="lazy" decoding="async">
                </figure>
              </div>
            ` : `
              <div class="classic-case-transition-grid classic-case-transition-grid-final">
                <div class="classic-case-transition-copy">
                  <h3 class="classic-case-transition-title">
                    <span data-i18n="finalLine1"></span>
                    <span data-i18n="finalLine2"></span>
                  </h3>
                  <p class="classic-case-transition-body" data-i18n="finalBody"></p>
                  <div class="classic-end-links">
                    <a class="classic-inline-link" href="index.html#portfolio" data-i18n="finalPrimaryLink"></a>
                    <a class="classic-inline-link" href="contact.html" data-i18n="finalSecondaryLink"></a>
                  </div>
                </div>
              </div>
            `}
          </section>
        </div>
      </article>
    </section>
  `;
}

function createPortfolioClassicPage() {
  return `
    <main class="classic-sequence">
      ${portfolioClassicChapters.map((chapter, index) => renderPortfolioClassicChapter(chapter, portfolioClassicChapters[index + 1] || null)).join("")}
    </main>
  `;
}

window.SiteContent = {
  routeTemplates: {
    home: {
      route: "home",
      path: "/index.html",
      aliases: ["/", "/index.html"],
      bodyClass: "",
      pageStyle: "",
      title: "Claudiu Angheloni",
      description: "Claudiu Angheloni portfolio site featuring cinematic motion, brand-focused design work and immersive interactive presentation.",
      themeColor: "#050608",
      shell: `
        <div class="hero-copy">
          <div class="title-glitch">
            <img class="title-art" src="assets/title.svg" alt="Claudiu Angheloni" width="225" height="74" decoding="async">
            <span class="title-layer title-layer-a" aria-hidden="true"></span>
            <span class="title-layer title-layer-b" aria-hidden="true"></span>
            <span class="title-layer title-layer-c" aria-hidden="true"></span>
          </div>
          <p class="hero-subtitle" data-i18n="subtitle">Brings your ideas to life</p>
        </div>

        <p class="corner-text corner-text-left" data-i18n="cornerLeft">Reach
perfection</p>
        <div class="bottom-logo">
          <img class="bottom-logo-base" src="assets/logo.svg" alt="Logo" width="36" height="36" decoding="async">
          <span class="bottom-logo-layer bottom-logo-layer-a" aria-hidden="true"></span>
          <span class="bottom-logo-layer bottom-logo-layer-b" aria-hidden="true"></span>
          <span class="bottom-logo-layer bottom-logo-layer-c" aria-hidden="true"></span>
        </div>
        <p class="corner-text corner-text-right corner-text-right-audio">
          <span class="corner-text-label" data-i18n="cornerRight">Welcome!</span>
        </p>
      `,
      page: ""
    },
    about: {
      route: "about",
      path: "/about.html",
      aliases: ["/about.html"],
      bodyClass: "about-page about-theme-light",
      pageStyle: "about.css",
      title: "About Me | Claudiu Angheloni",
      description: "Learn more about Claudiu Angheloni, his creative journey, freelance years, agency work and hospitality design experience.",
      themeColor: "#ffffff",
      shell: `
        <p class="corner-text corner-text-left corner-text-deferred" data-i18n="cornerLeft">Reach
perfection</p>
        <div class="bottom-logo footer-mark-deferred">
          <img class="bottom-logo-base" src="assets/logo.svg" alt="Claudiu Angheloni logo" width="36" height="36" decoding="async">
          <span class="bottom-logo-layer bottom-logo-layer-a" aria-hidden="true"></span>
          <span class="bottom-logo-layer bottom-logo-layer-b" aria-hidden="true"></span>
          <span class="bottom-logo-layer bottom-logo-layer-c" aria-hidden="true"></span>
        </div>
        <div class="about-scroll-indicator" aria-hidden="true">
          <span class="about-scroll-indicator-label">Scroll</span>
          <span class="about-scroll-indicator-track"></span>
          <span class="about-scroll-indicator-thumb"></span>
          <span class="about-scroll-indicator-progress">00</span>
        </div>
        <p class="corner-text corner-text-right corner-text-deferred" data-i18n="footerPage">About
me</p>
      `,
      page: `
        <div class="page-shell">
          <div class="about-scroll-shell">
            <main class="about-layout">
              <aside class="about-rail" aria-hidden="true">
                <div class="about-rail-word">ABOUT</div>
                <div class="about-rail-bar"></div>
                <div class="about-rail-word about-rail-word-mirror">ME</div>
              </aside>

              <section class="about-content">
                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerStart">The beginning</span>
                    <span class="about-story-year">2007</span>
                  </div>
                  <h1 class="glitch-heading" data-text="IT ALL STARTED WITH A DREAM">
                    <span class="glitch-heading-muted" data-i18n="waitForIt">(ORIGIN)</span>
                    <span class="glitch-heading-line" data-i18n="startLine1">IT ALL STARTED</span>
                    <span class="glitch-heading-line" data-i18n="startLine2">WITH A DREAM</span>
                  </h1>
                  <div class="body-copy">
                    <p data-i18n="startBody1">What began as a childhood passion slowly turned into something far more enduring. The joy of drawing, shaping, and imagining became the foundation of a creative path that never really left me.</p>
                    <p data-i18n="startBody2">By 2007, that early instinct had started to take form professionally. What once lived in sketches and visual experiments began evolving into a lifelong commitment to design, growth, and artistic discipline.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerFreelancing">Freelancing</span>
                    <span class="about-story-year">-2012</span>
                  </div>
                  <h2 class="glitch-heading" data-text="YEARS OF FREELANCING">
                    <span class="glitch-heading-muted" data-i18n="amazing">(BECOMING)</span>
                    <span class="glitch-heading-line" data-i18n="freelanceLine1">YEARS OF</span>
                    <span class="glitch-heading-line" data-i18n="freelanceLine2">FREELANCING</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="freelanceBody1">For nearly five years, freelancing became both my classroom and my proving ground. It was a period shaped by discovery, adaptability, and the constant challenge of turning ideas into work that felt meaningful and distinct.</p>
                    <p data-i18n="freelanceBody2">Those years taught me how to move across industries, respond to different voices, and build with both intuition and discipline. They gave me range, but more importantly, they gave me direction.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerMirani">Mirani Design</span>
                    <span class="about-story-year">2012-</span>
                  </div>
                  <h2 class="glitch-heading" data-text="THE FIRST REAL TEAM">
                    <span class="glitch-heading-muted" data-i18n="awesome">(TOGETHER)</span>
                    <span class="glitch-heading-line" data-i18n="teamLine1">THE FIRST</span>
                    <span class="glitch-heading-line" data-i18n="teamLine2">REAL TEAM</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="teamBody1">In 2012, I joined Mirani Design, a small and talented team built around friendship, creativity, and momentum. It was my first real step into a collaborative studio environment, where ideas moved faster and the work carried a different kind of energy.</p>
                    <p data-i18n="teamBody2">For a year, I contributed as a Graphic Designer across a diverse range of projects, gaining a deeper understanding of teamwork, rhythm, and shared creative ambition.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerTalonX">TalonX - Creative Agency</span>
                    <span class="about-story-year">2013-</span>
                  </div>
                  <h2 class="glitch-heading glitch-heading-journey" data-text="WHEN THE JOURNEY EXPANDED">
                    <span class="glitch-heading-muted" data-i18n="fantastic">(SCALE)</span>
                    <span class="glitch-heading-line" data-i18n="journeyLine1">WHEN THE</span>
                    <span class="glitch-heading-line" data-i18n="journeyLine2">JOURNEY EXPANDED</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="journeyBody1">In 2013, I joined TalonX in Calgary, Alberta - the beginning of a defining chapter in my professional life. What started as a small creative agency became, over time, a place where my role, perspective, and standards evolved in lasting ways.</p>
                    <p data-i18n="journeyBody2">Across the years, the work grew in scale and depth. So did my involvement - from design execution to stronger influence over visual direction, consistency, branding, UI/UX, and the overall quality of what we built.</p>
                    <p data-i18n="journeyBody3">That chapter shaped more than my portfolio. It shaped the way I think: with structure, adaptability, and a long view of design.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerShg">Syndicate Hospitality Group (SHG)</span>
                    <span class="about-story-year about-story-year-present" data-i18n="presentDay">PRESENT</span>
                  </div>
                  <h2 class="glitch-heading" data-text="THE HUNGER BECAME VISUAL">
                    <span class="glitch-heading-muted" data-i18n="culinary">(HOSPITALITY)</span>
                    <span class="glitch-heading-line" data-i18n="presentLine1">THE HUNGER</span>
                    <span class="glitch-heading-line" data-i18n="presentLine2">BECAME VISUAL</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="presentBody1">Alongside my time at TalonX, my collaboration with Syndicate Hospitality Group opened a new creative direction - one rooted in atmosphere, experience, and the emotional power of place.</p>
                    <p data-i18n="presentBody2">From Shelter Cocktail Bar to Orchard, Fortuna's Row, and other hospitality concepts, I helped shape visual identities, menus, campaigns, and brand systems that were meant to be felt as much as seen.</p>
                    <p data-i18n="presentBody3">This work brought design closer to the real world - to environments, people, and moments. It deepened my sensitivity to cohesion, tone, and the way branding can live far beyond the screen.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerSwag">S.W.A.G. Stuff We All Get</span>
                    <span class="about-story-year">2025+</span>
                  </div>
                  <h2 class="glitch-heading glitch-heading-swag" data-text="WHERE DESIGN BECAME A SYSTEM">
                    <span class="glitch-heading-muted" data-i18n="future">(FUTURE)</span>
                    <span class="glitch-heading-line" data-i18n="swagLine1">WHERE DESIGN</span>
                    <span class="glitch-heading-line" data-i18n="swagLine2">BECAME A SYSTEM</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="swagBody1">More recently, that evolution has extended into S.W.A.G. - a product shaped at the intersection of brand, experience, marketplace thinking, and AI.</p>
                    <p data-i18n="swagBody2">Through S.W.A.G., my role moved beyond visual execution into something broader: helping shape a living product system, where identity, interaction, storytelling, trust, and user flow all had to work together as one.</p>
                    <p data-i18n="swagBody3">It became a different kind of challenge - not just designing what people see, but helping define how the product behaves, feels, and grows over time. That shift continues to influence the way I think about design today.</p>
                  </div>
                </article>

                <section class="about-profile">
                  <article class="about-story about-profile-story reveal-block" aria-labelledby="about-profile-heading">
                    <div class="about-story-intro about-profile-story-intro">
                      <span class="about-story-kicker" data-i18n="whyMeLabel">WHY ME</span>
                      <span class="about-story-year about-chapter-word" aria-hidden="true" data-i18n="helloWord">HELLO!</span>
                    </div>
                    <h2 class="glitch-heading about-profile-heading" id="about-profile-heading" data-text="IT IS WONDERFUL MEETING YOU">
                      <span class="glitch-heading-line" data-i18n="whyIntroLine1">IT IS WONDERFUL</span>
                      <span class="glitch-heading-line" data-i18n="whyIntroLine2">MEETING YOU</span>
                    </h2>
                    <div class="body-copy about-profile-copy">
                      <p data-i18n="whyIntroBody1">With more than fifteen years of practice behind me, design has become more than a profession. It is the way I shape clarity, atmosphere, and direction across brands, digital experiences, and visual systems.</p>
                      <p data-i18n="whyIntroBody2">Over time, my work has moved between identity, hospitality, UI/UX, campaigns, and product thinking - always with the same intention: to build work that feels considered, coherent, and built to last.</p>
                    </div>
                  </article>

                      <section class="about-profile-services reveal-block" aria-labelledby="about-services-heading">
                        <div class="about-story-intro about-section-intro">
                          <span class="about-story-kicker" data-i18n="servicesKicker">SUPPORT</span>
                          <span class="about-story-year about-chapter-word about-chapter-word-services" aria-hidden="true" data-i18n="servicesWord">SERVICES</span>
                        </div>
                        <h2 class="glitch-heading about-profile-services-heading" id="about-services-heading" data-text="HOW MY WORK SUPPORTS YOUR BUSINESS">
                          <span class="glitch-heading-line" data-i18n="servicesHeadingLine1">HOW MY WORK</span>
                          <span class="glitch-heading-line" data-i18n="servicesHeadingLine2">SUPPORTS YOUR BUSINESS</span>
                        </h2>
                        <div class="about-profile-services-grid">
                          <article class="about-profile-service">
                            <h3 class="about-profile-service-title" data-i18n="servicePresenceTitle">STRONGER BRAND PRESENCE</h3>
                            <p class="about-profile-service-body" data-i18n="servicePresenceBody">Clear visual systems create recognition, confidence, and consistency. From identity to execution, the work is shaped to feel intentional and memorable across every touchpoint.</p>
                          </article>
                          <article class="about-profile-service">
                            <h3 class="about-profile-service-title" data-i18n="serviceEngagementTitle">BETTER ENGAGEMENT</h3>
                            <p class="about-profile-service-body" data-i18n="serviceEngagementBody">Thoughtful design helps people stay with what they are seeing. It improves clarity, strengthens communication, and creates stronger interaction across digital and brand experiences.</p>
                          </article>
                          <article class="about-profile-service">
                            <h3 class="about-profile-service-title" data-i18n="serviceDirectionTitle">ADAPTIVE CREATIVE DIRECTION</h3>
                            <p class="about-profile-service-body" data-i18n="serviceDirectionBody">Design never stands still. My approach evolves with context, audience, and medium - helping brands stay relevant while keeping their visual language coherent over time.</p>
                          </article>
                        </div>
                      </section>

                      <section class="about-practice reveal-block" aria-labelledby="about-practice-heading">
                        <div class="about-story-intro about-section-intro">
                          <span class="about-story-kicker" data-i18n="practiceKicker">PRACTICE</span>
                          <span class="about-story-year about-chapter-word about-practice-word" aria-hidden="true" data-i18n="skillsWord">SKILLS</span>
                        </div>
                        <h2 class="glitch-heading about-practice-heading" id="about-practice-heading" data-text="TOOLS AND DISCIPLINES">
                          <span class="glitch-heading-line" data-i18n="practiceHeadingLine1">TOOLS</span>
                          <span class="glitch-heading-line" data-i18n="practiceHeadingLine2">AND DISCIPLINES</span>
                        </h2>

                        <div class="about-practice-grid">
                          <article class="about-practice-column">
                            <h3 class="about-practice-column-title" data-i18n="toolsColumnTitle">TOOLS</h3>
                            <ul class="about-practice-list">
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 88%; --skill-delay: 120ms;">
                                <span class="about-practice-name" data-i18n="toolItem1">Figma</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelCore" data-sync-text data-text="CORE">CORE</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 82%; --skill-delay: 190ms;">
                                <span class="about-practice-name" data-i18n="toolItem2">Adobe Photoshop</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelCore" data-sync-text data-text="CORE">CORE</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 78%; --skill-delay: 260ms;">
                                <span class="about-practice-name" data-i18n="toolItem3">Adobe Illustrator</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelCore" data-sync-text data-text="CORE">CORE</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 70%; --skill-delay: 330ms;">
                                <span class="about-practice-name" data-i18n="toolItem4">Adobe InDesign</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelStrong" data-sync-text data-text="STRONG">STRONG</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 60%; --skill-delay: 400ms;">
                                <span class="about-practice-name" data-i18n="toolItem5">Adobe After Effects</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelEvolving" data-sync-text data-text="EVOLVING">EVOLVING</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 56%; --skill-delay: 470ms;">
                                <span class="about-practice-name" data-i18n="toolItem6">Framer</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelEvolving" data-sync-text data-text="EVOLVING">EVOLVING</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 66%; --skill-delay: 540ms;">
                                <span class="about-practice-name" data-i18n="toolItem7">Adobe XD</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelStrong" data-sync-text data-text="STRONG">STRONG</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 58%; --skill-delay: 610ms;">
                                <span class="about-practice-name" data-i18n="toolItem8">AI Workflows</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelEvolving" data-sync-text data-text="EVOLVING">EVOLVING</span>
                                </span>
                              </li>
                            </ul>
                          </article>

                          <article class="about-practice-column">
                            <h3 class="about-practice-column-title" data-i18n="disciplinesColumnTitle">DISCIPLINES</h3>
                            <ul class="about-practice-list">
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 90%; --skill-delay: 150ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem1">Brand Identity</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelCore" data-sync-text data-text="CORE">CORE</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 74%; --skill-delay: 220ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem2">UI/UX Design</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelCore" data-sync-text data-text="CORE">CORE</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 60%; --skill-delay: 290ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem3">Product Thinking</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelAdvanced" data-sync-text data-text="ADVANCED">ADVANCED</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 70%; --skill-delay: 360ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem4">Design Systems</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelStrong" data-sync-text data-text="STRONG">STRONG</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 84%; --skill-delay: 430ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem5">Hospitality Branding</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelCore" data-sync-text data-text="CORE">CORE</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 76%; --skill-delay: 500ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem6">Visual Storytelling</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelStrong" data-sync-text data-text="STRONG">STRONG</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 62%; --skill-delay: 570ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem7">Investor Narratives</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelEvolving" data-sync-text data-text="EVOLVING">EVOLVING</span>
                                </span>
                              </li>
                              <li class="about-practice-item" tabindex="0" style="--skill-stop: 68%; --skill-delay: 640ms;">
                                <span class="about-practice-name" data-i18n="disciplineItem8">Campaign Direction</span>
                                <span class="about-practice-graphic" aria-hidden="true">
                                  <span class="about-practice-track"><span class="about-practice-track-fill"></span></span>
                                  <span class="about-practice-marker"></span>
                                  <span class="about-practice-level" data-i18n="levelStrong" data-sync-text data-text="STRONG">STRONG</span>
                                </span>
                              </li>
                            </ul>
                          </article>
                        </div>
                      </section>
                </section>
              </section>
            </main>
          </div>
        </div>
      `
    },
    portfolioClassic: {
      route: "portfolioClassic",
      path: "/portfolio-classic.html",
      aliases: ["/portfolio-classic.html", "/portfolio/classic", "/portfolio/classic/"],
      bodyClass: "portfolio-classic-page",
      pageStyle: "portfolio-classic.css",
      title: "Classic View | Claudiu Angheloni",
      description: "A classic editorial portfolio view of Claudiu Angheloni's selected case studies across hospitality branding, product storytelling and digital presentation systems.",
      themeColor: "#ffffff",
      shell: ``,
      page: createPortfolioClassicPage()
    },
    contact: {
      route: "contact",
      path: "/contact.html",
      aliases: ["/contact.html"],
      bodyClass: "contact-page",
      pageStyle: "contact.css",
      title: "Contact | Claudiu Angheloni",
      description: "Get in touch with Claudiu Angheloni for branding, design systems, hospitality concepts and creative collaboration.",
      themeColor: "#050608",
      shell: `
        <p class="corner-text corner-text-left contact-corner-left" data-i18n="cornerLeft">Reach
perfection</p>
        <div class="bottom-logo">
          <img class="bottom-logo-base" src="assets/logo.svg" alt="Claudiu Angheloni logo" width="36" height="36" decoding="async">
          <span class="bottom-logo-layer bottom-logo-layer-a" aria-hidden="true"></span>
          <span class="bottom-logo-layer bottom-logo-layer-b" aria-hidden="true"></span>
          <span class="bottom-logo-layer bottom-logo-layer-c" aria-hidden="true"></span>
        </div>
        <div class="contact-social" aria-label="Social media">
          <a class="contact-social-link" href="https://www.upwork.com/freelancers/~0109e73ade693f3a66?mp_source=share" target="_blank" rel="noopener noreferrer">
            <span class="contact-social-link-line" aria-hidden="true"></span>
            <span class="contact-social-link-label" data-i18n="socialUpwork">Upwork</span>
          </a>
          <a class="contact-social-link" href="https://www.linkedin.com/in/claudiu-angheloni/" target="_blank" rel="noopener noreferrer">
            <span class="contact-social-link-line" aria-hidden="true"></span>
            <span class="contact-social-link-label" data-i18n="socialLinkedin">LinkedIn</span>
          </a>
          <a class="contact-social-link" href="https://www.behance.net/claudiuangheloni" target="_blank" rel="noopener noreferrer">
            <span class="contact-social-link-line" aria-hidden="true"></span>
            <span class="contact-social-link-label" data-i18n="socialBehance">Behance</span>
          </a>
          <span class="contact-social-link contact-social-link-accent">
            <span class="contact-social-link-label" data-i18n="socialCta">Let's talk!</span>
          </span>
        </div>
      `,
      page: `
        <div class="page-shell">
          <main class="contact-layout">
            <aside class="contact-rail" aria-hidden="true">
              <div class="contact-rail-stack">
                <div class="contact-rail-word">LET'S</div>
                <div class="contact-rail-divider"></div>
                <div class="contact-rail-word contact-rail-word-secondary">TALK</div>
              </div>

              <div class="contact-rail-details">
                <a href="mailto:hello@claudiuangheloni.com" data-i18n="emailValue">hello@claudiuangheloni.com</a>
                <a href="tel:+40732466473" data-i18n="phoneValue">+40 732 466 473</a>
                <p data-i18n="locationValue">Lugoj, Romania</p>
              </div>
            </aside>

            <section class="contact-content">
              <div class="contact-intro reveal-block is-visible">
                <div class="contact-intro-meta">
                  <span class="contact-kicker" data-i18n="kicker">Its wonderful to hear from you</span>
                </div>

                <div class="contact-stage">
                  <div class="contact-stage-head">
                    <h1 class="contact-heading glitch-heading" data-text="SAY HI! AND LET'S CREATE SOMETHING OUT OF THIS WORLD!">
                      <span class="glitch-heading-line" data-i18n="heroLine1">SAY HI! AND LET'S CREATE</span>
                      <span class="glitch-heading-line" data-i18n="heroLine2">SOMETHING OUT OF THIS WORLD!</span>
                    </h1>
                    <p class="contact-watermark" aria-hidden="true">HELLO!</p>
                  </div>

                  <div class="contact-hero">
                    <div class="contact-form-wrap reveal-block">
                      <form class="contact-form" data-mail-form>
                        <label class="contact-field">
                          <span class="contact-field-label" data-i18n="fieldName">Name</span>
                          <input type="text" name="name" autocomplete="name" placeholder="John Snow" data-i18n-placeholder="fieldNamePlaceholder" required>
                        </label>

                        <label class="contact-field">
                          <span class="contact-field-label" data-i18n="fieldEmail">Email</span>
                          <input type="email" name="email" autocomplete="email" placeholder="johnsnow@winterfell.north" data-i18n-placeholder="fieldEmailPlaceholder" required>
                        </label>

                        <label class="contact-field">
                          <span class="contact-field-label" data-i18n="fieldPhone">Phone</span>
                          <input type="text" name="phone" autocomplete="tel" placeholder="000 000 000 000" data-i18n-placeholder="fieldPhonePlaceholder">
                        </label>

                        <label class="contact-field contact-field-message">
                          <span class="contact-field-label" data-i18n="fieldMessage">Message</span>
                          <textarea name="message" rows="5" placeholder="Hi there,&#10;&#10;We would love to talk about your next project." data-i18n-placeholder="fieldMessagePlaceholder" required></textarea>
                        </label>

                        <div class="contact-form-footer">
                          <p class="contact-form-note" data-i18n="formNote">Tell me a little about the project, timeline and what kind of help you need.</p>
                          <button class="contact-submit" type="submit">
                            <span class="contact-submit-fill" aria-hidden="true"></span>
                            <span class="contact-submit-segment contact-submit-segment-top" aria-hidden="true"></span>
                            <span class="contact-submit-segment contact-submit-segment-right" aria-hidden="true"></span>
                            <span class="contact-submit-segment contact-submit-segment-bottom" aria-hidden="true"></span>
                            <span class="contact-submit-segment contact-submit-segment-left" aria-hidden="true"></span>
                            <span class="contact-submit-label" data-i18n="send">Send</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      `
    }
  },
  portfolioPins: [
    { id: "calgary-ca", city: "Calgary", country: "Canada", lat: 51.0447, lon: -114.0719 },
    { id: "queensland-au", city: "Queensland", country: "Australia", lat: -20.9176, lon: 142.7028 },
    { id: "maryland-us", city: "Maryland", country: "USA", lat: 39.0458, lon: -76.6413 },
    { id: "lugoj-ro", city: "Lugoj", country: "Romania", lat: 45.6886, lon: 21.9031 },
    { id: "edmonton-ca", city: "Edmonton", country: "Canada", lat: 53.5461, lon: -113.4938 },
    { id: "florida-us", city: "Florida", country: "USA", lat: 27.6648, lon: -81.5158 },
    { id: "london-uk", city: "London", country: "United Kingdom", lat: 51.5072, lon: -0.1276 },
    { id: "new-york-us", city: "New York", country: "USA", lat: 40.7128, lon: -74.0060 }
  ],
  portfolioProjectDetails: {
    "queensland-au": {
      title: "Pacific Brand Direction",
      meta: "Concept design / visual language",
      year: "Selected work",
      status: "Design exploration",
      description: "A brand direction study focused on atmosphere, typography and motion-ready visual assets built to feel cinematic, refined and exportable across channels.",
      mediaType: "placeholder",
      highlights: [
        "Mood-driven concept development",
        "Editorial layout and campaign styling",
        "Flexible assets for digital and print"
      ],
      ctaHref: "#",
      ctaLabel: "See the full project"
    },
    "maryland-us": {
      title: "East Coast Identity System",
      meta: "Branding / rollout / collateral",
      year: "Selected work",
      status: "Delivered",
      description: "A structured identity package created to support launch, growth and consistency across client-facing materials, marketing surfaces and presentation decks.",
      mediaType: "placeholder",
      highlights: [
        "Core identity toolkit and brand usage logic",
        "Campaign collateral for multiple touchpoints",
        "Presentation-ready system components"
      ],
      ctaHref: "#",
      ctaLabel: "See the full project"
    },
    "edmonton-ca": {
      title: "Northern Campaign Suite",
      meta: "Campaign design / visual systems",
      year: "Selected work",
      status: "Delivered",
      description: "Campaign visuals designed to move fluidly between brand storytelling, promotional touchpoints and location-specific executions without losing a unified tone.",
      mediaType: "placeholder",
      highlights: [
        "Cross-channel creative consistency",
        "Launch-ready promotional graphics",
        "Scalable toolkit for internal teams"
      ],
      ctaHref: "#",
      ctaLabel: "See the full project"
    },
    "florida-us": {
      title: "Sunbelt Experience Branding",
      meta: "Hospitality / seasonal creative",
      year: "Selected work",
      status: "Delivered",
      description: "A warm, polished visual language developed for experience-led brands needing energetic but premium communication across guest journeys and marketing assets.",
      mediaType: "placeholder",
      highlights: [
        "Guest-facing visual storytelling",
        "Seasonal refresh concepts",
        "Marketing assets aligned to venue tone"
      ],
      ctaHref: "#",
      ctaLabel: "See the full project"
    },
    "london-uk": {
      title: "Editorial Motion Identity",
      meta: "Typography / layout / digital presence",
      year: "Selected work",
      status: "Concept + execution",
      description: "An editorial-first identity direction combining condensed type, dramatic spacing and cinematic rhythm to create a premium and modern digital presence.",
      mediaType: "placeholder",
      highlights: [
        "Expressive typographic hierarchy",
        "Motion-aware composition system",
        "Refined digital brand presentation"
      ],
      ctaHref: "#",
      ctaLabel: "See the full project"
    },
    "new-york-us": {
      title: "Urban Narrative Campaign",
      meta: "Narrative branding / art direction",
      year: "Selected work",
      status: "Delivered",
      description: "A campaign language shaped around contrast, tension and story-first framing, designed for bold launch materials and memorable visual impact.",
      mediaType: "placeholder",
      highlights: [
        "Narrative-led creative direction",
        "Bold visual contrast and pacing",
        "Launch campaign asset development"
      ],
      ctaHref: "#",
      ctaLabel: "See the full project"
    }
  },
  translations: {
    en: {
      common: {
        menu: "Menu",
        menuOpen: "Open menu",
        menuClose: "Close menu",
        home: "Home",
        about: "About me",
        portfolio: "Portfolio",
        contact: "Contact",
        languageSwitcher: "Language switcher",
        primaryMenu: "Primary menu",
        cornerLeft: "Reach\nperfection"
      },
      home: {
        subtitle: "Brings your ideas to life",
        cornerRight: "Welcome!",
        globeHint: "DRAG TO ROTATE",
        globeCta: "EXPLORE MY WORK!",
        globeCtaAria: "Explore my work",
        globeClassicCta: "CLASSIC VIEW",
        globeClassicCtaAria: "Open classic portfolio view"
      },
      portfolioClassic: {
        footerPage: "Classic\nview",
        chapterLabel: "Classic view",
        chapterLoadingLabel: "Loading chapter",
        chapterStatusLabel: "Archive status",
        chapterPhase1: "Initializing archive",
        chapterPhase2: "Streaming materials",
        chapterPhase3: "Building chapter",
        chapterPhase4: "Aligning details",
        chapterPhase5: "Chapter unlocked",
        chapterReadyLabel: "Chapter unlocked",
        chapterReadyHint: "Scroll to reveal the case study.",
        chapterRailLabel: "Case file",
        chapterRailPrompt: "Scroll through the proof.",
        chapterTransitionLabel: "Next chapter",
        chapterTransitionPrompt: "Keep scrolling to load the next project.",
        sectionOverviewLabel: "Overview",
        sectionDetailsLabel: "System lens",
        sectionGalleryLabel: "Selected frames",
        sectionSignalsLabel: "Signals",
        metaLocationLabel: "Location",
        metaScopeLabel: "Scope",
        metaYearLabel: "Timeline",
        metaRoleLabel: "Role",
        project1Kicker: "Hospitality brand system",
        project1Line1: "SYNDICATE",
        project1Line2: "HOSPITALITY GROUP",
        project1Body: "A long-term hospitality collaboration shaped across venues, menus, campaigns and launch materials, with Shelter Cocktail Bar currently opening the next chapter of the case study.",
        project1Lead: "A long-running hospitality system where each venue opens as its own mood piece, but still belongs to the same authored world.",
        project1Detail1: "The work grew venue by venue, translating a shared hospitality standard into menus, launch moments, signage, social assets and guest-facing details that still felt tailored to each room.",
        project1Detail2: "Rather than forcing sameness, the direction focused on continuity of atmosphere: darker tonal palettes, deliberate typography, tactile finishes and campaign material that could move from bar wall to mobile screen without losing character.",
        project1Location: "Calgary, Alberta, Canada",
        project1Scope: "Brand systems, menus, campaign assets, venue touchpoints",
        project1Year: "2017 - Present",
        project1Role: "Senior Graphic Designer",
        project1Signal1Title: "Venue personality",
        project1Signal1Body: "Every touchpoint was shaped to feel local to the venue, not like a corporate overlay dropped on top of it.",
        project1Signal2Title: "Campaign continuity",
        project1Signal2Body: "Menus, launch assets and social storytelling kept a consistent emotional tone even as formats changed.",
        project1Signal3Title: "Atmosphere first",
        project1Signal3Body: "The system was designed to be felt before it was decoded, which is what made the venues memorable.",
        project1Link: "Open SHG case study",
        project2Kicker: "Branding / packaging / product visualization",
        project2Line1: "THE NATURAL",
        project2Line2: "NIPPLE",
        project2Body: "A complete design direction for a feeding system that needed to feel warm, trustworthy and technically clear, from brand language to packaging and premium product visualization.",
        project2Lead: "A packaging and product story shaped to feel gentle, premium and medically clear without becoming cold or technical.",
        project2Detail1: "The identity had to hold two emotional tones at once: reassurance for parents and confidence for retail presentation. That balance shaped the wordmark, color decisions, packaging hierarchy and render direction.",
        project2Detail2: "Rather than relying on generic soft branding, the system focused on warmth with precision. The result was a product world that could feel caring in-hand while still reading as considered and premium on shelf.",
        project2Location: "Florida, USA",
        project2Scope: "Branding, packaging, product visualization, art direction",
        project2Year: "2022",
        project2Role: "End-to-end design direction",
        project2Signal1Title: "Trust by clarity",
        project2Signal1Body: "The packaging hierarchy was built to reduce hesitation and let the product feel understandable at a glance.",
        project2Signal2Title: "Premium restraint",
        project2Signal2Body: "The visual language stayed warm and minimal, avoiding the noise that often makes family-oriented packaging feel disposable.",
        project2Signal3Title: "Product presence",
        project2Signal3Body: "Visualization work elevated the tactile quality of the object itself, helping the system feel complete beyond the label.",
        project2Link: "Open The Natural Nipple",
        project3Kicker: "Self-initiated frontend system",
        project3Line1: "PORTFOLIO",
        project3Line2: "SYSTEM",
        project3Body: "The platform itself: a custom portfolio shell built around cinematic home interaction, bilingual routing and reusable case-study architecture designed to grow without losing atmosphere.",
        project3Lead: "A self-authored portfolio platform where atmosphere, routing, bilingual content and motion language had to work as one system rather than a set of pages.",
        project3Detail1: "The structure had to hold cinematic interaction on the home route, direct-entry HTML pages, route-aware behavior, bilingual content and expandable case-study architecture without collapsing into a fragile one-off build.",
        project3Detail2: "That meant designing not only what the site looked like, but how it loaded, routed, revealed content and scaled into future work while still feeling authored on every page.",
        project3Location: "Lugoj, Romania",
        project3Scope: "Art direction, frontend system, motion language",
        project3Year: "2026 - Current",
        project3Role: "Creative direction and development",
        project3Signal1Title: "Cinematic entry",
        project3Signal1Body: "The home route leads with atmosphere and motion, then hands off into a content system without breaking tone.",
        project3Signal2Title: "Reusable architecture",
        project3Signal2Body: "Routes, page behaviors and case-study structure were built to grow while keeping control over quality and pacing.",
        project3Signal3Title: "Bilingual precision",
        project3Signal3Body: "The system treats language, layout and interaction as connected parts of one authored experience.",
        project3Link: "Open Portfolio System",
        finalKicker: "Next step",
        finalLine1: "CHOOSE THE VIEW",
        finalLine2: "THAT FITS THE MOMENT",
        finalBody: "Jump back into the immersive globe experience, or continue the conversation directly if the work already feels like the right match.",
        finalPrimaryLink: "Return to immersive portfolio",
        finalSecondaryLink: "Contact Claudiu"
      },
      about: {
        footerPage: "About\nme",
        presentDay: "PRESENT",
        kickerStart: "The beginning",
        startLine1: "IT ALL STARTED",
        startLine2: "WITH A DREAM",
        waitForIt: "(ORIGIN)",
        startBody1: "What began as a childhood passion slowly turned into something far more enduring. The joy of drawing, shaping, and imagining became the foundation of a creative path that never really left me.",
        startBody2: "By 2007, that early instinct had started to take form professionally. What once lived in sketches and visual experiments began evolving into a lifelong commitment to design, growth, and artistic discipline.",
        kickerFreelancing: "Freelancing",
        amazing: "(BECOMING)",
        freelanceLine1: "YEARS OF",
        freelanceLine2: "FREELANCING",
        freelanceBody1: "For nearly five years, freelancing became both my classroom and my proving ground. It was a period shaped by discovery, adaptability, and the constant challenge of turning ideas into work that felt meaningful and distinct.",
        freelanceBody2: "Those years taught me how to move across industries, respond to different voices, and build with both intuition and discipline. They gave me range, but more importantly, they gave me direction.",
        kickerMirani: "Mirani Design",
        awesome: "(TOGETHER)",
        teamLine1: "THE FIRST",
        teamLine2: "REAL TEAM",
        teamBody1: "In 2012, I joined Mirani Design, a small and talented team built around friendship, creativity, and momentum. It was my first real step into a collaborative studio environment, where ideas moved faster and the work carried a different kind of energy.",
        teamBody2: "For a year, I contributed as a Graphic Designer across a diverse range of projects, gaining a deeper understanding of teamwork, rhythm, and shared creative ambition.",
        kickerTalonX: "TalonX - Creative Agency",
        fantastic: "(SCALE)",
        journeyLine1: "WHEN THE",
        journeyLine2: "JOURNEY EXPANDED",
        journeyBody1: "In 2013, I joined TalonX in Calgary, Alberta - the beginning of a defining chapter in my professional life. What started as a small creative agency became, over time, a place where my role, perspective, and standards evolved in lasting ways.",
        journeyBody2: "Across the years, the work grew in scale and depth. So did my involvement - from design execution to stronger influence over visual direction, consistency, branding, UI/UX, and the overall quality of what we built.",
        journeyBody3: "That chapter shaped more than my portfolio. It shaped the way I think: with structure, adaptability, and a long view of design.",
        kickerShg: "Syndicate Hospitality Group (SHG)",
        culinary: "(HOSPITALITY)",
        presentLine1: "THE HUNGER",
        presentLine2: "BECAME VISUAL",
        presentBody1: "Alongside my time at TalonX, my collaboration with Syndicate Hospitality Group opened a new creative direction - one rooted in atmosphere, experience, and the emotional power of place.",
        presentBody2: "From Shelter Cocktail Bar to Orchard, Fortuna's Row, and other hospitality concepts, I helped shape visual identities, menus, campaigns, and brand systems that were meant to be felt as much as seen.",
        presentBody3: "This work brought design closer to the real world - to environments, people, and moments. It deepened my sensitivity to cohesion, tone, and the way branding can live far beyond the screen.",
        kickerSwag: "S.W.A.G. Stuff We All Get",
        future: "(FUTURE)",
        swagLine1: "WHERE DESIGN",
        swagLine2: "BECAME A SYSTEM",
        swagBody1: "More recently, that evolution has extended into S.W.A.G. Stuff We All Get - a product shaped at the intersection of brand, experience, marketplace thinking, and AI.",
        swagBody2: "Through S.W.A.G., my role moved beyond visual execution into something broader: helping shape a living product system, where identity, interaction, storytelling, trust, and user flow all had to work together as one.",
        swagBody3: "It became a different kind of challenge - not just designing what people see, but helping define how the product behaves, feels, and grows over time. That shift continues to influence the way I think about design today.",
        whyMeLabel: "WHY ME",
        whyIntroLine1: "IT IS WONDERFUL",
        whyIntroLine2: "MEETING YOU",
        helloWord: "HELLO!",
        whyIntroBody1: "With more than fifteen years of practice behind me, design has become more than a profession. It is the way I shape clarity, atmosphere, and direction across brands, digital experiences, and visual systems.",
        whyIntroBody2: "Over time, my work has moved between identity, hospitality, UI/UX, campaigns, and product thinking - always with the same intention: to build work that feels considered, coherent, and built to last.",
        servicesKicker: "SUPPORT",
        servicesHeadingLine1: "HOW MY WORK",
        servicesHeadingLine2: "SUPPORTS YOUR BUSINESS",
        servicesWord: "SERVICES",
        servicePresenceTitle: "STRONGER BRAND PRESENCE",
        servicePresenceBody: "Clear visual systems create recognition, confidence, and consistency. From identity to execution, the work is shaped to feel intentional and memorable across every touchpoint.",
        serviceEngagementTitle: "BETTER ENGAGEMENT",
        serviceEngagementBody: "Thoughtful design helps people stay with what they are seeing. It improves clarity, strengthens communication, and creates stronger interaction across digital and brand experiences.",
        serviceDirectionTitle: "ADAPTIVE CREATIVE DIRECTION",
        serviceDirectionBody: "Design never stands still. My approach evolves with context, audience, and medium - helping brands stay relevant while keeping their visual language coherent over time.",
        practiceKicker: "PRACTICE",
        skillsWord: "SKILLS",
        practiceHeadingLine1: "TOOLS",
        practiceHeadingLine2: "AND DISCIPLINES",
        toolsColumnTitle: "TOOLS",
        disciplinesColumnTitle: "DISCIPLINES",
        toolItem1: "Figma",
        toolItem2: "Adobe Photoshop",
        toolItem3: "Adobe Illustrator",
        toolItem4: "Adobe InDesign",
        toolItem5: "Adobe After Effects",
        toolItem6: "Framer",
        toolItem7: "Adobe XD",
        toolItem8: "AI Workflows",
        disciplineItem1: "Brand Identity",
        disciplineItem2: "UI/UX Design",
        disciplineItem3: "Product Thinking",
        disciplineItem4: "Design Systems",
        disciplineItem5: "Hospitality Branding",
        disciplineItem6: "Visual Storytelling",
        disciplineItem7: "Investor Narratives",
        disciplineItem8: "Campaign Direction",
        levelCore: "CORE",
        levelStrong: "STRONG",
        levelAdvanced: "ADVANCED",
        levelEvolving: "EVOLVING"
      },
      contact: {
        kicker: "Its wonderful to hear from you",
        heroLine1: "SAY HI! AND LET'S CREATE",
        heroLine2: "SOMETHING OUT OF THIS WORLD!",
        emailValue: "hello@claudiuangheloni.com",
        phoneValue: "+40 732 466 473",
        locationValue: "Lugoj, Romania",
        fieldName: "Name",
        fieldNamePlaceholder: "John Snow",
        fieldEmail: "Email",
        fieldEmailPlaceholder: "johnsnow@winterfell.north",
        fieldPhone: "Phone",
        fieldPhonePlaceholder: "000 000 000 000",
        fieldMessage: "Message",
        fieldMessagePlaceholder: "Hi there,\n\nWe would love to talk about your next project.",
        formNote: "Tell me a little about the project, timeline and what kind of help you need.",
        send: "Send",
        socialFacebook: "Facebook",
        socialUpwork: "Upwork",
        socialLinkedin: "LinkedIn",
        socialBehance: "Behance",
        socialCta: "Let's talk!"
      }
    },
    ro: {
      common: {
        menu: "Meniu",
        menuOpen: "Deschide meniul",
        menuClose: "Inchide meniul",
        home: "Acasa",
        about: "Despre mine",
        portfolio: "Portofoliu",
        contact: "Contact",
        languageSwitcher: "Selector limba",
        primaryMenu: "Meniu principal",
        cornerLeft: "Atinge\nperfectiunea"
      },
      home: {
        subtitle: "Da viata ideilor tale",
        cornerRight: "Bine ai venit!",
        globeHint: "TRAGE CA SA ROTESTI",
        globeCta: "EXPLOREAZA PROIECTELE",
        globeCtaAria: "Exploreaza proiectele",
        globeClassicCta: "CLASSIC VIEW",
        globeClassicCtaAria: "Deschide portofoliul clasic"
      },
      portfolioClassic: {
        footerPage: "Classic\nview",
        chapterLabel: "Classic view",
        chapterLoadingLabel: "Loading chapter",
        chapterStatusLabel: "Status arhiva",
        chapterPhase1: "Initializare arhiva",
        chapterPhase2: "Incarcare materiale",
        chapterPhase3: "Construire capitol",
        chapterPhase4: "Aliniere detalii",
        chapterPhase5: "Capitol deblocat",
        chapterReadyLabel: "Capitol deblocat",
        chapterReadyHint: "Continua scroll-ul pentru a revela studiul de caz.",
        chapterRailLabel: "Fisier de caz",
        chapterRailPrompt: "Deruleaza prin dovada.",
        chapterTransitionLabel: "Capitolul urmator",
        chapterTransitionPrompt: "Continua scroll-ul pentru a incarca urmatorul proiect.",
        sectionOverviewLabel: "Privire de ansamblu",
        sectionDetailsLabel: "Perspectiva sistemului",
        sectionGalleryLabel: "Cadre selectate",
        sectionSignalsLabel: "Semnale",
        metaLocationLabel: "Locatie",
        metaScopeLabel: "Arie",
        metaYearLabel: "Perioada",
        metaRoleLabel: "Rol",
        project1Kicker: "Sistem de brand pentru hospitality",
        project1Line1: "SYNDICATE",
        project1Line2: "HOSPITALITY GROUP",
        project1Body: "O colaborare hospitality de lunga durata, construita prin venue-uri, meniuri, campanii si materiale de lansare, cu Shelter Cocktail Bar deschizand acum urmatorul capitol al studiului de caz.",
        project1Lead: "Un sistem hospitality construit pe termen lung, in care fiecare venue intra ca un mood piece propriu, dar ramane parte din aceeasi lume autorala.",
        project1Detail1: "Munca a crescut venue cu venue, traducand un standard comun de hospitality in meniuri, momente de lansare, signage, asset-uri sociale si detalii pentru oaspeti care inca se simteau potrivite fiecarei camere.",
        project1Detail2: "In loc sa forteze uniformitatea, directia s-a concentrat pe continuitatea atmosferei: palete mai intunecate, tipografie intentionata, finisaje tactile si materiale de campanie care puteau trece de pe peretele barului pe ecranul telefonului fara sa piarda caracter.",
        project1Location: "Calgary, Alberta, Canada",
        project1Scope: "Sisteme de brand, meniuri, asset-uri de campanie, touchpoint-uri de venue",
        project1Year: "2017 - Prezent",
        project1Role: "Senior Graphic Designer",
        project1Signal1Title: "Personalitatea venue-ului",
        project1Signal1Body: "Fiecare touchpoint a fost modelat sa para local venue-ului, nu un strat corporate pus peste el.",
        project1Signal2Title: "Continuitate de campanie",
        project1Signal2Body: "Meniurile, asset-urile de lansare si storytelling-ul social au pastrat acelasi ton emotional chiar si cand formatele se schimbau.",
        project1Signal3Title: "Atmosfera pe primul loc",
        project1Signal3Body: "Sistemul a fost gandit sa fie simtit inainte sa fie decodat, iar asta a facut venue-urile memorabile.",
        project1Link: "Deschide studiul de caz SHG",
        project2Kicker: "Branding / packaging / vizualizare de produs",
        project2Line1: "THE NATURAL",
        project2Line2: "NIPPLE",
        project2Body: "O directie completa de design pentru un sistem de hranire care trebuia sa para cald, de incredere si clar tehnic, de la limbajul de brand la packaging si vizualizare premium de produs.",
        project2Lead: "O poveste de packaging si produs construita sa para blanda, premium si clar medicala, fara sa devina rece sau tehnica.",
        project2Detail1: "Identitatea trebuia sa tina impreuna doua tonuri emotionale: liniste pentru parinti si incredere pentru prezentarea retail. Echilibrul acesta a modelat wordmark-ul, deciziile de culoare, ierarhia de packaging si directia pentru randari.",
        project2Detail2: "In loc sa se bazeze pe branding generic si bland, sistemul s-a construit pe caldura cu precizie. Rezultatul a fost o lume de produs care poate parea grijulie in mana, dar in acelasi timp atent construita si premium pe raft.",
        project2Location: "Florida, SUA",
        project2Scope: "Branding, packaging, vizualizare de produs, directie artistica",
        project2Year: "2022",
        project2Role: "Directie de design end-to-end",
        project2Signal1Title: "Incredere prin claritate",
        project2Signal1Body: "Ierarhia de pe packaging a fost construita sa reduca ezitarea si sa faca produsul usor de inteles dintr-o privire.",
        project2Signal2Title: "Retinere premium",
        project2Signal2Body: "Limbajul vizual a ramas cald si minim, evitand zgomotul care face adesea packaging-ul pentru familie sa para de unica folosinta.",
        project2Signal3Title: "Prezenta produsului",
        project2Signal3Body: "Vizualizarea a ridicat calitatea tactila a obiectului in sine si a facut sistemul sa para complet dincolo de eticheta.",
        project2Link: "Deschide The Natural Nipple",
        project3Kicker: "Sistem frontend initiat intern",
        project3Line1: "PORTFOLIO",
        project3Line2: "SYSTEM",
        project3Body: "Platforma in sine: un shell personalizat de portofoliu construit in jurul interactiunii cinematice din home, routing-ului bilingv si unei arhitecturi reutilizabile de studii de caz, gandita sa creasca fara sa piarda atmosfera.",
        project3Lead: "O platforma de portofoliu auto-autorata, unde atmosfera, routing-ul, continutul bilingv si limbajul de motion trebuiau sa functioneze ca un singur sistem, nu ca un set de pagini separate.",
        project3Detail1: "Structura trebuia sa sustina interactia cinematica din home, pagini HTML cu intrare directa, comportament dependent de ruta, continut bilingv si o arhitectura extensibila pentru studiile de caz fara sa cada intr-un one-off fragil.",
        project3Detail2: "Asta a insemnat nu doar sa desenez cum arata site-ul, ci sa gandesc cum incarca, cum ruteaza, cum reveleaza continutul si cum creste spre lucrari viitoare pastrand acelasi sentiment autoral pe fiecare pagina.",
        project3Location: "Lugoj, Romania",
        project3Scope: "Directie artistica, sistem frontend, limbaj de motion",
        project3Year: "2026 - Prezent",
        project3Role: "Directie creativa si development",
        project3Signal1Title: "Intrare cinematica",
        project3Signal1Body: "Ruta home deschide prin atmosfera si motion, apoi preda catre un sistem de continut fara sa rupa tonul.",
        project3Signal2Title: "Arhitectura reutilizabila",
        project3Signal2Body: "Rutele, comportamentele de pagina si structura studiilor de caz au fost construite sa creasca pastrand controlul asupra calitatii si ritmului.",
        project3Signal3Title: "Precizie bilingva",
        project3Signal3Body: "Sistemul trateaza limba, layout-ul si interactiunea ca parti conectate ale aceleiasi experiente autorale.",
        project3Link: "Deschide Portfolio System",
        finalKicker: "Pasul urmator",
        finalLine1: "ALEGE VERSIUNEA",
        finalLine2: "POTRIVITA MOMENTULUI",
        finalBody: "Intoarce-te in experienta imersiva cu globul sau continua conversatia direct, daca lucrarile se simt deja ca potrivirea potrivita.",
        finalPrimaryLink: "Revino la portofoliul imersiv",
        finalSecondaryLink: "Contacteaza-l pe Claudiu"
      },
      about: {
        footerPage: "Despre\nmine",
        presentDay: "PREZENT",
        kickerStart: "Inceputul",
        startLine1: "TOTUL A INCEPUT",
        startLine2: "CU UN VIS",
        waitForIt: "(ORIGINE)",
        startBody1: "Ceea ce a inceput ca o pasiune din copilarie s-a transformat incet in ceva mult mai durabil. Bucuria de a desena, de a modela si de a imagina a devenit fundatia unui drum creativ care nu m-a parasit niciodata cu adevarat.",
        startBody2: "Pana in 2007, instinctul acela timpuriu incepuse deja sa capete forma profesionala. Ceea ce traia candva in schite si experimente vizuale a inceput sa se transforme intr-un angajament de lunga durata fata de design, evolutie si disciplina artistica.",
        kickerFreelancing: "Freelancing",
        amazing: "(DEVENIRE)",
        freelanceLine1: "ANI DE",
        freelanceLine2: "FREELANCING",
        freelanceBody1: "Timp de aproape cinci ani, freelancing-ul a fost si scoala mea, si terenul meu de proba. A fost o perioada modelata de descoperire, adaptabilitate si provocarea constanta de a transforma ideile in lucru cu sens si personalitate.",
        freelanceBody2: "Anii aceia m-au invatat cum sa ma misc intre industrii, cum sa raspund unor voci diferite si cum sa construiesc cu intuitie, dar si cu disciplina. Mi-au oferit amplitudine, dar mai ales directie.",
        kickerMirani: "Mirani Design",
        awesome: "(IMPREUNA)",
        teamLine1: "PRIMA",
        teamLine2: "ECHIPA REALA",
        teamBody1: "In 2012, m-am alaturat Mirani Design, o echipa mica si talentata, construita in jurul prieteniei, creativitatii si al unui ritm viu. A fost primul meu pas real intr-un studio colaborativ, unde ideile se miscau mai repede, iar munca avea o energie diferita.",
        teamBody2: "Timp de un an, am contribuit ca Graphic Designer la proiecte diverse, intelegand mai profund ce inseamna lucrul in echipa, ritmul comun si ambitia creativa impartasita.",
        kickerTalonX: "TalonX - Agentie Creativa",
        fantastic: "(SCARA)",
        journeyLine1: "CAND DRUMUL",
        journeyLine2: "S-A EXTINS",
        journeyBody1: "In 2013, am ajuns la TalonX in Calgary, Alberta - inceputul unui capitol definitoriu in viata mea profesionala. Ceea ce a pornit ca o agentie creativa mica a devenit, in timp, locul in care rolul meu, perspectiva mea si standardele mele au crescut in mod durabil.",
        journeyBody2: "De-a lungul anilor, munca s-a extins ca scara si profunzime. La fel s-a extins si implicarea mea - de la executia de design la o influenta tot mai puternica asupra directiei vizuale, consistentei, brandingului, UI/UX-ului si calitatii generale a ceea ce construiam.",
        journeyBody3: "Capitolul acesta mi-a modelat mai mult decat portofoliul. Mi-a modelat felul de a gandi: cu structura, adaptabilitate si o perspectiva lunga asupra designului.",
        kickerShg: "Syndicate Hospitality Group (SHG)",
        culinary: "(OSPITALITATE)",
        presentLine1: "FOAMEA",
        presentLine2: "A DEVENIT VIZUALA",
        presentBody1: "In paralel cu anii mei la TalonX, colaborarea cu Syndicate Hospitality Group a deschis o noua directie creativa - una construita din atmosfera, experienta si puterea emotionala a locului.",
        presentBody2: "De la Shelter Cocktail Bar la Orchard, Fortuna's Row si alte concepte din zona hospitality, am contribuit la identitati vizuale, meniuri, campanii si sisteme de brand gandite sa fie simtite la fel de mult pe cat sunt vazute.",
        presentBody3: "Munca aceasta a adus designul mai aproape de lumea reala - de spatii, de oameni si de momente. Mi-a aprofundat sensibilitatea pentru coerenta, ton si felul in care brandingul poate trai mult dincolo de ecran.",
        kickerSwag: "S.W.A.G. Stuff We All Get",
        future: "(VIITOR)",
        swagLine1: "CAND DESIGNUL",
        swagLine2: "A DEVENIT SISTEM",
        swagBody1: "Mai recent, evolutia aceasta s-a extins in S.W.A.G. Stuff We All Get - un produs modelat la intersectia dintre brand, experienta, logica de marketplace si AI.",
        swagBody2: "Prin S.W.A.G., rolul meu a trecut dincolo de executia vizuala spre ceva mai amplu: contributia la un sistem de produs viu, unde identitatea, interactiunea, storytelling-ul, increderea si parcursul utilizatorului trebuiau sa functioneze impreuna.",
        swagBody3: "A devenit un alt tip de provocare - nu doar sa desenez ceea ce se vede, ci sa ajut la definirea felului in care produsul se comporta, se simte si creste in timp. Schimbarea aceasta continua sa-mi influenteze felul in care gandesc designul astazi.",
        whyMeLabel: "DE CE EU",
        whyIntroLine1: "E O BUCURIE",
        whyIntroLine2: "SA TE CUNOSC",
        helloWord: "SALUT!",
        whyIntroBody1: "Cu mai bine de cincisprezece ani de practica in spate, designul a devenit mai mult decat o profesie. Este felul in care dau forma claritatii, atmosferei si directiei in branduri, experiente digitale si sisteme vizuale.",
        whyIntroBody2: "In timp, munca mea a trecut prin identitate, hospitality, UI/UX, campanii si gandire de produs - mereu cu aceeasi intentie: sa construiesc lucrari care se simt gandite, coerente si facute sa reziste.",
        servicesKicker: "SUPORT",
        servicesHeadingLine1: "CUM SPRIJINA MUNCA MEA",
        servicesHeadingLine2: "BUSINESS-UL TAU",
        servicesWord: "SERVICII",
        servicePresenceTitle: "PREZENTA DE BRAND MAI PUTERNICA",
        servicePresenceBody: "Sistemele vizuale clare creeaza recunoastere, incredere si consistenta. De la identitate pana la executie, munca este construita sa se simta intentionata si memorabila in fiecare punct de contact.",
        serviceEngagementTitle: "ENGAGEMENT MAI BUN",
        serviceEngagementBody: "Designul atent ii ajuta pe oameni sa ramana conectati la ceea ce privesc. Aduce mai multa claritate, intareste comunicarea si creeaza interactiuni mai puternice in experiente digitale si de brand.",
        serviceDirectionTitle: "DIRECTIE CREATIVA ADAPTIVA",
        serviceDirectionBody: "Designul nu sta niciodata pe loc. Abordarea mea evolueaza odata cu contextul, publicul si mediul - ajutand brandurile sa ramana relevante, pastrand in acelasi timp coerenta limbajului lor vizual in timp.",
        practiceKicker: "PRACTICA",
        skillsWord: "SKILLS",
        practiceHeadingLine1: "UNELTE",
        practiceHeadingLine2: "SI DISCIPLINE",
        toolsColumnTitle: "UNELTE",
        disciplinesColumnTitle: "DISCIPLINE",
        toolItem1: "Figma",
        toolItem2: "Adobe Photoshop",
        toolItem3: "Adobe Illustrator",
        toolItem4: "Adobe InDesign",
        toolItem5: "Adobe After Effects",
        toolItem6: "Framer",
        toolItem7: "Adobe XD",
        toolItem8: "Fluxuri AI",
        disciplineItem1: "Identitate de Brand",
        disciplineItem2: "Design UI/UX",
        disciplineItem3: "Gandire de Produs",
        disciplineItem4: "Sisteme de Design",
        disciplineItem5: "Branding pentru Hospitality",
        disciplineItem6: "Storytelling Vizual",
        disciplineItem7: "Narative pentru Investitori",
        disciplineItem8: "Directie de Campanie",
        levelCore: "NUCLEU",
        levelStrong: "PUTERNIC",
        levelAdvanced: "AVANSAT",
        levelEvolving: "IN EVOLUTIE"
      },
      contact: {
        kicker: "Ma bucur sa aud despre proiectul tau",
        heroLine1: "SPUNE SALUT SI HAI SA",
        heroLine2: "CREAM CEVA SPECIAL.",
        emailValue: "hello@claudiuangheloni.com",
        phoneValue: "+40 732 466 473",
        locationValue: "Lugoj, Romania",
        fieldName: "Nume",
        fieldNamePlaceholder: "Ion Popescu",
        fieldEmail: "Email",
        fieldEmailPlaceholder: "ion.popescu@exemplu.ro",
        fieldPhone: "Telefon",
        fieldPhonePlaceholder: "0723 456 789",
        fieldMessage: "Mesaj",
        fieldMessagePlaceholder: "Salut,\n\nMi-ar placea sa vorbim despre urmatorul proiect.",
        formNote: "Spune-mi pe scurt despre proiect, timeline si tipul de ajutor de care ai nevoie.",
        send: "Trimite",
        socialFacebook: "Facebook",
        socialUpwork: "Upwork",
        socialLinkedin: "LinkedIn",
        socialBehance: "Behance",
        socialCta: "Hai sa vorbim!"
      }
    }
  }
};
