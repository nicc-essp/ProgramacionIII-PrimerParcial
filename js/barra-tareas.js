// FUNCION AGARRE
const contenedor = document.getElementById("funciones");
const handle = document.getElementById("icon-move-barra");
const resetBtn = document.getElementById("icon-reset");

const header = document.querySelector("header");

let isDragging = false;
let offsetX = 0;
let offsetY = 0;
let isVertical = false;

// Posición inicial (centrado real)
const defaultRect = contenedor.getBoundingClientRect();
const defaultPos = {
  x: defaultRect.left,  // left real del contenedor, no el centro de pantalla
  y: defaultRect.top
};

// Margen De Tolerancia
const TOLERANCEX = 80;
const TOLERANCEY = 30;

// Posición Actual
let pos = { x: defaultPos.x, y: defaultPos.y };

handle.addEventListener("dragstart", (e) => e.preventDefault());

handle.addEventListener("pointerdown", (e) => {
  isDragging = true;

  const rect = contenedor.getBoundingClientRect();

  contenedor.style.position = "fixed";
  contenedor.style.left = `${rect.left}px`;
  contenedor.style.top = `${rect.top}px`;
  contenedor.style.transform = "none";

  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  handle.setPointerCapture(e.pointerId);
});

document.addEventListener("pointermove", (e) => {
  if (!isDragging) return;

  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  // Si está en vertical, usar posición del cursor para decidir si sale
  // Si está en horizontal, usar newX para decidir si entra
  const deberiaSerVertical = isVertical
    ? !(e.clientX > 150 && e.clientX < window.innerWidth - 150)
    : newX <= 73 || newX >= 503;

    if (deberiaSerVertical && !isVertical) {
        isVertical = true;
        contenedor.classList.add("vertical");
        contenedor.style.opacity = "0"; // Ocultá mientras cambia
    
        requestAnimationFrame(() => {
          const maxX = window.innerWidth - contenedor.offsetWidth;
          const maxY = window.innerHeight - contenedor.offsetHeight;
          const minY = header.offsetHeight;
    
          const x = newX <= 73 ? 0 : maxX;
          const y = Math.max(minY, Math.min(e.clientY - contenedor.offsetHeight / 2, maxY));
    
          contenedor.style.left = `${x}px`;
          contenedor.style.top = `${y}px`;
          pos.x = x;
          pos.y = y;
    
          offsetX = e.clientX - x;
          offsetY = e.clientY - y;
    
          contenedor.style.opacity = "1"; // Mostralo en la nueva posición
        });
        return;
    
      } else if (!deberiaSerVertical && isVertical) {
        isVertical = false;
        contenedor.classList.remove("vertical");
        contenedor.style.opacity = "0"; 
    
        requestAnimationFrame(() => {
          const maxX = window.innerWidth - contenedor.offsetWidth;
          const maxY = window.innerHeight - contenedor.offsetHeight;
          const minY = header.offsetHeight;
    
          const x = Math.max(0, Math.min(e.clientX - contenedor.offsetWidth / 2, maxX));
          const y = Math.max(minY, Math.min(e.clientY - contenedor.offsetHeight / 2, maxY));
    
          contenedor.style.left = `${x}px`;
          contenedor.style.top = `${y}px`;
          pos.x = x;
          pos.y = y;
    
          offsetX = e.clientX - x;
          offsetY = e.clientY - y;
    
          contenedor.style.opacity = "1"; // Mostralo en la nueva posición
        });
        return;
      }

  // Movimiento normal
  const maxX = window.innerWidth - contenedor.offsetWidth;
  const maxY = window.innerHeight - contenedor.offsetHeight;
  const minY = header.offsetHeight;

  if (isVertical) {
    const enBordeIzquierdo = pos.x === 0;
    const x = enBordeIzquierdo
      ? (e.clientX > 150 ? maxX : 0)   // desde izquierda: cambia si cursor > 150
      : (e.clientX < window.innerWidth - 150 ? 0 : maxX); // desde derecha: cambia si cursor < innerWidth-150

    newY = Math.max(minY, Math.min(newY, maxY));

    contenedor.style.left = `${x}px`;
    contenedor.style.top = `${newY}px`;
    pos.x = x;
    pos.y = newY;
  } else {
    newX = Math.max(0, Math.min(newX, maxX));
    newY = Math.max(minY, Math.min(newY, maxY));

    contenedor.style.left = `${newX}px`;
    contenedor.style.top = `${newY}px`;
    pos.x = newX;
    pos.y = newY;
  }

  // Comprobacion Posicion Default
  const isInDefaultPosition =
    pos.x >= defaultPos.x - TOLERANCEX &&
    pos.x <= defaultPos.x + TOLERANCEX &&
    pos.y >= defaultPos.y - TOLERANCEY &&
    pos.y <= defaultPos.y + TOLERANCEY;

  if (!isInDefaultPosition) {
    resetBtn.classList.add("show");
  } else {
    resetBtn.classList.remove("show");
  }
});

document.addEventListener("pointerup", () => {
  isDragging = false;
});

// FIN FUNCION AGARRE
 
// FUNCION RESET POSICION
function resetPosicion() {
  contenedor.classList.remove("vertical");
  isVertical = false;
  contenedor.style.transform = "none";

  requestAnimationFrame(() => {
    const centroX = (window.innerWidth - contenedor.offsetWidth) / 2;

    contenedor.classList.add("animate-reset");

    contenedor.style.left = `${centroX}px`;
    contenedor.style.top = `${defaultPos.y}px`;

    pos.x = centroX;
    pos.y = defaultPos.y;

    resetBtn.classList.remove("show");

    setTimeout(() => {
      contenedor.classList.remove("animate-reset");
    }, 900);
  });
}

resetBtn.addEventListener("click", resetPosicion);
// FIN FUNCION RESET POSICION

// FUNCION APLICAR ESTILOS
const boldBtn = document.getElementById("bold-icon");
const italicBtn = document.getElementById("italic-icon");
const underlineBtn = document.getElementById("underline-icon");

boldBtn.addEventListener("mousedown", (e) => {
  e.preventDefault();
});

//Bold
let activeSpanBold = null;
boldBtn.addEventListener("click", () => setBold());

//Italic
let activeSpanItalic = null;
italicBtn.addEventListener("click", () => setItalic());

//Underline
let activeSpanUnderline = null;
underlineBtn.addEventListener("click", () => setUnderline());

function setBold() {
  if (boldBtn.classList.contains("active")) {
    boldBtn.classList.remove("active")
    
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    range.setStartAfter(activeSpanBold);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    activeSpanBold = null;
  } else {
    boldBtn.classList.add("active")
    
    if (!activeSpanBold){
      activeSpanBold = document.createElement("span");
      activeSpanBold.style.fontWeight = "bold";

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      range.insertNode(activeSpanBold);
      range.setStart(activeSpanBold, 0);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function setItalic() {
  if (italicBtn.classList.contains("active")) {
    italicBtn.classList.remove("active")
    
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    range.setStartAfter(activeSpanItalic);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    activeSpanItalic = null;
  } else {
    italicBtn.classList.add("active")
    
    if (!activeSpanItalic){
      activeSpanItalic = document.createElement("span");
      activeSpanItalic.style.fontStyle = "italic";

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      range.insertNode(activeSpanItalic);
      range.setStart(activeSpanItalic, 0);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function setUnderline() {
  if (underlineBtn.classList.contains("active")) {
    underlineBtn.classList.remove("active")
    
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    range.setStartAfter(activeSpanUnderline);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);

    activeSpanUnderline = null;
  } else {
    underlineBtn.classList.add("active")
    
    if (!activeSpanUnderline){
      activeSpanUnderline = document.createElement("span");
      activeSpanUnderline.style.textDecoration = "underline";

      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      range.insertNode(activeSpanUnderline);
      range.setStart(activeSpanUnderline, 0);
      range.collapse(true);

      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}
// FIN FUNCION APLICAR ESTILOS

// FUNCION TAMAÑOS TEXTOS
const botones = document.querySelectorAll("#selector-tamaño i");


botones.forEach(btn => {
  btn.addEventListener("click", () => {
    
    // sacar active de todos
    botones.forEach(b => b.classList.remove("active"));

    // agregar al clickeado
    btn.classList.add("active");
  });
});
// FIN FUNCION TAMAÑOS TEXTOS

// FUNCION COLOR TEXTOS
const picker = document.getElementById("selector-color");
const texto = document.getElementById("color-actual");

picker.addEventListener("input", () => {
  texto.style.color = picker.value;
  texto.textContent = picker.value;
  texto.textContent = texto.textContent.toUpperCase();

  if (document.body.classList.contains("dark-mode")) {
    if (esColorOscuro(picker.value)) {
      texto.style.color = "#ffffff"
    }
  } else {
    if (esColorClaro(picker.value)) {
      texto.style.color = "#000000"
    }
  }

});

//Comprobacion Color Claro
function esColorClaro(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  // fórmula de luminancia
  const luminancia = (0.299 * r + 0.587 * g + 0.114 * b);

  return luminancia > 186; // Umbral
}
// Fin Comprobacion Color Claro

//Comprobacion Color Oscuro
function esColorOscuro(hex) {
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);

  return r < 100 && g < 100 && b < 100;
}
//Fin Comprobacion Color Oscuro
// FIN FUNCION COLOR TEXTOS

 
// OCULTAR BARRA
const zonaOcultar = document.getElementById("zona-ocultar-barra");
const txtOcultar = document.getElementById("txt-ocultar");
const espacioHoja = document.querySelector(".espacio-hojas"); // puede ser null dependiendo de la página
const recuperarTxt = document.getElementById("mostar-barra");

let sobreZona = false;

handle.addEventListener("mousedown", () => {
  zonaOcultar.classList.add("visible");
});

document.addEventListener("mouseup", () => {
  zonaOcultar.classList.remove("visible");

  // Ocultar
  if (sobreZona) {
    contenedor.classList.add("oculto");
    resetBtn.classList.add("oculto");
    recuperarTxt.classList.add("mostrar");
    logo.classList.add("recuperar-barra");
    if (espacioHoja) {
      espacioHoja.style.paddingTop = "0px";
    }
  }
});

document.addEventListener("mousemove", () => {
  const zonaRect = zonaOcultar.getBoundingClientRect();
  const handleRect = handle.getBoundingClientRect();

  const overlap = !(
    handleRect.right < zonaRect.left ||
    handleRect.left > zonaRect.right ||
    handleRect.bottom < zonaRect.top ||
    handleRect.top > zonaRect.bottom
  );

  if (overlap) {
    sobreZona = true;

    contenedor.classList.add("por-ocultar");
    zonaOcultar.classList.add("por-ocultar");
    txtOcultar.textContent = "Solta para ocultar";

  } else {
    sobreZona = false;

    contenedor.classList.remove("por-ocultar");
    zonaOcultar.classList.remove("por-ocultar");
    txtOcultar.textContent = "Arrastra para ocultar";
  }
});
// FIN OCULTAR BARRA

// MOSTRAR BARRA
const logo = document.getElementById("header-centro");

logo.addEventListener("click", () => {

  if (contenedor.classList.contains("oculto")) {
    contenedor.classList.remove("oculto");
    resetBtn.classList.remove("oculto");
    recuperarTxt.classList.remove("mostrar");
    if (espacioHoja) {
      espacioHoja.style.paddingTop = "80px";
    }

    resetPosicion()
  }

});
// FIN MOSTRAR BARRA
