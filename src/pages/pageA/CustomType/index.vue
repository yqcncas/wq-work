<template>
  <div class="profile-page">
    <div class="box-area">
      <textarea class="inputMsg" v-model="obj.info" maxlength="5" @input="txtInput"></textarea>
      <span class="num">{{ num }}/5</span>
    </div>
    <buton class="sure-btn" @click="getSalesmanUpdate">添加</buton>
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
        if (this.num >= 5) {
          wx.showToast({
            title: '最多只能输入5个字',
            icon: 'none',
            duration: 2000
          })
        }
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
