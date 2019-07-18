<template>
  <div class="float-box">
    <div class="shop-cart common-bg" @click="routerTo('/pages/pageA/cart/main')" v-show="shopCar">
      <i class="iconfont iconshop-cart"></i>
      <span>购物车</span>
      <span class="red-point" v-if="allnumber>0">{{allnumber}}</span>
    </div>
    <form name="msg" report-submit='true' @submit='getFormID'>
      <button class="concat common-bg" form-type="submit" @click="routerTo(url,phone)" v-show="concat">
        <i class="iconfont iconpinglun"></i>
        <span>咨询</span>
        <span class="red-point" v-if="msgNum>0">{{msgNum}}</span>
      </button>
    </form>
    <div class="concat common-bg" @click="routerTo('getUrl')" v-show="home">
      <i class="iconfont icon-shouye"></i>
      <span>首页</span>
    </div>
  </div>
</template>
<script>
import { getIsSalesMan } from '@/utils/index'
import cartApi from '@/api/cart'
import personApi from '@/api/person'
import productApi from '@/api/product'
import { resiverMessage } from '@/utils/socket'
export default {
  data () {
    return {
      allnumber: 0,
      url: '',
      msgNum: 0,
      isSalesMan: null
    }
  },
  props: {
    shopCar: {
      type: Boolean,
      default: true
    },
    concat: {
      type: Boolean,
      default: true
    },
    home: {
      type: Boolean,
      default: true
    },
    phone: {
      type: String,
      default: ''
    },
    getUrl: {
      type: String,
      default: '../../home/index'
    }
  },
  methods: {
    async getFormID (e) {
      await productApi.getFormid(e.target.formId)
    },
    routerTo (url, flag) {
      if (flag === '') {
        this.$emit('visible', true)
        return
      }
      if (url === 'getUrl') {
        wx.reLaunch({
          url: this.getUrl
        })
      } else {
        wx.navigateTo({
          url
        })
      }
    },
    // 获取所有的购物车里的数量
    async getCartCount () {
      const result = await cartApi.getCartCount()
      this.allnumber = result.data.cartTotal.goodsCount
    },
    // 获取未读消息
    async getUnReadCount () {
      let salesManId = wx.getStorageSync('salesManId')
      const result = await personApi.selectUnReadCount({ salesManId, sendDir: (this.isSalesMan === 1 ? 0 : 1) })
      this.msgNum = result.data
    },
    onMessage (res) {
      this.getUnReadCount()
    }
  },
  onLoad () {
    this.isSalesMan = getIsSalesMan()
    this.getCartCount()
    this.getUnReadCount()
    if (this.isSalesMan === 1) {
      this.url = '/pages/message/main'
    } else {
      this.url = '/pages/msgcenter/main'
    }
    resiverMessage(this)
  },
  onShow () {
    this.getCartCount()
    this.getUnReadCount()
    resiverMessage(this)
  }

}
</script>

<style lang="scss">
.float-box {
  position: fixed;
  bottom: 200rpx;
  right: 40rpx;
  .common-bg {
    background-color: #fff;
    width: 110rpx;
    height: 110rpx;
    box-shadow: 2rpx 4rpx 8rpx 0px rgba(218, 218, 218, 0.5);
    border-radius: 50%;
    margin-top: 30rpx;
    color: #4a4a4a;
    font-size: 22rpx;
    text-align: center;
    box-sizing: border-box;
    padding-top: 20rpx;
    position: relative;
    line-height: 1.4;
    overflow: inherit;
    .iconfont {
      color: #057aff;
      font-size: 38rpx;
      line-height: 1;
    }
    .red-point {
      width: 38rpx;
      height: 38rpx;
      background-color: #ff424e;
      border-radius: 50%;
      color: #fff;
      font-size: 24rpx;
      text-align: center;
      line-height: 38rpx;
      display: inline-block;
      position: absolute;
      top: 4rpx;
      right: -4rpx;
    }
  }
}
</style>
