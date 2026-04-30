const root = document.documentElement;

// ── Theme slider wiring ──────────────────────────────────────────────────
function applyTheme(theme) {
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }

  // Update slider visual
  const sunOpt  = document.getElementById('opt-light');
  const moonOpt = document.getElementById('opt-dark');
  if (sunOpt && moonOpt) {
    sunOpt.classList.toggle('selected',  theme !== 'dark');
    moonOpt.classList.toggle('selected', theme === 'dark');
  }
}


// Apply immediately (before DOMContentLoaded) to avoid flash
const storedTheme = localStorage.getItem('theme') || 'light';
applyTheme(storedTheme);

// ── Wire up ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(storedTheme);

  const track = document.getElementById('theme-track');
  if (track) {
    track.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      applyTheme(next);
    });
  }
});
