(function () {
  function createSiteShell({
    routeShell,
    pageRoot,
    menuTrigger,
    menuPanel,
    languageOptions,
    uiState,
    translations,
    menuFocusableSelector,
    menuCloseDuration,
    menuHomeRevealDelay,
    isPortfolioActive
  }) {
    let menuCloseTimer = 0;
    let menuHomeRevealTimer = 0;
    let menuLastFocusedElement = null;
    let projectPanelCloseHandler = null;

    function resetMenuHomeReveal() {
      window.clearTimeout(menuHomeRevealTimer);
      document.body.classList.remove("menu-home-reveal");
    }

    function setBackgroundInert(inert) {
      [routeShell, pageRoot].forEach((element) => {
        if (!element) return;
        if ("inert" in element) {
          element.inert = inert;
        }
        element.setAttribute("aria-hidden", inert ? "true" : "false");
      });
    }

    function getMenuFocusableElements() {
      if (!menuPanel) return [];

      return Array.from(menuPanel.querySelectorAll(menuFocusableSelector)).filter((element) => {
        if (element.hasAttribute("disabled")) return false;
        if (element.getAttribute("aria-hidden") === "true") return false;
        return element.tabIndex !== -1;
      });
    }

    function focusFirstMenuElement() {
      const [firstFocusable] = getMenuFocusableElements();
      if (firstFocusable) {
        firstFocusable.focus();
        return;
      }

      menuTrigger.focus();
    }

    function restoreMenuFocus() {
      const activeElement = document.activeElement;
      const shouldRestoreToTrigger = activeElement === document.body
        || activeElement === document.documentElement
        || (menuPanel && menuPanel.contains(activeElement));
      const restoreTarget = shouldRestoreToTrigger && menuLastFocusedElement
        ? menuLastFocusedElement
        : null;

      if (restoreTarget && typeof restoreTarget.focus === "function") {
        restoreTarget.focus();
      }

      menuLastFocusedElement = null;
    }

    function shouldRunHomeMenuReveal() {
      return uiState.route
        && uiState.route.id === "home"
        && !document.body.classList.contains("home-projects-focus")
        && !document.body.classList.contains("home-returning-from-focus");
    }

    function getRouteDictionary(lang, routeId) {
      const languageSet = translations[lang] || translations.en;
      return {
        ...(languageSet.common || {}),
        ...(languageSet[routeId] || {})
      };
    }

    function getCurrentDictionary() {
      return getRouteDictionary(uiState.lang, uiState.route ? uiState.route.id : "home");
    }

    function updateMenuTriggerLabel(dictionary = getCurrentDictionary()) {
      const isMenuOpen = document.body.classList.contains("menu-open")
        && !document.body.classList.contains("menu-closing");
      const fallbackLabel = isMenuOpen ? "Close menu" : "Open menu";
      const translatedLabel = isMenuOpen ? dictionary.menuClose : dictionary.menuOpen;

      menuTrigger.setAttribute("aria-label", translatedLabel || fallbackLabel);
    }

    function applyTranslations(dictionary) {
      document.querySelectorAll("[data-i18n]").forEach((node) => {
        const key = node.dataset.i18n;
        if (dictionary[key]) {
          node.textContent = dictionary[key];
        }
      });

      document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        const key = node.dataset.i18nPlaceholder;
        if (dictionary[key]) {
          node.setAttribute("placeholder", dictionary[key]);
        }
      });

      document.querySelectorAll("[data-i18n-aria-label]").forEach((node) => {
        const key = node.dataset.i18nAriaLabel;
        if (dictionary[key]) {
          node.setAttribute("aria-label", dictionary[key]);
        }
      });
    }

    function syncGlitchHeadings() {
      document.querySelectorAll(".glitch-heading").forEach((heading) => {
        const lineNodes = Array.from(heading.querySelectorAll(".glitch-heading-line"));
        const sourceText = lineNodes.length
          ? lineNodes.map((node) => node.innerText).join(" ")
          : heading.innerText;
        const text = sourceText.replace(/\s+/g, " ").trim();
        heading.dataset.text = text;
      });
    }

    function syncCornerTexts() {
      document.querySelectorAll(".corner-text").forEach((cornerText) => {
        const text = cornerText.textContent.replace(/\r/g, "").trim();
        cornerText.dataset.cornerText = text;
      });
    }

    function setLanguage(lang) {
      uiState.lang = lang;
      document.documentElement.lang = lang;

      const dictionary = getCurrentDictionary();
      applyTranslations(dictionary);
      updateMenuTriggerLabel(dictionary);

      languageOptions.forEach((button) => {
        const isActive = button.dataset.lang === lang;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", isActive ? "true" : "false");
      });

      syncGlitchHeadings();
      syncCornerTexts();
    }

    function updateActiveMenu(routeId) {
      document.querySelectorAll("[data-route-link]").forEach((link) => {
        const linkRouteId = link.dataset.routeLink;
        const isActive = isPortfolioActive()
          ? linkRouteId === "portfolio"
          : linkRouteId === routeId;
        link.classList.toggle("is-active", isActive);
      });
    }

    function setProjectPanelCloseHandler(handler) {
      projectPanelCloseHandler = typeof handler === "function" ? handler : null;
    }

    function setMenuState(open, { instant = false } = {}) {
      window.clearTimeout(menuCloseTimer);
      resetMenuHomeReveal();

      if (open) {
        if (projectPanelCloseHandler && document.body.classList.contains("project-panel-open")) {
          projectPanelCloseHandler();
        }
        menuLastFocusedElement = document.activeElement instanceof HTMLElement
          ? document.activeElement
          : menuTrigger;
        document.documentElement.classList.remove("menu-closing");
        document.body.classList.remove("menu-closing");
        document.documentElement.classList.add("menu-open");
        document.body.classList.add("menu-open");
        setBackgroundInert(true);
        menuTrigger.setAttribute("aria-expanded", "true");
        menuPanel.setAttribute("aria-hidden", "false");
        updateMenuTriggerLabel();
        requestAnimationFrame(() => {
          if (document.body.classList.contains("menu-open") && !document.body.classList.contains("menu-closing")) {
            focusFirstMenuElement();
          }
        });
        return;
      }

      const isOpen = document.body.classList.contains("menu-open");
      const isClosing = document.body.classList.contains("menu-closing");

      if (instant) {
        document.documentElement.classList.remove("menu-open", "menu-closing");
        document.body.classList.remove("menu-open", "menu-closing");
        setBackgroundInert(false);
        menuTrigger.setAttribute("aria-expanded", "false");
        menuPanel.setAttribute("aria-hidden", "true");
        updateMenuTriggerLabel();
        restoreMenuFocus();
        return;
      }

      if (!isOpen && !isClosing) {
        setBackgroundInert(false);
        menuTrigger.setAttribute("aria-expanded", "false");
        menuPanel.setAttribute("aria-hidden", "true");
        updateMenuTriggerLabel();
        restoreMenuFocus();
        return;
      }

      document.documentElement.classList.add("menu-closing");
      document.body.classList.add("menu-closing");
      menuTrigger.setAttribute("aria-expanded", "false");
      menuPanel.setAttribute("aria-hidden", "false");
      updateMenuTriggerLabel();

      if (shouldRunHomeMenuReveal()) {
        menuHomeRevealTimer = window.setTimeout(() => {
          if (document.body.classList.contains("menu-closing")) {
            document.body.classList.add("menu-home-reveal");
          }
        }, menuHomeRevealDelay);
      }

      menuCloseTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("menu-open", "menu-closing");
        document.body.classList.remove("menu-open", "menu-closing");
        resetMenuHomeReveal();
        setBackgroundInert(false);
        menuPanel.setAttribute("aria-hidden", "true");
        restoreMenuFocus();
      }, menuCloseDuration);
    }

    function bindLanguageOptions() {
      languageOptions.forEach((button) => {
        button.addEventListener("click", () => {
          setLanguage(button.dataset.lang);
        });
      });
    }

    function bindMenuInteractions() {
      menuTrigger.addEventListener("click", () => {
        const isOpen = document.body.classList.contains("menu-open") && !document.body.classList.contains("menu-closing");
        setMenuState(!isOpen);
      });

      menuPanel.addEventListener("click", (event) => {
        if (event.target === menuPanel) {
          setMenuState(false);
        }
      });
    }

    return {
      bindLanguageOptions,
      bindMenuInteractions,
      getMenuFocusableElements,
      setLanguage,
      setMenuState,
      setProjectPanelCloseHandler,
      updateActiveMenu
    };
  }

  window.SiteShell = {
    create: createSiteShell
  };
})();
