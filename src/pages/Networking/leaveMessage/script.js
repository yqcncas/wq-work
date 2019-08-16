import apiNews from '@/api/news'
export default {
  name: 'leaveMessage',
  data () {
    return {
      msgContent: '',
      params: {}
    }
  },
  created () {},
  onLoad (options) {
    this.params = options
  },
  methods: {
    // 新闻一个点击赞之后的收藏的按钮,数据库里增加赞的记录新闻
    async addLeaveMsg () {
      wx.showToast({
        icon: 'loading',
        mask: true
      })
      await apiNews.addNews({
        commentType: 0,
        commentnewsid: this.params.id,
        content: this.msgContent
      })
      wx.hideToast()
      wx.navigateBack({
        delta: 1
      })
    }
  }

}
