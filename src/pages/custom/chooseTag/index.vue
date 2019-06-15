<template>
  <div class="add-tag-wrap">
    <div class="list-tag">
      <span :class="item.active" v-for="(item,index) in tagList" :key="index" class="tag-style" @click="changeStyle(item)">{{item.tag}}</span>
      <span class="tag-style self-tag" @click="routerTo(`../selfTag/index`)">+自定义标签</span>
    </div>
    <button class="finish-btn" @click="finish">完成</button>
  </div>
</template>
<script>
import apicustom from '@/api/person'
export default {
  data () {
    return {
      userId: null,
      tagList: [],
      userRemarksTagList: []
    }
  },
  methods: {
    routerTo (url) {
      wx.navigateTo({
        url
      })
    },
    async finish () {
      const { code } = await apicustom.userRemarksTagUpdate(this.userRemarksTagList)
      if (code === 200) {
        wx.navigateBack({
          delta: 1
        })
      }
    },
    changeStyle (item) {
      if (item.active && item.active === 'active') {
        this.$set(item, 'active', '')
        this.userRemarksTagList.map((m, n) => {
          if (m.remarksTagType === item.id) {
            this.userRemarksTagList.splice(n, 1)
          }
        })
      } else {
        if (this.userRemarksTagList.length > 2) {
          wx.showToast({
            title: '标签最多添加三个',
            icon: 'none',
            duration: 2000
          })
          return
        }
        this.$set(item, 'active', 'active')
        this.userRemarksTagList.push({ userId: this.userId, remarksTagType: item.id })
      }
    },
    // 查找所有的标签列表
    async selectAllUserRemarks () {
      let businessId = wx.getStorageSync('businessId')
      const { data } = await apicustom.allTagGet(businessId)
      this.tagList = data
      this.tagList.map((m) => {
        this.userRemarksTagList.map((i) => {
          if (i.remarksTagType === m.id) {
            m.active = 'active'
          }
        })
      })
    }
  },
  onLoad (options) {
    this.userId = options.id
    this.userRemarksTagList = JSON.parse(options.list)
    this.userRemarksTagList.map(item => {
      item.remarksTagType = item.id
    })
  },
  onShow () {
    this.selectAllUserRemarks()
  }
}
  </script>
<style lang="scss">
@import "./style.scss";
</style>
