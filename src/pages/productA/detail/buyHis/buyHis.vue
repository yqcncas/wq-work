<template>
  <div class="buy-his">
    <p>以下用户浏览过此商品</p>
    <p>{{browseCount}}人</p>
    <div class="list-wrap">
      <image class="img" v-for="(m,n) in list" :key="n" :src="m.avatarUrl" mode="aspectFill"></image>
    </div>
  </div>
</template>
<script>
import productApi from '@/api/product'
export default {
  data () {
    return {
      params: {
        recordType: 3
      },
      browseCount: null,
      list: []
    }
  },
  methods: {
    //   头像list
    async avatarUrlList () {
      const { code, data } = await productApi.selectAllAvatarUrl(this.params)
      if (code === 200) {
        this.list = data
      }
    }
  },
  onLoad (options) {
    this.params.goodsId = options.goodsId
    this.browseCount = options.browseCount
    this.avatarUrlList()
  }
}
</script>
<style lang="scss">
.buy-his {
  text-align: center;
  font-size: 28rpx;
  color: #000;
  padding-top: 20rpx;
  .list-wrap{
      width: 670rpx;
      text-align: left;
      margin:  20rpx auto;
  }
  .img{
      width: 56rpx;
      height: 56rpx;
      border-radius: 50%;
      margin-left: 10rpx;
      margin-top: 10rpx;
  }
}
</style>
