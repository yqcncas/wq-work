<template>
  <div class="action">
      <div class="action-main">
        <p class="action-img"><img src="../../../static/images/renzheng.png"/> </p>
        <div class="message">
          <p class="action-name"><input placeholder="企业名称"/></p>
          <p class="action-FdName"><input placeholder="法定代表人姓名" /></p>
          <p class="action-RzName"><input placeholder="认证人姓名" /></p>
          <p class="action-card"><input placeholder="身份证号" /></p>
          <p class="action-jod"><input placeholder="认证职位" /></p>
        </div>
      </div>
      <div class="footer">
        <button class="footer-bt">申请认证</button>
      </div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  components: {
    card
  },

  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
  .action {
    width: 100%;
    height: 100%;
  }
  .action-main{
    width: 90%;
    height: ~'830rpx';
    background: #ffffff;
    display: block;
    margin: 5% auto;
    border-radius: ~'10rpx';
    position: relative;
  }
  .action-img{
    width: 100%;
    height: ~'400rpx';
  }
  .action-img img{
    width: 100%;
    height: ~'350rpx'
  }
  .message{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .message p{
    font-size: ~'30rpx';
    padding: ~'20rpx';
    border-bottom: ~'1rpx' solid #CCCCCC;
  }
  .message p input{
    font-size: ~'30rpx';
    border: none;
    width: 100%;
    height: 100%;
  }
  .message p:last-child{
    border-bottom:none;
  }
  .footer{
    width: 90%;
    display: block;
    margin: ~'80rpx' auto;
  }
  .footer-bt{
    border: none;
    height: ~'97rpx';
    line-height: ~'97rpx';
    font-size: ~'30rpx';
    font-weight: 400;
    color: #ffffff;
    background: #FF6850;
  }
</style>
