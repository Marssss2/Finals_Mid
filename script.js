/* ═══════════════════════════════════════════════════════════════
   UPSkillS — script.js
   Features:
   - Dark/light mode toggle + localStorage
   - Hero canvas grid animation
   - Smooth scroll + active nav link
   - Mobile hamburger menu
   - Scroll-triggered card animations
   - Career Paths: dynamic cards + resource panel
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     DATA STRUCTURE
     To add resources: push objects into the arrays below.
     Each resource object:
       { title, description, youtube }
     youtube = full YouTube URL (e.g. "https://www.youtube.com/watch?v=XXXX")
     Thumbnail is auto-generated from the video ID.
  ───────────────────────────────────────────────────────────── */
  var learningData = {

    /* ── COURSES (reserved for future use) ── */
    python: [],
    html: [],
    css: [],
    javascript: [],

    /* ── CAREER PATHS ── */
    careers: {

      aiEngineer: {
        label: 'AI Engineer',
        icon: '🤖',
        description: 'Build intelligent systems using machine learning models and APIs.',
        resources: [
          {
            title: 'AI Engineering Full Course for Beginners',
            description: 'A complete beginner-to-pro roadmap for becoming an AI Engineer.',
            youtube: 'https://www.youtube.com/watch?v=F3plzgMR2hk'
          },
          {
            title: 'How to Become an AI Engineer in 2024',
            description: 'Step-by-step career path breakdown from a working AI Engineer.',
            youtube: 'https://www.youtube.com/watch?v=2q9aFAMJYjU'
          },
          {
            title: 'LangChain in 13 Minutes | Build AI Apps Fast',
            description: 'Build LLM-powered apps using LangChain — the go-to AI Engineer tool.',
            youtube: 'https://www.youtube.com/watch?v=aywZrzNaKjs'
          }
        ]
      },

      machineLearning: {
        label: 'ML Engineer',
        icon: '🧠',
        description: 'Design and train models that learn patterns from data.',
        resources: [
          {
            title: 'Machine Learning Course for Beginners',
            description: 'Full ML course covering all core algorithms with Python.',
            youtube: 'https://www.youtube.com/watch?v=NWONeJKn9Hc'
          },
          {
            title: 'Machine Learning Roadmap 2024',
            description: 'What to learn and in what order to land an ML Engineer role.',
            youtube: 'https://www.youtube.com/watch?v=1vsmaEfbnoE'
          },
          {
            title: 'Neural Networks from Scratch in Python',
            description: 'Understand backpropagation and neural nets by building one yourself.',
            youtube: 'https://www.youtube.com/watch?v=w8yWXqWQYmU'
          }
        ]
      },

      dataEngineer: {
        label: 'Data Engineer',
        icon: '🗄️',
        description: 'Build and maintain the pipelines that move and transform data at scale.',
        resources: [
          {
            title: 'Data Engineering Full Course 2024',
            description: 'End-to-end data engineering pipeline tutorial using modern tools.',
            youtube: 'https://www.youtube.com/watch?v=ysHFZSWHERk'
          },
          {
            title: 'Data Engineering Roadmap for Beginners',
            description: 'A clear roadmap covering SQL, Python, Spark, and cloud tools.',
            youtube: 'https://www.youtube.com/watch?v=bN93HUNXD3Q'
          },
          {
            title: 'Apache Spark for Beginners',
            description: 'Learn the most in-demand big data processing tool for data engineers.',
            youtube: 'https://www.youtube.com/watch?v=IQfG0faDrzE'
          }
        ]
      },

      softwareEngineer: {
        label: 'Software Engineer',
        icon: '💻',
        description: 'Design, develop, and maintain software systems across any platform.',
        resources: [
          {
            title: 'Software Engineering Full Course',
            description: 'From fundamentals to system design — everything a software engineer needs.',
            youtube: 'https://www.youtube.com/watch?v=O753uuutqH8'
          },
          {
            title: 'Data Structures & Algorithms Full Course',
            description: 'Master DSA — the core skill tested in every software engineering interview.',
            youtube: 'https://www.youtube.com/watch?v=8hly31xKli0'
          },
          {
            title: 'System Design for Beginners',
            description: 'Learn how large-scale systems are architected by senior software engineers.',
            youtube: 'https://www.youtube.com/watch?v=MbjObHmDbZo'
          }
        ]
      },

      webDeveloper: {
        label: 'Web Developer',
        icon: '🌐',
        description: 'Create websites and web apps using HTML, CSS, JavaScript, and more.',
        resources: [
          {
            title: 'Full Stack Web Development Course 2024',
            description: 'HTML to deployment — everything you need for a web developer career.',
            youtube: 'https://www.youtube.com/watch?v=nu_pCVPKzTk'
          },
          {
            title: 'JavaScript Full Course for Beginners',
            description: 'Master JavaScript — the essential language of modern web development.',
            youtube: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
          },
          {
            title: 'React Course for Beginners',
            description: 'Build dynamic web apps with React, the most popular front-end library.',
            youtube: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
          }
        ]
      },

      cloudEngineer: {
        label: 'Cloud Engineer',
        icon: '☁️',
        description: 'Deploy and manage infrastructure on cloud platforms like AWS, GCP, and Azure.',
        resources: [
          {
            title: 'AWS Certified Cloud Practitioner — Full Course',
            description: 'The most beginner-friendly path into cloud engineering with AWS.',
            youtube: 'https://www.youtube.com/watch?v=SOTamWNgDKc'
          },
          {
            title: 'DevOps Roadmap 2024',
            description: 'A practical guide covering Docker, Kubernetes, CI/CD, and cloud tools.',
            youtube: 'https://www.youtube.com/watch?v=9pZ2xmsSDdo'
          },
          {
            title: 'Docker Tutorial for Beginners',
            description: 'Containerize your apps with Docker — a must-know tool for cloud engineers.',
            youtube: 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
          }
        ]
      }

    }
  };

  /* ─────────────────────────────────────────────────────────────
     UTILITY: Extract YouTube video ID from URL
  ───────────────────────────────────────────────────────────── */
  function getYouTubeId(url) {
    var match = url.match(/[?&]v=([^&#]+)/) ||
                url.match(/youtu\.be\/([^?&#]+)/) ||
                url.match(/embed\/([^?&#]+)/);
    return match ? match[1] : null;
  }

  function getThumbnailUrl(videoId) {
    return 'https://img.youtube.com/vi/' + videoId + '/mqdefault.jpg';
  }

  /* ─────────────────────────────────────────────────────────────
     1. THEME TOGGLE
  ───────────────────────────────────────────────────────────── */
  var html        = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var STORAGE_KEY = 'upskills-theme';

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    drawGrid();
  }

  function initTheme() {
    var saved   = localStorage.getItem(STORAGE_KEY);
    var prefers = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    applyTheme(saved || prefers);
  }

  themeToggle.addEventListener('click', function () {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  initTheme();

  /* ─────────────────────────────────────────────────────────────
     2. NAVBAR SCROLL STATE
  ───────────────────────────────────────────────────────────── */
  var navbar = document.getElementById('navbar');

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
    updateActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─────────────────────────────────────────────────────────────
     3. ACTIVE NAV LINK
  ───────────────────────────────────────────────────────────── */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollY = window.scrollY + 80;
    var current = '';
    sections.forEach(function (s) {
      if (scrollY >= s.offsetTop) current = s.id;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     4. MOBILE MENU
  ───────────────────────────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ─────────────────────────────────────────────────────────────
     5. HERO CANVAS GRID
  ───────────────────────────────────────────────────────────── */
  var canvas = document.getElementById('heroCanvas');
  var ctx    = canvas.getContext('2d');

  function drawGrid() {
    var isDark    = html.getAttribute('data-theme') !== 'light';
    var lineColor = isDark ? 'rgba(0,255,136,0.12)' : 'rgba(0,120,60,0.10)';
    var dotColor  = isDark ? 'rgba(0,255,136,0.30)' : 'rgba(0,120,60,0.25)';
    var CELL      = 48;

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = lineColor;
    ctx.lineWidth   = 0.5;

    for (var x = 0; x <= canvas.width; x += CELL) {
      ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, canvas.height); ctx.stroke();
    }
    for (var y = 0; y <= canvas.height; y += CELL) {
      ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(canvas.width, y + 0.5); ctx.stroke();
    }

    ctx.fillStyle = dotColor;
    for (var cx = 0; cx <= canvas.width; cx += CELL) {
      for (var cy = 0; cy <= canvas.height; cy += CELL) {
        ctx.beginPath(); ctx.arc(cx, cy, 1.4, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  drawGrid();
  window.addEventListener('resize', drawGrid);

  /* ─────────────────────────────────────────────────────────────
     6. INTERSECTION OBSERVER — card reveal animations
  ───────────────────────────────────────────────────────────── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  function observeCards(selector) {
    document.querySelectorAll(selector).forEach(function (card) {
      revealObserver.observe(card);
    });
  }

  observeCards('.course-card, .member-card');

  /* ─────────────────────────────────────────────────────────────
     7. COURSE CARD "VIEW COURSE" FEEDBACK
  ───────────────────────────────────────────────────────────── */
  document.querySelectorAll('.btn-outline').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var original = btn.textContent;
      btn.textContent   = 'Coming soon…';
      btn.disabled      = true;
      btn.style.opacity = '0.6';
      setTimeout(function () {
        btn.textContent   = original;
        btn.disabled      = false;
        btn.style.opacity = '';
      }, 1800);
    });
  });

  /* ─────────────────────────────────────────────────────────────
     8. HERO CTA — smooth scroll safety
  ───────────────────────────────────────────────────────────── */
  var heroBtn = document.querySelector('.btn-primary');
  if (heroBtn) {
    heroBtn.addEventListener('click', function (e) {
      e.preventDefault();
      document.getElementById('courses').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     9. CAREER PATHS — render role cards + resource panel
  ───────────────────────────────────────────────────────────── */
  var careerGrid    = document.getElementById('careerGrid');
  var resourcePanel = document.getElementById('resourcePanel');
  var resourceGrid  = document.getElementById('resourceGrid');
  var panelTitle    = document.getElementById('resourcePanelTitle');
  var panelIcon     = document.getElementById('resourcePanelIcon');
  var closeBtn      = document.getElementById('resourceClose');
  var activeCard    = null;

  var PLAY_ICON_SVG =
    '<svg viewBox="0 0 48 48" fill="none" aria-hidden="true">' +
      '<circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.55)"/>' +
      '<polygon points="19,14 37,24 19,34" fill="white"/>' +
    '</svg>';

  /* Build career role cards from data */
  var careerKeys = Object.keys(learningData.careers);

  careerKeys.forEach(function (key, idx) {
    var career = learningData.careers[key];
    var card   = document.createElement('article');
    card.className = 'career-card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', career.label + ' career path');
    card.dataset.key = key;
    card.style.animationDelay = (idx * 0.08) + 's';

    card.innerHTML =
      '<div class="card-accent" aria-hidden="true"></div>' +
      '<div class="career-card-icon" aria-hidden="true">' + career.icon + '</div>' +
      '<div class="career-card-body">' +
        '<h3 class="career-card-title">' + career.label + '</h3>' +
        '<p class="career-card-desc">' + career.description + '</p>' +
      '</div>' +
      '<span class="career-card-cta" aria-hidden="true">' +
        'Explore resources' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
          '<path d="M5 12h14M12 5l7 7-7 7"/>' +
        '</svg>' +
      '</span>';

    card.addEventListener('click', function () { handleCareerClick(card, key); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCareerClick(card, key); }
    });

    careerGrid.appendChild(card);
    revealObserver.observe(card);
  });

  /* ─ Handle career card click ─ */
  function handleCareerClick(card, key) {
    var isSame = activeCard === card;

    if (activeCard) activeCard.classList.remove('active');

    if (isSame) {
      activeCard = null;
      closePanel();
      return;
    }

    activeCard = card;
    card.classList.add('active');
    openPanel(key);
  }

  /* ─ Open resource panel ─ */
  function openPanel(key) {
    var career    = learningData.careers[key];
    var resources = career.resources;

    panelTitle.textContent = career.label + ' Resources';
    panelIcon.textContent  = career.icon;
    resourceGrid.innerHTML = '';

    if (!resources || resources.length === 0) {
      resourceGrid.innerHTML =
        '<div class="resource-empty">' +
          '<span>📭</span>' +
          'No resources added yet. Check back soon!' +
        '</div>';
    } else {
      resources.forEach(function (res, idx) {
        var videoId  = getYouTubeId(res.youtube);
        var thumbUrl = videoId ? getThumbnailUrl(videoId) : '';

        var a = document.createElement('a');
        a.className = 'resource-card';
        a.href      = res.youtube;
        a.target    = '_blank';
        a.rel       = 'noopener noreferrer';
        a.setAttribute('role', 'listitem');
        a.setAttribute('aria-label', 'Watch: ' + res.title);
        a.style.animationDelay = (idx * 0.06) + 's';

        var thumbInner = thumbUrl
          ? '<img src="' + thumbUrl + '" alt="" loading="lazy" ' +
            'onerror="this.parentElement.innerHTML=\'<div class=\\\"resource-thumb-fallback\\\">▶</div>\'">' +
            '<div class="resource-play">' + PLAY_ICON_SVG + '</div>'
          : '<div class="resource-thumb-fallback">▶</div>';

        a.innerHTML =
          '<div class="resource-thumb">' + thumbInner + '</div>' +
          '<div class="resource-info">' +
            '<p class="resource-title">' + res.title + '</p>' +
            '<p class="resource-desc">'  + res.description + '</p>' +
            '<span class="resource-link-label">▶ Watch on YouTube ↗</span>' +
          '</div>';

        resourceGrid.appendChild(a);
      });
    }

    resourcePanel.hidden = false;
    careerGrid.classList.add('panel-open');

    setTimeout(function () {
      resourcePanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  }

  /* ─ Close resource panel ─ */
  function closePanel() {
    resourcePanel.hidden = true;
    careerGrid.classList.remove('panel-open');
    resourceGrid.innerHTML = '';
  }

  closeBtn.addEventListener('click', function () {
    if (activeCard) activeCard.classList.remove('active');
    activeCard = null;
    closePanel();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !resourcePanel.hidden) {
      if (activeCard) activeCard.classList.remove('active');
      activeCard = null;
      closePanel();
    }
  });

})();
