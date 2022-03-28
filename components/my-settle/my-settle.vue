<template>
  <view>
    <view class="count-box">

      <label class="radio">
        <radio :checked="isAllCheck" color="#c00000" @click="chooseAll" /><text>全选</text>
      </label>

      <view class="amount-box">
        合计:<text class="price">￥{{totalPrice}}</text>
      </view>

      <!-- 结算按钮 -->
      <view class="btn-settle" @click="pay">
        结算({{checkedCount}})
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapState
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {
        seconds: 3,
        timer:null
      };
    },
    created() {

    },
    computed: {
      ...mapGetters('my_cart', ['checkedCount', 'totalPrice', 'total']),
      ...mapGetters('my_user', ['addstr']),
      ...mapState('my_user', ['token']),
      // 全选，选中的数量等于总数量
      isAllCheck() {
        return this.checkedCount === this.total
      }
    },
    methods: {
      // 全选
      chooseAll() {
        // this.isAllCheck = !this.isAllCheck // 计算属性是不能赋值的，但我可以传给store，然后修改
        this.$store.commit('my_cart/CHOOSE_ALL', !this.isAllCheck)
      },
      // 结账
      pay() {
        // checkedCount 选中的数量,number类型
        if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
        if (!this.addstr) return uni.$showMsg('请选择地址！')
        if (!this.token) return this.delayNavigate()
      },
      // 提示等待3秒，只会持续1.5s
      showMsg(n) {
        uni.showToast({
          icon: 'none',
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          mask: true, // 有了mask属性，在提示弹框出现的时候，无法选中商品，或者更改商品数量，就像提示框下面有一个遮罩层，把购物车页面给盖住了
        })
      },
      // 延迟三秒跳转
      delayNavigate() {
        this.seconds = 3
        // 第一次展示,持续1.5s
        this.showMsg(this.seconds)
        // 每隔1s展示一次
        this.timer = setInterval(() => {
          this.seconds--
          if(this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url:'/pages/my/my'
            })
            return
          }
          this.showMsg(this.seconds)
        }, 1000)
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
