// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {$http} from '@escook/request-miniprogram'
import store from './store/store.js'  // 第一个点没了，就报错。这里依然是vue语法，@/ 这是项目根目录

uni.$http = $http
$http.baseUrl = 'https://www.uinav.com'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '正在加载...'
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
