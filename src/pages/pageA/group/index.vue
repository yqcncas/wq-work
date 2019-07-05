<template>
    <div class="Group">
      <div class="Top">
        <div class="main" @click="routerTo">
          <span class="add"><img src="../../../../static/images/add.png"/></span>
          <span class="title">创建群名片</span>
        </div>
      </div>
      <div class="content">
        <div class="title" v-if="Groups">已加入的群</div>
        <div class="card" v-for="(item,index) in Groups" :key="index">
          <div class="subject">
              <span class="headImage"><img :src="item.src"></span>
            <div class="con">
              <div class="GroupName">{{ item.name }}</div>
              <div class="Icont">
                <span class="number">{{ item.number }}位成员</span>
                <span class="attribute">{{ item.attribute }}</span>
              </div>
              <div class="brief">
                简介:   <span class="center">{{ item.center }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    name: 'index',
    data () {
      return {
        Groups: [{
          src: '../../../static/images/tiangou.jpg',
          name: '今天你吃了吗',
          number: '3',
          attribute: '公司通讯录',
          center: '大家好这是我们的日常聊天互骚群，欢迎各位加入'
        }, {
          src: '../../../static/images/tiangou.jpg',
          name: '今天你吃了吗',
          number: '3',
          attribute: '公司通讯录',
          center: '大家好这是我们的日常聊天互骚群，欢迎各位加入'
        }]
      }
    },
    methods: {
      routerTo (url) {
        wx.navigateTo({
          url: '../addGroup/main'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./style";
</style>
