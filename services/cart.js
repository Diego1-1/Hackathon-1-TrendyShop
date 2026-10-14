    const KEY  = 'carrito';

    export function getCar() {
  try {
    const data = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

    function save(car){
        localStorage.setItem(KEY, JSON.stringify(car));
        window.dispatchEvent(new CustomEvent('cart-updated',{
            detail: {total: countItems()}
        }))
    }

    export function addCar({ id, name, image, price }) {
  const numericPrice = Number(price);
  if (id == null || !Number.isFinite(numericPrice)) return;

  const car = getCar();
  const current = car.find(p => String(p.id) === String(id));

  if (current) current.amount++;
  else car.push({ id, name, image, price: numericPrice, amount: 1 });

  save(car);
}

export function changeAmount(id, amount) {
  const qty = Math.floor(Number(amount));
  if (!Number.isFinite(qty)) return; 

  const car = getCar();
  const updated = qty <= 0
    ? car.filter(p => String(p.id) !== String(id))
    : car.map(p => String(p.id) === String(id) ? { ...p, amount: qty } : p);
  save(updated);
}

export function deleteCar(id) {
  save(getCar().filter(p => String(p.id) !== String(id)));
}

    export function countItems() {
    return getCar().reduce((acc, p) => acc + p.amount, 0);
    }

    export function totalPrice() {
    return getCar().reduce((acc, p) => acc + p.price * p.amount, 0);
    }

    export function clearCar() {
    save([]);
    }