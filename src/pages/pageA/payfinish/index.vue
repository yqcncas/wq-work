<template>
  <div class="pay-finish">
    <div>
      <i class="iconfont icon-icon_order"></i>
      <p class="status">订单支付{{params.status==='success'?'成功':'失败'}}</p>
      <p class="money">￥{{params.price}}</p>
      <p class="des">{{params.status==='success'?'仓库正在为您备货中':'您的订单没有支付成功'}}</p>
      <div class="btn-box">
        <p class="common watch-order" @click="routerTo('../orderlist/main?typeId=0')">查看订单</p>
        <p class="common" @click="routerTo('/pages/businesscard/main',true)">返回首页</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },

  data () {
    return {
      params: {}
    }
  },
  methods: {
    routerTo (url, flag) {
      if (flag) {
        wx.reLaunch({ url })
      } else {
        wx.navigateTo({ url })
      }
    }
  },
  onLoad (options) {
    this.params = options
  }
}
</script>

<style lang='scss'>
@import "style";
</style>
