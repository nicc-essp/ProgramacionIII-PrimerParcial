// TITULO
const editorTitulo = document.getElementById("editor-titulo");

editorTitulo.addEventListener("input", () => {
  const text = editorTitulo.innerText.trim();

  if (text.length === 0) {
    editorTitulo.innerHTML = "";
  }
});

//SUBTITULO
const editorParrafo = document.getElementById("editor-parrafo");

editorParrafo.addEventListener("input", () => {
  const text = editorParrafo.innerText.trim();

  if (text.length === 0) {
    editorParrafo.innerHTML = "";
  }
});