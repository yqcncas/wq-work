<template>
  <div class="Ify">
    <div class="IfyTop">
      <div class="IfyTop-input">
        <p>
          <input placeholder="搜索关键词" v-model="tradeName" placeholder-style="color: #cccccc;"/>
          <span class="IfyTop--button" @click="getBySearch(tradeName,pageNum)"><img src="../../../../static/images/search.png"></span>
        </p>
      </div>
    </div>
    <div class="Ify-Middle">
      <div class="area">
        <Vselect :data="select" align="center" fix  @change="getSelectResult($event)"></Vselect>
      </div>
    </div>
    <div class="Ify-Main">
      <div class="card" v-for="(item,index) in cards" :key="index">
        <div  @click="goToCard(item.id)">
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
            <p class="eye"><img src="../../../../static/images/eye.png"/><span>{{ item.browseCount }}</span> </p>
            <p class="star"><img src="../../../../static/images/star.png"/><span>{{ item.praiseCount }}</span> </p>
            <i v-if="item.isCollect === 0" @click="getCollect(item.id, index)"><img src="../../../../static/images/addpersonal.png"/></i>
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
        select: [
          {
            label: '分类',
            option: [
              { name: '全部', value: '' }
            ]
          },
          {
            label: '排序',
            option: [
              { name: '最新', value: '1' },
              { name: '最热', value: '0' }
            ]
          }
        ],
        cards: [],
        optionsId: '',
        tradeName: '',
        pageNum: 1,
        pageSize: 50,
        TradeId: '',
        sercod: '',
        sortingType: 0
      }
    },
    onLoad (options) {
      console.log(options)
      if (options.id) {
        // console.log('id', options.id)
        this.TradeId = options.id
        this.lookUp(options.id)
      }
      if (options.name) {
        this.tradeName = options.name
        this.getBySearch(options.name, 1)
      } else {
        this.optionsId = options.id
        this.getBySearch('', 1)
      }
    },
    onUnload () {
      this.tradeName = ''
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
    onShow () {
    },
    methods: {
      // 筛选条件
      getSelectResult (e) {
        // console.log('eeee', e)
        if (e[0] !== null) {
          this.optionsId = e[0]
          this.sortingType = 0
          this.getBySearch('', this.pageNum)
        } else if (e[1] !== null) {
          this.optionsId = ''
          this.sortingType = e[1]
          this.getBySearch('', this.pageNum)
        } else {
          this.optionsId = e[0]
          this.sortingType = e[1]
          console.log('条件', e[0], e[1])
          this.getBySearch('', this.pageNum)
        }
      },
      // 点击跳转进入名片页
      goToCard (id) {
        wx.navigateTo({
          url: `../OthersCard/main?id=` + id
        })
      },
      // 查找类型
      lookUp (id) {
        this.$fly.request({
          method: 'get',
          url: '/trade/selectAllByTradeId',
          body: {
            'tradeId': id
          }
        }).then(res => {
          this.sercod = res.data.list
          this.select[0].option = [{ name: '全部', value: '' }]
          const dataA = res.data.list
          dataA.map(res => {
            this.select[0].option.push({ name: res.tradeName, value: res.id })
          })
          // console.log(this.sercod)
        }).catch(err => {
          console.log(err)
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
      // 人脉集市点入加载
      getBySearch (name, num) {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地userId
        console.log('optionsId', this.optionsId)
        this.cards = []
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/getByCode',
          body: {
            'name': name,
            'pageNum': num,
            'pageSize': 50,
            'sortingType': this.sortingType,
            'tradeId': this.optionsId,
            'businessId': businessId,
            'userId': userId
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
    }
  }
</script>

<style lang="less" scoped>
@import "style";
</style>
