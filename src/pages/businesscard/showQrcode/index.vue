<template class="page">
  <div class="ma-trans-page">
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
          <div class="wrap-img">
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
      smallTrans: ''
    }
  },
  methods: {},
  onLoad (options) {
    this.bigTrans = ''
    this.smallTrans = ''
    this.params = options
    setTimeout(() => {
      this.bigTrans = 'trans'
      this.smallTrans = 'small-trans'
    }, 1000)
  }
}
</script>
<style lang="less" scoped>
.ma-trans-page {
  width: 100%;
  height: 150%;
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
    padding-bottom: ~'16rpx;'
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
    margin-top: ~'33rpx';
  }
  .wrap-img {
    width: ~'158rpx';
    height: ~'158rpx';
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    margin-top:~'-88rpx';
    left: 50%;
    margin-left: ~'-76rpx';
    .img-url {
      width: ~'158rpx';
    }
  }
  .bottom-wrap {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .logo-img {
    width: ~'86rpx';
    margin-top: ~'107rpx';
  }
  .small-trans {
    transition: all 1s ease;
    transform: rotate(-360deg);
  }
}
</style>
