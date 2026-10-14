# TrendyShop - Tienda en Línea

Tienda en línea de ropa y accesorios construida con **HTML5, CSS3, JavaScript (ES6+) y Bootstrap** durante el Hackathon 1 Generation, con un plazo de 7 horas.

>  **Sitio desplegado:** [TU-URL-AQUÍ](https://tu-usuario.github.io/tu-repositorio/)
>  **Repositorio:** [TU-REPOSITORIO-AQUÍ](https://github.com/tu-usuario/tu-repositorio)

---

## Tabla de contenido

1. [Contexto del reto](#contexto-del-reto)
2. [Nuestra propuesta](#nuestra-propuesta)
3. [Funcionalidades](#funcionalidades)
4. [Tecnologías](#tecnologías)
5. [Estructura del proyecto](#estructura-del-proyecto)
6. [Arquitectura por capas](#arquitectura-por-capas)
7. [Instalación y uso](#instalación-y-uso)
8. [Persistencia del carrito](#persistencia-del-carrito)
9. [Consumo de API](#consumo-de-api)
10. [Manejo de errores](#manejo-de-errores)
11. [Responsividad](#responsividad)
12. [Pruebas](#pruebas)
13. [Cumplimiento de requisitos](#cumplimiento-de-requisitos)
14. [Equipo y organización](#equipo-y-organización)
15. [Mejoras futuras](#mejoras-futuras)

---

## Contexto del reto

TrendyShop fue una tienda de ropa y accesorios popular entre los jóvenes de Colombia, con tiendas físicas en Bogotá y Medellín. Entró en crisis por tres errores:

| Error | Qué ocurrió |
|---|---|
| Competencia de gigantes | No pudo competir con grandes plataformas ni con marcas de precios muy bajos |
| Mala experiencia de usuario | Pedidos tardíos, productos distintos a lo ofrecido y servicio que no respondía |
| Desconfianza en el canal digital | Diseño pobre, políticas de devolución confusas y pocos datos de contacto reales |

El desafío: **lanzar su ecommerce en 7 horas** con una tienda moderna, transparente, responsiva y con carrito funcional.

## Nuestra propuesta

Diseñamos la tienda atacando directamente los tres errores:

- **Contra la competencia:** interfaz limpia y rápida, con buscador y filtros por categoría.
- **Contra la mala experiencia:** mensajes de carga, retroalimentación inmediata al agregar productos y confirmación al enviar el formulario de contacto.
- **Contra la desconfianza:** información clara y transparente (envíos, devoluciones, tiendas físicas y datos de contacto reales).

## Funcionalidades

- **Inicio:** presentación de la tienda y bloque de confianza.
- **Catálogo:** productos en tarjetas con imagen, nombre, precio y botón de agregar al carrito.
- **Carrito de compras:**
  - Contador de productos en la barra de navegación.
  - Detalle con nombre, cantidad, precio unitario y subtotal.
  - Eliminación de productos y cálculo del total.
  - Persistencia al recargar la página (`localStorage`).
- **Quiénes somos:** historia, tiendas físicas y políticas de la tienda.
- **Contáctanos:** formulario con nombre, email y mensaje, con validación y mensaje de confirmación.

## Tecnologías

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura semántica de las páginas |
| CSS3 | Estilos propios con variables y clases reutilizables |
| JavaScript ES6+ | Lógica, módulos ES y consumo de API |
| Bootstrap 5 | Sistema de rejilla, componentes y responsividad |
| localStorage | Persistencia del carrito |
| API de productos | Datos del catálogo (ver [Consumo de API](#consumo-de-api)) |

## Estructura del proyecto

```
tienda/
│
├── index.html              # Inicio
├── catalogo.html           # Catálogo de productos
├── carrito.html            # Carrito de compras
├── quienes-somos.html      # Información de la tienda
├── contactanos.html        # Formulario de contacto
│
├── css/
│   └── style.css           # Estilos globales y por página
│
├── js/
│   ├── app.js              # Controlador común (navbar, footer, contador)
│   ├── ui.js               # Funciones de renderizado
│   ├── productos.js        # Modelo de productos (lista, filtros, búsqueda)
│   ├── carrito.js          # Modelo del carrito (agregar, eliminar, total)
│   └── pages/              # Un controlador por página
│       ├── inicio.js
│       ├── catalogo.js
│       ├── carrito-page.js
│       └── contacto.js
│
├── services/
│   ├── productService.js   # Comunicación con la API (con respaldo local)
│   └── cartService.js      # Lectura y escritura en localStorage
│
├── assets/
│   └── images/             # Logo, favicon e imágenes de respaldo
│
└── README.md
```

## Arquitectura por capas

Separamos la lógica de negocio de la presentación. Cada capa tiene una sola responsabilidad:

| Capa | Archivos | Responsabilidad |
|---|---|---|
| **Vista** | `*.html`, `style.css`, `ui.js` | Estructura y presentación |
| **Modelo** | `productos.js`, `carrito.js` | Datos y lógica de negocio |
| **Controlador** | `app.js`, `pages/*.js` | Orquestación y eventos |
| **Servicios** | `services/*.js` | Comunicación con la API y con `localStorage` |

Flujo de dependencias:

```
Página HTML
   └── pages/<pagina>.js (Controlador)
        ├── ui.js (Vista)
        ├── productos.js (Modelo) ──► productService.js ──► API
        └── carrito.js (Modelo) ────► cartService.js ────► localStorage
```

Reglas que seguimos:

- Los archivos del modelo y de los servicios **no tocan el DOM**.
- `fetch` y `localStorage` solo se usan dentro de `services/`.
- La vista no contiene lógica de negocio.
- Las funciones son cortas y de una sola responsabilidad.

## Instalación y uso

No requiere instalar dependencias: Bootstrap se carga por CDN.

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Sirve el proyecto con un servidor local.**

   El proyecto usa módulos ES (`type="module"`), que **no funcionan abriendo el HTML con doble clic** (`file://`). Usa cualquiera de estas opciones:

   - **VS Code:** instala la extensión *Live Server*, haz clic derecho en `index.html` y elige *Open with Live Server*.
   - **Python:**

     ```bash
     python -m http.server 8000
     ```

     y abre `http://localhost:8000`.
   - **Node.js:**

     ```bash
     npx serve
     ```

3. **Navega** por la tienda desde la barra de navegación.

## Persistencia del carrito

- El carrito se guarda en `localStorage` con la clave `carrito`.
- Se carga automáticamente al iniciar cada página y se actualiza cada vez que se modifica.
- Solo se guardan los datos necesarios de cada producto (`id`, `nombre`, `precio`, `imagen`, `cantidad`), para que el carrito no dependa de la API.
- Si el dato guardado está corrupto, el carrito inicia vacío en lugar de romper la página.

## Consumo de API

Los productos se obtienen de una API pública de productos (por ejemplo, [DummyJSON](https://dummyjson.com/docs/products)), filtrando por categorías de moda.

- Cada producto se **normaliza** al formato interno: `{ id, nombre, precio, imagen, categoria }`.
- Los precios se muestran en pesos colombianos con `Intl.NumberFormat('es-CO')`.
- **Plan de respaldo:** si la API falla, se carga una lista local de productos y se avisa al usuario.

## Manejo de errores

| Situación | Comportamiento |
|---|---|
| La API no responde | Se usa la lista local de respaldo y se muestra un aviso con opción de reintentar |
| Imagen de producto rota | Se muestra una imagen de reemplazo |
| `localStorage` no disponible o dato corrupto | El carrito inicia vacío, sin errores en pantalla |
| Formulario con campos vacíos o email inválido | Mensaje de error por campo y no se envía |
| Carrito vacío | Mensaje claro con enlace al catálogo |
| Búsqueda sin resultados | Mensaje de estado vacío |

## Responsividad

Diseñado con enfoque *mobile first* usando el sistema de rejilla de Bootstrap y estilos propios. Se revisó en:

- 📱 Móvil
- 📱 Tableta
- 🖥️ Escritorio

## Pruebas

Pruebas manuales realizadas antes de la entrega:

- [ ] Agregar un producto desde el catálogo y verificar el contador del navbar
- [ ] Agregar el mismo producto dos veces y verificar que aumenta la cantidad
- [ ] Eliminar un producto y verificar que el total se actualiza
- [ ] Recargar la página y verificar que el carrito se conserva
- [ ] Cambiar de página y verificar que el contador se mantiene
- [ ] Desconectar internet y verificar que el catálogo carga con el respaldo
- [ ] Enviar el formulario vacío y verificar los mensajes de error
- [ ] Enviar el formulario completo y verificar el mensaje de confirmación
- [ ] Revisar todas las páginas en móvil, tableta y escritorio
- [ ] Verificar que la navegación funciona desde todas las páginas

## Cumplimiento de requisitos

| Requisito del reto | Dónde se cumple |
|---|---|
| Página de inicio | `index.html` |
| Catálogo con cards (imagen, nombre, precio, botón) | `catalogo.html`, `ui.js` |
| Quiénes somos | `quienes-somos.html` |
| Contáctanos con validación y confirmación | `contactanos.html`, `pages/contacto.js` |
| Carrito con contador, subtotal, eliminar y total | `carrito.html`, `carrito.js`, `ui.js` |
| Persistencia con `localStorage` | `services/cartService.js` |
| Responsividad | `style.css` y Bootstrap |
| Modularidad | Estructura por capas descrita arriba |
| Consumo de API con manejo de errores | `services/productService.js` |
| Mensajes de carga y retroalimentación visual | `ui.js` |

## Equipo y organización

| Integrante | Responsabilidad principal |
|---|---|
| **[Nombre 1]** | Líder técnico: integración, navbar y footer, README y despliegue |
| **[Nombre 2]** | Inicio y Quiénes somos |
| **[Nombre 3]** | Catálogo: servicio de productos, filtros y buscador |
| **[Nombre 4]** | Carrito y persistencia |
| **[Nombre 5]** | Contacto, estilos y control de calidad |

**Metodología:** tablero Scrum con las columnas *Backlog, To Do, In Progress, Code Review y Done*.

**Flujo de trabajo en Git:**

- Una rama por funcionalidad (`feature/inicio`, `feature/catalogo`, `feature/carrito`, `feature/contacto`).
- Todo cambio entra a `main` mediante Pull Request, revisado por otro integrante.
- Commits pequeños y frecuentes, con mensajes descriptivos.

## Mejoras futuras

- Modo claro y oscuro.
- Filtros por precio y ordenamiento.
- Botón para enviar el pedido por WhatsApp.
- Recomendador de productos con un mini quiz.
- Pruebas automatizadas de la lógica del carrito.

---

