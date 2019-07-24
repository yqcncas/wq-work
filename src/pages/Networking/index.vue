<template>
    <div class="Net">
      <div class="NetTop">
        <div class="title">
          <span>人脉</span>
        </div>
        <div class="info">
          <div class="info-left">
            <p class="num">8分</p>
            <p class="size">签到积分</p>
          </div>
          <div class="info-right">
            <p class="num">52次</p>
            <p class="size">签到次数</p>
          </div>
        </div>
        <div class="Check" v-if="Check===0" @click="check()">
          <button class="check-in"><span>签到</span></button>
        </div>
        <div class="CheckA" v-if="Check===1" @click="checkA()">
          <button class="check-in"><span>已签</span></button>
        </div>
        <div class="BG-img">
          <img src="../../../static/images/渐变.png">
        </div>
      </div>

      <!--名片-->
      <div class="NetCard">
        <div class="NetCard-top">
            <span class="title">热门名片</span>
            <span class="fire"><i class="iconfont iconremen"></i>我要上热门</span>
        </div>
        <div class="NetCard-main" >
          <scroll-view class="scroll-view" scroll-y @scrolltolower = "getScroll()" :style="'height:' + windowHeight + 'px'">
          <div class="conts-main">
            <div v-if="cards !== ''|| cards !== null">
              <div class="card" v-for="(item,index) in cards" :key="index">
                <div @click="goToCard(item.id)">
                  <span><img :src="item.imgUrl + '?x-oss-process=style/c400'"></span>
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
          </scroll-view>
        </div>
      </div>


      <div class="NetSucces" v-if="deleteShow === true">
        <div class="NetSucces-main">
          <div class="img">
            <img src="https://oss.tzyizan.com/salesInfo/201907231449301563864570184.png">
            <div class="main">
              <p class="suc">签到成功</p>
              <p class="title">恭 喜 你 获 得 5 积 分</p>
              <p class="info">积 分 可 用 于 名 片 置 顶 等 服 务</p>
            </div>
            <div class="delete">
              <p class="line"></p>
              <i class="iconfont iconshanchu-copy" @click="checkDelete()"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        tabs: 1,
        lastPage: '',
        nextPage: '',
        cards: [],
        pageNum: 0,
        pageSize: 0,
        Check: 0,
        windowHeight: '',
        windowHeightA: '',
        deleteShow: false
      }
    },
    onLoad () {
      const screenHeight = wx.getSystemInfoSync().screenHeight
      const windowHeight = wx.getSystemInfoSync().windowHeight
      const tarbar = screenHeight - windowHeight
      // this.windowHeight = screenHeight - 278 - tarbar
      if (screenHeight < 569) {
        this.windowHeight = screenHeight - 218 - tarbar
      } else if (screenHeight > 569 && screenHeight < 668) {
        this.windowHeight = screenHeight - 258 - tarbar
      } else if (screenHeight > 668 && screenHeight < 737) {
        this.windowHeight = screenHeight - 278 - tarbar
      } else if (screenHeight > 738 && screenHeight < 813) {
        this.windowHeight = screenHeight - 258 - tarbar
      } else if (screenHeight > 1023 && screenHeight < 1025) {
        this.windowHeight = windowHeight - 520
      } else if (screenHeight > 1025 && screenHeight < 1113) {
        this.windowHeight = windowHeight - 580
      } else if (screenHeight > 1113 && screenHeight < 1367) {
        this.windowHeight = windowHeight - 700
      } else if (screenHeight > 1367) {
        this.windowHeight = windowHeight - screenHeight / 2
      } else {
        this.windowHeight = windowHeight - screenHeight / 2
      }
      // if (windowHeight < 569) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 215) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 215) * 2
      // } else if (windowHeight > 569 && windowHeight < 668) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 305) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 305) * 2
      //   console.log('height', wx.getSystemInfoSync().screenHeight)
      // } else if (windowHeight > 668 && windowHeight < 737) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 300) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 300) * 2
      //   console.log('height', wx.getSystemInfoSync().screenHeight)
      // } else if (windowHeight > 738 && windowHeight < 813) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 335) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 335) * 2
      //   console.log('height', wx.getSystemInfoSync().screenHeight)
      // } else if (windowHeight > 1023 && windowHeight < 1024) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 100) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 100) * 2
      // }
    },
    onShow () {
      this.pageNum = 1
      this.getCard()
    },
    async onReachBottom () {
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
    },
    methods: {
      // 签到
      check () {
        this.deleteShow = true
        this.Check = 1
      },
      checkA () {
        wx.showToast({
          title: '已签，明天继续哦',
          icon: 'none',
          duration: 2000
        })
      },
      // 隐藏
      checkDelete () {
        this.deleteShow = false
        this.Check = 1
      },
      // 点击跳转进入名片页
      goToCard (id) {
        wx.navigateTo({
          url: `../OthersCard/main?id=` + id
        })
      },
      // 监测滚动到底部加载分页
      getScroll () {
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
              if (item.imgUrl === '') {
                item.imgUrl = 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png'
              }
            })
            // console.log('data', this.cards)
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
      }
    }
  }
</script>

<style lang="less" scoped>
@import "style";
</style>
