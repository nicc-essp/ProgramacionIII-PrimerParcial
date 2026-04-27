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
// getBoundingClientRect() retorna un objeto con las coordenadas de la barra de tareas
// en defaultPos guardo los datos de la posicion en sus ejes x e y, ya que los demas datos son innecesarios
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
// evento que escucha al icono de arrastre y evita que el navegador ejecute su comportamiento por defecto, el cual causa bugs 
handle.addEventListener("dragstart", (e) => e.preventDefault());
// evento que escucha el click sobre el icono de arrastre
handle.addEventListener("pointerdown", (e) => {
  isDragging = true;

  const rect = contenedor.getBoundingClientRect();

  contenedor.style.position = "fixed";
  contenedor.style.left = `${rect.left}px`;
  contenedor.style.top = `${rect.top}px`;
  contenedor.style.transform = "none";
  // Calculo la distancia entre el click del usuario y el borde izquierdo/superior de la barra
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;
  // Esto es para asegurarnos de que el elemento siga recibiendo eventos del puntero incluso si el cursor se mueve rápidamente y sale del área del elemento.
  handle.setPointerCapture(e.pointerId);
});

document.addEventListener("pointermove", (e) => {
  // Si no inicio pointerdown (se clickeo el icono de arrastre), no se ejecuta el resto del codigo
  if (!isDragging) return;

  // Calculo la posicion de la barra (click del usuario(desde izquierda/arriba al click) - distancia al borde izquierdo/superior de la barra(desde izquierda/arriba al click))
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

const editorTitulo = document.querySelector(".editor-titulo");
const editorParrafo = document.querySelector(".editor-parrafo");

// Se eliminan variables y string activo de los botones al cambiar de foco para evitar desactivaciones a medias
editorTitulo.addEventListener("blur", () => {
  if (boldManual){
    boldBtn.classList.remove("active");
    boldManual = false;
    activeSpanBold = null;
  }
  if (italicManual) {
    italicBtn.classList.remove("active");
    italicManual = false;
    activeSpanItalic = null;
  }
  if (underlineManual) {
    underlineBtn.classList.remove("active");
    underlineManual = false;
    activeSpanUnderline = null;
  }
});

editorParrafo.addEventListener("blur", () => {
  if (boldManual){
    boldBtn.classList.remove("active");
    boldManual = false;
    activeSpanBold = null;
  }
  if (italicManual) {
    italicBtn.classList.remove("active");
    italicManual = false;
    activeSpanItalic = null;
  }
  if (underlineManual) {
    underlineBtn.classList.remove("active");
    underlineManual = false;
    activeSpanUnderline = null;
  }
});

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

// Estados globales Bold
let activeSpanBold = null;
let boldManual = false;

// Evento
boldBtn.addEventListener("click", () => setBold());

function setBold() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  //Si hay texto seleccionado, aplicamos o quitamos el subrayado solo a ese texto, sin afectar el modo manual ni otras partes del texto.
  if (!selection.isCollapsed) {
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    
    // Verificamos si ya está en negrita
    const yaTiene = spanPadre.closest("[style*='bold'], b, strong");

    if (yaTiene) {
      // Si ya tiene, usamos nuestra función de quitar
      quitBold();
    } else {
      // Si no tiene, aplicamos el nuevo span
      const span = document.createElement("span");
      span.style.fontWeight = "bold";
      
      // Usamos extractContents para mover el contenido al span
      span.appendChild(range.extractContents());
      range.insertNode(span);
      
      boldBtn.classList.add("active");
    }

    selection.removeAllRanges();
  } 
  
  // CASO B: Si no hay texto seleccionado, el botón de bold actúa como un toggle para un "modo escritura bold".
  else {
    if (boldBtn.classList.contains("active")) {
      quitBold(); // Apagamos el modo manual
    } else {
      // Activamos modo manual
      boldManual = true;
      boldBtn.classList.add("active");

      activeSpanBold = document.createElement("span");
      activeSpanBold.style.fontWeight = "bold";
      activeSpanBold.innerHTML = "&#xFEFF;"; // Carácter invisible para que el span no colapse

      range.insertNode(activeSpanBold);
      range.setStart(activeSpanBold.firstChild, 1); // Ponemos el cursor dentro del span
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function quitBold() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  
  if (!selection.isCollapsed) {
    // Si hay selección, buscamos el ancestro para "desenvolverlo"
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("[style*='bold'], b, strong");

    if (yaTiene) {
      // Reemplazamos el span por su propio contenido de texto sin formato
      const texto = document.createTextNode(yaTiene.innerHTML);
      const spanHTML = document.createElement("span");
      spanHTML.innerHTML = texto.textContent;
      yaTiene.parentNode.replaceChild(spanHTML, yaTiene);
    }
  } else {
    // Si es modo manual, simplemente saltamos fuera del span actual
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("[style*='bold'], b, strong");

    const normalSpan = document.createElement("span");
    normalSpan.style.fontWeight = "none";
    normalSpan.innerHTML = "&#xFEFF;";
    
    if (yaTiene) {
      const rangeAfter = document.createRange();
      rangeAfter.setStart(range.startContainer, range.startOffset);
      rangeAfter.setEndAfter(yaTiene);
      
      const contentAfter = rangeAfter.extractContents();
      yaTiene.after(normalSpan);
      
      const textLimpio = contentAfter.textContent.replace(/\uFEFF/g, '');
      if (textLimpio.length > 0) {
          const newBold = document.createElement("span");
          newBold.style.fontWeight = "bold";
          newBold.appendChild(contentAfter);
          normalSpan.after(newBold);
      }
    } else {
      range.insertNode(normalSpan);
    }
    
    range.setStart(normalSpan.firstChild, 1);
    range.collapse(true);
    
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Reset de estados
  boldBtn.classList.remove("active");
  boldManual = false;
  activeSpanBold = null;
}

// Estados globales Italic
let activeSpanItalic = null;
let italicManual = false;

// Evento
italicBtn.addEventListener("click", () => setItalic());

function setItalic() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  //Si hay texto seleccionado, aplicamos o quitamos la cursiva solo a ese texto, sin afectar el modo manual ni otras partes del texto.
  if (!selection.isCollapsed) {
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    
    // Verificamos si ya está en cursiva
    const yaTiene = spanPadre.closest("[style*='italic'], i, em");

    if (yaTiene) {
      // Si ya tiene, usamos nuestra función de quitar
      quitItalic();
    } else {
      // Si no tiene, aplicamos el nuevo span
      const span = document.createElement("span");
      span.style.fontStyle = "italic";
      
      // Usamos extractContents para mover el contenido al span
      span.appendChild(range.extractContents());
      range.insertNode(span);
      
      italicBtn.classList.add("active");
    }

    selection.removeAllRanges();
  } 
  
  // CASO B: Si no hay texto seleccionado, el botón de subrayado actúa como un toggle para un "modo escritura cursiva".
  else {
    if (italicBtn.classList.contains("active")) {
      quitItalic(); // Apagamos el modo manual
    } else {
      // Activamos modo manual
      italicManual = true;
      italicBtn.classList.add("active");

      activeSpanItalic = document.createElement("span");
      activeSpanItalic.style.fontStyle = "italic";
      activeSpanItalic.innerHTML = "&#xFEFF;"; // Carácter invisible para que el span no colapse

      range.insertNode(activeSpanItalic);
      range.setStart(activeSpanItalic.firstChild, 1); // Ponemos el cursor dentro del span
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function quitItalic() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  
  if (!selection.isCollapsed) {
    // Si hay selección, buscamos el ancestro para "desenvolverlo"
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("[style*='italic'], i, em");

    if (yaTiene) {
      // Reemplazamos el span por su propio contenido de texto sin formato
      const texto = document.createTextNode(yaTiene.innerHTML);
      const spanHTML = document.createElement("span");
      spanHTML.innerHTML = texto.textContent;
      yaTiene.parentNode.replaceChild(spanHTML, yaTiene);
    }
  } else {
    // Si es modo manual, simplemente saltamos fuera del span actual
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("[style*='italic'], i, em");

    const normalSpan = document.createElement("span");
    normalSpan.style.fontStyle = "none";
    normalSpan.innerHTML = "&#xFEFF;";
    
    if (yaTiene) {
      const rangeAfter = document.createRange();
      rangeAfter.setStart(range.startContainer, range.startOffset);
      rangeAfter.setEndAfter(yaTiene);
      
      const contentAfter = rangeAfter.extractContents();
      yaTiene.after(normalSpan);
      
      const textLimpio = contentAfter.textContent.replace(/\uFEFF/g, '');
      if (textLimpio.length > 0) {
          const newItalic = document.createElement("span");
          newItalic.style.fontStyle = "italic";
          newItalic.appendChild(contentAfter);
          normalSpan.after(newItalic);
      }
    } else {
      range.insertNode(normalSpan);
    }
    
    range.setStart(normalSpan.firstChild, 1);
    range.collapse(true);
    
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Reset de estados
  italicBtn.classList.remove("active");
  italicManual = false;
  activeSpanItalic = null;
}

// Estados globales Underline
let activeSpanUnderline = null;
let underlineManual = false;

// Evento
underlineBtn.addEventListener("click", () => setUnderline());

function setUnderline() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  //Si hay texto seleccionado, aplicamos o quitamos el subrayado solo a ese texto, sin afectar el modo manual ni otras partes del texto.
  if (!selection.isCollapsed) {
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    
    // Verificamos si ya está subrayado
    const yaTiene = spanPadre.closest("span[style*='text-decoration: underline'], u");

    if (yaTiene) {
      // Si ya tiene, usamos nuestra función de quitar
      quitUnderLine();
    } else {
      // Si no tiene, aplicamos el nuevo span
      const span = document.createElement("span");
      span.style.textDecoration = "underline";
      
      // Usamos extractContents para mover el contenido al span
      span.appendChild(range.extractContents());
      range.insertNode(span);
      
      underlineBtn.classList.add("active");
    }

    selection.removeAllRanges();
  } 
  
  // CASO B: Si no hay texto seleccionado, el botón de subrayado actúa como un toggle para un "modo escritura subrayada".
  else {
    if (underlineBtn.classList.contains("active")) {
      quitUnderLine(); // Apagamos el modo manual
    } else {
      // Activamos modo manual
      underlineManual = true;
      underlineBtn.classList.add("active");

      activeSpanUnderline = document.createElement("span");
      activeSpanUnderline.style.textDecoration = "underline";
      activeSpanUnderline.innerHTML = "&#xFEFF;"; // Carácter invisible para que el span no colapse

      range.insertNode(activeSpanUnderline);
      range.setStart(activeSpanUnderline.firstChild, 1); // Ponemos el cursor dentro del span
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function quitUnderLine() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  
  if (!selection.isCollapsed) {
    // Si hay selección, buscamos el ancestro para "desenvolverlo"
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("span[style*='text-decoration: underline'], u");

    if (yaTiene) {
      // Reemplazamos el span por su propio contenido de texto sin formato
      const texto = document.createTextNode(yaTiene.innerHTML);
      const spanHTML = document.createElement("span");
      spanHTML.innerHTML = texto.textContent;
      yaTiene.parentNode.replaceChild(spanHTML, yaTiene);
    }
  } else {
    // Si es modo manual, simplemente saltamos fuera del span actual
    const nodo = range.commonAncestorContainer;
    const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;
    const yaTiene = spanPadre.closest("span[style*='text-decoration: underline'], u");

    const normalSpan = document.createElement("span");
    normalSpan.style.textDecoration = "none";
    normalSpan.innerHTML = "&#xFEFF;";
    
    if (yaTiene) {
      const rangeAfter = document.createRange();
      rangeAfter.setStart(range.startContainer, range.startOffset);
      rangeAfter.setEndAfter(yaTiene);
      
      const contentAfter = rangeAfter.extractContents();
      yaTiene.after(normalSpan);
      
      const textLimpio = contentAfter.textContent.replace(/\uFEFF/g, '');
      if (textLimpio.length > 0) {
          const newUnderline = document.createElement("span");
          newUnderline.style.textDecoration = "underline";
          newUnderline.appendChild(contentAfter);
          normalSpan.after(newUnderline);
      }
    } else {
      range.insertNode(normalSpan);
    }
    
    range.setStart(normalSpan.firstChild, 1);
    range.collapse(true);
    
    selection.removeAllRanges();
    selection.addRange(range);
  }

  // Reset de estados
  underlineBtn.classList.remove("active");
  underlineManual = false;
  activeSpanUnderline = null;
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

  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const nodo = range.commonAncestorContainer;
  const spanPadre = nodo.nodeType === 3 ? nodo.parentElement : nodo;

  const tieneBold = spanPadre.closest("[style*='bold'], b, strong");
  if (tieneBold) {
    boldBtn.classList.add("active");
  } else if (!boldManual) {
    boldBtn.classList.remove("active");
  }

  const tieneItalic = spanPadre.closest("[style*='italic'], i, em");
  if (tieneItalic) {
    italicBtn.classList.add("active");
  } else if (!italicManual) {
    italicBtn.classList.remove("active");
  }

  const tieneUnderline = spanPadre.closest("[style*='underline'], u");
  if (tieneUnderline) {
    underlineBtn.classList.add("active");
  } else if (!underlineManual) {
    underlineBtn.classList.remove("active");
  }

});
// Fin Deteccion Estilos Al Seleccionar

// FIN FUNCION APLICAR ESTILOS

// FUNCION TAMAÑOS TEXTOS
const botones = document.querySelectorAll("#selector-tamaño i");

// Evito que se pierda la selección como en bold/italic
botones.forEach(btn => {
  btn.addEventListener("mousedown", (e) => e.preventDefault());
});

botones.forEach(btn => {
  btn.addEventListener("click", () => {
    // sacar active de todos
    botones.forEach(b => b.classList.remove("active"));

    // agregar al clickeado
    btn.classList.add("active");

    // Obtengo el tamaño desde data-size (si existe) o desde el CSS como fallback
    const size = btn.dataset.size || window.getComputedStyle(btn).fontSize;

    aplicarTamañoTexto(size);
  });
});

// Funcion que aplica el tamaño al texto
function aplicarTamañoTexto(size) {
  const seleccion = window.getSelection();
  if (!seleccion.rangeCount) return;

  const rango = seleccion.getRangeAt(0);

  if (!seleccion.isCollapsed) {
    // TEXTO SELECCIONADO
    const span = document.createElement("span");
    span.style.fontSize = size;

    const contenido = rango.extractContents();
    span.appendChild(contenido);
    rango.insertNode(span);

    seleccion.removeAllRanges();
  } else {
    // MODO ESCRITURA
    const span = document.createElement("span");
    span.style.fontSize = size;
    span.innerHTML = '\u200B';

    rango.insertNode(span);
    rango.setStart(span.firstChild, 1);
    rango.collapse(true);

    seleccion.removeAllRanges();
    seleccion.addRange(rango);
  }
}
// FIN FUNCION TAMAÑOS TEXTOS
 
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
