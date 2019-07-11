import request from '../utils/request'
import Shop from '../../config/shop'
const baseUrlApi = Shop.BASE_URL
// const baseUrlApi = 'http://192.168.1.135:8989'
const address = {
  // 查询多个地址
  orderAddressAll: () => request.get('/orderAddress/selectAll', {}, {
    baseURL: baseUrlApi
  }),
  // 查询单个地址
  orderAddressOne: ({
    id
  }) => request.get('/orderAddress/selectOne', {
    'id': id
  }, {
    baseURL: baseUrlApi
  }),
  addAddress: ({
    address,
    name,
    phone,
    addressDetail,
    isDefault
  }) => request.post('/orderAddress/add', {
    address,
    name,
    phone,
    addressDetail,
    isDefault
  }, {
    baseURL: baseUrlApi
  }),
  // 删除单个地址
  deleteAddress: ({
    id
  }) => request.post('orderAddress/delete', {
    'id': id
  }, {
    baseURL: baseUrlApi
  }),
  // 更新地址信息
  updateAddress: ({
    id,
    address,
    name,
    phone,
    userId,
    isDefault,
    addressDetail
  }) => request.post('orderAddress/update', {
    id,
    address,
    name,
    phone,
    userId,
    isDefault,
    addressDetail
  }, {
    baseURL: baseUrlApi
  })
}
export default address
