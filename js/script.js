 // FUNCION AGARRE
 const contenedor = document.getElementById("funciones");
 const handle = document.getElementById("icon-move-barra");
 const resetBtn = document.getElementById("icon-reset");
 
 const header = document.querySelector("header"); 
 
 let isDragging = false;
 let offsetX = 0;
 let offsetY = 0;
 
 // Posición inicial
 const defaultRect = contenedor.getBoundingClientRect();
 
 const defaultPos = {
   x: defaultRect.left,
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
 
   const maxX = window.innerWidth - contenedor.offsetWidth;
   const maxY = window.innerHeight - contenedor.offsetHeight;
 
   // Limites
   const minY = header.offsetHeight;
 
   newX = Math.max(0, Math.min(newX, maxX));
   newY = Math.max(minY, Math.min(newY, maxY));
 
   contenedor.style.left = `${newX}px`;
   contenedor.style.top = `${newY}px`;
 
   pos.x = newX;
   pos.y = newY;
 
   // Comprobacion Posicion
   const isInDefaultPosition =
     pos.x >= defaultPos.x - TOLERANCEX &&
     pos.x <= defaultPos.x + TOLERANCEX &&
     pos.y >= defaultPos.y - TOLERANCEY &&
     pos.y <= defaultPos.y + TOLERANCEY;
 
   console.log("¿Está en posición default?", isInDefaultPosition);
 
   if (!isInDefaultPosition) {
     resetBtn.classList.add("show");
   } else {
     resetBtn.classList.remove("show");
   }
 });
 
 document.addEventListener("pointerup", () => {
   isDragging = false;
 
   // Al Soltar "Agarre"
   
 });
 
 // FIN FUNCION AGARRE
 
 // FUNCION RESET POSICION
 resetBtn.addEventListener("click", () => {
   contenedor.classList.add("animate-reset");
 
   contenedor.style.left = `${defaultPos.x}px`;
   contenedor.style.top = `${defaultPos.y}px`;
 
   pos.x = defaultPos.x;
   pos.y = defaultPos.y;
 
   resetBtn.classList.remove("show");
 
   setTimeout(() => {
     contenedor.classList.remove("animate-reset");
   }, 900);
 });
 // FIN FUNCION RESET POSICION