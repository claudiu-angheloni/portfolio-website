const routeShell = document.getElementById("route-shell");
const pageRoot = document.getElementById("page-root");
const pageStyleLink = document.getElementById("page-style");
const metaDescriptionTag = document.getElementById("meta-description");
const metaThemeColorTag = document.getElementById("meta-theme-color");
const menuTrigger = document.querySelector(".menu-trigger");
const menuPanel = document.querySelector(".menu-panel");
const uiInner = document.querySelector(".ui-inner");
const languageOptions = Array.from(document.querySelectorAll(".language-option"));
const starsCanvas = document.getElementById("stars");
const starsContext = starsCanvas ? starsCanvas.getContext("2d") : null;
const globeRoot = document.getElementById("globe-root");
const reducedMotionQuery = typeof window.matchMedia === "function"
  ? window.matchMedia("(prefers-reduced-motion: reduce)")
  : null;
const MENU_CLOSE_DURATION = 520;
const MENU_HOME_REVEAL_DELAY = 180;
const HOME_PIXEL_RATIO_LIMIT = 1.5;
const CONTACT_EMAIL = "hello@claudiuangheloni.com";
const PLACEHOLDER_LINKS = new Set([
  "https://facebook.com/",
  "https://www.facebook.com/",
  "https://upwork.com/",
  "https://www.upwork.com/",
  "https://linkedin.com/",
  "https://www.linkedin.com/",
  "https://behance.net/",
  "https://www.behance.net/"
]);
const MENU_FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(", ");

const uiState = {
  lang: "en",
  route: null,
  initialRoute: null
};
const siteContent = window.SiteContent || {};
const translations = siteContent.translations || {};
const portfolioPins = Array.isArray(siteContent.portfolioPins) ? siteContent.portfolioPins : [];
const portfolioProjectDetails = siteContent.portfolioProjectDetails || {};

function isPortfolioActive() {
  return Boolean(
    uiState.route
    && uiState.route.id === "home"
    && document.body.classList.contains("home-projects-focus")
  );
}

function getProjectPageShell() {
  return document.querySelector(".project-page .project-scroll-shell")
    || document.querySelector(".project-page .page-shell")
    || document.querySelector(".page-shell");
}

function getAboutPageShell() {
  return document.querySelector(".about-page .about-scroll-shell")
    || document.querySelector(".about-page .page-shell")
    || document.querySelector(".page-shell");
}

const siteUtils = window.SiteUtils.create({
  uiInner,
  pageRoot,
  starsCanvas,
  starsContext,
  globeRoot,
  reducedMotionQuery,
  contactEmail: CONTACT_EMAIL,
  placeholderLinks: PLACEHOLDER_LINKS,
  menuFocusableSelector: MENU_FOCUSABLE_SELECTOR
});

const {
  captureProjectPanelFocus,
  configureExternalLinks,
  createHomeVisualFallback,
  finalizeSiteLoader,
  focusFirstProjectPanelElement,
  getActiveProjectPanel,
  getProjectPanelFocusableElements,
  isInternalUrl,
  isPlaceholderLink,
  loadScriptOnce,
  openContactMailto,
  prefersReducedMotion,
  restoreProjectPanelFocus,
  setPlaceholderLinkState,
  setProjectPanelBackgroundInert,
  waitForWindowLoad,
  withTimeout
} = siteUtils;

const siteShell = window.SiteShell.create({
  routeShell,
  pageRoot,
  menuTrigger,
  menuPanel,
  languageOptions,
  uiState,
  translations,
  menuFocusableSelector: MENU_FOCUSABLE_SELECTOR,
  menuCloseDuration: MENU_CLOSE_DURATION,
  menuHomeRevealDelay: MENU_HOME_REVEAL_DELAY,
  isPortfolioActive
});

const {
  bindLanguageOptions,
  bindMenuInteractions,
  getMenuFocusableElements,
  setLanguage,
  setMenuState,
  setProjectPanelCloseHandler,
  updateActiveMenu
} = siteShell;

const sitePageBehaviors = window.SitePageBehaviors.create({
  getProjectPageShell,
  getAboutPageShell,
  waitForWindowLoad,
  pageStyleLink,
  openContactMailto
});

const {
  bindContactForm,
  bindTitleGlitch,
  getProjectScrollRoot,
  prepareExploreActionIntro,
  prepareHomeTitleIntro,
  preparePageShellIntro,
  proxyProjectWheelScroll,
  resetRouteBehaviors,
  revealExploreActionIntro,
  revealHomeTitleIntro,
  scheduleProjectScrollIndicatorSetup,
  setupAboutFooterReveal,
  setupProjectFooterReveal,
  setupRevealBlocks,
  suppressGridLinesFlashOnce
} = sitePageBehaviors;

let homeVisuals = createHomeVisualFallback();
let homeVisualsHydrated = false;
let homeVisualsReadyPromise = null;

const siteRouter = window.SiteRouter.create({
  routeShell,
  pageRoot,
  pageStyleLink,
  metaDescriptionTag,
  metaThemeColorTag,
  globeRoot,
  starsCanvas,
  uiState,
  routeTemplates: siteContent.routeTemplates || {},
  routeClassNames: ["about-page", "about-theme-light", "contact-page", "project-page", "project-page-dark"],
  waitForWindowLoad,
  withTimeout,
  configureExternalLinks,
  getProjectScrollRoot,
  bindContactForm,
  bindTitleGlitch,
  prepareHomeTitleIntro,
  preparePageShellIntro,
  resetRouteBehaviors,
  scheduleProjectScrollIndicatorSetup,
  setupAboutFooterReveal,
  setupProjectFooterReveal,
  setupRevealBlocks,
  suppressGridLinesFlashOnce,
  setLanguage,
  setMenuState,
  updateActiveMenu,
  ensureHomeVisuals: () => ensureHomeVisualsReady(),
  getHomeVisuals: () => homeVisuals,
  finalizeSiteLoader
});

const {
  bindDocumentNavigation,
  bindHistoryNavigation,
  initialize,
  navigateToRoute,
  normalizePath,
  syncHomePortfolioUrl
} = siteRouter;

function createHomeVisualsInstance() {
  if (!window.SiteHomeVisuals || typeof window.SiteHomeVisuals.create !== "function") {
    return createHomeVisualFallback();
  }

  return window.SiteHomeVisuals.create({
    createHomeVisualFallback,
    focusFirstProjectPanelElement,
    captureProjectPanelFocus,
    restoreProjectPanelFocus,
    isInternalUrl,
    isPlaceholderLink,
    setPlaceholderLinkState,
    setProjectPanelBackgroundInert,
    prefersReducedMotion,
    prepareExploreActionIntro,
    prepareHomeTitleIntro,
    revealExploreActionIntro,
    revealHomeTitleIntro,
    navigateToRoute,
    normalizePath,
    syncHomePortfolioUrl,
    updateActiveMenu,
    uiState,
    portfolioPins,
    portfolioProjectDetails,
    starsCanvas,
    starsContext,
    globeRoot,
    homePixelRatioLimit: HOME_PIXEL_RATIO_LIMIT,
    isPortfolioActive
  });
}

function wireProjectPanelCloseHandler() {
  setProjectPanelCloseHandler(() => {
    homeVisuals.closeProjectPanel();
  });
}

function getRuntimeScriptPath(src) {
  return window.location.protocol === "file:" ? src : `/${src.replace(/^\/+/, "")}`;
}

function ensureHomeVisualsReady() {
  if (homeVisualsHydrated) {
    return Promise.resolve(homeVisuals);
  }

  if (homeVisualsReadyPromise) {
    return homeVisualsReadyPromise;
  }

  homeVisualsReadyPromise = Promise.all([
    loadScriptOnce(getRuntimeScriptPath("js/site-home-visuals.js")),
    loadScriptOnce(getRuntimeScriptPath("js/three.min.js"))
  ])
    .then(() => {
      homeVisuals = createHomeVisualsInstance();
      homeVisualsHydrated = true;
      wireProjectPanelCloseHandler();
      return homeVisuals.ready || Promise.resolve();
    })
    .then(() => homeVisuals)
    .catch((error) => {
      console.warn("Home visual runtime failed to load lazily.", error);
      homeVisuals = createHomeVisualFallback();
      homeVisualsHydrated = false;
      wireProjectPanelCloseHandler();
      return homeVisuals;
    })
    .finally(() => {
      homeVisualsReadyPromise = null;
    });

  return homeVisualsReadyPromise;
}

wireProjectPanelCloseHandler();

bindLanguageOptions();
bindMenuInteractions();
bindDocumentNavigation();
bindHistoryNavigation();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const projectPanelCloseButton = document.querySelector(".project-panel.is-open .project-panel-close");
    if (projectPanelCloseButton) {
      projectPanelCloseButton.click();
      return;
    }
  }

  if (event.key === "Tab") {
    const projectPanelFocusableElements = getProjectPanelFocusableElements();
    if (projectPanelFocusableElements.length) {
      const activeProjectPanel = getActiveProjectPanel();
      const firstFocusable = projectPanelFocusableElements[0];
      const lastFocusable = projectPanelFocusableElements[projectPanelFocusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstFocusable || !activeProjectPanel?.contains(activeElement))) {
        event.preventDefault();
        lastFocusable.focus();
        return;
      }

      if (!event.shiftKey && (activeElement === lastFocusable || !activeProjectPanel?.contains(activeElement))) {
        event.preventDefault();
        firstFocusable.focus();
        return;
      }
    }
  }

  if (event.key === "Tab" && document.body.classList.contains("menu-open") && !document.body.classList.contains("menu-closing")) {
    const focusableElements = [menuTrigger, ...getMenuFocusableElements()];
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (focusableElements.length && firstFocusable && lastFocusable) {
      const activeElement = document.activeElement;

      if (event.shiftKey && (activeElement === firstFocusable || activeElement === menuPanel)) {
        event.preventDefault();
        lastFocusable.focus();
        return;
      }

      if (!event.shiftKey && (activeElement === lastFocusable || !menuPanel.contains(activeElement))) {
        event.preventDefault();
        firstFocusable.focus();
        return;
      }
    }
  }

  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    setMenuState(false);
  }
});

document.addEventListener("click", (event) => {
  const placeholderLink = event.target.closest("[data-placeholder-link='true']");
  if (!placeholderLink) return;
  event.preventDefault();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    document.body.classList.add("using-keyboard");
  }
}, { passive: true });

window.addEventListener("pointerdown", () => {
  document.body.classList.remove("using-keyboard");
}, { passive: true });

window.addEventListener("pointermove", () => {
  document.body.classList.remove("pointer-idle");
  document.body.classList.add("menu-hover-enabled");
}, { once: true, passive: true });

window.addEventListener("wheel", proxyProjectWheelScroll, { passive: false });

const initialRoute = normalizePath(window.location.pathname);
const initializeSite = initialRoute.id === "home"
  ? ensureHomeVisualsReady().then(() => initialize())
  : initialize();
const initialLoaderFailsafeDelay = initialRoute.id === "home" ? 5200 : 2600;
const initialLoaderFailsafeId = window.setTimeout(() => {
  finalizeSiteLoader({ hideImmediately: true });
}, initialLoaderFailsafeDelay);

initializeSite
  .then(() => {
    window.clearTimeout(initialLoaderFailsafeId);
  })
  .catch(() => {
    window.clearTimeout(initialLoaderFailsafeId);
    finalizeSiteLoader({ hideImmediately: true });
  });
