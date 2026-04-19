// ═══════════════════════════════════════════════
// UPSkillS — script.js (v2)
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Broken thumbnail fallback ──────────────────
  // If VIDEO_ID hasn't been replaced yet, the image
  // will 404. We just hide it so the card stays clean.
  document.querySelectorAll('.card-thumb img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });

  // ── Active nav highlight on scroll ────────────
  const sections = document.querySelectorAll('.topic-section[id]');
  const navLinks = document.querySelectorAll('.nav-topics a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.style.color = 'var(--cyan)';
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));

});

// ═══════════════════════════════════════════════
// HOW TO ADD A REAL VIDEO (per card):
//
// YouTube URL: https://www.youtube.com/watch?v=rfscVS0vtbw
//                                              ^^^^^^^^^^^
//                                              This is VIDEO_ID
//
// In index.html, find the card and replace:
//   href="YOUTUBE_LINK_HERE"
//     → href="https://www.youtube.com/watch?v=rfscVS0vtbw"
//
//   src="https://img.youtube.com/vi/VIDEO_ID/0.jpg"
//     → src="https://img.youtube.com/vi/rfscVS0vtbw/0.jpg"
//
// Thumbnail auto-loads. That's it!
// ═══════════════════════════════════════════════
