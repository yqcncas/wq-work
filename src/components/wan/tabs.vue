<template>
  <div class="van-tabs van-tabs--line" :class="tabClass">
    <div class="tabs-wrap tabs-wrap--scrollable van-hairline--top-bottom">
      <scroll-view class="scorll" scroll-x="true" scroll-with-animation :scroll-left="scrollLeft">
        <!--:scroll-into-view=""-->
        <div ref="tabs" class="van-tabs__nav van-tabs__nav--line">
          <div class="van-tabs__line" :style="lineStyle" style="transition-duration: 0.2s;" />
          <!-- <div @click="handleChange(t,k)" v-for="(t,k) in tabs" :key="k" class="van-tab " :id="'t'+k" :class="activeTab == k ? 'tab-active' : ''">
            <div class="van-ellipsis">{{t.typeName}}</div>
          </div> -->
          <div @click="handleChange(t,k)" v-for="(t,k) in tabs" :key="k" class="van-tab" :id="'t'+k" :class="activeTab == k ? 'tab-active' : ''">
            <div class="van-ellipsis">{{t.typeName}}</div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="CatalogA" @click="toCA">
      <i class="iconfont iconsousuo"></i>
    </div>
    <!--<div class="Catalog" @click="routerTo('/pages/pageA/cart/main')" >-->
      <!--<i class="iconfont icongouwuche">-->
        <!--<span class="num" v-if="allnumber>0 && allnumber<99">{{allnumber}}</span>-->
        <!--<span class="num" v-else-if="allnumber>=99">99</span>-->
      <!--</i>-->
    <!--</div>-->
    <div class="tabs-content">
      <slot />
    </div>
  </div>
</template>

<script>
import cartApi from '@/api/cart'
export default {
  name: 'tabs',
  data () {
    return {
      inited: false,
      active: false,
      activeTab: 0,
      lineStyle: '',
      scrollLeft: 0,
      allnumber: 0
    }
  },
  props: {
    scrollable: {
      type: Boolean,
      default: true
    },
    tabs: {
      type: Array,
      default: []
    },
    typeName: {
      type: String,
      default: ''
    },
    tabClass: {
      type: String,
      default: ''
    }
  },
  onLoad (options) {
    console.log('options', options)
    this.getCartCount()
    this.jumpTo()
  },
  onShow () {
    this.getCartCount()
  },
  methods: {
    routerTo (url, flag) {
      wx.navigateTo({
        url
      })
    },
    toCA () {
      wx.pageScrollTo({
        scrollTop: 262
      })
    },
    // 获取所有的购物车里的数量
    async getCartCount () {
      const result = await cartApi.getCartCount()
      this.allnumber = result.data.cartTotal.goodsCount
    },
    jumpTo () {
      this.$nextTick(() => {
        this.tabs.map((item, index) => {
          if (this.typeName === '待付款') {
            this.scrollLeft = 0
          }
          if (item.typeName === this.typeName) {
            this.activeTab = index
            this.$emit('change', { test: 'hh', sortingType: item.id, typeId: item.typeId })
          }
        })
      })
    },
    handleChange (t, k) {
      this.setActive(k)
      this.$emit('change', { test: 'hh', sortingType: t.id, typeId: t.typeId })
      // 将当前对象 evt 传递到父组件
    },
    setActive (active) {
      this.activeTab = active
      wx.createSelectorQuery().select('.van-tab').fields({
        dataset: true,
        size: true,
        scrollOffset: true,
        properties: ['scrollX', 'scrollY'],
        computedStyle: ['margin', 'backgroundColor']
      }, (res) => {
        const width = res.width
        if (active >= 2) {
          this.scrollLeft = (active - 2) * width + 50
        } else {
          this.scrollLeft = 0
        }
      }).exec()
    }
  }
}
</script>

<style lang="scss" scoped>
.van-hairline,
.van-hairline--bottom,
.van-hairline--left,
.van-hairline--right,
.van-hairline--surround,
.van-hairline--top,
.van-hairline--top-bottom {
  position: relative;
}

.van-hairline--bottom::after,
.van-hairline--left::after,
.van-hairline--right::after,
.van-hairline--surround::after,
.van-hairline--top-bottom::after,
.van-hairline--top::after,
.van-hairline::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  pointer-events: none;
  box-sizing: border-box;
  border: 0 solid #eee;
}
.scorll{
  width: 82%;
}
.van-hairline--top::after {
  border-top-width: 2rpx;
}

.van-hairline--left::after {
  border-left-width: 2rpx;
}

.van-hairline--right::after {
  border-right-width: 2rpx;
}

/*.van-hairline--bottom::after {*/
  /*border-bottom-width: 2rpx;*/
/*}*/

/*.van-hairline--top-bottom::after {*/
  /*border-width: 2rpx 0;*/
/*}*/

.van-hairline--surround::after {
  border-width: 2rpx;
}

.van-tabs {
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.CatalogA{
  position: absolute;
  right:0rpx;
  top: 20rpx;
  width: 70rpx;
  height: 48rpx ;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6rpx;
  background: #ffffff;
  /*border-left: 1rpx solid #cccccc;*/
  z-index: 100;
}
.Catalog{
  position: absolute;
  right: 0;
  top: 20rpx;
  width: 70rpx;
  height: 48rpx ;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 6rpx;
  background: #ffffff;
  border-left: 1rpx solid #cccccc;
  z-index: 100;
  i{
    position: relative;
    .num{
      position: absolute;
      top: -10rpx;
      right: -10rpx;
      width: 24rpx;
      height: 24rpx;
      background: #FF424E;
      color: #ffffff;
      font-size: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
}
.tabs-wrap {
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  position: absolute;
  background: white;
}

.tabs-wrap--page-top {
  position: fixed;
}

.tabs-wrap--content-bottom {
  top: auto;
  bottom: 0;
}

.tabs-wrap--scrollable .van-tab {
//   -webkit-box-flex: 0;
//   -webkit-flex: 0 0 22%;
//   flex: 0 0 22%;
}

.van-tabs__nav {
  display: -webkit-box;
  /*display: -webkit-flex;*/
  /*display: flex;*/
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  background-color: #fff;
  /*width: 100%;*/

}
.van-ellipsis{
  margin-right: 30rpx;
}
.van-tabs__nav--line {
  height: 100%;
  padding:0 20rpx;
}

.van-tabs__nav--card {
  margin: 0 30rpx;
  border-radius: 4rpx;
  box-sizing: border-box;
  border: 2rpx solid #f44;
  height: 60rpx;
}

.van-tabs__nav--card .van-tab {
  color: #f44;
  border-right: 2rpx solid #f44;
  line-height: 46rpx;
}

.van-tabs__nav--card .van-tab:last-child {
  border-right: none;
}

.van-tabs__nav--card .van-tab.tab-active {
  color: #fff;
  background-color: #f44;
}

.van-tabs__line {
  z-index: 1;
  left: 0;
  bottom: 0;
  height: 4rpx;
  position: absolute;
  background-color: #f44;
}

.van-tabs--line {
  padding-top: 88rpx;
}

.van-tabs--line .tabs-wrap {
  height: 88rpx;
}

.van-tabs--card {
  padding-top: 60rpx;
}

.van-tabs--card .tabs-wrap {
  height: 60rpx;
}

.van-tab {
//   -webkit-box-flex: 1;
//   -webkit-flex: 1;
//   flex: 1;
//   cursor: pointer;
  padding: 0 10rpx;
  font-size: 28rpx;
  position: relative;
  color: #9B9B9B;
  line-height: 88rpx;
  text-align: center;
  box-sizing: border-box;
  background-color: #fff;
}

.van-tab span {
  display: block;
}

.tab-active {
  color: #FFAB37;
}

.van-tab--disabled {
  color: #c9c9c9;
}
</style>
