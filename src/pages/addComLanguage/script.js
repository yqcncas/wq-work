import personApi from '@/api/person'
export default {
  data () {
    return {
      msgContent: '',
      params: {},
      loading: false
    }
  },
  created () {},
  onLoad (options) {
    this.params = options
    if (options.content) {
      this.msgContent = options.content
    } else {
      this.msgContent = ''
    }
  },
  methods: {
    // updateCustomMsg
    async saveMsg () {
      if (this.msgContent === '') {
        wx.showToast({
          title: '常用语不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (this.loading) return
      this.loading = true
      let result = {}
      if (this.params.userId) {
        result = await personApi.addCustomMsg({
          userId: this.params.userId,
          message: this.msgContent
        })
      } else {
        result = await personApi.updateCustomMsg({
          id: this.params.id,
          message: this.msgContent
        })
      }
      this.loading = false
      if (result.code === 200) {
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.showToast({
          title: result.message,
          icon: 'none',
          duration: 2000
        })
      }
    }
  }

}
