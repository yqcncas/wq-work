<template>
  <div>
    <vue-tab-bar
      @fetch-index="clickIndexNav"
      :selectNavIndex=selectNavIndex
      :needButton="needButton"
      :handButton="handButton"
      :btnText="btnText">
    </vue-tab-bar>
    <div class="cardHold">
      <!--顶部-->
      <scroll-view class="scroll" scroll-y  :scroll-into-view="toView"  :style="'height:' + windowHeight + 'px'" :scroll-top="scrollTop"  >
      <div class="cardHold-top">
        <div class="cardHold-top-img">
          <img src="../../../static/images/cardHold.jpg"/>
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
                <span class="cardHold-top-main-img">
                  <img src="../../../static/images/tiangou.jpg">
                </span>
                <div class="cardHold-top-main-right">
                  <span class="cardHold-top-main-name">李东阳</span>
                  <span class="cardHold-top-main-job">技术总监</span>
                  <p class="cardHold-top-main-company">浙江万仟科技有限公司</p>
                  <p class="cardHold-top-main-footer">
                    <submit class="cardHold-top-main-footer-share">
                      <span><i class="iconfont iconfenxiang"></i>分享名片</span>
                    </submit>
                     <submit class="cardHold-top-main-footer-look" @click="routerTo(`./showQrcode/index?companyName=${companyName}&logo=${logo}&qrcode=${qrCodeUrl}&name=${name}&job=${job}&imgUrl=${imgUrl}`)">
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
            <div class="cardHold-blok" @click="goRadar">
              <div class="cardHold-Img">
                <img src="../../../static/images/leida.png">
              </div>
              <div class="cardHold-blok-right cardHold-blok-right-bt">
                <p class="cardHold-blok-name">AI雷达</p>
                <P class="cardHold-blok-J">客户数据追踪、统计、AI分析</P>
              </div>
            </div>
            <div class="cardHold-blok" @click="goGroup">
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
          <div class="cardHold-ft" v-for="(items,indexs) in letter" :key="items">
            <div class="cardHold-ftM" >
              <div class="cardHold-ftName" :id = 'items'>
                <p>{{items}}</p>
              </div>
              <div class="cardHold-ftMain">
                <div class="cardHold-ftMain-ct" v-for="(item,index) in commitInfo" :key="index">
                  <div class="center" @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :data-type="item.type" >
                    <div class="cardHold-ftMain-ct-img" @click="recover(index)">
                      <img src="../../../static/images/tiangou.jpg"/>
                    </div>
                    <div v-if="item.grade === 'V1' " class="cardHold-ftMain-rt" @click="recover(index)">
                      <span class="icon">{{ item.icon }}</span>
                      <span class="name">{{ item.name }}</span>
                      <span class="job">{{ item.job }}</span>
                      <span class="status">{{ item.status }}</span>
                      <span class="grade">{{ item.grade }}</span>
                      <p class="company">{{ item.company }}</p>
                      <div class="phone">
                        <img src="../../../static/images/call.png"/>
                      </div>
                    </div>
                    <div v-else-if="item.grade === 'V2' " class="cardHold-ftMain-rt2 " @click="recover(index)">
                      <span class="icon">{{ item.icon }}</span>
                      <span class="name">{{ item.name }}</span>
                      <span class="job">{{ item.job }}</span>
                      <span class="status">{{ item.status }}</span>
                      <span class="grade">{{ item.grade }}</span>
                      <p class="company">{{ item.company }}</p>
                      <div class="phone">
                        <img src="../../../static/images/call.png"/>
                      </div>
                    </div>
                    <div v-else class="cardHold-ftMain-rt3" @click="recover(index)">
                      <span class="icon">{{ item.icon }}</span>
                      <span class="name">{{ item.name }}</span>
                      <span class="job">{{ item.job }}</span>
                      <span class="status">{{ item.status }}</span>
                      <span class="grade">{{ item.grade }}</span>
                      <p class="company">{{ item.company }}</p>
                      <div class="phone">
                        <img src="../../../static/images/call.png"/>
                      </div>
                    </div>
                    <div class="delete" @click="delect(index)">
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
      <div v-for="(itemA,index) in letter"  :key="index"  @touchstart="touchstartL($event)" :id="itemA" @touchmove="touchmoveL" @touchend="touchendL">{{ itemA }}</div>
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
      selectNavIndex: 1,
      needButton: true,
      handButton: true,
      indexShow: false,
      indexId: '',
      indexy: '',
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
      arrId: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      commitInfo: [{
        top: 'A',
        icon: '企',
        name: '李松阳',
        company: '浙江万仟科技有限公司',
        status: '已认证',
        grade: 'V1',
        type: 0
      }, {
        top: 'B',
        icon: '企',
        name: '李松阳',
        company: '浙江万仟科技有限公司',
        status: '已认证',
        grade: 'V2',
        type: 0
      }, {
        top: 'Z',
        icon: '企',
        name: '李松阳',
        company: '浙江万仟科技有限公司',
        status: '已认证',
        grade: 'V3',
        type: 0
      }, {
        top: 'X',
        icon: '企',
        name: '李松阳',
        company: '浙江万仟科技有限公司',
        status: '已认证',
        grade: 'V1',
        type: 0
      }]
    }
  },
  onShow () {
    wx.hideTabBar()
    this.getInfo()
  },
  onLoad (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log('res', res.windowHeight)
        that.windowHeight = res.windowHeight + 22
      }
    })
  },
  watch () {
    console.log(this.toView)
  },
  methods: {
    // 获取自己所关注卡片 名片夹
    getInfo () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: 'server/platformUserSalesman/getAllSalesmanByUserId',
        body: {
          'userId': userId
        }
      }).then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
    touchStart (e) {
      // 获取移动距离，可以通过打印出e，然后分析e的值得出
      this.startX = e.mp.changedTouches[0].clientX
    },
    touchEnd (e, index) {
      // 获取移动距离
      this.endX = e.mp.changedTouches[0].clientX
      if (this.startX - this.endX > 10) {
        for (let i = 0; i < this.commitInfo.length; i++) {
          this.commitInfo[i].type = 0
        }
        this.commitInfo[index].type = 1
      } else if (this.startX - this.endX < -10) {
        for (let i = 0; i < this.commitInfo.length; i++) {
          this.commitInfo[i].type = 0
        }
      }
    },
    recover (index) {
      this.commitInfo[index].type = 0
    },
    // 删除
    delect (index) {
      this.commitInfo.splice(index, 1)
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
        // console.log('a', this.letter[x])
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
    goRadar () {
      wx.navigateTo({
        url: '../radar/main'
      })
    },
    goGroup () {
      wx.navigateTo({
        url: '../GroupCard/main'
      })
    },
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
