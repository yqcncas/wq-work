<template>
  <div class="Commission-page">
    <div class="top-money flexRow padding-side">
      <div>
        <p class="blue">累计佣金</p>
        <p class="money">{{detail.totalS}}元</p>
      </div>
      <div class="btn-detail" @click="routeTo(`../agCashDetail/main`)">提现明细</div>
    </div>
    <div class="more-wrap mar-b flexRow padding-side">
      <p class="flexRow">
        <i class="iconfont iconqiandai1"></i>
        <span class="bold-txt">可提现佣金</span>
      </p>
      <span class="red">{{detail.moneyS}}元</span>
    </div>
    <!-- 已申请佣金 -->
    <div class="more-wrap flexRow padding-side">
      <p class="flexRow">
        <i class="iconfont icontime"></i>
        <span>已申请佣金</span>
      </p>
      <span class="bold-txt">{{detail.applyMoneyS}}元</span>
    </div>
    <!-- <div class="more-wrap flexRow padding-side">
      <p class="flexRow">
        <i class="iconfont icon-dengdai"></i>
        <span>待打款佣金</span>
      </p>
      <span class="bold-txt">0.00元</span>
    </div>
    <div class="more-wrap flexRow padding-side">
      <p class="flexRow">
        <i class="iconfont icon-wuxiaodingdan"></i>
        <span>无效佣金</span>
      </p>
      <span class="bold-txt">0.00元</span>
    </div> -->
    <div class="more-wrap mar-b flexRow padding-side">
      <p class="flexRow">
        <i class="iconfont iconchenggong"></i>
        <span>成功提现佣金</span>
      </p>
      <span class="bold-txt">{{detail.getMoneyS}}元</span>
    </div>
    <!-- 待收货佣金 -->
    <div class="more-wrap flexRow padding-side">
      <p class="flexRow">
        <i class="iconfont icondaishouhuo2"></i>
        <span>待收货佣金</span>
      </p>
      <span class="bold-txt">{{detail.waitMoneyS}}元</span>
    </div>
    <div class="more-wrap flexRow padding-side">
      <p class="flexRow">
        <i class="iconfont iconsuoding"></i>
        <span>未结算佣金</span>
      </p>
      <span class="bold-txt">{{detail.uncheckMoneyS}}元</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      detail: {}
    }
  },
  methods: {
    routeTo (url) {
      wx.navigateTo({
        url
      })
    }
  },
  onLoad (options) {
    console.log(JSON.parse(options.detail))
    this.detail = JSON.parse(options.detail)
  }
}
</script>
<style lang='scss' scoped>
@import "style";
</style>
