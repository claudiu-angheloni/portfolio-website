(function () {
  function createSiteHomeVisuals({
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
    homePixelRatioLimit,
    isPortfolioActive
  }) {
    return (() => {
      if (!starsCanvas || !starsContext || !globeRoot || !window.THREE) {
        return createHomeVisualFallback();
      }
    
      try {
        const THREE = window.THREE;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
        camera.position.set(0, 0.08, 16.8);
    
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, homePixelRatioLimit));
      renderer.setClearColor(0x000000, 0);
      globeRoot.appendChild(renderer.domElement);
      renderer.domElement.style.touchAction = "none";
      renderer.sortObjects = true;
      const rotationHintEnabled = false;
      const baseCameraPosition = new THREE.Vector3(0, 0.08, 16.8);
      const focusCameraPosition = new THREE.Vector3(0, 0.13, 10.4);
      const baseGlobeRigPosition = new THREE.Vector3(0, 0.78, 0);
      const focusGlobeRigPosition = new THREE.Vector3(2.7, 0.84, 0);
      const baseSunRigPosition = new THREE.Vector3(0, 0.78, 0);
      const focusSunRigPosition = new THREE.Vector3(3.18, 0.8, 0);
      const focusSunScale = 0.72;
    
      const rotationHint = document.createElement("div");
      rotationHint.setAttribute("aria-hidden", "true");
      rotationHint.style.position = "absolute";
      rotationHint.style.left = "0";
      rotationHint.style.top = "0";
      rotationHint.style.display = "grid";
      rotationHint.style.justifyItems = "center";
      rotationHint.style.gap = "8px";
      rotationHint.style.width = "180px";
      rotationHint.style.pointerEvents = "none";
      rotationHint.style.userSelect = "none";
      rotationHint.style.zIndex = "3";
      rotationHint.style.opacity = "0";
      rotationHint.style.transform = "translate3d(-9999px, -9999px, 0)";
      rotationHint.style.transition = "opacity 280ms ease";
    
      const rotationHintOrbit = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      rotationHintOrbit.setAttribute("viewBox", "0 0 180 34");
      rotationHintOrbit.setAttribute("width", "180");
      rotationHintOrbit.setAttribute("height", "34");
      rotationHintOrbit.style.overflow = "visible";
    
      const rotationHintEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      rotationHintEllipse.setAttribute("cx", "90");
      rotationHintEllipse.setAttribute("cy", "15");
      rotationHintEllipse.setAttribute("rx", "54");
      rotationHintEllipse.setAttribute("ry", "10");
      rotationHintEllipse.setAttribute("fill", "none");
      rotationHintEllipse.setAttribute("stroke", "rgba(255,255,255,0.16)");
      rotationHintEllipse.setAttribute("stroke-width", "1.1");
      rotationHintEllipse.setAttribute("stroke-dasharray", "3.4 7.2");
      rotationHintEllipse.setAttribute("stroke-linecap", "round");
    
      const rotationHintMarker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      rotationHintMarker.setAttribute("cx", "144");
      rotationHintMarker.setAttribute("cy", "15");
      rotationHintMarker.setAttribute("r", "2.6");
      rotationHintMarker.setAttribute("fill", "rgba(255,255,255,0.38)");
    
      rotationHintOrbit.append(rotationHintEllipse, rotationHintMarker);
    
      const rotationHintLabel = document.createElement("div");
      rotationHintLabel.dataset.i18n = "globeHint";
      rotationHintLabel.textContent = "DRAG TO ROTATE";
      rotationHintLabel.style.fontFamily = "var(--font)";
      rotationHintLabel.style.fontSize = "11px";
      rotationHintLabel.style.fontWeight = "500";
      rotationHintLabel.style.letterSpacing = "0.22em";
      rotationHintLabel.style.lineHeight = "1";
      rotationHintLabel.style.whiteSpace = "nowrap";
      rotationHintLabel.style.color = "rgba(255,255,255,0.22)";
      rotationHintLabel.style.textTransform = "uppercase";
    
      rotationHint.append(rotationHintOrbit, rotationHintLabel);
      globeRoot.appendChild(rotationHint);
    
      const orbitIndicator = document.createElement("div");
      orbitIndicator.className = "globe-orbit-indicator";
      orbitIndicator.setAttribute("aria-hidden", "true");
    
      const orbitIndicatorSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      orbitIndicatorSvg.classList.add("globe-orbit-indicator-svg");
      orbitIndicatorSvg.setAttribute("viewBox", "0 0 220 220");
      orbitIndicatorSvg.setAttribute("width", "220");
      orbitIndicatorSvg.setAttribute("height", "220");
    
      const orbitIndicatorDefs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      const orbitIndicatorMask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
      const orbitIndicatorMaskId = `globe-orbit-mask-${Math.random().toString(36).slice(2)}`;
      orbitIndicatorMask.setAttribute("id", orbitIndicatorMaskId);
      orbitIndicatorMask.setAttribute("maskUnits", "userSpaceOnUse");
      orbitIndicatorMask.setAttribute("maskContentUnits", "userSpaceOnUse");
    
      const orbitIndicatorMaskRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      orbitIndicatorMaskRect.setAttribute("x", "0");
      orbitIndicatorMaskRect.setAttribute("y", "0");
      orbitIndicatorMaskRect.setAttribute("width", "220");
      orbitIndicatorMaskRect.setAttribute("height", "220");
      orbitIndicatorMaskRect.setAttribute("fill", "#fff");
    
      const orbitIndicatorMaskCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      orbitIndicatorMaskCircle.setAttribute("cx", "110");
      orbitIndicatorMaskCircle.setAttribute("cy", "110");
      orbitIndicatorMaskCircle.setAttribute("r", "74");
      orbitIndicatorMaskCircle.setAttribute("fill", "#000");
    
      orbitIndicatorMask.append(orbitIndicatorMaskRect, orbitIndicatorMaskCircle);
      orbitIndicatorDefs.append(orbitIndicatorMask);
    
      const orbitIndicatorBackTrack = document.createElementNS("http://www.w3.org/2000/svg", "path");
      orbitIndicatorBackTrack.classList.add("globe-orbit-indicator-track", "globe-orbit-indicator-track-back");
      orbitIndicatorBackTrack.setAttribute("fill", "none");
      orbitIndicatorBackTrack.setAttribute("mask", `url(#${orbitIndicatorMaskId})`);
    
      const orbitIndicatorTrack = document.createElementNS("http://www.w3.org/2000/svg", "path");
      orbitIndicatorTrack.classList.add("globe-orbit-indicator-track");
      orbitIndicatorTrack.setAttribute("fill", "none");
    
      const orbitIndicatorMarker = document.createElementNS("http://www.w3.org/2000/svg", "path");
      orbitIndicatorMarker.classList.add("globe-orbit-indicator-marker");
      orbitIndicatorMarker.setAttribute("fill", "none");
      orbitIndicatorMarker.setAttribute("pathLength", "100");
    
      orbitIndicatorSvg.append(orbitIndicatorDefs, orbitIndicatorBackTrack, orbitIndicatorTrack, orbitIndicatorMarker);
      orbitIndicator.appendChild(orbitIndicatorSvg);
      globeRoot.appendChild(orbitIndicator);
      orbitIndicator.style.display = "none";
    
      const exploreAction = document.createElement("button");
      exploreAction.type = "button";
      exploreAction.className = "globe-action";
      exploreAction.setAttribute("aria-label", "Explore my work");
      exploreAction.dataset.i18nAriaLabel = "globeCtaAria";
      exploreAction.innerHTML = `
        <span class="globe-action-line" aria-hidden="true"></span>
        <span class="globe-action-label" data-i18n="globeCta">EXPLORE MY WORK!</span>
      `;
      document.body.appendChild(exploreAction);

      const classicAction = document.createElement("button");
      classicAction.type = "button";
      classicAction.className = "globe-action globe-action-secondary";
      classicAction.setAttribute("aria-label", "Open classic portfolio view");
      classicAction.dataset.i18nAriaLabel = "globeClassicCtaAria";
      classicAction.innerHTML = `
        <span class="globe-action-line" aria-hidden="true"></span>
        <span class="globe-action-label" data-i18n="globeClassicCta">CLASSIC VIEW</span>
      `;
      document.body.appendChild(classicAction);

      const globeActions = [exploreAction, classicAction];
    
      const pinLabel = document.createElement("div");
      pinLabel.className = "globe-pin-label";
      pinLabel.setAttribute("aria-hidden", "true");
      pinLabel.innerHTML = `
        <span class="globe-pin-label-line" aria-hidden="true"></span>
        <span class="globe-pin-label-card">
          <span class="globe-pin-label-city"></span>
          <span class="globe-pin-label-country"></span>
        </span>
      `;
      globeRoot.appendChild(pinLabel);
      const pinLabelCity = pinLabel.querySelector(".globe-pin-label-city");
      const pinLabelCountry = pinLabel.querySelector(".globe-pin-label-country");
    
      const projectPanel = document.createElement("aside");
      projectPanel.className = "project-panel";
      projectPanel.setAttribute("role", "dialog");
      projectPanel.setAttribute("aria-modal", "true");
      projectPanel.setAttribute("tabindex", "-1");
      projectPanel.setAttribute("aria-hidden", "true");
      projectPanel.innerHTML = `
        <div class="project-panel-scanline" aria-hidden="true"></div>
        <div class="project-panel-grid" aria-hidden="true"></div>
        <span class="project-panel-anchor" aria-hidden="true"></span>
        <div class="project-panel-shell">
          <div class="project-panel-media-layer" aria-hidden="true">
            <div class="project-panel-media-glitch project-panel-media-glitch-a" aria-hidden="true"></div>
            <div class="project-panel-media-glitch project-panel-media-glitch-b" aria-hidden="true"></div>
            <div class="project-panel-media-fracture project-panel-media-fracture-a" aria-hidden="true"></div>
            <div class="project-panel-media-fracture project-panel-media-fracture-b" aria-hidden="true"></div>
            <span class="project-panel-media-chip project-panel-media-chip-tl" aria-hidden="true"></span>
            <span class="project-panel-media-chip project-panel-media-chip-br" aria-hidden="true"></span>
            <div class="project-panel-media-screen"></div>
          </div>
          <div class="project-panel-media-overlay" aria-hidden="true"></div>
          <div class="project-panel-body">
            <button class="project-panel-close" type="button" aria-label="Close project details">
              <span class="project-panel-close-icon" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
            <div class="project-panel-scroll">
              <div class="project-panel-copy">
                <p class="project-panel-summary"></p>
                <div class="project-panel-section">
                  <div class="project-panel-section-label">Client</div>
                  <div class="project-panel-client">
                    <p class="project-panel-client-name"></p>
                    <div class="project-panel-location project-panel-client-location" aria-label="Project location">
                      <span class="project-panel-city project-panel-client-city"></span>
                      <span class="project-panel-location-separator">/</span>
                      <span class="project-panel-country project-panel-client-country"></span>
                    </div>
                    <div class="project-panel-meta project-panel-client-meta">
                      <span class="project-panel-meta-item project-panel-client-year"></span>
                      <span class="project-panel-meta-item project-panel-client-status"></span>
                    </div>
                  </div>
                </div>
                <div class="project-panel-cta-wrap">
                  <a class="project-panel-cta contact-submit" href="#">
                    <span class="contact-submit-fill" aria-hidden="true"></span>
                    <span class="contact-submit-segment contact-submit-segment-top" aria-hidden="true"></span>
                    <span class="contact-submit-segment contact-submit-segment-right" aria-hidden="true"></span>
                    <span class="contact-submit-segment contact-submit-segment-bottom" aria-hidden="true"></span>
                    <span class="contact-submit-segment contact-submit-segment-left" aria-hidden="true"></span>
                    <span class="contact-submit-label project-panel-cta-label">See the full project</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="project-panel-scroll-rail" aria-hidden="true">
            <span class="project-panel-scroll-thumb"></span>
          </div>
        </div>
      `;
      document.body.appendChild(projectPanel);
      let projectPanelEdgeLine = null;
      const projectPanelClose = projectPanel.querySelector(".project-panel-close");
      const projectPanelSummary = projectPanel.querySelector(".project-panel-summary");
      const projectPanelClientName = projectPanel.querySelector(".project-panel-client-name");
      const projectPanelClientCity = projectPanel.querySelector(".project-panel-client-city");
      const projectPanelClientCountry = projectPanel.querySelector(".project-panel-client-country");
      const projectPanelClientYear = projectPanel.querySelector(".project-panel-client-year");
      const projectPanelClientStatus = projectPanel.querySelector(".project-panel-client-status");
      const projectPanelScroll = projectPanel.querySelector(".project-panel-scroll");
      const projectPanelScrollThumb = projectPanel.querySelector(".project-panel-scroll-thumb");
      const projectPanelAnchor = projectPanel.querySelector(".project-panel-anchor");
      const projectPanelMediaGlitchA = projectPanel.querySelector(".project-panel-media-glitch-a");
      const projectPanelMediaGlitchB = projectPanel.querySelector(".project-panel-media-glitch-b");
      const projectPanelMediaFractureA = projectPanel.querySelector(".project-panel-media-fracture-a");
      const projectPanelMediaFractureB = projectPanel.querySelector(".project-panel-media-fracture-b");
      const projectPanelMediaScreen = projectPanel.querySelector(".project-panel-media-screen");
      const projectPanelCta = projectPanel.querySelector(".project-panel-cta");
      const projectPanelCtaLabel = projectPanel.querySelector(".project-panel-cta-label");
      const projectPanelLabelId = `project-panel-title-${Math.random().toString(36).slice(2)}`;
      projectPanelClientName.id = projectPanelLabelId;
      projectPanel.setAttribute("aria-labelledby", projectPanelLabelId);
    
      const textureLoader = new THREE.TextureLoader();
      const globeRig = new THREE.Group();
      globeRig.position.copy(baseGlobeRigPosition);
      scene.add(globeRig);
      const sunRig = new THREE.Group();
      sunRig.position.copy(baseSunRigPosition);
      scene.add(sunRig);
      const stage = new THREE.Group();
      globeRig.add(stage);
      stage.position.set(-2.7, -0.78, 0);
      stage.scale.setScalar(0.98);
      const globeGroup = new THREE.Group();
      stage.add(globeGroup);
      const orbitGuideGroup = new THREE.Group();
      orbitGuideGroup.rotation.x = -1.34;
      orbitGuideGroup.rotation.z = 0.04;
      orbitGuideGroup.visible = false;
      stage.add(orbitGuideGroup);
      const pinGroup = new THREE.Group();
      pinGroup.visible = false;
      globeGroup.add(pinGroup);
    
      const createStar = () => ({
        x: Math.random(),
        y: Math.random(),
        radius: (() => {
          const largeStar = Math.random() > 0.86;
          return largeStar
            ? Math.random() * 0.8 + 0.45
            : Math.pow(Math.random(), 2.4) * 0.55 + 0.04;
        })(),
        alpha: (() => {
          const brightStar = Math.random() > 0.84;
          return brightStar
            ? Math.random() * 0.22 + 0.16
            : Math.pow(Math.random(), 1.5) * 0.22 + 0.014;
        })(),
        pulseOffset: Math.random() * Math.PI * 2
      });
    
      const stars = Array.from({ length: 1200 }, createStar);
      const projectStars = Array.from({ length: 3600 }, createStar);
    
      const MAX_VERTICAL_TILT = 0.42;
      const DEFAULT_VERTICAL_TILT = MAX_VERTICAL_TILT;
      const GLOBE_RADIUS = 2.28;
      const EARTH_AUTO_SPIN_SPEED = 0.0128;
      const CLOUD_RELATIVE_SPIN_SPEED = 1.14;
      const VERTICAL_RETURN_RATE = 0.75;
      const ORBIT_MARKER_SPEED = 1.04;
      const ORBIT_RADIUS = 2.92;
      const ORBIT_GUIDE_SEGMENTS = 160;
      const ORBIT_SATELLITE_SIZE_PX = 4;
    
      const drag = {
        active: false,
        pointerX: 0,
        pointerY: 0,
        velocityX: 0,
        velocityY: 0,
        targetX: 0.86,
        targetY: DEFAULT_VERTICAL_TILT,
        currentX: 0.86,
        currentY: DEFAULT_VERTICAL_TILT
      };
    
      let cloudDrift = 0;
      let earthSpin = 0;
      let isVisible = false;
      let lastFrameTime = 0;
      let projectsFocusActive = false;
      let projectsFocusProgress = 0;
      let projectsFocusDelayRemaining = 0;
      let homeTitleRevealPending = false;
      let homeTitleRevealThreshold = 0.14;
      let exploreActionPresence = 0;
      let exploreActionPresenceTarget = 0;
      let exploreActionMenuReveal = 1;
      let orbitMarkerPhase = Math.PI;
      let exploreActionLocked = false;
      let exploreActionLockPending = false;
      let exploreActionLockedX = 0;
      let exploreActionLockedY = 0;
      let animationFrameId = 0;
      let dragTrackingBound = false;
      let hoveredPin = null;
      let lastHoveredPin = null;
      let selectedPin = null;
      let projectPanelCloseTimer = 0;
      let frozenGlobeRotationY = 0;
      let frozenGlobeRotationX = DEFAULT_VERTICAL_TILT;
      let frozenGlobeRotationZ = 0;
      let pointerDownTravel = 0;
      let pointerDownClientX = 0;
      let pointerDownClientY = 0;
      const globeScreenCenter = new THREE.Vector3();
      const globeScreenEdge = new THREE.Vector3();
      const pinScreenPosition = new THREE.Vector3();
      const orbitSatelliteWorldPosition = new THREE.Vector3();
      const hoveredPinWorldPosition = new THREE.Vector3();
      const globeWorldPosition = new THREE.Vector3();
      const pinCameraVector = new THREE.Vector3();
      const pinSurfaceVector = new THREE.Vector3();
      const raycaster = new THREE.Raycaster();
      const pointerNdc = new THREE.Vector2(2, 2);
      const orbitGuideGeometry = new THREE.Geometry();
      for (let segmentIndex = 0; segmentIndex <= ORBIT_GUIDE_SEGMENTS; segmentIndex += 1) {
        const angle = (segmentIndex / ORBIT_GUIDE_SEGMENTS) * Math.PI * 2;
        orbitGuideGeometry.vertices.push(new THREE.Vector3(
          Math.cos(angle) * ORBIT_RADIUS,
          Math.sin(angle) * ORBIT_RADIUS,
          0
        ));
      }
      const orbitGuideMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.025,
        depthTest: true,
        depthWrite: false
      });
      const orbitGuide = new THREE.Line(orbitGuideGeometry, orbitGuideMaterial);
      orbitGuide.renderOrder = 3;
      orbitGuideGroup.add(orbitGuide);
    
      const orbitSatelliteTextureCanvas = document.createElement("canvas");
      orbitSatelliteTextureCanvas.width = 64;
      orbitSatelliteTextureCanvas.height = 64;
      const orbitSatelliteTextureContext = orbitSatelliteTextureCanvas.getContext("2d");
      const orbitSatelliteGradient = orbitSatelliteTextureContext.createRadialGradient(32, 32, 0, 32, 32, 32);
      orbitSatelliteGradient.addColorStop(0, "rgba(255,255,255,1)");
      orbitSatelliteGradient.addColorStop(0.45, "rgba(255,255,255,0.98)");
      orbitSatelliteGradient.addColorStop(0.72, "rgba(255,255,255,0.35)");
      orbitSatelliteGradient.addColorStop(1, "rgba(255,255,255,0)");
      orbitSatelliteTextureContext.fillStyle = orbitSatelliteGradient;
      orbitSatelliteTextureContext.fillRect(0, 0, 64, 64);
      const orbitSatelliteTexture = new THREE.CanvasTexture(orbitSatelliteTextureCanvas);
      orbitSatelliteTexture.minFilter = THREE.LinearFilter;
      orbitSatelliteTexture.magFilter = THREE.LinearFilter;
      const orbitSatelliteMaterial = new THREE.SpriteMaterial({
        map: orbitSatelliteTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.98,
        depthTest: true,
        depthWrite: false
      });
      const orbitSatellite = new THREE.Sprite(orbitSatelliteMaterial);
      orbitSatellite.renderOrder = 4;
      orbitSatellite.frustumCulled = false;
      orbitGuideGroup.add(orbitSatellite);
    
      function latLonToVector3(lat, lon, radius) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
    
        return new THREE.Vector3(
          -(radius * Math.sin(phi) * Math.cos(theta)),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );
      }
    
      function createPinTexture() {
        const canvas = document.createElement("canvas");
        canvas.width = 160;
        canvas.height = 160;
        const context = canvas.getContext("2d");
    
        const glow = context.createRadialGradient(80, 80, 0, 80, 80, 80);
        glow.addColorStop(0, "rgba(255,255,255,0.95)");
        glow.addColorStop(0.18, "rgba(255,255,255,0.82)");
        glow.addColorStop(0.42, "rgba(255,255,255,0.22)");
        glow.addColorStop(1, "rgba(255,255,255,0)");
        context.fillStyle = glow;
        context.fillRect(0, 0, 160, 160);
    
        context.beginPath();
        context.arc(80, 80, 12, 0, Math.PI * 2);
        context.fillStyle = "rgba(255,255,255,0.98)";
        context.fill();
    
        context.beginPath();
        context.arc(80, 80, 26, 0, Math.PI * 2);
        context.strokeStyle = "rgba(255,255,255,0.76)";
        context.lineWidth = 2;
        context.stroke();
    
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        return texture;
      }
    
      const pinTexture = createPinTexture();
      const pinSurfaceRadius = GLOBE_RADIUS + 0.07;
      const pinSurfaceNormal = new THREE.Vector3();
    
      portfolioPins.forEach((pin) => {
        const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
          map: pinTexture,
          color: 0xffffff,
          transparent: true,
          opacity: 0,
          depthTest: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        }));
        const position = latLonToVector3(pin.lat, pin.lon, pinSurfaceRadius);
        pinSurfaceNormal.copy(position).normalize();
        sprite.position.copy(position).addScaledVector(pinSurfaceNormal, 0.015);
        sprite.scale.setScalar(0.14);
        sprite.renderOrder = 6;
        sprite.frustumCulled = false;
        sprite.userData.pin = pin;
        pinGroup.add(sprite);
      });
    
      raycaster.params.Sprite = {
        threshold: 0.28
      };
    
    
      const globeUniforms = {
        uDayMap: { value: null },
        uNightMap: { value: null },
        uHeightMap: { value: null },
        uHeightTexel: { value: new THREE.Vector2(1 / 4096, 1 / 2048) },
        uLightDirection: { value: new THREE.Vector3(-0.93, 0.42, 0.12).normalize() },
        uBaseTint: { value: new THREE.Color(0x090d12) },
        uAmbient: { value: 0.05 },
        uDayStrength: { value: 1.08 },
        uNightStrength: { value: 0.98 }
      };
    
      const globeMaterial = new THREE.ShaderMaterial({
        uniforms: globeUniforms,
        transparent: true,
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            vViewNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D uDayMap;
          uniform sampler2D uNightMap;
          uniform sampler2D uHeightMap;
          uniform vec2 uHeightTexel;
          uniform vec3 uLightDirection;
          uniform vec3 uBaseTint;
          uniform float uAmbient;
          uniform float uDayStrength;
          uniform float uNightStrength;
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vec3 normal = normalize(vWorldNormal);
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            vec3 viewNormal = normalize(vViewNormal);
            vec3 lightDir = normalize(uLightDirection);
            float lightFacing = dot(normal, lightDir);
            float leftScreenMask = 1.0 - smoothstep(-0.04, 0.42, viewNormal.x);
            float lowerRightFade = 1.0 - smoothstep(0.18, 0.82, viewNormal.x) * smoothstep(-0.92, -0.14, viewNormal.y);
            float dayMask = smoothstep(0.18, 0.54, lightFacing);
            float nightMask = 1.0 - smoothstep(-0.06, 0.26, lightFacing);
            float transitionMask = smoothstep(-0.1, 0.46, lightFacing);
            float daySample = texture2D(uDayMap, vUv).r;
            float nightSample = texture2D(uNightMap, vUv).r;
            float height = texture2D(uHeightMap, vUv).r;
            float heightEast = texture2D(uHeightMap, vUv + vec2(uHeightTexel.x, 0.0)).r;
            float heightWest = texture2D(uHeightMap, vUv - vec2(uHeightTexel.x, 0.0)).r;
            float heightNorth = texture2D(uHeightMap, vUv + vec2(0.0, uHeightTexel.y)).r;
            float heightSouth = texture2D(uHeightMap, vUv - vec2(0.0, uHeightTexel.y)).r;
            float heightAverage = (heightEast + heightWest + heightNorth + heightSouth) * 0.25;
            float landRelief = smoothstep(0.24, 0.88, height);
            float ridge = max(height - heightAverage, 0.0);
            float basin = max(heightAverage - height, 0.0);
            float diffuse = max(lightFacing * 0.58 + 0.42, 0.0);
            float reliefBoost = ridge * 2.6 + landRelief * 0.18;
            float dayLight = uAmbient + pow(diffuse, 1.18) * uDayStrength;
            dayLight += ridge * 0.42 * smoothstep(0.12, 0.4, lightFacing);
            dayLight -= basin * 0.1 * smoothstep(0.06, 0.24, lightFacing);
            float terrain = mix(daySample * 0.12, daySample * 0.24 + landRelief * 0.08 + reliefBoost * 0.16, 0.68);
            float dayValue = terrain * dayLight * dayMask;
            float citySignal = max(nightSample - 0.055, 0.0);
            citySignal = pow(citySignal, 1.42) * 2.8 * uNightStrength;
            float edge = 1.0 - max(dot(viewDir, normal), 0.0);
            float rightSideMask = smoothstep(0.08, 0.72, viewNormal.x);
            float lowerMask = 1.0 - smoothstep(-0.14, 0.32, viewNormal.y);
            float darkSideFade = rightSideMask * smoothstep(0.5, 0.92, edge);
            float lowerRightDarkFade = rightSideMask * lowerMask * smoothstep(0.42, 0.9, edge);
            float rim = pow(edge, 4.8);
            float rimLight = rim * smoothstep(0.06, 0.18, lightFacing) * 0.036 * leftScreenMask * lowerRightFade;
            float limbGlow = pow(edge, 2.05) * smoothstep(0.08, 0.48, lightFacing) * 0.22 * leftScreenMask * lowerRightFade;
            float dayBloom = pow(max(lightFacing, 0.0), 0.78) * pow(edge, 1.62) * 0.145 * leftScreenMask * lowerRightFade;
            float wrapWash = smoothstep(0.08, 0.3, lightFacing) * pow(edge, 1.22) * 0.058 * leftScreenMask * lowerRightFade;
            float nightBase = 0.009 + citySignal * nightMask;
            float nightSoft = 0.0105 + citySignal * mix(0.96, 0.9, smoothstep(0.08, 0.22, lightFacing));
            float bandSpread = smoothstep(-0.12, 0.22, lightFacing);
            float nightValue = mix(nightBase, nightSoft, bandSpread);
            nightValue += smoothstep(-0.08, 0.16, lightFacing) * 0.008;
            float twilightVeil = smoothstep(-0.12, 0.18, lightFacing) * (1.0 - smoothstep(0.16, 0.5, lightFacing)) * 0.018 * leftScreenMask * lowerRightFade;
            float surface = mix(nightValue, 0.018 + dayValue, transitionMask);
            surface += twilightVeil;
            float continentMask = smoothstep(0.11, 0.32, daySample) * smoothstep(0.18, 0.72, height);
            float continentLift = continentMask * (0.012 + landRelief * 0.022 + ridge * 0.09);
            surface += continentLift * mix(0.9, 0.45, dayMask);
            surface += rimLight + limbGlow + dayBloom + wrapWash;
            surface *= 1.0 - darkSideFade * 0.42;
            surface *= 1.0 - lowerRightDarkFade * 0.52;
            surface = 1.0 - exp(-surface * 1.18);
            surface = mix(surface, pow(surface, 0.96), 0.18);
            gl_FragColor = vec4(vec3(surface), 0.995);
          }
        `
      });
    
      const globe = new THREE.Mesh(new THREE.SphereGeometry(GLOBE_RADIUS, 192, 192), globeMaterial);
      globeGroup.add(globe);
    
      const lightWrapMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uLightDirection: globeUniforms.uLightDirection,
          uIntensity: { value: 0.86 },
          uColor: { value: new THREE.Color(0xf3f6fb) }
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            vViewNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uLightDirection;
          uniform vec3 uColor;
          uniform float uIntensity;
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vec3 normal = normalize(vWorldNormal);
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            vec3 viewNormal = normalize(vViewNormal);
            vec3 lightDir = normalize(uLightDirection);
            vec3 viewLightDir = normalize(mat3(viewMatrix) * lightDir);
            float lightFacing = max(dot(normal, lightDir), 0.0);
            float edge = 1.0 - max(dot(viewDir, normal), 0.0);
            vec2 screenNormal = normalize(viewNormal.xy + vec2(0.0001, 0.0001));
            vec2 sunScreenDir = normalize(viewLightDir.xy + vec2(0.0001, 0.0001));
            float leftScreenMask = 1.0 - smoothstep(0.02, 0.38, viewNormal.x);
            float sunArc = dot(screenNormal, sunScreenDir);
            float arcMask = smoothstep(0.14, 0.78, sunArc) * leftScreenMask;
            float litMask = smoothstep(0.02, 0.44, lightFacing);
            float bandCore = smoothstep(0.24, 0.54, edge) * (1.0 - smoothstep(0.8, 0.955, edge));
            float outerMist = smoothstep(0.58, 0.9, edge) * (1.0 - smoothstep(0.972, 0.999, edge));
            float glow = (bandCore * 0.9 + outerMist * 0.03) * litMask * arcMask * uIntensity;
            float alpha = glow * (0.22 + bandCore * 0.18);
            vec3 color = uColor * (0.5 + lightFacing * 0.34);
            gl_FragColor = vec4(color * glow, alpha);
          }
        `
      });
      const lightWrapSphere = new THREE.Mesh(new THREE.SphereGeometry(2.352, 160, 160), lightWrapMaterial);
      lightWrapSphere.renderOrder = 2;
      globeGroup.add(lightWrapSphere);
    
      const crescentMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uLightDirection: globeUniforms.uLightDirection,
          uIntensity: { value: 1.16 },
          uColor: { value: new THREE.Color(0xf8fbff) }
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            vViewNormal = normalize(normalMatrix * normal);
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uLightDirection;
          uniform vec3 uColor;
          uniform float uIntensity;
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vec3 normal = normalize(vWorldNormal);
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            vec3 viewNormal = normalize(vViewNormal);
            vec3 lightDir = normalize(uLightDirection);
            float lightFacing = max(dot(normal, lightDir), 0.0);
            float edge = 1.0 - max(dot(viewDir, normal), 0.0);
            float leftScreenMask = 1.0 - smoothstep(-0.02, 0.3, viewNormal.x);
            float crescent = pow(lightFacing, 0.98) * pow(edge, 2.72);
            float spill = pow(lightFacing, 0.7) * pow(edge, 1.46) * 0.32;
            float glow = (crescent * 0.86 + spill) * uIntensity * leftScreenMask;
            gl_FragColor = vec4(uColor * glow, glow * 0.88);
          }
        `
      });
      const crescentSphere = new THREE.Mesh(new THREE.SphereGeometry(2.279, 160, 160), crescentMaterial);
      crescentSphere.renderOrder = 4;
      globeGroup.add(crescentSphere);
    
      const nightLightsMaterial = new THREE.MeshPhongMaterial({
        color: 0xf2f4f7,
        transparent: true,
        opacity: 0.12,
        shininess: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      const nightLightsSphere = new THREE.Mesh(new THREE.SphereGeometry(2.292, 192, 192), nightLightsMaterial);
      globeGroup.add(nightLightsSphere);
    
      const cloudMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uCloudMap: { value: null },
          uCloudAlphaMap: { value: null },
          uCloudAlphaTexel: { value: new THREE.Vector2(1 / 2048, 1 / 1024) },
          uCloudDetailTexel: { value: new THREE.Vector2(1 / 4096, -1 / 2048) },
          uLightDirection: globeUniforms.uLightDirection,
          uOpacity: { value: 0.145 },
          uColor: { value: new THREE.Color(0xf0f3f7) }
        },
        transparent: true,
        depthWrite: false,
        depthTest: true,
        polygonOffset: true,
        polygonOffsetFactor: -1,
        polygonOffsetUnits: -1,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            vec3 viewNormal = normalize(normalMatrix * normal);
            vViewNormal = viewNormal;
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D uCloudMap;
          uniform sampler2D uCloudAlphaMap;
          uniform vec2 uCloudAlphaTexel;
          uniform vec2 uCloudDetailTexel;
          uniform vec3 uLightDirection;
          uniform vec3 uColor;
          uniform float uOpacity;
          varying vec2 vUv;
          varying vec3 vWorldPosition;
          varying vec3 vWorldNormal;
          varying vec3 vViewNormal;
          void main() {
            vec2 cloudUv = vUv;
            float alphaCenter = texture2D(uCloudAlphaMap, cloudUv).r;
            float alphaSoft =
              alphaCenter * 0.4 +
              texture2D(uCloudAlphaMap, cloudUv + vec2(uCloudAlphaTexel.x, 0.0)).r * 0.15 +
              texture2D(uCloudAlphaMap, cloudUv - vec2(uCloudAlphaTexel.x, 0.0)).r * 0.15 +
              texture2D(uCloudAlphaMap, cloudUv + vec2(0.0, uCloudAlphaTexel.y)).r * 0.15 +
              texture2D(uCloudAlphaMap, cloudUv - vec2(0.0, uCloudAlphaTexel.y)).r * 0.15;
            float cloudBase = texture2D(uCloudMap, cloudUv).r;
            float cloudDetail = texture2D(uCloudMap, cloudUv + uCloudDetailTexel).r;
            float density = mix(cloudBase, cloudDetail, 0.35);
            float cloudMask = smoothstep(0.18, 0.84, alphaSoft) * smoothstep(0.26, 0.9, density);
            vec3 normal = normalize(vWorldNormal);
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            vec3 viewNormal = normalize(vViewNormal);
            vec3 lightDir = normalize(uLightDirection);
            float lightFacing = dot(normal, lightDir);
            float edge = 1.0 - max(dot(viewDir, normal), 0.0);
            float leftScreenMask = 1.0 - smoothstep(0.06, 0.38, viewNormal.x);
            float lowerRightFade = 1.0 - smoothstep(0.22, 0.84, viewNormal.x) * smoothstep(-0.92, -0.18, viewNormal.y);
            float limbFade = 1.0 - smoothstep(0.72, 0.94, edge);
            float forwardLight = smoothstep(-0.18, 0.42, lightFacing);
            float backScatter = smoothstep(-0.32, 0.08, lightFacing) * pow(edge, 1.55);
            float puff = smoothstep(0.38, 0.95, density) * 0.22;
            float brightness = 0.22 + forwardLight * 0.58 + backScatter * 0.42 + puff;
            float alpha = cloudMask * (uOpacity + backScatter * 0.12) * limbFade * mix(0.18, 1.0, leftScreenMask * lowerRightFade);
            vec3 color = uColor * brightness;
            gl_FragColor = vec4(color, alpha);
          }
        `
      });
      const cloudSphere = new THREE.Mesh(new THREE.SphereGeometry(2.286, 160, 160), cloudMaterial);
      cloudSphere.renderOrder = 5;
      globeGroup.add(cloudSphere);
    
      scene.add(new THREE.AmbientLight(0xffffff, 0.14));
      scene.add(new THREE.HemisphereLight(0xffffff, 0x090b0d, 0.08));
    
      const sunLight = new THREE.PointLight(0xffffff, 9.2, 220, 2);
      sunLight.position.set(-4.72, 0.56, 2.2);
      sunRig.add(sunLight);
    
      const fillLight = new THREE.DirectionalLight(0xffffff, 0.08);
      fillLight.position.set(4.8, -0.4, 4.8);
      scene.add(fillLight);
    
      const rimLight = new THREE.DirectionalLight(0xffffff, 0.1);
      rimLight.position.set(-5.6, 0.8, 3.6);
      scene.add(rimLight);
    
      function createRadialSpriteTexture(innerStops) {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;
        const context = canvas.getContext("2d");
        const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
        innerStops.forEach(([offset, color]) => gradient.addColorStop(offset, color));
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        return texture;
      }
    
      function createSoftHaloTexture({
        size = 1024,
        intensity = 0.42,
        coreRadius = 0.18,
        bodyRadius = 0.5,
        edgeStart = 0.5,
        edgeEnd = 0.98
      }) {
        const canvas = document.createElement("canvas");
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext("2d");
        const imageData = context.createImageData(size, size);
        const { data } = imageData;
        const center = size * 0.5;
        const invRadius = 1 / center;
        const smoothstep = (start, end, value) => {
          const t = Math.max(0, Math.min(1, (value - start) / (end - start)));
          return t * t * (3 - 2 * t);
        };
    
        for (let y = 0; y < size; y += 1) {
          const dy = (y + 0.5 - center) * invRadius;
          for (let x = 0; x < size; x += 1) {
            const dx = (x + 0.5 - center) * invRadius;
            const radius = Math.sqrt(dx * dx + dy * dy);
            let alpha = 0;
    
            if (radius < 1) {
              const core = Math.exp(-Math.pow(radius / coreRadius, 2.1));
              const body = Math.exp(-Math.pow(radius / bodyRadius, 3.1));
              const edge = 1 - smoothstep(edgeStart, edgeEnd, radius);
              alpha = intensity * (core * 0.56 + body * 0.44) * edge;
            }
    
            const index = (y * size + x) * 4;
            data[index] = 255;
            data[index + 1] = 255;
            data[index + 2] = 255;
            data[index + 3] = Math.round(Math.max(0, Math.min(1, alpha)) * 255);
          }
        }
    
        context.putImageData(imageData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
        return texture;
      }
    
      const sunCoreTexture = createRadialSpriteTexture([
        [0, "rgba(255,255,255,0.95)"],
        [0.12, "rgba(255,255,255,0.72)"],
        [0.28, "rgba(255,255,255,0.34)"],
        [0.58, "rgba(255,255,255,0.08)"],
        [1, "rgba(255,255,255,0)"]
      ]);
      const sunHaloTexture = createSoftHaloTexture({
        intensity: 0.42,
        coreRadius: 0.18,
        bodyRadius: 0.52,
        edgeStart: 0.48,
        edgeEnd: 0.98
      });
      const sunOverlayHaloTexture = createSoftHaloTexture({
        intensity: 0.34,
        coreRadius: 0.16,
        bodyRadius: 0.46,
        edgeStart: 0.42,
        edgeEnd: 0.9
      });
      const sunGlowMaterial = new THREE.SpriteMaterial({
        map: sunHaloTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending
      });
      const sunCoreMaterial = new THREE.SpriteMaterial({
        map: sunCoreTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        depthTest: true,
        blending: THREE.AdditiveBlending
      });
      const sunGlow = new THREE.Sprite(sunGlowMaterial);
      sunGlow.position.set(-4.8, 0.52, -0.45);
      sunGlow.scale.set(9.6, 9.6, 1);
      sunRig.add(sunGlow);
      const sunCore = new THREE.Sprite(sunCoreMaterial);
      sunCore.position.set(-4.82, 0.54, -0.34);
      sunCore.scale.set(3.8, 3.8, 1);
      sunRig.add(sunCore);
    
      const sunOverlayGlowMaterial = new THREE.SpriteMaterial({
        map: sunOverlayHaloTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.26,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending
      });
      const sunOverlayCoreMaterial = new THREE.SpriteMaterial({
        map: sunCoreTexture,
        color: 0xffffff,
        transparent: true,
        opacity: 0.12,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending
      });
      const sunOverlayGlow = new THREE.Sprite(sunOverlayGlowMaterial);
      sunOverlayGlow.position.copy(sunGlow.position);
      sunOverlayGlow.scale.set(9.4, 9.4, 1);
      sunOverlayGlow.renderOrder = 8;
      sunRig.add(sunOverlayGlow);
      const sunOverlayCoreTexture = createRadialSpriteTexture([
        [0, "rgba(255,255,255,0.95)"],
        [0.24, "rgba(255,255,255,0.82)"],
        [0.48, "rgba(255,255,255,0.44)"],
        [0.76, "rgba(255,255,255,0.1)"],
        [1, "rgba(255,255,255,0)"]
      ]);
      sunOverlayCoreMaterial.map = sunOverlayCoreTexture;
      sunOverlayCoreMaterial.needsUpdate = true;
      const sunOverlayCore = new THREE.Sprite(sunOverlayCoreMaterial);
      sunOverlayCore.position.copy(sunCore.position);
      sunOverlayCore.scale.copy(sunCore.scale);
      sunOverlayCore.renderOrder = 9;
      sunRig.add(sunOverlayCore);
    
      function configureTexture(texture) {
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        if (renderer.capabilities && renderer.capabilities.getMaxAnisotropy) {
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        }
      }
    
      function loadTexture(url, onLoad) {
        return new Promise((resolve) => {
          textureLoader.load(url, (texture) => {
            onLoad(texture);
            resolve();
          }, undefined, (error) => {
            console.warn(`Texture failed to load: ${url}`, error);
            resolve();
          });
        });
      }
    
      function resizeHome() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        const pixelRatio = Math.min(window.devicePixelRatio, homePixelRatioLimit);
        starsCanvas.width = Math.floor(width * pixelRatio);
        starsCanvas.height = Math.floor(height * pixelRatio);
        starsCanvas.style.width = `${width}px`;
        starsCanvas.style.height = `${height}px`;
        starsContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        updateProjectPanelScrollIndicator();
      }
    
      function drawStars(time) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        starsContext.clearRect(0, 0, width, height);
        const isProjectPage = document.body.classList.contains("project-page");
        const scrollRoot = isProjectPage ? getProjectPageShell() : null;
        const scrollTop = scrollRoot ? (scrollRoot.scrollTop || 0) : 0;
        const projectFieldHeight = scrollRoot
          ? Math.max((scrollRoot.scrollHeight || 0) + height, height * 3)
          : height;
        const activeStars = isProjectPage ? projectStars : stars;
    
        const rightFade = starsContext.createLinearGradient(width * 0.26, 0, width * 0.84, 0);
        rightFade.addColorStop(0, "rgba(5,6,8,0)");
        rightFade.addColorStop(0.42, "rgba(5,6,8,0.04)");
        rightFade.addColorStop(0.72, "rgba(5,6,8,0.14)");
        rightFade.addColorStop(1, "rgba(5,6,8,0.28)");
        starsContext.fillStyle = rightFade;
        starsContext.fillRect(0, 0, width, height);
    
        const lowerFade = starsContext.createLinearGradient(0, height * 0.34, 0, height);
        lowerFade.addColorStop(0, "rgba(5,6,8,0)");
        lowerFade.addColorStop(0.5, "rgba(5,6,8,0.03)");
        lowerFade.addColorStop(1, "rgba(5,6,8,0.12)");
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
          const pulse = 0.82 + Math.sin(time * 0.00018 + star.pulseOffset + x * 0.0018) * 0.1;
          starsContext.fillStyle = `rgba(255,255,255,${star.alpha * pulse})`;
          starsContext.beginPath();
          starsContext.arc(x, y, star.radius, 0, Math.PI * 2);
          starsContext.fill();
        }
      }
    
      function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
      }
    
      function lerp(start, end, alpha) {
        return start + (end - start) * alpha;
      }
    
      function easeInOut(alpha) {
        return alpha * alpha * (3 - 2 * alpha);
      }
    
      function updateOrbitSatellitePosition() {
        orbitSatellite.position.set(
          Math.cos(orbitMarkerPhase) * ORBIT_RADIUS,
          Math.sin(orbitMarkerPhase) * ORBIT_RADIUS,
          0
        );
    
        orbitSatellite.getWorldPosition(orbitSatelliteWorldPosition);
        const distanceToCamera = camera.position.distanceTo(orbitSatelliteWorldPosition);
        const visibleHeight = 2 * Math.tan((camera.fov * 0.5) * (Math.PI / 180)) * distanceToCamera;
        const worldUnitsPerPixel = visibleHeight / Math.max(window.innerHeight, 1);
        const satelliteScale = Math.max(worldUnitsPerPixel * ORBIT_SATELLITE_SIZE_PX, 0.001);
        orbitSatellite.scale.setScalar(satelliteScale);
      }
    
      function bindDragTracking() {
        if (dragTrackingBound) return;
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
        dragTrackingBound = true;
      }
    
      function unbindDragTracking() {
        if (!dragTrackingBound) return;
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
        dragTrackingBound = false;
      }
    
      function stopAnimationLoop() {
        if (!animationFrameId) return;
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = 0;
      }
    
      function startAnimationLoop() {
        if (animationFrameId) return;
        lastFrameTime = 0;
        animationFrameId = window.requestAnimationFrame(animate);
      }
    
      function getGlobeProjection() {
        scene.updateMatrixWorld(true);
    
        globe.getWorldPosition(globeScreenCenter);
        globeScreenCenter.project(camera);
    
        globeScreenEdge.set(globe.geometry.parameters.radius, 0, 0);
        stage.localToWorld(globeScreenEdge);
        globeScreenEdge.project(camera);
    
        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = (globeScreenCenter.x * 0.5 + 0.5) * width;
        const centerY = (-globeScreenCenter.y * 0.5 + 0.5) * height;
        const edgeX = (globeScreenEdge.x * 0.5 + 0.5) * width;
        const projectedRadius = Math.abs(edgeX - centerX);
    
        return { centerX, centerY, projectedRadius };
      }
    
      function setProjectsFocus(active, {
        instant = false,
        motionDelay = 0,
        titleExit = active,
        revealTitleOnSettle = false,
        revealThreshold = 0.035,
        syncMenu = uiState.route && uiState.route.id === "home"
      } = {}) {
        const reducedMotion = prefersReducedMotion();
        projectsFocusActive = active;
        projectsFocusDelayRemaining = reducedMotion ? 0 : motionDelay;
        homeTitleRevealPending = revealTitleOnSettle;
        homeTitleRevealThreshold = revealThreshold;
        if (instant || reducedMotion) {
          projectsFocusProgress = active ? 1 : 0;
          projectsFocusDelayRemaining = 0;
          homeTitleRevealPending = false;
        }
        document.body.classList.toggle("home-projects-focus", titleExit);
        if (syncMenu) {
          updateActiveMenu(active ? "portfolio" : "home");
        }
        syncHomePortfolioUrl(active && titleExit);
        exploreAction.disabled = active;
        classicAction.disabled = false;
        exploreAction.style.pointerEvents = active ? "none" : "auto";
        classicAction.style.pointerEvents = active ? "auto" : "none";
        if (active) {
          exploreActionPresenceTarget = 0;
        }
        if (!active) {
          exploreActionLocked = false;
          exploreActionLockPending = false;
        }
      }
    
      function updateRotationHint() {
        if (!rotationHintEnabled) {
          rotationHint.style.opacity = "0";
          rotationHint.style.display = "none";
          return;
        }
    
        const { centerX, centerY, projectedRadius } = getGlobeProjection();
        const hintScale = clamp(projectedRadius / 190, 0.76, 1.14);
        const hintWidth = 180 * hintScale;
        const orbitWidth = 180 * hintScale;
        const orbitHeight = 34 * hintScale;
        const rx = 54 * hintScale;
        const ry = 10 * hintScale;
        const markerRadius = 2.6 * hintScale;
        const labelFontSize = 11 * hintScale;
        const orbitGap = 8 * hintScale;
        const hintX = centerX - hintWidth * 0.5;
        const hintY = centerY + projectedRadius + 16 * hintScale;
        const markerAngle = -(earthSpin + drag.currentX) * 1.12;
        const markerX = 90 * hintScale + Math.cos(markerAngle) * rx;
        const markerY = 15 * hintScale + Math.sin(markerAngle) * ry;
        const hintOpacity = 0.76;
    
        rotationHint.style.width = `${hintWidth}px`;
        rotationHint.style.gap = `${orbitGap}px`;
        rotationHint.style.opacity = isVisible ? String(hintOpacity) : "0";
        rotationHint.style.transform = `translate3d(${hintX}px, ${hintY}px, 0)`;
    
        rotationHintOrbit.setAttribute("viewBox", `0 0 ${180 * hintScale} ${34 * hintScale}`);
        rotationHintOrbit.setAttribute("width", `${orbitWidth}`);
        rotationHintOrbit.setAttribute("height", `${orbitHeight}`);
        rotationHintEllipse.setAttribute("cx", `${90 * hintScale}`);
        rotationHintEllipse.setAttribute("cy", `${15 * hintScale}`);
        rotationHintEllipse.setAttribute("rx", `${rx}`);
        rotationHintEllipse.setAttribute("ry", `${ry}`);
        rotationHintEllipse.setAttribute("stroke-width", `${1.1 * hintScale}`);
        rotationHintEllipse.setAttribute("stroke-dasharray", `${3.4 * hintScale} ${7.2 * hintScale}`);
        rotationHintMarker.setAttribute("cx", `${markerX}`);
        rotationHintMarker.setAttribute("cy", `${markerY}`);
        rotationHintMarker.setAttribute("r", `${markerRadius}`);
        rotationHintLabel.style.fontSize = `${labelFontSize}px`;
        rotationHintLabel.style.opacity = "1";
        rotationHintLabel.style.transform = "translate3d(0, 0, 0)";
      }
    
      function updateOrbitIndicator() {
        orbitIndicator.style.opacity = "0";
        orbitIndicator.style.visibility = "hidden";
        updateOrbitSatellitePosition();
      }
    
      function clearHoveredPin() {
        hoveredPin = null;
        lastHoveredPin = null;
        if (!selectedPin) {
          pinLabel.classList.remove("is-visible");
        }
        renderer.domElement.style.cursor = "auto";
      }
    
      function getProjectDetails(pin) {
        return portfolioProjectDetails[pin.id] || {
          title: `${pin.city} Project`,
          meta: "Case study details coming soon",
          year: "Selected work",
          status: "In progress",
          description: "This project panel is ready to be connected to the final portfolio data. We can now plug in full case study content, images and links.",
          mediaType: "placeholder",
          clientName: `${pin.city} Project`,
          highlights: [
            "Prepared for real project content",
            "Supports multiple detail fields",
            "Ready for future media integration"
          ],
          ctaHref: "#",
          ctaLabel: "See the full project"
        };
      }
    
      function isVideoFileSource(src) {
        return /\.(mp4|webm|ogg|mov)(?:$|[?#])/i.test(src);
      }
    
      function getVideoMimeType(src) {
        if (/\.webm(?:$|[?#])/i.test(src)) return "video/webm";
        if (/\.ogg(?:$|[?#])/i.test(src)) return "video/ogg";
        if (/\.mov(?:$|[?#])/i.test(src)) return "video/quicktime";
        return "video/mp4";
      }
    
      function createLoopingVideoElement({ src, title, poster, className, decorative = false }) {
        const video = document.createElement("video");
        if (className) {
          video.className = className;
        }
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.defaultMuted = true;
        video.playsInline = true;
        video.preload = "metadata";
        video.setAttribute("playsinline", "");
        if (poster) {
          video.poster = poster;
        }
        if (decorative) {
          video.setAttribute("aria-hidden", "true");
          video.tabIndex = -1;
        } else if (title) {
          video.setAttribute("aria-label", title);
        }
    
        const source = document.createElement("source");
        source.src = src;
        source.type = getVideoMimeType(src);
        video.appendChild(source);
        return video;
      }
    
      function renderProjectPanel(pin) {
        const details = getProjectDetails(pin);
        projectPanelSummary.textContent = details.description;
        projectPanelClientName.textContent = details.clientName || details.title;
        projectPanelClientCity.textContent = pin.city;
        projectPanelClientCountry.textContent = pin.country;
        projectPanelClientYear.textContent = details.year;
        projectPanelClientStatus.textContent = details.status;
        const hasMeaningfulCta = !isPlaceholderLink(details.ctaHref);
        projectPanelCta.href = hasMeaningfulCta ? details.ctaHref : "#";
        projectPanelCtaLabel.textContent = details.ctaLabel || "See the full project";
        setPlaceholderLinkState(projectPanelCta, !hasMeaningfulCta, "Full project case study coming soon");
        if (hasMeaningfulCta && !isInternalUrl(details.ctaHref)) {
          projectPanelCta.setAttribute("target", "_blank");
          projectPanelCta.setAttribute("rel", "noopener noreferrer");
        } else {
          projectPanelCta.removeAttribute("target");
          projectPanelCta.removeAttribute("rel");
        }
        const hasImageMedia = details.mediaType === "image" && Boolean(details.mediaSrc);
        const hasVideoMedia = details.mediaType === "video" && Boolean(details.mediaSrc);
        const hasLocalVideoMedia = hasVideoMedia && isVideoFileSource(details.mediaSrc);
        const hasEmbeddedVideoMedia = hasVideoMedia && !hasLocalVideoMedia;
        const hasImmersiveMedia = hasImageMedia || hasVideoMedia;
        projectPanel.classList.toggle("has-immersive-media", hasImmersiveMedia);
        projectPanel.classList.toggle("has-image-media", hasImageMedia);
        projectPanel.classList.toggle("has-video-media", hasVideoMedia);
        projectPanel.classList.toggle("has-local-video-media", hasLocalVideoMedia);
        projectPanel.classList.toggle("has-embedded-video-media", hasEmbeddedVideoMedia);
        projectPanel.style.removeProperty("--project-panel-media-image");
        projectPanelMediaGlitchA.replaceChildren();
        projectPanelMediaGlitchB.replaceChildren();
        projectPanelMediaFractureA.replaceChildren();
        projectPanelMediaFractureB.replaceChildren();
    
        if (hasImageMedia) {
          projectPanel.style.setProperty("--project-panel-media-image", `url("${details.mediaSrc}")`);
          projectPanelMediaScreen.replaceChildren();
        } else if (hasLocalVideoMedia) {
          const baseVideo = createLoopingVideoElement({
            src: details.mediaSrc,
            title: details.title,
            poster: details.mediaPoster,
            className: "project-panel-media-video"
          });
          const glitchVideoA = createLoopingVideoElement({
            src: details.mediaSrc,
            poster: details.mediaPoster,
            className: "project-panel-media-video project-panel-media-video-glitch",
            decorative: true
          });
          projectPanelMediaScreen.replaceChildren(baseVideo);
          projectPanelMediaGlitchA.replaceChildren(glitchVideoA);
        } else if (hasEmbeddedVideoMedia) {
          const iframe = document.createElement("iframe");
          iframe.src = details.mediaSrc;
          iframe.title = details.title;
          iframe.loading = "lazy";
          iframe.allow = "autoplay; fullscreen; picture-in-picture";
          iframe.allowFullscreen = true;
          projectPanelMediaScreen.replaceChildren(iframe);
        } else {
          const placeholder = document.createElement("div");
          placeholder.className = "project-panel-media-placeholder";
          const label = document.createElement("span");
          label.className = "project-panel-media-placeholder-label";
          label.textContent = "Media uplink pending";
          placeholder.appendChild(label);
          projectPanelMediaScreen.replaceChildren(placeholder);
        }
      }
    
      function updateProjectPanelScrollIndicator() {
        if (!projectPanelScroll || !projectPanelScrollThumb) return;
        const scrollHeight = projectPanelScroll.scrollHeight;
        const clientHeight = projectPanelScroll.clientHeight;
        const maxScroll = Math.max(scrollHeight - clientHeight, 0);
    
        if (maxScroll <= 0) {
          projectPanelScrollThumb.style.opacity = "0";
          projectPanelScrollThumb.style.transform = "translate3d(0, 0, 0)";
          return;
        }
    
        const trackHeight = Math.max(clientHeight - 40, 40);
        const thumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 44);
        const thumbTravel = Math.max(trackHeight - thumbHeight, 0);
        const progress = projectPanelScroll.scrollTop / maxScroll;
        projectPanelScrollThumb.style.opacity = "1";
        projectPanelScrollThumb.style.height = `${thumbHeight}px`;
        projectPanelScrollThumb.style.transform = `translate3d(0, ${progress * thumbTravel}px, 0)`;
      }
    
      function updateProjectPanelEdgeLinePosition() {
        if (!projectPanelAnchor || !projectPanelEdgeLine) return;
        const anchorRect = projectPanelAnchor.getBoundingClientRect();
        projectPanelEdgeLine.style.left = `${anchorRect.left + 1}px`;
        projectPanelEdgeLine.style.top = `${anchorRect.top}px`;
        projectPanelEdgeLine.style.height = `${anchorRect.height}px`;
      }
    
      function ensureProjectPanelEdgeLine() {
        if (projectPanelEdgeLine) return projectPanelEdgeLine;
        projectPanelEdgeLine = document.createElement("span");
        projectPanelEdgeLine.className = "project-panel-edge-line";
        projectPanelEdgeLine.setAttribute("aria-hidden", "true");
        projectPanelEdgeLine.hidden = true;
        document.body.appendChild(projectPanelEdgeLine);
        return projectPanelEdgeLine;
      }

      function closeSelectedPin({ restoreHover = true, instant = false } = {}) {
        if (projectPanelCloseTimer) {
          window.clearTimeout(projectPanelCloseTimer);
          projectPanelCloseTimer = 0;
        }
        selectedPin = null;
        drag.currentX = frozenGlobeRotationY - earthSpin;
        drag.targetX = drag.currentX;
        drag.currentY = frozenGlobeRotationX;
        drag.targetY = frozenGlobeRotationX;
        pinLabel.classList.remove("is-selected", "is-visible");
        if (instant) {
          projectPanel.classList.remove("is-open", "is-closing");
          setProjectPanelBackgroundInert(false);
          if (projectPanelEdgeLine) {
            projectPanelEdgeLine.classList.remove("is-open", "is-closing");
            projectPanelEdgeLine.hidden = true;
          }
          projectPanel.setAttribute("aria-hidden", "true");
          document.body.classList.remove("project-panel-open");
          if (projectPanelScroll) {
            projectPanelScroll.scrollTop = 0;
          }
          updateProjectPanelScrollIndicator();
          if (restoreHover && lastHoveredPin && lastHoveredPin.userData && lastHoveredPin.userData.pin) {
            hoveredPin = lastHoveredPin;
            updateHoveredPinLabel();
          }
          restoreProjectPanelFocus();
          return;
        }
        projectPanel.classList.remove("is-open");
        projectPanel.classList.add("is-closing");
        if (projectPanelEdgeLine) {
          projectPanelEdgeLine.classList.remove("is-open");
          projectPanelEdgeLine.classList.add("is-closing");
        }
        projectPanelCloseTimer = window.setTimeout(() => {
          projectPanel.classList.remove("is-closing");
          setProjectPanelBackgroundInert(false);
          if (projectPanelEdgeLine) {
            projectPanelEdgeLine.classList.remove("is-closing");
            projectPanelEdgeLine.hidden = true;
          }
          projectPanel.setAttribute("aria-hidden", "true");
          document.body.classList.remove("project-panel-open");
          if (projectPanelScroll) {
            projectPanelScroll.scrollTop = 0;
          }
          updateProjectPanelScrollIndicator();
          if (restoreHover && lastHoveredPin && lastHoveredPin.userData && lastHoveredPin.userData.pin) {
            hoveredPin = lastHoveredPin;
            updateHoveredPinLabel();
          }
          restoreProjectPanelFocus();
          projectPanelCloseTimer = 0;
        }, 560);
      }
    
      function openSelectedPin(pinSprite) {
        if (!pinSprite || !pinSprite.userData || !pinSprite.userData.pin) return;
        selectedPin = pinSprite;
        captureProjectPanelFocus();
        drag.active = false;
        drag.velocityX = 0;
        drag.velocityY = 0;
        frozenGlobeRotationY = globeGroup.rotation.y;
        frozenGlobeRotationX = globeGroup.rotation.x;
        frozenGlobeRotationZ = globeGroup.rotation.z;
        hoveredPin = pinSprite;
        lastHoveredPin = pinSprite;
        renderProjectPanel(pinSprite.userData.pin);
        pinLabel.classList.add("is-selected", "is-visible");
        if (projectPanelCloseTimer) {
          window.clearTimeout(projectPanelCloseTimer);
          projectPanelCloseTimer = 0;
        }
        ensureProjectPanelEdgeLine();
        projectPanel.setAttribute("aria-hidden", "false");
        projectPanel.classList.remove("is-closing");
        projectPanel.classList.remove("is-open");
        projectPanelEdgeLine.classList.remove("is-closing");
        projectPanelEdgeLine.hidden = false;
        document.body.classList.add("project-panel-open");
        setProjectPanelBackgroundInert(true);
        requestAnimationFrame(() => {
          updateProjectPanelEdgeLinePosition();
          projectPanel.classList.add("is-open");
          projectPanelEdgeLine.classList.add("is-open");
          updateProjectPanelScrollIndicator();
          focusFirstProjectPanelElement();
        });
        updateHoveredPinLabel();
      }
    
      function isPinFacingCamera(pinSprite) {
        pinSprite.getWorldPosition(hoveredPinWorldPosition);
        globe.getWorldPosition(globeWorldPosition);
        pinSurfaceVector.copy(hoveredPinWorldPosition).sub(globeWorldPosition).normalize();
        pinCameraVector.copy(camera.position).sub(hoveredPinWorldPosition).normalize();
        return pinSurfaceVector.dot(pinCameraVector) > 0;
      }
    
      function updatePinHover(clientX, clientY) {
        if (!isVisible || !isPortfolioActive() || !pinGroup.visible || drag.active) {
          clearHoveredPin();
          return;
        }
    
        const bounds = renderer.domElement.getBoundingClientRect();
        if (!bounds.width || !bounds.height) {
          clearHoveredPin();
          return;
        }
    
        pointerNdc.x = ((clientX - bounds.left) / bounds.width) * 2 - 1;
        pointerNdc.y = -(((clientY - bounds.top) / bounds.height) * 2 - 1);
        raycaster.setFromCamera(pointerNdc, camera);
        const intersections = raycaster.intersectObjects(pinGroup.children, false);
        const visibleIntersection = intersections.find((intersection) => isPinFacingCamera(intersection.object));
        const nextHoveredPin = visibleIntersection ? visibleIntersection.object : null;
        if (nextHoveredPin && nextHoveredPin !== lastHoveredPin && window.SiteAudio) {
          window.SiteAudio.prime();
          if (typeof window.SiteAudio.playHoverSound === "function") {
            window.SiteAudio.playHoverSound();
          }
        }
    
        hoveredPin = nextHoveredPin;
        lastHoveredPin = nextHoveredPin;
        renderer.domElement.style.cursor = hoveredPin ? "pointer" : "auto";
      }
    
      function updateHoveredPinLabel() {
        const activePin = selectedPin || hoveredPin;
        if (!activePin || !activePin.userData.pin || !isVisible || !isPortfolioActive() || !pinGroup.visible || activePin.material.opacity < 0.16) {
          pinLabel.classList.remove("is-visible");
          return;
        }
    
        if (!isPinFacingCamera(activePin)) {
          pinLabel.classList.remove("is-visible");
          return;
        }
    
        activePin.getWorldPosition(hoveredPinWorldPosition);
        hoveredPinWorldPosition.project(camera);
    
        if (hoveredPinWorldPosition.z > 1) {
          pinLabel.classList.remove("is-visible");
          return;
        }
    
        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = (hoveredPinWorldPosition.x * 0.5 + 0.5) * width;
        const centerY = (-hoveredPinWorldPosition.y * 0.5 + 0.5) * height;
        const panelRect = projectPanel.getBoundingClientRect();
        const anchorRect = projectPanelAnchor
          ? projectPanelAnchor.getBoundingClientRect()
          : panelRect;
        const selected = Boolean(selectedPin && activePin === selectedPin);
        const targetX = selected
          ? anchorRect.left + (anchorRect.width * 0.5)
          : centerX + 98;
        const targetY = selected
          ? anchorRect.top + (anchorRect.height * 0.5)
          : centerY - 78;
        const offsetX = targetX - centerX;
        const offsetY = targetY - centerY;
        const lineLength = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        const lineAngle = Math.atan2(offsetY, offsetX);
        const pin = activePin.userData.pin;
    
        pinLabel.style.left = `${centerX}px`;
        pinLabel.style.top = `${centerY}px`;
        pinLabel.style.setProperty("--pin-label-offset-x", `${offsetX}px`);
        pinLabel.style.setProperty("--pin-label-offset-y", `${offsetY}px`);
        pinLabel.style.setProperty("--pin-label-line-length", `${lineLength}px`);
        pinLabel.style.setProperty("--pin-label-line-angle", `${lineAngle}rad`);
        pinLabelCity.textContent = pin.city;
        pinLabelCountry.textContent = pin.country;
        pinLabel.classList.toggle("is-selected", selected);
        pinLabel.classList.add("is-visible");
      }
    
      function updatePins(focusEase) {
        const pinVisibility = Math.max(0, Math.min(1, (focusEase - 0.84) / 0.18));
        const { centerX, centerY, projectedRadius } = getGlobeProjection();
        pinGroup.visible = isVisible && pinVisibility > 0.01;
    
        pinGroup.children.forEach((pinSprite) => {
          pinSprite.getWorldPosition(pinScreenPosition);
          pinScreenPosition.project(camera);
    
          const pinX = (pinScreenPosition.x * 0.5 + 0.5) * window.innerWidth;
          const pinY = (-pinScreenPosition.y * 0.5 + 0.5) * window.innerHeight;
          const distanceFromCenter = Math.hypot(pinX - centerX, pinY - centerY);
          const fadeStart = projectedRadius * 0.75;
          const fadeEnd = projectedRadius * 1.02;
          const edgeFade = distanceFromCenter <= fadeStart
            ? 1
            : Math.max(0, Math.min(1, 1 - ((distanceFromCenter - fadeStart) / Math.max(fadeEnd - fadeStart, 0.0001))));
          const opacity = 0.94 * pinVisibility * edgeFade;
          pinSprite.material.opacity = opacity;
          const pinScale = lerp(0.14, 0.24, pinVisibility) * lerp(0.92, 1, edgeFade);
          pinSprite.scale.setScalar(pinScale);
        });
    
        if (!pinGroup.visible) {
          clearHoveredPin();
        }
      }
    
      function updateExploreAction(focusEase) {
        const { centerX, centerY, projectedRadius } = getGlobeProjection();
        const narrowViewport = window.innerWidth <= 700;
        const actionY = centerY + projectedRadius + (narrowViewport ? 18 : 40);
        const actionPresence = easeInOut(exploreActionPresence);
        const exploreOpacity = isVisible
          ? Math.max(0, 0.92 - focusEase * 1.25) * actionPresence * exploreActionMenuReveal
          : 0;
        const classicOpacity = isVisible
          ? Math.max(0, Math.min(focusEase * 1.35, 0.94)) * exploreActionMenuReveal
          : 0;
        const actionOffsetX = (actionPresence - 1) * 28 + (exploreActionMenuReveal - 1) * 18;
        const classicOffsetX = (1 - focusEase) * 22 + (exploreActionMenuReveal - 1) * 18;
        const classicOffsetY = (1 - focusEase) * 14;
        if (exploreActionLockPending) {
          exploreActionLockedX = centerX;
          exploreActionLockedY = actionY;
          exploreActionLocked = true;
          exploreActionLockPending = false;
        }

        const actionX = exploreActionLocked ? exploreActionLockedX : centerX;
        const actionTop = exploreActionLocked ? exploreActionLockedY : actionY;
        const actionYOffset = exploreActionLocked ? 0 : focusEase * 10;
        const actionSafeInset = narrowViewport ? 20 : 32;
        const clampedExploreTop = narrowViewport
          ? Math.min(actionTop, window.innerHeight - 108)
          : actionTop;
        const primaryBounds = exploreAction.getBoundingClientRect();
        const secondaryBounds = classicAction.getBoundingClientRect();
        const primaryWidth = primaryBounds.width || 154;
        const secondaryWidth = secondaryBounds.width || 142;
        const classicTargetX = centerX + projectedRadius * (narrowViewport ? 0.42 : 0.72);
        const classicTargetYBase = centerY + projectedRadius * (narrowViewport ? 0.54 : 0.76);
        const clampedClassicTop = Math.min(classicTargetYBase, window.innerHeight - (narrowViewport ? 86 : 112));

        function placeAction(actionNode, targetX, targetY, width, translateX, translateY, opacity, isActive) {
          const actionHalfWidth = width * 0.5;
          const maxActionX = Math.max(
            actionSafeInset + actionHalfWidth,
            window.innerWidth - actionSafeInset - actionHalfWidth
          );
          const clampedActionX = clamp(
            targetX,
            actionSafeInset + actionHalfWidth,
            maxActionX
          );

          actionNode.style.left = `${clampedActionX}px`;
          actionNode.style.top = `${targetY}px`;
          actionNode.style.opacity = String(opacity);
          actionNode.style.pointerEvents = isVisible && isActive && exploreActionMenuReveal > 0.96 ? "auto" : "none";
          actionNode.style.visibility = opacity > 0.01 ? "visible" : "hidden";
          actionNode.style.transform = `translateX(-50%) translate3d(${translateX}px, ${translateY}px, 0)`;
        }

        placeAction(
          exploreAction,
          actionX,
          clampedExploreTop,
          primaryWidth,
          actionOffsetX,
          actionYOffset,
          exploreOpacity,
          !projectsFocusActive && actionPresence > 0.96
        );
        placeAction(
          classicAction,
          classicTargetX,
          clampedClassicTop,
          secondaryWidth,
          classicOffsetX,
          classicOffsetY,
          classicOpacity,
          projectsFocusActive && focusEase > 0.56
        );
      }
    
      function animate(time) {
        animationFrameId = window.requestAnimationFrame(animate);
        const deltaSeconds = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 0.05) : 1 / 60;
        lastFrameTime = time;
        if (!isVisible || document.hidden) return;
        const reducedMotion = prefersReducedMotion();
        const focusTarget = projectsFocusActive ? 1 : 0;
        const menuActionTarget = document.body.classList.contains("menu-open")
          ? (document.body.classList.contains("menu-home-reveal") ? 1 : 0)
          : 1;
        if (reducedMotion) {
          exploreActionMenuReveal = menuActionTarget;
        } else {
          exploreActionMenuReveal += (menuActionTarget - exploreActionMenuReveal) * Math.min(deltaSeconds * 8.5, 1);
        }
        if (projectsFocusDelayRemaining > 0 && !reducedMotion) {
          projectsFocusDelayRemaining = Math.max(0, projectsFocusDelayRemaining - deltaSeconds);
        } else if (reducedMotion) {
          projectsFocusProgress = focusTarget;
        } else {
          projectsFocusProgress += (focusTarget - projectsFocusProgress) * Math.min(deltaSeconds * 0.62, 1);
        }
        if (reducedMotion) {
          exploreActionPresence = exploreActionPresenceTarget;
        } else {
          exploreActionPresence += (exploreActionPresenceTarget - exploreActionPresence) * Math.min(deltaSeconds * 4.6, 1);
        }
        const focusEase = easeInOut(projectsFocusProgress);
    
        drawStars(reducedMotion ? 0 : time);
    
        const sunPulse = reducedMotion
          ? 1
          : 0.96 + Math.sin(time * 0.0012) * 0.035 + Math.sin(time * 0.0023) * 0.015;
        const sunScaleBlend = lerp(1, focusSunScale, focusEase);
        sunGlow.material.opacity = 0.76 * sunPulse;
        sunGlow.scale.setScalar(10.8 * sunScaleBlend * (reducedMotion ? 1 : 0.992 + Math.sin(time * 0.0013) * 0.016));
        sunCore.material.opacity = 0.62 * sunPulse;
        sunCore.scale.setScalar(3.8 * sunScaleBlend * (reducedMotion ? 1 : 0.996 + Math.sin(time * 0.0016) * 0.01));
        sunOverlayGlow.material.opacity = 0.22 * sunPulse;
        sunOverlayGlow.scale.setScalar(9.4 * sunScaleBlend * (reducedMotion ? 1 : 0.994 + Math.sin(time * 0.001) * 0.01));
        sunOverlayCore.material.opacity = 0.1 * sunPulse;
        sunOverlayCore.scale.setScalar(3.8 * sunScaleBlend * (reducedMotion ? 1 : 0.996 + Math.sin(time * 0.0016) * 0.01));
        lightWrapMaterial.uniforms.uIntensity.value = 0.86 * sunPulse;
        crescentMaterial.uniforms.uIntensity.value = 1.16 * sunPulse;
        if (!drag.active && !selectedPin && !reducedMotion) {
          earthSpin = (earthSpin + deltaSeconds * EARTH_AUTO_SPIN_SPEED) % (Math.PI * 2);
        }
        if (!reducedMotion) {
          orbitMarkerPhase = (orbitMarkerPhase + deltaSeconds * ORBIT_MARKER_SPEED) % (Math.PI * 2);
        }
    
        if (!drag.active && !selectedPin) {
          drag.velocityX *= 0.965;
          drag.velocityY *= 0.92;
          drag.targetX += drag.velocityX;
          drag.targetY += drag.velocityY;
          drag.targetY += (DEFAULT_VERTICAL_TILT - drag.targetY) * Math.min(deltaSeconds * VERTICAL_RETURN_RATE, 1);
          drag.targetY = clamp(drag.targetY, -0.58, MAX_VERTICAL_TILT);
        }
    
        if (!selectedPin) {
          drag.currentX += (drag.targetX - drag.currentX) * 0.055;
          drag.currentY += (drag.targetY - drag.currentY) * 0.05;
        }
        globeRig.position.set(
          lerp(baseGlobeRigPosition.x, focusGlobeRigPosition.x, focusEase),
          lerp(baseGlobeRigPosition.y, focusGlobeRigPosition.y, focusEase),
          lerp(baseGlobeRigPosition.z, focusGlobeRigPosition.z, focusEase)
        );
        sunRig.position.set(
          lerp(baseSunRigPosition.x, focusSunRigPosition.x, focusEase),
          lerp(baseSunRigPosition.y, focusSunRigPosition.y, focusEase),
          lerp(baseSunRigPosition.z, focusSunRigPosition.z, focusEase)
        );
        camera.position.set(
          lerp(baseCameraPosition.x, focusCameraPosition.x, focusEase),
          lerp(baseCameraPosition.y, focusCameraPosition.y, focusEase),
          lerp(baseCameraPosition.z, focusCameraPosition.z, focusEase)
        );
        stage.position.y = reducedMotion
          ? -0.78
          : -0.78 + Math.sin(time * 0.00016) * 0.015;
        globeGroup.rotation.y = selectedPin ? frozenGlobeRotationY : earthSpin + drag.currentX;
        globeGroup.rotation.x = selectedPin ? frozenGlobeRotationX : drag.currentY;
        globeGroup.rotation.z = selectedPin
          ? frozenGlobeRotationZ
          : (reducedMotion ? 0 : Math.sin(time * 0.00011) * 0.006);
        if (selectedPin && projectPanel.classList.contains("is-open")) {
          updateProjectPanelEdgeLinePosition();
        }
        if (!reducedMotion) {
          cloudDrift = (cloudDrift + deltaSeconds * EARTH_AUTO_SPIN_SPEED * CLOUD_RELATIVE_SPIN_SPEED) % (Math.PI * 2);
        }
        cloudSphere.rotation.set(0, cloudDrift, 0);
        if (homeTitleRevealPending && !projectsFocusActive && projectsFocusDelayRemaining <= 0 && projectsFocusProgress <= homeTitleRevealThreshold) {
          homeTitleRevealPending = false;
          document.body.classList.remove("home-returning-from-focus");
          revealHomeTitleIntro();
          revealExploreActionIntro();
          exploreActionPresenceTarget = 1;
          exploreActionLockPending = true;
        }
        updateRotationHint();
        updateOrbitIndicator();
        updatePins(focusEase);
        updateHoveredPinLabel();
        updateExploreAction(focusEase);
        renderer.render(scene, camera);
      }
    
      function onPointerDown(event) {
        if (!isVisible) return;
        drag.active = true;
        drag.pointerX = event.clientX;
        drag.pointerY = event.clientY;
        pointerDownClientX = event.clientX;
        pointerDownClientY = event.clientY;
        pointerDownTravel = 0;
        bindDragTracking();
      }
    
      function onPointerMove(event) {
        updatePinHover(event.clientX, event.clientY);
        if (!isVisible || !drag.active) return;
        const deltaX = event.clientX - drag.pointerX;
        const deltaY = event.clientY - drag.pointerY;
        pointerDownTravel += Math.abs(deltaX) + Math.abs(deltaY);
        drag.pointerX = event.clientX;
        drag.pointerY = event.clientY;
        drag.velocityX = deltaX * 0.00135;
        drag.velocityY = deltaY * 0.001;
        drag.targetX += drag.velocityX;
        drag.targetY += drag.velocityY;
        drag.targetY = clamp(drag.targetY, -0.58, MAX_VERTICAL_TILT);
      }
    
      function onPointerUp() {
        drag.active = false;
        unbindDragTracking();
      }
    
      function onCanvasPointerMove(event) {
        updatePinHover(event.clientX, event.clientY);
      }
    
      function onCanvasPointerLeave() {
        if (!selectedPin) {
          clearHoveredPin();
        }
      }
    
      function getPinFromPointer(clientX, clientY) {
        const bounds = renderer.domElement.getBoundingClientRect();
        if (!bounds.width || !bounds.height) {
          return null;
        }
    
        pointerNdc.x = ((clientX - bounds.left) / bounds.width) * 2 - 1;
        pointerNdc.y = -(((clientY - bounds.top) / bounds.height) * 2 - 1);
        raycaster.setFromCamera(pointerNdc, camera);
        const intersections = raycaster.intersectObjects(pinGroup.children, false);
        const visibleIntersection = intersections.find((intersection) => (
          intersection.object.material.opacity >= 0.16 && isPinFacingCamera(intersection.object)
        ));
        return visibleIntersection ? visibleIntersection.object : null;
      }
    
      function onCanvasClick(event) {
        if (!isVisible || !isPortfolioActive() || pointerDownTravel > 14) {
          return;
        }
    
        const pinSprite = getPinFromPointer(event.clientX, event.clientY);
        if (!pinSprite) {
          if (selectedPin) {
            closeSelectedPin({ restoreHover: false });
          }
          return;
        }
    
        if (selectedPin === pinSprite) {
          closeSelectedPin();
          return;
        }
    
        openSelectedPin(pinSprite);
      }
    
      exploreAction.addEventListener("click", () => {
        if (projectsFocusActive) return;
        setProjectsFocus(true, {
          motionDelay: 0.58,
          titleExit: true
        });
      });
      classicAction.addEventListener("click", () => {
        if (projectsFocusActive) return;
        navigateToRoute(normalizePath("/portfolio-classic.html"));
      });
      projectPanelClose.addEventListener("click", () => {
        closeSelectedPin();
      });
      projectPanelScroll.addEventListener("scroll", updateProjectPanelScrollIndicator, { passive: true });
      projectPanelCta.addEventListener("click", (event) => {
        if (projectPanelCta.dataset.placeholderLink === "true" || !projectPanelCta.getAttribute("href") || projectPanelCta.getAttribute("href") === "#") {
          event.preventDefault();
          return;
        }
    
        const href = projectPanelCta.getAttribute("href");
        if (!href || !isInternalUrl(href)) {
          return;
        }
    
        event.preventDefault();
        const route = normalizePath(new URL(href, window.location.href).pathname);
        navigateToRoute(route);
      });
    
      renderer.domElement.addEventListener("pointerdown", onPointerDown);
      renderer.domElement.addEventListener("pointermove", onCanvasPointerMove);
      renderer.domElement.addEventListener("pointerleave", onCanvasPointerLeave);
      renderer.domElement.addEventListener("click", onCanvasClick);
      window.addEventListener("resize", resizeHome);
      window.addEventListener("resize", updateProjectPanelEdgeLinePosition);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          drag.active = false;
          unbindDragTracking();
          stopAnimationLoop();
          return;
        }
    
        if (isVisible) {
          startAnimationLoop();
          drawStars(performance.now());
          updateRotationHint();
          updateOrbitIndicator();
          updatePins(easeInOut(projectsFocusProgress));
          updateHoveredPinLabel();
          updateExploreAction(easeInOut(projectsFocusProgress));
        }
      });
    
      const ready = Promise.all([
        loadTexture("./assets/optimized/earth-day-gray-4k.jpg", (texture) => {
          configureTexture(texture);
          texture.encoding = THREE.sRGBEncoding;
          globeUniforms.uDayMap.value = texture;
          globeMaterial.needsUpdate = true;
        }),
        loadTexture("./assets/optimized/earth-height-4k.jpg", (texture) => {
          configureTexture(texture);
          texture.encoding = THREE.sRGBEncoding;
          globeUniforms.uHeightMap.value = texture;
          if (texture.image && texture.image.width && texture.image.height) {
            globeUniforms.uHeightTexel.value.set(1 / texture.image.width, 1 / texture.image.height);
          }
          globeMaterial.needsUpdate = true;
        }),
        loadTexture("./assets/optimized/earth-night-gray-4k.jpg", (texture) => {
          configureTexture(texture);
          texture.encoding = THREE.sRGBEncoding;
          globeUniforms.uNightMap.value = texture;
          nightLightsMaterial.map = texture;
          nightLightsMaterial.alphaMap = texture;
          nightLightsMaterial.needsUpdate = true;
          globeMaterial.needsUpdate = true;
        }),
        loadTexture("./assets/optimized/earth-clouds-gray-4k.jpg", (texture) => {
          configureTexture(texture);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.encoding = THREE.sRGBEncoding;
          cloudMaterial.uniforms.uCloudMap.value = texture;
          if (texture.image && texture.image.width && texture.image.height) {
            cloudMaterial.uniforms.uCloudDetailTexel.value.set(1 / texture.image.width, -1 / texture.image.height);
          }
          cloudMaterial.needsUpdate = true;
        }),
        loadTexture("./assets/optimized/earth-clouds-alpha-2k.png", (texture) => {
          configureTexture(texture);
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.ClampToEdgeWrapping;
          texture.encoding = THREE.sRGBEncoding;
          cloudMaterial.uniforms.uCloudAlphaMap.value = texture;
          if (texture.image && texture.image.width && texture.image.height) {
            cloudMaterial.uniforms.uCloudAlphaTexel.value.set(1 / texture.image.width, 1 / texture.image.height);
          }
          cloudMaterial.needsUpdate = true;
        })
      ]).then(() => {
        resizeHome();
      });
    
      startAnimationLoop();
    
        return {
          ready,
          focusProjects(options = {}) {
            const {
              instant = false,
              motionDelay = 0.58,
              titleExit = true
            } = options;
    
            if (!isVisible || (projectsFocusActive && !instant)) {
              return false;
            }
    
            setProjectsFocus(true, {
              instant,
              motionDelay,
              titleExit
            });
            return true;
          },
          returnToHome() {
            if (!isVisible || (!projectsFocusActive && projectsFocusProgress <= 0.02 && !document.body.classList.contains("home-projects-focus"))) {
              return false;
            }
    
            prepareHomeTitleIntro({ delayed: true });
            prepareExploreActionIntro();
            document.body.classList.add("home-returning-from-focus");
            exploreActionPresence = 0;
            exploreActionPresenceTarget = 0;
            exploreActionLocked = false;
            exploreActionLockPending = false;
            setProjectsFocus(false, {
              motionDelay: 0,
              titleExit: false,
              revealTitleOnSettle: true,
              revealThreshold: 0.14
            });
            closeSelectedPin({ restoreHover: false, instant: true });
            return true;
          },
          closeProjectPanel() {
            if (!selectedPin) {
              return false;
            }
    
            closeSelectedPin({ restoreHover: false });
            return true;
          },
          show(active, { animateFromFocus = false, keepStars = false } = {}) {
            isVisible = active || keepStars;
            if (active) {
              if (animateFromFocus) {
                document.body.classList.remove("home-returning-from-focus");
                projectsFocusProgress = 1;
                projectsFocusDelayRemaining = 0;
                projectsFocusActive = false;
                globeActions.forEach((actionNode) => {
                  actionNode.disabled = false;
                });
                exploreActionPresence = 0;
                exploreActionPresenceTarget = 0;
                exploreActionLocked = false;
                exploreActionLockPending = false;
                globeRig.position.copy(focusGlobeRigPosition);
                sunRig.position.copy(focusSunRigPosition);
                camera.position.copy(focusCameraPosition);
                document.body.classList.remove("home-projects-focus");
                closeSelectedPin({ restoreHover: false, instant: true });
                homeTitleRevealPending = true;
                homeTitleRevealThreshold = 0.14;
                prepareExploreActionIntro();
              } else {
                document.body.classList.remove("home-returning-from-focus");
                setProjectsFocus(false, { instant: true, titleExit: false });
                closeSelectedPin({ restoreHover: false, instant: true });
                globeRig.position.copy(baseGlobeRigPosition);
                sunRig.position.copy(baseSunRigPosition);
                camera.position.copy(baseCameraPosition);
                homeTitleRevealPending = false;
                prepareExploreActionIntro();
                exploreActionPresence = 0;
                exploreActionPresenceTarget = 1;
                exploreActionLocked = false;
                exploreActionLockPending = false;
                requestAnimationFrame(() => {
                  revealExploreActionIntro();
                  updateExploreAction(easeInOut(projectsFocusProgress));
                });
              }
            } else {
              document.body.classList.remove("home-returning-from-focus");
              setProjectsFocus(false, { instant: true, titleExit: false });
              closeSelectedPin({ restoreHover: false, instant: true });
              homeTitleRevealPending = false;
              exploreActionPresence = 0;
              exploreActionPresenceTarget = 0;
              exploreActionLocked = false;
              exploreActionLockPending = false;
            }
            const starsVisible = active || keepStars;
            starsCanvas.style.opacity = starsVisible ? "1" : "0";
            globeRoot.style.opacity = active ? "1" : "0";
            starsCanvas.style.visibility = starsVisible ? "visible" : "hidden";
            globeRoot.style.visibility = active ? "visible" : "hidden";
            renderer.domElement.style.pointerEvents = active ? "auto" : "none";
            rotationHint.style.opacity = "0";
            rotationHint.style.display = rotationHintEnabled && active ? "grid" : "none";
            orbitIndicator.style.opacity = "0";
            orbitIndicator.style.visibility = "hidden";
            orbitGuideGroup.visible = active;
            pinGroup.visible = active && projectsFocusProgress > 0.16;
            globeActions.forEach((actionNode) => {
              actionNode.style.opacity = active ? "1" : "0";
              actionNode.style.visibility = active ? "visible" : "hidden";
              actionNode.style.pointerEvents = active ? "auto" : "none";
            });
    
            if (!active && !keepStars) {
              drag.active = false;
              unbindDragTracking();
              clearHoveredPin();
              stopAnimationLoop();
              starsContext.clearRect(0, 0, window.innerWidth, window.innerHeight);
            } else {
              startAnimationLoop();
              drawStars(performance.now());
              updateRotationHint();
              updateOrbitIndicator();
              updatePins(easeInOut(projectsFocusProgress));
              updateHoveredPinLabel();
              updateExploreAction(easeInOut(projectsFocusProgress));
            }
          }
        };
      } catch (error) {
        console.error("Home visuals failed to initialize.", error);
        return createHomeVisualFallback();
      }
    })();
    
  }

  window.SiteHomeVisuals = {
    create: createSiteHomeVisuals
  };
})();
