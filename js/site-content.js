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
                <article class="about-story is-visible">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerStart">The beginning</span>
                    <span class="about-story-year">2007</span>
                  </div>
                  <h1 class="glitch-heading" data-text="IT ALL STARTED WITH A DREAM">
                    <span class="glitch-heading-muted" data-i18n="waitForIt">(WAIT FOR IT)</span>
                    <span class="glitch-heading-line" data-i18n="startLine1">IT ALL STARTED</span>
                    <span class="glitch-heading-line" data-i18n="startLine2">WITH A DREAM</span>
                  </h1>
                  <div class="body-copy">
                    <p data-i18n="startBody1">What began as a childhood passion has evolved into a lifelong commitment to artistic excellence. The joy I find in creating, coupled with a dedication to continuous improvement, fuels my enthusiasm for every project I undertake.</p>
                    <p data-i18n="startBody2">In summary, my artistic journey, which began with childhood sketches and paintings, took a professional turn in 2007. Since then, I've cultivated a career marked by creativity, adaptability, and a deep-seated passion for transforming ideas into visually captivating realities.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerFreelancing">Freelancing</span>
                    <span class="about-story-year">-2012</span>
                  </div>
                  <h2 class="glitch-heading" data-text="YEARS OF FREELANCING">
                    <span class="glitch-heading-muted" data-i18n="amazing">(AMAZING)</span>
                    <span class="glitch-heading-line" data-i18n="freelanceLine1">YEARS OF</span>
                    <span class="glitch-heading-line" data-i18n="freelanceLine2">FREELANCING</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="freelanceBody1">For almost five years, I navigated the dynamic landscape of graphic design as a freelance practitioner, immersing myself in a world that became both my canvas and classroom. This period of freelancing has been instrumental in shaping my career, offering a rich tapestry of learning experiences, diverse projects, and a platform for specialization.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerMirani">Mirani Design</span>
                    <span class="about-story-year">2012-</span>
                  </div>
                  <h2 class="glitch-heading" data-text="FIRST TIME BEING APART OF A TEAM">
                    <span class="glitch-heading-line" data-i18n="teamLine1">FIRST TIME BEING</span>
                    <span class="glitch-heading-line" data-i18n="teamLine2">APART OF A</span>
                    <span class="glitch-heading-line glitch-heading-line-inline">
                      <span class="glitch-heading-muted" data-i18n="awesome">(AWESOME)</span>
                      <span data-i18n="teamLine3">TEAM</span>
                    </span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="teamBody1">In 2012 I joined the dynamic and talented team at Mirani Design, a close-knit group of three friends who shared a passion for creativity and innovation. Over the course of an exhilarating year, I had the privilege of contributing my skills as a Graphic Designer to a diverse range of businesses spanning the globe.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerTalonX">TalonX - Creative Agency</span>
                    <span class="about-story-year">2013-</span>
                  </div>
                  <h2 class="glitch-heading glitch-heading-journey" data-text="WHEN MY JOURNEY REALLY STARTS">
                    <span class="glitch-heading-line glitch-heading-line-inline">
                      <span data-i18n="journeyLine1">WHEN MY</span>
                      <span class="glitch-heading-muted" data-i18n="fantastic">(FANTASTIC)</span>
                    </span>
                    <span class="glitch-heading-line" data-i18n="journeyLine2">JOURNEY REALLY</span>
                    <span class="glitch-heading-line" data-i18n="journeyLine3">STARTS</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="journeyBody1">In 2013, I embarked on a transformative journey by joining TalonX, a bustling creative agency based in Calgary, Alberta. Beginning with just myself and the visionary founder, Nick Suchu, this nine-year odyssey has been an extraordinary chapter that has defined my professional identity. In the early years at TalonX, the journey was a collaborative endeavor between Nick Suchu and myself. The challenges and victories of these formative years laid the groundwork for what would evolve into one of the premier design agencies in the area.</p>
                    <p data-i18n="journeyBody2">Working closely with Nick, I witnessed the birth of a strategic vision that aligned not just for excellence but for a distinctive brand of creativity that would set TalonX apart in the competitive design landscape. TalonX's exponential growth saw our humble beginnings evolve into a thriving agency, expanding our team and capabilities. The collaborative spirit that defined the agency's culture remained a driving force even as we worked with hundreds of local and global businesses. Though our commitment to excellence remained unchanged, the projects in the area provided an ever-evolving environment to continuously innovate, solve, and discover.</p>
                    <p data-i18n="journeyBody3">My role as a Senior Graphic Designer evolved with the agency. I took on leadership responsibilities, contributing to the shaping of design strategies, overseeing projects, and mentoring a growing team of talented designers. The design industry is dynamic, and at TalonX, we embraced change. I adapted to emerging design trends, ensuring that our work remained not only relevant but also ahead of the curve.</p>
                    <p data-i18n="journeyBody4">These nine years at TalonX have been more than a professional journey; they have been a period of personal growth and transformation. The challenges, triumphs, and collaborations have collectively shaped who I am today as a designer. As TalonX became synonymous with design excellence, I take pride in the role I played in contributing to its legacy. The agency's success is a testament to our shared commitment to pushing creative boundaries and delivering unparalleled design solutions.</p>
                  </div>
                </article>

                <article class="about-story reveal-block">
                  <div class="about-story-intro">
                    <span class="about-story-kicker" data-i18n="kickerShg">Syndicate Hospitality Group (SHG)</span>
                    <span class="about-story-year about-story-year-present" data-i18n="presentDay">PRESENT DAY</span>
                  </div>
                  <h2 class="glitch-heading" data-text="THE HUNGER FOR PASSION">
                    <span class="glitch-heading-line" data-i18n="presentLine1">THE HUNGER</span>
                    <span class="glitch-heading-line glitch-heading-line-inline">
                      <span data-i18n="presentLine2">FOR</span>
                      <span class="glitch-heading-muted" data-i18n="culinary">(CULINARY)</span>
                    </span>
                    <span class="glitch-heading-line" data-i18n="presentLine3">PASSION</span>
                  </h2>
                  <div class="body-copy">
                    <p data-i18n="presentBody1">Concurrently with my tenure at TalonX Creative Agency, I embarked on a captivating journey with Syndicate Hospitality Group, a venture that has been nothing short of extraordinary. This dual role has not only nurtured my creative horizons, focusing my creative energies on the fascinating realm of restaurant design.</p>
                    <p data-i18n="presentBody2">Witnessing the inception of Shelter Cocktail Bar, a one-of-a-kind establishment in Calgary, Alberta, was an exhilarating experience. As the Senior Graphic Designer, I played a pivotal role in crafting a visual identity that mirrored the uniqueness and allure of Shelter. From Shelter Cocktail Bar, our journey expanded. Syndicate Hospitality Group launched the addition of Orchard Restaurant and Bar, Fortuna's Row, and several new food and beverage brands. Over the years, my involvement in the visual expression of each space deepened through menus, design systems, campaigns, and immersive guest-facing moments.</p>
                    <p data-i18n="presentBody3">Crafting menus became a distinctive forte. From Shelter's innovative cocktail menus to Orchard's culinary creations and Fortuna's Row's diverse offerings, each menu was designed to be an integral part of the dining experience. The visual identity of each venue was carefully curated, ensuring that logos and branding communicated the unique essence of Shelter, Orchard, and Fortuna's Row. These design elements became a vital aspect of each establishment's character. A hallmark of my role was collaboration: working with culinary teams to ensure that the design seamlessly intertwined with the culinary vision.</p>
                    <p data-i18n="presentBody4">The years spent specializing in restaurant design have been nothing short of fantastic. The passion for creating immersive visual experiences for diners, capturing the essence of each venue, remains an enduring joy that continues to drive my creativity. Current and future endeavors: As I continue my journey with Syndicate Hospitality Group, I look forward to new challenges, fresh creative opportunities, and contributing to the ever-evolving visual narrative of each venue.</p>
                    <p data-i18n="presentBody5">Reflecting on this period, it's not just about designing for Shelter, Orchard, and Fortuna's Row. It's about curating experiences, capturing the spirit of each establishment, and contributing to the vibrant tapestry of Calgary's hospitality scene.</p>
                  </div>
                </article>
              </section>
            </main>
          </div>
        </div>
      `
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
        globeCta: "EXPLORE MY WORK!"
      },
      about: {
        footerPage: "About\nme",
        presentDay: "PRESENT\nDAY",
        kickerStart: "The beginning",
        startLine1: "IT ALL STARTED",
        startLine2: "WITH A DREAM",
        waitForIt: "(WAIT FOR IT)",
        startBody1: "What began as a childhood passion has evolved into a lifelong commitment to artistic excellence. The joy I find in creating, coupled with a dedication to continuous improvement, fuels my enthusiasm for every project I undertake.",
        startBody2: "In summary, my artistic journey, which began with childhood sketches and paintings, took a professional turn in 2007. Since then, I've cultivated a career marked by creativity, adaptability, and a deep-seated passion for transforming ideas into visually captivating realities.",
        kickerFreelancing: "Freelancing",
        amazing: "(AMAZING)",
        freelanceLine1: "YEARS OF",
        freelanceLine2: "FREELANCING",
        freelanceBody1: "For almost five years, I navigated the dynamic landscape of graphic design as a freelance practitioner, immersing myself in a world that became both my canvas and classroom. This period of freelancing has been instrumental in shaping my career, offering a rich tapestry of learning experiences, diverse projects, and a platform for specialization.",
        kickerMirani: "Mirani Design",
        awesome: "(AWESOME)",
        teamLine1: "FIRST TIME BEING",
        teamLine2: "APART OF A",
        teamLine3: "TEAM",
        teamBody1: "In 2012 I joined the dynamic and talented team at Mirani Design, a close-knit group of three friends who shared a passion for creativity and innovation. Over the course of an exhilarating year, I had the privilege of contributing my skills as a Graphic Designer to a diverse range of businesses spanning the globe.",
        kickerTalonX: "TalonX - Creative Agency",
        fantastic: "(FANTASTIC)",
        journeyLine1: "WHEN MY",
        journeyLine2: "JOURNEY REALLY",
        journeyLine3: "STARTS",
        journeyBody1: "In 2013, I embarked on a transformative journey by joining TalonX, a bustling creative agency based in Calgary, Alberta. Beginning with just myself and the visionary founder, Nick Suchu, this nine-year odyssey has been an extraordinary chapter that has defined my professional identity. In the early years at TalonX, the journey was a collaborative endeavor between Nick Suchu and myself. The challenges and victories of these formative years laid the groundwork for what would evolve into one of the premier design agencies in the area.",
        journeyBody2: "Working closely with Nick, I witnessed the birth of a strategic vision that aligned not just for excellence but for a distinctive brand of creativity that would set TalonX apart in the competitive design landscape. TalonX's exponential growth saw our humble beginnings evolve into a thriving agency, expanding our team and capabilities. The collaborative spirit that defined the agency's culture remained a driving force even as we worked with hundreds of local and global businesses. Though our commitment to excellence remained unchanged, the projects in the area provided an ever-evolving environment to continuously innovate, solve, and discover.",
        journeyBody3: "My role as a Senior Graphic Designer evolved with the agency. I took on leadership responsibilities, contributing to the shaping of design strategies, overseeing projects, and mentoring a growing team of talented designers. The design industry is dynamic, and at TalonX, we embraced change. I adapted to emerging design trends, ensuring that our work remained not only relevant but also ahead of the curve.",
        journeyBody4: "These nine years at TalonX have been more than a professional journey; they have been a period of personal growth and transformation. The challenges, triumphs, and collaborations have collectively shaped who I am today as a designer. As TalonX became synonymous with design excellence, I take pride in the role I played in contributing to its legacy. The agency's success is a testament to our shared commitment to pushing creative boundaries and delivering unparalleled design solutions.",
        kickerShg: "Syndicate Hospitality Group (SHG)",
        culinary: "(CULINARY)",
        presentLine1: "THE HUNGER",
        presentLine2: "FOR",
        presentLine3: "PASSION",
        presentBody1: "Concurrently with my tenure at TalonX Creative Agency, I embarked on a captivating journey with Syndicate Hospitality Group, a venture that has been nothing short of extraordinary. This dual role has not only nurtured my creative horizons, focusing my creative energies on the fascinating realm of restaurant design.",
        presentBody2: "Witnessing the inception of Shelter Cocktail Bar, a one-of-a-kind establishment in Calgary, Alberta, was an exhilarating experience. As the Senior Graphic Designer, I played a pivotal role in crafting a visual identity that mirrored the uniqueness and allure of Shelter. From Shelter Cocktail Bar, our journey expanded. Syndicate Hospitality Group launched the addition of Orchard Restaurant and Bar, Fortuna's Row, and several new food and beverage brands. Over the years, my involvement in the visual expression of each space deepened through menus, design systems, campaigns, and immersive guest-facing moments.",
        presentBody3: "Crafting menus became a distinctive forte. From Shelter's innovative cocktail menus to Orchard's culinary creations and Fortuna's Row's diverse offerings, each menu was designed to be an integral part of the dining experience. The visual identity of each venue was carefully curated, ensuring that logos and branding communicated the unique essence of Shelter, Orchard, and Fortuna's Row. These design elements became a vital aspect of each establishment's character. A hallmark of my role was collaboration: working with culinary teams to ensure that the design seamlessly intertwined with the culinary vision.",
        presentBody4: "The years spent specializing in restaurant design have been nothing short of fantastic. The passion for creating immersive visual experiences for diners, capturing the essence of each venue, remains an enduring joy that continues to drive my creativity. Current and future endeavors: As I continue my journey with Syndicate Hospitality Group, I look forward to new challenges, fresh creative opportunities, and contributing to the ever-evolving visual narrative of each venue.",
        presentBody5: "Reflecting on this period, it's not just about designing for Shelter, Orchard, and Fortuna's Row. It's about curating experiences, capturing the spirit of each establishment, and contributing to the vibrant tapestry of Calgary's hospitality scene."
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
        globeCta: "EXPLOREAZA PROIECTELE"
      },
      about: {
        footerPage: "Despre\nmine",
        presentDay: "PREZENT",
        kickerStart: "Inceputul",
        startLine1: "TOTUL A INCEPUT",
        startLine2: "CU UN VIS",
        waitForIt: "(AI RABDARE)",
        startBody1: "Ceea ce a inceput ca o pasiune din copilarie s-a transformat intr-un angajament pe viata fata de excelenta artistica. Bucuria pe care o gasesc in procesul de creatie, alaturi de dorinta constanta de a evolua, imi alimenteaza entuziasmul pentru fiecare proiect.",
        startBody2: "Pe scurt, drumul meu artistic, inceput cu schite si picturi din copilarie, a capatat o directie profesionala in 2007. De atunci mi-am construit o cariera definita de creativitate, adaptabilitate si pasiunea de a transforma ideile in rezultate vizuale memorabile.",
        kickerFreelancing: "Freelancing",
        amazing: "(INCREDIBIL)",
        freelanceLine1: "ANI DE",
        freelanceLine2: "FREELANCING",
        freelanceBody1: "Timp de aproape cinci ani am navigat lumea dinamica a graphic design-ului ca freelancer, intr-o perioada care a fost in acelasi timp si teren de joaca, si scoala. Aceasta etapa mi-a modelat puternic parcursul profesional prin proiecte diverse, experiente intense si oportunitati reale de specializare.",
        kickerMirani: "Mirani Design",
        awesome: "(EXTRAORDINARA)",
        teamLine1: "PRIMA DATA",
        teamLine2: "INTR-O",
        teamLine3: "ECHIPA",
        teamBody1: "In 2012 m-am alaturat echipei talentate de la Mirani Design, un grup unit de trei prieteni cu aceeasi pasiune pentru creativitate si inovatie. Intr-un singur an intens, am contribuit ca Graphic Designer la o varietate de proiecte pentru business-uri din intreaga lume.",
        kickerTalonX: "TalonX - Agentie Creativa",
        fantastic: "(FANTASTIC)",
        journeyLine1: "CAND",
        journeyLine2: "CALATORIA MEA",
        journeyLine3: "INCEPE CU ADEVARAT",
        journeyBody1: "In 2013 am inceput o etapa transformatoare odata cu alaturarea la TalonX, o agentie creativa dinamica din Calgary, Alberta. Am pornit la drum alaturi de fondatorul vizionar Nick Suchu, iar aceasta aventura de noua ani a devenit un capitol definitoriu pentru identitatea mea profesionala. In primii ani, provocarile si reusitele noastre au pus fundatia pentru ceea ce urma sa devina una dintre agentiile de design remarcabile din zona.",
        journeyBody2: "Lucrand indeaproape cu Nick, am vazut cum a prins contur o viziune strategica orientata nu doar spre excelenta, ci si spre un stil creativ distinct. Cresterea accelerata a TalonX ne-a dus de la un inceput modest la o agentie in plina expansiune, cu o echipa mai mare si capabilitati extinse. Spiritul colaborativ a ramas esential chiar si atunci cand am ajuns sa lucram cu sute de business-uri locale si internationale.",
        journeyBody3: "Rolul meu de Senior Graphic Designer a evoluat odata cu agentia. Mi-am asumat responsabilitati de leadership, am contribuit la strategii de design, am coordonat proiecte si am sustinut dezvoltarea unei echipe de designeri talentati. Industria se schimba constant, iar la TalonX am imbratisat aceasta schimbare pentru a ramane relevanti si cu un pas inainte.",
        journeyBody4: "Cei noua ani petrecuti la TalonX au insemnat mai mult decat o experienta profesionala; au fost o perioada de crestere personala si transformare. Provocarile, reusitele si colaborarile din acest interval au contribuit la omul si designerul care sunt astazi. Succesul agentiei reflecta angajamentul nostru comun de a impinge limitele creativitatii si de a livra solutii de design exceptionale.",
        kickerShg: "Syndicate Hospitality Group (SHG)",
        culinary: "(CULINARA)",
        presentLine1: "FOAMEA",
        presentLine2: "PENTRU",
        presentLine3: "PASIUNE",
        presentBody1: "In paralel cu perioada mea la TalonX Creative Agency, am pornit si intr-o calatorie captivanta alaturi de Syndicate Hospitality Group, o experienta cu adevarat speciala. Acest rol dublu mi-a extins orizonturile creative si mi-a concentrat energia asupra fascinantei lumi a designului pentru ospitalitate si restaurante.",
        presentBody2: "Sa asist la aparitia Shelter Cocktail Bar, un loc aparte din Calgary, Alberta, a fost o experienta memorabila. In rolul de Senior Graphic Designer am contribuit decisiv la conturarea unei identitati vizuale care sa reflecte unicitatea si farmecul locatiei. De la Shelter, parcursul s-a extins catre Orchard Restaurant and Bar, Fortuna's Row si alte concepte noi din zona food and beverage.",
        presentBody3: "Crearea meniurilor a devenit una dintre specializarile mele. De la cocktail menus pentru Shelter la experientele culinare Orchard si ofertele diverse Fortuna's Row, fiecare meniu a fost gandit ca parte integrata a experientei clientului. Identitatea vizuala a fiecarui spatiu a fost construita atent, astfel incat brandingul sa comunice autentic esenta fiecarui loc.",
        presentBody4: "Anii dedicati designului pentru restaurante au fost extraordinari. Pasiunea de a construi experiente vizuale imersive pentru oaspeti si de a surprinde personalitatea fiecarui venue continua sa fie una dintre cele mai mari surse ale creativitatii mele. Privind spre prezent si viitor, astept cu entuziasm noi provocari si oportunitati creative.",
        presentBody5: "Privind inapoi, aceasta etapa nu a fost doar despre a crea pentru Shelter, Orchard sau Fortuna's Row. A fost despre a construi experiente, a surprinde spiritul fiecarui loc si a contribui la energia scenei de hospitality din Calgary."
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
