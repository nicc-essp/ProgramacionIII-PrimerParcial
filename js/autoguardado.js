console.log("EL SCRIPT CARGÓ");

//guardo los elementos del html 
let Titulohtml = document.querySelector(".editor-titulo"); //Titulo
let Parrafohtml = document.querySelector(".editor-parrafo"); //Parrafo

//Guardo los elementos del Contador
let cHojahtml = document.querySelector(".contador-hoja");
let cPalabrahtml = document.querySelector(".contador-palabras");
let cCaractereshtml = document.querySelector(".contador-caracteres");

//Si no hay datos guardados, los guardo por primera vez
if (localStorage.getItem("Titulo") === null) {
    cargarDatos();
} else {
    asignarValores();
}

function cargarDatos() {
    //Traigo y cargo los valores en el localStorage
    localStorage.setItem("Titulo", Titulohtml.innerHTML);
    localStorage.setItem("Parrafo", Parrafohtml.innerHTML);

    //Contador
    localStorage.setItem("cHoja", cHojahtml.textContent);
    localStorage.setItem("cPalabra", cPalabrahtml.textContent);
    localStorage.setItem("cCaracteres", cCaractereshtml.textContent);
}

function asignarValores() {
    //Creo las variables
    let titulo = localStorage.getItem("Titulo");
    let parrafo = localStorage.getItem("Parrafo");

    //Contador
    let cHoja = localStorage.getItem("cHoja");
    let cPalabra = localStorage.getItem("cPalabra");
    let cCaracteres = localStorage.getItem("cCaracteres");

    //Cargo los valores del localStorage al html
    Titulohtml.innerHTML = titulo;
    Parrafohtml.innerHTML = parrafo;

    cHojahtml.textContent = cHoja;
    cPalabrahtml.textContent = cPalabra;
    cCaractereshtml.textContent = cCaracteres;
}

// 1. Mantenemos el 'input' tradicional para el tipeo normal del teclado
Titulohtml.addEventListener("input", cargarDatos);
Parrafohtml.addEventListener("input", cargarDatos);

// 2. Creamos un "Observador" que detectará cuando barra-tareas.js modifique el DOM
const observador = new MutationObserver(() => {
    cargarDatos();
});

// 3. Le decimos qué tiene que vigilar: 
// childList (nuevos nodos como spans), attributes (cambios de style/alineación), characterData (texto), subtree (todo lo que pase adentro)
const configuracion = { childList: true, attributes: true, characterData: true, subtree: true };

// 4. Ponemos a vigilar al título y al párrafo
observador.observe(Titulohtml, configuracion);
observador.observe(Parrafohtml, configuracion);