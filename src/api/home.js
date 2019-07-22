import request from '../utils/request'
import Shop from '../../config/shop'
const baseUrlApi = Shop.BASE_URL

// const baseUrlApi = 'http://192.168.1.135:8989'
// const baseUrlDyn = 'https://dyn.ithome.com'
// const baseUrlQuan = 'https://apiquan.ithome.com'
// const baseUrlApi = 'http://192.168.1.135:8989'
const home = {
  // 获取轮播图片
  getBannerList: (id, type) => request.get('imageInfo/selectBanner', {
    businessId: id,
    'type': type
  }, {
    baseURL: baseUrlApi
  }),
  // 获取商铺联系方式
  getShopContact: (id) => request.get('business/selectSimpleInfo', {
    businessId: id
  }, {
    baseURL: baseUrlApi
  }),
  // 获取富文本
  getShopRich: (id, type) => request.get('imageInfo/selectRichText', {
    businessId: id,
    type: type
  }, {
    baseURL: baseUrlApi
  }),
  // 用户登录
  doLogin: (obj) => request.post('/platformUser/login', {
    code: obj.code,
    id: obj.id,
    // id: 1,
    loginWay: 'new',
    userId: obj.userId,
    fromWay: obj.fromWay,
    salesmanId: obj.salesmanId,
    param: obj.param,
    FX: obj.FX
  }, {
    baseURL: baseUrlApi
  }),
  judgeUser: () => request.get('/salesman/selectByUserId', {}, {
    baseURL: baseUrlApi
  }),
  // 获取用户
  getUser: () => request.get('/user/findOne', {}, {
    baseURL: baseUrlApi
  }),
  // 更新昵称、头像、地区、性别
  updateUser: (info) => request.post('/user/update', {
    avatarUrl: info.avatarUrl,
    city: info.city,
    country: info.country,
    gender: info.gender,
    language: info.language,
    nickName: info.nickName,
    province: info.province,
    unionId: info.unionId
  }, {
    baseURL: baseUrlApi
  }),
  // 获取商铺位置
  getShopLocation: (id) => request.get('/business/findById', {
    businessId: id
  }, {
    baseURL: baseUrlApi
  }),
  // 获取type等于1,2,3,4模块
  //   selectModelForUser: (id) => request.get('/model/selectModelForUser', {
  //     businessId: id
  //   }, {
  //     baseURL: baseUrlApi
  //   }),
  // 获取模块小程序根据商户id获取首页
  selectModelForUser: (id) => request.get('/selfPageInfo/selectHomePageForUser', {
    businessId: id
  }, {
    baseURL: baseUrlApi
  }),
  // 获取模块小程序根据id获取自定义页面
  selectModelId: (id) => request.get('/selfPageInfo/findById', {
    id
  }, {
    baseURL: baseUrlApi
  }),
  // 根据type商户id获取模板列表
  selectAllForUser: (obj) => request.get('/selfPageInfo/selectAllForUser', {
    type: obj.type,
    businessId: obj.businessId
  }, {
    baseURL: baseUrlApi
  })
}

export default home
