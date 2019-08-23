<template>
    <div class="Group">
      <div class="Top" @click = "getInto">
         <i class="iconfont iconaddgrey"></i>
      </div>
      <div class="testNav">
        <div
          :class="{'selected':tab === 1,'testTitle':true}"
          @click="changTab(1)"
        >已上架</div>
        <div
          :class="{'selected':tab === 2,'testTitle':true}"
          @click="changTab(2)"
        >已下架</div>
        <div
          :class="{'selected':tab === 3,'testTitle':true}"
          @click="changTab(3)"
        >我的推荐</div>
      </div>
      <div class="content" v-if="prolength!== 0" >
          <!--<div class="title"  v-if="prolength!== 0">共{{prolength}}款产品</div>-->
        <div class="product" v-if="tab === 1">
          <div class="manage" v-for="(item, index) in productsA" :key="index">
          <div class="main">
            <span class="img">
              <img :src="item.imgUrl" @click="modify(item.id)">
              <i class="iconfont iconshanchu-copy" @click="deleteA(item.id, 0)"></i>
            </span>
              <p class="text">{{ item.name }}</p>
              <p class="introduce">￥{{ item.price }}</p>
              <div class="bt">
                <button class="btA" @click="downStatus(item.id)">下架</button>
                <!--<button class="btB">推荐</button>-->
              </div>
            </div>
          </div>
        </div>
        <div class="product" v-else-if="tab === 2">
          <div class="manage" v-for="(item, index) in productsB" :key="index">
            <div class="main">
            <span class="img">
              <img :src="item.imgUrl" @click="modify(item.id)">
               <i class="iconfont iconshanchu-copy" @click="deleteA(item.id, 1)"></i>
            </span>
              <p class="text">{{ item.name }}</p>
              <p class="introduce">￥{{ item.price }}</p>
              <div class="bt">
                <button class="btA" @click="upStatus(item.id)">上架</button>
                <!--<button class="btB">推荐</button>-->
              </div>
            </div>
          </div>
        </div>
        <div class="product" v-else-if="tab === 3">
          <div class="manage" v-for="(item, index) in productsC" :key="index">
            <div @click="modify(item.id)" class="main">
            <span class="img">
              <img :src="item.imgUrl">
            </span>
              <p class="text">{{ item.name }}</p>
              <p class="introduce">￥{{ item.price }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="info">
        暂无该类别产品信息
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
        productsA: [],
        productsB: [],
        productsC: [],
        statsC: [],
        status: '',
        tab: 1,
        tabA: 0,
        tabB: 0
        // postForm: '',
        // tagList: [],
        // pageNumA: 1,
        // lastPageA: '',
        // nextPageA: '',
        // pageNumB: 1,
        // lastPageB: '',
        // nextPageB: '',
        // pageNumC: 1,
        // lastPageC: '',
        // nextPageC: ''
      }
    },
    onShow () {
      this.changTab(1)
    },
    methods: {
      // 删除
      deleteA (id, num) {
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformGoods/delete',
          body: {
            'id': id
          }
        }).then(res => {
          if (res.code === 200) {
            if (num === 0) {
              this.getInfoA(1)
            } else if (num === 1) {
              this.getInfoB(0)
            }
            console.log('id', res)
          }
          // console.log(res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 上架
      upStatus (id) {
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformGoods/updateStatus',
          body: {
            'status': 1,
            'id': id
          }
        }).then(res => {
          if (res.code === 200) {
            this.getInfoB(0)
          }
          // console.log(res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 下架
      downStatus (id) {
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformGoods/updateStatus',
          body: {
            'status': 0,
            'id': id
          }
        }).then(res => {
          if (res.code === 200) {
            this.getInfoA(1)
          }
          // console.log(res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 选择
      changTab (index) {
        if (index === 1) {
          this.getInfoA(1)
          this.tab = index
          this.status = index
        } else if (index === 2) {
          this.getInfoB(0)
          this.tab = index
          this.status = index
        } else if (index === 3) {
          this.getInfoC(1)
          this.tab = index
          this.status = index
        }
      },
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
      getInfoA (id) {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const salesmanId = wx.getStorageSync('salesmanId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformGoods/getAllGoodsByUserId',
          body: {
            'businessId': businessId,
            'salesmanId': salesmanId,
            'status': id
          }
        }).then(res => {
          if (res.code === 200) {
            this.productsA = res.data.list
            this.prolength = res.data.list.length
          }
          // console.log(res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      getInfoB (id) {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const salesmanId = wx.getStorageSync('salesmanId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformGoods/getAllGoodsByUserId',
          body: {
            'businessId': businessId,
            'salesmanId': salesmanId,
            'status': id
          }
        }).then(res => {
          if (res.code === 200) {
            this.productsB = res.data.list
            this.prolength = res.data.list.length
          }
          // console.log(res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      getInfoC (id) {
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
            // this.productsC = res.data.list
            this.prolength = this.productsC.length
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
