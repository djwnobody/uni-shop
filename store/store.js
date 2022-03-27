import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import user from './user.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules:{
    my_cart:cart,
    my_user:user
  },
  
})

export default store
