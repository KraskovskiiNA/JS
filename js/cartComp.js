Vue.component('cart', {
    data(){
        return {
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            showCart: false,
            cartProducts: [],
        }
    },
    methods: {
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
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
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
              .then(data => {
                if (data.result === 1) {
                    if (item.quantity > 1) {
                        item.quantity--;
                    } else {
                        this.cartProducts.splice(this.cartProducts.indexOf(item), 1)
                    }
                }
            })
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartProducts.push(el);
            }
        });
    },
    template:
    `<div>
        <button class="btn_cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartProducts.length">Корзина пуста</p>
            <cart-item class="cart-item"
            v-for="item of cartProducts"
            :key="item.id_product"
            :cart-item="item"
            :img="imgCart"
            @del="del">
            </cart-item>
        </div>
    </div>`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
        <div class="cart-item">
            <div class="cart_product_block">
                <img :src="img" alt="img">
                <div class="product_desc">
                    <h3>{{ cartItem.product_name }}</h3>
                    <p>Количество: {{ cartItem.quantity }}</p>
                    <p>{{ cartItem.price }} ₽/шт</p>
                </div>
            </div>
            <div class="right_block">
                <i class="far fa-times-circle" @click="$emit('del', cartItem)" style="cursor: pointer;"></i>
                <p>{{ cartItem.quantity*cartItem.price }}₽</p>
            </div>
        </div>`
});