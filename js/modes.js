// FUNCION DARK MODE
const darkModeBtn = document.getElementById("icon-mode");

darkModeBtn.addEventListener("click", toggleDarkMode);

function toggleDarkMode() {
  if (document.body.classList.contains("dark-mode")) {
    document.body.classList.remove("dark-mode");
    darkModeBtn.classList.remove("active");
  } else {
    overlay.style.display = "none";
    nocturneModeBtn.classList.remove("active");

    document.body.classList.add("dark-mode");
    darkModeBtn.classList.add("active");
  }
}
// FIN FUNCION DARK MODE


// FUNCION LUZ NOCTURNA
const overlay = document.getElementById("nightOverlay");
const nocturneModeBtn = document.getElementById("icon-glass");

nocturneModeBtn.addEventListener("click", () => {
  toggleNightMode();
});

function toggleNightMode() {
  if (overlay.style.display !== "none") {
    overlay.style.display = "none";
    nocturneModeBtn.classList.remove("active");
  } else {
    document.body.classList.remove("dark-mode");
    darkModeBtn.classList.remove("active");

    overlay.style.display = "block";
    nocturneModeBtn.classList.add("active");
  }
}
// FIN FUNCION LUZ NOCTURNA