# Desarrollo y documentación técnica

## 1. Descripción del Proyecto
Un editor de texto ligero y sin distracciones, creado con HTML5, CSS3 y Javascript ES2026. El objetivo es ofrecer una experiencia de escritura comoda y silenciosa a escritores que valoran las interfaces limpias y el rendimiento.

## 2. Tecnologías

Frontend: HTML5

Estilo: CSS3 Vainilla (estética minimalista)

Logica de Programación: Javascript (Manipulacion del DOM & API de Archivos)

## 3. Funcionalidades & Requisitos

| Funcionalidad | Prioridad   | Estado |
|---------------|-------------|--------|
| Diseño con Flexbox | Obligatorio | En Desarrollo 🟡 |
| Barra de herramientas basica(Fuente, Tamaño, Negrita, Cursiva, Alineación) | Obligatorio | En desarrollo 🟡 |
| Area de texto | Obligatorio | Listo 🟢 |
| Diseño Responsivo | Alta | Pendiente 🔴 |
| Autoguardado local | Alta | Pendiente 🔴 |
| Modo Oscuro | Media | Listo 🟢 |
| Modo Cuidado Visual | Media | Listo 🟢 |
| Contador de palabras  | Baja | Listo 🟢 |

## 4. Arquitectura y estructura de carpetas
    ProgramacionIII-PrimerParcial/  
    │── index.html                 # Estructura de la app
    ├── asssets/                   # Recursos utilizables (imagenes,videos,favicons,etc)
    │   │── img/  
    │   └── favicon/  
    ├── css/                        # Diseño visual 
    │   ├── index.css  
    │   └── components/             # Elementos de la interfaz de usuario (botones, ventanas modales, EditorCanvas)
    │── js/
    │   └── script.js               # Interaccion con el DOM
    │── pages/  
    │── DOCUMENTATION.md            # Documentacion Tecnica para el equipo de desarrollo (mapa de ruta, metodologia,etc)
    └── README.md                   # Documentacion general para usuarios finales de la app

## 5. Flujo de trabajo y reglas de contribución
### Para mantener el repositorio organizado entre los seis, seguimos estas reglas:

### Estrategia de ramificación: 
#### * main: Código en su version estable y completa (V1.0).

#### * release/x.0 : Preparacion de una nueva version. Se crea cuando develop tiene suficientes funcionalidades para una entrega y sirve para corregir errores         menores durante la revision, ajustar numeros de version, actualizar documentacion y **IMPORTANTE: no agregar funcionalidades nuevas**.

#### * develop: rama de desarrollo

#### * feature/nombre-de-la-funcionalidad: Para crear nuevas funcionalidades

#### * hotfix: Correcion urgente de un error que se encuentra en main.

#### * commits: Utilizar titulos descriptivos. Ejemplo: feature: implemente la logica del contador de palabras.

#### * Revisiones de Pull Requests (PR): Al menos un compañero de equipo debe revisar una solicitud de incorporacion de cambios antes de fusionarla (merge) con develop.


## 6. Hoja de ruta

### Para organizar las tareas, el proyecto se divide en 4 fases. Esto permite trabajar en paralelo sin interferencias:

### Fase 1: Fundamentos y Layout (El Esqueleto) ✅
#### T1: Inicializar repositorio en GitHub con Git Flow (ramas Main/Develop). ✅
#### T2: Crear index.html con estructura semántica principal. ✅
#### T3: Implementar layout base con Flexbox (Header, Canvas, Footer). ✅
#### T4: Diseñar el área principal de escritura con CSS puro. ✅

### Fase 2: Lógica y Formato de Texto (El Músculo) - En Progreso 🟡
#### T5: Implementar listeners en JavaScript para selección de texto. ✅
#### T6: Lógica para Negrita, Cursiva y Subrayado (Obligatoria). ✅
#### T7: Lógica de alineación de texto (Izquierda, Centro, Derecha). 🟡
#### T8: Contador de palabras en tiempo real en el footer. ✅

### Fase 3: Almacenamiento 🟡 En Progreso
#### T9: Implementar Local Storage para la función de Auto-guardado (evita pérdida de datos al refrescar). 🟡

### Fase 4: UI/UX y Pulido Final (La Piel) 🟡 En Progreso
#### T10: Diseño responsivo: asegurar compatibilidad con tablets y móviles. 🟡
#### T11: Implementar Modo Oscuro y Modo Cuidado Visual (Variables/Clases CSS). ✅
#### T12: Pulido final de UI: transiciones, efectos hover y scrollbars minimalistas.
#### T13: Actualización final de documentación (README & DOCUMENTATION).



#### EN DESARROLLO  
## Diseño basico:  

## Dark Mode: Se esta implementando la funcionalidad de alternar el fondo de la pagina web por medio del icono lunar (Id: icon-mode) y un Event Listener. Se utilizo informacion del siguinte link (https://www.w3schools.com/js/js_events.asp#gsc.tab=0).                         Tambien se agrego la funcionalidad para alternar entre luz nocturna y diurna, lo que mejora la visibilidad en horarios nocturnos para descansar la vista. Esto se realizo mediante codigo en html y javascript 

### FINALIZADO
## -- DarkMode -- : Se concluyeron las funcionalidades para alternar entre modo oscuro y modo claro, ademas se agrego la funcion para proteger la vista con el modo nocturno

   
