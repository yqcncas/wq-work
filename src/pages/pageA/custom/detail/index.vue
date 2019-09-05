<template>
  <div class="flexColumn big-custom-box">
    <div class="custom-top shadow">
      <!-- 头部 -->
      <div class="top-one flexRow">
        <image mode="aspectFill"  :src="params.avatar_url||'https://oss.wq1516.com/default-avatar.png'" class="avatar-img"></image>
        <div class="flexColumn top-center">
          <p class="name">
            <span>{{params.name || params.nickName}}</span>
          </p>
          <p @click="routerTo(`../chooseTag/main?id=${params.user_id}&&list=${JSON.stringify(params.remarksTagList)}`)">
            <!--<span class="tag" v-for="(item,i) in params.remarksTagList" :key="index">{{item.tag}}</span>-->
            <!--<span class="tag add-tag" v-if="flag">添加标签</span>-->
          </p>
        </div>
        <div class="top-right">
          <!--<p class="edit" @click="routerTo(`../edit/main?id=${params.user_id}`)">编辑</p>-->
          <i class="iconweixinsliaotian iconfont" @click="routerTo(`../../../msgcenter/main?id=${params.user_id}`)"></i>
        </div>
      </div>
      <!-- 中间 -->
      <div class="top-two flexRow">
        <p @click="makePhoneCall">
          <i class="iconfont icondianhua4"></i>
          <span>{{params.phone||'未完善'}}</span>
        </p>
        <p @click="textPaste">
          <i class="iconfont iconweixin3"></i>
          <span>{{params.we_chat||'未完善'}}</span>
        </p>
      </div>
      <!-- top-bottom -->
      <div class="top-bottom flexRow">
        <div class="develop-color">
          <p>预计成交率</p>
          <p class="dark-txt">开发中</p>
        </div>
        <div>
          <p>推荐人</p>
          <p class="dark-txt">{{params.recommendUserName||'无'}}</p>
        </div>
        <div>
          <p>来源方式</p>
          <p class="dark-txt">{{params.fromWay||params.fromWay===0?arr[params.fromWay]:'未完善'}}</p>
        </div>
      </div>
    </div>
    <!-- custom-bottom -->
    <scroll-view class="custom-bottom shadow" :style="'height:'+scrollHeight+'rpx'" scroll-y @scrolltolower="lower"
      lower-threshold="100">
      <div class="nav-tab flexRow">
        <p class="tab" :class="{active:index===0}" @click="tabData(0)"><span>互动</span></p>
        <p class="tab" :class="{active:index===1}" @click="tabData(1)"><span>资料</span></p>
        <p class="tab" :class="{active:index===2}" @click="tabData(2)"><span>AI分析</span></p>
      </div>
      <div class="wrap-radar" v-if="index===0">
        <div v-for="(item,index) in radarList" :key="index" class="single-radar flexColumn">
          <span class="small-radius"></span>
          <div class="absolute-right">
            <p class="data-time">{{item.browseDate}}</p>
            <p class="data-content">第{{item.browseTime}}次，{{item.info}}</p>
          </div>
        </div>
      </div>
      <div class="personal" v-else-if="index===1">
        <div class="flexRow com-div">
          <p>昵称</p>
          <p class="detail">{{params.nickName||'未完善'}}</p>
        </div>
        <div class="flexRow com-div">
          <p>公司</p>
          <p class="detail">{{params.company||'未完善'}}</p>
        </div>
        <div class="flexRow com-div">
          <p>职位</p>
          <p class="detail">{{params.job||'未完善'}}</p>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import apicustom from '@/api/person'
export default {
  data () {
    return {
      params: {},
      id: null,
      arr: ['搜索', '朋友', '海报'],
      index: 0,
      pageNum: 1,
      lastPage: 100,
      nextPage: 1,
      pageSize: 10,
      radarList: [],
      flag: false,
      scrollHeight: null
    }
  },
  methods: {
    // 插入雷达
    async insertOpera (info, recordType) {
      let businessId = wx.getStorageSync('businessId')
      let salesmanId = wx.getStorageSync('salesManId')
      let userId = wx.getStorageSync('userId')
      await apicustom.OperationInsert({ businessId, info, recordType, salesmanId, userId })
    },
    // 呼叫电话
    makePhoneCall () {
      if (!this.params.phone) {
        return
      }
      wx.makePhoneCall({
        phoneNumber: this.params.phone,
        success: () => {
          this.insertOpera('拨打了电话', 20)
        }
      })
    },
    // 电话内容复制
    textPaste () {
      if (!this.params.we_chat) {
        return
      }
      wx.setClipboardData({
        data: this.params.we_chat,
        success: (res) => {
          wx.showToast({
            title: '微信号复制成功',
            icon: 'none',
            duration: 2000
          })
          this.insertOpera('复制了微信', 18)
        }
      })
    },
    lower () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.selectOperationByUserId()
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    },
    tabData (i) {
      this.index = i
    },
    // 查找单个客户备注
    async selectOneUserRemarks () {
      const { code, data, message } = await apicustom.selectOneUserRemarks({ userId: this.params.id })
      if (code === 200) {
        this.params = data
        console.log('params', this.params)
        this.params.id = data.user_id
        if (this.params.remarksTagList.length < 3) {
          this.flag = true
        } else {
          this.flag = false
        }
      } else {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    routerTo (url) {
      wx.navigateTo({
        url
      })
    },
    // 查找单个客户的雷达
    async selectOperationByUserId () {
      const { data: { list, lastPage, pageNum, nextPage } } = await apicustom.selectOperationByUserId({ userId: this.params.id, pageNum: this.pageNum, pageSize: this.pageSize })
      // this.radarList = list
      let today = this.moment().format('YYYY-MM-DD')
      let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY-MM-DD')
      this.lastPage = lastPage
      this.pageNum = pageNum
      this.nextPage = nextPage
      list.map(item => {
        item.nickName = (item.nickName ? item.nickName : '未知')
        item.avatarUrl = (item.avatarUrl ? item.avatarUrl : 'https://oss.wq1516.com/default-avatar.png')
        let temp = this.moment(item.browseDate)
        let tempData = this.moment(item.browseDate).format('YYYY-MM-DD')
        if (tempData === today) {
          item.browseDate = temp.format('A hh:mm')
        } else if (tempData === yesterday) {
          item.browseDate = '昨天 ' + temp.format('HH:mm')
        } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.browseDate) {
          item.browseDate = temp.format('dddd HH:mm')
        } else {
          item.browseDate = temp.format('YYYY-MM-DD HH:mm')
        }
      })
      if (this.pageNum === 1) {
        this.radarList = list
      } else {
        list.forEach(e => {
          this.radarList.push(e)
        })
      }
    }
  },
  onShow () {
    this.selectOneUserRemarks()
    this.selectOperationByUserId()
  },
  onLoad (options) {
    this.scrollHeight = wx.getSystemInfoSync().windowHeight * 2 - 394 - 26 - 26
    this.index = 0
    this.params.id = options.id
    // this.selectOperationByUserId()
    // this.selectMsgForSales()
  }
}
</script>
<style lang="less">
@import "style";
</style>
