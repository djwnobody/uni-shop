<template>
    <view class="login-container">
      <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
      <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
      <view class="tips-text">登录后尽享更多权益</view>
    </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed:{
      ...mapState('my_user',['userInfo']),
      ...mapState('my_user',['token'])
    },
    created() {
    },
    methods:{
      ...mapMutations('my_user',['UPDATE_USER']),
      ...mapMutations('my_user',['UPDATE_TOKEN']),
      getUserProfile(e){
        uni.getUserProfile({
          desc:'随便填',
          success: (res) => {
            this.UPDATE_USER(res.userInfo)
            this.getToken(res)
          },
          fail:() => {
            return uni.$showMsg('您取消了授权')
          }
        })
      },
      async getToken(info){
        // 参数有一个code需要
        const [err,res] = await uni.login() 
        console.log(res);
         // 准备参数对象
          const query = {
            code: res.code,
            encryptedData: info.encryptedData,
            iv: info.iv,
            rawData: info.rawData,
            signature: info.signature
          }
        
          // 换取 token
          const result = await uni.$http.post('/api/public/v1/users/wxlogin', query)
          const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
          this.UPDATE_TOKEN(token)
          uni.$showMsg('登录成功')
      }
    }
  }
</script>

<style lang="scss">
  
  .login-container {
    height: 750rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: '';
      background-color: #f5f5f5;
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: translateY(50%);
      border-radius: 100%;
    }

    .btn-login {
      width: 90%;
      background-color: #c00000;
      border-radius: 100px;
      margin: 15px 0;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
