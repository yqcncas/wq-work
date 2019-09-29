<template>
  <div class="big-content-page">
    <div class="product-page">
      <section class="sec-nav">
        <navigation-bar
          :back-visible="true"
          :home-path="'/pages/message/main'"></navigation-bar>
      </section>
      <div class="title">
        <span>{{title}}</span>
      </div>
      <div class="nav-control">
        <scroll-view :scroll-y="scrollTop">
        <!--<div class="top">-->
            <!--<div class="bgImg">-->
              <!--<img v-if="imgUrl" :src="imgUrl">-->
            <!--</div>-->
            <!--<div class="info">-->
              <!--<div class="infoMain">-->
                <!--<span class="img">-->
                  <!--<img v-if="logo" :src="logo">-->
                <!--</span>-->
                <!--<span class="name">{{companyName}}</span>-->
                <!--<span class="status">-->
                  <!--<i class="iconfont iconrenzheng"></i>-->
                  <!--<a>认证企业</a>-->
                <!--</span>-->
              <!--</div>-->
            <!--</div>-->
        <!--</div>-->
          <div class="BTop">
            <div class="banner">
              <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" indicator-color= "#ffffff" :interval="interval" :duration="duration" :circular ="circular" class="bannerMain">
                <block v-for="item in imgUrls" :key="index">
                  <swiper-item class="swiper">
                    <img :src="item.image"  @click="previewImageA(imgUrls,index)" class="slide-image"/>
                  </swiper-item>
                </block>
              </swiper>
            </div>

            <div class="Tuik">
              <img v-if="cardStatus === true"  @click="goToTui()" src="https://oss.tzyizan.com/salesInfo/201908081456201565247380716.png">
              <img v-else @click="ToMessage()" src="https://oss.tzyizan.com/salesInfo/201908081456201565247380716.png">
            </div>
            <!--<div class="Tuik" @click="ToMessage()" v-else>-->
            <!--<img src="https://oss.tzyizan.com/salesInfo/201908081456201565247380716.png">-->
            <!--</div>-->
            <div class="ification">
              <wan-taba @change='tabChange' :tabs="category"></wan-taba>
            </div>
          </div>
        </scroll-view>
        <div :class="[Active === true ? 'fade':'F']">
          <div style="position: fixed;top: 0;width: 100%;">
          <div v-if="show === true" :class="[showB === true ? 'fadeup':'fadedown']" >
            <div class="product">
              集市
            </div>
            <Searchbaa :value="searchContent" :isFocus="isFocus" @cancel="cancel" @confirm="confirm" confirmType="search" :height = "height"></Searchbaa>
          </div>
          </div>
          <!--<div v-if="showA=== false" :class="[show === false ? 'fadedownA':'fadeupA'] ">-->
            <!--<wan-tabs @change='tabChange' :tabs="category"></wan-tabs>-->
          <!--</div>-->
          <!--<div v-else-if="showA=== true" :class="[show === true ? 'fadeup':'fadedown'] ">-->
            <!--<wan-tabs @change='tabChange' :tabs="category"></wan-tabs>-->
          <!--</div>-->
            <wan-tabs @change='tabChangeA' :tabs="categoryA"></wan-tabs>
        </div>
      </div>



      <!--样式一-->
      <div class="Amain" v-if="goodsType === 0">
      <div class="product-listA">
        <div class="item-proA" v-for="(item,index) in productList" :key="index">
          <div class="item-pro" v-if="!item.image">
            <image  class="pro-img"  @click="routeTo(item.id,index)" :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_350,h_350/quality,q_100'"
                   mode="aspectFill"></image>
            <div class="Forward">
              <button v-if="shareMain === true" class="share-btn"  @click="shareGoods(item,index)">
                  <i class="iconfont iconfenxiang3"></i>
              </button>
              <button v-else open-type="share" :data-item="item" class="share-btn" @click="openInfo(index)">
                <i class="iconfont iconfenxiang3" @click="shareGoods"></i>
              </button>
            </div>
            <p class="bot-des" @click="routeTo(item.id,index)">{{item.name}}</p>
            <p class="box-browA" @click="routeTo(item.id,index)" v-if="item.getMoney !== null">
              <span class="getMoney">赚</span>
              <i class="MoneyA">￥ {{item.getMoney}}</i>
            </p>
            <div class="price-brow" @click="routeTo(item.id,index)">
              <p v-if="item.priceStatus!==0"><span>￥</span><span class="price">{{item.price}}</span></p>
              <p class="box-brow"><i class="iconfont iconyanjing"></i><span>{{item.browseCount}}</span></p>
            </div>
          </div>
          <!--广告-->
          <div class="main" v-else-if="item.image">
            <div v-if="item.switch == false" class="banner" @click="goToClassBanner(item)">
              <img class="imgMain" :src="item.image" mode="scaleToFill	" />
            </div>
            <div class="excitation" v-else>
              <ad :unit-id="item.appId"></ad>
            </div>
          </div>
          <!--<div v-else class="banner">-->
            <!--<img class="imgMain" :src="item.image" mode="scaleToFill" />-->
          <!--</div>-->
        </div>
      </div>
      </div>


      <!--样式二-->
      <div class="product-listC" v-if="goodsType === 1">
        <div class="" v-for="(item,index) in productList" :key="index">
          <div class="item-pro" v-if="!item.image">
          <!--<div class="topA">-->
            <!--<span class="info">-->
              <!--<i class="HeadImg" v-if="item.headUrl"><img :src="item.headUrl"></i>-->
              <!--<i class="name" v-if="item.salesmanName !== null">{{item.salesmanName}}</i>-->
            <!--</span>-->
          <!--</div>-->
          <image @click="routeTo(item.id, index)" class="pro-img" :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_350,h_350/quality,q_100'"
                 mode="aspectFill"></image>
          <p class="bot-des" @click="routeTo(item.id,index)">{{item.name}}</p>
          <div class="price-brow" @click="routeTo(item.id,index)">
            <p v-if="item.priceStatus!==0" class="price-brow-main">
              <span class="yang">￥</span>
              <span class="price">{{item.price}}</span>
              <sapn class="del">原价 ￥ {{item.price}}</sapn>
            </p>
          </div>
          <div class="look-Num" @click="routeTo(item.id ,index)">
            <p class="browseCount"><i class="iconfont iconyanjing"></i><span v-if="item.browseCount < 99" class="num">浏览{{ item.browseCount}}次</span><span v-else class="num">浏览99+次</span></p>
            <p class="pushCount"><i class="iconfont iconfeiji1"></i><span v-if="item.forwardCount < 99" class="num">分享{{item.forwardCount}} 次</span><span v-else class="num">分享99+次</span></p>
          </div>
          <div class="Forward">
            <button v-if="shareMain === true" class="share-btn"  @click="shareGoods(item,index)">
              <i class="iconfont iconKHCFDC_fenxiang"></i>
            </button>
            <button v-else open-type="share" :data-item="item" class="share-btn" @click="openInfo(index)">
              <i class="iconfont iconKHCFDC_fenxiang" @click="shareGoods"></i>
            </button>
            <!--<button open-type="share" :data-item="item" class="share-btn" @click="openInfo(index)">-->
              <!--<i class="iconfont iconfenxiang3" @click="shareGoods"></i>-->
            <!--</button>-->
          </div>
          <div class="purchase" @click="routeTo(item.id, index)">
            <i class="iconfont iconxingzhuangfuzhi"></i>
          </div>
            <button class="buttonA">分享立赚￥{{item.getMoney}}</button>
        </div>
        <!--广告-->
          <div v-else-if="item.image">
            <div v-if="item.switch == false" class="banner" @click="goToClassBanner(item)">
              <img class="imgMain" :src="item.image" mode="scaleToFill	" />
            </div>
            <div class="excitation" v-else>
              <ad :unit-id="item.appId"></ad>
            </div>
          </div>
          <!--<div v-else class="banner">-->
            <!--<img class="imgMain" :src="item.image" mode="scaleToFill" />-->
          <!--</div>-->
        </div>
      </div>



      <!--样式三-->
      <div class="product-listB" v-if="goodsType === 2">
        <div class="" v-for="(item,index) in productList" :key="index">
          <div class="item-pro"  v-if="!item.image">
            <button v-if="shareMain === true" class="share-btn"  @click="shareGoods(item,index)">
              <i class="iconfont iconfenxiang3"></i>
            </button>
            <button v-else open-type="share" :data-item="item" class="share-btn" @click="openInfo(index)">
              <i class="iconfont iconfenxiang3" @click="shareGoods"></i>
            </button>
            <!--<button open-type="share" :data-item="item" class="share-btn" @click="openInfo(index)">-->
                <!--<i @click="shareGoods" class="iconfont icon31zhuanfa"></i>-->
            <!--</button>-->
            <p  @click="routeTo(item.id,index )">
              <image class="pro-img" :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_350,h_350/quality,q_100'"
                     mode="aspectFill"></image>
            </p>
            <p class="bot-des">{{item.name}}</p>
            <div class="price-brow">
              <p v-if="item.priceStatus!==0" class="price-brow-main"><span class="yang">￥</span><span class="price">{{item.price}}</span></p>
              <p class="box-brow" v-if="item.getMoney !== null">
                <span class="getMoney">赚</span>
                <span class="Money">￥ {{item.getMoney}}</span>
              </p>
            </div>
            <div class="look-Num">
              <p class="browseCount"><i class="iconfont iconyanjing"></i><span class="num">浏览{{ item.browseCount}}次</span></p>
              <p class="pushCount"><i class="iconfont iconfeiji1"></i><span class="num">已推{{item.forwardCount}}次</span></p>
            </div>
            <div class="purchase" @click="routeTo(item.id, index)">
              <span>抢购</span>
            </div>
          </div>
          <!--广告-->
          <div v-else-if="item.image">
            <div v-if="item.switch == false" class="banner" @click="goToClassBanner(item)">
              <img class="imgMain" :src="item.image" mode="scaleToFill	" />
            </div>
            <div class="excitation" v-else>
              <ad :unit-id="item.appId"></ad>
            </div>
          </div>
          <!--<div v-else class="banner">-->
            <!--<img class="imgMain" :src="item.image" mode="scaleToFill" />-->
          <!--</div>-->
        </div>
      </div>
      <!--<FloatBox :home="false" phone="value"></FloatBox>-->
      <!--<CustomTabbar url="/pages/product/index"></CustomTabbar>-->
      <div class="footer" @click="goProduct">
        <span>发布<br>产品</span>
      </div>
    </div>

    <div class="share" v-if="share === true">
      <div class="main">
        <p class="img"><img src="https://oss.tzyizan.com/businessFile/201909291116211569726981643.png"></p>
        <p class="smallTitle">{{smallTitle}}</p>
        <p class="bigTitle">{{bigTitle}}<span class="yellow">立赚{{getMoney}}元</span></p>
        <div class="bt">
          <button class="now" v-if="shareStatus == 0" @click="goTo('/pages/pageA/Member/main')">马上开通</button>
          <button class="now" v-else @click="goTo('/pages/pageA/Pusher/main')">马上开通</button>
          <button open-type="share" :data-item="ShareItem" class="goON" @click="openInfo(ShareIndex)">
            继续分享
          </button>
        </div>
        <p class="delete" @click="cancelDe">
          <i class="iconfont icondel2"></i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import CustomTabbar from '@/components/customTabbar'
  import navigationBar from '@/components/navigationBar.vue'
  import { getExt } from '@/utils/index'
  import FloatBox from '@/components/floatBox'
  import tabs from '@/components/wan/tabs'
  import taba from '@/components/wan/taba'
  import Searchbaa from '@/components/Searchbaa'
  import product from '@/api/product'
  import personApi from '@/api/person'
  export default {
    props: {
      info: {
        type: Number,
        default: {}
      }
    },
    data () {
      return {
        imgUrls: [{
          src: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
        }, {
          src: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'
        }, {
          src: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        }
        ],
        smallTitle: '自用省钱 分享赚钱',
        bigTitle: '开通会员',
        getMoney: '',
        vipDistributorStatus: '',
        share: false,
        ShareItem: '',
        ShareIndex: '',
        shareStatus: 0,
        shareMain: true,
        categoryA: [{
          businessId: 1,
          id: 0,
          sorting: 0,
          typeId: 0,
          typeName: '综合'
        }, {
          businessId: 1,
          id: 1,
          sorting: 0,
          typeId: 0,
          typeName: '销量'
        }, {
          businessId: 1,
          id: 2,
          sorting: 0,
          typeId: 0,
          typeName: '人气'
        }
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        circular: true,
        scrollTop: 0,
        category: [],
        // categoryA: [],
        showA: '',
        categoryId: '',
        showB: '',
        productList: [],
        Active: false,
        show: false,
        pageNum: 1,
        lastPage: 100,
        nextPage: 1,
        pageSize: 6,
        searchContent: '',
        isFocus: false,
        apply: '',
        id: '',
        name: '',
        personApi: personApi,
        companyName: '',
        logo: 'https://oss.wq1516.com/businessImage/201902011110241548990624073.png',
        imgUrl: 'https://oss.tzyizan.com/businessImage/201907181428461563431326479.png',
        goodsType: 0,
        url: '',
        sortingType: '',
        cardStatus: false,
        card: false,
        title: '产品'
      }
    },

    components: {
      Searchbaa,
      navigationBar,
      FloatBox,
      'wan-tabs': tabs,
      'wan-taba': taba,
      CustomTabbar
    },
    onLoad () {
      this.getLogo()
      this.getCategory()
      this.getProduct({ type: 0 })
      this.getType()
      this.getNews()
      this.getInfo()
      this.getTitle()
      this.vipDistributorStatus = wx.getStorageSync('vipDistributorStatus')
      if (this.vipDistributorStatus === 0) {
        this.getShop()
      } else {
        this.getMerber()
      }
    },
    onShow () {
      this.getInfo()
      this.getTitle()
      // this.getProduct({ type: 0 })
    },
    onPageScroll: function (ev) {
      // console.log('ev', ev)
      // var _this = this
      /* 当滚动的top值最大或者最小时，为什么要做这一步是由于在手机实测小程序的时候会发生滚动条回弹，所以为了解决回弹，设置默认最大最小值   */
      if (ev.scrollTop <= 0) {
        ev.scrollTop = 0
      } else if (ev.scrollTop > wx.getSystemInfoSync().windowHeight) {
        ev.scrollTop = wx.getSystemInfoSync().windowHeight
      }
      // 判断浏览器滚动条上下滚动
      if (ev.scrollTop > this.scrollTop || ev.scrollTop === wx.getSystemInfoSync().windowHeight) {
        // this.showA = true
        this.showA = true
        this.showB = true
        if (ev.scrollTop > 245) {
          this.show = true
        } else if (ev.scrollTop < 245) {
          this.show = false
        }
        if (ev.scrollTop > 260) {
          this.Active = true
        }
        // console.log('向下滚动'283)
      } else {
        this.showA = false
        if (ev.scrollTop < 255) {
          this.showB = false
        }
        if (ev.scrollTop < 245) {
          this.show = false
        } else if (ev.scrollTop > 245) {
          this.show = true
        }
        if (ev.scrollTop < 260) {
          this.Active = false
          // this.show = false
        }
        // console.log('向上滚动')
      }
      this.scrollTop = ev.scrollTop
      // 给scrollTop重新赋值
      setTimeout(function () {
        this.scrollTop = ev.scrollTop
      }, 0)
    },

    // 上拉加载
    async onReachBottom () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.getProduct({ type: 1 })
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    },
    async onPullDownRefresh () {
      this.pageNum = 1
      this.getNews()
      this.getTitle()
      this.getProduct(0)
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    },
    // onTabItemTap (item) {
    //   this.getProduct({ type: 0 })
    // },
    // onLoad () {
    //   this.getCategory()
    //   this.getProduct({ type: 0 })
    // },
    // onShow () {
    //   // wx.hideTabBar()
    // },
    // onShareAppMessage () {
    //   let companyName = wx.getStorageSync('companyName')
    //   return {
    //     title: companyName,
    //     path: 'pages/loading/index?fromWay=1&param=product'
    //
    //   }
    // },
    onHide () {
      this.share = false
    },
    methods: {
      // 跳转
      goTo (url) {
        wx.navigateTo({
          url
        })
      },
      // 查询会员等级信息
      getMerber () {
        const businessId = wx.getStorageSync('businessId')
        this.$fly.request({
          method: 'get',
          url: 'vip/findList',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          const Member = wx.getStorageSync('vipId')
          this.silver = res.data
          if (Member === 0 || Member === null || Member === '') {
            this.Member = '无会员'
            wx.setStorageSync('vipId', 0)
            this.smallTitle = '自用省钱 分享赚钱'
            this.bigTitle = '开通会员'
            this.shareStatus = 0
          } else {
            this.getShop()
            this.silver = res.data
            this.silver.map((item) => {
              if (Member === item.id) {
                this.Member = item.levelName
              }
            })
          }
          console.log('resAAAA', this.Member)
        }).catch(err => {
          console.log('err', err)
        })
      },
      // 获取分销商信息
      getShop () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/distributor/selectOne',
          body: {
          }
        }).then(res => {
          const isDistributor = res.data.isDistributor
          console.log('isDistributor', isDistributor)
          if (isDistributor === 1) {
            this.shareMain = false
            this.shareStatus = 0
          } else {
            this.shareMain = true
            this.smallTitle = '自用省钱 分享赚钱'
            this.bigTitle = '开通分销商'
            this.shareStatus = 1
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      previewImageA (e, A) {
        var imgs = e
        var temp = []
        imgs.map(res => {
          temp.push(res.image)
        })
        wx.previewImage({
          current: temp[A],
          urls: temp
        })
      },
      // 跳转小程序 或 查看大图
      goToClassBanner (res) {
        // console.log('banner', res)
        if (res.type === 0) {
          wx.previewImage({
            current: res.image,
            urls: [res.image]
          })
        } else if (res.type === 2) {
          wx.navigateToMiniProgram({
            appId: res.appId,
            path: 'pages/loading/main',
            extraData: {
              fromWay: 0
            },
            envVersion: 'release',
            success (res) {
              // 打开其他小程序成功同步触发
              wx.showToast({
                title: '跳转成功'
              })
            }
          })
        }
      },
      // 自定义标题栏
      getTitle () {
        const businessId = wx.getStorageSync('businessId')
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/busiPageTitle/selectOne',
          body: {
            'businessId': businessId,
            'pageType': 2
          }
        }).then(res => {
          if (res.code === 200) {
            this.title = res.data.name
          }
          // console.log('title', res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 获取广告
      getNews () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/advert/list',
          body: {
            pageNum: 1,
            pageSize: 5,
            position: 0
          }
        }).then(res => {
          if (res.code === 200) {
            this.imgUrls = res.data.list
          }
          // console.log('News', res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 进入推客页面
      ToMessage () {
        wx.showToast({
          title: '请先注册名片',
          icon: 'none',
          duration: 2000
        })
      },
      // 获取分销商信息
      goToTui () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/distributor/selectOne',
          body: {
          }
        }).then(res => {
          const isDistributor = res.data.isDistributor
          // console.log('isDistributor', isDistributor)
          if (isDistributor === 1) {
            wx.redirectTo({
              url: '/pages/pageA/agencyCenter/main'
            })
            wx.setStorageSync('BuyId', 3)
            // console.log('resAAA', this.choose[6].url)
          } else {
            wx.redirectTo({
              url: '/pages/pageA/Pusher/main'
            })
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 页面加载信息
      getInfo () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': userId
          }
        }).then(res => {
          const data = wx.getStorageSync('Card')
          if (res.data !== null) {
            this.postForm = res.data
            this.card = true
          } else {
            this.card = false
          }
          if (data !== true) {
            this.url = '../businesscard/main'
            this.cardStatus = false
          } else {
            this.url = '/pages/prod/product/main'
            this.cardStatus = true
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      goProduct () {
        if (this.cardStatus === true) {
          wx.navigateTo({
            url: '/pages/prod/product/main'
          })
        } else {
          wx.showToast({
            title: '请先注册名片',
            duration: 2000,
            icon: 'none'
          })
        }
      },
      openInfo (index) {
        // this.getProduct({ type: 0 })
        // console.log('info', this.info)
        this.share = false
        this.productList[index].forwardCount = this.productList[index].forwardCount + 1
        // this.productList.map(async item => {
        //   item.forwardCount = item.forwardCount + 1
        // })
      },
      getType () {
        const businessId = wx.getStorageSync('businessId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/selfPageInfo/selectAllForUser',
          body: {
            'businessId': businessId,
            'type': 4
          }
        }).then(res => {
          if (res.data) {
            this.goodsType = res.data[0].cardType
          }
          // const tradeStatus = res.data.tradeStatus
          // wx.setStorageSync('tradeStatus', tradeStatus)
        }).catch(err => {
          console.log(err)
        })
      },
      getLogo () {
        const businessId = wx.getStorageSync('businessId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/business/findById',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          if (res.data) {
            this.companyName = res.data.companyName
            if (res.data.logo !== null) {
              this.logo = res.data.logo
            } else {
              this.logo = 'https://oss.wq1516.com/businessImage/201902011110241548990624073.png'
            }
            if (res.data.imgUrl !== null) {
              this.imgUrl = res.data.imgUrl
            } else {
              this.imgUrl = 'https://oss.tzyizan.com/businessImage/201907181428461563431326479.png'
            }
          }
          // const tradeStatus = res.data.tradeStatus
          // wx.setStorageSync('tradeStatus', tradeStatus)
        }).catch(err => {
          console.log(err)
        })
      },
      getInto (e) {
        if (this.card === true) {
          wx.navigateTo({
            url: `../message/main`
          })
        } else {
          wx.showToast({
            title: '请先注册名片',
            duration: 2000,
            icon: 'none'
          })
        }
      },
      cancel (val) {
        this.$nextTick(() => {
          this.isFocus = false
          this.searchContent = ''
          this.getProduct(0)
        })
      },
      //   分享
      shareGoods (item, index) {
        this.ShareIndex = index
        this.ShareItem = item
        this.share = true
        this.getMoney = item.getMoney
      },
      // 取消分享界面
      cancelDe () {
        this.share = false
      },
      confirm (e) {
        this.searchContent = e.mp.detail.value
        this.isFocus = false
        this.getProduct(0)
      },
      routeTo (id, index) {
        // console.log('aaa')
        this.insertOperaA('查看了产品', 3, id)
        wx.navigateTo({
          url: '../productA/detail/main?id=' + id
        })
        console.log('index', index)
        this.productList[index].browseCount = this.productList[index].browseCount + 1
        // this.productList.map(async item => {
        //   item.browseCount = item.browseCount + 1
        // })
      },
      // 插入雷达
      async insertOperaA (info, recordType, id) {
        const businessId = wx.getStorageSync('businessId')
        const salesmanId = wx.getStorageSync('salesmanId')
        const userId = wx.getStorageSync('userId')
        await personApi.OperationInsert({businessId: businessId, goodsId: id, info, recordType, salesmanId: salesmanId, userId: userId})
      },
      // 得到商品的列表
      async getProduct ({ type = 0, name = '' }) {
        // console.log('11111')
        let businessId = getExt().shopId
        const result = await product.getProduct({ businessId, pageNum: this.pageNum, pageSize: this.pageSize, type: this.categoryId, name: this.searchContent, sortingType: this.sortingType })
        result.data.list.map(item => {
          item.price = item.price ? item.price.toFixed(2) : ''
        })
        let productData = result.data
        if (type === 0) {
          this.productList = productData.list
        } else {
          result.data.list.forEach(e => {
            this.productList.push(e)
          })
        }
        console.log('productList', this.productList)
        this.lastPage = productData.lastPage
        this.pageNum = productData.pageNum
        this.nextPage = productData.nextPage
      },
      // 得到商品种类
      async getCategory () {
        let businessId = getExt().shopId
        const result = await product.getCategory({ businessId })
        const category = result.data
        // console.log('categoryA', category)
        // category.unshift({
        //   business_id: businessId,
        //   id: '',
        //   typeId: 0,
        //   iconUrl: 'https://oss.tzyizan.com/goodsTypeIcon/微信图片_20190815083453.png',
        //   typeName: '全部'
        // })
        this.category = category
      },
      // 滚动bar，可以根据类别来查找每一类商品
      tabChange (obj) {
        this.pageNum = 1
        this.searchContent = ''
        // wx.pageScrollTo({
        //   scrollTop: 290
        // })
        this.categoryId = obj.categoryId
        this.getProduct(0)
      },
      tabChangeA (obj) {
        this.pageNum = 1
        this.searchContent = ''
        wx.pageScrollTo({
          scrollTop: 260
        })
        this.categoryId = ''
        this.sortingType = obj.sortingType
        this.getProduct(0)
      }
    }
  }
</script>

<style lang="scss" scoped>
   // 产品分享
   .share{
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     overflow-y: hidden;
     background: rgba(0,0,0,0.5);
     z-index: 9999!important;
     display: flex;
     align-items: center;
     justify-content: center;
     .main{
       text-align: center;
       .img{
         width: 480rpx;
         height: 322rpx;
         img{
           display: inline-block;
           width: 377rpx;
           height: 322rpx;
         }
       }
       .smallTitle{
          font-size: 44rpx;
         color: #ffffff;
         font-weight: 600;
         margin-top: 15rpx;
       }
       .bigTitle{
         font-size: 44rpx;
         color: #ffffff;
         font-weight: 600;
         margin-top: 10rpx;
         .yellow{
           font-size: 56rpx;
           color: #FEF104;
           display: inline-block;
           font-weight: 700;
         }
       }
       .bt{
         width: 450rpx;
         display: flex;
         justify-content: space-between;
         margin-top: 20rpx;
         .now{
           width: 206rpx;
           height: 65rpx;
           background: #ffffff;
           color: #FF4A29;
           font-size: 28rpx;
           display: inline-block;
           border-radius: 30rpx;
         }
         .goON{
           width: 206rpx;
           height: 65rpx;
           background: #FEF104;
           color: #FF4A29;
           font-size: 28rpx;
           border-radius: 30rpx;
           display: inline-block;
         }
       }
       .delete{
         margin-top: 100rpx;
         .icondel2{
           color: #ffffff;
           font-size: 30rpx;
         }
       }
     }
   }

  .classImg{
    width: 87rpx!important;
    height: 87rpx!important;
    border-radius: 50%;
    display: inline-block;
  }
  .fadedownA{
    animation: spin-downA 0.5s linear normal;
    animation-delay: 0.2s;
  }
  .fadeupA{
    animation: spin-topA 0.5s linear normal;
    animation-delay: 0.2s;
  }
  @keyframes spin-topA {
    0% {
      opacity: 0.3
    }
    50% {
      opacity: 0.6
    }
    100% {
      opacity: 1
    }
  }
  @keyframes spin-downA {
    0% {
      opacity: 1
    }
    50% {
      opacity: 0.5
    }
    100% {
      opacity: 0.3
    }
  }
  .fadedown{
    width: 100%;
    height: 100%;
    z-index: 99999;
    animation: spin-down 0.8s linear normal;
    animation-delay: 0s;
  }
  @keyframes spin-down {
    0% {
      opacity: 1
    }
    10% {
      opacity: 0.9
    }
    20% {
      opacity: 0.8
    }
    30% {
      opacity: 0.7
    }
    40% {
      opacity: 0.6
    }
    50% {
      opacity: 0.5
    }
    60% {
      opacity: 0.4
    }
    70% {
      opacity: 0.3
    }
    80% {
      opacity: 0.2
    }
    90% {
      opacity: 0.1
    }
    100% {
      opacity: 0
    }
  }
  .fadeup{
    width: 100%;
    /*height: 100%;*/
    z-index: 99999;
    animation: spin-top 0.8s linear normal;
    animation-delay: 0s;
  }
  @keyframes spin-top {
    0% {
      opacity: 0
    }
    10% {
      opacity: 0.1
    }
    20% {
      opacity: 0.2
    }
    30% {
      opacity: 0.3
    }
    40% {
      opacity: 0.4
    }
    50% {
      opacity: 0.5
    }
    60% {
      opacity: 0.6
    }
    70% {
      opacity: 0.7
    }
    80% {
      opacity: 0.8
    }
    90% {
      opacity: 0.9
    }

    100% {
      opacity: 1
    }
  }
  .fade{
    /*animation: spin-top 0.6s linear normal;*/
    width: 100%;
    position: fixed;
    top: 253rpx;
    z-index: 9999;
  }
  .product{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 170rpx;
    background: #ffffff;
    line-height: 170rpx;
    font-size: 35rpx;
    font-weight: 700;
  }
  %flexRow {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .product-page {
    .title{
      width: 100%;
      height: 150rpx ;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        font-weight: 600;
        font-size: 37rpx;
        color: #000000;
      }
    }
    width: 100%;
    min-height: 100%;
    background-color: #f0eff5;
    box-sizing: border-box;
    padding-bottom: 30rpx;
    position: relative;
    .sec-nav{
      position: absolute;
      top: 100rpx;
      z-index: 999999;
    }
  }
  .nav-control {
    width: 100%;
    height: 708rpx;
    background: #ffffff;
    z-index: 1000;
    /*position: fixed;*/
    /*top:0;*/
    .BTop{
      width: 100%;
      background: #ffffff;
      .Tuik{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        margin-top: 20rpx;
        img{
          width: 715rpx;
          height: 103rpx;
        }
      }
      .banner{
        display: flex;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        .bannerMain{
          width: 715rpx;
          /*background: #000000;*/
          height: 301rpx;
          z-index: 9999!important;
          border-radius: 10rpx;
          .swiper{
            width: 715rpx;
            height: 301rpx;
            border-radius: 10rpx;
            .slide-image{
              width: 715rpx;
              height: 301rpx;
              display: inline-block;
              border-radius: 10rpx;
            }
          }
        }
      }



      /*.ification{*/
        /*width: 100%;*/
        /*!*margin-top: 20rpx;*!*/
        /*height: 150rpx;*/
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/
        /*.scorll{*/
          /*margin-top: 20rpx;*/
          /*height: 120rpx;*/
          /*display: inline-block;*/
          /*.van-tabs__nav--line {*/
            /*padding:0 20rpx;*/
            /*.van-tabs__line {*/
              /*z-index: 1;*/
              /*left: 0;*/
              /*bottom: 0;*/
              /*height: 4rpx;*/
              /*position: absolute;*/
              /*background-color: #f44;*/
              /*.van-tab {*/
                /*padding: 0 10rpx;*/
                /*font-size: 28rpx;*/
                /*position: relative;*/
                /*color: #333;*/
                /*line-height: 88rpx;*/
                /*text-align: center;*/
                /*box-sizing: border-box;*/
                /*background-color: #fff;*/
                /*.van-ellipsisA{*/
                  /*width: 80rpx;*/
                  /*height: 120rpx;*/
                  /*display: inline-block;*/
                  /*.sImg{*/
                    /*width: 87rpx;*/
                    /*height: 87rpx;*/
                    /*border-radius: 50%;*/
                    /*.classImg{*/
                      /*width: 87rpx!important;*/
                      /*height: 87rpx!important;*/
                      /*border-radius: 50%;*/
                      /*display: inline-block;*/
                    /*}*/
                  /*}*/
                  /*.sTram{*/
                    /*font-size: 30rpx;*/
                    /*color: #9B9B9B;*/
                  /*}*/
                /*}*/
              /*}*/
            /*}*/
          /*}*/
        /*}*/
      /*}*/
    }


    .top{
      width: 100%;
      height: 301rpx;
      background: #ffffff;
      position: relative;
      transition: all 0.4s ease;
      .bgImg{
        width: 100%;
        height: 340rpx;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .info{
        position: absolute;
        top: 250rpx;
        width: 100%;
        .infoMain{
          display: flex;
          width: 695rpx;
          height: 196rpx;
          margin: 0 auto;
          box-shadow: 2rpx 2rpx 5rpx #cccccc;
          background: #ffffff;
          border-radius: 10rpx;
          position: relative;
          .img{
            position: absolute;
            top: 27rpx;
            left: 40rpx;
            width:142rpx;
            height: 142rpx;
            img{
              border-radius: 50%;
              width: 100%;
              height: 100%;
            }
          }
          .name{
            position: absolute;
            top: 50rpx;
            left: 225rpx;
            color: #4A4A4A;
            font-weight: 500;
            font-size: 30rpx;
          }
          .status{
            position: absolute;
            top: 100rpx;
            left: 220rpx;
            .iconrenzheng{
              color: #2a94ec;
              font-size: 32rpx;
              display: inline-block;
            }
            a{
              display: inline-block;
              color: #4A4A4A;
              font-size: 24rpx;
            }
          }
        }
      }
    }
    .weui-search-bar {
      border-color: #eee;
      background-color: #fff;
      border: none;
    }
    .weui-search-bar__label {
      font-size: 0;
      background-color: #f0eff5;
    }
    .weui-search-bar__box {
      background-color: #f0eff5;
    }
    .weui-search-bar__cancel-btn {
      font-size: 28rpx;
      color: #2a94ec;
    }
    .weui-search-bar__form {
      border: 0;
      border-radius: 100rpx;
      overflow: hidden;
    }
    .weui-icon-search {
      font-size: 42rpx;
    }
    //   种类
    .van-tabs__nav--line .van-ellipsis {
      color: #9b9b9b;
      white-space: nowrap;
    }
    .tab-active .van-ellipsis {
      color: #4a90e2!important;
    }
    .weui-search-bar__input {
      color: #9b9b9b;
    }
    .van-hairline--bottom::after,
    .van-hairline--left::after,
    .van-hairline--right::after,
    .van-hairline--surround::after,
    .van-hairline--top-bottom::after,
    .van-hairline--top::after,
    .van-hairline::after {
      border: none;
    }
  }
  // 商品详情
  .product-listC {
    z-index: 9999!important;
    margin-top: 0rpx;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    font-size: 0;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: center;
    text-align: center;
    // 广告图片
    .banner {
      width: 656rpx;
      height: 258rpx;
      margin: 30rpx auto 0;
      .imgMain{
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: 10rpx;
      }
    }
    .excitation{
      width: 656rpx;
      /*height: 258rpx;*/
      margin: 30rpx auto 0;
    }
    .excitation{
      width: 656rpx;
      /*height: 258rpx;*/
      margin: 20rpx auto;
    }
    .item-pro {
      width: 704rpx;
      height: 236rpx;
      border-radius: 10rpx;
      background-color: #fff;
      display: inline-block;
      margin: 30rpx auto 0;
      box-sizing: border-box;
      position: relative;
      /*z-index: 99;*/
      .pro-img {
        width: 236rpx;
        height: 236rpx;
        float: left;
        border-top-left-radius: 10rpx;
        border-bottom-left-radius: 10rpx;
      }
      .topA{
        position: absolute;
        bottom: 0;
        width: 200rpx;
        background-color:rgba(0,0,0,0.5);
        border-bottom-left-radius: 10rpx;
        .info{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 44rpx;
          .HeadImg{
            display: inline-block;
            vertical-align: bottom;
            img{
              width: 35rpx;
              height: 35rpx;
              border-radius: 50%;
            }
          }
          .name{
            display: inline-block;
            font-size: 22rpx;
            color: #ffffff!important;
            margin-left: 10rpx;
            max-width: 100rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow:ellipsis;
          }
        }
      }
    }
    // 文字描述
    .bot-des {
      text-align: left;
      font-size: 24rpx;
      color: #4a4a4a;
      font-weight: 600;
      width: 380rpx;
      height: 70rpx;
      margin: 20rpx 15rpx 0rpx;
      padding-left: 15rpx;
      display: inline-block;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .look-Num{
      position: absolute;
      top: 145rpx;
      left: 216rpx;
      font-size: 16rpx;
      padding: 4rpx 30rpx 0rpx 28rpx;
      color: #9d9d9d;
      text-align: left;
      .browseCount{
        display: inline-block;
        margin-right: 10rpx;
        margin-left: 10rpx;
        .iconyanjing{
          display: inline-block;
          color: #cccccc;
          font-size: 20rpx;
          vertical-align: top;
          margin-right: 10rpx;
        }
      }
      .pushCount{
        display: inline-block;
        margin-right: 10rpx;
        margin-left: 10rpx;
        .iconfeiji1{
          display: inline-block;
          color: #CCCCCC;
          font-size: 20rpx;
          vertical-align: top;
          margin-right: 10rpx;
        }
      }
      .renZ{
        display: inline-block;
        .iconrenzheng{
          display: inline-block;
          vertical-align: top;
          color: #CCCCCC;
          font-size: 26rpx;
          margin-right: 10rpx;
        }
      }
    }
    .price-brow {
      font-size: 22rpx;
      display: block;
      height: 50rpx;
      /*width: 400rpx;*/
      margin: 0rpx 16rpx;
      color: #9d9d9d;
      text-align: left;
      .price-brow-main {
        float: left;
        margin: 10rpx 15rpx;
        .price {
          font-size: 34rpx;
          margin-left: 4rpx;
          color: #FD6A43;
        }

        .yang {
          font-size: 22rpx;
          color: #FE5250;
          margin-left: 4 rpx;
        }
        .del{
          text-decoration: line-through;
          text-decoration-color: #FD6A43;
          font-size: 20rpx;
          margin-left: 20rpx;
        }
      }

      .box-brow {
        float: left;
        margin: 10rpx 5rpx;
        .getMoney {
          text-align: center;
          float: left;
          width: 43rpx;
          height: 36rpx;
          margin-left: 10rpx;
          background: #FF424E;
          color: #ffffff;
          font-size: 22rpx;
          border-top-left-radius: 10rpx;
          border-bottom-left-radius: 10rpx;
        }
        .Money {
          width: 108rpx;
          height: 34rpx;
          display: inline-block;
          text-align: center;
          border: 1rpx solid #FF424E;
          border-top-right-radius: 10rpx;
          border-bottom-right-radius: 10rpx;
        }
      }
    }
    // 转发
    .Forward{
      position: absolute;
      top: 20rpx;
      right: 20rpx;
      .share-btn{
        padding: 0rpx 20rpx;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #FF8331;
        .iconKHCFDC_fenxiang{
          color: #ffffff;
          font-size: 20rpx;
        }
      }
    }
    // 抢购
    .purchase{
      /*width: 100rpx;*/
      /*height: 38rpx;*/
      display: block;
      /*border: 1px solid #4A4A4A;*/
      color: #4A4A4A;
      position: absolute;
      right: 20rpx;
      bottom: 12rpx;
      width: 40rpx;
      height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FF553B;
      border-radius: 50%;
      .iconxingzhuangfuzhi{
        color:#ffffff;
        font-size: 22rpx;
      }
      span{
        font-size:24rpx;
        width: 100%;
        height: 38rpx;
        line-height: 38rpx;
        color: #4A4A4A;
      }
    }
    .buttonA{
      display: block;
      width: 212rpx;
      height: 40rpx;
      position: absolute;
      bottom: 12rpx;
      left: 250rpx;
      border-radius: 30rpx;
      background: linear-gradient(to right,#FF4F3B 33%, #FF793B 66%,#FF953B);
      font-size: 20rpx;
      line-height: 40rpx;
      color: #ffffff;
    }
  }



  // 商品详情
  .product-listB {
    /*margin-top: 180rpx;*/
    z-index: 999;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 20 rpx 8 rpx 0;
    font-size: 0;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: center;
    text-align: center;
    // 广告图片
    .banner {
      width: 656rpx;
      height: 258rpx;
      margin: 30rpx auto 0 ;
      .imgMain{
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: 10rpx;
      }
    }
    .excitation{
      width: 656rpx;
      /*height: 258rpx;*/
      margin: 30rpx auto 0;
    }
    .item-pro{
      width: 694rpx;
      height: 862rpx;
      background-color: #fff;
      display: inline-block;
      margin: 30rpx auto 0;
      box-sizing: border-box;
      position: relative;
      /*z-index: 99;*/
      .pro-img {
        width: 645rpx;
        height: 651rpx;
        margin: 20rpx;
      }
      .share-btn{
        position: absolute;
        right: 15rpx;
        top: -10rpx;
        .icon31zhuanfa{
          color: #eeeeee;
          padding: 10rpx 20rpx;
          font-size: 40rpx;
        }
      }
      // 文字描述
      .bot-des {
        text-align: left;
        font-size: 24rpx;
        color: #4a4a4a;
        width: 644rpx;
        height: 40rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin: 4rpx 25rpx 0;
      }
    }
    .price-brow {
      font-size: 22rpx;
      width: 662rpx;
      display: inline-block;
      margin: 10rpx 16rpx;
      color: #9d9d9d;
      .price-brow-main{
        margin-right: 50rpx;
        float: left;
        .price {
          font-size: 28rpx;
          margin-left: 4rpx;
          color: #FE5250;
        }
        .yang{
          font-size: 22rpx;
          color: #FE5250;
          margin-left: 4rpx;
        }
      }
      .box-brow{
        float: left;
        .getMoney{
          text-align: center;
          float: left;
          width: 43rpx;
          height: 36rpx;
          margin-left: 10rpx;
          background: #FF424E;
          color: #ffffff;
          font-size: 22rpx;
          border-top-left-radius: 10rpx;
          border-bottom-left-radius: 10rpx;
        }
        .Money{
          width: 108rpx;
          height: 34rpx;
          display: inline-block;
          text-align: center;
          border:1rpx solid #FF424E;
          border-top-right-radius: 10rpx;
          border-bottom-right-radius: 10rpx;
        }
      }
    }

    .look-Num{
      width: 634rpx;
      font-size: 22rpx;
      margin: 10rpx 30rpx 10rpx 28rpx;
      color: #9d9d9d;
      display: block;
      text-align: left;
      .browseCount{
        display: inline-block;
        margin-right: 20rpx;
        .iconyanjing{
          display: inline-block;
          color: #cccccc;
          font-size: 30rpx;
          margin-right: 10rpx;
        }
      }
      .pushCount{
        display: inline-block;
        .iconfeiji1{
          display: inline-block;
          color: #CCCCCC;
          font-size: 28rpx;
          margin-right: 10rpx;
        }
      }
    }
    // 抢购
    .purchase{
      width: 166rpx;
      height: 53rpx;
      border: 1px solid #4A4A4A;
      color: #4A4A4A;
      position: absolute;
      right: 52rpx;
      bottom: 45rpx;
      border-radius: 10rpx;
      span{
        font-size:26rpx;
        width: 100%;
        height: 53rpx;
        line-height: 53rpx;
        color: #4A4A4A;
      }
    }
  }
  // 商品列表
  .Amain{
    width: 100%;
    margin: 20rpx 0;
    .product-listA {
      /*margin-top: 180rpx;*/
      /*overflow: auto;*/
      /*-webkit-overflow-scrolling: touch;*/
      width: 728rpx;
      margin: 0 auto;
      .item-proA{
        display: inline-block;
        margin-bottom: 24rpx;
        // 广告图片
        .main{
          width: 728rpx;
          .banner {
            width: 656rpx;
            height: 258rpx;
            margin: 0 auto;
            .imgMain{
              width: 100%;
              height: 100%;
              display: inline-block;
              border-radius: 10rpx;
            }
          }
          .excitation{
            width: 656rpx;
            /*height: 258rpx;*/
            margin: 0 auto;
          }
        }
        .item-pro {
          width: 364rpx;
          height: 500rpx;
          background-color: #fff;
          display: inline-block;
          /*margin-bottom: 24rpx;*/
          box-sizing: border-box;
          font-size: 0;
          position: relative;;
          // 转发
          .Forward{
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            .share-btn{
              padding: 0rpx 20rpx;
              width: 43rpx;
              height: 30rpx;
              border-radius: 30rpx;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #FF8331;
              .iconfenxiang3{
                color: #ffffff;
                font-size: 20rpx;
              }
            }
          }
          .pro-img {
            width: 350rpx;
            height: 350rpx;
            display: inline-block;
            margin: 6rpx;
          }
          // 文字描述
          .bot-des {
            text-align: left;
            font-size: 24rpx;
            color: #4a4a4a;
            width: 330rpx;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin: 4rpx auto 0;
          }
          // 价格浏览
          .price-brow {
            font-size: 22rpx;
            @extend %flexRow;
            padding: 0 16rpx;
            color: #9d9d9d;
          }
          .price {
            font-size: 28rpx;
            margin-left: 4rpx;
          }
          .box-browA {
            /*float: left;*/
            margin: 10rpx 5rpx;
            color: #4A4A4A!important;
            text-align: left!important;
            .getMoney {
              text-align: center;
              float: left;
              width: 43rpx;
              height: 36rpx;
              margin-left: 10rpx;
              background: #FF424E;
              color: #ffffff;
              font-size: 22rpx;
              border-top-left-radius: 10rpx;
              border-bottom-left-radius: 10rpx;
            }
            .MoneyA {
              width: 108rpx;
              height: 34rpx;
              display: inline-block;
              text-align: center;
              border: 1rpx solid #FF424E;
              border-top-right-radius: 10rpx;
              border-bottom-right-radius: 10rpx;
              color: #4A4A4A;
              font-size: 22rpx;
            }
          }
          .box-brow {
            @extend %flexRow;
          }
          .icon-view {
            line-height: 32rpx;
            margin-right: 10rpx;
            font-size: 32rpx;
          }
        }
        .item-pro:nth-child(odd) {
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 200rpx;
    right: 20rpx;
    width: 100rpx;
    height: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 50%;
    background: rgba(0,0,0,0.2);
    span{
      color: #ffffff;
      font-size: 24rpx;
    }
  }
</style>
