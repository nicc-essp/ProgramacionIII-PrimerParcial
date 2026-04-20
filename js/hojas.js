// TITULO
const editorTitulo = document.querySelector(".editor-titulo");

editorTitulo.addEventListener("input", () => {
  const text = editorTitulo.innerText.trim();

  if (text.length === 0) {
    editorTitulo.innerHTML = "";
  }
});
// FIN TITULO

// Longitud Real (normaliza saltos de línea múltiples)
function longitudReal(editor) {
  return editor.innerText
    .replace(/\n{2,}/g, "\n") // múltiples saltos → uno solo
    .replace(/^\n|\n$/g, "")  // saltos al inicio y final
    .length;
}
// Fin Longitud Real

// PARRAFO
const editorParrafo = document.querySelector(".editor-parrafo");

editorParrafo.addEventListener("keydown", (e) => {
  if (e.key.length > 1 && e.key !== "Enter") return;

  if (longitudReal(editorParrafo) >= 3160) {
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
  const espacioDisponible = 3160 - longitudReal(editor);

  let bloques = [];
  let textoRestante = textoPegado;

  bloques.push(textoRestante.substring(0, espacioDisponible));
  textoRestante = textoRestante.substring(espacioDisponible);

  while (textoRestante.length > 0) {
    bloques.push(textoRestante.substring(0, 3160));
    textoRestante = textoRestante.substring(3160);
  }

  document.execCommand("insertText", false, bloques[0]);

  let hojaRef = hojaActual;
  for (let i = 1; i < bloques.length; i++) {
    let siguienteHoja = hojaRef.nextElementSibling;

    if (!siguienteHoja || !siguienteHoja.classList.contains("hoja")) {
      agregarHoja();
      siguienteHoja = hojaRef.nextElementSibling;
    }

    const siguienteEditor = siguienteHoja.querySelector(".editor-parrafo");
    siguienteEditor.focus();
    document.execCommand("insertText", false, bloques[i]);

    hojaRef = siguienteHoja;
  }
});
// Fin Limitar Pegado

// FIN PARRAFO

// CONTADOR CARACTERES
function contarCaracteres(texto) {
  return longitudReal(texto);
}
// FIN CONTADOR CARACTERES

// CONTADOR PALABRAS
function contarPalabras(texto) {
  const contenido = texto.innerText.trim();

  if (contenido === "") return 0;

  return contenido.split(/\s+/).length;
}
// FIN CONTADOR PALABRAS

// CONTADOR
const palabrasSpan = document.querySelector(".contador-palabras");
const caracteresSpan = document.querySelector(".contador-caracteres");

editorParrafo.addEventListener("input", () => {
  palabrasSpan.textContent = contarPalabras(editorParrafo);
  caracteresSpan.textContent = contarCaracteres(editorParrafo);
});
// FIN CONTADOR

// CREAR HOJAS
const hoja = document.querySelector(".hoja");

function agregarHoja() {
  const hojas = document.querySelectorAll(".hoja");
  const nuevaHoja = hoja.cloneNode(true);

  const titulo = nuevaHoja.querySelector(".editor-titulo");
  titulo.innerHTML = "";
  titulo.style.display = "none";

  nuevaHoja.querySelector(".editor-parrafo").innerHTML = "";
  nuevaHoja.querySelector(".contador-hoja").textContent = `Hoja N.º${hojas.length + 1}`;
  nuevaHoja.querySelector(".contador-palabras").textContent = "0";
  nuevaHoja.querySelector(".contador-caracteres").textContent = "0";

  nuevaHoja.style.gridTemplateRows = "auto 1fr";

  hoja.parentNode.appendChild(nuevaHoja);

  nuevaHoja.querySelector(".editor-parrafo").focus();
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
  const caracteres = contarCaracteres(editor);

  hojaActual.querySelector(".contador-palabras").textContent = contarPalabras(editor);
  hojaActual.querySelector(".contador-caracteres").textContent = caracteres;

  const todasLasHojas = document.querySelectorAll(".hoja");
  const esUltimaHoja = hojaActual === todasLasHojas[todasLasHojas.length - 1];

  if (caracteres > 3160 && esUltimaHoja) {
    agregarHoja();
  }

  if (caracteres == 0 && esUltimaHoja) {
    eliminarHoja(hojaActual);
  }
});
// FIN CREAR HOJAS