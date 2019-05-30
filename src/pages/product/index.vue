<template>
    <div class="Group">
      <div class="Top" @click = "getInto">
        <div class="main" >
          <span class="add"><img src="../../../static/images/add.png"/></span>
          <span class="title">添加产品</span>
        </div>
      </div>
      <div class="content">
        <div class="title" v-if="products">共1款产品</div>
        <div class="product"  v-if="products">
          <div class="manage" v-for="(item, index) in products" :key="index">
            <span class="img">
              <img :src="item.src">
            </span>
            <p class="text">{{ item.product }}</p>
            <p class="introduce">{{ item.introduce }}</p>
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
          src: '../../static/images/tiangou.jpg',
          name: '今天你吃了吗',
          number: '3',
          attribute: '公司通讯录',
          center: '大家好这是我们的日常聊天互骚群，欢迎各位加入'
        }, {
          src: '../../static/images/tiangou.jpg',
          name: '今天你吃了吗',
          number: '3',
          attribute: '公司通讯录',
          center: '大家好这是我们的日常聊天互骚群，欢迎各位加入'
        }],
        products: [
          {
            src: '../../static/images/tiangou.jpg',
            product: '系统产品',
            introduce: '产品介绍'
          }
        ]
      }
    },
    methods: {
      getInto (e) {
        wx.navigateTo({
          url: `../addProduct/main`
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./style";
</style>
