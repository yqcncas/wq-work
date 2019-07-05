<template>
  <div class="self-wrap">
    <div class="input-wrap flexRow">
      <input :focus="true" @input="txtInput" class="input-style" maxlength="5" placeholder="请输入标签" v-model="params.tag" />
      <span>{{txtlength}}/5</span>
    </div>
    <button class="finish-btn" @click="finish">添加</button>
  </div>
</template>
<script>
import apicustom from '@/api/person'
export default {
  data () {
    return {
      params: {
        businessId: null,
        tag: ''
      },
      txtlength: 0
    }
  },
  methods: {
    txtInput () {
      this.txtlength = this.params.tag.length
      if (this.txtlength >= 5) {
        wx.showToast({
          title: '最多只能输入5个字',
          icon: 'none',
          duration: 2000
        })
      }
    },
    async finish () {
      if (this.txtlength === 0) {
        wx.showToast({
          title: '不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.params.businessId = wx.getStorageSync('businessId')
      const { code } = await apicustom.userRemarksTagAdd(this.params)
      if (code === 200) {
        wx.navigateBack({
          delta: 1
        })
      }
    }
  },
  onLoad () {
    this.params.tag = ''
    this.txtlength = 0
  }
}
  </script>
<style lang="scss">
@import "./style.scss";
</style>
