import Fly from 'flyio'

const request = new Fly()

request.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()
  const token = wx.getStorageSync('token') // 获取本地token
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/json',
    'token': token
  }
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    if (response.data.code !== 200) {
      wx.showToast({
        title: response.data.message,
        icon: 'none'
      })
    } else {
      return promise.resolve(response.data)
    }
  },
  (err, promise) => {
    const data = err.response.data
    if (err.status !== 200) {
      wx.showToast({
        title: `Status Code:${err.status}`,
        icon: 'none'
      })
      if (err.status === 500) {
        if (data.code && data.code !== 401) {
          wx.showToast({
            title: `Status Code:${err.status},message:${data.code}${data.message}`,
            icon: 'none'
          })
        } else if (data.code === 401) {
          wx.setStorageSync('token', null)
          wx.redirectTo({
            url: '/pages/loading/index'
          })
        } else {
          wx.showToast({
            title: `Status Code:${err.status}`,
            icon: 'none'
          })
        }
      }
    }
    wx.hideNavigationBarLoading()
    return promise.resolve()
  }
)

export default request
