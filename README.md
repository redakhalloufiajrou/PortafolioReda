# Portafolio · Reda Khalloufi Ajrou

Portafolio personal en HTML, CSS y JavaScript vainilla (sin frameworks ni compilación).
Modo oscuro por defecto con selector de tema, totalmente responsive y con **demos interactivas**
de los 4 proyectos dentro de la propia web.

## Estructura

```
portafolio/
├── index.html                  ← página principal
├── css/styles.css              ← estilos (tema oscuro/claro, responsive)
├── js/main.js                  ← tema, menú, filtros, animaciones y modal de demos
├── assets/
│   ├── CV-Reda-Khalloufi-Ajrou.pdf
│   ├── peluqueria-uml.png      ← diagrama UML del proyecto final
│   └── thumbs/*.jpg            ← miniaturas de cada proyecto
└── demos/                      ← cada proyecto en su carpeta (se abre en un iframe)
    ├── peluqueria/             ← Proyecto 1: frontend de src/main/resources/static
    ├── rick-morty-wiki/        ← Proyecto 2: web de Lenguaje de Marcas tal cual
    ├── marstem/                ← Proyecto 3: versión web + MarSTEM-original.html
    └── cine/                   ← Proyecto 4: terminal simulado + código Java en /java
```

## Cómo funciona cada demo

| Proyecto | Qué se muestra | Cambios respecto al original |
|---|---|---|
| **Reda Barber Club** (3T) | El frontend real (`static/`) | `js/config/apiConfig.js` y `js/utils/apiUtils.js` ahora detectan si hay servidor. Sin Spring Boot usan `js/utils/mockApi.js`, una API simulada con los mismos endpoints (`/v1/Clientes`, `/v1/Citas`…) y datos como los de `DataLoader.java`, guardados en `localStorage`. Si sirves la carpeta `static` desde Spring Boot (puerto 8080) sigue usando la API real. |
| **R&M Wiki** (LLMM T2) | La web original | Solo se añadió `?.` en dos `addEventListener` de `js/script.js`, que daban error en las páginas donde no existe el buscador. El buscador usa la API pública de Rick and Morty, así que necesita internet. |
| **MarSTEM** (Prog. T1) | Versión web jugable | El original usa `prompt`/`alert`/`console.log`, que no funcionan bien dentro de un iframe. La versión web mantiene las mismas constantes, eventos y condiciones de fin. El original sigue en `MarSTEM-original.html`. |
| **STEMos en el Cine** (Prog. T2) | Terminal en el navegador | Las clases Java están portadas a JavaScript con la misma lógica y menús. El código Java original está en `demos/cine/java/`. |

Para añadir otro proyecto: copia su carpeta en `demos/`, añade una entrada en el objeto `DEMOS`
de `js/main.js` y una tarjeta `<article class="proyecto">` en `index.html` con
`data-demo="clave"` en el botón.

## Ver en local

La demo de la peluquería usa módulos ES (`type="module"`), que **no funcionan abriendo el
archivo con doble clic** (`file://`). Usa un servidor local:

- VS Code → extensión **Live Server** → clic derecho en `index.html` → *Open with Live Server*, o
- en la carpeta: `python -m http.server 5500` y abre `http://localhost:5500`

## Publicar en GitHub Pages

1. Sube el **contenido** de esta carpeta a un repositorio (por ejemplo `Portafolio`, el que ya usas en
   `redakhalloufiajrou.github.io/Portafolio/`).
2. *Settings → Pages → Deploy from a branch → main / (root)*.
3. Todas las rutas son relativas, así que funciona tal cual.

## Personalizar

- **Foto**: en `index.html`, sección «Sobre mí», cambia el `<div class="avatar">` por
  `<img src="assets/foto.jpg" alt="Reda Khalloufi Ajrou">`.
- **LinkedIn**: hay un enlace comentado en la sección de contacto.
- **GitHub**: el enlace apunta a `github.com/redakhalloufiajrou` (deducido de tu GitHub Pages); cámbialo si no es correcto.
- **Colores**: variables `--acento-1`, `--acento-2` y `--acento-3` al principio de `css/styles.css`.
- **Reiniciar datos de la demo de la peluquería**: en la consola del navegador, `resetDemoPeluqueria()`.
