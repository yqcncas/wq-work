<template>
  <div class="product">
      <div class="product-Header">
           <img src="/static/images/Information2.jpg" alt="">
      </div>
      <div class="product-main">
          <p>发布动态</p>
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
        p{
            font-size: 28rpx;

        }
    }
}
</style>
