<template>
  <!-- v-if解决刚一进去，价格显示undefined -->
  <view v-if="detailInfo.goods_name" class="goods-detail-container ">
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
      <swiper-item v-for="(item,i) in detailInfo.pics" :key="i">
        <image :src="item.pics_big" @click="preview(i)"></image>
      </swiper-item>
    </swiper>

    <!-- 商品信息 -->
    <view class="goods-info-box">
      <view class="price">
        ￥{{detailInfo.goods_price}}
      </view>
      <view class="goods-info-body">
        <view class="goods-name">
          {{detailInfo.goods_name}}
        </view>
        <view class="collect">
          <uni-icons type="star" size="18" color="gray"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="yunfei">
        快递：免运费
      </view>
    </view>

    <!-- 返回的html，渲染为一连串的图 -->
    <rich-text :nodes="detailInfo.goods_introduce"></rich-text>

    <!-- 底部区域 -->
    <view class="goods-nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        // 这一件商品的所有信息
        detailInfo: {},
        // 底部的配置
        options: [{
          icon: 'shop',
          text: '店铺',
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      }
    },
    onLoad(options) {
      let id = options.goods_id
      this.getDetail(id)
    },
    computed: {
      ...mapGetters('my_cart', ['total'])
    },
    watch: {
      // 页面第一次显示时,不会调用普通函数定义的watch，有immediate才会第一次显示，就调用
      total: {
        handler(newVal) {
        const finder = this.options.find(item => item.text === '购物车')
        finder.info = newVal
        },
        immediate:true
      }
    },
    methods: {
      // 获得这一件商品的信息
      async getDetail(id) {
        let res = await uni.$http.get('/api/public/v1/goods/detail', {
          goods_id: id
        })
        console.log(res);
        // 解决图片下有一行空白和ios不显示webp格式图片
        res.data.message.goods_introduce = res.data.message.goods_introduce.replace(/<img /g,
          '<img style="display:block;" ').replace(/webp/g, 'jpg')
        this.detailInfo = res.data.message
      },
      // 图片预览
      preview(i) {
        uni.previewImage({
          current: i,
          urls: this.detailInfo.pics.map(x => x.pics_big)
        })
      },
      // 跳转cart页面
      onClick(e) {
        if (e.content.text === '购物车') {
          // 跳转至cart页面
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      },
      // vuex购物车添加信息
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
          // vuex添加good
          const good = {
            goods_id: this.detailInfo.goods_id,
            goods_name: this.detailInfo.goods_name,
            goods_price: this.detailInfo.goods_price,
            goods_count: 1,
            goods_small_logo: this.detailInfo.goods_small_logo,
            goods_state: true
          }
          this.$store.dispatch('my_cart/add', good)
        }
      }
    }
  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }

  // 详细信息
  .goods-info-box {
    padding: 10px;
    padding-right: 0;

    .price {
      color: #c00000;
      font-size: 18px;
      padding: 10px 0;
    }

    .goods-info-body {
      display: flex;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
        padding-right: 10px;
      }

      .collect {
        width: 120px;
        border-left: 1px solid #efefef;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: gray;
      }
    }

    .yunfei {
      font-size: 12px;
      margin: 10px 0;
      color: gray;
    }
  }

  .goods-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .goods-detail-container {
    // 解决底部购物车把图片挡住了
    padding-bottom: 50px;
  }
</style>
