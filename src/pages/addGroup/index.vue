<template>
    <div class="addGroup">
      <div class="top">
        <div class="name">
          <span>名称</span>
          <input class="" placeholder="直接在这里输入">
        </div>
        <div class="headImage">
          <span >群头像</span>
          <p class="right">
            <img src="../../../static/images/addImage.jpg"/>
            <i class="iconfont iconyouce"></i>
          </p>
        </div>
        <div class="befie" @click="routeTo1(info)">
          <span>简介</span>
          <p class="right">
            去填写
            <i class="iconfont iconyouce"></i>
          </p>
        </div>
      </div>
      <!--群类型-->
      <div class="main">
        <div class="title">选择群类型</div>
        <div class="type">
          <div class="type-Main">
            <span :class="{'selected':tab === 1,'testTitle':true}"
                  @click="changTab(1)">企业通讯录</span>
            <span :class="{'selected':tab === 2,'testTitle':true}"
                  @click="changTab(2)">好友通讯录</span>
            <span :class="{'selected':tab === 3,'testTitle':true}"
                  @click="changTab(3)">亲友通讯录</span>
            <span :class=""
                  @click="routeTo(info)"> + 自定义类型</span>
          </div>
        </div>
      </div>
      <!--保存-->
      <div class="footer">
        <button class="save"><span>保存</span></button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        tab: 2
      }
    },
    methods: {
      changTab (index) {
        if (index === 1) {
          this.tab = index
          this.status = index
        } else if (index === 2) {
          this.tab = index
          this.status = index
        } else if (index === 3) {
          this.tab = index
          this.status = index
        } else {
          this.tab = index
          this.status = index
        }
      },
      routeTo (info) {
        wx.navigateTo({
          url: `../CustomType/main`
        })
      },
      routeTo1 (info) {
        wx.navigateTo({
          url: `../Introduction/main`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import "style.less";
</style>
