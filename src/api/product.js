import request from '../utils/request'
import Shop from '../../config/shop'
const baseUrlApi = Shop.BASE_URL
const ossUrl = Shop.OSS_URL
const product = {
  ossUrl: ossUrl,
  getCategory: ({
    businessId
  }) => request.get('goodsType/all', {
    businessId
  }, {
    baseURL: baseUrlApi
  }),
  getProduct: ({
    type,
    businessId,
    pageNum,
    pageSize,
    name
  }) => request.get('goods/allForUser?status=1', {
    businessId,
    type,
    pageNum,
    pageSize,
    name
  }, {
    baseURL: baseUrlApi
  }),
  // 模糊查询商品
  getProductByName: ({
    name,
    businessId
  }) => request.get('goods/allForUser', {
    businessId: businessId,
    name: name
  }, {
    baseURL: baseUrlApi
  }),
  // 得到商品的详情
  getProdDetail: (id) => request.get('/platformGoods/findOneForUser', {
    id: id
  }, {
    baseURL: baseUrlApi
  }),
  // 查询所有头像
  selectAllAvatarUrl: (obj) => request.get('/operationRecord/selectAllAvatarUrl', obj, {
    baseURL: baseUrlApi
  }),
  // 显示购买信息
  getBuyDetail: ({
    goodsId,
    pageNum = 0,
    pageSize = 0
  }) => request.get('/goods/selectBuyInfo', {
    goodsId,
    pageNum,
    pageSize
  }, {
    baseURL: baseUrlApi
  }),
  // 用户在发送消息的时候，往后台发送formid
  getFormid: (formid) => request.post('/formid/saveformid', {
    'formId': formid
  }, {
    baseURL: baseUrlApi
  }),
  // 增加product的收藏
  addComment: ({
    commentType,
    commentgoodsid,
    commentuserid
  }) => request.post('/comment/add', {
    commentType: commentType,
    commentGoodsId: commentgoodsid,
    commentUserId: commentuserid
  }, {
    baseURL: baseUrlApi
  }),
  // 删除product下的收藏
  deleteComment: ({
    commentType,
    commentgoodsid,
    commentuserid
  }) => request.post('/comment/delete', {
    commentType: commentType,
    commentGoodsId: commentgoodsid,
    commentUserId: commentuserid
  }, {
    baseURL: baseUrlApi
  }),
  // 查询我个人id下收藏所有的product
  searchAllComment: ({
    commentType,
    pageNum,
    pageSize
  }) => request.get('/comment/selectByUserId', {
    commentType,
    pageNum,
    pageSize
  }, {
    baseURL: baseUrlApi
  })
}

export default product
