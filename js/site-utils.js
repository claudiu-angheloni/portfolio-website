(function () {
  function createSiteUtils({
    uiInner,
    pageRoot,
    starsCanvas,
    starsContext,
    globeRoot,
    reducedMotionQuery,
    contactEmail,
    placeholderLinks,
    menuFocusableSelector
  }) {
    let projectPanelLastFocusedElement = null;
    const loadedScripts = new Map();
    let loaderCleanupTimeoutId = 0;

    function prefersReducedMotion() {
      return Boolean(reducedMotionQuery && reducedMotionQuery.matches);
    }

    function waitForWindowLoad() {
      return new Promise((resolve) => {
        if (document.readyState === "complete") {
          resolve();
          return;
        }

        window.addEventListener("load", () => resolve(), { once: true });
      });
    }

    function withTimeout(promise, timeoutMs, onTimeout) {
      let timeoutId = 0;

      return Promise.race([
        promise.finally(() => {
          if (timeoutId) {
            window.clearTimeout(timeoutId);
            timeoutId = 0;
          }
        }),
        new Promise((resolve) => {
          timeoutId = window.setTimeout(() => {
            timeoutId = 0;
            if (typeof onTimeout === "function") {
              onTimeout();
            }
            resolve();
          }, timeoutMs);
        })
      ]);
    }

    function isPlaceholderLink(href) {
      if (!href || href === "#") return true;

      try {
        const url = new URL(href, window.location.href);
        return placeholderLinks.has(url.origin + `${url.pathname.endsWith("/") ? url.pathname : `${url.pathname}/`}`);
      } catch {
        return false;
      }
    }

    function setPlaceholderLinkState(link, isPlaceholder, fallbackLabel = "Link coming soon") {
      if (!link) return;

      if (isPlaceholder) {
        link.setAttribute("aria-disabled", "true");
        link.dataset.placeholderLink = "true";
        link.title = fallbackLabel;
        return;
      }

      link.removeAttribute("aria-disabled");
      link.removeAttribute("title");
      delete link.dataset.placeholderLink;
    }

    function configureExternalLinks(selector, fallbackLabel) {
      document.querySelectorAll(selector).forEach((link) => {
        const href = link.getAttribute("href");
        const placeholder = isPlaceholderLink(href);
        setPlaceholderLinkState(link, placeholder, fallbackLabel);
      });
    }

    function isInternalUrl(href) {
      if (!href || href === "#") return false;

      try {
        const url = new URL(href, window.location.href);
        return url.origin === window.location.origin;
      } catch {
        return false;
      }
    }

    function openContactMailto({ name, email, phone, message }) {
      const subject = encodeURIComponent(`Contact request from ${name || "Website visitor"}`);
      const body = encodeURIComponent([
        `Name: ${name || "-"}`,
        `Email: ${email || "-"}`,
        `Phone: ${phone || "-"}`,
        "",
        message || "-"
      ].join("\n"));

      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    }

    function getActiveProjectPanel() {
      return document.querySelector(".project-panel.is-open");
    }

    function getProjectPanelFocusableElements() {
      const activeProjectPanel = getActiveProjectPanel();
      if (!activeProjectPanel) return [];

      return Array.from(activeProjectPanel.querySelectorAll(menuFocusableSelector)).filter((element) => {
        if (element.hasAttribute("disabled")) return false;
        if (element.getAttribute("aria-hidden") === "true") return false;
        return element.tabIndex !== -1;
      });
    }

    function setProjectPanelBackgroundInert(inert) {
      [uiInner, pageRoot].forEach((element) => {
        if (!element) return;
        if ("inert" in element) {
          element.inert = inert;
        }
        element.setAttribute("aria-hidden", inert ? "true" : "false");
      });
    }

    function focusFirstProjectPanelElement() {
      const [firstFocusable] = getProjectPanelFocusableElements();
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }

    function captureProjectPanelFocus() {
      projectPanelLastFocusedElement = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    }

    function restoreProjectPanelFocus() {
      if (projectPanelLastFocusedElement && typeof projectPanelLastFocusedElement.focus === "function") {
        projectPanelLastFocusedElement.focus();
      }

      projectPanelLastFocusedElement = null;
    }

    function createHomeVisualFallback() {
      const createStar = () => ({
        x: Math.random(),
        y: Math.random(),
        radius: Math.random() > 0.88
          ? Math.random() * 0.7 + 0.42
          : Math.pow(Math.random(), 2.2) * 0.48 + 0.04,
        alpha: Math.random() > 0.84
          ? Math.random() * 0.2 + 0.14
          : Math.pow(Math.random(), 1.5) * 0.2 + 0.012,
        pulseOffset: Math.random() * Math.PI * 2
      });

      const stars = Array.from({ length: 240 }, createStar);
      const projectStars = Array.from({ length: 900 }, createStar);
      let animationFrameId = 0;
      let starfieldActive = false;
      let resizeBound = false;

      function getProjectScrollShell() {
        return document.querySelector(".project-page .project-scroll-shell")
          || document.querySelector(".project-page .page-shell")
          || document.querySelector(".page-shell");
      }

      function getPixelRatio() {
        return Math.min(window.devicePixelRatio || 1, 1.5);
      }

      function resizeStars() {
        if (!starsCanvas || !starsContext) {
          return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;
        const pixelRatio = getPixelRatio();
        starsCanvas.width = Math.floor(width * pixelRatio);
        starsCanvas.height = Math.floor(height * pixelRatio);
        starsCanvas.style.width = `${width}px`;
        starsCanvas.style.height = `${height}px`;
        starsContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      }

      function drawStars(time) {
        if (!starsCanvas || !starsContext) {
          return;
        }

        const width = window.innerWidth;
        const height = window.innerHeight;
        const isProjectPage = document.body.classList.contains("project-page");
        const scrollRoot = isProjectPage ? getProjectScrollShell() : null;
        const scrollTop = scrollRoot ? (scrollRoot.scrollTop || 0) : 0;
        const projectFieldHeight = scrollRoot
          ? Math.max((scrollRoot.scrollHeight || 0) + height, height * 2.4)
          : height;
        const activeStars = isProjectPage ? projectStars : stars;

        starsContext.clearRect(0, 0, width, height);

        const rightFade = starsContext.createLinearGradient(width * 0.2, 0, width * 0.88, 0);
        rightFade.addColorStop(0, "rgba(5,6,8,0)");
        rightFade.addColorStop(0.48, "rgba(5,6,8,0.05)");
        rightFade.addColorStop(1, "rgba(5,6,8,0.24)");
        starsContext.fillStyle = rightFade;
        starsContext.fillRect(0, 0, width, height);

        const lowerFade = starsContext.createLinearGradient(0, height * 0.28, 0, height);
        lowerFade.addColorStop(0, "rgba(5,6,8,0)");
        lowerFade.addColorStop(0.56, "rgba(5,6,8,0.03)");
        lowerFade.addColorStop(1, "rgba(5,6,8,0.11)");
        starsContext.fillStyle = lowerFade;
        starsContext.fillRect(0, 0, width, height);

        for (const star of activeStars) {
          const x = star.x * width;
          const y = isProjectPage
            ? (star.y * projectFieldHeight) - scrollTop
            : star.y * height;

          if (y < -8 || y > height + 8) {
            continue;
          }

          const pulse = 0.84 + Math.sin(time * 0.00018 + star.pulseOffset + x * 0.0016) * 0.1;
          starsContext.fillStyle = `rgba(255,255,255,${star.alpha * pulse})`;
          starsContext.beginPath();
          starsContext.arc(x, y, star.radius, 0, Math.PI * 2);
          starsContext.fill();
        }
      }

      function animate(time) {
        if (!starfieldActive) {
          animationFrameId = 0;
          return;
        }

        drawStars(time);
        animationFrameId = window.requestAnimationFrame(animate);
      }

      function startStarfield() {
        if (starfieldActive) {
          return;
        }

        starfieldActive = true;
        resizeStars();

        if (!resizeBound) {
          window.addEventListener("resize", resizeStars, { passive: true });
          resizeBound = true;
        }

        if (!animationFrameId) {
          animationFrameId = window.requestAnimationFrame(animate);
        }
      }

      function stopStarfield() {
        starfieldActive = false;

        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId);
          animationFrameId = 0;
        }
      }

      return {
        ready: Promise.resolve(),
        focusProjects() {
          return false;
        },
        returnToHome() {
          return false;
        },
        closeProjectPanel() {
          return false;
        },
        show(active, { keepStars = false } = {}) {
          if (starsCanvas) {
            const starsVisible = active || keepStars;
            starsCanvas.style.opacity = starsVisible ? "1" : "0";
            starsCanvas.style.visibility = starsVisible ? "visible" : "hidden";
            if (starsVisible) {
              startStarfield();
            } else if (starsContext) {
              stopStarfield();
              starsContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
            }
          }

          if (globeRoot) {
            globeRoot.style.opacity = "0";
            globeRoot.style.visibility = "hidden";
          }
        }
      };
    }

    function loadScriptOnce(src) {
      if (!src) {
        return Promise.reject(new Error("Missing script src"));
      }

      if (loadedScripts.has(src)) {
        return loadedScripts.get(src);
      }

      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        const existingPromise = Promise.resolve(existingScript);
        loadedScripts.set(src, existingPromise);
        return existingPromise;
      }

      const scriptPromise = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve(script);
        script.onerror = () => {
          loadedScripts.delete(src);
          reject(new Error(`Failed to load script: ${src}`));
        };
        document.head.appendChild(script);
      });

      loadedScripts.set(src, scriptPromise);
      return scriptPromise;
    }

    function finalizeSiteLoader({
      revealing = false,
      markReady = true,
      clearLoading = true,
      hideImmediately = false
    } = {}) {
      const body = document.body;
      if (body) {
        if (revealing) {
          body.classList.add("is-revealing");
        } else {
          body.classList.remove("is-revealing");
        }

        if (markReady) {
          body.classList.add("is-ready");
        }

        if (clearLoading) {
          body.classList.remove("is-loading");
        }
      }

      if (!markReady && !hideImmediately) {
        return;
      }

      const loader = document.querySelector(".site-loader");
      if (!loader) {
        return;
      }

      loader.setAttribute("aria-hidden", "true");
      loader.style.pointerEvents = "none";

      if (loaderCleanupTimeoutId) {
        window.clearTimeout(loaderCleanupTimeoutId);
        loaderCleanupTimeoutId = 0;
      }

      const hideLoader = () => {
        loader.hidden = true;
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
      };

      if (hideImmediately) {
        hideLoader();
        return;
      }

      loader.hidden = false;
      loaderCleanupTimeoutId = window.setTimeout(() => {
        loaderCleanupTimeoutId = 0;
        hideLoader();
      }, 700);
    }

    return {
      captureProjectPanelFocus,
      configureExternalLinks,
      createHomeVisualFallback,
      finalizeSiteLoader,
      focusFirstProjectPanelElement,
      getActiveProjectPanel,
      getProjectPanelFocusableElements,
      isInternalUrl,
      isPlaceholderLink,
      openContactMailto,
      prefersReducedMotion,
      restoreProjectPanelFocus,
      setPlaceholderLinkState,
      setProjectPanelBackgroundInert,
      loadScriptOnce,
      waitForWindowLoad,
      withTimeout
    };
  }

  window.SiteUtils = {
    create: createSiteUtils
  };
})();
