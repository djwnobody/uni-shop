export default {
  namespaced: true,
  actions: {
    add(context, good) {
      console.log('action的add');
      const finder = context.state.cart.find(x => x.goods_id === good.goods_id)
      if (!finder) {
        context.commit('ADD', good)
      } else {
        finder.goods_count++
      }
      context.commit('SAVE_CART_TO_STORAGE')
    }
  },
  mutations: {
    // 添加到cart
    ADD(state, goods) {
      state.cart.push(goods)
    },
    // 保存cart到storage
    SAVE_CART_TO_STORAGE(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    // cart页面，选不选中
    RADIO_CHANGE(state,goods){
    const finder = state.cart.find(x => x.goods_id === goods.goods_id)
    finder.goods_state = !finder.goods_state
    this.commit('my_cart/SAVE_CART_TO_STORAGE')
    },
    NUM_CHANGE(state,goods){
      const finder = state.cart.find(x => x.goods_id === goods.goods_id)
      finder.goods_count = goods.goods_count
      this.commit('my_cart/SAVE_CART_TO_STORAGE')
    },
    DELETE_GOODS(state,index){
      state.cart.splice(index,1)
      this.commit('my_cart/SAVE_CART_TO_STORAGE')
    },
    CHOOSE_ALL(state,flag){
      state.cart.forEach(item => item.goods_state = flag)
      this.commit('my_cart/SAVE_CART_TO_STORAGE')
    }
  },
  state: {
    // 购物车的数组，用来存储购物车中每个商品的信息对象
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  },
  getters: {
    // 购物车总数量
    total(state) {
      let c = 0
      state.cart.forEach(good => c += good.goods_count) // 这里可以理解为执行了 c += 语句，最后return c，但是没人接收不用管
      return c
    },
    // 计算选中的数量
    checkedCount(state){
      return state.cart.filter(item => item.goods_state).reduce((total,item) => total += item.goods_count,0)
    },
    // 选中的总价格
    totalPrice(state){
      return state.cart.filter(item => item.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price,0).toFixed(2)
    }
  }
}
