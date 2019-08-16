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
            <div class="van-ellipsis">
              <p class="Simg"><img :src="t.iconUrl"/></p>
              <a class="Stype">{{t.typeName}}</a>
            </div>
          </div>
        </div>
      </scroll-view>
    </div>
    <div class="Catalog">
      <i class="iconfont iconyouce"></i>
    </div>
    <!--<div class="tabs-content">-->
      <!--<slot />-->
    <!--</div>-->
  </div>
</template>

<script>
  export default {
    name: 'tabs',
    data () {
      return {
        inited: false,
        active: false,
        activeTab: 0,
        lineStyle: '',
        scrollLeft: 0
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
    onLoad () {
      this.jumpTo()
    },
    methods: {
      jumpTo () {
        this.$nextTick(() => {
          this.tabs.map((item, index) => {
            if (this.typeName === '待付款') {
              this.scrollLeft = 0
            }
            if (item.typeName === this.typeName) {
              this.activeTab = index
              this.$emit('change', { test: 'hh', categoryId: item.id, typeId: item.typeId })
            }
          })
        })
      },
      handleChange (t, k) {
        this.setActive(k)
        this.$emit('change', { test: 'hh', categoryId: t.id, typeId: t.typeId })
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
    width: 93%;
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

  .van-hairline--bottom::after {
    border-bottom-width: 2rpx;
  }

  /*.van-hairline--top-bottom::after {*/
    /*border-width: 2rpx 0;*/
  /*}*/

  /*.van-hairline--surround::after {*/
    /*border-width: 2rpx;*/
  /*}*/

  .van-tabs {
    margin: 30rpx 0 20rpx;
    position: relative;
    -webkit-tap-highlight-color: transparent;
  }
  .Catalog{
    position: absolute;
    right: -35rpx;
    top: 50rpx;
    width: 120rpx;
    height: 48rpx ;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6rpx;
    /*background: #ffffff;*/
    /*border-left: 1rpx solid #cccccc;*/
    /*z-index: 100;*/
  }
  .tabs-wrap {
    top: 0;
    left: 0;
    right: 0;
    /*z-index: 99;*/
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

  }

  .van-tabs__nav--line {
    /*height: 100%;*/
    /*padding:0 20rpx;*/
    display: flex;
    text-align: center;
  }

  /*.van-tabs__nav--card {*/
    /*margin: 0 30rpx;*/
    /*border-radius: 4rpx;*/
    /*box-sizing: border-box;*/
    /*border: 2rpx solid #f44;*/
    /*height: 60rpx;*/
  /*}*/

  /*.van-tabs__nav--card .van-tab {*/
    /*color: #f44;*/
    /*border-right: 2rpx solid #f44;*/
    /*line-height: 46rpx;*/
  /*}*/

  /*.van-tabs__nav--card .van-tab:last-child {*/
    /*border-right: none;*/
  /*}*/

  /*.van-tabs__nav--card .van-tab.tab-active {*/
    /*color: #fff;*/
    /*background-color: #f44;*/
  /*}*/

  .van-tabs__line {
    z-index: 1;
    left: 0;
    bottom: 0;
    height: 4rpx;
    position: absolute;
    background-color: #f44;
  }

  .van-tabs--line {
    height: 150rpx;
    /*padding-top: 88rpx;*/
  }

  .van-tabs--line .tabs-wrap {
    height: 150rpx;
  }

  .van-tabs--card {
    padding-top: 60rpx;
  }

  .van-tabs--card .tabs-wrap {
    height: 150rpx;
  }

  .van-tab {
    //   -webkit-box-flex: 1;
    //   -webkit-flex: 1;
    //   flex: 1;
    //   cursor: pointer;
    padding: 0 10rpx;
    font-size: 28rpx;
    position: relative;
    color: #333;
    line-height: 88rpx;
    text-align: center;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    /*align-items: center;*/
    justify-content: center;
  }

  .van-tab span {
    display: block;
  }

  .tab-active {
    color: #4a90e2;
  }

  .van-tab--disabled {
    color: #c9c9c9;
  }

  .van-ellipsis{
    width: 120rpx;
    display: inline-block;
    text-align: center;
    .Simg{
      width: 100%;
      height: 87rpx;
      border-radius: 50%;
      text-align: center;
      img{
        width: 87rpx;
        height: 87rpx;
        border-radius: 50%;
        display: inline-block;
      }
    }
    .Stype{
      text-align: center;
      /*display: inline-block;*/
      font-size: 30rpx;
      color: #9B9B9B;
    }
  }
</style>
