<template>
  <view>
    <view class="goods-item">
      <view class="goods-left">
        <image :src="item.goods_small_logo || defaultPic" class="goods-img"></image>
      </view>
      <view class="goods-right">
        <view class="goods-right-up">
          {{item.goods_name}}
        </view>
        <view class="goods-right-down">
          <view class="goods-price">
            ￥{{item.goods_price | priceFixed}}
          </view>
        </view>
      </view>

    </view>

  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      item: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        // 默认图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
      };
    },
    filters:{
      priceFixed(price){
        return Number(price).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    display: flex;
    border: 1px solid #F0F0F0;
    padding: 10px 5px;

    .goods-left {
      margin-right: 5px;

      .goods-img {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .goods-right-up {
        font-size: 13px;
      }

      .goods-right-down {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
</style>
