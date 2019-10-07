<template>
  <div class="product">
      <div class="product-Header">
           <img src="/static/images/Information2.jpg" alt="">
      </div>
      <div class="product-main">
          <div class="trends">
            <p>发布动态</p>
          </div> 
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang='less' scoped>
.product{
    width: 100%;
    height: 100%;
    background:rgba(242,242,242,1);
    .product-Header{
        width: 100%;
        height: 290rpx;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .product-main{
        width: 100%;
        background-color: #fff;
        padding: 24rpx 39rpx;
        box-sizing: border-box;
        .trends{
          width: 100%;
          height: 80rpx;
          border-bottom: 2rpx solid #ccc;
          p{
            font-size: 28rpx;
            font-family:PingFang-SC-Regular,PingFang-SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:80rpx;
          }
        }
       
    }
}
</style>
