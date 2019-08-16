import request from '../utils/request'
import Shop from '../../config/shop'
const baseUrlApi = Shop.BASE_URL
const ossUrl = Shop.OSS_URL
// const baseUrlDyn = 'https://dyn.ithome.com'
// const baseUrlQuan = 'https://apiquan.ithome.com'

const news = {
  ossUrl: ossUrl,
  getNews: ({
    businessId,
    pageNum = 2,
    pageSize = 2,
    typeId,
    longitude,
    latitude
  }) => request.get('dynamic/selectByType', {
    businessId: businessId,
    pageNum: pageNum,
    pageSize: pageSize,
    type: typeId,
    longitude: longitude,
    latitude: latitude
  }, {
    baseURL: baseUrlApi
  }),
  getType: (businessId) => request.get('newsType/all', {
    businessId
  }, {
    baseURL: baseUrlApi
  }),
  getNewsDetail: (id) => request.get('dynamic/selectOne', {
    id: id
  }, {
    baseURL: baseUrlApi
  }),
  // 查询我个人收藏下所有的新闻
  searchAllNews: ({
    commentType,
    pageNum,
    pageSize
  }) => request.get('/newsComment/selectNewsCommentByUserId', {
    commentType,
    pageNum,
    pageSize
  }, {
    baseURL: baseUrlApi
  }),
  // 查询留言
  searchAllMSg: ({
    commentNewsId,
    commentType
  }) => request.get('/newsComment/selectAll', {
    commentNewsId: commentNewsId,
    commentType: commentType
  }, {
    baseURL: baseUrlApi
  }),
  // 留言点赞
  msgPraise: ({
    newsCommentId
  }) => request.post('/newsCommentPraise/insert', {
    newsCommentId: newsCommentId
  }, {
    baseURL: baseUrlApi
  }),
  // 留言取消点赞
  msgPraiseCancel: ({
    newsCommentId
  }) => request.post('/newsCommentPraise/delete', {
    newsCommentId: newsCommentId
  }, {
    baseURL: baseUrlApi
  }),
  // 增加新闻收藏
  addNews: ({
    status = 0,
    id
  }) => request.post('/dynamic/praise', {
    'status': status,
    'id': id
  }, {
    baseURL: baseUrlApi
  }),
  // 删除新闻收藏
  deleteNews: ({
    status = 1,
    id
  }) => request.post('/dynamic/praise', {
    'status': status,
    'id': id
  }, {
    baseURL: baseUrlApi
  })
}

export default news
