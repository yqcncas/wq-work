<template>
    <div class="main">
      <div class="choose">
        <div class="auto">
          <span class="moOne"  @click="choose(1)">
            <img class="img" src="https://oss.wq1516.com/salesInfo/201906241544401561362280530.png"/>
            <img v-if="CardId == 1" class="choose" src="../../../../static/images/chooseActive.png"/>
          </span>
          <span class="moTwo" @click="choose(2)">
            <img class="img" src="https://oss.wq1516.com/salesInfo/201906241544411561362281129.png"/>
            <img v-if="CardId == 2" class="choose" src="../../../../static/images/chooseActive.png"/>
          </span>
          <span class="moThere" @click="choose(3)">
            <img class="img" src="https://oss.wq1516.com/salesInfo/201906241544411561362281681.png"/>
            <img v-if="CardId == 3" class="choose" src="../../../../static/images/chooseActive.png"/>
          </span>
          <span class="moThere" @click="choose(4)">
            <img class="img" src="https://oss.tzyizan.com/salesInfo/201907110927291562808449037.png"/>
            <img v-if="CardId == 4" class="choose" src="../../../../static/images/chooseActive.png"/>
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
        CardId: 0
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
      },
      choose (id) {
        if (this.CardId !== id) {
          this.CardId = id
        } else {
          this.CardId = 0
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
