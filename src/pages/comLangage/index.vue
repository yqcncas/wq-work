<template>
  <div class="common-language">
    <div class="text-box">
      <div class="item" v-for="(item,i) in list" :key="i" @touchstart="startMove" @touchmove="touchM" :data-index="i">
        <p class="txt white">{{item.message}}</p>
        <p class="txt inner trans" :style="item.textStyle" @click="initTextStyle">{{item.message}}</p>
        <div class="box-right inner">
          <p class="edit btn" @click="routeTo(`../addComLanguage/index?id=${item.id}&content=${item.message}`)"><span>编辑</span></p>
          <p class="del btn" @click="deleteMsg(item.id,i)"><span>删除</span></p>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <p class="add-new" @click="routeTo(`../addComLanguage/index?userId=${userId}`,'add')">新增</p>
    </div>
  </div>
</template>
<script>
import personApi from '@/api/person'
export default {
  data () {
    return {
      userId: null,
      list: [],
      startX: '',
      moveX: '',
      X: 0
    }
  },
  methods: {
    //   删除消息
    deleteMsg (id, i) {
      wx.showModal({
        title: '',
        content: '是否要删除该条常用语',
        success: async (res) => {
          if (res.confirm) {
            // 这里主要是删除的接口
            const { code, message } = await personApi.deleteCustomMsg({ id })
            if (code === 200) {
              this.getList()
            } else {
              wx.showToast({
                title: message,
                icon: 'none',
                duration: 2000
              })
            }
          } else if (res.cancel) {
            this.initTextStyle()
          }
        }
      })
    },
    routeTo (url, type) {
      if (type === 'add' && this.list.length === 10) {
        wx.showToast({
          title: '常用语最多只能保存十条',
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.navigateTo({ url })
      }
    },
    async getList () {
      const { code, data, message } = await personApi.customMsgList({ userId: this.userId })
      if (code === 200) {
        this.list = data
      } else {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    initTextStyle () {
      // 滑动之前先初始化数据
      this.list.map((item, i) => {
        item.textStyle = ''
      })
      this.$forceUpdate()
    },
    startMove (e) {
      this.startX = e.touches[0].pageX
    },
    touchM (e) {
      // 滑动之前先初始化样式数据
      this.initTextStyle()
      var index = e.currentTarget.dataset.index

      this.moveX = e.touches[0].pageX
      this.X = this.moveX - this.startX
      if (this.X >= 50 || this.X >= -50) {
        this.X = 0
      }
      if (this.X <= -50) {
        this.X = -260
      }
      this.list[index].textStyle = `transform:translateX(${this.X}rpx);`
    }
  },
  onLoad (options) {
    this.userId = options.userId
  },
  onShow () {
    this.getList()
  }
}
</script>
<style lang='scss'>
@import "style";
</style>
