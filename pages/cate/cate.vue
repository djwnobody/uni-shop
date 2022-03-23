<template>
  <view>
    <my-search></my-search>
    
    <view class="scroll-view-container">
      <!-- 左侧一级分类 -->
      <scroll-view scroll-y class="left-cart" :style="{height: wh + 'px'}">
        <view class="left-scroll-view-item" :class="{active:active===i}" v-for="(item,i) in cateList" :key="i"
          @click="activeChange(i)">{{item.cat_name}}</view>
      </scroll-view>
      <!-- 右侧二、三级分类 -->
      <scroll-view class="right-cart" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
        <view v-for="(item,i) in cateLevel2" :key="i">
          <!-- 二级分类，就一行标题 -->
          <view class="cate-level2">
            / {{item.cat_name}} /
          </view>
          <!-- 三级分类 -->
          <view class="cate-level3">
            <view class="cate-level3-item" v-for="(item3,i3) in cateLevel2[i].children" :key="i3" @click="toGoodsList(item3)">
              <image :src="item3.cat_icon" mode=""></image>
              <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 可用高度
        wh: 0,
        // 所有的一级分类
        cateList: [],
        // 一个一级分类下的所有二级分类
        cateLevel2: [],
        // 一级分类的index
        active: 0,
        // 解决bug:切换一级分类后,二级分类滚动条依然在上一个那
        scrollTop: 0,
      }
    },
    onLoad() {
      let res = uni.getSystemInfoSync()
      this.wh = res.windowHeight - 50     // 搜索栏占50
      this.getCate()
    },
    methods: {
      async getCate() {
        let res = await uni.$http.get('/api/public/v1/categories')
        this.cateList = res.data.message
        this.cateLevel2 = res.data.message[0].children
      },
      // 点击左侧一级分类
      activeChange(i) {
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        // 每次调用这个函数都得设置不同的值, 选择在0 1 切换
        this.scrollTop = this.scrollTop ? 0 : 1
      },
      toGoodsList(item){
        uni.navigateTo({
          url:'/subpkg/goods_list/goods_list?cid=' + item.cat_id ,
          })
      }
    }

  }
</script>

<style lang="scss">
  .scroll-view-container {
    display: flex;
  }

  // 一级分类
  .left-cart {
    width: 120px;

    .left-scroll-view-item {
      background-color: #f7f7f7;
      line-height: 60px;
      text-align: center;
      font-size: 12px;

      &.active {
        background-color: #ffffff;
        position: relative;

        &::before {
          content: '';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 0;
        }
      }

    }
  }

  .right-cart {
    background-color: #fff;
  }

  // 二级分类
  .cate-level2 {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }

  // 三级分类
  .cate-level3 {
    display: flex;
    flex-wrap: wrap;

    .cate-level3-item {
      width: 33.3%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
</style>
