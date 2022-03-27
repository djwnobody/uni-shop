<template>
  <view>
    <view class="count-box">

      <label class="radio">
        <radio :checked="isAllCheck" color="#c00000" @click="chooseAll"/><text>全选</text>
      </label>

      <view class="amount-box">
        合计:<text class="price">￥{{totalPrice}}</text>
      </view>

      <view class="btn-settle">
        结算({{checkedCount}})
      </view>
    </view>
  </view>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
      };
    },
    created() {
      
    },
    computed: {
      ...mapGetters('my_cart',['checkedCount','totalPrice','total']),
      // 全选，选中的数量等于总数量
      isAllCheck(){
        return this.checkedCount === this.total
      }
    },
    methods:{
      chooseAll(){
        // this.isAllCheck = !this.isAllCheck // 计算属性是不能赋值的，但我可以传给store，然后修改
        this.$store.commit('my_cart/CHOOSE_ALL',!this.isAllCheck)
      }
    }
  }
</script>

<style lang="scss">
  .count-box {
    width: 100%;
    height: 50px;
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .price {
      font-weight: bold;
      color: #c00000;
    }

    .btn-settle {
      background-color: #c00000;
      color: white;
      height: 50px;
      line-height: 50px;
      min-width: 100px;
      text-align: center;
      padding: 0 10px;
    }
  }
</style>
