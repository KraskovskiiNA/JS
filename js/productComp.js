Vue.component('products', {
    data(){
        return {
            catalogUrl: '/catalogData.json',
            imgCatalog: 'https://placehold.it/200x150',
            filtered: [],
            products: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        },
    },
    mounted(){
        this.$parent.getJson(`${API + this.catalogUrl}`)
        .then(data => {
            for (let el of data) {
                this.products.push(el);
                this.filtered.push(el);
            }            
        })
    },
    template: `
    <div class="products">
        <product v-for="product of filtered" :key="product.id_product" :img="imgCatalog" :product="product"></product>
    </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    data(){
        return {
            cartAPI: this.$root.$refs.cart,
        }
    },
    template:`
    <div>
        <img :src="img" alt="img">
        <h3>{{ product.product_name }}</h3>
        <p class="price_pad">{{ product.price }}₽</p>
        <button class="buy_btn" @click="cartAPI.addProduct(product)">Купить</button>
    </div>`
})