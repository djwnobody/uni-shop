<template>
  <view>
    <!-- 首页需要吸顶，分类页不需要 -->
    <view class="search-sticky">
      <my-search></my-search>
    </view>
    <!-- 轮播图 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
      <swiper-item v-for="(item,index) in swiperList" :key="index">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
          <image :src="item.image_src" mode=""></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 4个分类 -->
    <view class="cate">
      <view v-for="(item,index) in cateList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" mode="widthFix"></image>
      </view>
    </view>
    <!-- 楼层 -->
    <view class="floor">
      <view class="floor-item" v-for="(item,i) in floorList" :key='i'>
        <!-- 标题 -->
        <view class="floor-title">
          <image :src="item.floor_title.image_src" mode="" style="width:100%;height:60rpx"></image>
        </view>
        <!-- 图片-->
        <view class="floor-img-box">
          <!-- 左边大图 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" mode="widthFix"
              :style="{width:item.product_list[0].image_width + 'rpx'}"></image>
          </navigator>
          <!-- 右边四小花旦 -->
          <view class="right-img-box">
            <navigator class="right-four" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width:item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],
        cateList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiper()
      this.getCate()
      this.getFloor()
    },
    methods: {
      async getSwiper() {
        let res = await uni.$http.get('/api/public/v1/home/swiperdata')
        this.swiperList = res.data.message
      },
      async getCate() {
        let res = await uni.$http.get('/api/public/v1/home/catitems')
        this.cateList = res.data.message
      },
      async getFloor() {
        let res = await uni.$http.get('/api/public/v1/home/floordata')
        this.floorList = res.data.message
        console.log(res.data.message);
        res.data.message.forEach(item => {
          item.product_list.forEach(item2 => {
            item2.url = '/subpkg/goods_list/goods_list?' + item2.navigator_url.split('?')[1]
          })
        })
        
      },
      // 跳转到分类tabbar
      navClickHandler(item){
        if(item.name !== '分类') return 
        uni.switchTab({
          url:'../cate/cate'
        })
      }
    }

  }
</script>

<style lang="scss">
  // 消除图片下的空白，
  image {
    display: block;
  }
.search-sticky {
  position: sticky;
  top: 0;
  z-index: 999; // 与轮播图重叠时，显示轮播图
}
  // 轮播图
  swiper {
    height: 350rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  // 分类
  .cate {
    display: flex;
    justify-content: space-around;
    margin: 30rpx;

    image {
      width: 150rpx;
    }
  }

  // 楼层
  .floor-img-box {
    display: flex;
    padding: 15rpx;
  }

  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .left-img-box {
    margin-right: 15rpx;
  }

  .floor-item {
    margin: 10rpx 0;
  }
</style>
