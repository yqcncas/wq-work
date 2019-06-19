<template>
  <div>
    <vue-tab-bar
      @fetch-index="clickIndexNav"
      :selectNavIndex=selectNavIndex
      :needButton="needButton"
      :handButton="handButton"
      :btnText="btnText">
    </vue-tab-bar>
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
    <div class="cardHold">
      <!--顶部-->
      <scroll-view class="scroll" scroll-y  :scroll-into-view="toView"  :style="'height:' + windowHeight + 'px'" :scroll-top="scrollTop"  >
      <div class="cardHold-top">
        <div class="cardHold-top-img">
          <img src="https://oss.wq1516.com/salesInfo/201906181129151560828555097.jpg"/>
        </div>
        <div class="cardHold-top-text">
          <span>名片夹</span>
        </div>
        <div class="cardHold-top-input">
          <p>
             <input placeholder="搜索关键词" placeholder-style="color: #cccccc;"/>
             <span class="cardHold-top-button"><img src="../../../static/images/search.png"></span>
          </p>
        </div>
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
                  <span class="cardHold-top-main-name" v-if="name !== ''">{{ name }}</span>
                  <span class="cardHold-top-main-name" v-else>无姓名</span>
                  <span class="cardHold-top-main-job" v-if="job !== ''">{{ job }}</span>
                  <span class="cardHold-top-main-job" v-else>无工作</span>
                  <p class="cardHold-top-main-company" v-if="company !== ''">{{ company }}</p>
                  <p class="cardHold-top-main-company" v-else>无公司名称</p>
                  <p class="cardHold-top-main-footer">
                    <submit  v-if="name == '' && job == ''" class="cardHold-top-main-footer-share" @click="ArouterTo(`../businesscard/main`)">
                      <span><i class="iconfont iconfenxiang"></i>分享名片</span>
                    </submit>
                    <submit v-else class="cardHold-top-main-footer-share" @click="showType">
                      <span><i class="iconfont iconfenxiang"></i>分享名片</span>
                    </submit>
                    <submit v-if="name == '' && job == ''" class="cardHold-top-main-footer-look" @click="ArouterTo(`../businesscard/main`)">
                      <i class="iconfont iconiconfontsaomiaoerweima-copy"></i>
                      <span>名片码</span>
                    </submit>
                     <submit v-else class="cardHold-top-main-footer-look" @click="routerTo(`./showQrcode/main?companyName=${company}&logo=${logo}&qrcode=${qrCodeUrl}&name=${name}&job=${job}&imgUrl=${imgUrl}`)">
                       <i class="iconfont iconiconfontsaomiaoerweima-copy"></i>
                       <span>名片码</span>
                    </submit>
                  </p>
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
              <div class="cardHold-blok-right">
                <p class="cardHold-blok-name">群名片</p>
                <P class="cardHold-blok-J">邀请微信好友加入</P>
              </div>
            </div>
            <div v-else class="cardHold-blok" @click="goGroup">
              <div class="cardHold-Img1">
                <img src="../../../static/images/qun.png">
              </div>
              <div class="cardHold-blok-right">
                <p class="cardHold-blok-name">群名片</p>
                <P class="cardHold-blok-J">邀请微信好友加入</P>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--底部查找-->
        <div class="padds">
          <div class="cardHold-ft" v-for="(items,indexs) in commitInfo" :key="indexs">
            <div class="cardHold-ftM" >
              <div class="cardHold-ftName" :id = 'indexs' v-if="items.length !== 0">
                <p>{{indexs}}</p>
              </div>
              <div class="cardHold-ftMain">
                <div class="cardHold-ftMain-ct" v-for="(item,index) in items" :key="index">
                  <div class="center" @touchstart="touchStart($event)" @touchend="touchEnd($event,index,items)" :data-type="item.type"  >
                    <div>
                    <div class="cardHold-ftMain-ct-img" @click="goToCard(item.salesmanId)" >
                      <img :src="item.imgUrl"/>
                    </div>
                    <div v-if="item.grade === 'V1' && item.grade === null "  class="cardHold-ftMain-rt" @click="recover(index,items)">
                      <div @click="goToCard(item.salesmanId)">
                        <span class="icon">企</span>
                        <span class="name">{{ item.name }}</span>
                        <span class="job">{{ item.job }}</span>
                        <span class="status">{{ item.status }}</span>
                        <span class="grade">{{ item.grade }}</span>
                        <p class="company">{{ item.salesCompanyName }}</p>
                      </div>
                        <div class="phone" @click="makePhoneCall(item.phone)">
                          <img src="../../../static/images/call.png"/>
                        </div>
                    </div>
                    <div v-else-if="item.grade === 'V2' " class="cardHold-ftMain-rt2 " @click="recover(index,items)">
                      <div @click="goToCard(item.salesmanId)">
                      <span class="icon">企</span>
                      <span class="name">{{ item.name }}</span>
                      <span class="job">{{ item.job }}</span>
                      <span class="status">{{ item.status }}</span>
                      <span class="grade">{{ item.grade }}</span>
                      <p class="company">{{ item.salesCompanyName }}</p>
                      </div>
                      <div class="phone"  @click="makePhoneCall(item.phone)">
                        <img src="../../../static/images/call.png"/>
                      </div>
                    </div>
                    <div v-else class="cardHold-ftMain-rt3" @click="recover(index,items)">
                      <div @click="goToCard(item.salesmanId)">
                      <span class="icon">企</span>
                      <span class="name">{{ item.name }}</span>
                      <span class="job">{{ item.job }}</span>
                      <span class="status">{{ item.status }}</span>
                      <span class="grade">{{ item.grade }}</span>
                      <p class="company">{{ item.salesCompanyName }}</p>
                    </div>
                      <div class="phone"  @click="makePhoneCall(item.phone)">
                        <img src="../../../static/images/call.png"/>
                      </div>
                    </div>
                    </div>
                    <div class="delete" @click="delect(index,items,item.salesmanId)">
                      删除
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <!--右侧检索字母-->
    <div class="index-english">
      <div v-for="(itemA,index) in commitInfo"  :key="index"  @touchstart="touchstartL($event)" :id="index" @touchmove="touchmoveL" @touchend="touchendL">{{ index }}</div>
    </div>
    <!--检索显示字母-->
    <div v-if="indexShow" class="index-name" >{{indexEnglish}}</div>
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
      company: '',
      companyName: '',
      id: '',
      job: '',
      name: '',
      imgUrl: '',
      selectNavIndex: 1,
      needButton: true,
      handButton: true,
      indexShow: false,
      indexId: '',
      showpop: false,
      indexy: '',
      qrCodeUrl: '',
      postForm: '',
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
      letter: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      letterA: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      arrId: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      commitInfo: ''
    }
  },
  onShow () {
    this.getLogo()
    this.getMy()
    wx.hideTabBar()
    this.showpop = false
    this.getInfo()
    this.getSun()
  },
  onLoad (options) {
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
    // 呼叫电话
    makePhoneCall (phone) {
      wx.makePhoneCall({
        phoneNumber: phone,
        success: () => {
          this.insertOpera('拨打了电话', 20)
        },
        fail: () => {
          wx.showToast({
            title: '取消播放',
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
      this.endX = e.mp.changedTouches[0].clientX
      if (this.startX - this.endX > 10) {
        for (let i = 0; i < items.length; i++) {
          items[i].type = 0
        }
        items[index].type = 1
      } else if (this.startX - this.endX < -10) {
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
        url: '../radar/main'
      })
    },
    // 跳转群组
    goGroup () {
      wx.navigateTo({
        url: '../GroupCard/main'
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
