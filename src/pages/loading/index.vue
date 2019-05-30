<template>
  <div class="load-page">
    <div class="outer-load center-box"></div>
    <image class="inner-load center-box" src="/static/images/logo.png"></image>
  </div>
</template>

<script>
import homeApi from '@/api/home'
import { setIsSalesMan, getExt } from '@/utils/index'
import { initSocket, resiverMessage } from '@/utils/socket'
export default {
  data () {
    return {
      id: '',
      goodsId: null,
      param: '',
      userId: null,
      fromWay: 0, // 搜索0 朋友圈1 海报2
      salesmanId: 0,
      newsId: null
    }
  },
  onLoad (options) {
    this.goodsId = null
    if (options.fromWay) {
      this.fromWay = options.fromWay
    }
    if (options.newsId) {
      this.newsId = options.newsId
    }
    if (options.id) {
      wx.setStorageSync('codeUserId', options.id)
    }
    if (options.goodsId) {
      this.goodsId = options.goodsId
    }
    if (options.param) {
      this.param = options.param
    }
    if (options.userId) {
      this.userId = options.userId
    }
    if (options.scene) {
      let scene = decodeURIComponent(options.scene).split('?')[1]
      this.userId = this.GetQueryString('userId', scene)
      this.fromWay = this.GetQueryString('fromWay', scene)
      this.param = this.GetQueryString('param', scene)
      this.salesmanId = +this.GetQueryString('salesmanId', scene)
      if (this.salesmanId) {
        this.doLogin(this.salesmanId, this.param)
      } else {
        this.doLogin()
      }
    } else {
      this.doLogin()
    }
  },
  methods: {
    // 调用登录接口
    doLogin (salesmanId, param) {
      console.log('fromWay:' + this.fromWay)
      wx.login({
        success: async (res) => {
          let shopId = getExt().shopId
          let data = { code: res.code, id: shopId, userId: this.userId, fromWay: this.fromWay, salesmanId, param }
          const result = await homeApi.doLogin(data)
          this.eatinCart(result)
        }
      })
    },
    onMessage (res) {
      this.eatinCart(res)
    },
    // 处理返回数据
    eatinCart (res) {
      const { data: { token, isSalesman, id, businessId } } = res
      this.wesocket({ cmd: 'login', userId: id })
      wx.setStorageSync('token', token)
      wx.setStorageSync('businessId', businessId)
      setIsSalesMan(isSalesman)
      wx.setStorageSync('userId', id)
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        if (!res.hasUpdate) {
          if (this.goodsId) {
            wx.reLaunch({
              url: '../home/index?id=' + this.goodsId
            })
          } else if (this.param === 'userMsg') {
            wx.reLaunch({
              url: '../home/index?param=' + this.param
            })
          } else if (this.param === 'home') {
            wx.reLaunch({
              url: '../home/index'
            })
          } else if (this.param === 'news') {
            wx.reLaunch({
              url: '../news/index?newsId=' + this.newsId
            })
          } else if (this.param === 'product') {
            wx.reLaunch({
              url: '../product/index'
            })
          } else {
            wx.switchTab({
              url: `/pages/qrcode/index`
            })
          }
        }
      })
    },
    wesocket (data) {
      initSocket(data)
      resiverMessage(this)
    },
    // 获取url参数
    GetQueryString (name, url) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = url.match(reg) // 获取url中"?"符后的字符串并正则匹配
      var context = ''
      if (r != null) context = r[2]
      reg = null
      r = null

      return context == null || context === '' || context === 'undefined'
        ? ''
        : context
    }
  }
}
</script>
<style lang='scss' scoped>
.load-page {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
}
.center-box {
  position: absolute;
  top: 50%;
  left: 50%;
}
.outer-load {
  border: 10rpx solid #2b93ec;
  opacity: 0.9;
  width: 200rpx;
  height: 200rpx;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin-right 0.8s linear infinite normal;
  animation-delay: 0s;
  margin-left: -110rpx;
  margin-top: -200rpx;
}
@keyframes spin-right {
  0% {
    transform: rotate(0deg);
    opacity: 0.2;
  }

  50% {
    transform: rotate(180deg);
    opacity: 1;
  }

  100% {
    transform: rotate(360deg);
    opacity: 0.2;
  }
}
.inner-load {
  display: block;
  width: 100rpx;
  height: 100rpx;
  opacity: 0.9;
  margin-left: -50rpx;
  margin-top: -145rpx;
}
@keyframes spin-left {
  0% {
    transform: rotate(0deg);
    opacity: 0.2;
  }

  50% {
    transform: rotate(-180deg);
    opacity: 1;
  }

  100% {
    transform: rotate(-360deg);
    opacity: 0.2;
  }
}
</style>


