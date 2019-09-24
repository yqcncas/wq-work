<template>
  <div class="action">
    <div class="code">
      <input placeholder="输入激活码" placeholder-style="color:#b2b2b2" v-model="activation">
    </div>
    <div class="bt">
      <button @click="activate">确认激活</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        activation: ''
      }
    },
    methods: {
      activate () {
        if (this.activation.trim() !== '') {
          this.$fly.request({
            method: 'post', // post/get 请求方式
            url: '/actiCode/findBusinessIdByCode',
            body: {
              'code': this.activation
            }
          }).then(res => {
            if (res.code === 200) {
              wx.showToast({
                title: '激活成功',
                duration: 2000,
                icon: 'none'
              })
              wx.setStorageSync('vipId', res.data.vipId)
              setTimeout(() => {
                this.activation = ''
                wx.navigateBack({ delta: 1 })
              }, 2000)
            } else {
              wx.showToast({
                title: '输入的激活码有误',
                duration: 2000,
                icon: 'none'
              })
              this.activation = ''
            }
          })
        } else {
          wx.showToast({
            title: '请填写激活码',
            duration: 2000,
            icon: 'none'
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .action{
    width: 100%;
    .code{
      width: 100%;
      height: ~'100rpx';
      display: flex;
      align-items: center;
      background: #ffffff;
      margin-top: ~'20rpx';
      padding: 0 ~'30rpx';
      input{
        display: inline-block;
        color: #b2b2b2;
        font-size: ~'28rpx';
      }
    }
    .bt{
      width: 100%;
      height: ~'100rpx';
      color: #ffffff;
      margin-top: ~'800rpx';
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      button{
        width: 90%;
        background: #ff8848;
        color: #ffffff;
        font-size: ~'30rpx';
        padding: ~'10rpx' 0;
      }
    }
  }

</style>
