<template>
  <view>
    
    <!-- 搜索框 -->
    <view class="search-box">
      <uni-search-bar :focus="true" @input="input" radius="100" cancelButton="none">
      </uni-search-bar>
    </view>
    
    <!-- 搜索结果展示 -->
    <view class="search-result-box" v-if="searchResult.length !== 0">
      <view class="search-item" v-for="(item,i) in searchResult" :key="i" @click="toDetail(item)">
        <view class="search-text">
          {{item.goods_name}}
        </view>
        <uni-icons type="forward" size="17"></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史 -->
    <view class="history-box" v-else>
      <view class="history-up">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="deleteHistory"></uni-icons>
      </view>
      <view class="history-down">
        <uni-tag v-for="(item,i) in searchHistory" :key="i" :inverted="true" :text="item" size="normal" @click="toGoodsList(item)"/>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        searchResult: [],
        keyWord: '',
        timer: null, // 防抖动
        searchHistory:[], // 历史记录
      };
    },
    onLoad() {
      this.searchHistory = JSON.parse(uni.getStorageSync('searchHistory'))
    },
    methods: {
      // 每按一次键,触发一次
      input(value) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.keyWord = value
          this.getSearch()
          this.getHistory()
        }, 500)
      },
      // 获取历史记录
      getHistory(){
        if(!this.keyWord) return
        if(this.searchHistory.includes(this.keyWord)) {
          this.searchHistory.splice(this.searchHistory.indexOf(this.keyWord),1)
        }
        this.searchHistory.unshift(this.keyWord)
        uni.setStorageSync('searchHistory',JSON.stringify(this.searchHistory))
      },
      // 清空历史记录
      deleteHistory(){
        this.searchHistory = [],
        uni.setStorageSync('searchHistory','[]')
      },
      // 获取搜索列表
      async getSearch() {
        let res = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.keyWord
        })
        this.searchResult = res.data.message || []
      },
      // 调换详情
      toDetail(item) {
        uni.navigateTo({
          url: '../goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      },
      toGoodsList(item){
        uni.navigateTo({
          url:'../goods_list/goods_list?query=' + item
        })
      }
    },
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .search-result-box {
    padding: 0 5px;

    .search-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #efefef;
      padding: 13px 0;

      // 省略号...
      .search-text {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
  }
  
  // 搜索历史
  .history-box {
    padding: 0 5px;
    .history-up {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      border: 1px solid #efefef;
      font-size: 13px;
    }
    .history-down {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;
      .uni-tag {
        margin-right: 5px;
      }
    }
  }
</style>
