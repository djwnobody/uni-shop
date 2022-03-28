<template>
  <view class="my-userinfo-container">
    <!-- 用户头像 -->
    <view class="top-box">
      <image :src="userInfo.avatarUrl" mode="widthFix" class="avatar"></image>
      <text class="nickname">{{userInfo.nickname}}</text>
    </view>

    <!-- 三个面板区 -->
    <view class="panel-list">
      <!-- 第一面板，页面没有title，所以直接body -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">
          <view class="panel-item">
            <image src="../../static/my-icons/icon1.png" mode="widthFix" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon2.png" mode="widthFix" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon3.png" mode="widthFix" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon4.png" mode="widthFix" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {mapMutations} from 'vuex'
  import {
    mapGetters,
    mapState
  } from 'vuex'
  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('my_user', ['userInfo'])
    },
    methods:{
      ...mapMutations('my_user',['UPDATE_ADDRESS','UPDATE_USER','UPDATE_TOKEN']),
      async logout(){
        const [err,succ] = await uni.showModal({
          title:'提示',
          content:"确认退出吗？"
        })
        if(succ && succ.confirm) {
          // 用户确认退出
          this.UPDATE_ADDRESS({})
          this.UPDATE_USER({})
          this.UPDATE_TOKEN('')
        }
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    background-color: #f4f4f4;
  }

  .top-box {
    height: 400rpx;
    background-color: #c00000;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .avatar {
      width: 90px;
      border-radius: 45px;
      border: 2px solid white;
      box-shadow: 0 1px 5px black;
    }

    .nickname {
      margin-top: 10px;
      font-size: 16px;
      font-weight: bold;
      color: white
    }
  }

  // 面板区
  .panel-list {
    padding: 0 10px;
    border-radius: 5px;
    position: relative;
    top: -10px;

    .panel {
      background-color: white;
      margin-bottom: 8px;
      border-radius: 3px;

      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border: 1px solid #f4f4f4;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          font-size: 13px;
          padding: 10px 0;

          .icon {
            width: 35px;
          }
        }
      }
      
      // 第三个面板
      .panel-list-item {
        height: 45px;
        display: flex;
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
      }
    }
  }
</style>
