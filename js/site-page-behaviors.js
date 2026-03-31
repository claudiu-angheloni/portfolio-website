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
    let projectRevealScrollHandler = null;
    let projectRevealResizeHandler = null;
    let aboutMarkerAlignResizeHandler = null;
    let aboutMarkerAlignLanguageHandler = null;
    let classicPortfolioScrollHandler = null;
    let classicPortfolioResizeHandler = null;
    let classicPortfolioAnimationFrame = 0;
    let classicPortfolioProgrammaticScroll = false;
    let classicPortfolioChaptersState = [];
    const markerMeasureCanvas = document.createElement("canvas");
    const markerMeasureContext = markerMeasureCanvas.getContext("2d");

    function getTextGlyphTopInset(element) {
      if (!element) {
        return 0;
      }

      const styles = window.getComputedStyle(element);
      const fontSize = Number.parseFloat(styles.fontSize) || 0;
      let lineHeight = Number.parseFloat(styles.lineHeight);
      if (!Number.isFinite(lineHeight)) {
        lineHeight = fontSize * 1.2;
      }

      if (!markerMeasureContext) {
        return Math.max((lineHeight - fontSize) * 0.5, 0);
      }

      const fontStyle = styles.fontStyle || "normal";
      const fontVariant = styles.fontVariant || "normal";
      const fontWeight = styles.fontWeight || "400";
      const fontFamily = styles.fontFamily || "sans-serif";
      markerMeasureContext.font = `${fontStyle} ${fontVariant} ${fontWeight} ${fontSize}px ${fontFamily}`;
      markerMeasureContext.textBaseline = "alphabetic";

      const sampleText = (element.textContent || "").trim() || "H";
      const metrics = markerMeasureContext.measureText(sampleText);
      const fontAscent = metrics.fontBoundingBoxAscent || fontSize;
      const fontDescent = metrics.fontBoundingBoxDescent || fontSize * 0.2;
      const actualAscent = metrics.actualBoundingBoxAscent || fontAscent;
      const leading = Math.max(lineHeight - (fontAscent + fontDescent), 0);
      const glyphTopInset = (leading * 0.5) + Math.max(fontAscent - actualAscent, 0);

      return Number.isFinite(glyphTopInset) ? glyphTopInset : 0;
    }

    function clearAboutMarkerAlignmentHandlers() {
      if (aboutMarkerAlignResizeHandler) {
        window.removeEventListener("resize", aboutMarkerAlignResizeHandler);
        aboutMarkerAlignResizeHandler = null;
      }

      if (aboutMarkerAlignLanguageHandler) {
        window.removeEventListener("site:language-change", aboutMarkerAlignLanguageHandler);
        aboutMarkerAlignLanguageHandler = null;
      }
    }

    function clearClassicPortfolioScrollHandlers() {
      if (classicPortfolioAnimationFrame) {
        window.cancelAnimationFrame(classicPortfolioAnimationFrame);
        classicPortfolioAnimationFrame = 0;
      }

      if (classicPortfolioScrollHandler) {
        window.removeEventListener("scroll", classicPortfolioScrollHandler);
        classicPortfolioScrollHandler = null;
      }

      if (classicPortfolioResizeHandler) {
        window.removeEventListener("resize", classicPortfolioResizeHandler);
        classicPortfolioResizeHandler = null;
      }

      classicPortfolioProgrammaticScroll = false;
      classicPortfolioChaptersState = [];
    }

    function clearProjectRevealHandlers() {
      const projectScrollRoot = getProjectPageShell();

      if (projectRevealScrollHandler && projectScrollRoot) {
        projectScrollRoot.removeEventListener("scroll", projectRevealScrollHandler);
      }

      if (projectRevealResizeHandler) {
        window.removeEventListener("resize", projectRevealResizeHandler);
      }

      projectRevealScrollHandler = null;
      projectRevealResizeHandler = null;
    }

    function alignAboutChapterMarkers() {
      if (!document.body.classList.contains("about-page")) {
        return;
      }

      const blocks = Array.from(document.querySelectorAll(".about-story, .about-profile-services, .about-practice"));
      if (!blocks.length) {
        return;
      }

      if (window.innerWidth <= 1100) {
        blocks.forEach((block) => block.style.removeProperty("--about-marker-top"));
        return;
      }

      blocks.forEach((block) => {
        const marker = block.querySelector(":scope > .about-story-intro .about-story-year");
        const heading = block.querySelector(":scope > .glitch-heading");
        if (!marker || !heading) {
          return;
        }

        const blockRect = block.getBoundingClientRect();
        const firstHeadingLine = heading.querySelector(".glitch-heading-line");
        const referenceRect = (firstHeadingLine || heading).getBoundingClientRect();
        const headingGlyphInset = getTextGlyphTopInset(firstHeadingLine || heading);
        const markerGlyphInset = getTextGlyphTopInset(marker);
        const referenceGlyphTop = referenceRect.top + headingGlyphInset;
        const alignedTop = Math.max(referenceGlyphTop - blockRect.top - markerGlyphInset, 0);
        block.style.setProperty("--about-marker-top", `${alignedTop.toFixed(2)}px`);
      });
    }

    function setupAboutMarkerAlignment() {
      if (!document.body.classList.contains("about-page")) {
        clearAboutMarkerAlignmentHandlers();
        return;
      }

      clearAboutMarkerAlignmentHandlers();

      aboutMarkerAlignResizeHandler = () => {
        requestAnimationFrame(alignAboutChapterMarkers);
      };
      aboutMarkerAlignLanguageHandler = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(alignAboutChapterMarkers);
        });
      };

      window.addEventListener("resize", aboutMarkerAlignResizeHandler, { passive: true });
      window.addEventListener("site:language-change", aboutMarkerAlignLanguageHandler);

      requestAnimationFrame(() => {
        requestAnimationFrame(alignAboutChapterMarkers);
      });
      if (document.fonts && typeof document.fonts.ready?.then === "function") {
        document.fonts.ready.then(() => {
          alignAboutChapterMarkers();
        });
      }
      waitForWindowLoad().then(() => {
        alignAboutChapterMarkers();
      });
    }

    function setupRevealBlocks() {
      const revealBlocks = Array.from(document.querySelectorAll(".reveal-block"));
      if (!revealBlocks.length) return;
      const isAboutPage = document.body.classList.contains("about-page");
      const isProjectPage = document.body.classList.contains("project-page");
      if (isAboutPage) {
        setupAboutMarkerAlignment();
      }
      if (isProjectPage) {
        clearProjectRevealHandlers();
      }
      let revealObserver = null;

      function startRevealObserver() {
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
          const revealBottom = bounds.bottom - Math.max(
            bounds.height * (isAboutPage ? 0.4 : isProjectPage ? 0.3 : 0.22),
            isAboutPage ? 240 : isProjectPage ? 180 : 120
          );
          const revealTop = bounds.top + Math.max(
            bounds.height * (isAboutPage ? 0.12 : isProjectPage ? 0.1 : 0.06),
            isAboutPage ? 56 : isProjectPage ? 48 : 24
          );
          const inView = rect.top <= revealBottom && rect.bottom >= revealTop;

          if (inView) {
            block.classList.add("is-visible");
          }

          return inView;
        }

        if (isProjectPage) {
          const pendingBlocks = revealBlocks.filter((block) => !block.classList.contains("is-visible"));
          if (!pendingBlocks.length) {
            return;
          }

          const updateProjectRevealState = () => {
            if (!document.body.classList.contains("project-page")) {
              return;
            }

            const bounds = getRevealBounds();
            const revealBottom = bounds.bottom - Math.max(bounds.height * 0.18, 140);
            const revealTop = bounds.top + Math.max(bounds.height * 0.08, 36);

            pendingBlocks.forEach((block) => {
              if (block.classList.contains("is-visible")) {
                return;
              }

              const rect = block.getBoundingClientRect();
              const inView = rect.top <= revealBottom && rect.bottom >= revealTop;

              if (inView) {
                block.classList.add("is-visible");
              }
            });

            if (pendingBlocks.every((block) => block.classList.contains("is-visible"))) {
              clearProjectRevealHandlers();
            }
          };

          projectRevealScrollHandler = updateProjectRevealState;
          projectRevealResizeHandler = () => {
            requestAnimationFrame(updateProjectRevealState);
          };

          if (revealRoot) {
            revealRoot.addEventListener("scroll", projectRevealScrollHandler, { passive: true });
          }
          window.addEventListener("resize", projectRevealResizeHandler, { passive: true });

          requestAnimationFrame(() => {
            requestAnimationFrame(updateProjectRevealState);
          });
          window.setTimeout(updateProjectRevealState, 140);
          return;
        }

        if (!("IntersectionObserver" in window)) {
          revealBlocks.forEach((block) => block.classList.add("is-visible"));
          return;
        }

        revealObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        }, {
          root: revealRoot,
          threshold: isAboutPage ? 0.28 : isProjectPage ? 0.24 : 0.3,
          rootMargin: isAboutPage ? "0px 0px -34% 0px" : isProjectPage ? "0px 0px -26% 0px" : "0px 0px -20% 0px"
        });

        revealBlocks.forEach((block) => {
          if (revealBlockIfAboveFold(block)) {
            return;
          }

          revealObserver.observe(block);
        });
      }

      if (isAboutPage && document.fonts && typeof document.fonts.ready?.then === "function") {
        revealBlocks.forEach((block) => block.classList.remove("is-visible"));
        document.fonts.ready.then(() => {
          if (!document.body.classList.contains("about-page")) {
            return;
          }

          requestAnimationFrame(() => {
            requestAnimationFrame(startRevealObserver);
          });
        });
        return;
      }

      startRevealObserver();
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

      const finalStory = document.querySelector(".about-content > :last-child");
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

    function scheduleClassicPortfolioScrollSetup() {
      const runSetup = () => {
        if (!document.body.classList.contains("portfolio-classic-page")) {
          return;
        }

        setupClassicPortfolioScroll();
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

    function setupClassicPortfolioScroll() {
      clearClassicPortfolioScrollHandlers();

      if (!document.body.classList.contains("portfolio-classic-page")) {
        return;
      }

      const chapters = Array.from(document.querySelectorAll("[data-classic-chapter]"));
      if (!chapters.length) {
        return;
      }

      const clampProgress = (value) => Math.min(Math.max(value, 0), 1);
      const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
      const viewportHeight = () => window.innerHeight || document.documentElement.clientHeight || 1;
      const getScrollTop = () => Math.max(
        window.scrollY,
        document.documentElement.scrollTop || 0,
        document.body.scrollTop || 0
      );
      const setScrollTop = (top, behavior = "auto") => {
        classicPortfolioProgrammaticScroll = true;
        window.scrollTo({ top, left: 0, behavior: prefersReducedMotion ? "auto" : behavior });
        window.setTimeout(() => {
          classicPortfolioProgrammaticScroll = false;
        }, behavior === "smooth" && !prefersReducedMotion ? 520 : 0);
      };

      classicPortfolioChaptersState = chapters.map((chapter) => {
        const loader = chapter.querySelector("[data-classic-loader]");
        const pin = chapter.querySelector(".classic-chapter-pin");
        const story = chapter.querySelector(".classic-story");
        return {
          chapter,
          loader,
          pin,
          story,
          progress: 0,
          unlocked: false,
          handoffDone: false
        };
      });

      const syncChapterMetrics = () => {
        classicPortfolioChaptersState.forEach((state) => {
          const chapterTop = state.chapter.offsetTop;
          const trackHeight = state.loader ? state.loader.offsetHeight : viewportHeight();
          const loadDistance = Math.max(trackHeight - viewportHeight(), viewportHeight() * 0.82);
          const storyOffset = state.story ? chapterTop + state.story.offsetTop : chapterTop + trackHeight;
          state.start = chapterTop;
          state.storyStart = Math.max(storyOffset - viewportHeight(), chapterTop);
          state.loadDistance = loadDistance;
          state.storyRevealEnd = state.storyStart + (viewportHeight() * 0.96);
          state.storyEnd = state.chapter.offsetTop + state.chapter.offsetHeight;
        });
      };

      const updateChapterVisuals = (state) => {
        const chapter = state.chapter;
        const loader = state.loader;
        if (!chapter || !loader) return;

        const progressNode = loader.querySelector("[data-classic-progress]");
        const phaseNode = loader.querySelector("[data-classic-phase]");
        const phaseCopies = Array.from(loader.querySelectorAll("[data-classic-phase-copy]"));
        const scrollTop = getScrollTop();
        const loadProgress = clampProgress((scrollTop - state.start) / Math.max(state.loadDistance, 1));
        const unlockWindow = Math.max(viewportHeight() * 0.26, 1);
        const unlockProgress = clampProgress(
          (scrollTop - (state.storyStart - (viewportHeight() * 0.22))) / unlockWindow
        );
        const storyReveal = clampProgress(
          (scrollTop - state.storyStart) / Math.max(state.storyRevealEnd - state.storyStart, 1)
        );
        const percent = Math.round(loadProgress * 100);
        const phaseIndex = loadProgress < 0.22
          ? 0
          : loadProgress < 0.56
            ? 1
            : loadProgress < 0.92
              ? 2
              : loadProgress < 1
              ? 3
              : 4;
        const activePhase = phaseCopies.find((node) => Number(node.getAttribute("data-classic-phase-copy")) === phaseIndex);
        state.progress = loadProgress;
        state.unlocked = loadProgress >= 0.999;
        const isPinned = scrollTop >= state.start && scrollTop < state.storyStart;
        const isPastPin = scrollTop >= state.storyStart;

        chapter.style.setProperty("--classic-load-progress", loadProgress.toFixed(4));
        chapter.style.setProperty("--classic-unlock-progress", unlockProgress.toFixed(4));
        chapter.style.setProperty("--classic-story-reveal", storyReveal.toFixed(4));
        loader.style.setProperty("--classic-load-progress", loadProgress.toFixed(4));
        loader.style.setProperty("--classic-unlock-progress", unlockProgress.toFixed(4));
        loader.style.setProperty("--classic-story-reveal", storyReveal.toFixed(4));

        chapter.classList.toggle("is-loaded", state.unlocked);
        chapter.classList.toggle("is-classic-pinned", isPinned);
        chapter.classList.toggle("is-classic-after-pin", isPastPin);
        loader.classList.toggle("is-loaded", state.unlocked);

        if (progressNode) {
          progressNode.textContent = `${String(percent).padStart(3, "0")}%`;
        }

        if (phaseNode && activePhase) {
          phaseNode.textContent = activePhase.textContent || "";
        }
      };

      const maybeAutoHandoff = (state, scrollTop, direction) => {
        if (!state || classicPortfolioProgrammaticScroll || prefersReducedMotion || direction <= 0) {
          return;
        }

        if (scrollTop <= state.start + 8) {
          state.handoffDone = false;
        }

        if (state.handoffDone || !state.unlocked) {
          return;
        }

        const lowerBound = state.storyStart - 48;
        const upperBound = state.storyStart + 24;
        if (scrollTop >= lowerBound && scrollTop <= upperBound) {
          state.handoffDone = true;
          setScrollTop(state.storyStart + Math.min(viewportHeight() * 0.18, 144), "smooth");
        }
      };

      const updateClassicPortfolioProgress = (direction = 0) => {
        classicPortfolioAnimationFrame = 0;

        if (!document.body.classList.contains("portfolio-classic-page")) {
          return;
        }

        syncChapterMetrics();
        const scrollTop = getScrollTop();
        classicPortfolioChaptersState.forEach((state) => {
          updateChapterVisuals(state);
          maybeAutoHandoff(state, scrollTop, direction);
        });
      };

      const queueClassicPortfolioProgressUpdate = (direction = 0) => {
        if (classicPortfolioAnimationFrame) {
          return;
        }

        classicPortfolioAnimationFrame = window.requestAnimationFrame(() => {
          updateClassicPortfolioProgress(direction);
        });
      };

      let lastScrollTop = getScrollTop();
      classicPortfolioScrollHandler = () => {
        const nextScrollTop = getScrollTop();
        const direction = nextScrollTop > lastScrollTop
          ? 1
          : nextScrollTop < lastScrollTop
            ? -1
            : 0;
        lastScrollTop = nextScrollTop;
        queueClassicPortfolioProgressUpdate(direction);
      };
      classicPortfolioResizeHandler = () => {
        syncChapterMetrics();
        queueClassicPortfolioProgressUpdate();
      };

      window.addEventListener("scroll", classicPortfolioScrollHandler, { passive: true });
      window.addEventListener("resize", classicPortfolioResizeHandler, { passive: true });

      syncChapterMetrics();
      updateClassicPortfolioProgress();
      window.setTimeout(queueClassicPortfolioProgressUpdate, 120);
      window.setTimeout(queueClassicPortfolioProgressUpdate, 360);
      waitForWindowLoad().then(queueClassicPortfolioProgressUpdate);
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
      const exploreActions = document.querySelectorAll(".globe-action");
      if (!exploreActions.length) return;
      exploreActions.forEach((exploreAction) => {
        exploreAction.classList.add("globe-action-pending");
        exploreAction.classList.remove("is-globe-action-visible");
      });
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
      const exploreActions = document.querySelectorAll(".globe-action");
      if (!exploreActions.length) return;
      exploreActions.forEach((exploreAction) => {
        exploreAction.classList.remove("globe-action-pending");
        exploreAction.classList.add("is-globe-action-visible");
      });
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
      clearProjectRevealHandlers();
      clearAboutMarkerAlignmentHandlers();
      clearClassicPortfolioScrollHandlers();
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
      scheduleClassicPortfolioScrollSetup,
      scheduleProjectScrollIndicatorSetup,
      setupClassicPortfolioScroll,
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
