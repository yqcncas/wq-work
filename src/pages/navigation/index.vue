<template>
  <scroll-view scroll-top="0">
    <div class="index">
      <product :info="infoMain"></product>
    </div>
  </scroll-view>
</template>

<script>
  import navigationBar from '../../components/navigationBar.vue'
  import vueTabBar from '../../components/vueTabBar'
  import product from '../../components/product'
  import personApi from '@/api/person'
  export default {
    components: {
      navigationBar,
      vueTabBar,
      product
    },
    data () {
      return {
        infoMain: 0,
        data: '',
        card: 1,
        imgUrl: '',
        name: '',
        job: '',
        tab: 1,
        tabs: 1,
        info: 1,
        status: 1,
        zan: 2,
        isCollect: '',
        show: 1,
        cardRen: '热门名片',
        cardsMap: '附近名片',
        infoTitle: '附近信息',
        infoTop: '推荐信息',
        selectNavIndex: 2,
        needButton: true,
        handButton: true,
        btnText: '附近',
        indicatorDots: true,
        autoplay: false,
        circular: true,
        interval: 3000,
        duration: 500,
        Message: [],
        Types: [],
        Types1: [],
        cards: [],
        lastPage: '',
        nextPage: '',
        pageNum: 0,
        pageSize: 0,
        lastPageA: '',
        nextPageA: '',
        pageNumA: 0,
        pageSizeA: 0,
        enclosure: [{
          headImg: '../../static/images/gongzhonghao.jpg',
          name: '李松阳',
          job: '技术总监',
          status: '已认证',
          eye: 10,
          star: 10,
          Companyname: '浙江万仟科技有限公司'
        }, {
          headImg: '../../static/images/gongzhonghao.jpg',
          name: '李松阳',
          job: '技术总监',
          status: '已认证',
          eye: 10,
          star: 10,
          Companyname: '浙江万仟科技有限公司'
        }],
        tradeStatus: 1,
        searchKe: '',
        TradeIda: ''
      }
    },
    onShow () {
      // this.searchKe = ''
      // // this.doLogin()
      // // this.getSalesmanId()
      // this.tradeStatus = wx.getStorageSync('tradeStatus')
      // console.log('tradeStatus', this.tradeStatus)
    },
    onLoad () {
      // wx.hideTabBar()
      this.trade()
      this.tradeA()
      this.cards = []
      this.Message = []
      this.show = 1
      this.pageNum = 1
      this.pageNumA = 1
      this.getCard()
      // this.tradeInfor()
    },
    // async onReachBottom () {
    //   if (this.show === 1) {
    //     if (this.pageNum < this.lastPage) {
    //       this.pageNum = this.nextPage
    //       this.getCard(this.pageNum)
    //     } else {
    //       wx.showToast({
    //         title: '没有更多了',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   } else if (this.show === 0) {
    //     if (this.pageNumA < this.lastPageA) {
    //       this.pageNumA = this.nextPageA
    //       this.tradeInfor(this.pageNumA)
    //     } else {
    //       wx.showToast({
    //         title: '没有更多了',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   }
    // },
    onShareAppMessage (options) {
      console.log('options', options)
      const salesmanId = wx.getStorageSync('salesmanId')
      const name = options.target.dataset.item.name
      const id = options.target.dataset.item.id
      const imgUrl = options.target.dataset.item.imgUrl
      this.insertOpera('分享商品', 30, id)
      return {
        title: name,
        imageUrl: imgUrl,
        path: 'pages/loading/main?goodsId=' + id + '&id=' + salesmanId + '&fromWay=1&prams=product'
      }
    },
    methods: {
      // 插入雷达
      async insertOpera (info, recordType, goodsId) {
        let businessId = wx.getStorageSync('businessId')
        this.salesmanId = wx.getStorageSync('salesManId')
        let userId = wx.getStorageSync('userId')
        await personApi.OperationInsert({ businessId, goodsId, info, recordType, salesmanId: this.salesmanId, userId })
      },
      // 搜索
      goToKe (name) {
        console.log('name', name)
        if (name) {
          wx.navigateTo({
            url: '../classify/main?name=' + name
          })
        }
      },
      bindA (e) {
        // wx.hideTabBar()
      },
      // 预览图片
      previewImg (e, A) {
        var imgs = e
        var temp = []
        imgs.map(res => {
          temp.push(res)
        })
        wx.previewImage({
          current: temp[A],
          urls: temp
        })
      },
      // 人脉集市
      trade () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/trade/selectAllByTradeId',
          body: {
            'pageNum': 1,
            'pageSize': 10,
            'tradeId': 0
          }
        }).then(res => {
          // console.log('res', res)
          this.Types = res.data.list
          this.TradeIda = res.data.id
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 人脉集市
      tradeA () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/trade/selectAllByTradeId',
          body: {
            'pageNum': 2,
            'pageSize': 10,
            'tradeId': 0
          }
        }).then(res => {
          this.Types1 = res.data.list
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 信息广场 动态消息
      tradeInfor () {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/dynamic/selectAll',
          body: {
            'pageNum': this.pageNumA,
            'pageSize': 10,
            'businessId': businessId,
            'userId': userId,
            'tradeId': 0
          }
        }).then(res => {
          if (res.code === 200) {
            const data = res.data.list
            data.map(item => {
              this.Message.push(item)
            })
            // this.Message = res.data.lists
            this.lastPageA = res.data.lastPage
            this.pageNumA = res.data.pageNum
            this.nextPageA = res.data.nextPage
            // 时间戳转换成特定日期格式
            let today = this.moment().format('YYYY/MM/DD')
            let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
            const newList = res.data.list
            newList.map(item => {
              if (item.address === null) {
                item.address = ''
              }
              let temp = this.moment(item.createDate)
              let tempData = this.moment(item.createDate).format('YYYY/MM/DD')
              if (tempData === today) {
                item.createDate = temp.format('A hh:mm')
              } else if (tempData === yesterday) {
                item.createDate = '昨天'
              } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.createDate) {
                item.createDate = temp.format('dddd')
              } else {
                item.createDate = tempData
              }
            })
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 获取人脉即使热门名片
      getCard () {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/getByCode',
          body: {
            'pageNum': this.pageNum,
            'pageSize': 10,
            'businessId': businessId,
            'userId': userId
          }
        }).then(res => {
          if (res.code === 200) {
            const data = res.data.list
            data.map(item => {
              this.cards.push(item)
            })
            this.lastPage = res.data.lastPage
            this.pageNum = res.data.pageNum
            this.nextPage = res.data.nextPage
          } else {
            wx.showToast({
              title: '加载失败',
              icon: 'none',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err.status, err.message)
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
      // 人脉集市 信息广场切换
      changTab (index) {
        if (index === 1) {
          this.tab = index
          this.status = index
          this.show = 1
        } else {
          this.tab = index
          this.status = index
          this.show = 0
        }
      },
      // 人脉集市 切换名片
      changTabs (index) {
        if (index === 2) {
          this.cardRen = '热门名片'
          this.cardsMap = '附近名片'
          this.tabs = 1
        } else {
          this.cardRen = '附近名片'
          this.cardsMap = '热门名片'
          this.tabs = 2
        }
      },
      // 信息广场 切换信息
      changInfo (index) {
        if (index === 2) {
          this.infoTitle = '附近信息'
          this.infoTop = '推荐信息'
          this.info = 1
        } else {
          this.infoTitle = '推荐信息'
          this.infoTop = '附近信息'
          this.info = 2
        }
      },
      // 点击跳转进入名片页
      goToCard (id) {
        wx.navigateTo({
          url: `../OthersCard/main?id=` + id
        })
      },
      getInto (e) {
        wx.navigateTo({
          url: `../message/main`
        })
      },
      routerTo (id) {
        wx.navigateTo({
          url: `../classify/main?id=` + id
        })
      },
      // 信息广场 点赞和取消点赞
      thumbsUp (id, status, index) {
        // console.log(id, status)
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/dynamic/praise',
          body: {
            'id': id, 'status': status
          }
        }).then(res => {
          if (status === 0) {
            this.Message[index].isLike = 1
            wx.showToast({
              title: '点赞成功',
              icon: 'none',
              duration: 2000
            })
          } else if (status === 1) {
            // console.log('768', res) // 取消点赞
            // this.tradeInfor()
            this.Message[index].isLike = 0
            wx.showToast({
              title: '取消点赞',
              icon: 'none',
              duration: 2000
            })
          }
        }).catch(err => {
          console.log(err, err.message)
        })
      }
      // // 调用登录接口
      // doLogin () {
      //   wx.login({
      //     success: function (res) {
      //       if (res.code) {
      //         // 发起网络请求
      //         wx.request({
      //           url: `http://api.wq1516.com:8989/server/platformUser/login`,
      //           method: 'post',
      //           data: {
      //             code: res.code,
      //             id: 1
      //           },
      //           success: function (e) {
      //             console.log('1', e)
      //             wx.setStorageSync('token', e.data.data.token)
      //             wx.setStorageSync('businessId', e.data.data.businessId)
      //             wx.setStorageSync('userId', e.data.data.id)
      //             const token = wx.getStorageSync('token') // 获取本地token
      //             console.log('10', token)
      //           }
      //         })
      //       } else {
      //         console.log('获取用户登录态失败！' + res.errMsg)
      //       }
      //     }
      //   })
      // },
      // // 查询salesmanId
      // getSalesmanId () {
      //   const userId = wx.getStorageSync('userId') // 获取本地userId
      //   this.$fly.request({
      //     method: 'get',
      //     url: '/platformSalesman/selectSelfInfo',
      //     body: {
      //       'userId': userId
      //     }
      //   }).then(res => {
      //     const salesmanId = res.data.id
      //     wx.setStorageSync('salesmanId', salesmanId)
      //   }).catch(err => {
      //     console.log(err)
      //   })
      // },
    }
  }
</script>
<style lang="less" scoped>
  @import "./style";
</style>
