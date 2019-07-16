<template>
  <div class="ag-cash-page">
    <div class="all-wrap">
      <p class="p-detail" @click="routeTo(`../agCashDetail/main`)">提现明细</p>
      <div class="wrap-cash">
        <p class="top-num">
          <span class="bold">账户余额</span>
          <span class="num-style">{{moneyS}}</span>
          <span>元</span>
        </p>
        <p class="bold">提现金额</p>
        <div class="input-wrap flexRow">
          <span class="sign">￥</span>
          <input class="input-money" :placeholder="'可提现到微信钱包'+moneyS+'元'" placeholder-class="pla-cla" v-model="outMoney" />
          <span class="all" @click="getAll">全部</span>
        </div>
        <button class="cash-btn bold" @click="getCount">提现</button>
      </div>
    </div>
    <!-- 模态框 -->
    <div class="modal" catchtouchmove="true" v-if="modalFlag">
      <div class="cash-dialog">
        <p class="bold title-dialog">提示</p>
        <p class="flexRow row-wrap">
          <i class="iconfont iconxianshi_xuanzetianchong"></i>
          <span class="tip-txt">恭喜，提现成功！</span>
        </p>
        <p class="money-wrap-s">
          <span>余额：</span>
          <span>￥{{reMoney}}元</span>
        </p>
        <button class="sure-btn" @click="sureClose">确定</button>
        <p class="line"></p>
        <p class="bottom-txt">
          <span class="red">注：</span>
          <span>您的金额已成功提现到微信钱包内，请注意查看。</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import apiPerson from '@/api/person'
export default {
  data () {
    return {
      money: 0,
      moneyS: '',
      outMoney: '',
      modalFlag: false,
      reMoney: 0
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
    routeTo (url) {
      wx.navigateTo({
        url
      })
    },
    getAll () {
      this.outMoney = this.money
    },
    async getCount () {
      if (this.outMoney === '' || +this.outMoney === 0) {
        wx.showToast({
          title: '请输入大于0的提现金额',
          icon: 'none',
          duration: 2000
        })
      } else if (+this.outMoney > +this.money) {
        wx.showToast({
          title: '输入的提现金额超出最大可提现额度',
          icon: 'none',
          duration: 2000
        })
      } else {
        const { data, message } = await apiPerson.applyForMoney(+this.outMoney)
        if (data === '') {
          wx.showToast({
            title: message,
            icon: 'none',
            duration: 2000
          })
        } else {
          this.modalFlag = true
          this.reMoney = this.fmoney(data.residueMoney, 2)
        }
      }
    },
    sureClose () {
      this.modalFlag = false
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad (options) {
    this.outMoney = ''
    this.money = options.money
    this.moneyS = options.moneyS
  }
}
</script>
<style lang='scss'>
@import "style";
</style>
