<template>
  <view class="tab-bar">
    <view class="tab-bar-border"></view>
    <view v-for="(item,index) in list" :key="index" class="tab-bar-item" @click="switchTab(index,item.url)">
      <image :src="selected === index ? item.iconUrl + '?x-oss-process=style/w81' : item.unselIconUrl + '?x-oss-process=style/w81'"></image>
      <view :style="'color:'+(selected===index?item.color:item.unSelColor)">{{item.configName}}</view>
    </view>
  </view>
</template>
<script>
import home from '@/api/home'
export default {
  data () {
    return {
      selected: 0,
      list: []
    }
  },
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    switchTab (index, url) {
      this.selected = index
      wx.switchTab({ url })
    },
    async getList () {
      let businessId = wx.getStorageSync('businessId')
      const { data } = await home.tabbarAll(businessId)
      data.map((item, i) => {
        if (item.url === this.url) {
          this.selected = i
        }
      })
      this.list = data
    }
  },
  onShow () {
    this.getList()
  },
  onLoad () {
    this.getList()
  }
}
</script>
<style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: #eee;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item image {
  width: 27px;
  height: 27px;
}

.tab-bar-item view {
  font-size: 10px;
}
</style>

