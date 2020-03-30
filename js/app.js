'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const shop = new Vue({
  el: '#shop',

  data: {
    cartProducts: [],
    filtered: [],
    products: [],
    search: '',
    showCart: false,
    cartUrl: '/getBasket.json',
    catalogUrl: '/catalogData.json',
    imgCatalog: 'https://placehold.it/200x150',
    imgCart: 'https://placehold.it/50x100',
  },

  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json())
        .catch(error => console.log(error));
        
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
        .then(data => {
          if (data.result === 1) {
            let find = this.cartProducts.find(el => el.id_product === product.id_product);
            if (find) {
              find.quantity++;
            } else {
              let a = Object.assign({quantity: 1}, product);
              this.cartProducts.push(a)
            }
          } else {
            console.log('Error');
          }
        })
    },
    del(item) {
      this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
          if (data.result == 1) {
            if (item.quantity > 1) {
              item.quantity--;
            } else {
              this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
            }
          }
        })
    },
    filter() {
      let regexp = new RegExp(this.search, 'ig');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    },
  },
  mounted() {
    this.getJson(`${API + this.cartUrl}`)
      .then(data => {
        for (let el of data.contents) {
          this.cartProducts.push(el);
          this.filtered.push(el);
        }
      });
    this.getJson(`${API + this.catalogUrl}`)
      .then(data => {
        for (let el of data) {
          this.products.push(el);
        }
      });
  }
});