<template>
  <div class="big-content-page">
    <div class="product-page">
      <div class="nav-control">
        <Searchbar :value="searchContent" :isFocus="isFocus" @cancel="cancel" @confirm="confirm" confirmType="search"></Searchbar>
        <wan-tabs @change='tabChange' :tabs="category"></wan-tabs>
      </div>
      <!--<div class="product-listA">-->
        <!--<div class="item-pro" v-for="(item,index) in productList" :key="index" @click="routeTo(item.id)">-->
          <!--<image class="pro-img" :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_350,h_350/quality,q_100'"-->
                 <!--mode="aspectFill"></image>-->
          <!--<p class="bot-des">{{item.name}}</p>-->
          <!--<div class="price-brow">-->
            <!--<p v-if="item.priceStatus!==0"><span>￥</span><span class="price">{{item.price}}</span></p>-->
            <!--<p class="box-brow"><i class="iconfont icon-view"></i><span>{{item.browseCount}}</span></p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="product-listB">-->
        <!--<div class="item-pro" v-for="(item,index) in productList" :key="index">-->
          <!--<button open-type="share" :data-item="item" class="share-btn">-->
              <!--<i @click="shareGoods" class="iconfont icon31zhuanfa"></i>-->
          <!--</button>-->
          <!--<p  @click="routeTo(item.id)">-->
            <!--<image class="pro-img" :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_350,h_350/quality,q_100'"-->
                   <!--mode="aspectFill"></image>-->
          <!--</p>-->
          <!--<p class="bot-des">{{item.name}}</p>-->
          <!--<div class="price-brow">-->
            <!--<p v-if="item.priceStatus!==0" class="price-brow-main"><span class="yang">￥</span><span class="price">{{item.price}}</span></p>-->
            <!--<p class="box-brow">-->
              <!--<span class="getMoney">赚</span>-->
              <!--<span class="Money">￥ 0.00</span>-->
            <!--</p>-->
          <!--</div>-->
          <!--<div class="look-Num">-->
            <!--<p class="browseCount"><i class="iconfont iconyanjing"></i><span class="num">浏览{{ item.browseCount}}次</span></p>-->
            <!--<p class="pushCount"><i class="iconfont iconfeiji1"></i><span class="num">已推299次</span></p>-->
          <!--</div>-->
          <!--<div class="purchase" @click="routeTo(item.id)">-->
            <!--<span>抢购</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div class="product-listC">
        <div class="item-pro" v-for="(item,index) in productList" :key="index">
          <image @click="routeTo(item.id)" class="pro-img" :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_350,h_350/quality,q_100'"
                 mode="aspectFill"></image>
          <p class="bot-des" @click="routeTo(item.id)">{{item.name}}</p>
          <div class="look-Num" @click="routeTo(item.id)">
            <p class="browseCount"><i class="iconfont iconyanjing"></i><span class="num">浏览{{ item.browseCount}}次</span></p>
            <p class="pushCount"><i class="iconfont iconfeiji1"></i><span class="num">已推299次</span></p>
          </div>
          <div class="price-brow" @click="routeTo(item.id)">
            <p v-if="item.priceStatus!==0" class="price-brow-main"><span class="yang">￥</span><span class="price">{{item.price}}</span></p>
            <p class="box-brow">
            <span class="getMoney">赚</span>
            <span class="Money">￥ 0.00</span>
            </p>
          </div>
          <div class="Forward">
            <button open-type="share" :data-item="item" class="share-btn">
            <i class="iconfont icon31zhuanfa"></i>
            </button>
          </div>
          <div class="purchase" @click="routeTo(item.id)">
            <span>抢购</span>
          </div>
        </div>
      </div>
      <!--<FloatBox :home="false" phone="value"></FloatBox>-->
    </div>
  </div>
</template>
<script>
  import { getExt } from '@/utils/index'
  import FloatBox from '@/components/floatBox'
  import tabs from '@/components/wan/tabs'
  import Searchbar from '@/components/searchBar'
  import product from '@/api/product'
  import personApi from '@/api/person'
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
        isFocus: false,
        apply: '',
        id: '',
        name: '',
        personApi: personApi
      }
    },

    components: {
      Searchbar,
      FloatBox,
      'wan-tabs': tabs
    },
    onLoad () {
      this.getCategory()
      this.getProduct({ type: 0 })
    },
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
    },
    // onLoad () {
    //   this.getCategory()
    //   this.getProduct({ type: 0 })
    // },
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
    methods: {
      cancel (val) {
        this.$nextTick(() => {
          this.isFocus = false
          this.searchContent = ''
          this.getProduct(0)
        })
      },
      //   分享
      // shareGoods () {
      //   wx.updateShareMenu({
      //     withShareTicket: true,
      //     success () { }
      //   })
      // },
      confirm (e) {
        this.searchContent = e.mp.detail.value
        this.isFocus = true
        this.getProduct(0)
      },
      routeTo (id) {
        this.insertOperaA('查看了产品', 3, id)
        wx.navigateTo({
          url: '../productA/detail/main?id=' + id
        })
      },
      // 插入雷达
      async insertOperaA (info, recordType, id) {
        const businessId = wx.getStorageSync('businessId')
        const salesmanId = wx.getStorageSync('salesmanId')
        const userId = wx.getStorageSync('userId')
        await personApi.OperationInsert({businessId: businessId, goodsId: id, info, recordType, salesmanId: salesmanId, userId: userId})
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
        console.log('productList', this.productList)
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
    position: fixed;
    top:0;
    background-color: #fff;
    padding-top: 60rpx;
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
  // 商品详情
  .product-listC {
    margin-top: 240rpx;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    font-size: 0;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: center;
    text-align: center;
    .item-pro {
      width: 694rpx;
      height: 200rpx;
      background-color: #fff;
      display: inline-block;
      margin: 30rpx auto 0;
      box-sizing: border-box;
      position: relative;
      z-index: 99;
      .pro-img {
        width: 200rpx;
        height: 200rpx;
        float: left;
      }
    }
    // 文字描述
    .bot-des {
      text-align: left;
      font-size: 24rpx;
      color: #4a4a4a;
      font-weight: 600;
      width: 400rpx;
      height: 60rpx;
      margin: 15rpx 15rpx;
      padding-left: 15rpx;
      display: inline-block;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .look-Num{
      font-size: 22rpx;
      margin: 10rpx 30rpx 10rpx 28rpx;
      color: #9d9d9d;
      display: block;
      text-align: left;
      .browseCount{
        display: inline-block;
        margin-right: 20rpx;
        margin-left: 15rpx;
        .iconyanjing{
          display: inline-block;
          color: #cccccc;
          font-size: 30rpx;
          margin-right: 10rpx;
        }
      }
      .pushCount{
        display: inline-block;
        .iconfeiji1{
          display: inline-block;
          color: #CCCCCC;
          font-size: 28rpx;
          margin-right: 10rpx;
        }
      }
    }
    .price-brow {
      font-size: 22rpx;
      display: block;
      margin: 10rpx 16rpx;
      color: #9d9d9d;
      text-align: left;
      .price-brow-main {
        float: left;
        margin: 10rpx 15rpx;
        .price {
          font-size: 28rpx;
          margin-left: 4rpx;
          color: #FE5250;
        }

        .yang {
          font-size: 22rpx;
          color: #FE5250;
          margin-left: 4 rpx;
        }
      }

      .box-brow {
        float: left;
        margin: 10rpx 5rpx;
        .getMoney {
          text-align: center;
          float: left;
          width: 43rpx;
          height: 35rpx;
          margin-left: 10rpx;
          background: #FF424E;
          color: #ffffff;
          font-size: 22rpx;
          border-top-left-radius: 10rpx;
          border-bottom-left-radius: 10rpx;
        }
        .Money {
          width: 108rpx;
          height: 30rpx;
          display: inline-block;
          text-align: center;
          border: 1rpx solid #FF424E;
          border-top-right-radius: 10rpx;
          border-bottom-right-radius: 10rpx;
        }
      }
    }
    // 转发
    .Forward{
      position: absolute;
      top: -20rpx;
      right: 0rpx;
      z-index: 9999;
      .share-btn{
        padding: 0rpx 20rpx;
        .icon31zhuanfa{
          color: #FF424E;
          z-index: 9999;
          font-size: 40rpx;
        }
      }
    }
    // 抢购
    .purchase{
      width: 100rpx;
      height: 38rpx;
      display: block;
      border: 1px solid #4A4A4A;
      color: #4A4A4A;
      position: absolute;
      right: 20rpx;
      bottom: 26rpx;
      border-radius: 10rpx;
      span{
        font-size:24rpx;
        width: 100%;
        height: 38rpx;
        line-height: 38rpx;
        color: #4A4A4A;
      }
    }
  }



  // 商品详情
  .product-listB {
    margin-top: 180rpx;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding: 20 rpx 8 rpx 0;
    font-size: 0;
    width: 100%;
    height: 100%;
    justify-items: center;
    align-items: center;
    text-align: center;
    .item-pro{
      width: 694rpx;
      height: 862rpx;
      background-color: #fff;
      display: inline-block;
      margin: 30rpx auto 0;
      box-sizing: border-box;
      position: relative;
      z-index: 99;
      .pro-img {
        width: 645rpx;
        height: 651rpx;
        margin: 20rpx;
      }
      .share-btn{
        position: absolute;
        right: 15rpx;
        top: -10rpx;
        .icon31zhuanfa{
          color: #eeeeee;
          z-index: 9999;
          padding: 10rpx 20rpx;
          font-size: 40rpx;
        }
      }
      // 文字描述
      .bot-des {
        text-align: left;
        font-size: 24rpx;
        color: #4a4a4a;
        width: 644rpx;
        height: 40rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin: 4rpx 25rpx 0;
      }
    }
    .price-brow {
      font-size: 22rpx;
      width: 662rpx;
      display: inline-block;
      margin: 10rpx 16rpx;
      color: #9d9d9d;
      .price-brow-main{
        margin-right: 50rpx;
        float: left;
        .price {
          font-size: 28rpx;
          margin-left: 4rpx;
          color: #FE5250;
        }
        .yang{
          font-size: 22rpx;
          color: #FE5250;
          margin-left: 4rpx;
        }
      }
      .box-brow{
        float: left;
        .getMoney{
          text-align: center;
          float: left;
          width: 43rpx;
          height: 35rpx;
          margin-left: 10rpx;
          background: #FF424E;
          color: #ffffff;
          font-size: 22rpx;
          border-top-left-radius: 10rpx;
          border-bottom-left-radius: 10rpx;
        }
        .Money{
          width: 108rpx;
          height: 30rpx;
          display: inline-block;
          text-align: center;
          border:1rpx solid #FF424E;
          border-top-right-radius: 10rpx;
          border-bottom-right-radius: 10rpx;
        }
      }
    }

    .look-Num{
      width: 634rpx;
      font-size: 22rpx;
      margin: 10rpx 30rpx 10rpx 28rpx;
      color: #9d9d9d;
      display: block;
      text-align: left;
      .browseCount{
        display: inline-block;
        margin-right: 20rpx;
        .iconyanjing{
          display: inline-block;
          color: #cccccc;
          font-size: 30rpx;
          margin-right: 10rpx;
        }
      }
      .pushCount{
        display: inline-block;
        .iconfeiji1{
          display: inline-block;
          color: #CCCCCC;
          font-size: 28rpx;
          margin-right: 10rpx;
        }
      }
    }
    // 抢购
    .purchase{
      width: 166rpx;
      height: 53rpx;
      border: 1px solid #4A4A4A;
      color: #4A4A4A;
      position: absolute;
      right: 52rpx;
      bottom: 45rpx;
      z-index: 99999;
      border-radius: 10rpx;
      span{
        font-size:26rpx;
        width: 100%;
        height: 53rpx;
        line-height: 53rpx;
        color: #4A4A4A;
      }
    }
  }
  // 商品列表
  .product-listA {
    margin-top: 180rpx;
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
