<template>
  <div class="common-language">
    <div class="text-box temple">
      <div class="item" v-for="(item,i) in list" :key="i" :data-index="i" @click="chooseOne(item.info)">
        <p class="txt">{{item.info}}</p>
      </div>
    </div>
  </div>
</template>
<script>
// import personApi from '@/api/person'
export default {
  data () {
    return {
      list: [{
        info: 'aaaaaaa'
      }]
    }
  },
  methods: {
    // async getList () {
    //   const { code, data, message } = await personApi.templeAll()
    //   if (code === 200) {
    //     this.list = data
    //   } else {
    //     wx.showToast({
    //       title: message,
    //       icon: 'none',
    //       duration: 2000
    //     })
    //   }
    // },
    // 选择模板
    chooseOne (info) {
      wx.setStorageSync('info', info)
      wx.navigateBack({
        delta: 1
      })
    }
  },
  onLoad () {
  },
  onShow () {
    this.getList()
  }
}
</script>
<style lang='less' scoped>
  @import "./style.less";
.common-language .temple {
  padding-bottom: 0;
}
</style>
