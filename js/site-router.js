(function () {
  function createSupportedRoutes(routeTemplates) {
    return Object.fromEntries(
      Object.entries(routeTemplates).map(([routeId, template]) => ([
        routeId,
        {
          id: routeId,
          path: template.path || `/${routeId}.html`,
          aliases: Array.isArray(template.aliases) && template.aliases.length
            ? template.aliases
            : [`/${routeId}.html`]
        }
      ]))
    );
  }

  function createSiteRouter({
    routeShell,
    pageRoot,
    pageStyleLink,
    metaDescriptionTag,
    metaThemeColorTag,
    globeRoot,
    starsCanvas,
    uiState,
    routeTemplates,
    routeClassNames,
    waitForWindowLoad,
    withTimeout,
    configureExternalLinks,
    getProjectScrollRoot,
    bindContactForm,
    bindTitleGlitch,
    prepareHomeTitleIntro,
    preparePageShellIntro,
    resetRouteBehaviors,
    scheduleClassicPortfolioScrollSetup,
    scheduleProjectScrollIndicatorSetup,
    setupAboutFooterReveal,
    setupProjectFooterReveal,
    setupRevealBlocks,
    suppressGridLinesFlashOnce,
    setLanguage,
    setMenuState,
    updateActiveMenu,
    ensureHomeVisuals,
    getHomeVisuals,
    finalizeSiteLoader
  }) {
    const supportedRoutes = createSupportedRoutes(routeTemplates);
    const templateCache = new Map();
    let renderRequestId = 0;
    let homePortfolioHashBootstrapPending = false;

    function getHomeVisualController() {
      return typeof getHomeVisuals === "function" ? getHomeVisuals() : null;
    }

    function normalizePath(pathname) {
      const cleanPath = pathname || "/";
      const normalizedPath = cleanPath.replace(/\\/g, "/");
      const pathSegments = normalizedPath.split("/").filter(Boolean);
      const fileName = pathSegments.length ? `/${pathSegments[pathSegments.length - 1]}` : "/";

      for (const route of Object.values(supportedRoutes)) {
        if (route.aliases.includes(cleanPath) || route.aliases.includes(fileName)) {
          return route;
        }
      }
      return supportedRoutes.home;
    }

    function getRouteUrl(route) {
      const htmlAlias = Array.isArray(route.aliases)
        ? route.aliases.find((alias) => /\.html$/i.test(alias))
        : "";

      if (window.location.protocol === "file:") {
        return (htmlAlias || route.path).replace(/^\//, "");
      }

      return route.path;
    }

    function routeUsesDarkBackdrop(route) {
      const template = routeTemplates[route.id];
      return Boolean(template && template.themeColor && template.themeColor.toLowerCase() !== "#ffffff");
    }

    function isProjectRoute(route) {
      if (!route) {
        return false;
      }

      const template = routeTemplates[route.id];
      return Boolean(template && /\bproject-page\b/.test(template.bodyClass || ""));
    }

    function syncHomePortfolioUrl(active) {
      if (!uiState.route || uiState.route.id !== "home") {
        return;
      }

      if (homePortfolioHashBootstrapPending && !active) {
        return;
      }

      const baseUrl = getRouteUrl(supportedRoutes.home);
      const nextUrl = active ? `${baseUrl}#portfolio` : baseUrl;
      const currentUrl = `${window.location.pathname}${window.location.hash}`;
      const targetUrl = nextUrl.startsWith("/") ? nextUrl : `/${nextUrl}`;

      if (currentUrl === targetUrl) {
        return;
      }

      window.history.replaceState(
        { route: supportedRoutes.home.id, focus: active ? "portfolio" : "home" },
        "",
        nextUrl
      );

      if (active) {
        homePortfolioHashBootstrapPending = false;
      }
    }

    function shouldOpenHomePortfolioFromUrl() {
      return normalizePath(window.location.pathname).id === "home" && window.location.hash === "#portfolio";
    }

    function navigateToRoute(route, { replace = false } = {}) {
      const method = replace ? "replaceState" : "pushState";
      window.history[method]({ route: route.id }, "", getRouteUrl(route));
      return renderRoute(route, { pushState: false });
    }

    function openPortfolioRoute() {
      const focusPortfolio = () => {
        const homeVisuals = getHomeVisualController();
        if (!homeVisuals) {
          return;
        }

        homeVisuals.focusProjects();
        setMenuState(false);
      };

      if (uiState.route && uiState.route.id === "home") {
        focusPortfolio();
        return;
      }

      setMenuState(false, { instant: true });
      renderRoute(supportedRoutes.home, { pushState: true }).then(() => {
        const homeVisuals = getHomeVisualController();
        if (homeVisuals) {
          homeVisuals.focusProjects();
        }
      });
    }

    function isPortfolioLink(link, url) {
      const href = link.getAttribute("href") || "";
      if (href === "#portfolio") {
        return true;
      }

      return url.hash === "#portfolio" && normalizePath(url.pathname).id === "home";
    }

    async function fetchTemplate(route) {
      if (templateCache.has(route.id)) {
        return templateCache.get(route.id);
      }

      const template = routeTemplates[route.id];
      if (!template) {
        throw new Error(`Missing template for route ${route.id}`);
      }

      templateCache.set(route.id, template);
      return template;
    }

    function bindInteractiveSounds(routeId) {
      if (!window.SiteAudio) {
        return;
      }

      window.SiteAudio.bindInteractiveSounds([
        ".menu-trigger",
        ".language-option",
        ".menu-link"
      ]);

      if (routeId === "home") {
        window.SiteAudio.bindInteractiveSounds([
          ".globe-action",
          ".project-panel-close",
          ".project-panel-cta"
        ]);
      }

      if (routeId === "contact") {
        window.SiteAudio.bindInteractiveSounds([
          ".contact-social-link[href]",
          ".contact-submit"
        ]);
      }

      if (routeId === "portfolioClassic") {
        window.SiteAudio.bindInteractiveSounds([
          ".classic-inline-link",
          ".classic-project-link"
        ]);
      }

      if (isProjectRoute({ id: routeId })) {
        window.SiteAudio.bindInteractiveSounds([
          ".project-explore-link"
        ]);
      }
    }

    async function renderRoute(route, options = {}) {
      const { pushState = true, initial = false } = options;
      const requestId = ++renderRequestId;

      if (route.id === "home" && typeof ensureHomeVisuals === "function") {
        await ensureHomeVisuals();
        if (requestId !== renderRequestId) {
          return false;
        }
      }

      const template = await fetchTemplate(route);
      if (requestId !== renderRequestId) {
        return false;
      }

      if (initial && isProjectRoute(route)) {
        const canonicalUrl = getRouteUrl(route);
        if (window.location.protocol !== "file:" && window.location.pathname !== canonicalUrl) {
          window.location.replace(canonicalUrl);
          return false;
        }
      }

      const homeVisuals = getHomeVisualController();
      const previousRouteId = uiState.route ? uiState.route.id : null;
      const shouldAnimateHomeFromFocus = !initial
        && previousRouteId === "home"
        && document.body.classList.contains("home-projects-focus");

      document.body.classList.remove("about-footer-visible");
      document.body.classList.remove("project-footer-visible");
      resetRouteBehaviors();

      routeShell.innerHTML = template.shell;
      pageRoot.innerHTML = template.page;
      document.title = template.title;
      if (metaDescriptionTag && template.description) {
        metaDescriptionTag.setAttribute("content", template.description);
      }
      if (metaThemeColorTag && template.themeColor) {
        metaThemeColorTag.setAttribute("content", template.themeColor);
      }

      if (template.pageStyle) {
        pageStyleLink.href = template.pageStyle;
        pageStyleLink.disabled = false;
      } else {
        pageStyleLink.href = "";
        pageStyleLink.disabled = true;
      }

      routeClassNames.forEach((className) => document.body.classList.remove(className));
      template.bodyClass.split(/\s+/).filter(Boolean).forEach((className) => {
        document.body.classList.add(className);
      });

      uiState.route = route;
      updateActiveMenu(route.id);
      setLanguage(uiState.lang);
      setMenuState(false, { instant: true });

      if (globeRoot) {
        globeRoot.style.pointerEvents = route.id === "home" ? "auto" : "none";
      }
      if (starsCanvas) {
        starsCanvas.style.pointerEvents = "none";
      }

      bindInteractiveSounds(route.id);

      if (route.id === "home") {
        if (!initial) {
          suppressGridLinesFlashOnce();
        }
        prepareHomeTitleIntro({ delayed: shouldAnimateHomeFromFocus });
        if (homeVisuals) {
          homeVisuals.show(true, { animateFromFocus: shouldAnimateHomeFromFocus });
        }
        bindTitleGlitch();
      } else {
        if (homeVisuals) {
          homeVisuals.show(false, { keepStars: routeUsesDarkBackdrop(route) });
        }
        preparePageShellIntro();
        setupRevealBlocks();
        if (route.id === "about") {
          setupAboutFooterReveal();
          scheduleProjectScrollIndicatorSetup();
        }
        if (isProjectRoute(route)) {
          setupProjectFooterReveal();
          scheduleProjectScrollIndicatorSetup();
        }
        if (route.id === "contact") {
          bindContactForm();
          configureExternalLinks(".contact-social-link[href]", "Profile link coming soon");
        }
        if (route.id === "portfolioClassic") {
          scheduleClassicPortfolioScrollSetup();
        }
      }

      if (!initial && pushState) {
        window.history.pushState({ route: route.id }, "", getRouteUrl(route));
      }

      if (isProjectRoute(route) || route.id === "about") {
        const projectScrollRoot = getProjectScrollRoot();
        if (projectScrollRoot && typeof projectScrollRoot.scrollTo === "function") {
          projectScrollRoot.scrollTo({ top: 0, left: 0, behavior: "auto" });
        } else if (projectScrollRoot) {
          projectScrollRoot.scrollTop = 0;
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }

      if (initial) {
        const canonicalUrl = route.id === "home" && shouldOpenHomePortfolioFromUrl()
          ? `${getRouteUrl(route)}#portfolio`
          : getRouteUrl(route);
        window.history.replaceState({ route: route.id }, "", canonicalUrl);
      }
      return true;
    }

    function handleLinkNavigation(event) {
      const link = event.target.closest("a[href]");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      const href = link.getAttribute("href") || "";
      const url = new URL(link.href, window.location.href);

      if (isPortfolioLink(link, url)) {
        event.preventDefault();
        openPortfolioRoute();
        return;
      }
      if (href.startsWith("#")) return;

      if (url.origin !== window.location.origin) return;
      if (url.hash && !link.dataset.routeLink) return;

      const route = normalizePath(url.pathname);
      if (!supportedRoutes[route.id]) return;

      event.preventDefault();
      if (uiState.route && route.id === uiState.route.id) {
        if (route.id === "home" && document.body.classList.contains("home-projects-focus")) {
          const homeVisuals = getHomeVisualController();
          if (homeVisuals) {
            homeVisuals.returnToHome();
          }
          setMenuState(false);
          return;
        }
        setMenuState(false);
        return;
      }
      setMenuState(false, { instant: true });
      navigateToRoute(route);
    }

    function revealInitialPage(route) {
      const homeVisuals = getHomeVisualController();

      if (route.id !== "home") {
        if (typeof finalizeSiteLoader === "function") {
          finalizeSiteLoader({ hideImmediately: true });
        } else {
          document.body.classList.remove("is-loading");
          document.body.classList.remove("is-revealing");
          document.body.classList.add("is-ready");
        }

        if (homeVisuals) {
          homeVisuals.show(false, { keepStars: routeUsesDarkBackdrop(route) });
        }
        return waitForWindowLoad().then(() => {
          if (!window.SiteAudio) {
            return;
          }

          const shouldRestoreAmbient = typeof window.SiteAudio.shouldRestoreAmbient === "function"
            ? window.SiteAudio.shouldRestoreAmbient()
            : false;

          if (!shouldRestoreAmbient) {
            return;
          }

          if (typeof window.SiteAudio.restoreAmbient === "function") {
            window.SiteAudio.restoreAmbient();
          } else if (typeof window.SiteAudio.startAmbient === "function") {
            window.SiteAudio.startAmbient();
          }

          if (typeof window.SiteAudio.prime === "function") {
            window.SiteAudio.prime();
          }
        });
      }

      const loaderMinimumTime = 1400;
      const loaderMaxWait = 3200;
      const loaderStartedAt = performance.now();
      const visualsReady = withTimeout(homeVisuals ? homeVisuals.ready : Promise.resolve(), loaderMaxWait, () => {
        console.warn("Home visuals reveal timed out; continuing with progressive asset loading.");
      });

      return Promise.all([
        waitForWindowLoad(),
        visualsReady
      ]).then(() => {
        const elapsed = performance.now() - loaderStartedAt;
        const remaining = Math.max(loaderMinimumTime - elapsed, 0);

        return new Promise((resolve) => {
          window.setTimeout(() => {
            if (typeof finalizeSiteLoader === "function") {
              finalizeSiteLoader({
                revealing: true,
                markReady: false,
                clearLoading: false
              });
            } else {
              document.body.classList.add("is-revealing");
            }

            if (homeVisuals) {
              homeVisuals.show(true);
            }
            window.setTimeout(() => {
              if (typeof finalizeSiteLoader === "function") {
                finalizeSiteLoader({ revealing: true });
              } else {
                document.body.classList.add("is-ready");
                document.body.classList.remove("is-loading");
              }

              if (window.SiteAudio) {
                if (typeof window.SiteAudio.startAmbient === "function") {
                  window.SiteAudio.startAmbient();
                }
                if (typeof window.SiteAudio.prime === "function") {
                  window.SiteAudio.prime();
                }
              }
              resolve();
            }, 640);
          }, remaining);
        });
      });
    }

    function bindDocumentNavigation() {
      document.addEventListener("click", handleLinkNavigation);
    }

    function bindHistoryNavigation() {
      window.addEventListener("popstate", () => {
        const route = normalizePath(window.location.pathname);
        renderRoute(route, { pushState: false }).then((didRender) => {
          if (!didRender) {
            return;
          }

          if (route.id === "home" && shouldOpenHomePortfolioFromUrl()) {
            const homeVisuals = getHomeVisualController();
            if (homeVisuals) {
              homeVisuals.focusProjects({
                instant: true,
                motionDelay: 0
              });
            }
          }
        });
      });
    }

    function initialize() {
      const initialRoute = normalizePath(window.location.pathname);
      uiState.initialRoute = initialRoute;
      homePortfolioHashBootstrapPending = shouldOpenHomePortfolioFromUrl();

      return renderRoute(initialRoute, { pushState: false, initial: true })
        .then(() => revealInitialPage(initialRoute))
        .then(() => {
          if (shouldOpenHomePortfolioFromUrl()) {
            const homeVisuals = getHomeVisualController();
            if (homeVisuals) {
              homeVisuals.focusProjects();
            }
          }

          return initialRoute;
        });
    }

    return {
      bindDocumentNavigation,
      bindHistoryNavigation,
      initialize,
      navigateToRoute,
      normalizePath,
      syncHomePortfolioUrl
    };
  }

  window.SiteRouter = {
    create: createSiteRouter
  };
})();
