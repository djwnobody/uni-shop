<template>
  <view>
    <view class="cart-box" v-if="cart.length !== 0">
      <!-- 收货地址 -->
      <my-address></my-address>

      <!-- 购物车标题 -->
      <view class="cart-title">
        <uni-icons type="shop" size="18"></uni-icons>
        <text class="cart-title-text">购物车</text>
      </view>
      <!-- 滑动删除 -->
      <uni-swipe-action>
        <block v-for="(item,i) in cart" :key="i">
          <uni-swipe-action-item :right-options="options" @click="onClick($event,i)">
            <my-goods @radio-change="radioChange" :goods="item" :showRadio="true" :show-number="true"
              @numChange="numChange"></my-goods>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>

      <!-- 结算 -->
      <my-settle></my-settle>
    </view>

    <!-- 空空如也 -->
    <view class="empty-cart" v-else>
      <image src="/static/cart_empty@2x.png" mode="widthFix" class="empty-img"></image>
      <text class="text">空空如也</text>
    </view>

  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    data() {
      return {
        options: [{
          text: '删除',
          style: {
            backgroundColor: '#dd524d'
          }
        }]
      };
    },
    mixins: [badgeMix],
    computed: {
      ...mapState('my_cart', ['cart']),
    },
    onShow() {
      // console.log(mapMutations('my_cart',['NUM_CHANGE'])); // {NUM_CHANGE:f}
    },
    methods: {
      ...mapMutations('my_cart', ['NUM_CHANGE']),
      radioChange(value) {
        // 只能在store修改cart数组
        this.$store.commit('my_cart/RADIO_CHANGE', value)
      },
      numChange(value) {
        this.NUM_CHANGE(value)
      },
      // 滑动删除,点击删除
      onClick(e, i) {
        if (e.content.text === '删除') {
          this.$store.commit('my_cart/DELETE_GOODS', i)
        }
        console.log(e, i);
      },
      change() {
        console.log('change');
      }
    }
  }
</script>

<style lang="scss">
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;

    .cart-title-text {
      margin-left: 10px;
    }
  }

  .cart-box {
    padding-bottom: 50px;
  }

  // 空空如也
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px; // 不用定位 top

    .empty-img {
      width: 90px;
    }

    .text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
