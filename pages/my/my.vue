<template>
  <view class="container">
    <my-login v-if="!token"></my-login>
    
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        
      };
    },
    mixins:[badgeMix],
    computed:{
      ...mapState('my_user',['token']),
    }
  }
</script>

<style lang="scss">
page,
.container {
  height: 100%;
}
</style>
