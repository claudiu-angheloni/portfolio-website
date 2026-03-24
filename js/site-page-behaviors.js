(function () {
  function createSitePageBehaviors({
    getProjectPageShell,
    getAboutPageShell,
    waitForWindowLoad,
    pageStyleLink,
    openContactMailto
  }) {
    let footerRevealScrollHandler = null;
    let projectScrollIndicatorHandler = null;
    let projectScrollIndicatorResizeHandler = null;
    let projectScrollIndicatorPointerDownHandler = null;
    let projectScrollIndicatorPointerMoveHandler = null;
    let projectScrollIndicatorPointerUpHandler = null;
    let projectScrollIndicatorInterval = 0;

    function setupRevealBlocks() {
      const revealBlocks = Array.from(document.querySelectorAll(".reveal-block"));
      if (!revealBlocks.length) return;
      const revealRoot = document.body.classList.contains("project-page")
        ? getProjectPageShell()
        : document.body.classList.contains("about-page")
          ? getAboutPageShell()
          : null;

      function getRevealBounds() {
        if (!revealRoot) {
          return {
            top: 0,
            bottom: window.innerHeight,
            height: window.innerHeight
          };
        }

        const rootRect = revealRoot.getBoundingClientRect();
        return {
          top: rootRect.top,
          bottom: rootRect.bottom,
          height: rootRect.height || window.innerHeight
        };
      }

      function revealBlockIfAboveFold(block) {
        const bounds = getRevealBounds();
        const rect = block.getBoundingClientRect();
        const revealBottom = bounds.bottom - Math.max(bounds.height * 0.08, 40);
        const revealTop = bounds.top + 8;
        const inView = rect.top <= revealBottom && rect.bottom >= revealTop;

        if (inView) {
          block.classList.add("is-visible");
        }

        return inView;
      }

      if (!("IntersectionObserver" in window)) {
        revealBlocks.forEach((block) => block.classList.add("is-visible"));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, {
        root: revealRoot,
        threshold: 0.16,
        rootMargin: "0px 0px -8% 0px"
      });

      revealBlocks.forEach((block) => {
        if (revealBlockIfAboveFold(block)) {
          return;
        }

        observer.observe(block);
      });
    }

    function preparePageShellIntro() {
      const pageShell = document.querySelector(".page-shell");
      if (!pageShell) return;
      pageShell.classList.remove("is-page-shell-visible");
      pageShell.classList.add("page-shell-intro-pending");
      requestAnimationFrame(() => {
        pageShell.classList.remove("page-shell-intro-pending");
        pageShell.classList.add("is-page-shell-visible");
      });
    }

    function suppressGridLinesFlashOnce() {
      document.body.classList.add("home-grid-transition");

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.body.classList.remove("home-grid-transition");
        });
      });
    }

    function positionWelcomeVisualizer() {
      return;
    }

    function getProjectScrollCandidates() {
      const candidates = [];
      const pageShell = document.body.classList.contains("project-page")
        ? getProjectPageShell()
        : document.body.classList.contains("about-page")
          ? getAboutPageShell()
          : document.querySelector(".page-shell");
      const pageRootElement = document.getElementById("page-root");
      const scrollingElement = document.scrollingElement || document.documentElement;

      if (document.body.classList.contains("project-page")) {
        [pageShell].forEach((node) => {
          if (!node || candidates.includes(node)) {
            return;
          }

          candidates.push(node);
        });

        return candidates;
      }

      if (document.body.classList.contains("about-page")) {
        [pageShell].forEach((node) => {
          if (!node || candidates.includes(node)) {
            return;
          }

          candidates.push(node);
        });

        return candidates;
      }

      [pageShell, pageRootElement, scrollingElement, document.documentElement, document.body].forEach((node) => {
        if (!node || candidates.includes(node)) {
          return;
        }

        candidates.push(node);
      });

      return candidates;
    }

    function getProjectScrollRoot() {
      if (document.body.classList.contains("project-page")) {
        return getProjectPageShell() || document.scrollingElement || document.documentElement;
      }

      if (document.body.classList.contains("about-page")) {
        return getAboutPageShell() || document.scrollingElement || document.documentElement;
      }

      const candidates = getProjectScrollCandidates();
      let bestCandidate = null;
      let bestRange = 0;

      candidates.forEach((node) => {
        const clientHeight = node === document.documentElement
          ? window.innerHeight
          : node.clientHeight;
        const scrollHeight = node.scrollHeight || 0;
        const scrollRange = Math.max(scrollHeight - clientHeight, 0);

        if (scrollRange > bestRange + 4) {
          bestCandidate = node;
          bestRange = scrollRange;
        }
      });

      return bestCandidate || (document.scrollingElement || document.documentElement);
    }

    function getScrollMetrics(root) {
      const fallbackRoot = root || getProjectScrollRoot();
      const candidates = root ? [root] : getProjectScrollCandidates();
      const metricsList = [];

      candidates.forEach((candidate) => {
        const viewportHeight = candidate === document.documentElement || candidate === document.body
          ? window.innerHeight
          : candidate.clientHeight;
        const scrollHeight = candidate.scrollHeight || 0;
        const scrollTop = candidate === document.documentElement || candidate === document.body
          ? Math.max(window.scrollY, document.documentElement.scrollTop || 0, document.body.scrollTop || 0)
          : candidate.scrollTop;
        const maxScroll = Math.max(scrollHeight - viewportHeight, 0);

        metricsList.push({ root: candidate, viewportHeight, scrollHeight, scrollTop, maxScroll });
      });

      const activelyScrolling = metricsList
        .filter((metrics) => metrics.scrollTop > 1 && metrics.maxScroll > 0)
        .sort((first, second) => second.scrollTop - first.scrollTop);

      if (activelyScrolling.length) {
        return activelyScrolling[0];
      }

      const scrollable = metricsList
        .filter((metrics) => metrics.maxScroll > 0)
        .sort((first, second) => second.maxScroll - first.maxScroll);

      if (scrollable.length) {
        return scrollable[0];
      }

      const bestMetrics = metricsList[0];
      if (bestMetrics) {
        return bestMetrics;
      }

      const viewportHeight = fallbackRoot === document.documentElement || fallbackRoot === document.body
        ? window.innerHeight
        : fallbackRoot.clientHeight;
      const scrollHeight = fallbackRoot.scrollHeight || 0;
      const scrollTop = fallbackRoot === document.documentElement || fallbackRoot === document.body
        ? Math.max(window.scrollY, document.documentElement.scrollTop || 0, document.body.scrollTop || 0)
        : fallbackRoot.scrollTop;

      return {
        root: fallbackRoot,
        viewportHeight,
        scrollHeight,
        scrollTop,
        maxScroll: Math.max(scrollHeight - viewportHeight, 0)
      };
    }

    function clearFooterRevealHandlers() {
      if (!footerRevealScrollHandler) {
        return;
      }

      const aboutScrollRoot = getAboutPageShell();
      if (aboutScrollRoot) {
        aboutScrollRoot.removeEventListener("scroll", footerRevealScrollHandler);
      }

      getProjectScrollCandidates().forEach((node) => {
        if (node && node !== window) {
          node.removeEventListener("scroll", footerRevealScrollHandler);
        }
      });

      window.removeEventListener("scroll", footerRevealScrollHandler);
      window.removeEventListener("resize", footerRevealScrollHandler);
      footerRevealScrollHandler = null;
    }

    function setupAboutFooterReveal() {
      document.body.classList.remove("about-footer-visible");
      clearFooterRevealHandlers();

      const finalStory = document.querySelector(".about-story:last-of-type");
      const scrollRoot = getAboutPageShell();
      if (!finalStory) {
        document.body.classList.add("about-footer-visible");
        positionWelcomeVisualizer();
        return;
      }

      footerRevealScrollHandler = () => {
        if (!document.body.classList.contains("about-page")) {
          return;
        }

        const { root, viewportHeight, scrollTop, scrollHeight } = getScrollMetrics(scrollRoot);
        const scrollBottom = scrollTop + viewportHeight;
        const finalStoryRect = finalStory.getBoundingClientRect();
        const rootBottom = root === document.documentElement || root === document.body
          ? window.innerHeight
          : root.getBoundingClientRect().bottom;
        const shouldShowFooter = scrollBottom >= scrollHeight - 56
          || finalStoryRect.bottom <= rootBottom - 8;

        document.body.classList.toggle("about-footer-visible", shouldShowFooter);
        positionWelcomeVisualizer();
      };

      if (scrollRoot) {
        scrollRoot.addEventListener("scroll", footerRevealScrollHandler, { passive: true });
      }
      window.addEventListener("resize", footerRevealScrollHandler, { passive: true });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          footerRevealScrollHandler();
        });
      });
      waitForWindowLoad().then(() => {
        footerRevealScrollHandler();
      });
    }

    function proxyProjectWheelScroll(event) {
      if (!document.body.classList.contains("project-page")) {
        return;
      }
    }

    function setupProjectFooterReveal() {
      document.body.classList.remove("project-footer-visible");
      clearFooterRevealHandlers();

      const finalSection = document.querySelector(".project-explore");
      if (!finalSection) {
        document.body.classList.add("project-footer-visible");
        positionWelcomeVisualizer();
        return;
      }

      footerRevealScrollHandler = () => {
        if (!document.body.classList.contains("project-page")) {
          return;
        }

        const { root, viewportHeight, scrollTop, scrollHeight } = getScrollMetrics();
        const scrollBottom = scrollTop + viewportHeight;
        const finalSectionRect = finalSection.getBoundingClientRect();
        const rootBottom = root === document.documentElement || root === document.body
          ? window.innerHeight
          : root.getBoundingClientRect().bottom;
        const shouldShowFooter = scrollBottom >= scrollHeight - 56
          || finalSectionRect.bottom <= rootBottom - 8;

        document.body.classList.toggle("project-footer-visible", shouldShowFooter);
        positionWelcomeVisualizer();
      };

      getProjectScrollCandidates().forEach((node) => {
        if (node && node !== window) {
          node.addEventListener("scroll", footerRevealScrollHandler, { passive: true });
        }
      });
      window.addEventListener("scroll", footerRevealScrollHandler, { passive: true });
      window.addEventListener("resize", footerRevealScrollHandler, { passive: true });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          footerRevealScrollHandler();
        });
      });
      window.setTimeout(() => {
        footerRevealScrollHandler();
      }, 180);
      waitForWindowLoad().then(() => {
        footerRevealScrollHandler();
      });
    }

    function getActiveScrollIndicatorConfig() {
      if (document.body.classList.contains("project-page")) {
        return {
          routeClass: "project-page",
          indicatorSelector: ".project-scroll-indicator",
          trackSelector: ".project-scroll-indicator-track",
          thumbSelector: ".project-scroll-indicator-thumb",
          scrollRoot: getProjectPageShell(),
          baseOpacity: 0.82,
          minThumbHeight: 72,
          progressSelector: ".project-scroll-indicator-progress"
        };
      }

      if (document.body.classList.contains("about-page")) {
        return {
          routeClass: "about-page",
          indicatorSelector: ".about-scroll-indicator",
          trackSelector: ".about-scroll-indicator-track",
          thumbSelector: ".about-scroll-indicator-thumb",
          scrollRoot: getAboutPageShell(),
          baseOpacity: 0.82,
          minThumbHeight: 72,
          progressSelector: ".about-scroll-indicator-progress"
        };
      }

      return null;
    }

    function teardownProjectScrollIndicator() {
      if (projectScrollIndicatorInterval) {
        window.clearInterval(projectScrollIndicatorInterval);
        projectScrollIndicatorInterval = 0;
      }

      const activeIndicatorConfig = getActiveScrollIndicatorConfig();
      if (projectScrollIndicatorHandler) {
        const scrollRoot = activeIndicatorConfig ? activeIndicatorConfig.scrollRoot : null;
        if (scrollRoot) {
          scrollRoot.removeEventListener("scroll", projectScrollIndicatorHandler);
        }
        projectScrollIndicatorHandler = null;
      }

      if (projectScrollIndicatorResizeHandler) {
        window.removeEventListener("resize", projectScrollIndicatorResizeHandler);
        projectScrollIndicatorResizeHandler = null;
      }

      const indicator = activeIndicatorConfig
        ? document.querySelector(activeIndicatorConfig.indicatorSelector)
        : null;
      if (indicator && projectScrollIndicatorPointerDownHandler) {
        indicator.removeEventListener("pointerdown", projectScrollIndicatorPointerDownHandler);
      }

      if (projectScrollIndicatorPointerMoveHandler) {
        window.removeEventListener("pointermove", projectScrollIndicatorPointerMoveHandler);
        projectScrollIndicatorPointerMoveHandler = null;
      }

      if (projectScrollIndicatorPointerUpHandler) {
        window.removeEventListener("pointerup", projectScrollIndicatorPointerUpHandler);
        window.removeEventListener("pointercancel", projectScrollIndicatorPointerUpHandler);
        projectScrollIndicatorPointerUpHandler = null;
      }

      projectScrollIndicatorPointerDownHandler = null;
    }

    function setupProjectScrollIndicator() {
      teardownProjectScrollIndicator();

      const indicatorConfig = getActiveScrollIndicatorConfig();
      if (!indicatorConfig) {
        return;
      }

      const {
        routeClass,
        indicatorSelector,
        trackSelector,
        thumbSelector,
        scrollRoot,
        baseOpacity,
        minThumbHeight,
        progressSelector
      } = indicatorConfig;
      const indicator = document.querySelector(indicatorSelector);
      const track = indicator ? indicator.querySelector(trackSelector) : null;
      const thumb = indicator ? indicator.querySelector(thumbSelector) : null;
      const progressLabel = progressSelector ? document.querySelector(progressSelector) : null;
      if (!indicator || !track || !thumb || !scrollRoot) {
        return;
      }

      const updateIndicator = () => {
        if (!document.body.classList.contains(routeClass)) {
          return;
        }

        const viewportHeight = scrollRoot.clientHeight;
        const scrollHeight = scrollRoot.scrollHeight || 0;
        const scrollTop = scrollRoot.scrollTop || 0;
        const maxScroll = Math.max(scrollHeight - viewportHeight, 0);
        const trackHeight = track.clientHeight;

        if (trackHeight <= 0 || maxScroll <= 0) {
          indicator.style.opacity = "0";
          thumb.style.opacity = "0";
          thumb.style.height = "72px";
          thumb.style.transform = "translate3d(0, 0, 0)";
          if (progressLabel) {
            progressLabel.textContent = "00";
          }
          return;
        }

        indicator.style.opacity = String(baseOpacity);
        const thumbHeight = Math.min(trackHeight, Math.max((viewportHeight / scrollHeight) * trackHeight, minThumbHeight));
        const travel = Math.max(trackHeight - thumbHeight, 0);
        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        const offset = Math.round(travel * progress);

        thumb.style.opacity = "1";
        thumb.style.height = `${Math.round(thumbHeight)}px`;
        thumb.style.transform = `translate3d(0, ${offset}px, 0)`;
        if (progressLabel) {
          progressLabel.textContent = String(Math.round(progress * 100)).padStart(2, "0");
        }
      };

      projectScrollIndicatorHandler = updateIndicator;
      projectScrollIndicatorResizeHandler = updateIndicator;
      projectScrollIndicatorPointerDownHandler = (event) => {
        if (!document.body.classList.contains(routeClass)) {
          return;
        }

        event.preventDefault();
        const trackRect = track.getBoundingClientRect();
        const currentThumbHeight = thumb.getBoundingClientRect().height || 72;
        const maxScroll = Math.max((scrollRoot.scrollHeight || 0) - scrollRoot.clientHeight, 0);
        if (trackRect.height <= 0 || maxScroll <= 0) {
          return;
        }

        const thumbRect = thumb.getBoundingClientRect();
        const pointerOffset = event.clientY - thumbRect.top;

        const syncFromPointer = (clientY) => {
          const travel = Math.max(trackRect.height - currentThumbHeight, 0);
          if (travel <= 0) {
            scrollRoot.scrollTop = 0;
            return;
          }

          const nextOffset = Math.min(Math.max(clientY - trackRect.top - pointerOffset, 0), travel);
          const progress = nextOffset / travel;
          scrollRoot.scrollTop = progress * maxScroll;
          updateIndicator();
        };

        syncFromPointer(event.clientY);

        projectScrollIndicatorPointerMoveHandler = (moveEvent) => {
          moveEvent.preventDefault();
          syncFromPointer(moveEvent.clientY);
        };

        projectScrollIndicatorPointerUpHandler = () => {
          window.removeEventListener("pointermove", projectScrollIndicatorPointerMoveHandler);
          window.removeEventListener("pointerup", projectScrollIndicatorPointerUpHandler);
          window.removeEventListener("pointercancel", projectScrollIndicatorPointerUpHandler);
          projectScrollIndicatorPointerMoveHandler = null;
          projectScrollIndicatorPointerUpHandler = null;
        };

        window.addEventListener("pointermove", projectScrollIndicatorPointerMoveHandler, { passive: false });
        window.addEventListener("pointerup", projectScrollIndicatorPointerUpHandler, { passive: true });
        window.addEventListener("pointercancel", projectScrollIndicatorPointerUpHandler, { passive: true });
      };

      scrollRoot.addEventListener("scroll", projectScrollIndicatorHandler, { passive: true });
      window.addEventListener("resize", projectScrollIndicatorResizeHandler, { passive: true });
      indicator.addEventListener("pointerdown", projectScrollIndicatorPointerDownHandler);
      updateIndicator();
      let lastScrollTop = scrollRoot.scrollTop || 0;
      let lastScrollHeight = scrollRoot.scrollHeight || 0;
      let lastViewportHeight = scrollRoot.clientHeight || 0;
      const watchIndicatorState = () => {
        if (!document.body.classList.contains("project-page")) {
          return;
        }

        const nextScrollTop = scrollRoot.scrollTop || 0;
        const nextScrollHeight = scrollRoot.scrollHeight || 0;
        const nextViewportHeight = scrollRoot.clientHeight || 0;

        if (
          nextScrollTop !== lastScrollTop
          || nextScrollHeight !== lastScrollHeight
          || nextViewportHeight !== lastViewportHeight
        ) {
          lastScrollTop = nextScrollTop;
          lastScrollHeight = nextScrollHeight;
          lastViewportHeight = nextViewportHeight;
          updateIndicator();
        }
      };
      projectScrollIndicatorInterval = window.setInterval(watchIndicatorState, 50);
      window.setTimeout(updateIndicator, 120);
      window.setTimeout(updateIndicator, 320);
    }

    function scheduleProjectScrollIndicatorSetup() {
      const runSetup = () => {
        if (!document.body.classList.contains("project-page") && !document.body.classList.contains("about-page")) {
          return;
        }

        setupProjectScrollIndicator();
      };

      runSetup();
      requestAnimationFrame(() => {
        requestAnimationFrame(runSetup);
      });
      window.setTimeout(runSetup, 120);
      window.setTimeout(runSetup, 420);

      if (pageStyleLink && !pageStyleLink.disabled) {
        pageStyleLink.addEventListener("load", runSetup, { once: true });
      }

      waitForWindowLoad().then(runSetup);
    }

    function bindTitleGlitch() {
      const titleGlitch = document.querySelector(".title-glitch");
      if (!titleGlitch) return;

      const updateGlitchPointer = (event) => {
        const bounds = titleGlitch.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        titleGlitch.style.setProperty("--mx", `${x}px`);
        titleGlitch.style.setProperty("--my", `${y}px`);
      };

      titleGlitch.addEventListener("pointerenter", updateGlitchPointer);
      titleGlitch.addEventListener("pointermove", updateGlitchPointer);
      titleGlitch.addEventListener("pointerleave", () => {
        titleGlitch.style.removeProperty("--mx");
        titleGlitch.style.removeProperty("--my");
      });
    }

    function prepareHomeTitleIntro({ delayed = false } = {}) {
      const titleGlitch = document.querySelector(".title-glitch");
      const heroSubtitle = document.querySelector(".hero-subtitle");
      if (!titleGlitch || !heroSubtitle) return;

      [titleGlitch, heroSubtitle].forEach((node) => {
        node.classList.remove("is-title-visible");
        node.classList.add("title-intro-pending");
      });

      if (!delayed) {
        requestAnimationFrame(() => {
          revealHomeTitleIntro();
        });
      }
    }

    function prepareExploreActionIntro() {
      const exploreAction = document.querySelector(".globe-action");
      if (!exploreAction) return;
      exploreAction.classList.add("globe-action-pending");
      exploreAction.classList.remove("is-globe-action-visible");
    }

    function revealHomeTitleIntro() {
      const titleGlitch = document.querySelector(".title-glitch");
      const heroSubtitle = document.querySelector(".hero-subtitle");
      if (!titleGlitch || !heroSubtitle) return;

      [titleGlitch, heroSubtitle].forEach((node) => {
        node.classList.remove("is-title-visible");
      });

      void titleGlitch.offsetWidth;
      void heroSubtitle.offsetWidth;

      [titleGlitch, heroSubtitle].forEach((node) => {
        node.classList.remove("title-intro-pending");
        node.classList.add("is-title-visible");
      });
    }

    function revealExploreActionIntro() {
      const exploreAction = document.querySelector(".globe-action");
      if (!exploreAction) return;
      exploreAction.classList.remove("globe-action-pending");
      exploreAction.classList.add("is-globe-action-visible");
    }

    function bindContactForm() {
      const mailForm = document.querySelector("[data-mail-form]");
      if (!mailForm || mailForm.dataset.mailBound === "true") return;
      mailForm.dataset.mailBound = "true";

      mailForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(mailForm);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const message = String(formData.get("message") || "").trim();

        if (!email || !mailForm.reportValidity()) {
          return;
        }

        openContactMailto({ name, email, phone, message });
      });
    }

    function resetRouteBehaviors() {
      clearFooterRevealHandlers();
      teardownProjectScrollIndicator();
    }

    return {
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
    };
  }

  window.SitePageBehaviors = {
    create: createSitePageBehaviors
  };
})();
