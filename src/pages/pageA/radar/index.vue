<template>
  <div>
    <!--&lt;!&ndash; 足迹 &ndash;&gt;-->
    <!--<div class="radar-page" v-if="self">-->
      <!--<div class="radar-item" v-for="(item,index) in list" :key="index" @click="routeTo(`../custom/detail/index?id=${item.userId}`)">-->
        <!--<image class="header-img" :src="item.avatarUrl"></image>-->
        <!--<div class="center-box inlineB">-->
          <!--<p class="name-s">{{item.userName?item.userName:item.nickName}}</p>-->
          <!--<p v-if="item.recordType===4">将产品<span class="blue">{{item.goodsName}}</span><span class="red">{{item.info}}</span></p>-->
          <!--<p v-else-if="item.recordType===5">-->
            <!--<span class="red">{{item.info}}</span>了产品<span class="blue">{{item.goodsName}}</span>-->
          <!--</p>-->
          <!--<p v-else>-->
            <!--<span v-show="item.show">第<span class="red">{{item.browseTime}}</span>次，</span>{{item.info}}<span class="blue"-->
                                                                                                              <!--v-show="item.goodsName||item.title">{{item.goodsName?item.goodsName:item.title}}</span>-->
          <!--</p>-->
          <!--<i class="iconfont icon-liuyan" @click.stop="routeTo(`../msgcenter/index?id=${item.userId}`)" v-show="!self"></i>-->
          <!--<p class="inlineB time-right-top">{{item.browseDate}}</p>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!-- 雷达 -->
    <div class="new-radar">
      <div class="top-nav flexRow">
        <span :class="{'active':active===0}" @click="navTab(0)">时间</span>
        <span :class="{'active':active===1}" @click="navTab(1)">行为</span>
        <span :class="{'active':active===2}" @click="navTab(2)">互动</span>
      </div>
      <!-- 时间 -->
      <div class="radar-time common-pad" v-if="active===0">
        <div v-for="(item,i) in list" :key="i" @click="routeTo(`../custom/detail/main?id=${item.userId}`)">
          <p class="time" v-if="i===0">{{item.dataTime}}</p>
          <p class="time" v-if="i>0&&item.dataTime!==list[i-1].dataTime">{{item.dataTime}}</p>
          <div class="time-wrap">
            <p class="flexRow">
              <image class="head-img" mode="aspectFill" :src="item.avatarUrl"></image>
              <span class="name">{{item.userName||'未知'}}</span>
              <span class="min-time">{{item.time}}</span>
            </p>
            <div class="bottom-txt">
              <span v-if="item.recordType===4">将产品<span class="blue">{{item.goodsName}}</span><span class="red">{{item.info}}</span></span>
              <span v-else-if="item.recordType===5">
                <span class="red">{{item.info}}</span>了产品<span class="blue">{{item.goodsName}}</span>
              </span>
              <span v-else>
                <span class="blue">第{{item.browseTime}}次</span>{{item.info}}<span class="blue" v-show="item.goodsName||item.title">{{item.goodsName?item.goodsName:item.title}}</span>
              </span>
              <span>，赶快主动沟通吧</span>
            </div>
            <p class="right-top">TA的详情></p>
            <div class="icon-wrap" @click.stop="routeTo(`../../msgcenter/main?id=${item.userId}`)">
              <i class="iconfont iconliaotian"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 行为 -->
      <div class="radar-behavior common-pad" v-if="active===1">
        <div class="flexRow behavior-top">
          <p><span :class="{'time-active':timeActive===0}" @click="timeTab(0)">汇总</span></p>
          <p><span :class="{'time-active':timeActive===1}" @click="timeTab(1)">昨日</span></p>
          <p><span :class="{'time-active':timeActive===2}" @click="timeTab(2)">近七天</span></p>
          <p><span :class="{'time-active':timeActive===3}" @click="timeTab(3)">近一个月</span></p>
        </div>
        <div class="flexRow nine-child">
          <div class="flex-one" v-for="(m,n) in behaviorArr" :key="n">
            <p class="count">{{m.count}}</p>
            <p>{{m.txt}}</p>
          </div>
        </div>
        <div class="bottom-list">
          <div v-for="(m,n) in behaviorArrTwo" class="list-child flexRow" :key="n">
            <div class="flexRow">
              <s v-if="m.txt==='浏览名片'" class="iconfont box-icon" :class="m.icon" :style="m.color"></s>
              <i v-else class="iconfont common-style" :class="m.icon" :style="m.color"></i>
              <span>{{m.txt}}</span>
            </div>
            <span>{{m.count}}</span>
          </div>
        </div>
      </div>
      <!-- 互动 -->
      <div class="radar-behavior radar-interaction common-pad" v-if="active===2">
        <div class="flexRow behavior-top">
          <p><span :class="{'time-active':timeActive===0}" @click="timeTab(0)">汇总</span></p>
          <p><span :class="{'time-active':timeActive===1}" @click="timeTab(1)">昨日</span></p>
          <p><span :class="{'time-active':timeActive===2}" @click="timeTab(2)">近七天</span></p>
          <p><span :class="{'time-active':timeActive===3}" @click="timeTab(3)">近一个月</span></p>
        </div>
        <div class="interaction-bottom">
          <div class="child-one" v-for="(m,n) in list" :key="n">
            <div class="child-top flexRow" @click="openList(m)">
              <div class="flexRow">
                <image :src="m.avatarUrl||'https://oss.wq1516.com/default-avatar.png'" class="img-url" mode="aspectFill"></image>
                <div>
                  <p class="color-p">
                    <span class="name">{{m.userName||'未知'}}</span>
                    <span>和你互动了<span class="blue">{{m.totalNum}}</span>次</span>
                  </p>
                  <p>{{m.dataTime}}最后一次{{m.info}}</p>
                </div>
              </div>
              <i class="iconfont iconxiajiantou" :class="{'open':m.visible}"></i>
            </div>
            <div class="box-double" v-show="m.visible">
              <div class="flexRow ma-top" v-for="(item,i) in m.OperationRecordDetail" :key="i">
                <span v-if="item.recordType===21">分享名片</span>
                <span v-else-if="item.recordType===22">收藏名片</span>
                <span v-else-if="item.recordType===23">浏览名片</span>
                <span v-else-if="item.recordType===3">浏览商品</span>
                <!--<span>{{item.recordType===23?'浏览名片':'点赞名片'}}</span>-->
                <span class="common-line praise-line" :class="{'praise-line':item.recordType===21,'sc-line':item.recordType===22,'watch-line':item.recordType===23,'look-line': item.recordType ===3}"></span>
                <span>{{item.browseTime}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footTabar">
        <section class="tabBar-wrap">
          <article class="tabBar-box">
            <ul class="tabBar-nav">
              <li class="item" v-for="(item, index) in navList"
                  @click="selectNavItem(index,item.pagePath)"
                  :key="index">
                <div>
                  <p class="item-images">
                    <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath">
                  </p>
                  <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
                    {{item.text}}
                  </p>
                </div>
              </li>
            </ul>
          </article>
        </section>
      </div>
      <div class="foundA" @click="goIndex()">
        <span>回到<br />首页</span>
      </div>
    </div>
  </div>
</template>
<script>
  import personApi from '@/api/person'
  export default {
    data () {
      return {
        list: [],
        navList: [
          {
            selectNavIndex: 0,
            pagePath: '/pages/pageA/radar/main',
            iconPath: '/static/images/radar.png',
            selectedIconPath: '/static/images/radar-se.png',
            text: '雷达'
          },
          {
            selectNavIndex: 1,
            pagePath: '/pages/message/main',
            iconPath: '/static/images/messgae.png',
            selectedIconPath: '/static/images/message-se.png',
            text: '消息'
          },
          {
            selectNavIndex: 2,
            pagePath: '/pages/pageA/custom/main',
            iconPath: '/static/images/personcard.png',
            selectedIconPath: '/static/images/personcard-se.png',
            text: '客户'
          },
          {
            selectNavIndex: 3,
            pagePath: '/pages/personal/main',
            iconPath: '/static/images/my.png',
            selectedIconPath: '/static/images/my-se.png',
            text: '我的'
          }
        ],
        pageNum: 1,
        lastPage: 100,
        nextPage: 1,
        pageSize: 10,
        self: false,
        active: 0,
        timeActive: 1,
        salesmanId: '',
        selectNavIndex: 0,
        behaviorArr: [],
        behaviorArrTwo: [],
        recordTypeList: [22, 23, 21, 24, 3]
      }
    },
    methods: {
      // 返回首页
      goIndex () {
        wx.switchTab({
          url: '/pages/businesscard/main'
        })
      },
      routeTo (url) {
        if (this.self) return
        wx.navigateTo({
          url
        })
      },
      //   查询记录足迹
      async searchOp () {
        wx.showLoading({
          mask: true
        })
        const userId = wx.getStorageSync('userId')
        const { data: { list, lastPage, pageNum, nextPage } } = await personApi.selectOperationByUserId({ userId, pageNum: this.pageNum, pageSize: this.pageSize })
        wx.hideLoading()
        let today = this.moment().format('YYYY/MM/DD')
        let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
        list.map(item => {
          item.nickName = (item.nickName ? item.nickName : '无')
          let temp = this.moment(item.browseDate)
          let tempData = this.moment(item.browseDate).format('YYYY/MM/DD')
          if (tempData === today) {
            item.browseDate = temp.format('A hh:mm')
          } else if (tempData === yesterday) {
            item.browseDate = '昨天 ' + temp.format('HH:mm')
          } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.browseDate) {
            item.browseDate = temp.format('dddd HH:mm')
          } else {
            item.browseDate = temp.format('YYYY/MM/DD HH:mm')
          }
          if (item.recordType === 1 || item.recordType === 2 || item.recordType === 3 || item.recordType === 11) {
            item.show = true
          } else {
            item.show = false
          }
        })
        this.commonWay(lastPage, pageNum, nextPage, list)
      },
      commonWay (lastPage, pageNum, nextPage, list) {
        this.lastPage = lastPage
        this.pageNum = pageNum
        this.nextPage = nextPage
        if (this.pageNum === 1) {
          this.list = list
        } else {
          list.forEach(e => {
            this.list.push(e)
          })
        }
      },
      // 查询雷达时间分类
      async radarTime () {
        wx.showLoading({
          mask: true
        })
        const { data: { list, lastPage, pageNum, nextPage } } = await personApi.OperationSearch({ salesmanId: this.salesmanId, pageNum: this.pageNum, pageSize: this.pageSize })
        wx.hideLoading()
        list.map(item => {
          item.dataTime = this.moment(item.browseDate).format('YYYY年MM月DD日')
          item.time = this.moment(item.browseDate).format('HH:mm')
        })
        this.commonWay(lastPage, pageNum, nextPage, list)
      },
      // 查询雷达行为分类
      async radarBehavior () {
        wx.showLoading({
          mask: true
        })
        const { data } = await personApi.BehaviorOpSearch({ salesmanId: this.salesmanId, timeType: this.timeActive })
        wx.hideLoading()
        let temp = []
        let tempTwo = []
        data.map(item => {
          if (item.recordType === 3) {
            temp.push({ txt: '产品浏览', count: item.count })
          }
          if (item.recordType === 11) {
            temp.push({ txt: '浏览动态', count: item.count })
          }
          if (item.recordType === 14) {
            temp.push({ txt: '保存手机', count: item.count })
          }
          if (item.recordType === 16) {
            temp.push({ txt: '播放语音', count: item.count })
          }
          if (item.recordType === 17) {
            temp.push({ txt: '复制邮箱', count: item.count })
          }
          if (item.recordType === 18) {
            temp.push({ txt: '复制微信', count: item.count })
          }
          if (item.recordType === 19) {
            tempTwo.unshift({ txt: '导航地址', count: item.count, icon: 'icondizhi1', color: 'color:#57A6FF' })
          }
          if (item.recordType === 20) {
            tempTwo.unshift({ txt: '拨打电话', count: item.count, icon: 'icondianhua7', color: 'color:#0DC423' })
          }
          if (item.recordType === 21) {
            tempTwo.push({ txt: '分享名片', count: item.count, icon: 'iconfenxiang2', color: 'color:#F9C70B' })
          }
          if (item.recordType === 1) {
            tempTwo.push({ txt: '浏览名片', count: item.count, icon: 'iconxingzhuang', color: 'background-color:#9D7FFC' })
          }
          if (item.recordType === 24) {
            tempTwo.push({ txt: '点赞名片', count: item.count, icon: 'iconshoucang3', color: 'color:#FF5858' })
          }
        })
        this.behaviorArr = temp
        this.behaviorArrTwo = tempTwo
      },
      // 查询雷达互动分类
      async radarInteraction () {
        wx.showLoading({
          mask: true
        })
        const { data: { list, lastPage, pageNum, nextPage } } = await personApi.InteractionOpSearch({ salesmanId: this.salesmanId, pageNum: this.pageNum, pageSize: this.pageSize, timeType: this.timeActive, recordTypeList: this.recordTypeList })
        wx.hideLoading()
        // console.log('嘎嘎', list)
        list.map(item => {
          item.visible = false
          item.dataTime = this.moment(item.browseDate).format('YYYY.MM.DD')
        })
        this.commonWay(lastPage, pageNum, nextPage, list)
      },
      navTab (i) {
        this.active = i
        this.timeActive = 0
        if (i === 0) {
          this.radarTime()
        } else if (i === 1) {
          this.radarBehavior()
        } else {
          this.radarInteraction()
        }
      },
      tarbar (i) {
        this.selectNavIndex = i
        // this.timeActive = 0
      },
      selectNavItem (index, pagePath) {
        console.log(index)
        this.selectNavIndex = index
        if (index === this.selectNavIndex) {
          this.bindViewTap(index, pagePath)
          return false
        }

        // if (index === 0 && this.selectNavIndex === -1) {
        //   this.$emit('fetch-index')
        // }
      },
      /**
       * tabBar路由跳转
       */
      bindViewTap (index, url) {
        // if (url === '../index/main') {
        //   store.commit('setGroupsID', '');
        // }
        if (index === 0) {
        } else if (index === 3) {
          wx.switchTab({
            url
          })
        } else if (index === 1) {
          wx.reLaunch({
            url
          })
        } else {
          wx.reLaunch({
            url
          })
        }
      },
      timeTab (i) {
        this.timeActive = i
        if (this.active === 1) {
          this.radarBehavior()
        } else if (this.active === 2) {
          this.radarInteraction()
        }
      },
      openList (item) {
        if (item.visible) {
          this.$set(item, 'visible', false)
        } else {
          this.$set(item, 'visible', true)
        }
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
      }
    },
    onLoad (options) {
      this.pageNum = 1
      this.salesmanId = wx.getStorageSync('salesmanId')
      console.log('this.salesmanId', this.salesmanId)
      if (options.self === '1') {
        this.self = true
        this.searchOp()
        //   足迹
      } else {
        this.self = false
        this.active = 0
        this.timeActive = 0
        this.radarTime()
      }
    },
    onShow () {
      this.getSalesmanId()
      this.selectNavIndex = 0
    },
    onReady () {
      let title = ''
      if (this.self) {
        title = '足迹'
      } else {
        title = '雷达'
      }
      wx.setNavigationBarTitle({
        title
      })
    },
    // 上拉加载
    async onReachBottom () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        if (this.self) {
          this.searchOp()
          //   足迹
        } else {
          if (this.active === 0) {
            this.radarTime()
          } else if (this.active === 2) {
            this.radarInteraction()
          }
        }
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 下拉刷新
    async onPullDownRefresh () {
      this.pageNum = 1
      if (this.self) {
        this.searchOp()
        this.getSearchOp()
        //   足迹
      } else {
        if (this.active === 0) {
          this.radarTime()
        } else if (this.active === 1) {
          this.radarBehavior()
        } else {
          this.radarInteraction()
        }
      }
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    }
  }
</script>
<style lang="less" scoped>
@import "./radar.less";
</style>
