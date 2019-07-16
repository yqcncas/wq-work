<template>
  <div class="ag-order-page">
    <div class="top-order-wrap">
      <div class="top-total-wrap flexColumn">
        <p class="flexRow box-wrap">
          <i class="iconfont iconqianbao"></i>
          <span class="txt">累计佣金</span>
        </p>
        <p>{{totalMoney}}元</p>
      </div>
      <ul class="pay-list flexRow">
        <li :class="{'active':active===0}" @click="chooseWay(0)">所有</li>
        <li :class="{'active':active===1}" @click="chooseWay(1)">待付款</li>
        <li :class="{'active':active===2}" @click="chooseWay(2)">已付款</li>
        <li :class="{'active':active===6}" @click="chooseWay(6)">已完成</li>
      </ul>
    </div>
    <div class="bottom-list">
      <div class="list-one flexRow" v-for="(item,i) in list" :key="i">
        <div class="flexRow">
          <image class="header-img" :src="item.avatarUrl" mode="aspectFill"></image>
          <div class="listA">
            <p class="flexRow">
              <span class="name">{{item.userName}}</span>
              <span class="small-txt">{{item.outTradeNo}}</span>
              <span class="radius-blue" v-if="item.distributorLevel!==''">{{item.distributorLevel}}</span>
            </p>
            <p>{{item.dataTime}}</p>
          </div>
        </div>
        <div>
          <p class="weight-p">{{item.totalFee}}</p>
          <p>X{{item.num}}</p>
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
      active: 0,
      params: {
        distributorId: null,
        orderStatus: 0,
        pageNum: 1,
        pageSize: 10
      },
      lastPage: 100,
      nextPage: 1,
      list: [{
        avatarUrl: 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png?x-oss-process=style/c400',
        userName: '陈世伟',
        outTradeNo: 'CPB10295265623341',
        distributorLevel: '一级',
        dataTime: '2019-07-15 13:00',
        totalFee: 8000,
        num: 1
      }],
      totalMoney: 0.00
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
    async getList () {
      this.params.orderStatus = this.active
      const { data: { list, lastPage, nextPage, pageNum } } = await apiPerson.distributorOrder(this.params)
      this.lastPage = lastPage
      this.params.pageNum = pageNum
      this.nextPage = nextPage
      list.map(item => {
        item.dataTime = this.moment(item.buyDate).format('YYYY-MM-DD HH:mm')
        item.totalFee = this.fmoney(item.totalFee, 2)
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
    this.params.distributorId = options.id
    this.totalMoney = options.total
    this.active = 0
    this.params.pageNum = 1
    this.getList()
  }
}
</script>
<style lang='scss' scoped>
@import "style";
</style>
