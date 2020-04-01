Vue.component('us-saerch', {
    data(){
        return {
            userSearch: '',
        }
    },
    template: `
            <form action="#" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" v-model="userSearch">
                <button type="submit"><i class="fas fa-search" style="cursor: pointer; padding: 0 10px;"></i></button>
            </form>`
});