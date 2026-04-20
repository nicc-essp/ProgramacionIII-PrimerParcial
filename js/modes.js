// FUNCION DARK MODE
 const darkModeBtn = document.getElementById("icon-mode");
 darkModeBtn.addEventListener("click", toggleDarkMode);

  function toggleDarkMode() {
    var element = document.body;
      element.classList.toggle("dark-mode");
}
// FIN FUNCION DARK MODE

// FUNCION LUZ NOCTURNA
const overlay = document.getElementById("nightOverlay");
const nocturneModeBtn = document.getElementById("icon-glass");

nocturneModeBtn.addEventListener("click", () => {
  //Cambiar Modo
  toggleNightMode();

  //Verificar Modo Activo
  if (nocturneModeBtn.classList.contains("active")) {
    nocturneModeBtn.classList.remove("active");
  } else {
    nocturneModeBtn.classList.add("active");
  }
});


function toggleNightMode() {
  overlay.style.display = overlay.style.display === "none" ? "block" : "none";
}
// FIN FUNCION LUZ NOCTURNA