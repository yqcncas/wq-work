<template>
  <div class="profile-page">
    <div class="top-choose" @click="routeTo">
      <span>选择模板简介</span>
      <i class="iconfont iconyouce"></i>
    </div>
    <div class="box-area">
      <p class="title">简介描述</p>
      <textarea class="inputMsg" v-model="obj.info" maxlength="120" @input="txtInput" placeholder="请输入简介"></textarea>
      <span class="num">{{num}}/120</span>
    </div>
    <buton class="sure-btn" @click="getSalesmanUpdate">确定</buton>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: 0,
      obj: {
        info: '',
        id: ''
      },
      info: ''
    }
  },
  methods: {
    getSalesmanUpdate () {
      if (this.obj.info === '') {
        this.info = '还没有简介吧？快去填写，让更多人认识你，了解你'
      } else {
        this.info = this.obj.info
      }
      this.$fly.request({
        method: 'post', // post/get 请求方式
        url: 'server/platformSalesman/updateBaseInfo',
        body: {
          id: this.obj.id, // 152
          info: this.info
        }
      }).then(res => {
        console.log('res', res)
        if (res.code === 200) {
          wx.showToast({
            title: '成功',
            icon: 'none',
            duration: 2000
          })
          wx.reLaunch({
            url: '../index/main'
          })
        }
      }).catch(err => {
        console.log(err.status, err.message)
      }).fail(err => {
        console.log(err.status, err.message)
        wx.showToast({
          title: '简介不能为空',
          icon: 'none',
          duration: 5000
        })
      })
    },
    txtInput () {
      this.num = this.obj.info.length
      if (this.num >= 120) {
        wx.showToast({
          title: '最多只能输入120个字',
          icon: 'none',
          duration: 2000
        })
      }
    },
    routeTo () {
      wx.navigateTo({
        url: `../profileModel/main`
      })
    }
  },
  onLoad (option) {
    this.obj = option
    this.num = this.obj.info.length
  },
  onShow () {
    let info = wx.getStorageSync('info')
    if (info === '还没有简介吧？快去填写，让更多人认识你，了解你') {
      this.obj.info = ''
      this.num = this.obj.info.length
      wx.removeStorageSync('info')
    } else {
      this.obj.info = info
      this.num = this.obj.info.length
      wx.removeStorageSync('info')
    }
  }
}
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
