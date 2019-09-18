<template>
  <div class="action">
    <div class="code">
      <input placeholder="输入激活码" placeholder-style="color:#b2b2b2">
    </div>
    <div class="bt">
      <button>确认激活</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index'
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
