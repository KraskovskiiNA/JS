'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const shop = new Vue({
  el: '#shop',

  methods: {
    getJson(url){
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
              this.$refs.error.setError(error);
            })
    },
  }
});