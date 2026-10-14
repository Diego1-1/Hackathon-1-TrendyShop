const KEY  = 'carrito';

export function getCar(){
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch{
        return [];
    }
}

function save(car){
    localStorage.setItem(KEY, JSON.stringify(car));
    window.dispatchEvent(new CustomEvent('cart-updated',{
        detail: {total: countItems()}
    }))
}

export function addCar({id,name,image,price})
{
    const car = getCar();
    const current = car.find(  p => p.id === id);

    if(current) current.amount ++;
    else car.push({id,name,image,price, amount:1});
    save(car);

}

export function changeAmount(id, amount)
{
    let car = getCar();
    car  = amount <=0 ? car.filter(p => p.id !== id) : car.map(p => p.id === id ? {...p, amount} : p)
    save(car);

}

export function deleteCar(){

}