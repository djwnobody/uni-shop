import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    my_cart:cart
  },
  
})

export default store
