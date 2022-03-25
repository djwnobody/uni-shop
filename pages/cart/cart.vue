<template>
  <view>
    {{cart.length}}
  </view>
</template>

<script>
  import {mapState,mapGetters} from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        
      };
    },
    mixins:[badgeMix],
    computed: {
      ...mapState('my_cart',['cart']),
    },
    onShow() {
    },
    methods:{
      
    }
  }
</script>

<style lang="scss">

</style>
