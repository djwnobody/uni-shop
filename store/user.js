export default {
  namespaced:true,
  state:{
    address:JSON.parse(uni.getStorageSync('address') || '{}' )
  },
  mutations:{
    // 修改address
    UPDATE_ADDRESS(state,value){
      state.address = value
      this.commit('my_user/SAVE_TO_STORAGE')
    },
    // address存储到storage
    SAVE_TO_STORAGE(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    
  },
  getters:{
    // 拼接地址
    addstr(state){
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo 
    },
    
  }
}