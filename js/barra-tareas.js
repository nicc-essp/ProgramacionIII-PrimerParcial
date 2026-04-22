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

boldBtn.addEventListener("mousedown", (e) => e.preventDefault());
italicBtn.addEventListener("mousedown", (e) => e.preventDefault());
underlineBtn.addEventListener("mousedown", (e) => e.preventDefault());

// Helpers
function tieneEstilo(spanPadre, propiedad, valor) {
  return spanPadre.closest(`span[style*='${propiedad}: ${valor}']`);
}

function aplicarEstilo(propiedad, valor) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  if (!selection.isCollapsed) {
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = tieneEstilo(spanPadre, propiedad, valor);

    if (yaTiene) {
      // Quitá el estilo solo al texto seleccionado
      const textoSinEstilo = document.createTextNode(range.toString());
      range.deleteContents();
      range.insertNode(textoSinEstilo);
    } else {
      // Aplicá el estilo solo al texto seleccionado
      const span = document.createElement("span");
      span.style[propiedad === "font-weight" ? "fontWeight" :
                  propiedad === "font-style" ? "fontStyle" :
                  "textDecoration"] = valor;
      const contenido = range.extractContents();
      span.appendChild(contenido);
      range.insertNode(span);
    }

    selection.removeAllRanges();

  } else {
    // Modo escritura: toggle
    return { toggle: true };
  }
}

// Bold
let activeSpanBold = null;
let boldManual = false;
boldBtn.addEventListener("click", () => setBold());

function setBold() {
  if (activeSpanItalic || italicManual || activeSpanUnderline || underlineManual) return;

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  if (!selection.isCollapsed) {
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("span[style*='font-weight: bold']") ||
                    spanPadre.closest("b") ||
                    spanPadre.closest("strong");

    if (yaTiene) {
      const textoSinEstilo = document.createTextNode(range.toString());
      range.deleteContents();
      range.insertNode(textoSinEstilo);
      boldBtn.classList.remove("active");
      activeSpanBold = null;
      boldManual = false;
    } else {
      const span = document.createElement("span");
      span.style.fontWeight = "bold";
      const contenido = range.extractContents();
      span.appendChild(contenido);
      range.insertNode(span);
      activeSpanBold = span;
      boldBtn.classList.add("active");
      boldManual = false;
    }

    selection.removeAllRanges();
    selection.addRange(range);

    activeSpanBold = null;
  } else {
    if (boldBtn.classList.contains("active")) {
      boldManual = false;
      boldBtn.classList.remove("active");

      if (activeSpanBold) {
        const r = selection.getRangeAt(0);
        r.setStartAfter(activeSpanBold);
        r.collapse(true);
        selection.removeAllRanges();
        selection.addRange(r);
        activeSpanBold = null;
      }
    } else {
      boldManual = true;
      boldBtn.classList.add("active");

      activeSpanBold = document.createElement("span");
      activeSpanBold.style.fontWeight = "bold";

      const r = selection.getRangeAt(0);
      r.insertNode(activeSpanBold);
      r.setStart(activeSpanBold, 0);
      r.collapse(true);

      selection.removeAllRanges();
      selection.addRange(r);
    }
  }
}

// Italic
let activeSpanItalic = null;
let italicManual = false;
italicBtn.addEventListener("click", () => setItalic());

function setItalic() {
  if (activeSpanBold || boldManual || activeSpanUnderline || underlineManual) return;

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  if (!selection.isCollapsed) {
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("span[style*='font-style: italic']") ||
                    spanPadre.closest("i") ||
                    spanPadre.closest("em");

    if (yaTiene) {
      const textoSinEstilo = document.createTextNode(range.toString());
      range.deleteContents();
      range.insertNode(textoSinEstilo);
      italicBtn.classList.remove("active");
      activeSpanItalic = null;
      italicManual = false;
    } else {
      const span = document.createElement("span");
      span.style.fontStyle = "italic";
      const contenido = range.extractContents();
      span.appendChild(contenido);
      range.insertNode(span);
      activeSpanItalic = span;
      italicBtn.classList.add("active");
      italicManual = false;
    }

    selection.removeAllRanges();
    selection.addRange(range);

    activeSpanItalic = null;
  } else {
    if (italicBtn.classList.contains("active")) {
      italicManual = false;
      italicBtn.classList.remove("active");

      if (activeSpanItalic) {
        const r = selection.getRangeAt(0);
        r.setStartAfter(activeSpanItalic);
        r.collapse(true);
        selection.removeAllRanges();
        selection.addRange(r);
        activeSpanItalic = null;
      }
    } else {
      italicManual = true;
      italicBtn.classList.add("active");

      activeSpanItalic = document.createElement("span");
      activeSpanItalic.style.fontStyle = "italic";

      const r = selection.getRangeAt(0);
      r.insertNode(activeSpanItalic);
      r.setStart(activeSpanItalic, 0);
      r.collapse(true);

      selection.removeAllRanges();
      selection.addRange(r);
    }
  }
}

// Underline
let activeSpanUnderline = null;
let underlineManual = false;
underlineBtn.addEventListener("click", () => setUnderline());

function setUnderline() {
  if (activeSpanBold || boldManual || activeSpanItalic || italicManual) return;

  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  if (!selection.isCollapsed) {
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("span[style*='text-decoration: underline']") ||
                    spanPadre.closest("u");

    if (yaTiene) {
      const textoSinEstilo = document.createTextNode(range.toString());
      range.deleteContents();
      range.insertNode(textoSinEstilo);
      underlineBtn.classList.remove("active");
      activeSpanUnderline = null;
      underlineManual = false;
    } else {
      const span = document.createElement("span");
      span.style.textDecoration = "underline";
      const contenido = range.extractContents();
      span.appendChild(contenido);
      range.insertNode(span);
      activeSpanUnderline = span;
      underlineBtn.classList.add("active");
      underlineManual = false;
    }

    selection.removeAllRanges();
    selection.addRange(range);

    activeSpanUnderline = null;
  } else {
    if (underlineBtn.classList.contains("active")) {
      underlineManual = false;
      underlineBtn.classList.remove("active");

      if (activeSpanUnderline) {
        const r = selection.getRangeAt(0);
        r.setStartAfter(activeSpanUnderline);
        r.collapse(true);
        selection.removeAllRanges();
        selection.addRange(r);
        activeSpanUnderline = null;
      }
    } else {
      underlineManual = true;
      underlineBtn.classList.add("active");

      activeSpanUnderline = document.createElement("span");
      activeSpanUnderline.style.textDecoration = "underline";

      const r = selection.getRangeAt(0);
      r.insertNode(activeSpanUnderline);
      r.setStart(activeSpanUnderline, 0);
      r.collapse(true);

      selection.removeAllRanges();
      selection.addRange(r);
    }
  }
}

//ALINEAR TEXTOS
function alinearTexto(alineacion) {
  // Detecto que tiene seleccionado el usuario con el mouse 
  const seleccion = window.getSelection();
  if (seleccion.rangeCount > 0){
    // Obtengo el rango de donde hasta donde selecciono
    const rango = seleccion.getRangeAt(0);
    // Obtengo el contenedor del texto seleccionado
    let contenedor = rango.commonAncestorContainer;
    // Si lo que seleccionamos es texto puro, subimos al elemento padre
    if (contenedor.nodeType === Node.TEXT_NODE) {
      contenedor = contenedor.parentElement;
    }
    // Buscamos el editor más cercano (ya sea el título o el párrafo)
    const editor = contenedor.closest('[contenteditable="true"]');
    if (editor) {
      // Aplicamos el estilo directamente al elemento
      // alineacion puede ser: 'left', 'center', 'right'
      editor.style.textAlign = alineacion;
    }
  }
}

// Botones De Alineacion
const btnAlignIzq = document.querySelector("#btn-align-izquierda");
const btnAlignCen = document.querySelector("#btn-align-centro");
const btnAlignDer = document.querySelector("#btn-align-derecha");

// Array Para Manejar El Active De Un Solo Boton A La Vez
const botonesAlineacion = [btnAlignIzq, btnAlignCen, btnAlignDer];

// Alinear Izquierda
btnAlignIzq.addEventListener("click", () => {
  // Desactivá todos antes de activar el clickeado
  botonesAlineacion.forEach(b => b.classList.remove("active"));
  btnAlignIzq.classList.add("active");
  alinearTexto("left");
});

// Alinear Centro
btnAlignCen.addEventListener("click", () => {
  // Desactivá todos antes de activar el clickeado
  botonesAlineacion.forEach(b => b.classList.remove("active"));
  btnAlignCen.classList.add("active");
  alinearTexto("center");
});

// Alinear Derecha
btnAlignDer.addEventListener("click", () => {
  // Desactivá todos antes de activar el clickeado
  botonesAlineacion.forEach(b => b.classList.remove("active"));
  btnAlignDer.classList.add("active");
  alinearTexto("right");
});
// FIN ALINEAR TEXTOS

// Deteccion Estilos Al Seleccionar
document.addEventListener("selectionchange", () => {
  const selection = window.getSelection();

  if (!selection.rangeCount || selection.isCollapsed) {
    if (!boldManual) boldBtn.classList.remove("active");
    if (!italicManual) italicBtn.classList.remove("active");
    if (!underlineManual) underlineBtn.classList.remove("active");
    return;
  }

  const range = selection.getRangeAt(0);
  const nodo = range.commonAncestorContainer;
  const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;

  const tieneBold = spanPadre.closest("span[style*='font-weight: bold']") ||
                    spanPadre.closest("b") || spanPadre.closest("strong");
  tieneBold ? boldBtn.classList.add("active") : boldBtn.classList.remove("active");

  const tieneItalic = spanPadre.closest("span[style*='font-style: italic']") ||
                      spanPadre.closest("i") || spanPadre.closest("em");
  tieneItalic ? italicBtn.classList.add("active") : italicBtn.classList.remove("active");

  const tieneUnderline = spanPadre.closest("span[style*='text-decoration: underline']") ||
                         spanPadre.closest("u");
  tieneUnderline ? underlineBtn.classList.add("active") : underlineBtn.classList.remove("active");

});
// Fin Deteccion Estilos Al Seleccionar

// FIN FUNCION APLICAR ESTILOS

/// FUNCION TAMAÑO
const size1Btn = document.getElementById("size1");
const size2Btn = document.getElementById("size2");
const size3Btn = document.getElementById("size3");

const sizeBtns = [size1Btn, size2Btn, size3Btn];
const sizes = ["13px", "18px", "25px"];

let activeSpanSize = null;

function setFontSize(size) {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  if (!selection.isCollapsed) {
    const contenedor = range.commonAncestorContainer;
    const spanPadre = contenedor.nodeType === 3
      ? contenedor.parentElement
      : contenedor;

    const yaTieneTamaño = spanPadre.closest("span[style*='font-size']");

    if (yaTieneTamaño) {
      if (yaTieneTamaño.style.fontSize === size) {
        const texto = document.createTextNode(yaTieneTamaño.innerText);
        yaTieneTamaño.replaceWith(texto);
        return;
      }
      yaTieneTamaño.style.fontSize = size;
      return;
    }

    const spanSize = document.createElement("span");
    spanSize.style.fontSize = size;

    const contenidoSeleccionado = range.extractContents();
    spanSize.appendChild(contenidoSeleccionado);
    range.insertNode(spanSize);

    selection.removeAllRanges();

  } else {
    if (activeSpanSize) {
      const range = selection.getRangeAt(0);
      range.setStartAfter(activeSpanSize);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      activeSpanSize = null;
    }

    activeSpanSize = document.createElement("span");
    activeSpanSize.style.fontSize = size;

    const range2 = selection.getRangeAt(0);
    range2.insertNode(activeSpanSize);
    range2.setStart(activeSpanSize, 0);
    range2.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range2);
  }
}

sizeBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {

    if (btn.classList.contains("active")) {
      btn.classList.remove("active");

      const selection = window.getSelection();
      if (selection.rangeCount && !selection.isCollapsed) {
        const range = selection.getRangeAt(0);
        const contenedor = range.commonAncestorContainer;
        const spanPadre = contenedor.nodeType === 3
          ? contenedor.parentElement
          : contenedor;

        const yaTieneTamaño = spanPadre.closest("span[style*='font-size']");
        if (yaTieneTamaño) {
          const texto = document.createTextNode(yaTieneTamaño.innerText);
          yaTieneTamaño.replaceWith(texto);
        }
      }
      return;
    }

    sizeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    setFontSize(sizes[index]);
  });
});
// FIN FUNCION TAMAÑO

// FUNCION COLOR TEXTOS
const picker = document.getElementById("selector-color");
const texto = document.getElementById("color-actual");
let activeSpanColor = null;
let colorManual = false;
let savedRange = null;

// Escuchamos 'pointerdown' (que ocurre antes del clic normal).
// Esto sirve para guardar DÓNDE estaba el cursor parpadeando ANTES de que
// se abra el menú de colores y el editor pierda el foco por completo.
picker.addEventListener("pointerdown", () => {
  const seleccion = window.getSelection();
  if (seleccion.rangeCount > 0) {
    savedRange = seleccion.getRangeAt(0).cloneRange();
  }
});

picker.addEventListener("input", () => {
  texto.style.color = picker.value;
  texto.textContent = picker.value;
  texto.textContent = texto.textContent.toUpperCase();

  setColorFont();

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

// Evento 'change' ocurre cuando el usuario confirma el color y cierra la paleta.
picker.addEventListener("change", () => {
  if (savedRange) {
    // Buscamos el editor de texto basándonos en dónde estaba el cursor antes.
    const node = savedRange.commonAncestorContainer;
    let editor = null;
    
    // nodeType === Node.TEXT_NODE (3) significa que es texto puro, por ende buscamos en su elemento "padre"
    // Node.ELEMENT_NODE (1) significa que es una etiqueta HTML (ej: un span, un div)
    if (node.nodeType === Node.TEXT_NODE) {
      editor = node.parentElement.closest('[contenteditable="true"]');
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      editor = node.closest('[contenteditable="true"]');
    }

    // Le devolvemos el "foco" al editor automáticamente para evitar que el usuario 
    // tenga que hacer clic y mover accidentalmente el cursor fuera del <span> que acabamos de crear.
    if (editor) {
      editor.focus();
    }
    
    // Restauramos el cursor exactamente a la posición donde lo dejamos.
    const seleccion = window.getSelection();
    seleccion.removeAllRanges();
    seleccion.addRange(savedRange);
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

// Funcion que cambia el color de la fuente
function setColorFont(){
  // Obtengo el texto seleccionado con el mouse
  let seleccion = window.getSelection();

  // Si no hay rango seleccionado, intentamos recuperar el que guardamos en 'pointerdown'
  if (!seleccion.rangeCount && savedRange) {
    seleccion.removeAllRanges();
    seleccion.addRange(savedRange);
  }

  // Si no hay texto seleccionado, salgo de la función
  if (!seleccion.rangeCount) return;
  // 
  const rango = seleccion.getRangeAt(0);
  const color = picker.value; // Obtiene el color del picker
 
  if (!seleccion.isCollapsed) {
    // Hay texto seleccionado.
    // Si ya le habíamos puesto color y el usuario sigue arrastrando el selector, 
    // simplemente le cambiamos el color al mismo span para no crear spans duplicados.
    if (activeSpanColor && (rango.commonAncestorContainer === activeSpanColor || rango.commonAncestorContainer.parentElement === activeSpanColor)) {
      activeSpanColor.style.color = color;
      return;
    }

    // Creamos el span que envolverá al texto seleccionado.
    const span = document.createElement("span");
    span.style.color = color;
    const contenido = rango.extractContents();
    span.appendChild(contenido);
    rango.insertNode(span);
    
    // Volvemos a seleccionar el span recién creado para que si el usuario sigue arrastrando el color,
    // el código se dé cuenta de que seguimos editando el mismo pedazo de texto.
    seleccion.removeAllRanges();
    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    seleccion.addRange(newRange);
    
    activeSpanColor = span;
  }else {
    // Sin texto seleccionado - modo escritura (cursor parpadeando)
    
    // Verificamos si el cursor sigue adentro del span vacío que creamos.
    const isCursorInsideActiveSpan = activeSpanColor && (
      rango.startContainer === activeSpanColor ||
      rango.startContainer.parentElement === activeSpanColor ||
      rango.startContainer.parentNode === activeSpanColor
    );

    // Si ya creamos un span vacío con el "espacio invisible" y el cursor sigue ahí, 
    // solo le actualizamos el color en vez de crear otro span.
    if (isCursorInsideActiveSpan && activeSpanColor.innerHTML === '\u200B') {
      activeSpanColor.style.color = color;
      return;
    }

    // Creamos un span nuevo
    activeSpanColor = document.createElement("span");
    activeSpanColor.style.color = color;
    // '\u200B' es un "Zero-width space" (espacio de ancho nulo).
    // Es un truco muy común: los navegadores ignoran los spans 100% vacíos cuando tipeás,
    // pero si ponemos este caracter invisible, obligamos al navegador a mantener el cursor adentro.
    activeSpanColor.innerHTML = '\u200B';

    rango.insertNode(activeSpanColor);
    // Ponemos el cursor justo después del caracter invisible (en la posición 1 del text node)
    rango.setStart(activeSpanColor.firstChild, 1);
    rango.collapse(true);

    // Limpiamos y aplicamos esta nueva posición del cursor
    seleccion.removeAllRanges();
    seleccion.addRange(rango);

    // Actualizamos nuestro rango guardado por si cierra el color picker ahora mismo
    savedRange = rango.cloneRange();
  }
}
 
// OCULTAR BARRA
const zonaOcultar = document.getElementById("zona-ocultar-barra");
const txtOcultar = document.getElementById("txt-ocultar");
const espacioHoja = document.querySelector(".espacio-hojas");
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
    espacioHoja.style.paddingTop = "0px";
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
    espacioHoja.style.paddingTop = "80px";

    resetPosicion()
  }

});
// FIN MOSTRAR BARRA
