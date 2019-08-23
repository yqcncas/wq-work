<template>
  <div class="log">
    <!--<scroll-view :scroll-y="isScroll">-->
    <!--<vue-tab-bar-->
    <!--@fetch-index="clickIndexNav"-->
    <!--:selectNavIndex=selectNavIndex-->
    <!--:needButton="needButton"-->
    <!--:handButton="handButton"-->
    <!--:btnText="btnText">-->
    <!--</vue-tab-bar>-->
    <!--分享的bar-->
    <!--<div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">-->
      <!--<div class="top">-->
        <!--<div class="left">-->
          <!--<button class="wxhy-btn" open-type="share">-->
            <!--<span class="wx-fri iconfont iconweixin1"></span>-->
            <!--<span class="font-26">微信好友</span>-->
          <!--</button>-->
        <!--</div>-->
        <!--<div class="right" @click='posterRouer'>-->
          <!--<div class="wxhy-btn">-->
            <!--<span class="wx-qr iconfont iconcardcode"></span>-->

            <!--<span class="font-26">名片码</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div @click="showType" class="cancel-btn">取消</div>-->
    <!--</div>-->
    <div class="cardHold">
      <!--顶部-->
      <!--<scroll-view class="scroll" scroll-y  :scroll-into-view="toView"  :style="'height:' + windowHeight + 'px'" :scroll-top="scrollTop"  >-->
        <div class="cardHold-top">
          <div class="cardHold-top-img">
            <img src="https://oss.wq1516.com/salesInfo/201906181129151560828555097.jpg"/>
          </div>
          <div class="cardHold-top-text">
            <span>人脉</span>
          </div>
          <!--<div class="cardHold-top-input">-->
            <!--<p>-->
              <!--<input placeholder="搜索关键词" v-model="searchName" placeholder-style="color: #cccccc;"/>-->
              <!--<span @click="Search(searchName)" class="cardHold-top-button"><img src="../../../static/images/search.png"></span>-->
            <!--</p>-->
          <!--</div>-->
          <div class="cardHold-top-I">
            <div class="cardHold-top-me">
              <div class="cardHold-top-main">
                <span class="cardHold-top-main-img" v-if="imgUrl !== '' ">
                  <img :src="imgUrl">
                </span>
                <span class="cardHold-top-main-img" v-else>
                  <img src="https://oss.wq1516.com/default-avatar.png">
                </span>
                <div class="cardHold-top-main-right">
                  <p class="status">企业认证</p>
                  <p class="comActive" v-if="statusA == 1">
                    <i class="iconfont iconrenzheng"></i>{{companyName}}</p>
                  <p class="com" v-else>您还未进行企业认证</p>
                  <p>
                    <submit  v-if="statusA == 1" class="footerActive " @click="routerTo(`/pages/pageA/attestation/main`)">
                    <span><i class="iconfont iconbianji_fuzhi"></i>立即修改</span>
                    </submit>
                    <submit v-else class="footer" @click="routerTo(`/pages/pageA/attestation/main`)">
                    <span><i class="iconfont iconbianji_fuzhi"></i>立即认证</span>
                    </submit>
                  </p>
                  <!--<span class="cardHold-top-main-name" v-if="name !== ''">{{ name }}</span>-->
                  <!--<span class="cardHold-top-main-name" v-else>无姓名</span>-->
                  <!--<span class="cardHold-top-main-job" v-if="job !== ''">{{ job }}</span>-->
                  <!--<span class="cardHold-top-main-job" v-else>无工作</span>-->
                  <!--<p class="cardHold-top-main-company" v-if="company !== ''">{{ company }}</p>-->
                  <!--<p class="cardHold-top-main-company" v-else>无公司名称</p>-->
                  <!--<p class="cardHold-top-main-footer">-->
                    <!--<submit  v-if="name == '' && job == ''" class="cardHold-top-main-footer-share" @click="ArouterTo(`../businesscard/main`)">-->
                      <!--<span><i class="iconfont iconfenxiang"></i>分享名片</span>-->
                    <!--</submit>-->
                    <!--<submit v-else class="cardHold-top-main-footer-share" @click="showType">-->
                      <!--<span><i class="iconfont iconfenxiang"></i>分享名片</span>-->
                    <!--</submit>-->
                    <!--<submit v-if="name == '' && job == ''" class="cardHold-top-main-footer-look" @click="ArouterTo(`../businesscard/main`)">-->
                      <!--<i class="iconfont iconiconfontsaomiaoerweima-copy"></i>-->
                      <!--<span>名片码</span>-->
                    <!--</submit>-->
                    <!--<submit v-else class="cardHold-top-main-footer-look" @click="routerTo(`./showQrcode/main?companyName=${company}&logo=${logo}&qrcode=${qrCodeUrl}&name=${name}&job=${job}&imgUrl=${imgUrl}`)">-->
                      <!--<i class="iconfont iconiconfontsaomiaoerweima-copy"></i>-->
                      <!--<span>名片码</span>-->
                    <!--</submit>-->
                  <!--</p>-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--中间-->
        <div class="cardHold-main">
          <div class="cardHold-main-me">
            <div class="cardHold-main-mes">
              <div v-if="name == '' && job == ''"  class="cardHold-blok" @click="ArouterTo(`../businesscard/main`)">
                <div class="cardHold-Img">
                  <img src="../../../static/images/leida.png">
                </div>
                <div class="cardHold-blok-right cardHold-blok-right-bt">
                  <p class="cardHold-blok-name">AI雷达</p>
                  <P class="cardHold-blok-J">客户数据追踪、统计、AI分析</P>
                </div>
              </div>
              <div v-else class="cardHold-blok"  @click="goRadar">
                <div class="cardHold-Img">
                  <img src="../../../static/images/leida.png">
                </div>
                <div class="cardHold-blok-right cardHold-blok-right-bt">
                  <p class="cardHold-blok-name">AI雷达</p>
                  <P class="cardHold-blok-J">客户数据追踪、统计、AI分析</P>
                </div>
              </div>
              <div  v-if ="name === '' && job == ''"  @click="ArouterTo(`../businesscard/main`)" class="cardHold-blok" >
                <div class="cardHold-Img1">
                  <img src="../../../static/images/qun.png">
                </div>
                <div class="cardHold-blok-right cardHold-blok-right-bt" >
                  <p class="cardHold-blok-name">群名片</p>
                  <P class="cardHold-blok-J">邀请微信好友加入</P>
                </div>
              </div>
              <div v-else class="cardHold-blok" @click="goGroup">
                <div class="cardHold-Img1">
                  <img src="../../../static/images/qun.png">
                </div>
                <div class="cardHold-blok-right cardHold-blok-right-bt">
                  <p class="cardHold-blok-name">群名片</p>
                  <P class="cardHold-blok-J">邀请微信好友加入</P>
                </div>
              </div>
              <div  v-if ="name === '' && job == ''"  @click="ArouterTo(`../businesscard/main`)" class="cardHold-blok" >
                <div class="cardHold-Img2">
                  <img src="../../../static/images/card.png">
                </div>
                <div class="cardHold-blok-right cardHold-blok-right-bt" >
                  <p class="cardHold-blok-name">名片夹</p>
                  <P class="cardHold-blok-J">通讯录 查看我关注的人</P>
                </div>
              </div>
              <div v-else class="cardHold-blok" @click="goCollect">
                <div class="cardHold-Img2">
                  <img src="../../../static/images/card.png">
                </div>
                <div class="cardHold-blok-right cardHold-blok-right-bt">
                  <p class="cardHold-blok-name">名片夹</p>
                  <P class="cardHold-blok-J">通讯录 查看我关注的人</P>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--人脉信息-->
        <div class="connections">
            <div class="con-top">
              <div class="testNav">
                <div
                  :class="{'selected':tab === 1,'testTitle':true}"
                  @click="changTab(1)"
                >热门</div>
                <div
                  :class="{'selected':tab === 2,'testTitle':true}"
                  @click="changTab(2)"
                >认证</div>
                <div
                  :class="{'selected':tab === 3,'testTitle':true}"
                  @click="changTab(3)"
                >距离</div>
              </div>
              <div class="promote">
                <span>提升排名</span>
              </div>
            </div>
            <div class="con-main">
              <div class="cardA" v-if="postform.length > 0 ">
                <div class="cardData" v-for="(items,indexs) in postform" :key="indexs">
                  <div class="cardTitle" v-if="items.status === null">
                    <div class="cardData-left" @click="goToCard(items.id)">
                      <div class="headImg">
                        <img :src="items.imgUrl">
                        <div class="meber">
                          <i v-if="items.leavelNum === 1">
                            <img src="../../../static/images/v1.png">
                          </i>
                          <i v-else-if="items.leavelNum === 2">
                            <img src="../../../static/images/v2.png">
                          </i>
                          <i v-else-if="items.leavelNum === 3">
                            <img src="../../../static/images/v3.png">
                          </i>
                        </div>
                      </div>
                      <p class="lookData">
                        <span class="eye"><i class="iconfont iconchakan"></i>{{items.browseCount}}</span>
                        <span class="star"><i class="iconshoucang4 iconfont"></i>{{items.collectCount}}</span>
                      </p>
                    </div>

                    <div class="cardData-main" @click="goToCard(items.id)">
                      <p class="top">
                        <span class="icon">企</span>
                        <span class="name">{{items.name}}</span>
                        <span class="job">{{items.job}}</span>
                      </p>
                      <p class="company">
                        <span v-if="items.salesCompanyName">{{items.salesCompanyName}}</span><span v-else>无公司</span>
                      </p>
                      <p class="DoT">
                        动态:<span v-if="items.dynamic">{{items.dynamic.title}}</span><span v-else>无</span>
                      </p>
                      <p class="product">
                        产品: <span class="number">无</span>
                      </p>
                    </div>

                    <div class="cardData-right">
                      <p class="talk" @click="talk(items.userId)">
                        <i class="iconfont iconliaotian1"></i>
                      </p>
                      <p v-if="items.isCollect === 0" class="collect" @click="getCollect(items.id, indexs)">关注</p>
                      <p v-else-if="items.isCollect === 1" class="collect">已关注</p>
                      <p class="distance">{{items.distance}} km</p>
                    </div>
                  </div>
                  <!--<div v-else class="Gao">-->
                    <!--<img :src="items.src"/>-->
                  <!--</div>-->
                </div>
              </div>
              <div class="noS" v-else>
                暂无数据
              </div>
            </div>
        </div>

        <div class="message">
          <div class="bt" @click="goToMessage()">
            <i class="iconfont iconwodexiaoxi"></i>
            <span class="num" v-if="num < 99 && num !== 0">{{num}}</span>
            <span class="num" v-else-if="num >=99">99</span>
          </div>
        </div>
        <!--底部查找-->
        <!--<div class="padds">-->
          <!--<div class="cardHold-ft" v-for="(items,indexs) in commitInfo" :key="indexs">-->
            <!--<div class="cardHold-ftM" >-->
              <!--<div class="cardHold-ftName" :id = 'indexs' v-if="items.length !== 0">-->
                <!--<p>{{indexs}}</p>-->
              <!--</div>-->
              <!--<div class="cardHold-ftMain">-->
                <!--<div class="cardHold-ftMain-ct" v-for="(item,index) in items" :key="index">-->
                  <!--&lt;!&ndash;<div class="center" :data-type="item.type"  >&ndash;&gt;-->
                    <!--<div class="center" @touchstart="touchStart($event)" @touchend="touchEnd($event,index,items)" :data-type="item.type"  >-->
                    <!--<div>-->
                      <!--<div class="cardHold-ftMain-ct-img" @click="goToCard(item.salesmanId)" >-->
                        <!--<img :src="item.imgUrl +'?x-oss-process=style/c400'"/>-->
                      <!--</div>-->
                      <!--<div v-if="item.grade === 'V1' && item.grade === null "  class="cardHold-ftMain-rt" @click="recover(index,items)">-->
                        <!--<div @click="goToCard(item.salesmanId)">-->
                          <!--<span class="icon">企</span>-->
                          <!--<span class="name">{{ item.name }}</span>-->
                          <!--<span class="job">{{ item.job }}</span>-->
                          <!--<span class="status">{{ item.status }}</span>-->
                          <!--<span class="grade">{{ item.grade }}</span>-->
                          <!--<p class="company">{{ item.salesCompanyName }}</p>-->
                        <!--</div>-->
                        <!--<div class="phone" @click="makePhoneCall(item.phone)">-->
                          <!--<img src="../../../static/images/call.png"/>-->
                        <!--</div>-->
                        <!--<div class="border" v-if="index - 1 !== items.length - 2 && items.length > 1"></div>-->
                      <!--</div>-->
                      <!--<div v-else-if="item.grade === 'V2' " class="cardHold-ftMain-rt2 " @click="recover(index,items)">-->
                        <!--<div @click="goToCard(item.salesmanId)">-->
                          <!--<span class="icon">企</span>-->
                          <!--<span class="name">{{ item.name }}</span>-->
                          <!--<span class="job">{{ item.job }}</span>-->
                          <!--<span class="status">{{ item.status }}</span>-->
                          <!--<span class="grade">{{ item.grade }}</span>-->
                          <!--<p class="company">{{ item.salesCompanyName }}</p>-->
                        <!--</div>-->
                        <!--<div class="phone"  @click="makePhoneCall(item.phone)">-->
                          <!--<img src="../../../static/images/call.png"/>-->
                        <!--</div>-->
                        <!--<div class="border" v-if="index - 1 !== items.length - 2 && items.length > 1"></div>-->
                      <!--</div>-->
                      <!--<div v-else class="cardHold-ftMain-rt3" @click="recover(index,items)">-->
                        <!--<div @click="goToCard(item.salesmanId)">-->
                          <!--<span class="icon">企</span>-->
                          <!--<span class="name">{{ item.name }}</span>-->
                          <!--<span class="job">{{ item.job }}</span>-->
                          <!--<span class="status">{{ item.status }}</span>-->
                          <!--<span class="grade">{{ item.grade }}</span>-->
                          <!--<p class="company">{{ item.salesCompanyName }}</p>-->
                        <!--</div>-->
                        <!--<div class="phone"  @click="makePhoneCall(item.phone)">-->
                          <!--<img src="../../../static/images/call.png"/>-->
                        <!--</div>-->
                        <!--<div class="border" v-if="index - 1 !== items.length - 2 && items.length > 1"></div>-->
                      <!--</div>-->
                    <!--</div>-->
                    <!--<div class="delete" @click="delect(index,items,item.salesmanId)">-->
                      <!--删除-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</scroll-view>-->
    </div>
    <!--&lt;!&ndash;右侧检索字母&ndash;&gt;-->
    <!--<div class="index-english">-->
      <!--<div v-for="(itemA,index) in commitInfo"  class="index-zi" :key="index"  @touchstart="touchstartL($event)" :id="index" @touchmove="touchmoveL" @touchend="touchendL">{{ index }}</div>-->
    <!--</div>-->
    <!--&lt;!&ndash;检索显示字母&ndash;&gt;-->
    <!--<div v-if="indexShow" class="index-name" >{{indexEnglish}}</div>-->
    <!--</scroll-view>-->
  </div>
</template>

<script>
  import card from '@/components/card'
  import vueTabBar from '../../components/vueTabBar'
  export default {
    components: {
      card,
      vueTabBar
    },

    data () {
      return {
        userInfo: {},
        tab: 1,
        company: '',
        companyName: '',
        id: '',
        job: '',
        name: '',
        imgUrl: '',
        postform: [],
        isScroll: false,
        selectNavIndex: 1,
        needButton: true,
        handButton: true,
        indexShow: false,
        indexId: '',
        showpop: false,
        indexy: '',
        qrCodeUrl: '',
        postForm: '',
        searchName: '',
        y: 0,
        toView: '',
        scrollTop: 0,
        indexEnglish: '',
        btnText: '名片夹',
        indicatorDots: true,
        indexTop: '',
        Vie2: '',
        windowHeight: '',
        searchLetter: [],
        startX: 0,
        main: [],
        num: 0,
        legalPersonaName: '',
        statusA: '',
        endX: 0,
        letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        letterA: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        arrId: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        commitInfo: '',
        pageNum: 0,
        pageSize: 0,
        lastPage: '',
        nextPage: '',
        status: 0,
        number: ''
      }
    },
    onShow () {
      this.searchName = ''
      // wx.hideTabBar()
      this.showpop = false
    },
    onLoad (options) {
      this.pageNum = 1
      this.getInfomation()
      // this.getInfo()
      this.getSun()
      this.getSalesmanId()
      this.getCard()
      this.getLogo()
      this.getMy()
      this.changTab(1)
      setInterval(() => {
        const that = this
        const num = wx.getStorageSync('msgNum')
        that.num = num
        // console.log('获取消息数量', that.num)
      }, 1000)
      if (options.goodsId) {
        this.goToFen('../OthersCard/main?id=' + options.id + '&fromWay=1&userId=' + options.userId + '&goodsId=' + options.goodsId)
      } else {
        if (options.id !== undefined && options.userId !== undefined) {
          this.goToFen('../OthersCard/main?id=' + options.id + '&fromWay=1&userId=' + options.userId)
        }
      }
      var that = this
      wx.getSystemInfo({
        success: function (res) {
          // console.log('res', res.windowHeight)
          that.windowHeight = res.windowHeight + 22
        }
      })
    },
    async onReachBottom () {
      if (this.pageNum < this.lastPage) {
        // wx.showToast({
        //   title: '加载中',
        //   icon: 'none',
        //   duration: 2000
        // })
        this.pageNum = this.nextPage
        this.getCardInfo(this.status, this.pageNum)
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 分享名片
    onShareAppMessage () {
      // this.insertOpera('分享了名片', 21)
      return {
        title: `您好！我是${this.companyName}的${this.name},这是我的名片`,
        path: 'pages/loading/main?id=' + this.salesManId + '&fromWay=1&userId=' + this.id
      }
    },
    watch () {
      // console.log(this.toView)
    },
    methods: {
      // 如果申请过 获取认证信息
      getInfomation () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get',
          url: '/certification/selectOne',
          body: {
            'userId': userId
          }
        }).then(res => {
          console.log('1', res)
          wx.setStorageSync('id', res.data.id)
          this.legalPersonaName = res.data.legalPersonaName
          this.companyName = res.data.companyName
          this.statusA = res.data.status
          if (this.status === 0 || this.status === 1) {
            this.disabled = true
          } else if (this.status === 2) {
            this.disabled = false
          } else {
            console.log('申请认证失败')
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 进入聊天信息页面
      goToMessage () {
        wx.navigateTo({
          url: '../message/main'
        })
      },
      // 名片跳转聊天界面
      talk (id) {
        wx.navigateTo({
          url: '../msgcenter/main?id=' + id
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
            that.postform[index].isCollect = 1
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
      // 获取人脉即使热门名片
      getCardInfo (id, pageNum) {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/getByCode',
          body: {
            'pageNum': this.pageNum,
            'pageSize': 10,
            'businessId': businessId,
            'userId': userId,
            'sortingType': id
          }
        }).then(res => {
          if (res.code === 200) {
            const data = res.data.list
            data.map(item => {
              this.postform.push(item)
              if (item.imgUrl === '') {
                item.imgUrl = 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png'
              }
            })
            console.log('data', res.data)
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
      changTab (index) {
        if (index === 1) {
          this.pageNum = 1
          this.tab = index
          this.status = 0
          this.postform = []
          this.getCardInfo(0, 1)
        } else if (index === 2) {
          this.pageNum = 1
          this.tab = index
          this.status = 2
          this.postform = []
          this.getCardInfo(2, 1)
        } else if (index === 3) {
          this.pageNum = 1
          this.tab = index
          this.status = 3
          this.postform = []
          this.getCardInfo(3, 1)
        }
      },
      // 页面加载信息
      getCard () {
        this.userId = wx.getStorageSync('userId') // 获取本地userId
        // console.log('userId', this.userId)
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': this.userId
          }
        }).then(res => {
          if (res.data) {
            this.main = res.data
            if (this.main.length === 0 || this.main === null) {
              wx.setStorageSync('Card', false)
            } else {
              wx.setStorageSync('Card', true)
            }
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      Search (title) {
        if (title) {
          wx.navigateTo({
            url: '../logClassify/main?name=' + title
          })
        }
      },
      // 呼叫电话
      makePhoneCall (phone) {
        wx.makePhoneCall({
          phoneNumber: phone,
          success: () => {
            this.insertOpera('拨打了电话', 20)
          },
          fail: () => {
            wx.showToast({
              title: '取消拨打',
              icon: 'none',
              duration: 2000
            })
          }
        })
      },
      // 跳转
      goToFen (url) {
        wx.navigateTo({
          url: url
        })
      },
      // 获取页面长宽
      imgLoad (e) {
        this.imgWidth = e.target.width
        this.imgHeight = e.target.height
      },
      // 分享名片弹窗
      showType () {
        this.showpop = !this.showpop
      },
      //   跳转到海报带参
      posterRouer () {
        let params = {
          imgUrl: this.postForm.imgUrl + '?x-oss-process=style/w750',
          imgHeight: 610,
          imgWidth: 610,
          name: this.postForm.name,
          job: this.postForm.job,
          tagList: this.tagPraiseMapList,
          logo: this.postForm.logo,
          fixedPhone: this.postForm.fixedPhone,
          weChat: this.postForm.weChat,
          address: this.postForm.salesAddDetailed,
          email: this.postForm.email,
          qrCodeUrl: this.qrCodeUrl
        }
        let temp = encodeURIComponent(JSON.stringify(params))
        this.routerTo('../cardPoster/main?val=' + temp)
      },
      // 获取个人信息
      getMy () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': userId
          }
        }).then(res => {
          if (res.code === 200) {
            this.postForm = res.data
            this.name = res.data.name
            this.job = res.data.job
            this.company = res.data.salesCompanyName
            this.imgUrl = res.data.imgUrl
            this.id = wx.getStorageSync('userId')
            this.salesManId = res.data.id
            this.companyName = res.data.salesCompanyName
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取logo
      getLogo () {
        const businessId = wx.getStorageSync('businessId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/business/findById',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          this.logo = res.data.logo
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取太阳吗
      getSun () {
        const businessId = wx.getStorageSync('businessId') // 获取本地userId
        const salesmanId = wx.getStorageSync('salesmanId') // 获取本地userId
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformSalesman/getWxACodeUnlimit',
          body: {
            'businessId': businessId,
            'salesmanId': salesmanId,
            'fromWay': 2
          }
        }).then(res => {
          this.qrCodeUrl = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取自己所关注卡片 名片夹
      getInfo () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformUserSalesman/getAllSalesmanByUserId',
          body: {
            'userId': userId
          }
        }).then(res => {
          this.commitInfo = res.data
          // console.log('长度', this.commitInfo)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      touchStart (e) {
        // 获取移动距离，可以通过打印出e，然后分析e的值得出
        this.startX = e.mp.changedTouches[0].clientX
      },
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      touchEnd (e, index, items) {
        // 获取移动距离
        this.isScroll = false
        this.endX = e.mp.changedTouches[0].clientX
        if (this.startX - this.endX > 20) {
          for (let i = 0; i < items.length; i++) {
            items[i].type = 0
          }
          items[index].type = 1
        } else if (this.startX - this.endX < -20) {
          for (let i = 0; i < items.length; i++) {
            items[i].type = 0
          }
        }
      },
      // 点击跳转进入名片页
      goToCard (id) {
        wx.navigateTo({
          url: `../OthersCard/main?id=` + id
        })
      },
      // 恢复弹出删除原本样式
      recover (index, items) {
        items[index].type = 0
      },
      // 删除
      delect (index, items, id) {
        items.splice(index, 1)
        this.cancelCollect(id)
      },
      // 取消收藏
      cancelCollect (id) {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformUserSalesman/deleteBySalesmanId',
          body: {
            'salesmanId': id,
            'userId': userId
          }
        }).then(res => {
          // console.log('取消', res)
          if (res.code === 200) {
            const that = this
            wx.showToast({
              title: '操作成功',
              icon: 'none',
              duration: 2000
            })
            that.getInfo()
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 按字母检索
      touchstartL (e) {
        this.indexId = e.target.id
        this.toView = e.target.id.toUpperCase()
        this.indexy = e.touches[0].pageY
        this.indexShow = true
        this.indexEnglish = e.target.id
      },
      touchendL (e) {
        this.indexShow = false
      },
      touchmoveL (e) {
        this.y = this.getArrIndex(e.target.id)
        var indexY = e.touches[0].pageY
        if (this.getArrEnglish(Math.round((indexY - this.indexy) / 15), this.y)) {
          this.toView = this.getArrEnglish(Math.round((indexY - this.indexy) / 15), this.y).toUpperCase().toString()
          this.indexEnglish = this.getArrEnglish(Math.round((indexY - this.indexy) / 15), this.y)
          this.Vie2 = this.toView
        }
      },
      getArrIndex (english) {
        for (var x = 0; x < this.letter.length; x++) {
          if (english === this.letter[x]) {
            return x
          }
        }
      },
      // num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
      getArrEnglish (num, index) {
        var english = this.letter[index + num]
        if (!(num + index < 1 > 26)) {
          return english
        } else {
          return 'AAA'
        }
      },
      // 跳转雷达
      goRadar () {
        wx.navigateTo({
          url: '../pageA/radar/main'
        })
      },
      // 查询salesmanId
      getSalesmanId () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get',
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': userId
          }
        }).then(res => {
          this.salesmanId = res.data.id
          wx.setStorageSync('salesmanId', this.salesmanId)
        }).catch(err => {
          console.log(err)
        })
      },
      // 跳转群组
      goGroup () {
        // wx.showToast({
        //   title: '功能还在开发中哦',
        //   duration: 2000,
        //   icon: 'none'
        // })
        wx.navigateTo({
          url: '/pages/GroupCard/main'
        })
      },
      // 跳转到名片夹
      goCollect () {
        // wx.showToast({
        //   title: '功能还在开发中哦',
        //   duration: 2000,
        //   icon: 'none'
        // })
        wx.navigateTo({
          url: '/pages/cardCollect/main'
        })
      },
      // 挑战
      ArouterTo (url) {
        wx.switchTab({
          url
        })
      },
      // 挑战
      routerTo (url) {
        wx.navigateTo({
          url
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
