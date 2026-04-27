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
    localStorage.setItem("Titulo", Titulohtml.textContent);
    localStorage.setItem("Parrafo", Parrafohtml.textContent);

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
    Titulohtml.textContent = titulo;
    Parrafohtml.textContent = parrafo;

    cHojahtml.textContent = cHoja;
    cPalabrahtml.textContent = cPalabra;
    cCaractereshtml.textContent = cCaracteres;
}

//Se activa cuando el usuario usa ek input
Titulohtml.oninput = cargarDatos;
Parrafohtml.oninput = cargarDatos;