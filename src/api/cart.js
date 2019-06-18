import request from '../utils/request'
import Shop from '../../config/shop'
const baseUrlApi = Shop.BASE_URL
// const baseUrlApi = 'http://192.168.1.135:8989'
const cart = {
  // 获取购物车列表
  getCartList: () =>
    request.get(
      '/cart/index', {}, {
        baseURL: baseUrlApi
      }
    ),
  // 获取购物车商品总件数
  getCartCount: () =>
    request.get(
      '/cart/goodscount', {}, {
        baseURL: baseUrlApi
      }
    ),
  // 添加商品到购物车
  addCart: ({
    goodsId,
    number,
    modelId,
    modelName
  }) =>
    request.post(
      '/cart/add', {
        goodsId: goodsId,
        number: number,
        modelId: modelId,
        modelName: modelName
      }, {
        baseURL: baseUrlApi
      }
    ),
  // 删除商品/cart/delete
  deleteCart: id =>
    request.post(
      '/cart/delete', {
        cartIds: id
      }, {
        baseURL: baseUrlApi
      }
    ),
  //   获取下单list
  unified: ({
    goodsList
  }) =>
    request.post(
      '/order/unified', {
        goodsList
      }, {
        baseURL: baseUrlApi
      }
    ),
  // 进行下单的接口
  unifiedOrder: ({
    goodsList,
    spbillCreateIp,
    name,
    remarks,
    orderAddress,
    addressDetail,
    userName,
    phone,
    buyWay
  }) =>
    request.post(
      '/order/unifiedOrder', {
        goodsList,
        unifiedOrderRequest: {
          spbillCreateIp,
          attach: '1',
          body: '腾讯充值中心-QQ会员充值',
          detail: '1',
          feeType: 'CNY',
          goodsTag: '1'
        },
        getWay: '自取',
        name,
        remarks,
        orderAddress,
        addressDetail,
        userName,
        phone,
        buyWay
      }, {
        baseURL: baseUrlApi
      }
    ),
  // 新建的查询下单order的类别的接口,查询所有的订单
  orderByStatus: ({
    status,
    pageNum,
    pageSize
  }) =>
    request.get(
      '/order/selectByStatus', {
        status,
        pageNum,
        pageSize
      }, {
        baseURL: baseUrlApi
      }
    ),
  // 新建的查询下单order的类别的接口,查询一个订单
  selectDeTailOrderInfo: ({
    id
  }) =>
    request.get(
      '/order/selectDeTailOrderInfo', {
        id: id
      }, {
        baseURL: baseUrlApi
      }
    ),
  // 删除订单
  deleteOrder: ({
    id
  }) =>
    request.post(
      '/order/delete', {
        id
      }, {
        baseURL: baseUrlApi
      }
    ),
  // 修改订单的状态
  updateOrderStatus: (obj) =>
    request.post(
      '/order/updateOrderStatus',
      obj, {
        baseURL: baseUrlApi
      }
    ),
  // 更新订单的地址，如果选了，可以更新，没选就默认
  updateOrderAddress: ({
    id,
    orderAddress,
    orderAddressDetail,
    userName,
    phone
  }) =>
    request.post(
      '/order/updateOrderAddress', {
        id,
        orderAddress,
        orderAddressDetail,
        userName,
        phone
      }, {
        baseURL: baseUrlApi
      }
    )
}
export default cart
