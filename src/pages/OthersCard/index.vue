<template>
  <!-- 名片 -->
    <div class="business">
      <!--分享的bar-->
      <!--弹出的海报图片-->
      <div v-if="modalflag" class="modalflag" catchtouchmove="true">
        <canvas canvas-id="myCanvas" class="canvas" />
        <div @click="close()" class="cancel-name">取消</div>
      </div>
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
      <!--<div class="modal" v-if="modalFlag" catchtouchmove="true">-->
        <!--<div class="dialog">-->
          <!--<div class="avatar row-item">-->
            <!--<div class="vbj">-->
              <!--<span></span>-->
              <!--<div class="img-wrp">-->
                <!--<image mode="widthFix" :src="imgUrl || 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png' + '?x-oss-process=style/w100'" />-->
              <!--</div>-->
              <!--<div class="Grade">-->
                <!--<i v-if="Grade === v1">-->
                  <!--<img src="../../../static/images/v1.png">-->
                <!--</i>-->
                <!--<i v-else-if="Grade === v2">-->
                  <!--<img src="../../../static/images/v2.png">-->
                <!--</i>-->
                <!--<i v-else>-->
                  <!--<img src="../../../static/images/v3.png">-->
                <!--</i>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--&lt;!&ndash;<p class="dialog-info">&ndash;&gt;-->
          <!--&lt;!&ndash;<span>你好！ 初次见面，先登录一下吧</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</p>&ndash;&gt;-->
          <!--<div class="img-show">-->
            <!--&lt;!&ndash;<image :src="imgUrl + '?x-oss-process=style/w750'" mode="widthFix" class="img">&ndash;&gt;-->
            <!--&lt;!&ndash;</image>&ndash;&gt;-->
            <!--<div class="intro">-->
              <!--<div class="first-row">-->
                <!--<span>{{ name }}</span>-->
                <!--<span>{{ job }}</span>-->
              <!--</div>-->
              <!--<div class="call-num">{{phone}}</div>-->
            <!--</div>-->
          <!--</div>-->
          <!--<form name='pushMsgFm' report-submit='true' @submit='getFormID' class="pushHight">-->
            <!--<div class='aa'>-->
              <!--<button form-type="submit" class="author-button" lang="zh_CN" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">-->
                <!--&lt;!&ndash;<span class="iconfont icon-weixin1"></span>&ndash;&gt;-->
                <!--<span  @getuserinfo="bindGetUserInfo">收下名片</span>-->
              <!--</button>-->
              <!--<button form-type="submit" class="look-just" lang="zh_CN" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">看看再说</button>-->
            <!--</div>-->
          <!--</form>-->
        <!--</div>-->
      <!--</div>-->
      <form name='pushMsgFm' report-submit='true' @submit='getFormID' class="">
        <div v-if="modalFlag" catchtouchmove="true" class="window">
          <div class="window-mian">
            <div class="window-title">
              <img src="https://oss.tzyizan.com/salesInfo/201907251327481564032468239.png">
              <i>
                <p>为了提供优质服务,请您授权后</p>
                <p>放心使用,您的信息将受到保护</p>
                <span>
                        <button form-type="submit" class="look-just" lang="zh_CN" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">允许授权</button>
                </span>
              </i>
            </div>
          </div>
        </div>
      </form>
      <div class="business-main" >
        <el-form ref="postForm" :model="postForm" >
          <div class="mainA">
          <div class="cards">
            <!--名片风格1-->
            <div class="card-top" v-if="cardType ===0">
              <img src="https://oss.wq1516.com/salesInfo/201906181125191560828319376.jpg" />
              <div class="cards-M">
                <div class="cards-main">
                  <p class="cards-img"><img :src="postForm.imgUrl || 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png' + '?x-oss-process=style/c400'"  @click="preview(postForm.imgUrl,[postForm.imgUrl])"/></p>
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
            <!--名片风格2-->
            <div class="card-topA" v-if="cardType===2">
              <div class="ordinary-wrap shadow three-card">
                <image @click="preview(postForm.imgUrl,[postForm.imgUrl])" class="three-img" :src="postForm.imgUrl" mode="aspectFill" @load="imgLoad"></image>
                <div class="right-three">
                  <div class="triangle"></div>
                  <p class="top-club flexRow">
                    <image :src="logo" mode="aspectFill" class="logo-img"></image>
                    <span class="club-name">{{postForm.salesCompanyName}}</span>
                  </p>
                  <image class="qrcode-bg" src="/static/images/qrcode-bg.png" mode="aspectFill"></image>
                  <div class="name-job-wrap">
                    <p class="name">{{postForm.name}}</p>
                    <p>{{postForm.job}}</p>
                  </div>
                  <div class="type-company">
                    <p class="type">{{postForm.organizeType}}</p>
                    <p>{{postForm.organizeName}}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- 名片风格3 -->
            <div class="card-topC" v-else-if="cardType ===1">
              <div class="bgImgA">
                <img :src="postForm.imgUrl"/>
              </div>
              <div class="main">
                <div class="footer">
                  <div class="top">
                    <span class="name">{{postForm.name}}</span>
                    <span class="job">{{postForm.job}}</span>
                  </div>
                  <p class="phone">
                    {{postForm.phone}}
                  </p>
                  <p class="Img">
                    <img :src="postForm.imgUrl"/>
                  </p>
                </div>
              </div>
            </div>
            <!-- 名片风格4 长名字 -->
            <div class="card-topB" v-else-if="cardType === 3">
              <div class="ordinary-wrap shadow four-card">
                <div class="left-wrap">
                  <div class="img-wrap">
                    <image @click="preview(postForm.imgUrl,[postForm.imgUrl])" class="img" :src="postForm.imgUrl" mode="widthFix" @load="imgLoad"></image>
                  </div>
                  <p class="company-f">{{postForm.salesCompanyName}}</p>
                </div>
                <div class="r-top-w">
                  <p class="name">{{postForm.name}}</p>
                  <p class="job">{{postForm.job}}</p>
                </div>
                <div class="r-bottom-w">
                  <p>{{postForm.phone}}</p>
                  <p>{{postForm.address}}</p>
                </div>
              </div>
            </div>
              <div :class="fotter">
                <submit class="share"  @click="showType">分享名片</submit>
                <submit class="save" v-if="postForm.isCollect !== 1" @click="getCollect(postForm.id)">保存名片</submit>
                <submit class="save" v-else @click="cancelCollect(postForm.id)">取消关注</submit>
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
              <div class="col-1" @click="getAddress" v-if="postForm.salesAddDetailed">
                <div class="desc-wrap">
                  <span class="icon-wrap"><img class="icon-4" src="../../../static/images/dingwei.png"></span>
                  <text class="txt">{{ postForm.salesAddDetailed }}</text>
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
                <span class="logo-main" v-if="list || list.length !== 0"><img v-for="(item,index) in list" :key="index" :src="item" class="logo" /></span>
                <div class="word" v-if="list.length === 10">…</div>
              </div>
              <div class="zan">
                <img  @click="cancelCollect(postForm.id)" v-if="postForm.isCollect == 1" src="../../../static/images/dianzan.png" class="icon-8" />
                <img @click="getCollect(postForm.id)" v-else src="../../../static/images/dianzan1.png" class="icon-8" />
                <!--<span class="iconfont icon-dianzan" :class="salesmanRecord&&salesmanRecord.isPraise==1? 'up':'down'" @click="clickThumb"></span>-->
              </div>
            </div>
            <div class="group-4">
              <span class="people-browse">已有{{ postForm.browseCount }}人来访</span>
              <div class="block-5">
                <text class="reliable">点赞</text>
                <text class="reliable-next">{{ postForm.collectCount }} 次</text>
              </div>
            </div>
          </div>
            <!-- 名片码 -->
            <div :class="cardM" @click="routerTo(`./showQrcode/main?companyName=${postForm.salesCompanyName}&logo=${logo}&qrcode=${qrCodeUrl}&name=${postForm.name}&job=${postForm.job}&imgUrl=${postForm.imgUrl}`)">
              <p class="ma-txt">名片码</p>
              <div class="radius-img">
                <img  v-if="qrCodeUrl" :src="qrCodeUrl" mode="aspectFill">
              </div>
            </div>
            <!-- 个人简介 -->
            <div class="personal" v-if="postForm.voice || postForm.info">
              <div class="personal-top">
                <span class="personal-icont">
                  <img src="../../../static/images/personalA.png">
                </span>
                <span class="personal-title">个人简介</span>
              </div>
              <div class="personal-main">
                <div class="personal-maimT">
                  <div class="personal-text">
                    <!--<div class="personal-wel">-->
                    <!--<span>您好！我是{{ postForm.salesCompanyName }}的{{ postForm.name }}</span>-->
                    <!--</div>-->
                    <div class="personal-teach">
                        <span v-if="postForm.info">
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{postForm.info}}
                        </span>
                    </div>
                  </div>
                  <div class="personalVoice" v-if="postForm.voice">
                    <!--<span class="personal-img">-->
                    <!--<img class="personal-img" :src="postForm.imgUrl">-->
                    <!--</span>-->
                    <span class="personal-voice">
                      <!--<img class="personal-voice" src="../../../static/images/voice.png">-->
                      <div class="action-bg" @click="playAudio">
                        <!--<div class="back iconfont icon-icon-test3"></div>-->
                        <span class="playan iconfont iconbofang" v-if="!changeVoiceFlag"></span>
                        <span class="playan iconfont iconbofanghover" v-if="changeVoiceFlag"></span>
                      </div>
                      <div class="center-re">
                        <div class="small-wrap" :style="animal" :class="{'animal-point':animal!==''}">
                          <p class="small-radius"></p>
                        </div>
                        <p class="line"></p>
                      </div>
                      <div class="block-10">
                        <text class="txt-2">00:{{voiceTime}}</text>
                      </div>
                    </span>
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
                <div class="company-bg" v-if="postForm.companyImgUrl">
                  <img :src="postForm.companyImgUrl"/>
                </div>
                <div class="company-title" v-if="postForm.companyInfo">
                  <span>{{ postForm.companyInfo }}</span>
                </div>
              </div>
            </div>

            <!--公司产品-->
            <div class="product" v-if="goodsList.length !== 0">
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
                <div class="product-details" v-for="(item,index) in goodsList" :key="index" @click="goToProduct(goodsList[index].id)">
                    <div class="product-details-img">
                      <img :src="item.imgUrl + '?x-oss-process=style/c400'"/>
                    </div>
                  <div class="product-details-title">
                    {{ item.name }}
                  </div>
                  <!--<div class="product-details-title">-->
                    <!--{{ item.info }}-->
                  <!--</div>-->
                  <div class="product-details-click">
                    ￥  {{ item.price }}
                  </div>

                </div>
              </div>
            </div>

            <!--我的照片-->
            <div class="product" v-if="imgUrlList.length !== 0 && imgUrlList[0] !== ''">
              <div class="product-top">
                <span class="product-icont">
                <img src="../../../static/images/imgUrl.png">
                </span>
                <span class="product-title">照片</span>
                <span class="product-right">
                  更多<img src="../../../static/images/right-cc.png">
                </span>
              </div>
              <div class="product-main">
                <div class="product-details" v-for="(item,index) in imgUrlList" :key="index">
                  <div class="product-details-imgA">
                    <img :src="item +'?x-oss-process=style/c400'" @click="previewImg(imgUrlList,index)"/>
                  </div>
                </div>
              </div>
            </div>

            <!--我的视频 v-if="videoList !== ''"-->
            <div class="product" v-if="video !== ''">
              <div class="product-top">
                <span class="product-icont">
                <img src="../../../static/images/video.png">
                </span>
                <span class="product-title">视频</span>
                <!--<span class="product-right">-->
                <!--更多<img src="../../../static/images/right-cc.png">-->
                <!--</span>-->
              </div>
              <div class="product-main">
                <div class="product-details-video">
                  <div class="up-video">
                    <video id="myVideo" v-if="videoFlag" :src="video" @play="playA()"  @ended=" end()" autoplay objectFit="fill" class="cover-hw"></video>
                    <div v-else class="cover-view" >
                      <div @click="videoPlay">
                        <!--<i class="delete-img iconfont iconshanchu-copy" @click="deleteVideo"></i>-->
                        <img class="FMimg" :src="videoImg" mode="scaleToFill" />
                        <div class="model-btn">
                          <div class="play-icon">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <!--v-if="setUp === 0"-->
          <div v-if="setUp === 0" class="found" @click="goInto()">
            <i class="iconfont iconbianzu">   <s>+</s></i>
          </div>
          <form report-submit='true' @submit='getFormID' class="form">
            <div class="foundA" @click="goMsg()">
              <div class="main">
                  <span class="img">
                <img :src="imgUrl || 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png' + '?x-oss-process=style/w100'"/>
              </span>
                <span class="talk">聊一聊</span>
              </div>
            </div>
          </form>
        </el-form>
      </div>
    </div>
</template>

<script>
  import personApi from '@/api/person'
  import apiproducts from '@/api/product'
  const backgroundAudioManager = wx.createInnerAudioContext() // 播放音频
  export default {
    name: 'index',
    components: {
    },
    data () {
      return {
        CardId: '',
        fotter: 'card-footer',
        cardM: 'card-ma',
        personApi: personApi,
        apiproducts: apiproducts,
        postForm: [],
        voiceUrl: '',
        voiceTime: '00',
        videoImg: '',
        currentAudio: '',
        imgWidth: null,
        companyName: '',
        goodsList: [],
        id: '',
        list: [],
        videoFlag: false,
        video: '',
        imgUrlList: [],
        imgHeight: null,
        modalflag: false,
        modalFlag: false,
        cardType: 0,
        name: '',
        job: '',
        phone: '',
        logo: '',
        apply: '',
        imgUrl: 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png',
        showpop: false,
        changeVoiceFlag: false,
        fixedPhone: '15988993797',
        weChat: 'Williamchen',
        qrCodeUrl: 'https://oss.wq1516.com/default.png',
        address: '浙江温岭',
        email: '351574718@qq.com',
        recordNum: 999,
        praiseNum: 888,
        num: 0,
        headImgList: [],
        details: [],
        user: '',
        latitude: '',
        longitude: '',
        isBuy: '',
        setUp: '',
        salesManId: '',
        animal: ''
      }
    },
    onLoad: function (options) {
      this.list = []
      console.log('goodsId', options)
      if (options.goodsId !== 'null' && options.goodsId) {
        this.CardId = options.id
        this.goToProduct(options.goodsId)
      } else {
        this.CardId = options.id
      }
      this.getInfo()
    },
    onShow () {
      this.getInfo()
      this.showpop = false
      this.getSun()
      this.getLogo()
      this.getInfoA()
      this.getType()
      this.isBuy = wx.getStorageSync('isBuy')
    },
    onUnload () {
      this.video = ''
      this.videoFlag = false
      this.imgUrlList = ''
      this.latitude = ''
      this.longitude = ''
      this.voiceUrl = ''
      this.imgUrl = ''
      this.job = ''
      this.name = ''
      this.job = ''
      this.postForm = []
      this.phone = ''
      this.logo = ''
      this.list = []
    },
    onShareAppMessage () {
      this.insertOpera('分享了名片', 21)
      return {
        title: `您好！我是${this.companyName}的${this.name},这是我的名片`,
        path: 'pages/loading/main?id=' + this.salesManId + '&fromWay=1&userId=' + this.id
      }
    },
    methods: {
      getType () {
        const businessId = wx.getStorageSync('businessId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/selfPageInfo/selectAllForUser',
          body: {
            'businessId': businessId,
            'type': 3
          }
        }).then(res => {
          if (res.data) {
            this.cardType = res.data[0].cardType
            // this.cardType = 2
            if (this.cardType === 0) {
              this.fotter = 'card-footer'
              this.cardM = 'card-ma'
            } else if (this.cardType === 2) {
              this.fotter = 'card-footerA'
              this.cardM = 'card-maA'
            } else if (this.cardType === 1) {
              this.fotter = 'card-footerA'
              this.cardM = 'card-maB'
            } else if (this.cardType === 3) {
              this.fotter = 'card-footerA'
              this.cardM = 'card-maC'
            }
            // console.log('cardType', this.cardType)
          }
          // const tradeStatus = res.data.tradeStatus
          // wx.setStorageSync('tradeStatus', tradeStatus)
        }).catch(err => {
          console.log(err)
        })
      },
      async getFormID (e) {
        await apiproducts.getFormid(e.target.formId)
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
      preview (img, arr) {
        wx.previewImage({
          current: img,
          urls: arr
        })
      },
      // 播放开始
      playA () {
        this.videoFlag = true
        // const videoContext = wx.createVideoContext('myVideo')
        // videoContext.play()
      },
      // 播放结束
      end () {
        this.videoFlag = false
        // const videoContext = wx.createVideoContext('myVideo')
        // videoContext.seek(0)
        // videoContext.stop()
      },
      // 播放视频
      videoPlay () {
        this.videoFlag = true
        // const videoContext = wx.createVideoContext('myVideo')
        // videoContext.play()
      },
      // 插入雷达
      async insertOperaA (info, recordType, id) {
        await personApi.OperationInsert({businessId: this.businessId, goodsId: id, info, recordType, salesmanId: this.salesManId, userId: this.userId})
      },
      // 传id 跳入产品信息
      goToProduct (id) {
        this.businessId = wx.getStorageSync('businessId')
        this.salesmanId = wx.getStorageSync('salesManId')
        this.userId = wx.getStorageSync('userId')
        this.insertOperaA('查看了产品', 3, id)
        wx.navigateTo({
          url: '../productA/detail/main?id=' + id
        })
      },
      // 插入雷达
      async insertOpera (info, recordType) {
        this.businessId = wx.getStorageSync('businessId')
        this.id = wx.getStorageSync('userId')
        // this.salesManIdA = this.cardId
        await personApi.OperationInsert({ businessId: this.businessId, info, recordType, salesmanId: this.salesManId, userId: this.id })
      },
      // 微信复制
      textPaste () {
        wx.setClipboardData({
          data: this.weChat,
          success: (res) => {
            wx.showToast({
              title: '复制成功',
              icon: 'none'
            })
            this.insertOpera('复制了微信', 18)
          }
        })
      },
      // 邮箱内容复制
      textPasteEmail () {
        wx.setClipboardData({
          data: this.email,
          success: (res) => {
            wx.showToast({
              title: '复制成功',
              icon: 'none'
            })
            this.insertOpera('复制了邮箱', 17)
          }
        })
      },
      // 跳到原生地址导航
      getAddress () {
        wx.openLocation({
          latitude: parseFloat(this.latitude),
          longitude: parseFloat(this.longitude),
          scale: 18,
          name: this.companyName,
          address: this.address,
          success: () => {
            this.insertOpera('导航了地址', 19)
          }
        })
      },
      // 呼叫电话
      makePhoneCall () {
        wx.makePhoneCall({
          phoneNumber: this.fixedPhone,
          success: () => {
            this.insertOpera('拨打了电话', 20)
          }
        })
      },
      imgLoad (e) {
        this.imgWidth = e.target.width
        this.imgHeight = e.target.height
      },
      // 授权
      async bindGetUserInfo (e) {
        // 解密
        const userInfo = e.target.userInfo
        if (e.target.userInfo) {
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
        } else {
          this.modalFlag = false
          wx.showToast({
            title: '取消授权',
            icon: 'none',
            duration: 2000
          })
        }
        wx.setStorageSync('avatarUrl', e.target.userInfo.avatarUrl)
        wx.setStorageSync('name', e.target.userInfo.nickName)
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
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformSalesman/getWxACodeUnlimit',
          body: {
            'businessId': businessId,
            'salesmanId': this.CardId,
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
      // 跳转
      goInto () {
        wx.navigateTo({
          url: '../index/main'
        })
      },
      goMsg (id) {
        wx.navigateTo({
          url: '../msgcenter/main?id=' + this.user
        })
      },
      // 跳转
      routerTo (url) {
        wx.navigateTo({
          url
        })
      },
      // 页面是否加载收下信息
      getInfoA () {
        this.userId = wx.getStorageSync('userId') // 获取本地userId
        console.log('userId', this.userId)
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': this.userId
          }
        }).then(res => {
          if (res.data) {
            if (res.data.nickName === '' || res.data.nickName == null) {
              this.modalFlag = true
            } else {
              this.modalFlag = false
            }
            this.setUp = 1
          } else {
            this.setUp = 0
            this.modalFlag = true
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
          url: '/platformSalesman/selectInfoBySalesManId',
          body: {
            'salesmanId': this.CardId, 'userId': userId
          }
        }).then(res => {
          // console.log('aa', res)
          this.latitude = res.data.latitude
          this.longitude = res.data.longitude
          if (res.data.richText !== null) {
            this.imgUrlList = res.data.richText.split(',')
          }
          if (res.data.video !== null && res.data.video) {
            this.video = res.data.video
            this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
            // console.log('video', this.videoImg)
            // console.log('aaaaa', this.video)
          }
          this.user = res.data.userId
          this.postForm = res.data
          this.list = res.data.headImgList.list
          this.goodsList = res.data.goodsList
          this.name = res.data.name
          this.job = res.data.job
          this.phone = res.data.phone
          this.imgUrl = res.data.imgUrl
          this.voiceUrl = res.data.voice
          this.id = wx.getStorageSync('userId')
          this.salesManId = res.data.id
          this.companyName = res.data.salesCompanyName
          const bgM = wx.createInnerAudioContext()// 初始化createInnerAudioContext接口
          // 设置播放地址
          bgM.src = this.voiceUrl
          bgM.onCanplay(() => {
            console.log(bgM.duration)// 0，这个方法需要执行一下，所以不能删
          })
          setTimeout(() => {
            this.num = Math.round(bgM.duration)
            this.voiceTime = this.formatSeconds(this.num)
            // console.log(this.num)
          }, 100)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 获取语音时长
      formatSeconds (value) {
        let theTime = parseInt(value)// 秒
        let middle = 0// 分
        let result = ''
        let temp = ''

        if (theTime > 60) {
          middle = parseInt(theTime / 60)
          theTime = parseInt(theTime % 60)
          if (middle > 60) {
            middle = parseInt(middle % 60)
          }
        }
        temp = parseInt(theTime)
        if ((temp + '').length === 1) {
          temp = '0' + parseInt(theTime)
          result = temp
        } else {
          result = temp
        }
        if (middle > 0) {
          if ((middle + '').length === 1) {
            result = '0' + parseInt(middle) + ':' + temp
          } else {
            result = '' + parseInt(middle) + ':' + temp
          }
        }
        return result
      },
      // 添加收藏
      getCollect (id) {
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
            that.postForm.isCollect = 1
            that.postForm.collectCount++
            that.getInfo()
            // this.insertOpera('添加了收藏', 22)
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
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
          console.log('取消', res)
          if (res.code === 200) {
            const that = this
            that.postForm.isCollect = 0
            that.postForm.collectCount--
            that.getInfo()
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 旋转音频
      changeVoice () {
        this.changeVoiceFlag = !this.changeVoiceFlag
      },
      // 播放音频
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
          let second = this.num + 1
          backgroundAudioManager.onPlay(() => {
            console.log('开始播放')
            this.insertOpera('播放了语音', 16)
            this.animal = 'animation-duration:' + second + 's'
          })
          backgroundAudioManager.onError((res) => {
            console.log('fail')
            this.animal = ''
          })
          backgroundAudioManager.onEnded(() => {
            console.log('音乐播放结束')
            this.animal = ''
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
