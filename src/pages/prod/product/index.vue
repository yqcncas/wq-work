<template>
    <div class="Group">
      <div class="Top" @click = "getInto">
        <div class="main" >
          <span class="add"><img src="../../../../static/images/add.png"/></span>
          <span class="title">添加产品</span>
        </div>
      </div>
      <div class="content">
          <div class="title"  v-if="prolength!== 0">共{{prolength}}款产品</div>
          <div class="product" v-if="prolength!==0" >
            <div class="manage" v-for="(item, index) in products" :key="index">
            <div @click="modify(item.id)">
            <span class="img">
              <img :src="item.goodsImgUrlList[id].imgUrl">
            </span>
              <p class="text">{{ item.name }}</p>
              <p class="introduce">{{ item.price }}</p>
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
        id: 0,
        prolength: '',
        products: []
      }
    },
    onShow () {
      this.getInfo()
    },
    methods: {
      // 添加产品跳转
      getInto (e) {
        wx.navigateTo({
          url: `../addProduct/main?add=1`
        })
      },
      // 编辑产品跳转
      modify (id) {
        wx.navigateTo({
          url: `../addProduct/main?id=` + id + '&edit=1'
        })
      },
      // 加载产品列表
      getInfo (e) {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const salesmanId = wx.getStorageSync('salesmanId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformGoods/getAllGoodsByUserId',
          body: {
            'businessId': businessId,
            'salesmanId': salesmanId
          }
        }).then(res => {
          if (res.code === 200) {
            this.products = res.data.list
            this.prolength = res.data.list.length
          }
          // console.log(res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import "style";
</style>
