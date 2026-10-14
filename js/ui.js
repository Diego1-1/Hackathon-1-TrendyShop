function crearTarjeta(producto) {
  return `
    <article class="product-card">
      <div class="product-image-container">
        <img src="${producto.image}" alt="${producto.title}" class="product-img">
      </div>
      <div class="product-info">
        <h4 class="product-title">${producto.title}</h4>
        <div class="product-price-action">
          <span class="product-price">$${producto.price.toFixed(2)}</span>
          <button class="btn-cart" data-id="${producto.id}" aria-label="Añadir al carrito">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
      <button class="btn-comprar" data-id="${producto.id}">COMPRAR</button>
    </article>`;
}


export function renderizarProductos(contenedor, productos) {
  if (productos.length === 0) {
    contenedor.innerHTML = '<p class="catalog-message">No hay productos disponibles.</p>';
    return;
  }
  contenedor.innerHTML = productos.map(crearTarjeta).join('');
}

export function mostrarCargando(contenedor) {
  contenedor.innerHTML = '<p class="catalog-message">Cargando productos...</p>';
}

export function mostrarError(contenedor, mensaje) {
  contenedor.innerHTML = `<p class="catalog-message catalog-error">${mensaje}</p>`;
}