<template>
  <div class="main-wrap-cus">
    <ul>
      <li class="line-item" v-for="(item,i) in persons" :key="i" @click="routeTo(item.userId)">
        <div class="left-box">
          <img :src="item.avatarUrl" class="header-img">
          <span class="no-point" v-if="item.countAndStatus">{{item.countAndStatus.num}}</span>
        </div>
        <div class="right-box">
          <p class="top-name-time">
            <span class="name">{{item.nickName}}</span>
            <span>{{item.sendTime }}</span>
          </p>
          <p class="content">{{item.message}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import person from '@/api/person'
import { resiverMessage } from '@/utils/socket'
export default {
  data () {
    return {
      persons: [],
      pageNum: 1,
      lastPage: 100,
      nextPage: 1,
      pageSize: 10
    }
  },
  methods: {
    // 得到客户的列表
    async getCustom () {
      const { code, data: { list, lastPage, pageNum, nextPage } } = await person.selectCountList({ pageNum: this.pageNum, pageSize: this.pageSize })
      let today = this.moment().format('YYYY/MM/DD')
      let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
      if (code === 200) {
        list.map(item => {
          let temp = this.moment(item.sendTime)
          let tempData = this.moment(item.sendTime).format('YYYY/MM/DD')
          if (tempData === today) {
            item.sendTime = temp.format('A hh:mm')
          } else if (tempData === yesterday) {
            item.sendTime = '昨天'
          } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.sendTime) {
            item.sendTime = temp.format('dddd')
          } else {
            item.sendTime = tempData
          }
        })
        this.persons = list
        this.lastPage = lastPage
        this.pageNum = pageNum
        this.nextPage = nextPage
      } else {
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
      }
    },
    routeTo (id) {
      wx.navigateTo({
        url: '../msgcenter/index?id=' + id
      })
    },
    onMessage (res) {
      this.getCustom()
    }
  },
  async onPullDownRefresh () {
    // to doing..
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },
  onShow () {
    this.getCustom()
    resiverMessage(this)
  },
  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>
<style lang="scss" scoped="scoped">
%flexRow {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
.main-wrap-cus,
.main-wrap-cus ul {
  width: 100%;
  min-height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.main-wrap-cus {
  background: #f0eff5;

  .line-item {
    width: 100%;
    height: 144rpx;
    background-color: #ededed;
    padding-left: 32rpx;
    box-sizing: border-box;
    @extend %flexRow;
    .left-box {
      position: relative;
    }
    .header-img {
      width: 98rpx;
      height: 98rpx;
      border-radius: 8rpx;
      border: 1rpx solid #ddd;
      margin-right: 32rpx;
    }
    .no-point {
      width: 38rpx;
      height: 38rpx;
      background-color: #ff424e;
      border-radius: 50%;
      display: inline-block;
      position: absolute;
      right: 18rpx;
      top: -10rpx;
      color: #fff;
      font-size: 24rpx;
      text-align: center;
    }
    .right-box {
      flex: 1;
      height: 100%;
      font-size: 26rpx;
      color: #9f9f9f;
      box-sizing: border-box;
      padding: 23rpx 32rpx 0 0;
      border-bottom: 2rpx solid #ddd;
    }
    .top-name-time {
      @extend %flexRow;
      padding-bottom: 8rpx;
    }

    .content,
    .name {
      width: 550rpx;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .name {
      font-size: 34rpx;
      color: #000;
      width: 308rpx;
    }
  }
}
</style>
