import request from '../utils/request'
import Shop from '../../config/shop'
const baseUrlApi = Shop.BASE_URL
const person = {
  getCardCode: (ojb) => request.post('/salesman/getSaleManACode', {
    'auto_color': true,
    'is_hyaline': true,
    'line_color': {},
    'path': 'string',
    'width': ojb.width,
    'id': ojb.id,
    'fromWay': ojb.fromWay
  }, {
    baseURL: baseUrlApi
  }),
  //   推广服务号二维码
  getBindMpQrcode: () => request.get('/user/getBindMpQrcode', {}, {
    baseURL: baseUrlApi
  }),
  //   用户获取二维码
  getWxACodeUnlimit: (ojb) => request.post('/salesman/getWxACodeUnlimit', {
    salesmanId: ojb.salesmanId,
    fromWay: ojb.fromWay
  }, {
    baseURL: baseUrlApi
  }),
  getShopContact: (id) => request.get('business/selectSimpleInfo', {
    id
  }, {
    baseURL: baseUrlApi
  }),
  doLogin: (code) => request.post('/user/login', {
    code: code
  }, {
    baseURL: baseUrlApi
  }),
  // 获取用户信息
  getUserInfo: () => request.get('/user/findOne', {}, {
    baseURL: baseUrlApi
  }),
  // 这里要写一个传id的地方
  getCustom: ({
    id,
    pageNum = 2,
    pageSize = 2
  }) => request.get('/salesman/selectOneWithUser', {
    'id': id,
    'pageNum': pageNum,
    'pageSize': pageSize
  }, {
    baseURL: baseUrlApi
  }),
  //   根据业务员id查询业务员，包含旗下用户信息
  getCustomList: ({
    id,
    pageNum = 2,
    pageSize = 2
  }) => request.get('/salesman/selectUsersForSalesman', {
    'id': id,
    'pageNum': pageNum,
    'pageSize': pageSize
  }, {
    baseURL: baseUrlApi
  }),
  // 要在点击的时候，传入对应的用户id，查找客户商品收藏记录
  getCustomBro: ({
    pageNum = 2,
    pageSize = 2,
    id
  }) => request.get('/record/selectGoodsRecord', {
    'userId': id,
    'pageNum': pageNum,
    'pageSize': pageSize
  }, {
    baseURL: baseUrlApi
  }),
  // 要在点击的时候，传入对应的用户id，查找客户新闻收藏记录
  getCustomBronews: ({
    pageNum = 2,
    pageSize = 2,
    id
  }) => request.get('/record/selectNewsRecord', {
    'userId': id,
    'pageNum': pageNum,
    'pageSize': pageSize
  }, {
    baseURL: baseUrlApi
  }),
  // 业务员角色和用户角色都是用一个角色来获取信息
  sendMsg: ({
    message,
    id,
    businessId
  }) => request.post('/msg/insertMsg', {
    'message': message,
    'userId': id,
    'businessId': businessId
  }, {
    baseURL: baseUrlApi
  }),
  // 查询未读数量
  selectUnReadCount: ({
    salesManId,
    sendDir
  }) => request.get('/msg/selectUnReadCount', {
    salesManId,
    sendDir
  }, {
    baseURL: baseUrlApi
  }),
  // 对于业务员这个角色，获取到的消息列表
  selectMsgForSales: ({
    id,
    pageNum,
    pageSize
  }) => request.get('/msg/selectMsgForSales', {
    'userId': id,
    'pageNum': pageNum,
    'pageSize': pageSize
  }, {
    baseURL: baseUrlApi
  }),
  selectMsgForUser: ({
    pageNum,
    pageSize
  }) => request.get('/msg/selectMsgForUser', {
    'pageNum': pageNum,
    'pageSize': pageSize
  }, {
    baseURL: baseUrlApi
  }),
  // 业务员查询用户留言数量列表
  selectCountList: ({
    pageNum,
    pageSize
  }) => request.get('/msg/selectCountList', {
    'pageNum': pageNum,
    'pageSize': pageSize
  }, {
    baseURL: baseUrlApi
  }),
  // // 由个人id获取业务员信息的接口
  // selectsalesman: () => request.get('/UserSalesMan/selectInfo', {
  // }, {
  //   baseURL: baseUrlApi
  // }),
  getOneUserMsg: () => request.get('/user/findOne', {}, {
    baseURL: baseUrlApi
  }),
  // 更新业务员用户信息的接口
  getSalesmanUpdate: (obj) => request.post('/salesman/updateForUser', {
    correspondUser: {
      id: obj.userId,
      name: obj.name
    },
    id: obj.id,
    addDetailed: obj.addDetailed,
    address: obj.address,
    companyName: obj.companyName,
    phone: obj.phone,
    fixedPhone: obj.fixedPhone,
    email: obj.email,
    weChat: obj.weChat,
    imgUrl: obj.imgUrl,
    video: obj.video,
    voice: obj.voice,
    job: obj.job,
    richText: obj.richText,
    richTextList: obj.richTextList,
    info: obj.info
  }, {
    baseURL: baseUrlApi
  }),
  // 获取业务员的信息的接口
  getSalesman: ({
    id
  }) => request.get('/salesman/selectOne', {
    id: id
  }, {
    baseURL: baseUrlApi
  }),
  // 更新个人信息的接口
  getOneUserUpdate: ({
    address,
    id,
    name,
    phone,
    sex,
    password,
    openid,
    token,
    unionid,
    userId,
    headImage,
    area,
    addDetailed,
    companyName
  }) => request.post('/user/update', {
    address: address,
    id: id,
    name: name,
    phone: phone,
    sex: sex,
    password: password,
    openid: openid,
    token: token,
    unionid: unionid,
    headImage: headImage,
    area: area,
    userId: userId,
    addDetailed: addDetailed,
    companyName: companyName
  }, {
    baseURL: baseUrlApi
  }),
  // 获取我所属业务员的名片
  selectInfoForUser: () => request.get('/UserSalesMan/selectInfoForUser', {}, {
    baseURL: baseUrlApi
  }),
  // 获取我所属业务员的名片
  selectInfoBySalesManId: ({
    id,
    userId
  }) => request.get('/UserSalesMan/selectInfoBySalesManId', {
    salesmanId: parseInt(id),
    userId: +userId
  }, {
    baseURL: baseUrlApi
  }),
  // 获取我的业务员名片
  selectInfoForSales: () => request.get('/UserSalesMan/selectInfoForSales', {}, {
    baseURL: baseUrlApi
  }),
  // 一个获取手机号的接口
  getPhone: ({
    encryptedData,
    iv
  }) => request.post('/wxBizDataCrypt/getInfo', {
    encryptedData: encryptedData,
    iv: iv
  }, {
    baseURL: baseUrlApi
  }),
  // 更新手机号
  updatePhone: (phoneNum) => request.post('/user/updatePhone', {
    phone: phoneNum
  }, {
    baseURL: baseUrlApi
  }),
  // selectRanking: ({
  //   pageNum,
  //   pageSize
  // }) => request.post('/salesman/selectRanking', {
  //   pageNum,
  //   pageSize
  // }, {
  //   baseURL: baseUrlApi
  // }),
  // selectRanking: ({
  //   pageNum = 1,
  //   pageSize = 6
  // }) => request.post('salesman/selectRanking', {
  //   pageNum: pageNum,
  //   pageSize: pageSize
  // }, {
  //   baseURL: baseUrlApi
  // }),
  selectRanking: ({
    pageSize,
    pageNum
  }) => request.get('/salesman/selectRanking', {
    pageSize,
    pageNum
  }, {
    baseURL: baseUrlApi
  }),
  // 添加关联，扫描业务员二维码进行和业务员绑定
  insertRelation: ({
    salesmanid
  }) => request.post('UserSalesMan/insert', {
    salesmanId: salesmanid
  }, {
    baseURL: baseUrlApi
  }),
  // 手机页面，更新手机号码
  savePhone: ({
    phone
  }) => request.post('/user/updatePhone', {
    phone: phone
  }, {
    baseURL: baseUrlApi
  }),
  // 更新名片的点赞信息
  updateSalesmanRecord: ({
    id,
    salesmanId,
    isPraise,
    businessId
  }) => request.post('/salesmanRecord/update', {
    'userId': id,
    'salesmanId': salesmanId,
    'isPraise': isPraise,
    'businessId': businessId
  }, {
    baseURL: baseUrlApi
  }),
  // 插入雷达的操作记录
  OperationInsert: ({
    businessId,
    goodsId,
    info,
    newsId,
    recordType,
    salesmanId,
    userId
  }) => request.post('/operationRecord/insert', {
    businessId,
    goodsId,
    info,
    newsId,
    recordType,
    salesmanId,
    userId
  }, {
    baseURL: baseUrlApi
  }),
  // 查询雷达的操作记录
  OperationSearch: ({
    salesmanId,
    pageSize = 0,
    pageNum = 0
  }) => request.get('/operationRecord/selectAllOperation', {
    salesmanId,
    pageSize,
    pageNum
  }, {
    baseURL: baseUrlApi
  }),
  // 根据客户的userid来查找雷达记录operationRecord/selectOperationByUserId
  selectOperationByUserId: ({
    userId,
    pageSize = 0,
    pageNum = 0
  }) => request.get('operationRecord/selectOperationByUserId', {
    userId,
    pageSize,
    pageNum
  }, {
    baseURL: baseUrlApi
  }),
  // 查找业务员标签信息
  salesManTag: ({
    salesManId,
    salesManTagId
  }) => request.get('/salesManTagPraise/selectBySalesManId', {
    'salesManId': salesManId,
    'salesManTagId': salesManTagId
  }, {
    baseURL: baseUrlApi
  }),
  // 标签点赞的接口
  salesManTagPraise: ({
    salesManId,
    salesManTagId
  }) => request.post('/salesManTagPraise/insert', {
    'salesManId': salesManId,
    'salesManTagId': salesManTagId
  }, {
    baseURL: baseUrlApi
  }),
  //   业务员点赞
  salesManPraiseInsert: ({
    salesmanId,
    userId
  }) => request.post('/salesmanPraise/insert', {
    salesmanId,
    userId
  }, {
    baseURL: baseUrlApi
  }),
  //   业务员点赞删除
  salesManPraiseDelete: ({
    id
  }) => request.post('/salesmanPraise/delete', {
    id
  }, {
    baseURL: baseUrlApi
  }),
  // 根据id查找业务员信息
  findOneById: ({
    id
  }) => request.get('/user/findOneById', {
    id
  }, {
    baseURL: baseUrlApi
  }),
  // /userRemarks/insert
  userRemarks: ({
    userId,
    businessId
  }) => request.post('/userRemarks/insert', {
    userId,
    businessId
  }, {
    baseURL: baseUrlApi
  }),
  // userRemarks/selectOne
  selectOneUserRemarks: ({
    userId
  }) => request.get('userRemarks/selectOne', {
    userId
  }, {
    baseURL: baseUrlApi
  }),
  // userRemarks/update
  updateRemarks: ({
    userId,
    id,
    company,
    email,
    job,
    fixedPhone,
    phone,
    remarks,
    weChat
  }) => request.post('userRemarks/update', {
    id,
    userId,
    company,
    email,
    job,
    fixedPhone,
    phone,
    remarks,
    weChat
  }, {
    baseURL: baseUrlApi
  }),
  // 查询当前用户的自定义常用语
  customMsgList: ({
    userId
  }) => request.get('/customMsg/selectAll', {
    userId
  }, {
    baseURL: baseUrlApi
  }),
  // 新增自定义常用语 ，最多十条
  addCustomMsg: ({
    userId,
    message
  }) => request.post('/customMsg/insert', {
    userId,
    message
  }, {
    baseURL: baseUrlApi
  }),
  // 删除常用语
  deleteCustomMsg: ({
    id
  }) => request.post('/customMsg/delete', {
    id
  }, {
    baseURL: baseUrlApi
  }),
  // 编辑常用语
  updateCustomMsg: ({
    id,
    message
  }) => request.post('/customMsg/update', {
    id,
    message
  }, {
    baseURL: baseUrlApi
  }),
  // boss雷达数据
  //   根据商户的id查询所有数据
  bossRadarSelectCount: ({
    businessId,
    type
  }) => request.get('/data/selectCount', {
    businessId,
    type
  }, {
    baseURL: baseUrlApi
  }),
  //   根据日期活跃客户数
  bossRadarActive: ({
    businessId,
    type
  }) => request.get('/data/selectActiveUsers', {
    businessId,
    type
  }, {
    baseURL: baseUrlApi
  }),
  //   根据日期新增客户数
  bossRadarNew: ({
    businessId,
    type
  }) => request.get('/data/selectNewUsers', {
    businessId,
    type
  }, {
    baseURL: baseUrlApi
  }),
  //   根据日期查询成交率
  bossRadarSuccess: ({
    businessId,
    type
  }) => request.get('/data/selectOrderSuccessPercent', {
    businessId,
    type
  }, {
    baseURL: baseUrlApi
  }),
  //   查询业务员标签
  salesmanTagList: (salesManId) => request.get('/salesManTag/selectBySalesManId', {
    salesManId
  }, {
    baseURL: baseUrlApi
  }),
  //   add业务员标签
  salesmanTagAdd: (obj) => request.post('/salesManTag/insert', {
    salesManId: obj.salesManId,
    tag: obj.tag
  }, {
    baseURL: baseUrlApi
  }),
  //   删除业务员标签
  salesmanTagDelete: (id) => request.post('/salesManTag/delete', {
    id
  }, {
    baseURL: baseUrlApi
  }),
  //   查询业务员排行榜 根据selectNew判断是否查询新增的客户 false所有客户数 true新增客户数
  selectUserNumRanking: (obj) => request.get('/salesman/selectUserNumRanking', {
    pageNum: obj.pageNum,
    pageSize: obj.pageSize,
    selectNew: obj.selectNew
  }, {
    baseURL: baseUrlApi
  }),
  //   查询业务员跟进人数排行榜
  selectMsgNumRanking: (obj) => request.get('/salesman/selectMsgNumRanking', {
    pageNum: obj.pageNum,
    pageSize: obj.pageSize
  }, {
    baseURL: baseUrlApi
  }),
  //   查询所有模板
  templeAll: () => request.get('/salesManInfoTemplate/selectAll', {}, {
    baseURL: baseUrlApi
  }),
  //   根据业务员id查询用户列表， 根据标签分类查询
  selectGroupByRemarksTag: (obj) => request.get('/salesman/selectGroupByRemarksTag', {
    id: obj.id,
    pageNum: obj.pageNum,
    pageSize: obj.pageSize,
    tagType: obj.tagType
  }, {
    baseURL: baseUrlApi
  }),
  //   所有标签
  allTagGet: (businessId) => request.get('/remarksTag/selectAllForUser', {
    businessId
  }, {
    baseURL: baseUrlApi
  }),
  //   更新备注
  updateRemarksNew: (obj) => request.post('/userRemarks/updateRemarks', {
    remarks: obj.remarks,
    userId: obj.userId
  }, {
    baseURL: baseUrlApi
  }),
  //  根据业务员id查询用户列表， 根据备注名字模糊查询
  selectByRemarks: (obj) => request.get('/salesman/selectByRemarks', {
    id: obj.id,
    pageNum: obj.pageNum,
    pageSize: obj.pageSize,
    remarks: obj.remarks
  }, {
    baseURL: baseUrlApi
  }),
  //  查找全部业务员,传入businessId，查找该商户业务员
  selectAllMan: (obj) => request.get('/salesman/selectAll', {
    businessId: obj.businessId,
    pageNum: obj.pageNum,
    pageSize: obj.pageSize
  }, {
    baseURL: baseUrlApi
  }),
  //  自定义标签
  userRemarksTagAdd: (obj) => request.post('/remarksTag/insert', {
    businessId: obj.businessId,
    tag: obj.tag
  }, {
    baseURL: baseUrlApi
  }),
  //  添加标签
  userRemarksTagUpdate: (userRemarksTagList) => request.post('/userRemarksTag/update',
    userRemarksTagList, {
      baseURL: baseUrlApi
    }),
  //  业务员发送给用户的第一条信息
  selectFirstMsg: (salesManId) => request.get('/msg/selectFirstMsg', {
    salesManId
  }, {
    baseURL: baseUrlApi
  }),
  //  查询推送记录
  selectSendRecord: (obj) => request.get('/sendMsgRecord/selectSendRecord', obj, {
    baseURL: baseUrlApi
  }),
  //  推送消息
  sendMsgActive: (obj) => request.post('/sendMsgRecord/sendMsg', obj, {
    baseURL: baseUrlApi
  })
}

export default person
