// ═══════════════════════════════════════════════
// UPSkillS — script.js (v5)
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  /* ─── MOTIVATIONAL QUOTES ───────────────────────────────────── */
  var quotes = [
    { text: "The best time to start learning was yesterday. The second best time is now.", author: "— Anonymous" },
    { text: "Every expert was once a beginner. Keep going.", author: "— Helen Hayes" },
    { text: "Code is like humor. When you have to explain it, it's bad.", author: "— Cory House" },
    { text: "First, solve the problem. Then, write the code.", author: "— John Johnson" },
    { text: "The only way to learn a new programming language is by writing programs in it.", author: "— Dennis Ritchie" },
    { text: "It's not about what you know. It's about how fast you can learn.", author: "— Anonymous" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "— Harold Abelson" },
    { text: "The function of good software is to make the complex appear to be simple.", author: "— Grady Booch" },
    { text: "Talk is cheap. Show me the code.", author: "— Linus Torvalds" },
    { text: "Simplicity is the soul of efficiency.", author: "— Austin Freeman" },
    { text: "One of the best programming skills you can have is knowing when to walk away.", author: "— Oscar Godson" },
    { text: "Your most unhappy customers are your greatest source of learning.", author: "— Bill Gates" },
    { text: "Consistency beats talent every single time.", author: "— Anonymous" },
    { text: "Don't compare your chapter 1 to someone else's chapter 20.", author: "— Anonymous" },
    { text: "Every line of code you write is a step forward. Keep stepping.", author: "— Anonymous" }
  ];

 (function renderQuote() {
    var quoteText   = document.getElementById('quoteText');
    var quoteAuthor = document.getElementById('quoteAuthor');
    var strip       = document.getElementById('quoteStrip');
    if (!quoteText || !quoteAuthor) return;

    var random = quotes[Math.floor(Math.random() * quotes.length)];

    // Start hidden
    if (strip) strip.style.opacity = '0';

    quoteText.textContent   = random.text;
    quoteAuthor.textContent = random.author;

    // Fade in after short delay
    setTimeout(function() {
      if (strip) strip.style.transition = 'opacity 1.2s ease';
      if (strip) strip.style.opacity    = '1';
    }, 300);
  })();

  // ── SCRAMBLE TEXT EFFECT ──────────────────────
function scrambleText(el, finalText, duration = 1500) {
  const chars = 'アイウエオカキクケコ01ABCDEFGHIJKLMNOP@#$%&';
  let frame = 0;
  const totalFrames = duration / 30;

  const interval = setInterval(() => {
    let result = '';
    for (let i = 0; i < finalText.length; i++) {
      if (finalText[i] === ' ' || finalText[i] === '\n') {
        result += finalText[i];
      } else if (frame / totalFrames > i / finalText.length) {
        result += finalText[i];
      } else {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    el.textContent = result;
    frame++;
    if (frame >= totalFrames) {
      el.textContent = finalText;
      clearInterval(interval);
    }
  }, 30);
}

// Apply to hero tagline
const taglineEl = document.querySelector('.tagline');
if (taglineEl) {
  const original = taglineEl.textContent;
  setTimeout(() => scrambleText(taglineEl, original, 2000), 1000);
}

  // ── TYPING ANIMATION ─────────────────────────
const typingEl = document.querySelector('.intro-title');
if (typingEl) {
  const lines = ['Stop searching.', 'Start learning.'];
  const glowWord = 'learning';
  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  typingEl.innerHTML = '<span class="typed-line"></span>';
  const typedEl = typingEl.querySelector('.typed-line');

  function type() {
    const currentLine = lines[lineIndex];

    if (!isDeleting) {
      charIndex++;
      const text = currentLine.slice(0, charIndex);
      typedEl.innerHTML = text.includes(glowWord)
        ? text.replace(glowWord, `<span class="glow-text">${glowWord}</span>`)
        : text;

      if (charIndex === currentLine.length) {
        if (lineIndex === lines.length - 1) return; // stop at last line
        setTimeout(() => { isDeleting = true; type(); }, 1500);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = currentLine.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        lineIndex++;
        if (lineIndex >= lines.length) lineIndex = 0;
      }
    }

    const speed = isDeleting ? 40 : 70;
    setTimeout(type, speed);
  }

  setTimeout(type, 800);
}
  // ── 1. LOADING SCREEN ─────────────────────────
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1600);
    });
  }

  // ── 2. BROKEN THUMBNAIL FALLBACK ──────────────
  document.querySelectorAll('.card-thumb img').forEach(img => {
    img.addEventListener('error', () => { img.style.display = 'none'; });
  });

  // ── 3. ANIMATED COUNTERS ──────────────────────
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    if (isNaN(target) || target === 0) return;
    let current = 0;
    const step = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 40);
  });

  // ── 4. SCROLL FADE-IN ─────────────────────────
  const animTargets = document.querySelectorAll(
    '.topic-section, .card, .team-card, .roadmap-card, .intro-stats, .learn-card, .perk-item, .institution-card'
  );
  animTargets.forEach(el => el.classList.add('fade-in'));

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
      let delay = 0;
      siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 80; });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      fadeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  animTargets.forEach(el => fadeObserver.observe(el));

  // ── 5. ACTIVE NAV HIGHLIGHT ───────────────────
  const sections = document.querySelectorAll('[id]');
  const navLinks = document.querySelectorAll('.nav-topics a');

  if (navLinks.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-topics a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      });
    }, { threshold: 0.35 });

    sections.forEach(s => navObserver.observe(s));
  }

  // ── 6. STICKY HEADER ──────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.style.position   = 'sticky';
        header.style.top        = '0';
        header.style.background = 'rgba(8,11,17,0.95)';
        header.style.backdropFilter = 'blur(12px)';
        header.style.borderBottom   = '1px solid #1a2438';
        header.style.paddingBottom  = '0.8rem';
        header.style.zIndex    = '100';
      } else {
        header.style.background = '';
        header.style.backdropFilter = '';
        header.style.borderBottom   = '';
        header.style.paddingBottom  = '';
      }
    }, { passive: true });
  }

  // ── 7. BACK TO TOP ────────────────────────────
  const btn = document.getElementById('backToTop');
  if (btn) {
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // ── 8. SEARCH (languages page only) ──────────
  const searchInput  = document.getElementById('searchInput');
  const searchClear  = document.getElementById('searchClear');
  const searchStatus = document.getElementById('searchStatus');
  const noResults    = document.getElementById('noResults');
  const noResultsQ   = document.getElementById('noResultsQuery');
  const allCards     = document.querySelectorAll('.card');
  const allSections  = document.querySelectorAll('.topic-section');

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      searchClear.style.display = q ? 'block' : 'none';

      if (!q) {
        allCards.forEach(c => c.classList.remove('hidden-search'));
        allSections.forEach(s => s.classList.remove('hidden-search'));
        if (noResults) noResults.style.display = 'none';
        if (searchStatus) searchStatus.textContent = '';
        return;
      }

      let matchCount = 0;

      allSections.forEach(section => {
        const sectionText = (section.dataset.section || '').toLowerCase();
        const cards = section.querySelectorAll('.card');
        let sectionHasMatch = false;

        cards.forEach(card => {
          const title = (card.dataset.title || '').toLowerCase();
          const tags  = (card.dataset.tags  || '').toLowerCase();
          const match = title.includes(q) || tags.includes(q) || sectionText.includes(q);

          card.classList.toggle('hidden-search', !match);
          if (match) { sectionHasMatch = true; matchCount++; }
        });

        section.classList.toggle('hidden-search', !sectionHasMatch);
      });

      if (matchCount === 0) {
        if (noResults) noResults.style.display = 'block';
        if (noResultsQ) noResultsQ.textContent = q;
        if (searchStatus) searchStatus.textContent = '';
      } else {
        if (noResults) noResults.style.display = 'none';
        if (searchStatus) searchStatus.textContent = `${matchCount} result${matchCount > 1 ? 's' : ''} found`;
      }
    });

    if (searchClear) {
      searchClear.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }
  }

  });
  function downloadFormCertificate() {
    const name = document.getElementById('formCertNameInput').value.trim();
    if (!name) { alert('Please enter your full name!'); return; }
    
    // I-store ang name para sa certificate
    const certNameInput = document.getElementById('certNameInput');
    if (certNameInput) certNameInput.value = name;
    
    // I-close ang form modal
    document.getElementById('formCertOverlay').classList.remove('active');
    
    // I-generate ang certificate
    score = 5; // perfect score para sa form completers
    downloadCertificate();
  }
