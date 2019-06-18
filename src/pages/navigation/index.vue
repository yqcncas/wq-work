<template>
  <scroll-view scroll-top="0">
    <div class="index">
      <vue-tab-bar
        @fetch-index="clickIndexNav"
        :selectNavIndex=selectNavIndex
        :needButton="needButton"
        :handButton="handButton"
        :btnText="btnText">
      </vue-tab-bar>
      <div class="top">
        <section class="sec-nav" @click="getInto">
          <navigation-bar
            :back-visible="true"
            :home-path="'/pages/index/main'"></navigation-bar>
        </section>
        <section class="content">
          <img class="bj" src="../../../static/images/indexbj.png"/>
        </section>
        <div class="search">
          <p>
            <input placeholder="搜索客户资源" placeholder-style="color: #cccccc;"/>
            <span class="sbutton"><img src="../../../static/images/search.png"></span>
          </p>
        </div>
      </div>

      <div class="main">
        <div class="test">
          <div class="testNav">
            <div
              :class="{'selected':tab === 1,'testTitle':true}"
              @click="changTab(1)"
            >人脉集市</div>
            <div
              :class="{'selected':tab === 2,'testTitle':true}"
              @click="changTab(2)"
            >信息广场</div>
          </div>
          <div class="cont">
            <div v-if="tab===1">
              <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular= 'circular' :interval="interval" :duration="duration">
                <swiper-item>
                      <span class="lf-main" v-for="(item, index) in Types" :key="index" @click="routerTo(item.url)">
                        <span class="Typesrc"><img :src="item.imgUrl"></span>
                        <span class="title">{{ item.tradeName }}</span>
                      </span>
                  <!--<image :src="item.url" class="slide-image" mode="aspectFill"/>-->
                </swiper-item>
                <swiper-item>
                      <span class="lf-main" v-for="(item, index) in Types1" :key="index">
                        <span class="Typesrc"><img :src="item.imgUrl"></span>
                        <span class="title">{{ item.tradeName }}</span>
                      </span>
                  <!--<image :src="item.url" class="slide-image" mode="aspectFill"/>-->
                </swiper-item>
              </swiper>
            </div>
            <div v-else>
              <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular= 'circular' :interval="interval" :duration="duration">
                <swiper-item>
                      <span class="lf-main" v-for="(item, index) in Types2" :key="index">
                        <span class="Typesrc"><img :src="item.src"></span>
                        <span class="title">{{ item.title }}</span>
                      </span>
                  <!--<image :src="item.url" class="slide-image" mode="aspectFill"/>-->
                </swiper-item>
              </swiper>
            </div>
          </div>
        </div>
      </div>



      <div class="fotter" v-if="status === 1">
        <div class="test1">
          <div class="testNav1">
            <div
              :class="{'selected2':tabs,'testTitle1':true}"
            >{{ cardRen }}</div>
            <div
              :class="{'testTitle2':true}"
              @click="changTabs(tabs)"
            ><img src="../../../static/images/qiehuan.png" class="switch"/> {{cardsMap }}</div>
          </div>
          <div class="conts">
            <div class="conts-main" v-if="tabs===1">
              <div v-if="cards !== ''|| cards !== null">
              <div class="card" v-for="(item,index) in cards" :key="index">
                <div @click="goToCard(item.id)">
                  <span><img :src="item.imgUrl"></span>
                  <div class="card-main">
                    <div class="qiye">
                      <span class="img"><s>企</s></span>
                      <b>{{ item.name }}</b>
                      <span class="job">{{ item.job }}</span>
                      <span v-if="item.isCertification === 0" class="status">已认证</span>
                      <span v-else class="status">无状态</span>
                    </div>
                    <p class="comyname" v-if="item.salesCompanyName === null">无公司</p>
                    <p class="comyname" v-else>{{ item.salesCompanyName}}</p>
                  </div>
                </div>
                <div class="card-right">
                  <p class="eye"><img src="../../../static/images/eye.png"/><span>{{ item.browseCount }}</span> </p>
                  <p class="star"><img src="../../../static/images/star.png"/><span>{{ item.praiseCount }}</span> </p>
                  <i v-if="item.isCollect === 0" @click="getCollect(item.id, index)"><img src="../../../static/images/addpersonal.png"/></i>
                  <i v-else></i>
                </div>
              </div>
              </div>
              <div v-else class="no">
                <p class="title">暂无热门名片</p>
              </div>
            </div>


            <div class="conts-main" v-else>
              <div v-if="card!== 1">
              <div class="card" v-for="(item,index) in enclosure" :key="index">
                <span><img :src="item.headImg"></span>
                <div class="card-main">
                  <div class="qiye">
                    <span class="img"><s>企</s></span>
                    <b>{{ item.name }}</b>
                    <span class="job">{{ item.job }}</span>
                    <span v-if="item.isCertification === 0" class="status">已认证</span>
                    <span v-else class="status">无状态</span>
                  </div>
                  <p class="comyname" v-if="item.salesCompanyName === null">无公司</p>
                  <p class="comyname" v-else>{{ item.salesCompanyName}}</p>
                </div>
                <div class="card-right">
                  <p class="eye"><img src="../../../static/images/eye.png"/><span>{{ item.eye }}</span> </p>
                  <p class="star"><img src="../../../static/images/star.png"/><span>{{ item.star }}</span> </p>
                  <i><img src="../../../static/images/addpersonal.png"/></i>
                </div>
              </div>
            </div>
            <div v-else class="no">
              <p class="title">暂无附近名片</p>
            </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info" v-else>
        <div class="infoTest">
          <div class="InfoNav">
            <div
              :class="{'selected1':info,'testTitle1':true}"
            >{{ infoTop }}</div>
            <div
              :class="{'testTitle2':true}"
              @click="changInfo(info)"
            ><img src="../../../static/images/qiehuan.png" class="switch"/> 切换为{{ infoTitle }}</div>
          </div>
        </div>
        <div class="conts">
          <div class="conts-mains" v-if="info === 1 ">
            <div v-if="Message.length !== 0 && Message !== null">
              <div class="infoCard" v-for="(item, index) in Message" :key="index">
                <span class="headImg"><img :src="item.imgUrl"></span>
                <div class="infoCard-main">
                  <div class="infoTop">
                    <span class="headName">{{item.name}}</span>
                    <span class="headMap">
                    <s class="headMaps" v-if="item.address ">{{ item.address }}&nbsp;</s><s v-if="item.address ">·</s><s>&nbsp;{{ item.browseCount }}次浏览</s>
                  </span>
                    <span class="headTitle">
                  {{ item.title }}
                  </span>
                    <span class="headImage" v-if="item.imgUrlList != 0">
                    <a  v-for="(itemA, index_) in item.imgUrlList" :key="index_">
                       <i :data-index='index_' :data-id="item.id"><img :src="itemA" @click="previewImg(item.imgUrlList,index_)" lazy-load /> </i>
                    </a>
                  </span>
                    <span class="headVideo"  v-if="item.video !== '' && item.video !== null">
                     <video
                       id="myVideo"
                       :src="item.video"
                       @fullscreenchange="bindA"
                       controls
                     ></video>
                  </span>
                    <span class="headFotter">
                    <span class="headTime">{{ item.createDate }}</span>
                    <span v-if="item.isLike == 0" class="headZan" @click="thumbsUp(item.id,0,index)"><img src="../../../static/images/zan.png"/> </span>
                    <span v-else class="headZan" @click="thumbsUp(item.id,1,index)"><img src="../../../static/images/zan-se.png"/> </span>
                  </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no">
              <p class="title">暂无推荐信息</p>
            </div>
          </div>

          <div class="conts-mains"  v-else>
            <div v-if="card !== 1">
            <div class="infoCard">
                <span class="headImg"><img src="../../../static/images/gongzhonghao.jpg"></span>
                <div class="infoCard-main">
                  <div class="infoTop">
                    <span class="headName">李颂扬</span>
                    <span class="headMap">
                  <s class="headMaps">浙江温岭</s>·<s>100次浏览</s>
                  </span>
                    <span class="headTitle">
                  空间看垃圾堆了卡记录的借口啦来到了卡就绿卡就对了卡机看了多久啊离开卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿克苏垃圾啊卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿
                  </span>
                    <span class="headFotter">
                  <span class="headTime">昨天14：00</span>
                  <span class="headZan"><img src="../../../static/images/zan.png"/> </span>
                  </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="no">
              <p class="title">暂无附近信息</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
  import navigationBar from '../../components/navigationBar.vue'
  import vueTabBar from '../../components/vueTabBar'
  export default {
    components: {
      navigationBar,
      vueTabBar
    },
    data () {
      return {
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
        Types2: [ {
          title: '同城跑腿',
          url: '../classify/main',
          src: '../../static/svg/information/tong.svg'
        },
        {
          title: '相亲交友',
          url: '../classify/main',
          src: '../../static/svg/information/xiang.svg'
        },
        {
          title: '家政服务',
          src: '../../static/svg/information/jia.svg'
        },
        {
          title: '招聘求职',
          src: '../../static/svg/information/zhao.svg'
        },
        {
          title: '餐饮美食',
          src: '../../static/svg/information/can.svg'
        },
        {
          title: '微商专区',
          src: '../../static/svg/information/wei.svg'
        },
        {
          title: '招商加盟',
          src: '../../static/svg/information/zhaos.svg'
        },
        {
          title: '房屋租聘',
          src: '../../static/svg/information/fang.svg'
        },
        {
          title: '二手市场',
          src: '../../static/svg/information/ershou.svg'
        },
        {
          title: '其他',
          src: '../../static/svg/information/qi.svg'
        }],
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
        }]
      }
    },
    onShow () {
      // this.doLogin()
      // this.getSalesmanId()
      this.cards = []
      this.Message = []
      this.show = 1
      this.pageNum = 1
      this.pageNumA = 1
      this.getCard()
      this.tradeInfor()
    },
    onLoad () {
      wx.hideTabBar()
      this.trade()
      this.tradeA()
    },
    async onReachBottom () {
      if (this.show === 1) {
        if (this.pageNum < this.lastPage) {
          this.pageNum = this.nextPage
          this.getCard(this.pageNum)
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
      } else if (this.show === 0) {
        if (this.pageNumA < this.lastPageA) {
          this.pageNumA = this.nextPageA
          this.tradeInfor(this.pageNumA)
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
      }
    },
    methods: {
      bindA (e) {
        wx.hideTabBar()
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
          url: '/trade/selectAll',
          body: {
            'pageNum': 1, 'pageSize': 10
          }
        }).then(res => {
          this.Types = res.data.list
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 人脉集市
      tradeA () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/trade/selectAll',
          body: {
            'pageNum': 2, 'pageSize': 10
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
            'userId': userId
          }
        }).then(res => {
          if (res.code === 200) {
            const data = res.data.list
            data.map(item => {
              this.Message.push(item)
            })
            // this.Message = res.data.list
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
          this.pageNumA = 1
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
      routerTo (url) {
        wx.navigateTo({
          url
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
          } else if (status === 1) {
            // console.log('768', res) // 取消点赞
            // this.tradeInfor()
            this.Message[index].isLike = 0
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
