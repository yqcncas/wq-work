<template>
  <div class="big-content-page">
    <div class="product-page">
      <div class="nav-control">
        <!--<Searchbar :value="searchContent" :isFocus="isFocus" @cancel="cancel" @confirm="confirm" confirmType="search"></Searchbar>-->
        <wan-tabs @change='tabChange' :tabs="category"></wan-tabs>
      </div>
      <div class="product-list">
        <div class="item-pro" v-for="(item,index) in productList" :key="index" @click="routeTo(item.id)">
          <image class="pro-img" :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_350,h_350/quality,q_100'"
                 mode="aspectFill"></image>
          <p class="bot-des">{{item.name}}</p>
          <div class="price-brow">
            <p v-if="item.priceStatus!==0"><span>￥</span><span class="price">{{item.price}}</span></p>
            <p class="box-brow"><i class="iconfont icon-view"></i><span>{{item.browseCount}}</span></p>
          </div>
        </div>
      </div>
      <!--<FloatBox :home="false" phone="value"></FloatBox>-->
      <!--<CustomTabbar url="/pages/product/index"></CustomTabbar>-->
    </div>
  </div>
</template>
<script>
  import CustomTabbar from '@/components/customTabbar'
  import { getExt } from '@/utils/index'
  import FloatBox from '@/components/floatBox'
  import tabs from '@/components/wan/tabs'
  import Searchbar from '@/components/searchBar'
  import product from '@/api/product'
  export default {
    data () {
      return {
        category: [],
        categoryId: '',
        productList: [],
        pageNum: 1,
        lastPage: 100,
        nextPage: 1,
        pageSize: 6,
        searchContent: '',
        isFocus: false
      }
    },

    components: {
      Searchbar,
      FloatBox,
      'wan-tabs': tabs,
      CustomTabbar
    },

    methods: {
      cancel (val) {
        console.log(val)
        this.$nextTick(() => {
          this.isFocus = false
          this.searchContent = ''
          this.getProduct(0)
        })
      },
      confirm (e) {
        this.searchContent = e.mp.detail.value
        this.isFocus = true
        this.getProduct(0)
      },
      routeTo (id) {
        wx.navigateTo({
          url: `../product/detail/index?id=${id}`
        })
      },
      // 得到商品的列表
      async getProduct ({ type = 0, name = '' }) {
        let businessId = getExt().shopId
        const result = await product.getProduct({ businessId, pageNum: this.pageNum, pageSize: this.pageSize, type: this.categoryId, name: this.searchContent })
        result.data.list.map(item => {
          item.price = item.price ? item.price.toFixed(2) : ''
        })
        let productData = result.data
        if (type === 0) {
          this.productList = productData.list
        } else {
          productData.list.forEach(e => {
            this.productList.push(e)
          })
        }
        this.lastPage = productData.lastPage
        this.pageNum = productData.pageNum
        this.nextPage = productData.nextPage
      },
      // 得到商品种类
      async getCategory () {
        let businessId = getExt().shopId
        const result = await product.getCategory({ businessId })
        const category = result.data
        category.unshift({
          business_id: businessId,
          id: '',
          typeId: 0,
          typeName: '全部'
        })
        this.category = category
      },
      // 滚动bar，可以根据类别来查找每一类商品
      tabChange (obj) {
        this.pageNum = 1
        wx.pageScrollTo({
          scrollTop: 0
        })
        this.categoryId = obj.categoryId
        this.getProduct(0)
      }
    },
    onLoad () {
      this.getCategory()
      this.getProduct({ type: 0 })
    },
    onShow () {
      // wx.hideTabBar()
    },
    // onShareAppMessage () {
    //   let companyName = wx.getStorageSync('companyName')
    //   return {
    //     title: companyName,
    //     path: 'pages/loading/index?fromWay=1&param=product'
    //
    //   }
    // },
    // 上拉加载
    async onReachBottom () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.getProduct({ type: 1 })
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    },
    async onPullDownRefresh () {
      this.pageNum = 1
      this.getProduct({ type: 0 })
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    }
  }
</script>

<style lang="scss">
  %flexRow {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
  .product-page {
    width: 100%;
    min-height: 100%;
    background-color: #f0eff5;
    box-sizing: border-box;
    padding-bottom: 48px;
  }
  .nav-control {
    width: 100%;
    z-index: 1000;
    .weui-search-bar {
      border-color: #eee;
      background-color: #fff;
      border: none;
    }
    .weui-search-bar__label {
      font-size: 0;
      background-color: #f0eff5;
    }
    .weui-search-bar__box {
      background-color: #f0eff5;
    }
    .weui-search-bar__cancel-btn {
      font-size: 28rpx;
      color: #2a94ec;
    }
    .weui-search-bar__form {
      border: 0;
      border-radius: 100rpx;
      overflow: hidden;
    }
    .weui-icon-search {
      font-size: 42rpx;
    }
    //   种类
    .van-tabs__nav--line .van-ellipsis {
      color: #9b9b9b;
      white-space: nowrap;
    }
    .tab-active .van-ellipsis {
      color: #4a90e2;
    }
    .weui-search-bar__input {
      color: #9b9b9b;
    }
    .van-hairline--bottom::after,
    .van-hairline--left::after,
    .van-hairline--right::after,
    .van-hairline--surround::after,
    .van-hairline--top-bottom::after,
    .van-hairline--top::after,
    .van-hairline::after {
      border: none;
    }
  }
  // 商品列表
  .product-list {
    /*margin-top: 180rpx;*/
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 20rpx 8rpx 0;
    font-size: 0;
    .item-pro {
      width: 362rpx;
      height: 490rpx;
      background-color: #fff;
      display: inline-block;
      margin-bottom: 24rpx;
      box-sizing: border-box;
      font-size: 0;
      .pro-img {
        width: 350rpx;
        height: 350rpx;
        margin: 6rpx;
      }
      &:nth-child(2) {
        margin-left: 10rpx;
        margin-top: 10rpx;
      }
      &:nth-child(2n) {
        margin-left: 10rpx;
      }
      // 文字描述
      .bot-des {
        font-size: 24rpx;
        color: #4a4a4a;
        width: 330rpx;
        height: 72rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 4rpx auto 0;
      }
      // 价格浏览
      .price-brow {
        font-size: 22rpx;
        @extend %flexRow;
        padding: 0 16rpx;
        color: #9d9d9d;
      }
      .price {
        font-size: 28rpx;
        margin-left: 4rpx;
      }
      .box-brow {
        @extend %flexRow;
      }
      .icon-view {
        line-height: 32rpx;
        margin-right: 10rpx;
        font-size: 32rpx;
      }
    }
  }
</style>
