// ═══════════════════════════════════════════════
// UPSkillS — script.js (v6 FIXED)
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════════════
     ASSESSMENT
  ═══════════════════════════════════════════════════════════════ */
  var questions = [
    {
      type: 'choice',
      text: '01 // What best describes your goal in tech?',
      options: [
        { icon: '🌐', label: 'Build websites or web apps',       value: 'web'      },
        { icon: '🧠', label: 'Work with AI or Machine Learning', value: 'ai'       },
        { icon: '📊', label: 'Work with data and analytics',     value: 'data'     },
        { icon: '📱', label: 'Build mobile apps',                value: 'mobile'   },
        { icon: '☁️', label: 'Cloud, servers, infrastructure',   value: 'cloud'    },
        { icon: '🔒', label: 'Cybersecurity and systems',        value: 'security' }
      ]
    },
    {
      type: 'choice',
      text: '02 // How much programming experience do you have?',
      options: [
        { icon: '🐣', label: 'Complete beginner — never coded',  value: 'none'         },
        { icon: '🌱', label: 'Tried a few tutorials',            value: 'beginner'     },
        { icon: '⚡', label: 'Built small projects before',      value: 'intermediate' },
        { icon: '🔥', label: 'Comfortable with one language',    value: 'advanced'     }
      ]
    },
    {
      type: 'slider',
      text: '03 // How comfortable are you with math and logic?',
      min: 1, max: 5,
      labels: ['Not at all', 'Very comfortable'],
      key: 'math'
    },
    {
      type: 'choice',
      text: '04 // What type of problems do you enjoy solving?',
      options: [
        { icon: '🎨', label: 'Visual and design problems',       value: 'visual'  },
        { icon: '🔢', label: 'Data, numbers, patterns',         value: 'data'    },
        { icon: '⚙️', label: 'Systems and automation',          value: 'systems' },
        { icon: '👥', label: 'People-facing products and apps', value: 'product' }
      ]
    },
    {
      type: 'slider',
      text: '05 // How much time per week can you dedicate to learning?',
      min: 1, max: 5,
      labels: ['1-2 hrs/week', '20+ hrs/week'],
      key: 'time'
    },
    {
      type: 'choice',
      text: '06 // What matters most to you in a tech career?',
      options: [
        { icon: '💰', label: 'High salary',                     value: 'salary'     },
        { icon: '🚀', label: 'Working on cutting-edge tech',    value: 'innovation' },
        { icon: '🏠', label: 'Remote work flexibility',         value: 'remote'     },
        { icon: '🌍', label: 'Making a social impact',          value: 'impact'     }
      ]
    },
    {
      type: 'choice',
      text: '07 // Which of these sounds most exciting to you?',
      options: [
        { icon: '🤖', label: 'Training an AI model',            value: 'ai'   },
        { icon: '🌐', label: 'Launching your own website',      value: 'web'  },
        { icon: '📈', label: 'Analyzing trends from data',      value: 'data' },
        { icon: '☁️', label: 'Deploying apps to the cloud',     value: 'cloud'}
      ]
    }
  ];

  var recommendations = {
    web: {
      career:   { icon: '🌐', title: 'Web Developer',       desc: 'Build websites and web apps — one of the most in-demand roles globally.' },
      language: { icon: '🟨', title: 'JavaScript',          desc: 'The #1 language for web — runs everywhere, huge community.' },
      roadmap:  { icon: '📍', title: 'Web Dev Roadmap',     desc: 'HTML → CSS → JS → React → Node.js', link: 'pages/roadmap.html' }
    },
    ai: {
      career:   { icon: '🧠', title: 'AI / ML Engineer',    desc: 'Build intelligent systems — the highest-paying tech role in 2026.' },
      language: { icon: '🐍', title: 'Python',              desc: 'The go-to language for AI, ML, and data science.' },
      roadmap:  { icon: '📍', title: 'AI Engineer Roadmap', desc: 'Python → Math → ML → Deep Learning → LLMs', link: 'pages/roadmap.html' }
    },
    data: {
      career:   { icon: '📊', title: 'Data Engineer',       desc: 'Build pipelines that power business decisions at scale.' },
      language: { icon: '🐍', title: 'Python + SQL',        desc: 'The essential combo for any data professional.' },
      roadmap:  { icon: '📍', title: 'Data Roadmap',        desc: 'Python → SQL → Pandas → Spark → Cloud', link: 'pages/roadmap.html' }
    },
    mobile: {
      career:   { icon: '📱', title: 'Mobile Developer',    desc: 'Build iOS and Android apps used by millions.' },
      language: { icon: '🎯', title: 'Flutter / Dart',      desc: 'Build for iOS and Android with one codebase.' },
      roadmap:  { icon: '📍', title: 'Mobile Roadmap',      desc: 'Dart → Flutter → State Management → Deploy', link: 'pages/roadmap.html' }
    },
    cloud: {
      career:   { icon: '☁️', title: 'Cloud Engineer',      desc: 'Design and manage cloud infrastructure at scale.' },
      language: { icon: '🐍', title: 'Python + Bash',       desc: 'Automate everything — essential for cloud roles.' },
      roadmap:  { icon: '📍', title: 'Cloud Roadmap',       desc: 'Linux → Networking → Docker → AWS → Kubernetes', link: 'pages/roadmap.html' }
    },
    security: {
      career:   { icon: '🔒', title: 'Security Engineer',   desc: 'Protect systems and data — critical and high-paying.' },
      language: { icon: '🐍', title: 'Python + C',          desc: 'Python for scripting, C for low-level security work.' },
      roadmap:  { icon: '📍', title: 'Security Roadmap',    desc: 'Networking → Linux → Python → Ethical Hacking', link: 'pages/roadmap.html' }
    }
  };

  var answers      = {};
  var currentQ     = 0;
  var assessModal  = document.getElementById('assessmentModal');
  var resultsModal = document.getElementById('resultsModal');
  var modalBody    = document.getElementById('modalBody');
  var modalStep    = document.getElementById('modalStep');
  var modalBar     = document.getElementById('modalProgressBar');
  var nextBtn      = document.getElementById('nextBtn');
  var prevBtn      = document.getElementById('prevBtn');

  function openModal() {
    currentQ = 0;
    answers  = {};
    if (assessModal) assessModal.hidden = false;
    document.body.style.overflow = 'hidden';
    renderQuestion();
  }

  function closeModal() {
    if (assessModal) assessModal.hidden = true;
    document.body.style.overflow = '';
  }

  function closeResults() {
    if (resultsModal) resultsModal.hidden = true;
    document.body.style.overflow = '';
  }

  function renderQuestion() {
    if (!modalBody || !modalStep || !modalBar || !nextBtn || !prevBtn) return;

    var q       = questions[currentQ];
    var total   = questions.length;
    var percent = Math.round((currentQ / total) * 100);

    modalStep.textContent        = '// question ' + (currentQ + 1) + ' of ' + total;
    modalBar.style.width         = percent + '%';
    nextBtn.textContent          = currentQ === total - 1 ? 'See Results →' : 'Next →';
    prevBtn.style.visibility     = currentQ === 0 ? 'hidden' : 'visible';

    var html = '<p class="q-text">' + q.text + '</p>';

    if (q.type === 'choice') {
      html += '<div class="q-options">';
      q.options.forEach(function (opt) {
        var sel = answers[currentQ] === opt.value ? ' selected' : '';
        html += '<button class="q-option' + sel + '" data-value="' + opt.value + '">' +
                  '<span class="q-option-icon">' + opt.icon + '</span>' + opt.label +
                '</button>';
      });
      html += '</div>';

    } else {
      var val       = answers[currentQ] !== undefined ? answers[currentQ] : 3;
      var emojiLabels = ['😐 Beginner', '🙂 Some experience', '😊 Comfortable', '😎 Confident', '🔥 Expert'];
      var dotsHTML  = ['1','2','3','4','5'].map(function (d, i) {
        var isActive = (i + 1) === val ? ' active' : '';
        return '<div class="q-slider-dot' + isActive + '" data-val="' + (i + 1) + '">' +
                 '<div class="q-slider-dot-circle"></div>' +
                 '<span class="q-slider-dot-label">' + d + '</span>' +
               '</div>';
      }).join('');

      html += '<div class="q-slider-wrap">' +
                '<div class="q-slider-labels"><span>' + q.labels[0] + '</span><span>' + q.labels[1] + '</span></div>' +
                '<input class="q-slider" type="range" min="' + q.min + '" max="' + q.max + '" value="' + val + '" id="sliderInput" style="--val:' + val + '" />' +
                '<div class="q-slider-dots" id="sliderDots">' + dotsHTML + '</div>' +
                '<div class="q-slider-value" id="sliderVal">' + emojiLabels[val - 1] + '</div>' +
              '</div>';
    }

    modalBody.innerHTML = html;

    // ── Attach events ──
    if (q.type === 'choice') {
      modalBody.querySelectorAll('.q-option').forEach(function (btn) {
        btn.addEventListener('click', function () {
          modalBody.querySelectorAll('.q-option').forEach(function (b) { b.classList.remove('selected'); });
          btn.classList.add('selected');
          answers[currentQ] = btn.getAttribute('data-value');
        });
      });

    } else {
      var slider    = document.getElementById('sliderInput');
      var sliderVal = document.getElementById('sliderVal');
      var emojiLbls = ['😐 Beginner', '🙂 Some experience', '😊 Comfortable', '😎 Confident', '🔥 Expert'];
      answers[currentQ] = parseInt(slider.value);

      function updateSlider(v) {
        slider.value = v;
        slider.style.setProperty('--val', v);
        sliderVal.textContent = emojiLbls[v - 1];
        answers[currentQ]     = v;
        document.querySelectorAll('.q-slider-dot').forEach(function (dot) {
          dot.classList.toggle('active', parseInt(dot.dataset.val) === v);
        });
      }

      slider.addEventListener('input', function () {
        updateSlider(parseInt(slider.value));
      });

      document.querySelectorAll('.q-slider-dot').forEach(function (dot) {
        dot.addEventListener('click', function () {
          updateSlider(parseInt(dot.dataset.val));
        });
      });
    }
  } // ← closes renderQuestion()

  function getRecommendation() {
    var scores = {};
    Object.keys(answers).forEach(function (idx) {
      var val = answers[idx];
      if (typeof val === 'string') {
        scores[val] = (scores[val] || 0) + 1;
      }
    });
    var top = 'web';
    var max = 0;
    Object.keys(scores).forEach(function (key) {
      if (scores[key] > max && recommendations[key]) {
        max = scores[key];
        top = key;
      }
    });
    return recommendations[top] || recommendations.web;
  }

  function showResults() {
    var rec = getRecommendation();
    closeModal();

    var html =
      '<p class="results-intro">Based on your answers, here\'s your personalized tech path. These recommendations are tailored to your goals, interests, and experience level.</p>' +

      '<div class="results-section">' +
        '<p class="results-section-title">// recommended career</p>' +
        '<div class="results-cards">' +
          '<div class="result-card result-top-pick">' +
            '<div class="result-badge">TOP PICK</div>' +
            '<div class="result-card-icon">' + rec.career.icon + '</div>' +
            '<p class="result-card-title">' + rec.career.title + '</p>' +
            '<p class="result-card-desc">'  + rec.career.desc  + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="results-section">' +
        '<p class="results-section-title">// start with this language</p>' +
        '<div class="results-cards">' +
          '<div class="result-card result-top-pick">' +
            '<div class="result-card-icon">' + rec.language.icon + '</div>' +
            '<p class="result-card-title">' + rec.language.title + '</p>' +
            '<p class="result-card-desc">'  + rec.language.desc  + '</p>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="results-section">' +
        '<p class="results-section-title">// your roadmap</p>' +
        '<div class="results-cards">' +
          '<a class="result-card result-top-pick" href="' + rec.roadmap.link + '">' +
            '<div class="result-card-icon">' + rec.roadmap.icon + '</div>' +
            '<p class="result-card-title">' + rec.roadmap.title + '</p>' +
            '<p class="result-card-desc">'  + rec.roadmap.desc  + '</p>' +
          '</a>' +
        '</div>' +
      '</div>';

    document.getElementById('resultsBody').innerHTML = html;
    if (resultsModal) resultsModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  // ── Button events ──
  var startBtn = document.getElementById('startAssessment');
  if (startBtn) startBtn.addEventListener('click', openModal);

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      var q = questions[currentQ];
      if (q.type === 'choice' && answers[currentQ] === undefined) {
        var opts = modalBody.querySelectorAll('.q-option');
        opts.forEach(function (o) { o.style.borderColor = '#ff6b6b'; });
        setTimeout(function () { opts.forEach(function (o) { o.style.borderColor = ''; }); }, 800);
        return;
      }
      if (currentQ < questions.length - 1) {
        currentQ++;
        renderQuestion();
      } else {
        showResults();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (currentQ > 0) { currentQ--; renderQuestion(); }
    });
  }

  var modalCloseBtn = document.getElementById('modalClose');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  var resultsCloseBtn = document.getElementById('resultsClose');
  if (resultsCloseBtn) resultsCloseBtn.addEventListener('click', closeResults);

  var retakeBtn = document.getElementById('retakeBtn');
  if (retakeBtn) retakeBtn.addEventListener('click', function () { closeResults(); openModal(); });

  if (assessModal) {
    assessModal.addEventListener('click', function (e) { if (e.target === assessModal) closeModal(); });
  }
  if (resultsModal) {
    resultsModal.addEventListener('click', function (e) { if (e.target === resultsModal) closeResults(); });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (assessModal  && !assessModal.hidden)  closeModal();
      if (resultsModal && !resultsModal.hidden) closeResults();
    }
  });

  /* ═══════════════════════════════════════════════════════════════
     MOTIVATIONAL QUOTES
  ═══════════════════════════════════════════════════════════════ */
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
    if (strip) strip.style.opacity = '0';
    quoteText.textContent   = random.text;
    quoteAuthor.textContent = random.author;
    setTimeout(function () {
      if (strip) strip.style.transition = 'opacity 1.2s ease';
      if (strip) strip.style.opacity    = '1';
    }, 300);
  })();

  /* ═══════════════════════════════════════════════════════════════
     SCRAMBLE TEXT EFFECT
  ═══════════════════════════════════════════════════════════════ */
  function scrambleText(el, finalText, duration) {
    duration = duration || 1500;
    var chars = 'アイウエオカキクケコ01ABCDEFGHIJKLMNOP@#$%&';
    var frame = 0;
    var totalFrames = duration / 30;
    var interval = setInterval(function () {
      var result = '';
      for (var i = 0; i < finalText.length; i++) {
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
      if (frame >= totalFrames) { el.textContent = finalText; clearInterval(interval); }
    }, 30);
  }

  var taglineEl = document.querySelector('.tagline');
  if (taglineEl) {
    var original = taglineEl.textContent;
    setTimeout(function () { scrambleText(taglineEl, original, 2000); }, 1000);
  }

  /* ═══════════════════════════════════════════════════════════════
     TYPING ANIMATION
  ═══════════════════════════════════════════════════════════════ */
  var typingEl = document.querySelector('.intro-title');
  if (typingEl) {
    var lines     = ['Stop searching.', 'Start learning.'];
    var glowWord  = 'learning';
    var lineIndex = 0;
    var charIndex = 0;
    var isDeleting = false;

    typingEl.innerHTML = '<span class="typed-line"></span>';
    var typedEl = typingEl.querySelector('.typed-line');

    function type() {
      var currentLine = lines[lineIndex];
      if (!isDeleting) {
        charIndex++;
        var text = currentLine.slice(0, charIndex);
        typedEl.innerHTML = text.includes(glowWord)
          ? text.replace(glowWord, '<span class="glow-text">' + glowWord + '</span>')
          : text;
        if (charIndex === currentLine.length) {
          if (lineIndex === lines.length - 1) return;
          setTimeout(function () { isDeleting = true; type(); }, 1500);
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
      setTimeout(type, isDeleting ? 40 : 70);
    }
    setTimeout(type, 800);
  }

  /* ═══════════════════════════════════════════════════════════════
     LOADING SCREEN
  ═══════════════════════════════════════════════════════════════ */
  var loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', function () {
      setTimeout(function () { loader.classList.add('hidden'); }, 1600);
    });
  }

  /* ═══════════════════════════════════════════════════════════════
     BROKEN THUMBNAIL FALLBACK
  ═══════════════════════════════════════════════════════════════ */
  document.querySelectorAll('.card-thumb img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
  });

  /* ═══════════════════════════════════════════════════════════════
     ANIMATED COUNTERS
  ═══════════════════════════════════════════════════════════════ */
  document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
    var target = parseInt(el.dataset.target);
    if (isNaN(target) || target === 0) return;
    var current = 0;
    var step    = Math.ceil(target / 30);
    var timer   = setInterval(function () {
      current = Math.min(current + step, target);
      el.textContent = current + (el.dataset.suffix || '');
      if (current >= target) clearInterval(timer);
    }, 40);
  });

  /* ═══════════════════════════════════════════════════════════════
     SCROLL FADE-IN
  ═══════════════════════════════════════════════════════════════ */
  var animTargets = document.querySelectorAll(
    '.topic-section, .card, .team-card, .roadmap-card, .intro-stats, .learn-card, .perk-item, .institution-card'
  );
  animTargets.forEach(function (el) { el.classList.add('fade-in'); });

  var fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var siblings = entry.target.parentElement.querySelectorAll('.fade-in');
      var delay    = 0;
      siblings.forEach(function (sib, idx) { if (sib === entry.target) delay = idx * 80; });
      setTimeout(function () { entry.target.classList.add('visible'); }, delay);
      fadeObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  animTargets.forEach(function (el) { fadeObserver.observe(el); });

  /* ═══════════════════════════════════════════════════════════════
     ACTIVE NAV HIGHLIGHT
  ═══════════════════════════════════════════════════════════════ */
  var sections = document.querySelectorAll('[id]');
  var navLinks = document.querySelectorAll('.nav-topics a');

  if (navLinks.length > 0) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var active = document.querySelector('.nav-topics a[href="#' + entry.target.id + '"]');
        if (active) active.classList.add('active');
      });
    }, { threshold: 0.35 });
    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ═══════════════════════════════════════════════════════════════
     STICKY HEADER
  ═══════════════════════════════════════════════════════════════ */
  var header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60) {
        header.style.position       = 'sticky';
        header.style.top            = '0';
        header.style.background     = 'rgba(8,11,17,0.95)';
        header.style.backdropFilter = 'blur(12px)';
        header.style.borderBottom   = '1px solid #1a2438';
        header.style.paddingBottom  = '0.8rem';
        header.style.zIndex         = '100';
      } else {
        header.style.background     = '';
        header.style.backdropFilter = '';
        header.style.borderBottom   = '';
        header.style.paddingBottom  = '';
      }
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════════════
     BACK TO TOP
  ═══════════════════════════════════════════════════════════════ */
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backBtn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ═══════════════════════════════════════════════════════════════
     SEARCH (languages page only)
  ═══════════════════════════════════════════════════════════════ */
  var searchInput  = document.getElementById('searchInput');
  var searchClear  = document.getElementById('searchClear');
  var searchStatus = document.getElementById('searchStatus');
  var noResults    = document.getElementById('noResults');
  var noResultsQ   = document.getElementById('noResultsQuery');
  var allCards     = document.querySelectorAll('.card');
  var allSections  = document.querySelectorAll('.topic-section');

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      var q = searchInput.value.trim().toLowerCase();
      if (searchClear) searchClear.style.display = q ? 'block' : 'none';

      if (!q) {
        allCards.forEach(function (c) { c.classList.remove('hidden-search'); });
        allSections.forEach(function (s) { s.classList.remove('hidden-search'); });
        if (noResults)    noResults.style.display = 'none';
        if (searchStatus) searchStatus.textContent = '';
        return;
      }

      var matchCount = 0;
      allSections.forEach(function (section) {
        var sectionText   = (section.dataset.section || '').toLowerCase();
        var cards         = section.querySelectorAll('.card');
        var sectionHasMatch = false;
        cards.forEach(function (card) {
          var title = (card.dataset.title || '').toLowerCase();
          var tags  = (card.dataset.tags  || '').toLowerCase();
          var match = title.includes(q) || tags.includes(q) || sectionText.includes(q);
          card.classList.toggle('hidden-search', !match);
          if (match) { sectionHasMatch = true; matchCount++; }
        });
        section.classList.toggle('hidden-search', !sectionHasMatch);
      });

      if (matchCount === 0) {
        if (noResults)  noResults.style.display = 'block';
        if (noResultsQ) noResultsQ.textContent  = q;
        if (searchStatus) searchStatus.textContent = '';
      } else {
        if (noResults)    noResults.style.display = 'none';
        if (searchStatus) searchStatus.textContent = matchCount + ' result' + (matchCount > 1 ? 's' : '') + ' found';
      }
    });

    if (searchClear) {
      searchClear.addEventListener('click', function () {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
      });
    }
  }

});