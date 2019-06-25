import Shop from '../../config/shop'
import { UPLOAD_API } from '@/api/uploadFile'
let url = Shop.WSS_URL
let loginData = {}
export function initSocket (websocketData) {
  loginData = websocketData
  const socketTask = wx.connectSocket({
    url,
    success: function (res) {
      console.log(res)
    },
    fail: function (fail) {
      console.log(fail)
    }
  })
  wx.onSocketOpen(function () {
    wx.sendSocketMessage({
      data: JSON.stringify(websocketData),
      success: res => {
        console.log(res)
        // 获取未读消息数量
      },
      fail: res => {
        console.log(res)
      }
    })
  })
  // 接收推送
  return socketTask
}
export function msgNum () {
  const token = wx.getStorageSync('token')
  const salesmanId = wx.getStorageSync('salesmanId')
  wx.request({
    method: 'get',
    url: UPLOAD_API + '/platformMessage/selectUnReadCount',
    data: {
      'salesmanId': salesmanId
    },
    header: {
      'token': token
    },
    success: function (res) {
      this.num = res.data
      wx.setStorageSync('msgNum', this.num)
      console.log('msgNum', this.num)
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}

export function resiverMessage (context) {
  wx.onSocketClose(res => {
    console.log('1登录')
    console.log(res)
    initSocket(loginData)
    msgNum()
  })
  wx.onSocketError(function (res) {
    console.log(res)
    wx.showToast({
      title: res.errMsg,
      icon: 'none',
      duration: 2000
    })
  })
  wx.onSocketMessage(function (data) {
    try {
      console.log('收到服务器内容：' + data.data)
      context.onMessage(JSON.parse(data.data)) // 这里定义一个onMessage方法，用于每个页面的回调
    } catch (e) {
      console.log(e)
    }
  })
}
export function resiverMsg (context, websocketData) {
  wx.sendSocketMessage({
    data: JSON.stringify(websocketData)
  })
  wx.onSocketClose(res => {
    console.log('消息')
    console.log(res)
    initSocket(loginData)
    msgNum()
  })
  wx.onSocketError(function (res) {
    console.log(res)
    wx.showToast({
      title: res.errMsg,
      icon: 'none',
      duration: 2000
    })
  })
  wx.onSocketMessage(function (data) {
    try {
      context.onMessage(JSON.parse(data.data)) // 这里定义一个onMessage方法，用于每个页面的回调
    } catch (e) {
      console.log(e)
    }
  })
}
