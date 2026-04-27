// FUNCION DARK MODE
const darkModeBtn = document.getElementById("icon-mode");

darkModeBtn.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  // Alternar modo oscuro global
  document.body.classList.toggle("dark-mode");

  //  mantener estado visual (como hover)
  darkModeBtn.classList.toggle("active");
}
// FIN FUNCION DARK MODE


// FUNCION LUZ NOCTURNA
const overlay = document.getElementById("nightOverlay");
const nocturneModeBtn = document.getElementById("icon-glass");

nocturneModeBtn.addEventListener("click", () => {
  // Cambiar modo
  toggleNightMode();

  // Este también mantiene estado visual
  nocturneModeBtn.classList.toggle("active");
});

function toggleNightMode() {
  overlay.style.display =
    overlay.style.display === "none" ? "block" : "none";
}
// FIN FUNCION LUZ NOCTURNA