<template class="page">
  <div class="ma-trans-page">
    <div class="Top"  @click="back()">
      <i class="iconfont iconE leftA"></i>
    </div>
    <div class="box-trans" :class="bigTrans">
      <div class="top-wrap">
        <p class="name">{{params.name}}</p>
        <p>{{params.job}}</p>
      </div>
      <div class="middle-wrap">
        <div :class="smallTrans">
          <image src="/static/images/ma-bg.png" mode="widthFix" class="bg-border"></image>
          <div class="qrcode-wrap">
            <image :src="params.qrcode" mode="widthFix" class="qrcode-img"></image>
          </div>
          <div :class="imgA">
            <image :src="params.imgUrl" mode="widthFix" class="img-url"></image>
          </div>
        </div>
      </div>
      <div class="bottom-wrap">
        <image class="logo-img" :src="params.logo" mode="widthFix"></image>
        <p>{{params.companyName}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        params: {},
        bigTrans: '',
        smallTrans: '',
        imgA: ''
      }
    },
    methods: {
      // 返回上一页
      back () {
        console.log('5545')
        wx.navigateBack(-1)
        // innerAudioContext.pause()
      }
    },
    onLoad (options) {
      this.bigTrans = ''
      this.smallTrans = ''
      this.params = options
      this.imgA = 'wrapImgA'
      setTimeout(() => {
        this.bigTrans = 'trans'
        this.smallTrans = 'small-trans'
        this.imgA = 'wrapImg'
      }, 1000)
    }
  }
</script>
<style lang="less" scoped>
  .Top{
    position: absolute;
    left: ~'20rpx';
    top: ~'62rpx';
    z-index: 99999;
    .iconE{
      color: #ffffff;
      font-size: ~'40rpx';
    }
  }
  .ma-trans-page {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, #2e81ff, #5fc1ff);
    color: #fff;
    font-size: ~'28rpx';
    text-align: center;
    .box-trans {
      width: 100%;
      height: 100%;
      position: relative;
    }
    .trans {
      transition: all 1s ease;
      transform: rotate(180deg);
    }
    .top-wrap {
      position: absolute;
      top: 16%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .name {
      font-size: ~'44rpx';
      padding-bottom: ~'16rpx';
    }
    .middle-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      width: ~'480rpx';
      height: ~'480rpx';
      transform: translate(-50%, -50%);
    }
    .bg-border {
      width: ~'480rpx';
    }
    .qrcode-wrap {
      width: ~'440rpx';
      height: ~'440rpx';
      background-color: #fff;
      border-radius: 50%;
      position: absolute;
      top: ~'16rpx';
      left: ~'25rpx';
    }
    .qrcode-img {
      width: ~'374rpx';
      height: ~'374rpx';
      margin-top: ~'33rpx';
    }
    .wrapImgA{
      width: ~'158rpx';
      height: ~'158rpx';
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 50%;
      margin-top: ~'-84rpx';
      left: 50%;
      margin-left: ~'-76rpx';
    }
    .wrapImg {
      width: ~'158rpx';
      height: ~'158rpx';
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
      top: 50%;
      margin-top: ~'-84rpx';
      left: 50%;
      margin-left: ~'-76rpx';
    }
    .img-url {
      width: 100% !important;
      display: inline-block;
      height: 100% !important;
    }
    .bottom-wrap {
      position: absolute;
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .logo-img {
      width: ~'86rpx';
      height: ~'86rpx';
      margin-top: ~'107rpx';
    }
    .small-trans {
      transition: all 1s ease;
      transform: rotate(-360deg);
    }
  }
</style>
