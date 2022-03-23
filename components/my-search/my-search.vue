<template>
  <view class="my-search-container">
    <view class="my-search-box" @click="toSearch">
      <uni-icons type="search" size="17"></uni-icons>
      <text class="text">搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    methods:{
      toSearch(){
        uni.navigateTo({
          url:'/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.my-search-container {
  height: 50px;
  background-color: #c00000;
  display: flex;
  align-items: center;
}
.my-search-box {
  width: 100%;
  height: 36px;
  background-color: #FFFFFF;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  .text {
    margin-left: 10rpx;
    font-size: 15px;
  }
}
</style>
