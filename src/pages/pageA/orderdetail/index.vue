<template>
  <div class="order-page info-order-page">
    <!-- 订单信息 -->
    <div class="order-info-box">
      <p>
        <span>订单编号</span>
        <span>{{order_sn}}</span>
      </p>
      <p>
        <span>创建时间</span>
        <span>{{addtime}}</span>
      </p>
      <p>
        <span>订单状态</span>
        <span>{{order_status_text}}</span>
      </p>
    </div>
    <!-- 地址 -->
    <div class="address-per">
      <i class="iconfont icon-location"></i>
      <div class="center-address">
        <p class="name-phone">
          <span>{{name}}</span>
          <span>{{mobile}}</span>
        </p>
        <div class="detail-box">
          <p class="address-detail">{{address}}</p>
        </div>
      </div>
    </div>
    <!-- 商品列表 -->
    <div class="good-s-list">
      <div class="list-item" v-for="(item,index) in orderGoods" :key="index" @click="toRoute('/pages/product/detail/index',item.goodsId)">
        <image mode="aspectFill" class="img-h" :src="item.goodsImgUrl"></image>
        <div class="center-good">
          <p class="name">{{item.goodsName}}</p>
          <p class="model">{{item.goodsModelName||''}}</p>
          <p class="num">数量×{{item.num}}</p>
        </div>
        <p class="price">￥{{item.unitPrice}}</p>
      </div>
    </div>
    <!-- 运费合计 -->
    <div class="total-money">
      <p>
        <span>运费</span>
        <span class="des-color">包邮</span>
      </p>
      <p>
        <span>合计</span>
        <span class="money-color">￥{{actual_price}}</span>
      </p>
    </div>
    <!-- 备注 -->
    <div class="remark-box remark-des" v-if="remarks">
      <span>备注</span>
      <span class="txt">{{remarks}}</span>
    </div>
    <!-- 按钮组 -->
    <div class="btn-group" v-if="orderStatusId==1||orderStatusId==3||orderStatusId==2">
      <div class="box" v-if="orderStatusId==1">
        <button class="common-btn" @click="cancelOrder">取消订单</button>
        <button class="common-btn blue-btn" @click="payOrder">去付款</button>
      </div>
      <div class="box" v-else-if="orderStatusId==3">
        <button class="common-btn" @click="routeTo(`../refund/index?id=${orderId}`)">退款</button>
        <button class="common-btn" @click="routeTo(`../logistics/index?id=${orderId}`)">追踪物流</button>
        <button class="common-btn blue-btn" @click="confirmReceipt">确认收货</button>
      </div>
      <div class="box" v-if="orderStatusId==2">
        <button class="common-btn blue-btn" @click="routeTo(`../refund/index?id=${orderId}`)">退款</button>
      </div>
    </div>
  </div>
</template>

<script>
import orderApi from '@/api/cart'
import personApi from '@/api/person'
export default {
  onLoad (options) {
    this.orderId = options.id
    this.getOrderDetail()
  },
  onShow () {
  },
  data () {
    return {
      userId: '',
      formId: '',
      refundReason: '',
      reason: false,
      refund: false,
      package: '',
      nonceStr: '',
      timeStamp: '',
      paySign: '',
      signType: '',
      name: '',
      mobile: '',
      address: '',
      orderId: 0,
      add_time: '',
      minute: '',
      second: '',
      addtime: '',
      order_sn: '',
      actual_price: '',
      order_status_text: '',
      orderGoods: [],
      orderStatusId: null,
      remarks: ''
    }
  },
  methods: {
    routeTo (url) {
      wx.navigateTo({
        url
      })
    },
    // 确认收货
    async confirmReceipt () {
      await orderApi.updateOrderStatus({ outTradeNo: this.order_sn, orderStatusId: 6 })
      wx.navigateBack()
    },
    // 插入雷达
    async insertOpera (info, recordType) {
      let businessId = wx.getStorageSync('businessId')
      let salesmanId = wx.getStorageSync('salesManId')
      let userId = wx.getStorageSync('userId')
      await personApi.OperationInsert({ businessId, goodsId: this.orderGoods[0].goodsId, info, recordType, salesmanId, userId })
    },
    toRoute (urls, id) {
      let url = urls
      if (id) {
        url = `${urls}?id=${id}`
      }
      wx.navigateTo({
        url
      })
    },
    // 付钱
    payOrder () {
      wx.requestPayment(
        {
          'timeStamp': this.timeStamp,
          'nonceStr': this.nonceStr,
          'package': this.packageValue,
          'signType': 'MD5',
          'paySign': this.paySign,
          'success': (res) => {
            wx.showToast({
              title: '支付成功', // 提示的内容,
              icon: 'none', // 图标,
              duration: 1500, // 延迟时间,
              mask: false, // 显示透明蒙层，防止触摸穿透,
              success: res => {
                // this.insertOpera('支付了产品', 6)
                const url = '../payfinish/main'
                wx.navigateTo({ url })
              }
            })
          },
          'fail': function (res) {
            wx.showToast({
              title: '支付失败', // 提示的内容,
              icon: 'none', // 图标,
              duration: 1500, // 延迟时间,
              mask: false, // 显示透明蒙层，防止触摸穿透,
              success: res => { }
            })
          },
          'complete': function (res) {
          }
        })
    },
    // 获取订单数据
    async getOrderDetail () {
      const { data } = await orderApi.selectDeTailOrderInfo({ id: this.orderId })

      this.userId = data.userId
      data.orderDetailList.map(item => {
        item.unitPrice = item.unitPrice.toFixed(2)
      })
      this.orderGoods = data.orderDetailList
      this.add_time = data.buyDate
      this.addtime = this.moment(data.buyDate).format('YYYY-MM-DD HH:mm')
      this.order_sn = data.outTradeNo
      this.actual_price = data.totalFee.toFixed(2)
      this.order_status_text = data.orderStatus
      this.orderStatusId = data.orderStatusId
      const mmss = ['已付款,未发货', '已发货,未取货', '已取货'].indexOf(this.order_status_text) > -1
      this.refund = mmss
      this.name = data.userName
      this.mobile = data.phone
      this.remarks = data.remarks
      this.address = data.orderAddress + (data.addressDetail || '')
      this.nonceStr = JSON.parse(data.payInfo).nonceStr
      this.packageValue = JSON.parse(data.payInfo).packageValue
      this.paySign = JSON.parse(data.payInfo).paySign
      this.signType = JSON.parse(data.payInfo).signType
      this.timeStamp = JSON.parse(data.payInfo).timeStamp
    },
    async cancelOrder () {
      await orderApi.deleteOrder({ id: this.orderId })
      wx.navigateBack()
    }
  }
}
</script>
<style lang='scss'>
@import "../order/style";
%flexCloCenter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.info-order-page {
  padding: 30rpx 0 120rpx;
}
.order-info-box {
  @extend %widthBg;
  height: 180rpx;
  padding: 0 30rpx;
  margin-bottom: 30rpx;
  font-size: 26rpx;
  color: #676767;
  @extend %flexCloCenter;
  line-height: 1.8;

  p {
    width: 100%;
    @extend %flexDisplay;
    justify-content: space-between;
  }
}
// 备注
.remark-des {
  align-items: flex-start;
  height: inherit;
  padding: 30rpx;
  .txt {
    color: #9b9b9b;
    margin-left: 18rpx;
    flex: 1;
  }
}
// 按钮组
.btn-group {
  @extend %widthBg;
  height: 90rpx;
  box-shadow: 0 0 10rpx 0 rgba(188, 188, 188, 0.35);
  position: fixed;
  bottom: 0;
  line-height: 90rpx;
  text-align: right;
  .box {
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
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
    margin-right: 30rpx;
    &::after {
      border: none;
    }
  }
  .blue-btn {
    color: #2a94ec;
    border-color: #2a94ec;
  }
}
</style>
