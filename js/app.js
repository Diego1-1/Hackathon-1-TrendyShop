import { getProducts } from '../services/productService.js';
import { renderizarProductos, mostrarCargando, mostrarError } from './ui.js';
import { addCar } from '../services/cart.js';

async function iniciarCatalogo() {
  const contenedor = document.querySelector('#productos');
  if (!contenedor) return;

  mostrarCargando(contenedor);

  try {
    const productos = await getProducts();
    renderizarProductos(contenedor, productos);
    contenedor.addEventListener('click', (e) => {
const btn = e.target.closest('.btn-cart, .btn-comprar');
      if(!btn) return;
      const producto = productos.find( p => String(p.id) === String(btn.dataset.id));
      if(!producto) return;

      addCar({
        id: producto.id,
        name: producto.title,
        image:producto.image,
        price: producto.price
      });

       if (btn.classList.contains('btn-comprar')) {
        window.location.href = 'cart.html';
      }
    })
  } catch (error) {
    console.error(error);
    mostrarError(contenedor, 'No pudimos cargar los productos. Intenta de nuevo más tarde.');
  }
}

document.addEventListener('DOMContentLoaded', iniciarCatalogo);