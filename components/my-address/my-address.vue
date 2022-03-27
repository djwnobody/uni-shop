<template>
  <view>
    <!-- 收货地址按钮 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
    </view>

    <!-- 具体收货信息 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          收货人：{{address.userName}}
        </view>
        <view class="row1-right">
          <text class="phone">电话：{{address.telNumber}}</text>
          <uni-icons type="right"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址：
        </view>
        <view class="row2-right">
          {{addstr}}
        </view>
      </view>
    </view>

    <!-- 分割栏 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {};
    },
    methods: {
      ...mapMutations('my_user', ['UPDATE_ADDRESS']),
      async chooseAddress() {
        let [err, succ] = await uni.chooseAddress()
        // 用户确认选择
        if (succ && succ.errMsg === 'chooseAddress:ok') {
          this.UPDATE_ADDRESS(succ)
        }
        // 用户取消授权
        if (err && err.errMsg === 'chooseAddress:fail cancel') {
          console.log(err.errMsg);
        }
      }
    },
    computed: {
      ...mapState('my_user', ['address']),
      ...mapGetters('my_user', ['addstr'])
    }
  }
</script>

<style lang="scss">
  .address-choose-box {
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .address-info-box {
    height: 90px;
    padding: 5px 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;

    .row1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      .row1-right {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .phone {
          margin-right: 5px;
        }
      }
    }

    .row2 {
      display: flex;
      align-items: center;

      .row2-left {
        white-space: nowrap;
      }
    }
  }

  .address-border {
    display: block;
    width: 100%;
    height: 5px;
  }
</style>
