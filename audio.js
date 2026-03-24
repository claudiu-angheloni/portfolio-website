(function () {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const AMBIENT_SRC = "assets/space-01.mp3";
  const AMBIENT_VOLUME = 0.12;
  const AMBIENT_SESSION_ENABLED_KEY = "ca-ambient-enabled";

  let context = null;
  let fxBus = null;
  let fxMaster = null;
  let noiseBuffer = null;
  let hoverCooldownUntil = 0;
  let primed = false;
  let resumePromise = null;

  let ambientEnabled = false;
  let ambientAllowed = false;
  let ambientStarted = false;
  let activeAmbient = null;
  let ambientSourceNode = null;
  let ambientAnalyser = null;
  let ambientFrequencyData = null;
  let ambientTimeData = null;
  let ambientAnalysisElement = null;

  function ensureFxContext() {
    if (context) return;
    if (!AudioContextClass) return;

    context = new AudioContextClass();
    fxMaster = context.createGain();
    fxBus = context.createGain();

    fxMaster.gain.value = 0.54;
    fxBus.gain.value = 0.62;

    fxBus.connect(fxMaster);
    fxMaster.connect(context.destination);

    noiseBuffer = createNoiseBuffer();
  }

  function now() {
    return context ? context.currentTime : 0;
  }

  function createNoiseBuffer() {
    const length = context.sampleRate * 2;
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const data = buffer.getChannelData(0);

    for (let index = 0; index < length; index += 1) {
      data[index] = (Math.random() * 2 - 1) * 0.18;
    }

    return buffer;
  }

  function createAmbientElement() {
    const audio = new Audio(AMBIENT_SRC);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = AMBIENT_VOLUME;
    audio.playsInline = true;
    return audio;
  }

  function readSessionValue(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function writeSessionValue(key, value) {
    try {
      if (value === null || typeof value === "undefined") {
        window.sessionStorage.removeItem(key);
        return;
      }

      window.sessionStorage.setItem(key, String(value));
    } catch {}
  }

  function shouldRestoreAmbientFromSession() {
    return readSessionValue(AMBIENT_SESSION_ENABLED_KEY) === "true";
  }

  function persistAmbientEnabled(enabled) {
    writeSessionValue(AMBIENT_SESSION_ENABLED_KEY, enabled ? "true" : "false");
  }

  function disconnectAmbientAnalysis() {
    if (ambientSourceNode) {
      try {
        ambientSourceNode.disconnect();
      } catch {}
    }

    if (ambientAnalyser) {
      try {
        ambientAnalyser.disconnect();
      } catch {}
    }

    ambientSourceNode = null;
    ambientAnalyser = null;
    ambientFrequencyData = null;
    ambientTimeData = null;
    ambientAnalysisElement = null;
  }

  function ensureAmbientAnalysis() {
    ensureFxContext();
    if (!context || !activeAmbient || ambientAnalysisElement === activeAmbient) return;

    disconnectAmbientAnalysis();

    try {
      ambientSourceNode = context.createMediaElementSource(activeAmbient);
      ambientAnalyser = context.createAnalyser();
      ambientAnalyser.fftSize = 128;
      ambientAnalyser.smoothingTimeConstant = 0.82;
      ambientFrequencyData = new Uint8Array(ambientAnalyser.frequencyBinCount);
      ambientTimeData = new Uint8Array(ambientAnalyser.fftSize);
      ambientSourceNode.connect(ambientAnalyser);
      ambientAnalyser.connect(context.destination);
      ambientAnalysisElement = activeAmbient;
    } catch {
      disconnectAmbientAnalysis();
    }
  }

  function disposeAmbientElement() {
    if (!activeAmbient) return;
    activeAmbient.pause();
    if (ambientAnalysisElement === activeAmbient) {
      disconnectAmbientAnalysis();
    }
    activeAmbient.removeAttribute("src");
    activeAmbient.load();
    activeAmbient = null;
  }

  function startAmbientTrack() {
    if (ambientStarted) return;
    ambientStarted = true;
    ambientEnabled = true;
    disposeAmbientElement();

    activeAmbient = createAmbientElement();
    ensureAmbientAnalysis();

    activeAmbient.addEventListener("loadedmetadata", () => {
      activeAmbient.play().then(() => {}).catch(() => {
        ambientStarted = false;
      });
    }, { once: true });

    activeAmbient.addEventListener("canplaythrough", () => {
      if (!activeAmbient.paused) return;
      activeAmbient.play().then(() => {}).catch(() => {
        ambientStarted = false;
      });
    }, { once: true });

    activeAmbient.play().then(() => {
      persistAmbientEnabled(true);
      if (context && context.state === "suspended") {
        context.resume().catch(() => {});
      }
    }).catch(() => {
      // Browser blocked autoplay until a user gesture; we'll retry on startAmbient().
      ambientStarted = false;
    });
  }

  function prime() {
    ensureFxContext();
    ensureAmbientAnalysis();

    if (primed && (!context || context.state === "running")) {
      return;
    }

    primed = true;

    if (!context || context.state === "running") {
      return;
    }

    if (!resumePromise) {
      resumePromise = context.resume().catch(() => {}).finally(() => {
        resumePromise = null;
      });
    }
  }

  function getAmbientSpectrum(barCount = 5) {
    if (!activeAmbient || activeAmbient.paused || !ambientStarted || !ambientAnalyser || !ambientFrequencyData || !ambientTimeData) {
      return Array.from({ length: barCount }, () => 0);
    }

    ambientAnalyser.getByteFrequencyData(ambientFrequencyData);
    ambientAnalyser.getByteTimeDomainData(ambientTimeData);
    let rmsTotal = 0;
    let lowTotal = 0;
    const lowBandSize = Math.max(4, Math.floor(ambientFrequencyData.length * 0.18));

    for (let sampleIndex = 0; sampleIndex < ambientTimeData.length; sampleIndex += 1) {
      const centered = (ambientTimeData[sampleIndex] - 128) / 128;
      rmsTotal += centered * centered;
    }

    for (let binIndex = 0; binIndex < lowBandSize; binIndex += 1) {
      lowTotal += ambientFrequencyData[binIndex];
    }

    const rms = Math.sqrt(rmsTotal / Math.max(ambientTimeData.length, 1));
    const lowAverage = lowTotal / Math.max(lowBandSize, 1);

    return Array.from({ length: barCount }, (_, index) => {
      const progress = barCount === 1 ? 0.5 : index / (barCount - 1);
      const centerBin = Math.round((progress * 0.82 + 0.05) * (ambientFrequencyData.length - 1));
      const radius = Math.max(2, Math.floor(ambientFrequencyData.length * 0.08));
      const start = Math.max(0, centerBin - radius);
      const end = Math.min(ambientFrequencyData.length, centerBin + radius + 1);
      let total = 0;

      for (let sampleBin = start; sampleBin < end; sampleBin += 1) {
        total += ambientFrequencyData[sampleBin];
      }

      const average = total / Math.max(end - start, 1);
      const spectral = average / 92;
      const lowInfluence = lowAverage / 128;
      const amplitude = rms * 4.2;
      const combined = spectral * 0.56 + lowInfluence * 0.18 + amplitude * (0.72 + progress * 0.18);
      return Math.max(0, Math.min(1, Math.pow(combined, 0.72)));
    });
  }

  function stopAmbientTrack() {
    persistAmbientEnabled(false);
    ambientEnabled = false;
    ambientStarted = false;

    if (!activeAmbient) return;
    activeAmbient.pause();
    activeAmbient.currentTime = 0;
  }

  function resumeAmbientTrack() {
    if (!activeAmbient) {
      startAmbientTrack();
      return;
    }

    ambientEnabled = true;
    ambientStarted = true;
    ensureAmbientAnalysis();

    activeAmbient.play().then(() => {
      persistAmbientEnabled(true);
      if (context && context.state === "suspended") {
        context.resume().catch(() => {});
      }
    }).catch(() => {
      ambientStarted = false;
    });
  }

  function isAmbientPlaying() {
    return Boolean(activeAmbient && ambientStarted && !activeAmbient.paused);
  }

  function restoreAmbientFromSession() {
    if (!shouldRestoreAmbientFromSession()) {
      return false;
    }

    ambientAllowed = true;
    ambientEnabled = true;
    resumeAmbientTrack();
    return true;
  }

  function toggleAmbient() {
    ambientAllowed = true;

    if (isAmbientPlaying()) {
      stopAmbientTrack();
      return false;
    }

    resumeAmbientTrack();
    return true;
  }

  function playTone(options) {
    ensureFxContext();
    if (!context || !fxBus) return;

    const {
      frequency = 440,
      type = "sine",
      duration = 0.12,
      volume = 0.02,
      attack = 0.004,
      release = 0.08,
      detune = 0
    } = options;

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const startAt = now();
    const stopAt = startAt + duration;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    oscillator.detune.setValueAtTime(detune, startAt);

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0002), startAt + attack);
    gain.gain.exponentialRampToValueAtTime(0.0001, stopAt + release);

    oscillator.connect(gain);
    gain.connect(fxBus);
    oscillator.start(startAt);
    oscillator.stop(stopAt + release + 0.02);
  }

  function playNoiseBurst(options) {
    ensureFxContext();
    if (!context || !noiseBuffer || !fxBus) return;

    const {
      duration = 0.08,
      volume = 0.012
    } = options;

    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    const startAt = now();
    const stopAt = startAt + duration;

    source.buffer = noiseBuffer;
    source.loop = true;

    filter.type = "bandpass";
    filter.frequency.setValueAtTime(2200, startAt);
    filter.Q.setValueAtTime(1.2, startAt);

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0002), startAt + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, stopAt);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(fxBus);

    source.start(startAt);
    source.stop(stopAt + 0.02);
  }

  function playHoverSound() {
    const currentMillis = performance.now();
    if (currentMillis < hoverCooldownUntil) return;
    hoverCooldownUntil = currentMillis + 60;

    playTone({
      frequency: 7040,
      type: "square",
      duration: 0.008,
      volume: 0.05,
      attack: 0.0005,
      release: 0.008
    });

    playTone({
      frequency: 9880,
      type: "sine",
      duration: 0.006,
      volume: 0.034,
      attack: 0.0005,
      release: 0.007,
      detune: 22
    });

    playTone({
      frequency: 12160,
      type: "sine",
      duration: 0.004,
      volume: 0.022,
      attack: 0.0005,
      release: 0.006,
      detune: 14
    });

    playNoiseBurst({
      duration: 0.006,
      volume: 0.008
    });
  }

  function playClickSound() {
    playTone({
      frequency: 4680,
      type: "triangle",
      duration: 0.012,
      volume: 0.04,
      attack: 0.0007,
      release: 0.01
    });

    playTone({
      frequency: 9280,
      type: "square",
      duration: 0.009,
      volume: 0.03,
      attack: 0.0005,
      release: 0.009
    });

    playTone({
      frequency: 13240,
      type: "sine",
      duration: 0.006,
      volume: 0.024,
      attack: 0.0005,
      release: 0.006,
      detune: 24
    });

    playNoiseBurst({
      duration: 0.006,
      volume: 0.01
    });
  }

  function bindInteractiveSounds(selectors) {
    selectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        if (element.dataset.audioBound === "true") return;
        element.dataset.audioBound = "true";

        element.addEventListener("pointerenter", () => {
          prime();
          playHoverSound();
        });

        element.addEventListener("click", () => {
          prime();
          playClickSound();
        });
      });
    });
  }

  function bindPrimeEvents() {
    const unlock = () => {
      ambientAllowed = true;
      prime();
      if (ambientEnabled && !ambientStarted) {
        startAmbientTrack();
      }
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
  }

  function attemptResumeAmbientOnLoad() {
    if (!ambientEnabled || !ambientAllowed) return;
    resumeAmbientTrack();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) return;

    if (ambientEnabled && !ambientStarted) {
      attemptResumeAmbientOnLoad();
    }
  });

  window.addEventListener("beforeunload", () => {
    disposeAmbientElement();
  });

  window.addEventListener("load", () => {
    if (!ambientStarted) {
      restoreAmbientFromSession();
    }
  });

  window.addEventListener("pageshow", () => {
    if (ambientStarted) return;

    window.setTimeout(() => {
      if (!ambientStarted) {
        restoreAmbientFromSession();
      }
    }, 120);
  });

  bindPrimeEvents();

  window.SiteAudio = {
    bindInteractiveSounds,
    prime,
    playHoverSound,
    playClickSound,
    getAmbientSpectrum,
    toggleAmbient,
    isAmbientPlaying,
    shouldRestoreAmbient: shouldRestoreAmbientFromSession,
    restoreAmbient: restoreAmbientFromSession,
    startAmbient() {
      ambientAllowed = true;
      ambientEnabled = true;
      startAmbientTrack();
    },
    allowAmbient() {
      ambientAllowed = true;
    }
  };
})();
