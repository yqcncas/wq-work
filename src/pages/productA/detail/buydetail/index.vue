<template>
  <div class="buy-detail-page">
    <div v-for="(item,index) in buyList" :key="index" class="item-buy">
      <div class="flex-start">
        <image class="header-img" :src="item.avatarUrl" mode="aspectFill"></image>
        <p class="detail-re">{{item.nickName}}<span class="red">{{item.info}}</span>了 {{item.goodsName}}</p>
      </div>
      <span>{{item.dateBefore}}</span>
    </div>
  </div>
</template>
<script>
import apiproducts from '@/api/product'

export default {
  data () {
    return {
      buyList: [],
      params: {
        goodsId: null,
        pageNum: 1,
        pageSize: 10
      },
      lastPage: 100,
      nextPage: 1

    }
  },
  methods: {
    //   显示购买信息
    async getBuyDetail (type) {
      wx.showLoading({
        mask: true
      })
      const { code, data: { buyInfo: { list, pageNum, lastPage, nextPage } } } = await apiproducts.getBuyDetail(this.params)
      wx.hideLoading()
      if (code === 200) {
        if (type === 0) {
          this.buyList = list
        } else {
          list.forEach(e => {
            this.buyList.push(e)
          })
        }
        this.lastPage = lastPage
        this.params.pageNum = pageNum
        this.nextPage = nextPage
      }
    }
  },
  async onPullDownRefresh () {
    this.params.pageNum = 1
    this.getBuyDetail(0)
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },
  // 上拉加载
  async onReachBottom () {
    if (this.params.pageNum < this.lastPage) {
      this.params.pageNum = this.nextPage
      this.getBuyDetail(1)
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onLoad (options) {
    this.params.goodsId = options.goodsId
    this.getBuyDetail(0)
  }
}
</script>
<style lang="scss">
@import "./style";
</style>
