// import Fly from 'flyio'
//
// const request = new Fly()
//
// request.interceptors.request.use((request) => {
//   wx.showNavigationBarLoading()
//   const token = wx.getStorageSync('token') // 获取本地token
//   request.headers = {
//     'X-Tag': 'flyio',
//     'content-type': 'application/json',
//     'token': token
//   }
//   return request
// })
//
// request.interceptors.response.use(
//   (response, promise) => {
//     wx.hideNavigationBarLoading()
//     if (response.data.code !== 200) {
//       wx.showToast({
//         title: response.data.message,
//         icon: 'none'
//       })
//     } else {
//       return promise.resolve(response.data)
//     }
//   },
//   (err, promise) => {
//     const data = err.response.data
//     if (err.status !== 200) {
//       wx.showToast({
//         title: `Status Code:${err.status}`,
//         icon: 'none'
//       })
//       if (err.status === 500) {
//         if (data.code && data.code !== 401) {
//           wx.showToast({
//             title: `Status Code:${err.status},message:${data.code}${data.message}`,
//             icon: 'none'
//           })
//         } else if (data.code === 401) {
//           wx.setStorageSync('token', null)
//           wx.redirectTo({
//             url: '/pages/loading/index'
//           })
//         } else {
//           wx.showToast({
//             title: `Status Code:${err.status}`,
//             icon: 'none'
//           })
//         }
//       }
//     }
//     wx.hideNavigationBarLoading()
//     return promise.resolve()
//   }
// )
//
// export default request
import Shop from '../../config/shop'
import Fly from 'flyio/dist/npm/wx'
const fly = new Fly()
const host = Shop.BASE_URL
// 添加请求拦截器
fly.interceptors.request.use((request) => {
  const token = wx.getStorageSync('token') // 获取本地token
  // console.log(request)
  // request.headers["X-Tag"] = "flyio";
  // request.headers['content-type']= 'application/json';
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/json',
    'token': token
  }

  let authParams = {
    // 公共参数
    'categoryType': 'SaleGoodsType@sim',
    'streamNo': 'wxapp153570682909641893',
    'reqSource': 'MALL_H5',
    'appid': 'string',
    'timestamp': new Date().getTime(),
    'sign': 'string'
  }

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    };
  })
  request.body = {
    ...request.body,
    ...authParams
  }
  return request
})

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    return response.data // 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    console.log(err)
    wx.hideLoading()
    if (err) {
      return '请求失败'
    };
  }
)

fly.config.baseURL = host

export default fly
