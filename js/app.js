'use strict';

class ProductList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._FetchProducts();
        this._render();
        this._sumPrice();

    }

    _FetchProducts(){
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ]
    }
    _render(){
        const block = document.querySelector(this.container);
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render())
        }
    }

    // Общая сумма всех продуктов.
    _sumPrice(){
        let sum = 0;
        this.goods.forEach(prod => console.log(sum += prod.price))
    }

};

class ProductItem {
    constructor (product, img = 'https://via.placeholder.com/120'){
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render (){
        return `<div class = 'product_item' data-id="${this.id}">
            <img src=${this.img} alt="img">
            <h3>${this.title}</h3>
            <p>${this.price} ₽</p>
            <button class = 'btn'>Добавить в корзину</button>
            </div>`;
    }
};

new ProductList();

// Пустой класс, создающий продукт для корзины.
class CartProduct{

};

// Пустой класс, добавляющий или убирающий CartProduct из корзины.
class CartList{

};

/*class Hamburger {
    Hamburger = {
	
        price: 0,
        calories: 0,
    
        small: {
            price: 50,
            calories: 20
        },
    
        big: {
            price: 100,
            calories: 40
        },
    
        cheese: {
            price: 10,
            calories: 20
        },
    
        salad: {
            price: 20,
            calories: 5
        },
    
        potato: {
            price: 15,
            calories: 10
        },
    
        spice: {
            price: 15,
            calories: 0
        },
    
        sauce: {
            price: 20,
            calories: 5
        },
    
    
        calc: function (size){
            this.price += Hamburger[size].price;
            this.calories += Hamburger[size].calories;
            
            let boxes = document.querySelectorAll('input[name=filling]:checked');
            for (let i = 0; i < boxes.length; i++){
                    let add = boxes[i].id;
                    this.price += Hamburger[add].price;
                    this.calories += Hamburger[add].calories;
            }
            
            Hamburger.createTotal(this.price, this.calories);
        },	   
        
        createTotal: function (price, calories){
            document.getElementById('btn').insertAdjacentHTML("afterend", `
            <div>
            <h3>Общая стоиость:${this.price}</h3>
            <h3>Калорийность:${this.calories}</h3>
            </div>`)
        }
    }
}
document.getElementById('btn').addEventListener('click', function(){
    Hamburger.calc(document.querySelector('input[name="size"]:checked').value);
})*/
