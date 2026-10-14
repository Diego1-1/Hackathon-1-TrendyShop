import { getProducts } from '../services/productService.js';
import { renderizarProductos, mostrarCargando, mostrarError } from './ui.js';

async function iniciarCatalogo() {
  const contenedor = document.querySelector('#productos');
  if (!contenedor) return;

  mostrarCargando(contenedor);

  try {
    const productos = await getProducts();
    renderizarProductos(contenedor, productos);
  } catch (error) {
    console.error(error);
    mostrarError(contenedor, 'No pudimos cargar los productos. Intenta de nuevo más tarde.');
  }
}

document.addEventListener('DOMContentLoaded', iniciarCatalogo);