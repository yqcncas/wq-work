<template>
  <div class="load-page">
    <div class="outer-load center-box"></div>
    <image class="inner-load center-box" src="/static/images/logo.png"></image>
  </div>
</template>

<script>
import homeApi from '@/api/home'
import personApi from '@/api/person'
import { setIsSalesMan, getExt } from '@/utils/index'
import { initSocket, resiverMessage } from '@/utils/socket'
export default {
  data () {
    return {
      id: '',
      personApi: personApi,
      goodsId: null,
      param: '',
      userId: null,
      fromWay: 0, // 搜索0 朋友圈1 海报2
      salesmanId: 0,
      newsId: null,
      isBuy: ''
    }
  },
  onLoad (options) {
    this.fromWay = 0
    this.getInfo()
    this.getBuy()
    this.goodsId = null
    if (options.fromWay) {
      this.fromWay = options.fromWay
    }
    if (options.newsId) {
      this.newsId = options.newsId
    }
    if (options.id) {
      this.salesmanId = options.id
      wx.setStorageSync('codeUserId', options.id)
    }
    if (options.goodsId) {
      this.goodsId = options.goodsId
    }
    if (options.prams) {
      this.param = options.prams
    }
    if (options.userId) {
      this.userId = options.userId
    }
    if (options.scene) {
      let scene = decodeURIComponent(options.scene).split('?')[1]
      this.userId = this.GetQueryString('userId', scene)
      this.fromWay = this.GetQueryString('way', scene)
      this.param = this.GetQueryString('param', scene)
      this.salesmanId = this.GetQueryString('id', scene)
      // console.log(' this.fromWay', this.fromWay)
      // console.log(' this.param', this.param)
      // console.log(' this.userId', this.userId)
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
          wx.setStorageSync('Card', false)
          // console.log('login', res)
        }
      })
    },
    // 获取logo
    getBuy () {
      const businessId = wx.getStorageSync('businessId') // 获取本地userId
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/business/findById',
        body: {
          'businessId': businessId
        }
      }).then(res => {
        this.isBuy = res.data.isBuy
        wx.setStorageSync('isBuy', this.isBuy)
        console.log('isBuy', this.isBuy)
      }).catch(err => {
        console.log(err)
      })
    },
    // 页面加载获取信息
    getInfo () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/platformSalesman/selectSelfInfo',
        body: {
          'userId': userId
        }
      }).then(res => {
        if (res.data !== null) {
          if (res.data.tradeId) {
            const tradeId = res.data.tradeId
            wx.setStorageSync('tradeId', tradeId)
          }
        }
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
    // // 插入雷达
    // async insertOpera (info, recordType) {
    //   await personApi.OperationInsert({ businessId: this.businessId, info, recordType, salesmanId: this.salesManId, userId: this.userId })
    // },
    onMessage (res) {
      this.eatinCart(res)
    }, // 查询salesmanId
    getSalesmanId () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get',
        url: '/platformSalesman/selectSelfInfo',
        body: {
          'userId': userId
        }
      }).then(res => {
        const salesmanId = res.data.id
        wx.setStorageSync('salesmanId', salesmanId)
      }).catch(err => {
        console.log(err)
      })
    },
    // 处理返回数据
    eatinCart (res) {
      console.log('login', res)
      wx.setStorageSync('vipId', res.data.vipId)
      const { data: { token, isSalesman, id, businessId } } = res
      this.wesocket({ cmd: 'login', userId: id })
      this.userId = wx.getStorageSync('userId', id)
      this.businessId = wx.getStorageSync('businessId', businessId)
      wx.setStorageSync('token', token)
      wx.setStorageSync('businessId', businessId)
      setIsSalesMan(isSalesman)
      wx.setStorageSync('userId', id)
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        if (!res.hasUpdate) {
          this.getSalesmanId()
          // this.insertOpera('用户登陆', 0)
          // wx.switchTab({
          //   url: '../businesscard/main?id=' + this.goodsId
          // })
          // if (this.goodsId) {
          //   wx.reLaunch({
          //     url: '../OthersCards/main?id=' + this.goodsId
          //   })
          // } else if (this.param === 'userMsg') {
          //   wx.reLaunch({
          //     url: '../OthersCards/main?param=' + this.param
          //   })
          // } else if (this.param === 'home') {
          //   wx.reLaunch({
          //     url: '../OthersCards/main?'
          //   })
          // } else if (this.param === 'news') {
          //   wx.reLaunch({
          //     url: '../OthersCards/main?newsId=' + this.newsId
          //   })
          // } else if (this.param === 'product') {
          //   wx.reLaunch({
          //     url: '../OthersCards/main'
          //   })
          // } else {
          if (this.param === 'product') {
            wx.reLaunch({
              url: '../logs/main?id=' + this.salesmanId + '&fromWay=1&userId=' + id + '&goodsId=' + this.goodsId
            })
          } else {
            if (this.fromWay === '0') {
              wx.switchTab({
                url: '../businesscard/main'
              })
            } else if (this.fromWay === '2') {
              wx.reLaunch({
                url: '../logs/main?id=' + this.salesmanId + '&fromWay=2&userId=' + id
              })
            } else if (this.fromWay === '1') {
              wx.reLaunch({
                url: '../logs/main?id=' + this.salesmanId + '&fromWay=1&userId=' + id
              })
            } else {
              wx.switchTab({
                url: '../businesscard/main'
              })
            }
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
<style lang='less' scoped>
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
  border: ~'10rpx' solid #2b93ec;
  opacity: 0.9;
  width: ~'200rpx';
  height: ~'200rpx';
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: spin-right 0.8s linear infinite normal;
  animation-delay: 0s;
  margin-left: ~'-110rpx';
  margin-top: ~'-200rpx';
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
  width: ~'100rpx';
  height: ~'100rpx';
  opacity: 0.9;
  margin-left: ~'-50rpx';
  margin-top: ~'-145rpx';
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


