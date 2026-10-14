import { getCar, changeAmount, deleteCar, clearCar, totalPrice } from '../services/cart.js';

const items = document.querySelector('#cartItems');
const summary = document.querySelector('#cartSummary');
const totalEl = document.querySelector('#cartTotal');

const money = (n) => `$${n.toFixed(2)}`;

const escapeHTML = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function render() {
  const car = getCar();

  if (car.length === 0) {
    items.innerHTML = `
      <p class="catalog-message">Tu carrito está vacío.</p>
      <a href="catalogo.html">Ver productos</a>`; 
    summary.hidden = true;
    return;
  }

  items.innerHTML = car.map((p) => `
    <article class="cart-item" data-id="${escapeHTML(p.id)}">
      <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" class="cart-item-img">
      <div class="cart-item-info">
        <h2>${escapeHTML(p.name)}</h2>
        <p>${money(p.price)}</p>
      </div>
      <div class="cart-item-qty">
        <button type="button" data-action="minus" aria-label="Disminuir cantidad">-</button>
        <span>${p.amount}</span>
        <button type="button" data-action="plus" aria-label="Aumentar cantidad">+</button>
      </div>
      <p class="cart-item-subtotal">${money(p.price * p.amount)}</p>
      <button type="button" data-action="remove" aria-label="Eliminar ${escapeHTML(p.name)}">Eliminar</button>
    </article>
  `).join('');

  totalEl.textContent = money(totalPrice());
  summary.hidden = false;
}

items.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-action]');
  if (!btn) return;

  const id = btn.closest('.cart-item').dataset.id;
  const product = getCar().find((p) => String(p.id) === String(id));
  if (!product) return;

  const action = btn.dataset.action;
  if (action === 'plus') changeAmount(id, product.amount + 1);
  if (action === 'minus') changeAmount(id, product.amount - 1);
  if (action === 'remove') deleteCar(id);
});

document.querySelector('#clearBtn').addEventListener('click', clearCar);

document.querySelector('#checkoutBtn').addEventListener('click', () => {
  alert('¡Gracias por tu compra!'); 
  clearCar();
});

window.addEventListener('cart-updated', render);
render();