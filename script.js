/* ═══════════════════════════════════════════════════════════════
   UPSkillS — script.js
   Features: dark/light toggle, smooth scroll, nav scroll state,
             hero canvas grid, scroll-triggered card animations,
             active nav link, mobile menu.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── 1. THEME TOGGLE ───────────────────────────────────────── */
  const html         = document.documentElement;
  const themeToggle  = document.getElementById('themeToggle');
  const STORAGE_KEY  = 'upskills-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function initTheme() {
    const saved   = localStorage.getItem(STORAGE_KEY);
    const prefers = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    applyTheme(saved || prefers);
  }

  themeToggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
    // Re-draw canvas with new colour
    drawGrid();
  });

  initTheme();

  /* ─── 2. NAVBAR SCROLL STATE ────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── 3. ACTIVE NAV LINK ─────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 80;
    let current   = '';

    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ─── 4. MOBILE MENU ─────────────────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileNav  = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mobileNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ─── 5. HERO CANVAS GRID ────────────────────────────────────── */
  const canvas = document.getElementById('heroCanvas');
  const ctx    = canvas.getContext('2d');

  function drawGrid() {
    const isDark = html.getAttribute('data-theme') !== 'light';
    const lineColor = isDark ? 'rgba(0,255,136,0.12)' : 'rgba(0,120,60,0.10)';
    const dotColor  = isDark ? 'rgba(0,255,136,0.30)' : 'rgba(0,120,60,0.25)';
    const CELL      = 48;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = lineColor;
    ctx.lineWidth   = 0.5;

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += CELL) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, canvas.height);
      ctx.stroke();
    }
    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += CELL) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(canvas.width, y + 0.5);
      ctx.stroke();
    }
    // Intersection dots
    ctx.fillStyle = dotColor;
    for (let x = 0; x <= canvas.width; x += CELL) {
      for (let y = 0; y <= canvas.height; y += CELL) {
        ctx.beginPath();
        ctx.arc(x, y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Draw on load + resize
  drawGrid();
  window.addEventListener('resize', drawGrid);

  /* ─── 6. SCROLL-TRIGGERED CARD ANIMATIONS ───────────────────── */
  const animatedCards = document.querySelectorAll('.course-card, .member-card');

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  animatedCards.forEach(function (card) {
    observer.observe(card);
  });

  /* ─── 7. "VIEW COURSE" BUTTON FEEDBACK ──────────────────────── */
  document.querySelectorAll('.btn-outline').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const original = btn.textContent;
      btn.textContent = 'Coming soon…';
      btn.disabled = true;
      btn.style.opacity = '0.6';
      setTimeout(function () {
        btn.textContent = original;
        btn.disabled    = false;
        btn.style.opacity = '';
      }, 1800);
    });
  });

  /* ─── 8. "START LEARNING" SMOOTH SCROLL (redundant safety) ──── */
  document.querySelector('.btn-primary').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
  });

})();
