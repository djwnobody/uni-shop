<template>
  <view>
    <view class="goods-box">
      <view v-for="(item,i) in goodsList" :key="i" @click="toDetail(item)">
        <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 编程式导航过来的
        queryObj: {
          query: '', // home过来的
          cid: '', // 分类过来的
          pagenum: 1,
          pagesize: 10,
        },
        goodsList: [],
        total: 0,
        isLoading:false
      };
    },
    onLoad(options) {
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      this.getGoods()
    },
    onReachBottom() {
      if(this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
        return console.log('获取数据完毕');
      }
      if(this.isLoading) return
      this.queryObj.pagenum += 1
      this.getGoods()
    },
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.goodsList = []
      this.total = 0
      this.isLoading = false
      this.getGoods(()=>{ uni.stopPullDownRefresh() })
    },
    methods: {
      async getGoods(cb) {
        this.isLoading = true
        let res = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        console.log(res);
        this.isLoading = false
        cb && cb()
        this.goodsList = [...this.goodsList,...res.data.message.goods]
        this.total = res.data.message.total
      },
      toDetail(item){
        uni.navigateTo({
          url:"../goods_detail/goods_detail?goods_id=" + item.goods_id
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-box {
    background-color: #FFFFFF;
  }
</style>
