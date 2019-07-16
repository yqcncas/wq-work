<template>
  <div class="ag-order-page cash-page">
    <div class="top-w-wrap">
      <div class="top-total-wrap flexColumn">
        <p class="flexRow box-wrap">
          <i class="iconfont iconqiandai"></i>
          <span class="txt">预计佣金</span>
        </p>
        <p>{{predictMoney}}元</p>
      </div>
      <ul class="pay-list flexRow">
        <li :class="{'active':active===0}" @click="chooseWay(0)">所有</li>
        <li :class="{'active':active===9}" @click="chooseWay(9)">待审核</li>
        <li :class="{'active':active===11}" @click="chooseWay(11)">待打款</li>
        <li :class="{'active':active===10}" @click="chooseWay(10)">已打款</li>
        <li :class="{'active':active===5}" @click="chooseWay(5)">无效</li>
      </ul>
      <ul class="table-header flexRow">
        <li class="same">日期</li>
        <li class="same">金额（元）</li>
        <li class="same">结余（元） </li>
      </ul>
    </div>
    <div class="table-wrap">
      <div class="time-list-wrap" v-for="(i,j) in list" :key="j">
        <p class="time-wrap" v-if="j===0">{{i.dataTime}}</p>
        <p class="time-wrap" v-if="j>0&&i.dataTime!==list[j-1].dataTime">{{i.dataTime}}</p>
        <div class="time-money flexRow">
          <span class="date same">{{i.day}}</span>
          <div class="flexRow same center-w">
            <i class="iconfont iconjinqian"></i>
            <div>
              <p class="bold"> - {{i.money}}</p>
              <p class="way">提现</p>
            </div>
          </div>
          <span class="bold same">{{i.residueMoney}}</span>
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
        orderStatusId: 0,
        pageNum: 1,
        pageSize: 10
      },
      lastPage: 100,
      nextPage: 1,
      list: [{
        dataTime: '2019-06-28 13:00',
        day: '24日',
        money: '8000',
        residueMoney: '0.00'
      }],
      predictMoney: 0
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
      this.params.orderStatusId = this.active
      const { data: { predictMoney, detail: { list, lastPage, nextPage, pageNum } } } = await apiPerson.cashDetail(this.params)
      this.lastPage = lastPage
      this.params.pageNum = pageNum
      this.nextPage = nextPage
      this.predictMoney = this.fmoney(predictMoney + '', 2)
      list.map(item => {
        item.dataTime = this.moment(item.updateTime).format('YYYY年MM月')
        item.day = this.moment(item.updateTime).format('DD日')
        item.money = this.fmoney(item.money, 2)
        item.residueMoney = this.fmoney(item.residueMoney ? item.residueMoney : 0, 2)
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
  onLoad () {
    this.active = 0
    this.params.pageNum = 1
    this.getList()
  }
}
</script>
<style lang='scss'>
@import "../agOrder/style";
@import "style";
</style>
