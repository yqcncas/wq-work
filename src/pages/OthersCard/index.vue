<template>
  <!-- 名片 -->
    <div class="business">
      <div class="business-main" >
        <el-form ref="postForm" :model="postForm" >
          <div class="cards">
              <div class="card-top">
                <img src="../../../static/images/cardbj.jpg" />
                <div class="cards-M">
                  <div class="cards-main">
                    <p class="cards-img"><img :src="postForm.imgUrl" /></p>
                    <p class="cards-name">
                      <span>{{ postForm.name === '' ?  postForm.nick_Name:postForm.nickName }}</span>
                    </p>
                    <p class="cards-job">
                      <span>{{ postForm.job }}</span>
                    </p>
                    <p class="cards-company">
                      <span>{{ postForm.salesCompanyName }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <submit class="share">分享名片</submit>
                <submit class="save">保存名片</submit>
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
                <div class="word">…</div>
              </div>
              <div class="zan">
                <img  @click="cancelCollect(postForm.id)" v-if="postForm.isCollect == 1" src="../../../static/images/love-se.png" class="icon-8" />
                <img @click="getCollect(postForm.id)" v-else src="../../../static/images/love.png" class="icon-8" />
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
            <div class="card-ma" @click="routerTo(`./showQrcode/index?companyName=${companyName}&logo=${logo}&qrcode=${qrCodeUrl}&name=${name}&job=${job}&imgUrl=${imgUrl}`)">
              <p class="ma-txt">名片码</p>
              <div class="radius-img">
                <img :src="postForm.url" mode="aspectFill">
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
                        <span>您好！我是{{ postForm.salesCompanyName }}的{{ postForm.name === '' ?  postForm.nick_Name:postForm.nickName }}</span>
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
            <div class="company">
              <div class="company-top">
                <span class="company-icont">
                  <img src="../../../static/images/lou.png">
                </span>
                <span class="company-title">公司介绍</span>
              </div>
              <div class="company-main">
                  <div class="company-bg">
                    <img src="../../../static/images/back.png"/>
                  </div>
                  <div class="company-title">
                    <span> 啊来获得绿卡监控力度加快垃圾的卡就开了啦可就大了卡就考虑啊来获得绿卡监控力度加快垃圾的卡就开了啦可就大了卡就考虑的金克拉金克拉的进阿里就大家快来的的金克拉金克拉的进阿里就大家快来的金克拉金克拉金克拉柯急啊啊来获得绿卡监控力度加快垃圾的卡就开a a a</span>
                  </div>
              </div>
            </div>

            <!--公司产品-->
            <div class="product">
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
                <div class="product-details" v-for="(item,index) in details" :key="index">
                    <div class="product-details-img">
                      <img :src="item.img"/>
                    </div>
                    <div class="product-details-title">
                      {{ item.title }}
                    </div>
                    <div class="product-details-click">
                      ￥  {{ item.mores }}
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="found">
            <span>我要<br />创建</span>
          </div>
        </el-form>
      </div>
    </div>
</template>

<script>
  const backgroundAudioManager = wx.createInnerAudioContext() // 播放音频
  export default {
    name: 'index',
    components: {
    },
    data () {
      return {
        CardId: '',
        postForm: '',
        voiceUrl: '',
        currentAudio: '',
        changeVoiceFlag: false,
        fixedPhone: '15988993797',
        weChat: 'Williamchen',
        phone: '15988993797',
        qrCodeUrl: 'https://oss.wq1516.com/default.png',
        address: '浙江温岭',
        email: '351574718@qq.com',
        recordNum: 999,
        praiseNum: 888,
        num: 0,
        headImgList: [],
        details: [{
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '122'
        }, {
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '222'
        }, {
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '333'
        }, {
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '444'
        }]
      }
    },
    onLoad: function (options) {
      this.CardId = options.id
      this.getInfo()
    },
    methods: {
      routerTo (url) {
        wx.navigateTo({
          url
        })
      },
      // 页面加载信息
      getInfo () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: 'server/platformSalesman/selectInfoBySalesManId',
          body: {
            'salesmanId': this.CardId, 'userId': userId
          }
        }).then(res => {
          console.log('res', res)
          this.postForm = res.data
          this.voiceUrl = res.data.voice
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
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 添加收藏
      getCollect (id) {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: 'server/platformUserSalesman/insert',
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
          url: 'server/platformUserSalesman/deleteBySalesmanId',
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
