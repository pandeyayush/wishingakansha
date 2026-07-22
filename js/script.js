/* ═══════════════════════════════════════════════════════════
   MADAM JI BIRTHDAY WEBSITE — SCRIPT.JS
   ═══════════════════════════════════════════════════════════

   ⚙️  CONFIGURATION — Edit these values before sharing!
   ═══════════════════════════════════════════════════════════ */

const CONFIG = {
  // The date you first met / started knowing her (YYYY, MM-1, DD)
  // Month is 0-indexed: Jan=0, Feb=1 ... Dec=11
  // Change this to your actual start date!
  startDate: new Date(2017, 8, 7), // Feb 13, 2025 → ~523 days before July 2026

  // Reasons she's amazing
  reasons: [
    { emoji: "❤️", text: "Because your smile fixes bad days." },
    { emoji: "🌸", text: "Because your kindness is beautiful." },
    { emoji: "✨", text: "Because you make ordinary moments feel special." },
    { emoji: "🌙", text: "Because your laugh is the best sound." },
    { emoji: "🎨", text: "Because there's a creativity in everything you do." },
    { emoji: "🌺", text: "Because your warmth is impossible to ignore." },
    { emoji: "🌟", text: "Because you're genuinely rare." },
    { emoji: "🌈", text: "Because you bring colour to grey days." },
    { emoji: "🎀", text: "Because the world is genuinely better with you in it." },
    { emoji: "🦋", text: "Because you are entirely unique there is nobody else exactly like you." },
    { emoji: "💖", text: "Because you are beautifully messy and perfectly human." },
    { emoji: "👂", text: "Because you are a fantastic listener." },
    { emoji: "✨", text: "Because you have a magnetic personality that draws people in." },
    { emoji: "🍳", text: "Because you can cook a favorite dish or have a signature way you do things." },
    { emoji: "👑", text: "Because you are the main character of your amazing story." },
  ],

  // Little Notes for You
  loveNotes: [
    { emoji: "💌", text: "If I could gift you one thing today, it would be the ability to see yourself the way I do." },
    { emoji: "🌸", text: "The world became a little brighter the day you were born." },
    { emoji: "✨", text: "I hope life always gives you reasons to smile." },
    { emoji: "💝", text: "Some songs, sunsets, and little moments somehow end up reminding me of you." },
    { emoji: "🌙", text: "I don't know if you'll remember this website years from now, but I hope it made you smile today." },
    { emoji: "🎀", text: "Thank you for opening every little note. Happy Birthday, Akansha. Stay exactly the wonderful person you are. ❤️" },
  ],

  checklistItems: [
    { emoji: "🌍", text: "Travel the world with you." },
    { emoji: "🪂", text: "Go skydiving together." },
    { emoji: "🌊", text: "Watch the waves, explore the sea, and make memories." },
    { emoji: "🎂", text: "Celebrate your birthday together someday." },
    { emoji: "🌅", text: "Watch countless sunsets side by side." },
    { emoji: "🎬", text: "Spend movie nights filled with laughter." },
    { emoji: "🚶‍♂️", text: "Walk for miles with endless conversations." },
  ],
};

/* ═══════════════════════════════════════════════════════════
   INIT
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initPopups();
  buildReasonCards();
  buildEnvelopes();
  buildChecklist();
});

/* ═══════════════════════════════════════════════════════════
   AMBIENT CANVAS — Petals, Hearts, Sparkles
═══════════════════════════════════════════════════════════ */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const types = ['petal', 'heart', 'sparkle'];
  const petalColors = ['#FF6B9D', '#FFB3CC', '#FF8FB3', '#FFD6EA', '#F7C873'];
  const sparkleColors = ['#F7C873', '#FFD6EA', '#FFFFFF', '#FF6B9D'];

  function createParticle() {
    const type = types[Math.floor(Math.random() * types.length)];
    const isSparkle = type === 'sparkle';
    return {
      type,
      x: Math.random() * W,
      y: -20,
      size: isSparkle ? Math.random() * 2.5 + 1.2 : Math.random() * 12 + 8,
      speedY: isSparkle ? Math.random() * 0.25 + 0.1 : Math.random() * 0.35 + 0.2,
      speedX: isSparkle ? (Math.random() - 0.5) * 0.2 : (Math.random() - 0.5) * 0.3,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 0.8,
      opacity: isSparkle ? Math.random() * 0.4 + 0.3 : Math.random() * 0.5 + 0.3,
      color: isSparkle
        ? sparkleColors[Math.floor(Math.random() * sparkleColors.length)]
        : petalColors[Math.floor(Math.random() * petalColors.length)],
      life: 0,
      maxLife: Math.random() * 350 + 250,
    };
  }

  function drawPetal(ctx, x, y, size, rotation, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(x, y);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.ellipse(0, 0, size * 0.5, size, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawHeart(ctx, x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const s = size * 0.5;
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y - s * 0.5, x - s, y - s * 0.5, x - s, y + s * 0.1);
    ctx.bezierCurveTo(x - s, y + s * 0.7, x, y + s * 1.2, x, y + s * 1.2);
    ctx.bezierCurveTo(x, y + s * 1.2, x + s, y + s * 0.7, x + s, y + s * 0.1);
    ctx.bezierCurveTo(x + s, y - s * 0.5, x, y - s * 0.5, x, y + s * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(ctx, x, y, size, color, opacity, life, maxLife) {
    const twinkle = Math.sin((life / maxLife) * Math.PI * 4) * 0.35 + 0.65;
    ctx.save();
    ctx.globalAlpha = opacity * twinkle;
    ctx.fillStyle = color;
    ctx.shadowColor = color;
    ctx.shadowBlur = size * 2;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  let frameCount = 0;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    frameCount++;

    if (frameCount % 8 === 0 && particles.length < 35) {
      particles.push(createParticle());
    }

    particles = particles.filter(p => {
      const sway = p.type === 'sparkle' ? Math.sin(p.life * 0.01) * 0.15 : Math.sin(p.life * 0.015) * 0.2;
      p.x += p.speedX + sway;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;
      p.life++;

      const fade = p.life > p.maxLife * 0.8 ? 1 - (p.life - p.maxLife * 0.8) / (p.maxLife * 0.2) : 1;
      const alpha = p.opacity * fade;

      if (p.type === 'petal') drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, alpha);
      else if (p.type === 'heart') drawHeart(ctx, p.x, p.y, p.size, p.color, alpha * 0.7);
      else drawSparkle(ctx, p.x, p.y, p.size, p.color, alpha, p.life, p.maxLife);

      return p.y < H + 40 && p.life < p.maxLife;
    });

    requestAnimationFrame(animate);
  }
  animate();
}

/* ═══════════════════════════════════════════════════════════
   POPUP SEQUENCE
═══════════════════════════════════════════════════════════ */
let currentPopup = 1;

function initPopups() {
  // Track popup 1 viewed on site start
  if (window.trackEvent) {
    window.trackEvent({ event: 'popup_viewed', section: 'popups', data: { popup: 1 } });
  }

  // Animate popup 1 in
  const p1 = document.getElementById('popup-1');
  p1.classList.add('active');

  document.getElementById('popup-1-btn').addEventListener('click', () => {
    if (window.trackEvent) {
      window.trackEvent({ event: 'popup_btn_clicked', section: 'popups', data: { popup: 1, button: 'For Akansha ❤️' } });
    }
    goToPopup(2);
  });
  document.getElementById('popup-2-btn').addEventListener('click', () => {
    if (window.trackEvent) {
      window.trackEvent({ event: 'popup_btn_clicked', section: 'popups', data: { popup: 2, button: 'Continue' } });
    }
    goToPopup(3);
  });
  document.getElementById('popup-3-yes').addEventListener('click', () => {
    if (window.trackEvent) {
      window.trackEvent({ event: 'popup_btn_clicked', section: 'popups', data: { popup: 3, button: 'Yes' } });
    }
    goToPopup(4);
  });

  const noBtn = document.getElementById('popup-3-no');
  let noClickCount = 0;
  noBtn.addEventListener('click', () => {
    noClickCount++;
    if (window.trackEvent) {
      window.trackEvent({ event: 'popup_btn_clicked', section: 'popups', data: { popup: 3, button: 'No', attempt: noClickCount } });
    }
    if (noClickCount === 1) {
      // Run away effect
      runAway(noBtn);
    } else if (noClickCount === 2) {
      const msg = document.getElementById('popup-3-nope-msg');
      msg.style.display = 'block';
      noBtn.style.display = 'none';
      gsap.from(msg, { y: 10, opacity: 0, duration: 0.4 });
    }
  });

  document.getElementById('popup-4-btn').addEventListener('click', () => {
    if (window.trackEvent) {
      window.trackEvent({ event: 'popup_btn_clicked', section: 'popups', data: { popup: 4, button: 'Open Gift' } });
    }
    openGiftAndReveal();
  });
}

function runAway(btn) {
  const card = document.getElementById('popup-3');
  const rect = btn.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();

  const maxX = cardRect.width - btn.offsetWidth - 16;
  const maxY = cardRect.height - btn.offsetHeight - 16;
  const newX = Math.random() * maxX - maxX / 2;
  const newY = Math.random() * maxY - maxY / 2;

  gsap.to(btn, {
    x: newX,
    y: newY,
    duration: 0.3,
    ease: 'back.out(2)',
  });
}

function goToPopup(num) {
  if (window.trackEvent) {
    window.trackEvent({ event: 'popup_viewed', section: 'popups', data: { popup: num } });
  }
  const current = document.getElementById(`popup-${currentPopup}`);
  const next = document.getElementById(`popup-${num}`);

  gsap.to(current, {
    opacity: 0,
    scale: 0.9,
    y: -20,
    duration: 0.35,
    ease: 'power2.in',
    onComplete: () => {
      current.classList.remove('active');
      current.style.opacity = '';
      current.style.transform = '';
      next.classList.add('active');
      gsap.fromTo(next, { opacity: 0, scale: 0.88, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.4)' });
    }
  });

  currentPopup = num;

  // Mini confetti on popup 1
  if (num === 2) {
    launchMiniConfetti();
  }
}

function launchMiniConfetti() {
  confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ['#FF6B9D', '#FFB3CC', '#F7C873', '#FFFFFF'] });
}

function openGiftAndReveal() {
  const overlay = document.getElementById('popup-overlay');

  // Small confetti burst on popup close
  launchMiniConfetti();

  gsap.to(overlay, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    onComplete: () => {
      overlay.style.display = 'none';
      showCakeScreen();   // ← cake first, main site after
    }
  });
}

function launchConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;
  const colors = ['#FF6B9D', '#FFB3CC', '#F7C873', '#FFFFFF', '#FFD6EA'];
  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

/* ═══════════════════════════════════════════════════════════
   CAKE SCREEN (REDESIGNED)
═══════════════════════════════════════════════════════════ */

/* ── Cake audio helpers ──────────────────────────────────── */
function playCakeTrack(n, loop = false) {
  const el = document.getElementById('cake-audio-' + n);
  if (!el) return;
  el.loop = loop;
  el.currentTime = 0;
  el.play().catch(() => { });
}
function stopCakeTrack(n) {
  const el = document.getElementById('cake-audio-' + n);
  if (!el) return;
  el.pause();
  el.currentTime = 0;
}

function showCakeScreen() {
  if (window.trackEvent) {
    window.trackEvent({ event: 'cake_viewed', section: 'cake' });
  }
  const screen = document.getElementById('cake-screen');
  screen.classList.remove('hidden');
  screen.style.opacity = '0';

  // Fade screen in
  gsap.to(screen, { opacity: 1, duration: 0.8, ease: 'power2.out' });

  // ── Track 1: Balloon burst + wish sound (plays once, ~4 sec) ──
  playCakeTrack(1, false);

  // Init canvas sparkles
  initCakeSparkles();

  // Reset candle state
  const c2 = document.getElementById('candle-2');
  const c0 = document.getElementById('candle-0');
  c2.setAttribute('data-blown', 'false');
  c0.setAttribute('data-blown', 'false');
  window.blownCandles = { candle2: false, candle0: false };

  // Set initial animations
  gsap.set('#cs-header', { opacity: 0, y: -30 });
  gsap.set('#cs-footer', { opacity: 0, y: 20 });
  gsap.set('#cs-scene', { translateY: '100%' });

  // Rise cake from bottom
  gsap.to('#cs-scene', {
    translateY: '0%',
    duration: 1.5,
    delay: 0.4,
    ease: 'back.out(1.15)',
    onComplete: () => {
      // Fade in header and footer after cake arrives
      gsap.to('#cs-header', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
      gsap.to('#cs-footer', { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    }
  });

  // Setup single tap listener for both candles
  const clickLayer = document.getElementById('cs-click-layer');
  window.cakeBlown = false;

  const handleBlow = (e) => {
    if (e && e.type === 'touchstart') {
      e.preventDefault();
    }
    if (window.cakeBlown) return;
    window.cakeBlown = true;

    // Track candle blowing event
    if (window.trackEvent) {
      window.trackEvent({ event: 'candle_blown', section: 'cake', data: { candle: '2' } });
      window.trackEvent({ event: 'candle_blown', section: 'cake', data: { candle: '0' } });
    }

    // Blow both candles
    c2.setAttribute('data-blown', 'true');
    c0.setAttribute('data-blown', 'true');

    // Smoke animation on both candles
    spawnSmoke(c2);
    spawnSmoke(c0);

    // ── Track 2: Whoosh / blow sound ──
    playCakeTrack(2, false);

    // Cake bounce
    gsap.fromTo('#cs-cake',
      { scaleY: 0.93, scaleX: 1.04 },
      { scaleY: 1, scaleX: 1, duration: 0.6, ease: 'elastic.out(1.4, 0.4)' }
    );

    // Trigger celebration
    setTimeout(onAllCandlesBlown, 800);
  };

  clickLayer.addEventListener('click', handleBlow);
  clickLayer.addEventListener('touchstart', handleBlow, { passive: false });
}

function spawnSmoke(candle) {
  const rect = candle.getBoundingClientRect();
  const screenEl = document.getElementById('cake-screen');
  const screenRect = screenEl.getBoundingClientRect();

  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      const puff = document.createElement('div');
      puff.className = 'smoke-puff';
      const x = rect.left - screenRect.left + rect.width / 2 + (Math.random() - 0.5) * 8;
      const y = rect.top - screenRect.top - 8;
      puff.style.left = x + 'px';
      puff.style.top = y + 'px';
      puff.style.width = (7 + Math.random() * 5) + 'px';
      puff.style.height = puff.style.width;
      document.getElementById('cake-smoke-layer').appendChild(puff);
      setTimeout(() => puff.remove(), 1400);
    }, i * 100);
  }
}

function onAllCandlesBlown() {
  if (window.trackEvent) {
    window.trackEvent({ event: 'cake_sequence_completed', section: 'cake' });
  }

  // Hide footer
  gsap.to('#cs-footer', { opacity: 0, y: 15, duration: 0.4 });

  // Confetti stars
  confetti({
    particleCount: 120,
    spread: 80,
    origin: { y: 0.5, x: 0.5 },
    colors: ['#FF6B9D', '#F7C873', '#FFB3CC', '#FFFFFF'],
    shapes: ['star'],
    scalar: 1.3
  });

  // Confetti streams
  launchConfetti();
  launchFireworks();

  // Balloons
  spawnCakeBalloons();

  // Show celebration overlay + play Track 3
  setTimeout(() => {
    const celeb = document.getElementById('cs-celebration');
    celeb.classList.remove('hidden');
    gsap.fromTo(celeb, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    // ── Track 3: Yay / celebration music ──
    playCakeTrack(3, false);
  }, 300);

  // Transition to main site
  setTimeout(() => {
    const screen = document.getElementById('cake-screen');
    gsap.to(screen, {
      opacity: 0,
      duration: 1.4,
      ease: 'power2.inOut',
      onComplete: () => {
        screen.classList.add('hidden');
        document.getElementById('cs-celebration').classList.add('hidden');
        revealMainSite();
      }
    });
  }, 4200);
}

function spawnCakeBalloons() {
  const emojis = ['🎈', '🎀', '🌸', '💝', '🎊', '⭐'];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const b = document.createElement('div');
      b.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      b.style.cssText = `
        position: fixed;
        left: ${Math.random() * 90 + 5}%;
        bottom: -80px;
        font-size: ${Math.random() * 20 + 28}px;
        pointer-events: none;
        z-index: 9600;
        animation: floatUp ${Math.random() * 2.5 + 3}s linear forwards;
      `;
      document.body.appendChild(b);
      setTimeout(() => b.remove(), 6000);
    }, i * 180);
  }
}

// Sparkle background canvas logic
let cakeSparkleInterval;
function initCakeSparkles() {
  const canvas = document.getElementById('cake-sparkle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let sparkles = [];

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  for (let i = 0; i < 60; i++) {
    sparkles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005,
      dir: Math.random() > 0.5 ? 1 : -1
    });
  }

  function draw() {
    if (document.getElementById('cake-screen').classList.contains('hidden')) {
      cancelAnimationFrame(cakeSparkleInterval);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkles.forEach(s => {
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(247, 200, 115, ${s.alpha * 0.6})`;
      ctx.fill();
    });
    cakeSparkleInterval = requestAnimationFrame(draw);
  }
  draw();
}


/* ═══════════════════════════════════════════════════════════
   REVEAL MAIN SITE
═══════════════════════════════════════════════════════════ */
function revealMainSite() {
  const main = document.getElementById('main-site');
  main.classList.remove('hidden');
  main.style.opacity = 0;

  // ── Pause Track 3 (celebration music) when hero section reveals ──
  stopCakeTrack(3);

  gsap.to(main, { opacity: 1, duration: 1, ease: 'power2.out' });

  // Init everything
  initHero();
  initMusicPlayer();
  // Autoplay bg music after site reveals — user interaction (popup clicks) satisfies
  // browser autoplay policy, so this should work without user gesture here.
  setTimeout(() => {
    if (window._startBgMusic) window._startBgMusic();
  }, 1200); // slight delay so site fade-in completes first
  initEnvelopeModals();
  initCounter();
  initEndingStars();
  initEndingSequence();
  initScrollAnimations();
  initBalloons();
  initReplayBtn();
  initGiftSection();

  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic',
    offset: 60,
  });

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);
  initScrollTriggerAnimations();
}

/* ═══════════════════════════════════════════════════════════
   HERO SECTION
═══════════════════════════════════════════════════════════ */
function initHero() {
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to('#hero-pre', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    .to('#hero-title', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .to('#hero-name', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    .add(() => initTypedTagline(), '-=0.1');
}

function initTypedTagline() {
  new Typed('#hero-tagline', {
    strings: [
      "Today isn't just another day...",
      "It's the day the world got you. ❤️",
    ],
    typeSpeed: 45,
    backSpeed: 20,
    backDelay: 2000,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });
}

/* ═══════════════════════════════════════════════════════════
   MUSIC PLAYER — Spotify-style carousel
   - bgAudio: FAB background music
   - mc-audio-N: per-card preview audio (N = 0..4)
   Rules:
     • Playing any card audio → bgAudio pauses
     • Pausing → bgAudio stays paused (manual via FAB)
     • Only one card plays at a time
     • FAB always controls bgAudio only
═══════════════════════════════════════════════════════════ */
function initMusicPlayer() {
  const bgAudio = document.getElementById('bg-audio');
  const fab = document.getElementById('music-fab');
  const fabIcon = document.getElementById('music-fab-icon');
  const CARD_COUNT = 5;

  // ── BG audio helpers ─────────────────────────────────────
  function setBgPlaying(state) {
    if (state) {
      bgAudio.play().catch(() => { });
      fabIcon.className = 'fa fa-pause';
      fab.classList.add('playing');
    } else {
      bgAudio.pause();
      fabIcon.className = 'fa fa-music';
      fab.classList.remove('playing');
    }
  }
  fab.addEventListener('click', () => setBgPlaying(bgAudio.paused));
  window._startBgMusic = () => setBgPlaying(true);
  window._pauseBgMusic = () => setBgPlaying(false);
  window._resumeBgMusic = () => setBgPlaying(true);

  // ── Per-card state ────────────────────────────────────────
  const cardState = Array.from({ length: CARD_COUNT }, (_, i) => ({
    audio: document.getElementById(`mc-audio-${i}`),
    playBtn: document.getElementById(`mc-play-${i}`),
    fill: document.getElementById(`mc-fill-${i}`),
    timeEl: document.getElementById(`mc-time-${i}`),
    album: document.getElementById(`mc-album-${i}`),
    sparkleWrap: document.getElementById(`mc-sparkles-${i}`),
    playing: false,
    rafId: null,
    sparkleInterval: null,
  }));

  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  }

  function spawnMusicNote(state) {
    const notes = ['🎵', '🎶', '♪', '♫'];
    const el = document.createElement('span');
    el.className = 'mc-spark';
    el.textContent = notes[Math.floor(Math.random() * notes.length)];
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 30;
    el.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
    el.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
    el.style.left = `${50 + Math.cos(angle) * 20}%`;
    el.style.top = `${50 + Math.sin(angle) * 20}%`;
    state.sparkleWrap.appendChild(el);
    setTimeout(() => el.remove(), 1300);
  }

  function startCard(state) {
    // Pause bg music
    if (!bgAudio.paused) setBgPlaying(false);
    // Pause all other cards
    cardState.forEach(s => { if (s !== state && s.playing) stopCard(s); });

    state.audio.play().catch(() => { });
    state.playing = true;
    state.playBtn.innerHTML = '<i class="fa fa-pause"></i>';
    state.playBtn.classList.remove('paused');
    state.album.classList.add('playing');
    state.fill.classList.add('playing');

    // Track song played
    if (window.trackEvent) {
      const songName = state.playBtn.closest('.music-card')?.querySelector('.mc-song-name')?.textContent || 'Unknown';
      window.trackEvent({
        event: 'song_played',
        section: 'music',
        data: { song: songName }
      });
    }

    // Vinyl rotation
    gsap.to(state.album, { rotation: '+=3600', duration: 60, ease: 'none', repeat: -1, id: `vinyl-${state.audio.id}` });

    // Progress bar update
    function updateProgress() {
      if (!state.playing) return;
      const pct = state.audio.duration ? (state.audio.currentTime / state.audio.duration) * 100 : 0;
      state.fill.style.width = pct + '%';
      state.timeEl.textContent = `${fmtTime(state.audio.currentTime)} / ${fmtTime(state.audio.duration)}`;
      state.rafId = requestAnimationFrame(updateProgress);
    }
    state.rafId = requestAnimationFrame(updateProgress);

    // Music note sparkles
    state.sparkleInterval = setInterval(() => spawnMusicNote(state), 800);
  }

  function stopCard(state, fade = false) {
    // Track song paused (only if it was playing and not just a circular reset)
    if (state.playing && window.trackEvent) {
      const songName = state.playBtn.closest('.music-card')?.querySelector('.mc-song-name')?.textContent || 'Unknown';
      window.trackEvent({
        event: 'song_paused',
        section: 'music',
        data: { song: songName }
      });
    }

    state.playing = false;
    state.playBtn.innerHTML = '<i class="fa fa-play"></i>';
    state.playBtn.classList.add('paused');
    state.album.classList.remove('playing');
    state.fill.classList.remove('playing');
    clearInterval(state.sparkleInterval);
    cancelAnimationFrame(state.rafId);
    gsap.killTweensOf(state.album);

    if (fade) {
      gsap.to(state.audio, {
        volume: 0, duration: 1, onComplete: () => {
          state.audio.pause();
          state.audio.currentTime = 0;
          state.fill.style.width = '0%';
          state.audio.volume = 1;
        }
      });
    } else {
      state.audio.pause();
    }
  }

  // ── Wire up each card audio/player ────────────────────────
  cardState.forEach(state => {
    if (!state.audio || !state.playBtn) return;

    state.playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.playing) {
        stopCard(state);
      } else {
        startCard(state);
      }
    });

    // On audio end — fade out
    state.audio.addEventListener('ended', () => {
      if (window.trackEvent) {
        const songName = state.playBtn.closest('.music-card')?.querySelector('.mc-song-name')?.textContent || 'Unknown';
        window.trackEvent({
          event: 'song_completed',
          section: 'music',
          data: { song: songName }
        });
      }
      stopCard(state, true);
    });

    // Progress bar seek on click
    if (state.fill.parentElement) {
      state.fill.parentElement.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!state.audio.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        state.audio.currentTime = pct * state.audio.duration;
      });
    }
  });

  // Track Spotify button clicks
  document.querySelectorAll('.mc-spotify-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const songName = btn.closest('.music-card')?.querySelector('.mc-song-name')?.textContent || 'Unknown';
      if (window.trackEvent) {
        window.trackEvent({
          event: 'spotify_clicked',
          section: 'music',
          data: { song: songName }
        });
      }
    });
  });

  // ── Smooth 3D / Looped Carousel Engine ────────────────────
  const carousel = document.getElementById('music-carousel');
  const dotsWrap = document.getElementById('mc-dots');
  const cards = Array.from(carousel.querySelectorAll('.music-card'));
  let currentMusicIdx = 0;

  // Build dots
  dotsWrap.innerHTML = '';
  for (let i = 0; i < CARD_COUNT; i++) {
    const dot = document.createElement('div');
    dot.className = `mc-dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goToMusicCard(i));
    dotsWrap.appendChild(dot);
  }

  function goToMusicCard(idx) {
    idx = (idx + CARD_COUNT) % CARD_COUNT;

    if (idx !== currentMusicIdx && window.trackEvent) {
      const targetCard = cards[idx];
      const songName = targetCard?.querySelector('.mc-song-name')?.textContent || 'Unknown';
      window.trackEvent({
        event: 'song_changed',
        section: 'music',
        data: { song: songName, cardIndex: idx }
      });
    }

    currentMusicIdx = idx;

    const dots = dotsWrap.querySelectorAll('.mc-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));

    cards.forEach((card, i) => {
      let diff = i - idx;
      // Circular wrap around center
      if (diff > Math.floor(CARD_COUNT / 2)) diff -= CARD_COUNT;
      if (diff < -Math.floor(CARD_COUNT / 2)) diff += CARD_COUNT;

      const cardWidth = Math.min(window.innerWidth * 0.85, 350);
      const gap = 20;
      const offset = diff * (cardWidth + gap);

      if (diff === 0) {
        card.style.transform = `translateX(0px) scale(1)`;
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.zIndex = '10';
      } else if (Math.abs(diff) === 1) {
        card.style.transform = `translateX(${offset}px) scale(0.88)`;
        card.style.opacity = '0.55';
        card.style.pointerEvents = 'auto';
        card.style.zIndex = '5';
      } else {
        card.style.transform = `translateX(${diff > 0 ? offset + 40 : offset - 40}px) scale(0.76)`;
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.zIndex = '1';
      }
    });
  }

  // Click on adjacent/peeking card to jump to it
  cards.forEach((card, i) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.mc-player') || e.target.closest('.mc-spotify-btn')) return;
      if (i !== currentMusicIdx) goToMusicCard(i);
    });
  });

  // Initial layout + window resize tracking
  goToMusicCard(0);
  window.addEventListener('resize', () => goToMusicCard(currentMusicIdx));

  // Touch & Mouse Drag / Swipe with looping
  let isDown = false, startX = 0, currentX = 0;
  const threshold = 40;

  function onDragStart(x) {
    isDown = true;
    startX = x;
    currentX = x;
    carousel.classList.add('grabbing');
  }

  function onDragMove(x) {
    if (!isDown) return;
    currentX = x;
  }

  function onDragEnd() {
    if (!isDown) return;
    isDown = false;
    carousel.classList.remove('grabbing');
    const dx = currentX - startX;
    if (dx < -threshold) {
      goToMusicCard(currentMusicIdx + 1); // Next card (loops around to 0 after 4)
    } else if (dx > threshold) {
      goToMusicCard(currentMusicIdx - 1); // Prev card (loops around to 4 after 0)
    }
  }

  carousel.addEventListener('touchstart', e => onDragStart(e.touches[0].clientX), { passive: true });
  carousel.addEventListener('touchmove', e => onDragMove(e.touches[0].clientX), { passive: true });
  carousel.addEventListener('touchend', onDragEnd);

  carousel.addEventListener('mousedown', e => onDragStart(e.clientX));
  window.addEventListener('mousemove', e => onDragMove(e.clientX));
  window.addEventListener('mouseup', onDragEnd);
}


/* ═══════════════════════════════════════════════════════════
   REASON CARDS
═══════════════════════════════════════════════════════════ */
function buildReasonCards() {
  const carousel = document.getElementById('reasons-carousel');
  const dotsWrap = document.getElementById('reasons-dots');
  const reasons = CONFIG.reasons;
  let current = 0;

  reasons.forEach((r, i) => {
    const card = document.createElement('div');
    card.className = `reason-card${i === 0 ? ' active' : ''}`;
    card.innerHTML = `
      <div class="reason-emoji">${r.emoji}</div>
      <p class="reason-text">${r.text}</p>
      <span class="reason-card-num">${i + 1} / ${reasons.length}</span>
    `;
    carousel.appendChild(card);

    const dot = document.createElement('div');
    dot.className = `dot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goToCard(i));
    dotsWrap.appendChild(dot);
  });

  document.getElementById('reasons-prev').addEventListener('click', () => {
    // Circular: slide 0 → last slide
    const prev = (current - 1 + reasons.length) % reasons.length;
    goToCard(prev, 'left');
  });

  document.getElementById('reasons-next').addEventListener('click', () => {
    // Circular: last slide → slide 0
    const next = (current + 1) % reasons.length;
    goToCard(next, 'right');
  });

  // Touch swipe — circular
  let touchStartX = 0;
  carousel.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      if (dx < 0) goToCard((current + 1) % reasons.length, 'right');
      if (dx > 0) goToCard((current - 1 + reasons.length) % reasons.length, 'left');
    }
  });

  // Track initial card view (Card 1)
  if (window.trackEvent) {
    window.trackEvent({ event: 'reason_card_viewed', section: 'reasons', data: { cardIndex: 1 } });
    window.trackEvent({ event: 'reasons_first_card', section: 'reasons' });
  }

  function goToCard(idx, direction = 'right') {
    const cards = carousel.querySelectorAll('.reason-card');
    const dots = dotsWrap.querySelectorAll('.dot');

    // Track card index viewed
    if (window.trackEvent) {
      window.trackEvent({
        event: 'reason_card_viewed',
        section: 'reasons',
        data: { cardIndex: idx + 1 }
      });
      if (idx === 0) {
        window.trackEvent({ event: 'reasons_first_card', section: 'reasons' });
      } else if (idx === reasons.length - 1) {
        window.trackEvent({ event: 'reasons_last_card', section: 'reasons' });
      }
    }

    // Apply correct exit animation class based on direction
    const exitClass = direction === 'right' ? 'exiting-left' : 'exiting-right';
    cards[current].classList.add(exitClass);
    cards[current].classList.remove('active');

    setTimeout(() => {
      cards[current].classList.remove(exitClass);
      current = idx;
      cards[current].classList.add('active');
      dots.forEach((d, i) => d.classList.toggle('active', i === current));

      // Mini heart burst on card change
      spawnHeartBurst();
    }, 50);

    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
}

function spawnHeartBurst() {
  confetti({
    particleCount: 12,
    shapes: ['circle'],
    colors: ['#FF6B9D', '#FFB3CC', '#FF8FB3'],
    spread: 40,
    origin: { y: 0.5, x: 0.5 },
    scalar: 0.6,
    gravity: 0.8,
  });
}

/* ═══════════════════════════════════════════════════════════
   ENVELOPES
═══════════════════════════════════════════════════════════ */
function buildEnvelopes() {
  const grid = document.getElementById('envelopes-grid');
  CONFIG.loveNotes.forEach((note, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'envelope-wrap';
    wrap.dataset.index = i;
    wrap.innerHTML = `
      <div class="envelope">
        <div class="envelope-flap"></div>
        <div class="envelope-heart">💌</div>
      </div>
    `;
    grid.appendChild(wrap);
  });
}

function initEnvelopeModals() {
  const modal = document.createElement('div');
  modal.className = 'note-modal';
  modal.id = 'note-modal';
  modal.innerHTML = `
    <div class="note-modal-bg" id="note-modal-bg"></div>
    <div class="note-modal-card">
      <button class="note-modal-close" id="note-modal-close"><i class="fa fa-times"></i></button>
      <div class="note-modal-emoji" id="note-modal-emoji"></div>
      <p class="note-modal-text" id="note-modal-text"></p>
    </div>
  `;
  document.body.appendChild(modal);

  document.querySelectorAll('.envelope-wrap').forEach((wrap) => {
    wrap.addEventListener('click', () => {
      const i = +wrap.dataset.index;
      const note = CONFIG.loveNotes[i];

      // Track envelope opened
      if (window.trackEvent) {
        window.trackEvent({
          event: 'envelope_opened',
          section: 'notes',
          data: { envelope: i + 1, emoji: note.emoji }
        });
      }

      wrap.classList.toggle('open');

      document.getElementById('note-modal-emoji').textContent = note.emoji;
      document.getElementById('note-modal-text').textContent = note.text;
      modal.classList.add('active');
    });
  });

  function closeModal() {
    modal.classList.remove('active');
  }

  document.getElementById('note-modal-close').addEventListener('click', closeModal);
  document.getElementById('note-modal-bg').addEventListener('click', closeModal);
}

/* ═══════════════════════════════════════════════════════════
   CHECKLIST
═══════════════════════════════════════════════════════════ */
function buildChecklist() {
  const wrap = document.getElementById('checklist-wrap');
  CONFIG.checklistItems.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'check-item';
    el.dataset.aos = 'fade-up';
    el.dataset.aosDuration = '600';
    el.dataset.aosDelay = i * 80;
    el.innerHTML = `
      <div class="check-box"><i class="fa fa-check"></i></div>
      <span class="check-emoji">${item.emoji}</span>
      <span class="check-text">${item.text}</span>
    `;

    el.addEventListener('click', () => {
      el.classList.toggle('checked');

      // Track checklist item clicks
      if (window.trackEvent) {
        window.trackEvent({
          event: 'checklist_clicked',
          section: 'checklist',
          data: { item: item.text, checked: el.classList.contains('checked') }
        });
      }

      if (el.classList.contains('checked')) {
        gsap.fromTo(el, { scale: 0.96 }, { scale: 1, duration: 0.4, ease: 'back.out(2)' });
        spawnHeartAt(el);
      }
    });

    wrap.appendChild(el);
  });
}

function spawnHeartAt(el) {
  const rect = el.getBoundingClientRect();
  const heart = document.createElement('div');
  heart.textContent = '❤️';
  heart.style.cssText = `
    position: fixed;
    left: ${rect.left + rect.width / 2}px;
    top: ${rect.top}px;
    font-size: 1.5rem;
    pointer-events: none;
    z-index: 9998;
    transform: translateX(-50%);
  `;
  document.body.appendChild(heart);

  gsap.to(heart, {
    y: -60,
    opacity: 0,
    scale: 1.5,
    duration: 1,
    ease: 'power2.out',
    onComplete: () => heart.remove(),
  });
}

/* ═══════════════════════════════════════════════════════════
   DAYS COUNTER
═══════════════════════════════════════════════════════════ */
function initCounter() {
  const today = new Date();
  let y = today.getFullYear() - CONFIG.startDate.getFullYear();
  let m = today.getMonth() - CONFIG.startDate.getMonth();
  let d = today.getDate() - CONFIG.startDate.getDate();

  if (d < 0) {
    m--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    d += prevMonth.getDate();
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: '#counter',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      const counter = { years: 0, months: 0, days: 0 };
      const yearsEl = document.getElementById('count-years');
      const monthsEl = document.getElementById('count-months');
      const daysEl = document.getElementById('count-days');
      const heartEl = document.getElementById('counter-heart');
      const captionEl = document.getElementById('counter-caption');

      if (!yearsEl || !monthsEl || !daysEl) return;

      gsap.to(counter, {
        years: y,
        months: m,
        days: d,
        duration: 2.8,
        ease: 'power2.out',
        onUpdate: function () {
          yearsEl.textContent = Math.round(counter.years);
          monthsEl.textContent = Math.round(counter.months);
          daysEl.textContent = Math.round(counter.days);
        },
        onComplete: function () {
          yearsEl.textContent = y;
          monthsEl.textContent = m;
          daysEl.textContent = d;

          // Step 1: ❤️ appears smoothly with spring bounce
          if (heartEl) {
            gsap.to(heartEl, {
              opacity: 1,
              scale: 1,
              duration: 0.65,
              ease: 'back.out(1.8)',
              onComplete: () => {
                heartEl.classList.add('pulse-heart');
              }
            });
          }

          // Step 2: Then the sentence fades in
          if (captionEl) {
            gsap.to(captionEl, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.5,
              ease: 'power2.out'
            });
          }
        }
      });
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   GIFT SECTION
═══════════════════════════════════════════════════════════ */
function initGiftSection() {
  document.getElementById('gift-open-btn').addEventListener('click', openGift);
}

function openGift() {
  const box = document.getElementById('gift-box');
  const openBtn = document.getElementById('gift-open-btn');
  const message = document.getElementById('gift-message');

  box.classList.add('open');
  openBtn.style.display = 'none';

  gsap.to(box, { scale: 1.05, duration: 0.3, yoyo: true, repeat: 1 });

  setTimeout(() => {
    box.style.display = 'none';
    message.classList.remove('hidden');

    // Pause background audio when gift audio plays
    if (window._pauseBgMusic) window._pauseBgMusic();
    else {
      const bg = document.getElementById('bg-audio');
      if (bg) bg.pause();
    }

    playCakeTrack(1, false); // Play cake_track1 once when gift opens

    // Track gift opened event
    if (window.trackEvent) {
      window.trackEvent({ event: 'gift_opened', section: 'final-gift' });
    }

    launchConfetti();
    launchFireworks();
  }, 700);
}

function launchFireworks() {
  const colors = ['#FF6B9D', '#FFB3CC', '#F7C873', '#FFFFFF', '#FFD6EA'];
  const positions = [
    { x: 0.2, y: 0.3 },
    { x: 0.8, y: 0.3 },
    { x: 0.5, y: 0.5 },
    { x: 0.3, y: 0.6 },
    { x: 0.7, y: 0.4 },
  ];

  positions.forEach((pos, i) => {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: pos,
        colors,
        scalar: 1.2,
      });
    }, i * 300);
  });
}

/* ═══════════════════════════════════════════════════════════
   ENDING STARS
═══════════════════════════════════════════════════════════ */
function initEndingStars() {
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas.parentElement);
  resize();

  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.01 + 0.003,
      dir: Math.random() > 0.5 ? 1 : -1,
    });
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.speed * s.dir;
      if (s.alpha >= 1 || s.alpha <= 0.1) s.dir *= -1;
      ctx.beginPath();
      ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }
  drawStars();
}

/* ═══════════════════════════════════════════════════════════
   BALLOONS
═══════════════════════════════════════════════════════════ */
function initBalloons() {
  const wrap = document.getElementById('balloons-wrap');
  const balloonEmojis = ['🎈', '🎀', '🌸', '💝', '🎊'];

  ScrollTrigger.create({
    trigger: '#ending',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => spawnBalloon(wrap, balloonEmojis), i * 400);
      }
    }
  });
}

function spawnBalloon(wrap, emojis) {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  balloon.style.left = `${Math.random() * 90 + 5}%`;
  balloon.style.animationDuration = `${Math.random() * 3 + 4}s`;
  balloon.style.animationDelay = `${Math.random() * 0.5}s`;
  balloon.style.fontSize = `${Math.random() * 20 + 30}px`;
  wrap.appendChild(balloon);
  setTimeout(() => balloon.remove(), 8000);
}

/* ═══════════════════════════════════════════════════════════
   SCROLL ANIMATIONS
═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  // Lenis smooth scroll
  try {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (e) {
    console.log('Lenis not loaded, using default scroll');
  }

  // ── Scroll-cue: click → snap to next section ──────────────
  document.querySelectorAll('.scroll-cue').forEach(cue => {
    cue.addEventListener('click', () => scrollToNextSection(cue));
    cue.addEventListener('touchend', (e) => {
      e.preventDefault();
      scrollToNextSection(cue);
    }, { passive: false });
  });
}

function scrollToNextSection(cue) {
  // Walk up to the nearest <section> parent
  const currentSection = cue.closest('section');
  if (!currentSection) return;

  // Find the immediately following sibling section
  let next = currentSection.nextElementSibling;
  while (next && next.tagName !== 'SECTION') {
    next = next.nextElementSibling;
  }

  if (next) {
    next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function initScrollTriggerAnimations() {
  // Hero parallax
  gsap.to('.hero-bg', {
    yPercent: -30,
    ease: 'none',
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 }
  });

  // Track sections viewed
  const sections = [
    { id: 'hero', name: 'Welcome Hero' },
    { id: 'reasons', name: 'Why You Are Amazing' },
    { id: 'music', name: 'Music Playlist' },
    { id: 'notes', name: 'Love Notes' },
    { id: 'checklist', name: 'Surprise Checklist' },
    { id: 'counter', name: 'Days Counter' },
    { id: 'letter', name: 'Final Letter' },
    { id: 'final-gift', name: 'Final Gift Box' },
    { id: 'ending', name: 'Ending Screen' }
  ];

  sections.forEach(sec => {
    ScrollTrigger.create({
      trigger: `#${sec.id}`,
      start: 'top 50%',
      once: true,
      onEnter: () => {
        if (window.trackEvent) {
          window.trackEvent({
            event: `${sec.id}_viewed`,
            section: sec.id,
            data: { sectionName: sec.name }
          });
        }
      }
    });
  });

  // Track if final letter was read to the bottom
  ScrollTrigger.create({
    trigger: '#letter .letter-paper',
    start: 'bottom bottom',
    once: true,
    onEnter: () => {
      if (window.trackEvent) {
        window.trackEvent({
          event: 'letter_read_bottom',
          section: 'letter'
        });
      }
    }
  });
}

/* ═══════════════════════════════════════════════════════════
   ENDING SEQUENCE & REPLAY
═══════════════════════════════════════════════════════════ */
function initEndingSequence() {
  const phase1 = document.getElementById('ending-phase-1');
  const questionCard = document.getElementById('end-question-card');
  const thankyouCard = document.getElementById('end-thankyou-card');
  const finalAction = document.getElementById('ending-final-action');
  const btnYes = document.getElementById('btn-smile-yes');
  const btnLittle = document.getElementById('btn-smile-little');

  ScrollTrigger.create({
    trigger: '#ending',
    start: 'top 60%',
    once: true,
    onEnter: () => {
      // Phase 1: Pause for ~2 seconds, then fade out Phase 1 and reveal One Last Question Card
      setTimeout(() => {
        gsap.to(phase1, {
          opacity: 0,
          y: -20,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            if (phase1) phase1.classList.add('hidden');
            if (questionCard) {
              questionCard.classList.remove('hidden');
              gsap.fromTo(questionCard,
                { opacity: 0, scale: 0.85, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }
              );
            }
          }
        });
      }, 2200);
    }
  });

  function handleSmileAnswer(selectedBtn, otherBtn) {
    if (selectedBtn.classList.contains('selected')) return;
    selectedBtn.classList.add('selected');

    // Track final question selection
    if (window.trackEvent) {
      const optionName = selectedBtn.id === 'btn-smile-yes' ? 'Yes, You Did ❤️' : 'A Little 😊';
      window.trackEvent({
        event: 'final_question_answered',
        section: 'ending',
        data: { option: optionName }
      });
    }

    // Pause background music and play cake_track1 once when button is clicked
    if (window._pauseBgMusic) window._pauseBgMusic();
    else {
      const bg = document.getElementById('bg-audio');
      if (bg) bg.pause();
    }

    playCakeTrack(1, false);

    // const giftAudio = document.getElementById('cake-audio-1');
    // if (giftAudio) {
    //   giftAudio.onended = () => {
    //     if (window._resumeBgMusic) window._resumeBgMusic();
    //   };
    // }

    // Fade out other button
    if (otherBtn) {
      gsap.to(otherBtn, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'power2.out' });
    }

    // Launch celebratory confetti and floating hearts
    launchConfetti();
    launchFloatingHearts(selectedBtn);

    // After ~1.4s, replace question card with Thank You card
    setTimeout(() => {
      gsap.to(questionCard, {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          if (questionCard) questionCard.classList.add('hidden');
          if (thankyouCard) {
            thankyouCard.classList.remove('hidden');
            gsap.fromTo(thankyouCard,
              { opacity: 0, scale: 0.85, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.3)' }
            );

            // Phase 4: After ~3.5s, keep Thank You card visible and reveal Replay button right below it
            setTimeout(() => {
              if (finalAction) {
                finalAction.classList.remove('hidden');
                gsap.fromTo(finalAction,
                  { opacity: 0, y: 20 },
                  { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
                );
              }
            }, 3500);
          }
        }
      });
    }, 1400);
  }

  if (btnYes && btnLittle) {
    btnYes.addEventListener('click', () => handleSmileAnswer(btnYes, btnLittle));
    btnLittle.addEventListener('click', () => handleSmileAnswer(btnLittle, btnYes));
  }
}

function launchFloatingHearts(btnEl) {
  const parent = document.getElementById('ending');
  if (!parent || !btnEl) return;
  const rect = btnEl.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();

  const startX = rect.left + rect.width / 2 - parentRect.left;
  const startY = rect.top - parentRect.top;

  const emojis = ['❤️', '💖', '💗', '💓', '✨', '💕'];
  for (let i = 0; i < 12; i++) {
    setTimeout(() => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart-el';
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.left = `${startX + (Math.random() - 0.5) * 80}px`;
      heart.style.top = `${startY}px`;
      parent.appendChild(heart);

      gsap.to(heart, {
        y: -160 - Math.random() * 80,
        x: (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: Math.random() * 0.8 + 0.6,
        duration: Math.random() * 1.5 + 1.5,
        ease: 'power1.out',
        onComplete: () => heart.remove()
      });
    }, i * 100);
  }
}

function initReplayBtn() {
  const btn = document.getElementById('replay-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => location.reload(), 600);
  });
}
