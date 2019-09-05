
// 定义请求地址
const host = 'http://api.wq1516.com:8989/'

function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中'
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url,
      method: method,
      data: data,
      headers: {
        'content-type': 'application/json' // 默认转为json格式
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      fail: function (error) {
        wx.hideLoading()
        reject(error)
      },
      complete: function (res) {
        wx.hideLoading()
        reject(res)
      }
    })
  })
}

function get (obj) {
  return request(obj.url, 'GET', obj.data)
}

function post (obj) {
  return request(obj.url, 'POST', obj.data)
}

export default {
  request,
  get,
  post
}
