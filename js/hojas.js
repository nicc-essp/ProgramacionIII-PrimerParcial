// Espero a que cargue el DOM para evitar errores si otro JS carga antes
document.addEventListener("DOMContentLoaded", () => {

// TITULO
// Uso querySelector SOLO para la primera hoja
const editorTitulo = document.querySelector(".editor-titulo");

editorTitulo.addEventListener("input", () => {
  const text = editorTitulo.innerText.trim();

  if (text.length === 0) {
    editorTitulo.innerHTML = "";
  }
});
// FIN TITULO

// Detecta si el editor visualmente desborda la hoja
function desbordaHoja(editor) {
  return editor.scrollHeight > editor.clientHeight;
}
// Fin desbordaHoja

// PARRAFO
const editorParrafo = document.querySelector(".editor-parrafo");

editorParrafo.addEventListener("keydown", (e) => {
  if (e.key.length > 1 && e.key !== "Enter") return;

  if (desbordaHoja(editorParrafo)) {
    e.preventDefault();

    const hojaActual = editorParrafo.closest(".hoja");
    let hojasSiguiente = hojaActual.nextElementSibling;

    if (!hojasSiguiente || !hojasSiguiente.classList.contains("hoja")) {
      agregarHoja();
      hojasSiguiente = hojaActual.nextElementSibling;
    }

    const siguienteEditor = hojasSiguiente.querySelector(".editor-parrafo");
    siguienteEditor.focus();

    if (e.key === "Enter") {
      document.execCommand("insertParagraph", false);
    } else {
      document.execCommand("insertText", false, e.key);
    }
  }
});

editorParrafo.addEventListener("input", () => {
  const text = editorParrafo.innerText.trim();
  if (text.length === 0) {
    editorParrafo.innerHTML = "";
  }
});

// Limitar Pegado
document.querySelector(".espacio-hojas").addEventListener("paste", (e) => {
  const editor = e.target.closest(".editor-parrafo");
  if (!editor) return;

  e.preventDefault();

  const textoPegado = (e.clipboardData || window.clipboardData).getData("text");
  const hojaActual = editor.closest(".hoja");

  let hojaRef = hojaActual;
  let editorRef = editor;
  let i = 0;

  while (i < textoPegado.length) {
    const char = textoPegado[i];
    document.execCommand("insertText", false, char);

    if (desbordaHoja(editorRef)) {
      // Borrá el último caracter que causó el desborde
      document.execCommand("delete", false);

      let siguienteHoja = hojaRef.nextElementSibling;
      if (!siguienteHoja || !siguienteHoja.classList.contains("hoja")) {
        agregarHoja();
        siguienteHoja = hojaRef.nextElementSibling;
      }

      editorRef = siguienteHoja.querySelector(".editor-parrafo");
      editorRef.focus();

      // Aseguro que el cursor esté al final
      moverCursorAlFinal(editorRef);

      hojaRef = siguienteHoja;
    } else {
      i++;
    }
  }
});
// Fin Limitar Pegado

// FIN PARRAFO

// CONTADOR CARACTERES
function contarCaracteres(texto) {
  // Quito saltos de línea finales y TODOS los espacios en blanco
  const limpio = texto.innerText.replace(/\n$/, "").replace(/\s+/g, "");

  // Devuelvo solo la cantidad de caracteres reales (sin espacios)
  return limpio.length;
}
// FIN CONTADOR CARACTERES

// CONTADOR PALABRAS
function contarPalabras(texto) {
  const contenido = texto.innerText.trim();

  if (contenido === "") return 0;

  return contenido.split(/\s+/).length;
}
// FIN CONTADOR PALABRAS

// CREAR HOJAS
const hoja = document.querySelector(".hoja");

function agregarHoja() {
  const hojas = document.querySelectorAll(".hoja");
  // Clonar la hoja base
  const nuevaHoja = hoja.cloneNode(true);

  const titulo = nuevaHoja.querySelector(".editor-titulo");
  titulo.innerHTML = "";
  titulo.style.display = "none";

  // Limpiar contenido de la nueva hoja para que no copie texto
  nuevaHoja.querySelector(".editor-parrafo").innerHTML = "";
  nuevaHoja.querySelector(".contador-hoja").textContent = `Hoja N.º${hojas.length + 1}`;
  nuevaHoja.querySelector(".contador-palabras").textContent = "0 Palabras";
  nuevaHoja.querySelector(".contador-caracteres").textContent = "0 Caracteres";

  nuevaHoja.style.gridTemplateRows = "auto 1fr";

  hoja.parentNode.appendChild(nuevaHoja);

  const nuevoEditor = nuevaHoja.querySelector(".editor-parrafo");
  nuevoEditor.focus();

  // Cursor al inicio (como hoja nueva vacía)
  moverCursorAlFinal(nuevoEditor);
}

// Eliminar Hoja
function eliminarHoja(hojaAEliminar) {
  const hojas = document.querySelectorAll(".hoja");

  if (hojas.length === 1) return;

  const hojaAnterior = hojaAEliminar.previousElementSibling;
  const hojasSiguiente = hojaAEliminar.nextElementSibling;

  if (hojaAnterior && hojaAnterior.classList.contains("hoja")) {
    hojaAnterior.querySelector(".editor-parrafo").focus();
  } else if (hojasSiguiente && hojasSiguiente.classList.contains("hoja")) {
    hojasSiguiente.querySelector(".editor-parrafo").focus();
  }

  hojaAEliminar.remove();

  document.querySelectorAll(".hoja").forEach((h, i) => {
    h.querySelector(".contador-hoja").textContent = `Hoja N.º${i + 1}`;
  });
}
// Fin Eliminar Hoja

// Delegación de eventos en el contenedor padre
document.querySelector(".espacio-hojas").addEventListener("input", (e) => {
  const editor = e.target.closest(".editor-parrafo");
  if (!editor) return;

  const hojaActual = editor.closest(".hoja");
  // Ahora caracteres es un número real
  const caracteres = contarCaracteres(editor);

  // Armo el texto para mostrar (UI separada de lógica)
  const palabras = contarPalabras(editor);

  hojaActual.querySelector(".contador-palabras").textContent = palabras + " Palabras";
  hojaActual.querySelector(".contador-caracteres").textContent = caracteres + " Caracteres";

  const todasLasHojas = document.querySelectorAll(".hoja");
  const esUltimaHoja = hojaActual === todasLasHojas[todasLasHojas.length - 1];

  // Si desborda visualmente y es la última hoja, creá una nueva
  if (desbordaHoja(editor) && esUltimaHoja) {
    agregarHoja();
  }

  // Ahora sí funciona porque caracteres es número
  if (caracteres === 0 && esUltimaHoja) {
    eliminarHoja(hojaActual);
  }
});
// FIN CREAR HOJAS

}); // Cierro DOMContentLoaded