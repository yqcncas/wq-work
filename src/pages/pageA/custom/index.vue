<template>
  <div class="custom-index-page">
    <div class="top-search">
      <Searchbar :value="searchContent" :isFocus="isFocus" @cancel="cancel" @confirm="confirm" confirmType="search"></Searchbar>
      <div class="flexRow tab-wrap">
        <p class="tab" :class="{'active':index===0}" @click="tab(0)">所有客户</p>
        <p class="tab" :class="{'active':index===1}" @click="tab(1)">客户标签</p>
      </div>
    </div>
    <div class="list-wrap">
      <div v-for="(item,i) in persons" :key="i" class="item-per flexRow">
        <image mode="aspectFill" class="img-header" :src="item.avatarUrl" @click="routerTo(`./detail/mian?id=${item.userId}`)"></image>
        <div class="right-per" @click="routerTo(`/pages/msgcenter/main?id=${item.userId}`)">
          <div class="space">
            <p class="main">
              <span class="inline-block name over-hidden">{{item.remarks}}</span>
              <i class="iconfont icondianhua5 inline-block" :class="{'icon-blue':item.phone}"></i>
            </p>
            <p class="right-tag over-hidden">
              <span v-for="(child,index) in item.tagList" :key="index" class="tag-style">{{child.tag}}</span>
            </p>
          </div>
          <div class="msg-wrap flexRow">
            <span class="msg over-hidden">{{item.message}}</span>
            <span>{{item.sendTime}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 标签 -->
    <div class="tag-list-wrap" v-show="flag">
      <div class="tag-list">
        <span v-for="(item,index) in tagList" :key="index" class="tag" @click="chooseTag(item)" :class="item.class">{{item.tag}}</span>
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
</template>
<script>
import apicustom from '@/api/person'
import Searchbar from '@/components/searchBar'
export default {
  data () {
    return {
      pageNum: 1,
      lastPage: 100,
      nextPage: 1,
      pageSize: 10,
      searchContent: '',
      isFocus: false,
      index: 0,
      persons: [],
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
        // {
        //   selectNavIndex: 2,
        //   pagePath: '/pages/pageA/custom/main',
        //   iconPath: '/static/images/personcard.png',
        //   selectedIconPath: '/static/images/personcard-se.png',
        //   text: '客户'
        // },
        {
          selectNavIndex: 3,
          pagePath: '/pages/personal/main',
          iconPath: '/static/images/my.png',
          selectedIconPath: '/static/images/my-se.png',
          text: '我的'
        }
      ],
      selectNavIndex: 2,
      id: '',
      tagList: [],
      tagType: null,
      flag: false
    }
  },
  components: {
    Searchbar
  },
  methods: {
    // 返回首页
    goIndex () {
      wx.switchTab({
        url: '/pages/businesscard/main'
      })
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
      // console.log('aaa')
      // if (url === '../index/main') {
      //   store.commit('setGroupsID', '');
      // }
      if (index === 2) {
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
    chooseTag (item) {
      if (!item.class || item.class === '') {
        this.tagList.map(child => {
          this.$set(child, 'class', '')
        })
        this.$set(item, 'class', 'tag-active')
        this.tagType = item.id
      } else {
        this.$set(item, 'class', '')
        this.tagType = null
      }
      this.flag = false
      this.getCustom()
    },
    routerTo (url) {
      wx.navigateTo({
        url
      })
    },
    cancel (val) {
      this.$nextTick(() => {
        this.isFocus = false
        this.searchContent = ''
        this.getCustom()
      })
    },
    confirm (e) {
      this.searchContent = e.mp.detail.value
      this.isFocus = true
      this.getCustom()
    },
    tab (i) {
      this.index = i
      this.pageNum = 1
      if (i === 1) {
        this.flag = true
      } else {
        this.flag = false
        this.tagType = null
        this.getCustom()
      }
    },
    // 查找所有标签
    async allTagGet () {
      let businessId = wx.getStorageSync('businessId')
      const { code, data, message } = await apicustom.allTagGet(businessId)
      if (code === 200) {
        this.tagList = data
      } else {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 得到客户的列表
    async getCustom () {
      let result = {}
      if (this.tagType === null && this.searchContent.length === 0) {
        result = await apicustom.getCustomList({ id: this.id, pageNum: this.pageNum, pageSize: this.pageSize })
      } else if (this.searchContent.length > 0) {
        result = await apicustom.selectByRemarks({ id: this.id, pageNum: this.pageNum, pageSize: this.pageSize, remarks: this.searchContent })
      } else {
        result = await apicustom.selectGroupByRemarksTag({ id: this.id, pageNum: this.pageNum, pageSize: this.pageSize, tagType: this.tagType })
      }
      const { data: { userInfoList } } = result
      let today = this.moment().format('YYYY/MM/DD')
      let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
      this.lastPage = userInfoList.lastPage
      this.pageNum = userInfoList.pageNum
      this.nextPage = userInfoList.nextPage
      userInfoList.list.map(item => {
        let temp = this.moment(item.sendTime)
        let tempData = this.moment(item.sendTime).format('YYYY/MM/DD')
        if (tempData === today) {
          item.sendTime = temp.format('A hh:mm')
        } else if (tempData === yesterday) {
          item.sendTime = '昨天 ' + temp.format('HH:mm')
        } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.sendTime) {
          item.sendTime = temp.format('dddd HH:mm')
        } else {
          item.sendTime = temp.format('YYYY/MM/DD HH:mm')
        }
      })
      if (userInfoList.list.length === 0) {
        this.pageNum = 1
      }
      if (this.pageNum === 1) {
        this.persons = userInfoList.list
      } else {
        userInfoList.list.forEach(e => {
          this.persons.push(e)
        })
      }
    }
  },
  async onReachBottom () {
    if (this.pageNum < this.lastPage) {
      this.pageNum = this.nextPage
      this.getCustom()
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  async onPullDownRefresh () {
    this.pageNum = 1
    this.getCustom()
    wx.stopPullDownRefresh()
  },
  onLoad (options) {
    this.id = options.id
    this.index = 0
    this.tagType = null
    this.searchContent = ''
  },
  onShow () {
    this.getCustom()
    this.allTagGet()
    this.selectNavIndex = 2
  }
}
</script>
<style lang="scss" scoped>
@import "style";
</style>
<style lang="less" scoped>
  @import "less";
</style>
