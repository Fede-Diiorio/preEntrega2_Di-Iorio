function saveCartToLocalStorage(id, name, price, quantity, img) {
    const saveProduct = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        img: img
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const findProduct = cart.find(prod => prod.name === saveProduct.name);

    if (!findProduct) {
        cart.push(saveProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function getCartFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

export { saveCartToLocalStorage }
export { getCartFromLocalStorage }
