<template>
  <view>
    <view class="goods-item">
      <view class="goods-left">
        <radio @click="radioClick" color="#c00000" :checked="goods.goods_state" v-if="showRadio"></radio>
        <image :src="goods.goods_small_logo || defaultPic" class="goods-img"></image>
      </view>
      <view class="goods-right">
        <view class="goods-right-up">
          {{goods.goods_name}}
        </view>
        <view class="goods-right-down">
          <view class="goods-price">
            ￥{{goods.goods_price | priceFixed}}
          </view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNumber" @change="numChange">
          </uni-number-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNumber: {
        type: Boolean,
        default: false
      },
    },
    created() {},
    data() {
      return {
        // 默认图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',

      };
    },
    filters: {
      // 价格保留两位小数
      priceFixed(price) {
        return Number(price).toFixed(2)
      }
    },
    methods: {
      radioClick() {
        const goods = {
          goods_id: this.goods.goods_id,
          goods_state: this.goods.goods_state,
        }
        this.$emit('radio-change', goods)
      },
      numChange(newConut) {
        // 模板内置change事件,触发的时候就自动传我想要的参数(这里是count)
        // console.log(typeof newConut); // number
        this.$emit('numChange', {
          goods_id: this.goods.goods_id,
          goods_count: +newConut // +字符串，强制转为数字
        })
      },
    }
  }
</script>

<style lang="scss">
  .goods-item {
    width: 750rpx;
    box-sizing: border-box;
    display: flex;
    border: 1px solid #F0F0F0;
    padding: 10px 5px;

    .goods-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 5px;

      .goods-img {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-right {
      display: flex;
      flex: 1; // 因为宽度只由内容决定，内容不够，强制占满剩余屏幕
      flex-direction: column;
      justify-content: space-between;

      .goods-right-up {
        font-size: 13px;
      }

      .goods-right-down {
        font-size: 16px;
        color: #c00000;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
