'use strict';

const products = [
    {id: 1, title: 'Notebook', price: 20000, photo: 'https://via.placeholder.com/120'},
    {id: 2, title: 'Mouse', price: 1500, photo: 'https://via.placeholder.com/120'},
    {id: 3, title: 'Keyboard', price: 5000, photo: 'https://via.placeholder.com/120'},
    {id: 4, title: 'Gamepad', price: 4500, photo: 'https://via.placeholder.com/120'}
]; 

const renderProduct = (title, price, img) => {
    return `<div class = 'product_item'>
        <h3>${title}</h3>
        <img src=${img} alt="img">
        <p>${price}</p>
        <button class = 'btn'>Добавить в корзину</button>
    </div>`;
};

const renderProducts = list => {
    const productList = list.map(item => renderProduct(item.title, item.price, item.photo)).join('');
    ///console.log(...productList) - если без join() в этом варианте тоже запятых нет, но не понял как именно его в HTML добавить.
    document.querySelector('.products').innerHTML = productList;
};

renderProducts(products);