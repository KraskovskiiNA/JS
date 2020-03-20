'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать:
// let getRequest = (url, cb) => {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url, true);
//   xhr.onreadystatechange = () => {
//     if (xhr.readyState === 4) {
//       if (xhr.status !== 200) {
//         console.log('Error');
//       } else {
//         cb(xhr.responseText);
//       }
//     }
//   };
//   xhr.send();
// };

// let getRequest = (url, cb) => {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url, true);
//     xhr.onload = () => {
//       if (this.status == 200) {
//         resolve(this.response);
//       } else {
//         reject(error);
//       }
//     };
//   xhr.onerror = () => {reject(new Error("Network Error"))};
//   xhr.send();
//   });
// }

// let getRequest = fetch('url')
//   .then(result => result.json())
//   .then(data => {
//     console.log(data)
//   })
//   .catch(error => {
//     console.log(error)
// });

class ProductList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._getProducts()
            .then((data) => {
                this.goods = [...data];
                this.render();
            });
    }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
              console.log('Error!', error);
            });
    }
   
    render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render())
        }
    }

    _sumPrice(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }

};

class ProductItem {
    constructor (product, img = 'https://via.placeholder.com/120'){
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render (){
        return `<div class = 'product_item' data-id="${this.id}">
            <img src=${this.img} alt="img">
            <h3>${this.title}</h3>
            <p>${this.price} ₽</p>
            <button class = "btn">Добавить в корзину</button>
            </div>`;
    }
};

new ProductList();


class CartList{

};
