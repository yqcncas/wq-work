<template>
  <div class="Ify">
    <div class="IfyTop">
      <div class="IfyTop-input">
        <p>
          <input placeholder="搜索关键词" v-model="search" placeholder-style="color: #cccccc;"/>
          <span class="IfyTop--button" @click="getInfo(search)"><img src="../../../static/images/search.png"></span>
        </p>
      </div>
    </div>
    <!--<div class="Ify-Middle">-->
    <!--<div class="area">-->
    <!--<Vselect :data="select" align="center" fix  @change="getSelectResult($event)"></Vselect>-->
    <!--</div>-->
    <!--</div>-->
    <div class="Ify-Main">
      <div class="card" v-for="(item,index) in cards" :key="index">
        <div  @click="goToCard(item.salesmanId)">
          <div class="cardImg"><img :src="item.imgUrl"/></div>
          <div class="card-main">
            <span class="qiye">企</span>
            <div class="all">
              <span class="names">{{ item.name }}</span>
              <span class="job">{{ item.job }}</span>
              <span class="status">{{ item.status }}</span>
            </div>
            <p class="company">{{ item.salesCompanyName }}</p>
          </div>
          <div class="card-right">
            <p class="eye"><img src="../../../static/images/eye.png"/><span>{{ item.browseCount }}</span> </p>
            <p class="star"><img src="../../../static/images/star.png"/><span>{{ item.praiseCount }}</span> </p>
            <i v-if="item.isCollect === 0" @click="getCollect(item.salesmanId, index)"><img src="../../../static/images/addpersonal.png"/></i>
            <i v-else></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vselect from '@/components/Vselect'
  export default {
    name: 'index',
    components: { Vselect },
    data () {
      return {
        select: [],
        cards: [],
        optionsId: '',
        tradeName: '',
        search: '',
        pageNum: 1,
        pageSize: 50
      }
    },
    async onPullDownRefresh () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.getInfo(this.tradeName, this.pageNum)
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
      wx.stopPullDownRefresh()
    },
    onLoad (options) {
      if (options.name) {
        this.search = options.name
        this.getInfo(this.search)
      }
    },
    onShow () {
    },
    onUnload () {
      this.search = ''
    },
    methods: {
      // 点击跳转进入名片页
      goToCard (id) {
        wx.navigateTo({
          url: `../OthersCard/main?id=` + id
        })
      },
      // 获取收藏
      getCollect (id, index) {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformUserSalesman/insert',
          body: {
            'salesmanId': id,
            'userId': userId,
            'businessId': businessId
          }
        }).then(res => {
          if (res.code === 200) {
            const that = this
            this.number = this.lastPage
            that.cards[index].isCollect = 1
            wx.showToast({
              title: '收藏成功',
              icon: 'none',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 获取自己所关注卡片 名片夹
      getInfo (name) {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.cards = []
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformUserSalesman/getByName',
          body: {
            'userId': userId,
            'name': name
          }
        }).then(res => {
          console.log('res', res)
          // this.cards = res.data.list
          const data = res.data.list
          data.map(item => {
            this.cards.push(item)
          })
          this.lastPage = res.data.lastPage
          this.pageNum = res.data.pageNum
          this.nextPage = res.data.nextPage
        }).catch(err => {
          console.log(err.status, err.message)
        })
      }
      // 人脉集市
      // tradeA () {
      //   const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
      //   const userId = wx.getStorageSync('userId') // 获取本地userId
      //   this.$fly.request({
      //     method: 'get', // post/get 请求方式
      //     url: '/platformSalesman/getByCode',
      //     body: {
      //       'pageNum': 1,
      //       'pageSize': 10,
      //       'tradeId': this.optionsId,
      //       'businessId': businessId,
      //       'userId': userId
      //     }
      //   }).then(res => {
      //     console.log('res', res)
      //     this.cards = res.data.list
      //   }).catch(err => {
      //     console.log(err.status, err.message)
      //   })
      // }
    }
  }
</script>

<style lang="less" scoped>
  @import "./style";
</style>
