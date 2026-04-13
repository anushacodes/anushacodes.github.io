const root = document.documentElement;

const applyTheme = (theme) => {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
  } else {
    root.removeAttribute("data-theme");
  }
};

// Apply stored theme before first paint
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  applyTheme(storedTheme);
}

// Wire up toggle button
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
});
