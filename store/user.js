export default {
  namespaced:true,
  state:{
    // 一个对象
    address:JSON.parse(uni.getStorageSync('address') || '{}' ),
    // 登录成功之后的 token 字符串
    token: uni.getStorageSync('token') || '',
    userInfo:JSON.parse(uni.getStorageSync('user') || '{}' ),
  },
  mutations:{
    // 修改address
    UPDATE_ADDRESS(state,value){
      state.address = value
      this.commit('my_user/SAVE_ADDRESS')
    },
    // address存储到storage
    SAVE_ADDRESS(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    // 修改userInfo
    UPDATE_USER(state,value){
      state.userInfo = value
      this.commit('my_user/SAVE_USER')
    },
    // userInfo存储到storage
    SAVE_USER(state){
      uni.setStorageSync('user',JSON.stringify(state.userInfo))
    },
    // 修改userInfo
    UPDATE_TOKEN(state,value){
      state.token = value
      this.commit('my_user/SAVE_TOKEN')
    },
    // userInfo存储到storage
    SAVE_TOKEN(state){
      uni.setStorageSync('token',JSON.stringify(state.token))
    },
    
  },
  getters:{
    // 字符串
    addstr(state){
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo 
    },
    
    
  }
}