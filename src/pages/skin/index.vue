<template>
    <div class="main">
      <div class="choose">
        <div class="auto">
          <span class="moOne"  @click="choose(1)">
            <img src="https://oss.wq1516.com/salesInfo/201906241544401561362280530.png"/>
          </span>
          <span class="moTwo" @click="choose(2)">
            <img src="https://oss.wq1516.com/salesInfo/201906241544411561362281129.png"/>
          </span>
          <span class="moThere" @click="choose(3)">
            <img src="https://oss.wq1516.com/salesInfo/201906241544411561362281681.png"/>
          </span>
        </div>
      </div>
      <div class="fotter" @click="goMai">
        <button>200元购买（会员价196）</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
      }
    },
    methods: {
      // 返回上一页
      goMai () {
        wx.showToast({
          title: '功能还在开发中哦',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
