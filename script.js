// ═══════════════════════════════════════════════
// UPSkillS — script.js
// Minimal JS: fallback thumbnail on broken image
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Broken thumbnail fallback ──────────────────
  // If a YouTube thumbnail fails to load (e.g. VIDEO_ID not yet replaced),
  // replace it with a simple dark placeholder.
  const thumbs = document.querySelectorAll('.card-thumb img');

  thumbs.forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none'; // hide broken image icon
    });
  });

});

// ═══════════════════════════════════════════════
// HOW TO ADD A VIDEO:
//
// 1. Find the YouTube video you want.
// 2. Copy the video ID from the URL:
//    e.g. https://www.youtube.com/watch?v=rfscVS0vtbw
//                                            ^^^^^^^^^^^
//                                            This is the VIDEO_ID
//
// 3. In index.html, replace:
//    - YOUTUBE_LINK_HERE  →  https://www.youtube.com/watch?v=rfscVS0vtbw
//    - VIDEO_ID           →  rfscVS0vtbw
//
// That's it! Thumbnail auto-loads from YouTube.
// ═══════════════════════════════════════════════
