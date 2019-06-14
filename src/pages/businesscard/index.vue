<template>
  <!-- 名片 -->
    <div  class="center"  v-if="postForm === ''">
      <vue-tab-bar
        @fetch-index="clickIndexNav"
        :selectNavIndex=selectNavIndex
        :needButton="needButton"
        :handButton="handButton"
        :btnText="btnText">
      </vue-tab-bar>
      <div>
        <p>目前您还没有名片</p>
        <p>点击下方按钮去创建吧</p>
        <p @click="goToCard()" class="addImg">
          <img src="../../../static/images/addCard.png">
        </p>
      </div>
    </div>
    <div class="business" v-else @load="imgLoad">
      <vue-tab-bar
        @fetch-index="clickIndexNav"
        :selectNavIndex=selectNavIndex
        :needButton="needButton"
        :handButton="handButton"
        :btnText="btnText">
      </vue-tab-bar>
      <!--弹出的海报图片-->
      <div v-if="modalflag" class="modalflag" catchtouchmove="true">
        <canvas canvas-id="myCanvas" class="canvas" />
        <div @click="close()" class="cancel-name">取消</div>
      </div>
      <!--分享的bar-->
      <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
        <div class="top">
          <div class="left">
            <button class="wxhy-btn" open-type="share">
              <span class="wx-fri iconfont iconweixin1"></span>
              <span class="font-26">微信好友</span>
            </button>
          </div>
          <div class="right" @click='posterRouer'>
            <div class="wxhy-btn">
              <span class="wx-qr iconfont iconcardcode"></span>
              <span class="font-26">名片码</span>
            </div>
          </div>
        </div>
        <div @click="showType" class="cancel-btn">取消</div>
      </div>
      <!-- 登录 -->
      <div class="modal" v-if="modalFlag" catchtouchmove="true">
        <div class="dialog">
          <div class="avatar row-item">
            <div class="vbj">
              <span></span>
              <div class="img-wrp">
                <image mode="widthFix" :src="imgUrl + '?x-oss-process=style/w100'" />
              </div>
              <div class="Grade">
                <i v-if="Grade === v1">
                    <img src="../../../static/images/v1.png">
                </i>
                <i v-else-if="Grade === v2">
                    <img src="../../../static/images/v2.png">
                </i>
                <i v-else>
                    <img src="../../../static/images/v3.png">
                </i>
              </div>
            </div>
          </div>
          <!--<p class="dialog-info">-->
          <!--<span>你好！ 初次见面，先登录一下吧</span>-->
          <!--</p>-->
          <div class="img-show">
            <!--<image :src="imgUrl + '?x-oss-process=style/w750'" mode="widthFix" class="img">-->
            <!--</image>-->
            <div class="intro">
              <div class="first-row">
                <span>{{ name }}</span>
                <span>{{ job }}</span>
              </div>
              <div class="call-num">{{phone}}</div>
            </div>
          </div>
          <form name='pushMsgFm' report-submit='true' @submit='getFormID' class="pushHight">
            <div class='aa'>
              <button form-type="submit" class="author-button" lang="zh_CN" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">
                <!--<span class="iconfont icon-weixin1"></span>-->
                <span  @getuserinfo="bindGetUserInfo">收下名片</span>
              </button>
              <button form-type="submit" class="look-just" lang="zh_CN" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">看看再说</button>
            </div>
          </form>
        </div>
      </div>
      <div class="business-main">
      <el-form ref="postForm" :model="postForm" >
        <div class="cards">
          <div class="card-top">
            <img src="../../../static/images/cardbj.jpg" />
            <div class="cards-M">
              <div class="cards-main">
                <p class="cards-img"><img :src="postForm.imgUrl" /></p>
                <p class="cards-name">
                  <span v-if="postForm.name">{{ postForm.name }}</span>
                  <span v-else>无姓名</span>
                </p>
                <p class="cards-job">
                  <span v-if="postForm.job">{{ postForm.job }}</span>
                  <span v-else>无工作</span>
                </p>
                <p class="cards-company">
                  <span v-if="postForm.salesCompanyName">{{ postForm.salesCompanyName }}</span>
                  <span v-else>无公司名称</span>
                </p>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <submit class="share" @click="goToCard()">编辑名片</submit>
            <submit class="save"  @click="showType">分享名片</submit>
          </div>
        </div>
        <!-- 标签 -->
        <div class="over-grid">
          <div class="grid">
            <div class="col-1" @click="makePhoneCall" v-if="postForm.fixedPhone">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/phone.png"></span>
                <text class="txt">{{ postForm.fixedPhone }}</text>
              </div>
            </div>
            <div class="col-1" @click="textPaste" v-if="postForm.weChat">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/wechat.png"></span>
                <text class="txt">{{ postForm.weChat }}</text>
              </div>
            </div>
            <div class="col-1" @click="getAddress" v-if="postForm.address">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/dingwei.png"></span>
                <text class="txt">{{ postForm.address }}</text>
              </div>
            </div>
            <div class="col-1" @click="textPasteEmail" v-if="postForm.email">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/email.png"></span>
                <text class="txt">{{ postForm.email }}</text>
              </div>
            </div>
          </div>
        </div>
        <!-- 浏览 -->
        <div class="look">
          <div class="block-4">
            <div class="group-3">
              <!--浏览记录的头像-->
              <span class="logo-main"><img v-for="(item,index) in postForm.headImgList.list" :key="index" :src="item" class="logo" /></span>
              <div v-if="postForm.headImgList.list == ''" class="word">…</div>
            </div>
            <div class="zan">
              <img v-if="postForm.isCollect == 1" src="../../../static/images/love-se.png" class="icon-8" />
              <img v-else src="../../../static/images/love.png" class="icon-8" />
              <!--<span class="iconfont icon-dianzan" :class="salesmanRecord&&salesmanRecord.isPraise==1? 'up':'down'" @click="clickThumb"></span>-->
            </div>
          </div>
          <div class="group-4">
            <span class="people-browse">{{ postForm.browseCount }}人浏览</span>
            <div class="block-5">
              <text class="reliable">收藏</text>
              <text class="reliable-next">{{ postForm.collectCount }}</text>
            </div>
          </div>
          <!-- 名片码 -->
          <div class="card-ma" @click="routerTo(`./showQrcode/main?companyName=${postForm.salesCompanyName}&logo=${logo}&qrcode=${qrCodeUrl}&name=${postForm.name}&job=${postForm.job}&imgUrl=${postForm.imgUrl}`)">
            <p class="ma-txt">名片码</p>
            <div class="radius-img">
              <img :src="qrCodeUrl" mode="aspectFill">
            </div>
          </div>
          <!-- 个人简介 -->
          <div class="personal">
            <div class="personal-top">
                <span class="personal-icont">
                  <img src="../../../static/images/personalA.png">
                </span>
              <span class="personal-title">个人简介</span>
            </div>
            <div class="personal-main">
              <div class="personal-maimT">
                <div class="personalVoice">
                   <span class="personal-img">
                    <img class="personal-img" :src="postForm.imgUrl">
                   </span>
                  <span class="personal-voice">
                      <!--<img class="personal-voice" src="../../../static/images/voice.png">-->
                      <div class="action-bg" @click="playAudio">
                        <div class="back iconfont icon-icon-test3"></div>
                        <span class="playan iconfont iconyihuifu" v-if="!changeVoiceFlag"></span>
                        <span class="playan iconfont iconicon-test3 animation" v-if="changeVoiceFlag"></span>
                      </div>
                      <div class="block-10">
                        <span class="icon-13" />
                        <text class="txt-2">{{num}}''</text>
                      </div>
                    </span>
                </div>
                <div class="personal-text">
                  <div class="personal-wel">
                    <span>您好！我是{{ postForm.salesCompanyName }}的{{ postForm.name }}</span>
                  </div>
                  <div class="personal-teach">
                        <span v-html="postForm.info">
                        </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!--公司介绍-->
          <div class="company" v-if="postForm.companyInfo">
            <div class="company-top">
                <span class="company-icont">
                  <img src="../../../static/images/lou.png">
                </span>
              <span class="company-title">公司介绍</span>
            </div>
            <div class="company-main">
              <div class="company-bg">
                <img :src="postForm.companyImgUrl"/>
              </div>
              <div class="company-title">
                <span>{{ postForm.companyInfo }}</span>
              </div>
            </div>
          </div>

          <!--公司产品-->
          <div class="product" v-if="postForm.goodsList.length !== 0">
            <div class="product-top">
                <span class="product-icont">
                <img src="../../../static/images/morebox.png">
                </span>
              <span class="product-title">公司产品</span>
              <span class="product-right">
                  更多<img src="../../../static/images/right-cc.png">
                </span>
            </div>
            <div class="product-main">
              <div class="product-details" v-for="(item,index) in postForm.goodsList" :key="index">
                <div class="product-details-img">
                  <img :src="item.goodsImgUrlList[0].imgUrl"/>
                </div>j
                <div class="product-details-title">
                  {{ item.info }}
                </div>
                <div class="product-details-click">
                  ￥  {{ item.price }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
    </div>
</template>

<script>
  import vueTabBar from '../../components/vueTabBar'
  // import home from '@/api/home'
  import personApi from '@/api/person'
  const backgroundAudioManager = wx.createInnerAudioContext() // 播放音频
  export default {
    name: 'index',
    components: {
      vueTabBar
    },
    data () {
      return {
        personApi: personApi,
        imgWidth: null,
        imgHeight: null,
        companyName: '',
        id: '',
        name: '',
        job: '',
        phone: '',
        logo: '',
        modalflag: false,
        modalFlag: false,
        showpop: false,
        selectNavIndex: 0,
        clickIndexNav: 0,
        needButton: true,
        handButton: true,
        changeVoiceFlag: false,
        qrCodeUrl: 'https://oss.wq1516.com/default.png',
        tagPraiseMapList: [],
        btnText: '我的名片',
        indicatorDots: true,
        autoplay: false,
        circular: true,
        num: 10,
        apply: '',
        imgUrl: '',
        postForm: '',
        headImgList: [],
        details: []
      }
    },
    onLoad: function (options) {
      this.CardId = options.id
    },
    onShow () {
      wx.hideTabBar()
      this.getInfo()
      this.getLogo()
      this.getSun()
      this.showpop = false
      this.selectNavIndex = 0
    },
    onShareAppMessage () {
      // this.insertOpera('分享了名片', 21)
      console.log('aa', this.id)
      console.log('aa', this.salesManId)
      return {
        title: `您好！我是${this.companyName}的${this.name},这是我的名片`,
        path: 'pages/loading/main?id=' + this.salesManId + '&fromWay=1&userId=' + this.id
      }
    },
    methods: {
      imgLoad (e) {
        this.imgWidth = e.target.width
        this.imgHeight = e.target.height
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
      // 分享名片弹窗
      showType () {
        this.showpop = !this.showpop
      },
      // 插入雷达
      // async insertOpera (info, recordType) {
      //   await personApi.OperationInsert({ businessId: this.businessId, info, recordType, salesmanId: this.salesManId, userId: this.id })
      // },
      // 授权
      async bindGetUserInfo (e) {
        // 解密
        const userInfo = e.target.userInfo
        wx.setStorageSync('userNameS', userInfo.nickName)
        wx.getUserInfo({
          success: async (res) => {
            console.log(res)
            this.encryptedData = res.encryptedData
            this.iv = res.iv
            const { data } = await personApi.getPhone({
              iv: this.iv,
              encryptedData: this.encryptedData
            })
            this.unionId = JSON.parse(data).unionId
            userInfo.unionId = this.unionId
            // await home.updateUser(userInfo)
            // await personApi.updateRemarksNew({ remarks: userInfo.nickName, userId: this.id })
          }
        })
        wx.setStorageSync('avatarUrl', e.target.userInfo.avatarUrl)
        this.$nextTick(() => {
          this.modalFlag = false
        })
        this.insertOpera('授权了信息', 9)
        if (this.phoneAuthorStatus === 1) {
          this.phoneModal = true
        }
      },
      close () {
        this.modalflag = false
      },
      routerTo (url) {
        wx.navigateTo({
          url
        })
      },
      goToCard () {
        wx.navigateTo({
          url: '../index/main'
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
          if (res.data) {
            if (res.data.nickName === '' || res.data.nickName == null) {
              this.modalFlag = true
            }
            console.log(res.data)
            this.postForm = res.data
            this.name = res.data.name
            this.job = res.data.job
            this.phone = res.data.phone
            this.imgUrl = res.data.imgUrl
            this.voiceUrl = res.data.voice
            this.id = wx.getStorageSync('userId')
            this.salesManId = res.data.id
            console.log(this.salesManId)
            this.companyName = res.data.salesCompanyName
            const bgM = wx.createInnerAudioContext()// 初始化createInnerAudioContext接口
            // 设置播放地址
            bgM.src = this.voiceUrl
            bgM.onCanplay(() => {
              console.log(bgM.duration)// 0，这个方法需要执行一下，所以不能删
            })
            setTimeout(() => {
              this.num = Math.round(bgM.duration)
              // console.log(this.num)
            }, 1000)
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // // 添加收藏
      // getCollect (id) {
      //   const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
      //   const userId = wx.getStorageSync('userId') // 获取本地userId
      //   this.$fly.request({
      //     method: 'post', // post/get 请求方式
      //     url: 'server/platformUserSalesman/insert',
      //     body: {
      //       'salesmanId': id,
      //       'userId': userId,
      //       'businessId': businessId
      //     }
      //   }).then(res => {
      //     if (res.code === 200) {
      //       const that = this
      //       that.postForm.isCollect = 1
      //       that.postForm.collectCount++
      //       that.getInfo()
      //     }
      //   }).catch(err => {
      //     console.log(err.status, err.message)
      //   })
      // },
      // // 取消收藏
      // cancelCollect (id) {
      //   const userId = wx.getStorageSync('userId') // 获取本地userId
      //   this.$fly.request({
      //     method: 'post', // post/get 请求方式
      //     url: 'server/platformUserSalesman/deleteBySalesmanId',
      //     body: {
      //       'salesmanId': id,
      //       'userId': userId
      //     }
      //   }).then(res => {
      //     console.log('取消', res)
      //     if (res.code === 200) {
      //       const that = this
      //       that.postForm.isCollect = 0
      //       that.postForm.collectCount--
      //       that.getInfo()
      //     }
      //   }).catch(err => {
      //     console.log(err.status, err.message)
      //   })
      // },
      // 播放音频
      changeVoice () {
        this.changeVoiceFlag = !this.changeVoiceFlag
      },
      playAudio () {
        // const url = this.videoUrl // event.currentTarget.dataset.url
        const url = this.voiceUrl
        if (url === this.currentAudio) {
          backgroundAudioManager.pause()
          this.currentAudio = ''
          this.changeVoiceFlag = false
        } else {
          this.changeVoiceFlag = true
          backgroundAudioManager.src = url
          this.currentAudio = url
          backgroundAudioManager.title = 'introduction'
          wx.setInnerAudioOption({
            obeyMuteSwitch: false
          })
          backgroundAudioManager.play()
          backgroundAudioManager.onPlay(() => {
            console.log('开始播放')
            // this.insertOpera('播放了语音', 16)
          })
          backgroundAudioManager.onError((res) => {
            console.log('fail')
          })
          backgroundAudioManager.onEnded(() => {
            console.log('音乐播放结束')
            this.currentAudio = ''
            this.changeVoiceFlag = false
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./style";
</style>
