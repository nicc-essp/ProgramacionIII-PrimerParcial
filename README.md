# TexteAR - Proyecto Primer Parcial
## Materia: Programacion III -  Primer Cuatrimestre, 2do año 📚

## 🪶 ¿Qué es TexteAR?
TexteAR es un editor de texto minimalista diseñado bajo el concepto de "Silent Canvas" (Lienzo Silencioso). En un mundo saturado de herramientas complejas y distracciones constantes, TexteAR propone un espacio de escritura puro y eficiente, donde el rendimiento y la claridad visual son los protagonistas.

Desarrollado como proyecto central para la cátedra de Programación III en la UTN FRBB, este editor utiliza tecnologías web de última generación para ofrecer una experiencia fluida tanto en escritorio como en dispositivos móviles.

## ✨ Características Principales

- **Editor minimalista**: Interfaz limpia y sin distracciones, enfocada en la escritura
- **Edición en tiempo real**: Escritura fluida con actualizaciones instantáneas
- **Barra de herramientas flotante y arrastrable**: Acceso rápido a funciones, posicionable en cualquier lugar de la pantalla
- **Opciones de formato**:
  - Negrita, cursiva y subrayado
  - Selector de tamaño de fuente (3 niveles)
  - Selector de color de texto
- **Sistema de hojas múltiples**: Crea nuevas hojas automáticamente cuando el contenido se desborda
- **Contadores en tiempo real**: Palabras, caracteres y número de página
- **Modos visuales**:
  - **Modo Oscuro**: Interfaz con tema oscuro para reducir fatiga visual
  - **Modo Cuidado Visual**: Protección adicional de la vista


![Modo Clasico](https://github.com/user-attachments/assets/9b2d138c-eeff-45d7-baf7-1246b7b583c9)
*Modo Clasico*

<br>

![Modo Cuidado de la vista](https://github.com/user-attachments/assets/301f96de-e89c-42e1-9a41-74f0bad8be28)
*Modo Cuidado de la vista*

<br>

![Modo Oscuro](https://github.com/user-attachments/assets/8358fd61-b714-4336-bce9-d2a644b2c0df)
*Modo Oscuro*

<br>

https://github.com/user-attachments/assets/ec091047-b26d-4e87-8949-6f050bbf7a19


*Modo Inmersivo*

## 🛠️ Tecnologias Utilizadas 
    HTML5  
    CSS3  
    Javascript ES6+  

**Recursos Externos**:
- [Google Fonts](https://fonts.google.com/) - Tipografía Lato
- [Font Awesome 6.5](https://fontawesome.com/) - Iconografía

## 🚀 Instalación y Primeros Pasos

### Requisitos
- Navegador moderno con soporte para HTML5, CSS3 y ES6+
- No se requieren dependencias adicionales ni servidor local

### Pasos de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/fedeheinrich/ProgramacionIII-PrimerParcial.git
   cd ProgramacionIII-PrimerParcial
   ```

2. **Abrir la aplicación**:
   - Hacer doble clic en `index.html`

## 👥 Integrantes - Grupo 19 
- [@fedeheinrich](https://github.com/fedeheinrich) - Federico Heinrich
- [@Tincho2319](https://github.com/Tincho2319) - Martin Alcaraz
- [@Nahuelete](https://github.com/Nahuelete) - Nahuel Cappa
- [@Oviedo-Matias](https://github.com/Oviedo-Matias) - Matias Oviedo
- [@nicc-essp](https://github.com/nicc-essp) - Nicolas Espulef
- [@HomeroColomboArg](https://github.com/HomeroColomboArg) - Homero Colombo

## 📂 Estructura del Proyecto
    ProgramacionIII-PrimerParcial/  
    │── index.html              # Archivo principal
    ├── assets/                 # Recursos estáticos
    │   ├── img/               # Imágenes del proyecto
    │   └── favicon/           # Iconos del sitio
    ├── css/                   # Estilos
    │   ├── index.css          # Estilos globales
    │   └── components/        # Estilos modularizados
    │       ├── header.css
    │       ├── hojas.css
    │       ├── barra-tareas.css
    │       ├── modes.css
    │       └── textos.css
    ├── js/                    # Scripts de funcionalidad
    │   ├── hojas.js          # Lógica de edición y gestión de hojas
    │   ├── barra-tareas.js   # Barra de herramientas flotante
    │   └── modes.js          # Modo oscuro y nocturno
    ├── pages/                
    ├── DOCUMENTATION.md      # Documentación técnica detallada
    └── README.md             # Documentación general

## 💻 Guía de Desarrollo

### Estructura Modular

El proyecto está organizado en componentes independientes para facilitar mantenimiento y extensión:

#### **Archivos JavaScript** (lógica de la aplicación)

- **[js/hojas.js](js/hojas.js)**: 
  - Gestión del área de edición y hojas múltiples
  - Detecta desbordamiento de contenido (`desbordaHoja()`)
  - Crea hojas automáticamente cuando se necesita espacio
  - Actualiza contadores de palabras y caracteres en tiempo real
  - Implementa pegado inteligente que respeta límites de hojas

- **[js/barra-tareas.js](js/barra-tareas.js)**:
  - Barra de herramientas flotante y arrastrable
  - Usa Pointer API para movimiento suave
  - Integra botones de formato (Negrita, Cursiva, Subrayado)
  - Selector de tamaño de fuente
  - Color picker para personalización de texto

- **[js/modes.js](js/modes.js)**:
  - Modo oscuro: Alterna clase `dark-mode` en el body
  - Modo cuidado de la vista

#### **Archivos CSS** (estilos y presentación)

- **[css/index.css](css/index.css)**: Estilos globales y reset
- **[css/components/](css/components/)**:
  - `header.css`: Encabezado y controles principales
  - `hojas.css`: Áreas de edición y sistema de páginas
  - `barra-tareas.css`: Barra flotante y botones
  - `modes.css`: Estilos de modo oscuro y nocturno
  - `textos.css`: Tipografía y formatos de texto

### Cómo Hacer Cambios

1. **Editar estilos**: Modifica los archivos CSS en `css/components/` según el componente
2. **Añadir funcionalidades**: Extende los módulos JS existentes o crea nuevos
3. **Probar cambios**: Abre `index.html` en el navegador y recarga con F5
4. **Revisar console**: Usa DevTools (F12) para debugging


## 📝 Licencia

Este proyecto es académico y se distribuye bajo la licencia MIT.
