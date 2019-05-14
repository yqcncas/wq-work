<template>
  <div class="profile-page">
    <div class="top-choose" @click="routeTo">
      <span>选择模板简介</span>
      <i class="icon-arrow-right"><img src="../../../static/images/right-cc.png" /></i>
    </div>
    <div class="box-area">
      <p class="title">简介描述</p>
      <textarea class="inputMsg" v-model="obj.info" maxlength="120" @input="txtInput"></textarea>
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
        info: ''
      }
    }
  },
  methods: {
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
    if (info) {
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
