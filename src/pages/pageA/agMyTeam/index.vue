<template>
  <div class="ag-team-page">
    <div class="wrap-check">
      <ul class="nav-check">
        <li :class="{active:active===1}" @click="chooseWay(1)">一级（{{levelOneNum}}）</li>
        <li :class="{active:active===2}" @click="chooseWay(2)">二级（{{levelTwoNum}}）</li>
      </ul>
    </div>
    <div class="list-wrap">
      <div class="list-one flexRow" v-for="(m,n) in list" :key="n">
        <div class="flexRow left-wrap">
          <image class="header-img" mode="aspectFill" :src="m.avatarUrl"></image>
          <div style="display: inline-block">
            <p class="flexRow">
              <span class="bold name">{{m.name?m.name:m.nickName}}</span>
              <!--<span class="level">等级</span>-->
            </p>
            <p v-if="m.isDistributor===1&&m.updateTime">加入时间 {{m.dataTime}}</p>
          </div>
        </div>
        <div class="right-wrap" v-if="m.isDistributor===1">
          <p class="bold">累计佣金{{m.totalMoney}}</p>
          <p>{{m.levelOneNum}}个成员</p>
        </div>
        <div class="right-wrap" v-else>
          <p class="bold">消费{{m.info.totalFee}}元</p>
          <p>{{m.info.num}}个订单</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apiPerson from '@/api/person'
export default {
  data () {
    return {
      active: 1,
      params: {
        id: null,
        level: 1,
        pageNum: 1,
        pageSize: 10
      },
      lastPage: 100,
      nextPage: 1,
      list: [{
        avatarUrl: 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png?x-oss-process=style/c400',
        name: '陈世伟',
        isDistributor: 1,
        updateTime: '2019-06-28 13:00',
        dataTime: '2019-06-28 13:00',
        totalMoney: 8000,
        levelOneNum: 5
      }],
      levelOneNum: null,
      levelTwoNum: null
    }
  },
  methods: {
    fmoney (s, n) {
      n = n > 0 && n <= 20 ? n : 2
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
      var l = s.split('.')[0].split('').reverse()
      var r = s.split('.')[1]
      let t = ''
      for (let i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
      }
      return t.split('').reverse().join('') + '.' + r
    },
    chooseWay (i) {
      this.active = i
      this.params.pageNum = 1
      this.getList()
    },
    async getCount () {
      const { data: { levelOneNum, levelTwoNum } } = await apiPerson.distributorTeamCount(this.params.id)
      this.levelOneNum = levelOneNum
      this.levelTwoNum = levelTwoNum
    },
    async getList () {
      this.params.level = this.active
      const { data: { list, lastPage, nextPage, pageNum } } = await apiPerson.distributorTeam(this.params)
      this.lastPage = lastPage
      this.params.pageNum = pageNum
      this.nextPage = nextPage
      list.map(item => {
        item.dataTime = this.moment(item.updateTime).format('YYYY-MM-DD HH:mm')
        if (item.isDistributor === 1) {
          item.totalMoney = this.fmoney(item.totalMoney, 2)
        } else {
          item.info.totalFee = this.fmoney(item.info.totalFee ? item.info.totalFee : 0, 2)
        }
      })
      if (this.params.pageNum <= 1) {
        this.list = list
      } else {
        list.forEach(e => {
          this.list.push(e)
        })
      }
    }
  },
  async onPullDownRefresh () {
    this.params.pageNum = 1
    this.getList()
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },
  // 上拉加载
  async onReachBottom () {
    if (this.params.pageNum < this.lastPage) {
      this.params.pageNum = this.nextPage
      this.getList()
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  onLoad (options) {
    this.params.id = options.id
    this.getList()
    this.getCount()
  }
}
</script>
<style lang='scss'>
@import "style";
</style>
