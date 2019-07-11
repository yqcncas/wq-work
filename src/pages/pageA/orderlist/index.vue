<template>
  <view class="order-page">
    <ul class="tab-box">
      <li v-for="(item,index) in category" :key="index" :class="{'active':typeId==item.typeId}" @click='tabChange(item.typeId)'>{{item.typeName}}</li>
    </ul>
    <div class="order-list">
      <div class="order-item" v-for="(item, index) of orderList" :key="item.id" :data-index="index">
        <div @click="routeTo(`../orderdetail/index?id=${item.id}`)">
          <p class="top-text">
            <span>{{item.buyDate}}</span>
            <span class="order-status">{{item.orderStatus}}</span>
          </p>
          <!-- 商品单个列表 -->
          <div v-for="(n,i) in item.orderDetail" :key="i" class="good-list">
            <image mode="aspectFill" :src="n.goodsImgUrl" class="img-style"></image>
            <div class="center-text">
              <p class="title-over">{{n.goodsName}}</p>
              <p class="model">{{n.goodsModelName||''}}</p>
            </div>
            <!-- 数量价格 -->
            <div class="right-box">
              <p><i class="font-size-22">￥</i>{{n.unitPrice}}</p>
              <p class="num"><span class="right-margin8">x</span><span>{{n.num}}</span></p>
            </div>
          </div>
          <!-- 总计 -->
          <p class="total-text"><span class="right-margin8">共计{{item.orderDetail.length}}件商品合计</span><span><i class="font-size-22">￥</i>{{item.totalFee}}</span></p>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==1">
          <button class="common-btn" @click="cancelOrder(item.id)">取消订单</button>
          <button class="common-btn blue-btn" @click="payOrder(item.payInfo,item.totalFee,item.goodsModelId[0].goodsId)">去付款</button>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==2">
          <button class="common-btn blue-btn" @click="routeTo(`../refund/index?id=${item.id}`)">退款</button>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==3">
          <button class="common-btn" @click="routeTo(`../refund/index?id=${item.id}`)">退款</button>
          <button class="common-btn" @click="routeTo(`../logistics/index?id=${item.id}`)">追踪物流</button>
          <button class="common-btn blue-btn" @click="confirmReceipt(item.outTradeNo)">确认收货</button>
        </div>
        <!-- <div class="btn-box" v-if="item.orderStatusId==2">
          <button class="common-btn blue-btn">提醒发货</button>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==6">
          <button class="common-btn blue-btn">去评价</button>
        </div> -->
      </div>
    </div>
  </view>
</template>

<script>
import apiOrder from '@/api/cart'
import personApi from '@/api/person'
export default {
  data () {
    return {
      category: [
        {
          typeName: '全部',
          typeId: 0
        }, {
          typeName: '待付款',
          typeId: 1
        }, {
          typeName: '待发货',
          typeId: 2
        }, {
          typeName: '待收货',
          typeId: 3
        }, {
          typeName: '待评价',
          typeId: 6
        }],
      typeId: 0,
      orderList: [],
      typeName: '',
      pageNum: 1,
      lastPage: 100,
      nextPage: 1,
      pageSize: 6
    }
  },
  onShow () {
  },
  onLoad (option) {
    if (option) {
      this.typeId = option.typeId
      this.getOrderList()
    } else {
      this.typeId = 0
      this.getOrderList()
    }
  },
  methods: {
    routeTo (url) {
      wx.navigateTo({
        url
      })
    },
    // 确认收货
    async confirmReceipt (outTradeNo) {
      await apiOrder.updateOrderStatus({ outTradeNo, orderStatusId: 6 })
      this.getOrderList()
    },
    async cancelOrder (id) {
      await apiOrder.deleteOrder({ id })
      this.pageNum = 1
      this.getOrderList()
    },
    // 插入雷达
    async insertOpera (info, recordType, goodsId) {
      let businessId = wx.getStorageSync('businessId')
      let salesmanId = wx.getStorageSync('salesManId')
      let userId = wx.getStorageSync('userId')
      await personApi.OperationInsert({ businessId, goodsId, info, recordType, salesmanId, userId })
    },
    // 付钱
    payOrder (Info, fee, goodsId) {
      const payInfo = JSON.parse(Info)
      wx.requestPayment(
        {
          'timeStamp': payInfo.timeStamp,
          'nonceStr': payInfo.nonceStr,
          'package': payInfo.packageValue,
          'signType': 'MD5',
          'paySign': payInfo.paySign,
          'success': (res) => {
            // this.insertOpera('支付了产品', 6, goodsId)
            wx.redirectTo({ url: `../payfinish/index?price=${fee}&status=success` })
          },
          'fail': function (res) {
            wx.redirectTo({ url: `../payfinish/index?price=${fee}&status=fail` })
          },
          'complete': function (res) {
          }
        })
    },
    // 获取订单数据
    async getOrderList () {
      const res = await apiOrder.orderByStatus({ status: this.typeId, pageNum: this.pageNum, pageSize: this.pageSize })

      res.data.list.map(item => {
        item.buyDate = this.moment(item.buyDate).format('YYYY-MM-DD HH:mm:ss')
        item.totalFee = (+item.totalFee).toFixed(2)
        item.orderDetail.map(n => {
          n.unitPrice = (+n.unitPrice).toFixed(2)
        })
      })
      if (this.pageNum === 1) {
        this.orderList = res.data.list
      } else {
        this.orderList = this.orderList.concat(res.data.list)
      }

      this.lastPage = res.data.lastPage
      this.pageNum = res.data.pageNum
      this.nextPage = res.data.nextPage
    },
    // 滚动bar，可以根据类别来查找每一类商品
    tabChange (id) {
      this.pageNum = 1
      this.typeId = id
      this.getOrderList()
    }
  },
  // 上拉加载
  async onReachBottom () {
    if (this.pageNum < this.lastPage) {
      this.pageNum = this.nextPage
      this.getOrderList()
    } else {
      wx.showToast({
        title: '没有更多了',
        icon: 'none',
        duration: 2000
      })
    }
  },
  // 下拉刷新
  async onPullDownRefresh () {
    this.pageNum = 1
    await this.getOrderList()
    // 停止下拉刷新
    await wx.stopPullDownRefresh()
  }
}
</script>
<style scoped lang="scss">
%flexRow {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
}
.right-margin8 {
  margin-right: 10rpx;
}
.font-size-22 {
  font-size: 22rpx;
  display: inline-block;
}
.order-page {
  height: 100%;
  width: 100%;
  background: #f0eff5;
  .tab-box {
    width: 100%;
    background-color: #f9f9f9;
    color: #9b9b9b;
    font-size: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    position: fixed;
    top: 0;
    z-index: 1000;
    li {
      display: inline-block;
      width: 20%;
      text-align: center;
    }
    .active {
      color: #4a90e2;
    }
  }
}
/* tab */
.order-list {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 112rpx 25rpx;
  box-sizing: border-box;
  .order-item {
    width: 700rpx;
    // min-height: 440rpx;
    background-color: #fff;
    border-radius: 8rpx;
    margin-top: 20rpx;
    box-sizing: border-box;
    padding: 26rpx 24rpx 23rpx;
    font-size: 28rpx;
    color: #9b9b9b;
    .top-text {
      @extend %flexRow;
      justify-content: space-between;
    }
    .order-status {
      color: #4a90e2;
    }
  }
}
//   商品list
.good-list {
  margin-top: 22rpx;
  @extend %flexRow;
  align-items: flex-start;
  .img-style {
    width: 180rpx;
    height: 180rpx;
    border-radius: 6rpx;
    border: 2rpx solid #ddd;
    box-sizing: border-box;
    margin-right: 22rpx;
  }
  //   商品名称
  .center-text {
    font-size: 26rpx;
  }
  .title-over {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    width: 270rpx;
    color: #4a4a4a;
    min-height: 128rpx;
  }
  .model {
    margin-top: 10rpx;
  }
  .right-box {
    flex: 1;
    text-align: right;
    .num {
      margin-top: 8rpx;
    }
  }
}
.total-text {
  text-align: right;
  margin-top: 10rpx;
}
// 按钮
.btn-box {
  text-align: right;
  margin-top: 34rpx;
}
.common-btn {
  width: 155rpx;
  height: 53rpx;
  border-radius: 10rpx;
  border: 2rpx solid #ddd;
  font-size: 24rpx;
  background-color: #fff;
  padding: 0;
  line-height: 48rpx;
  color: #9b9b9b;
  display: inline-block;
  margin-left: 28rpx;
  &::after {
    border: none;
  }
}
.blue-btn {
  color: #2a94ec;
  border-color: #2a94ec;
}
</style>
