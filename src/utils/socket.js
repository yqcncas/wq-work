import Shop from '../../config/shop'
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
      },
      fail: res => {
        console.log(res)
      }
    })
  })
  // 接收推送
  return socketTask
}

export function resiverMessage (context) {
  wx.onSocketClose(res => {
    console.log('1登录')
    console.log(res)
    initSocket(loginData)
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
