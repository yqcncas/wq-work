<template>
  <div class="agency-page">
    <div class="top-wrap">
      <image class="bg" src="/static/images/bg-blue.png"></image>
      <!-- navbar -->
      <div class="absolute-wrap">
        <p class="nav-bar" :style="styleBar" @click="backTo">
          <i class="iconfont iconE"></i>
        </p>
        <!-- 佣金 信息-->
        <div class="flexRow sec-wrap">
          <image class="header-img" mode="aspectFill" :src="detailData.avatarUrl"></image>
          <div>
            <p class="headNmae">
              <span class="big-size">{{detailData.name?detailData.name:detailData.nickName}}</span>
              <span class="radius-border">{{detailData.levelName}}</span>
            </p>
            <p class="headUserName">
              <span class="margin-r">推荐人：{{detailData.recommendUserName}}</span>
              <!-- <span>邀请码：6598</span> -->
            </p>
          </div>
        </div>
        <!-- 佣金 金额 -->
        <div class="flexRow money-wrap">
          <div>
            <p>成功提现佣金（元）</p>
            <p class="money-num">{{detailData.getMoneyS}}</p>
          </div>
          <div>
            <p>可提现佣金（元）</p>
            <p class="flexRow">
              <span class="money-num">{{detailData.moneyS}}</span>
              <span class="btn-m" @click="routeTo(`../agCash/main?moneyS=${detailData.moneyS}&money=${detailData.money}`)">提现</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 功能 -->
    <div class="function">
      <div class="part-of-three" @click="routeTo(`../agCommission/main?detail=${JSON.stringify(detailData)}`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconjinqian"></i>
          <p>分销佣金</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agOrder/main?id=${detailData.id}&total=${detailData.totalS}`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont icondingdan1"></i>
          <p>分销订单</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agCashDetail/main`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconzuomingxi"></i>
          <p>提现明细</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agMyTeam/main?id=${detailData.id}`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont icontuandui"></i>
          <p>我的团队</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agExtend/main`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconerweima"></i>
          <p>推广代理</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../Pusher/main`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconkuaisushengji"></i>
          <p>分销升级</p>
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
      styleBar: '',
      detailData: {}
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
    info () {
      wx.getSystemInfo({
        success: (res) => {
          let totalTopHeight = 68
          if (res.model.indexOf('iPhone X') !== -1) {
            totalTopHeight = 88
          } else if (res.model.indexOf('iPhone') !== -1) {
            totalTopHeight = 64
          }
          let height = totalTopHeight - res.statusBarHeight
          this.styleBar = `margin-top:${res.statusBarHeight}px;height:${height}px;line-height:${height}px`
        }
      })
    },
    backTo () {
      wx.switchTab({
        url: '/pages/personal/main'
      })
    },
    routeTo (url) {
      wx.navigateTo({
        url
      })
    },
    async getInfo () {
      const { data } = await apiPerson.distributorOne()
      data.getMoneyS = this.fmoney(data.getMoney, 2)// 已提现的钱 成功提现佣金
      data.moneyS = this.fmoney(data.money, 2)// 可提现的钱
      data.totalS = this.fmoney(data.totalMoney, 2)// 累计佣金
      data.applyMoneyS = this.fmoney(data.applyMoney, 2)// 已申请佣金
      //   data.applyMoneyS = this.fmoney(data.applyMoney, 2)// 待打款佣金
      //   data.applyMoneyS = this.fmoney(data.applyMoney, 2)// 无效佣金
      data.waitMoneyS = this.fmoney(data.waitMoney, 2)// 待收货佣金
      data.uncheckMoneyS = this.fmoney(data.uncheckMoney, 2)// 未结算佣金
      this.detailData = data
    }
  },
  onLoad () {
    this.info()
  },
  onShow () {
    this.getInfo()
  }
}
</script>
<style lang='scss' scoped>
@import "style";
</style>
