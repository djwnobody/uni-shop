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
    ADD(state, good) {
      state.cart.push(good)
    },
    SAVE_CART_TO_STORAGE(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
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
    }
  }
}
