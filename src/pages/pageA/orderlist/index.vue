<template>
  <view class="order-page">
    <ul class="tab-box">
      <li v-for="(item,index) in category" :key="index" :class="{'active':typeId==item.typeId}" @click='tabChange(item.typeId)'>{{item.typeName}}</li>
    </ul>
    <ul class="tab-boxA" v-if="typeId == 2">
      <li v-for="(item,index) in categoryA" :key="index" :class="{'active':typeIdA==item.typeId}" @click='tabChangeA(item.typeId)'>{{item.typeName}}</li>
    </ul>
    <ul class="tab-boxA" v-if="typeId == 3">
      <li v-for="(item,index) in categoryB" :key="index" :class="{'active':typeIdB==item.typeId}" @click='tabChangB(item.typeId)'>{{item.typeName}}</li>
    </ul>
    <ul class="tab-boxA" v-if="typeId == 8">
      <li v-for="(item,index) in categoryC" :key="index" :class="{'active':typeIdC==item.typeId}" @click='tabChangC(item.typeId)'>{{item.typeName}}</li>
    </ul>
    <div :class="{'order-listA':typeId== 2 || typeId == 3 || typeId== 8, 'order-list': typeId !== 2 && typeId !== 3 && typeId !== 8}">
      <!--<div class="order-list">-->
      <div class="order-item" v-for="(item, index) of orderList" :key="item.id" :data-index="index">
        <div @click="routeTo(`../orderdetail/main?id=${item.id}`)">
          <p class="top-text">
            <span>{{item.buyDate}}</span>
            <span class="order-status">{{item.orderStatus}}</span>
          </p>
          <!-- 商品单个列表 -->
          <div v-if="item.orderDetail.length !== 0" v-for="(n,i) in item.orderDetail" :key="i" class="good-list">
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
          <div  v-if="item.orderDetail.length == 0" class="good-list">
            <div class="center-text">
              <p class="title-over">{{item.orderName}}</p>
            </div>
          </div>
          <!-- 总计 -->
          <p class="total-text"><span class="right-margin8">共计{{item.orderDetail.length}}件商品合计</span><span><i class="font-size-22">￥</i>{{item.totalFee}}</span></p>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==1">
          <button class="common-btn" @click="cancelOrder(item.id)">取消订单</button>
          <button class="common-btn blue-btn" @click="payOrder(item.payInfo,item.totalFee)">去付款</button>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==2">
          <div v-if="typeStaus=== 0">
            <button class="common-btn blue-btn" @click="routeTo(`../refund/main?id=${item.id}`)">退款</button>
          </div>
          <div v-else>
            <button class="common-btn blue-btn" @click="GoshowPopup(item.id, item.outTradeNo)">发货</button>
          </div>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==3">
          <div v-if="typeStaus=== 0">
            <button class="common-btn" @click="routeTo(`../refund/main?id=${item.id}`)">退款</button>
            <button class="common-btn" @click="routeTo(`../logistics/main?id=${item.id}`)">追踪物流</button>
            <button class="common-btn blue-btn" @click="confirmReceipt(item.outTradeNo)">确认收货</button>
          </div>
          <div v-else>
            <button class="common-btn" @click="routeTo(`../logistics/main?id=${item.id}`)">追踪物流</button>
          </div>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==8">
          <div v-if="typeStaus=== 1">
            <button v-if="item.refund == 0" class="common-btn" @click="madeRefun(item.outTradeNo,index)">确认退款</button>
            <button v-else class="common-btn" @click="RefundTime">退款中</button>
          </div>
        </div>
        <!--<div class="btn-box" v-if="item.orderStatusId==3">-->
          <!--<button class="common-btn" @click="routeTo(`../logistics/main?id=${item.id}`)">追踪物流</button>-->
        <!--</div>-->

        <!-- <div class="btn-box" v-if="item.orderStatusId==2">
          <button class="common-btn blue-btn">提醒发货</button>
        </div>
        <div class="btn-box" v-if="item.orderStatusId==6">
          <button class="common-btn blue-btn">去评价</button>
        </div> -->
      </div>
    </div>
    <div class="Popup" v-if="showPopup === true">
        <div class="mian">
          <div>
            <div class="express">
              <picker class="choose" mode="selector" :value="indexA" :range="valueA" range-key="shipperName" @change="bindPickerChangeA">
                <span class="picker">{{ valueA[indexA].shipperName}}<i class="iconfont Down iconyouce"></i></span>
              </picker>
            </div>
            <div class="number">
              <input placeholder="输入快递单号"  v-model="logisticsNum"/>
            </div>
            <div class="bt">
              <button @click="Deliver(PopupId)">确认发货</button>
            </div>
          </div>
          <i class="delete icondel2 iconfont" @click="hideshowPopup"></i>
        </div>
    </div>
  </view>
</template>

<script>
import apiOrder from '@/api/cart'
import personApi from '@/api/person'
import { UPLOAD_API } from '@/api/uploadFile'
export default {
  data () {
    return {
      indexA: 0,
      type: 0,
      showPopup: false,
      PopupId: '',
      outTradeNo: '',
      logisticsNum: '',
      valueA: [{
        shipperName: ''
      }], // 分类
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
        }, {
          typeName: '待退款',
          typeId: 8
        }],
      categoryA: [
        {
          typeName: '我购买的',
          typeId: 0
        }, {
          typeName: '我卖出的',
          typeId: 2
        }],
      categoryB: [
        {
          typeName: '我购买的',
          typeId: 0
        }, {
          typeName: '我卖出的',
          typeId: 3
        }],
      categoryC: [
        {
          typeName: '我购买的',
          typeId: 0
        }, {
          typeName: '我卖出的',
          typeId: 8
        }],
      typeId: 0,
      typeIdA: 0,
      typeIdB: 0,
      typeIdC: 0,
      orderList: [],
      typeName: '',
      pageNum: 1,
      lastPage: 100,
      nextPage: 1,
      pageSize: 10,
      typeStaus: 0
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
    this.typeIdA = 0
    this.typeIdB = 0
    this.getGoodA()
  },
  methods: {
    // 退款中
    RefundTime () {
      wx.showToast({
        icon: 'none',
        duration: 3000,
        title: '退款审核中...'
      })
    },
    // 确认退款
    madeRefun (trade, id) {
      var that = this
      wx.showModal({
        title: '提示',
        content: '是否确认退款',
        confirmColor: '#FFAF42',
        success (res) {
          if (res.confirm) {
            const token = wx.getStorageSync('token')
            wx.request({
              method: 'POST', // post/get 请求方式
              url: UPLOAD_API + '/platformOrder/MaRefund',
              data: {
                'outTradeNo': trade
              },
              header: {
                'token': token
              },
              success: function (res) {
                console.log('resAAA', res)
                if (res.statusCode === 200) {
                  this.pageNum = 1
                  wx.showToast({
                    icon: 'none',
                    duration: 3000,
                    title: '退款成功'
                  })
                  that.orderList[id].refund = 1
                  // console.log('newsList', that.orderList[id])
                  // setTimeout(function () {
                  //   that.tabChangC(8)
                  // }, 5000)
                }
              }
            })
          } else if (res.cancel) {
            wx.showToast({
              icon: 'none',
              duration: 3000,
              title: '取消退款'
            })
          }
        }
      })
    },
    // 显示物流快递发货
    GoshowPopup (id, trade) {
      this.showPopup = true
      this.PopupId = id
      this.outTradeNo = trade
    },
    // 隐藏物流快递发货
    hideshowPopup () {
      this.showPopup = false
      this.logisticsNum = ''
      this.outTradeNo = ''
    },
    // 发货
    Deliver (id) {
      const businessId = wx.getStorageSync('businessId')
      const shipper = this.type
      this.$fly.request({
        method: 'post', // post/get 请求方式
        url: '/platformOrder/updateOrderStatus',
        body: {
          'businessId': businessId,
          'orderStatusId': 3,
          'shipperCode': shipper,
          'logisticsNum': this.logisticsNum,
          'outTradeNo': this.outTradeNo
        }
      }).then(res => {
        if (res.code === 200) {
          this.showPopup = false
          if (this.typeId === 2) {
            this.getOrderListA()
          } else if (this.typeId === 3) {
            this.getOrderListB()
          }
          wx.showToast({
            icon: 'none',
            duration: 3000,
            title: '发货成功'
          })
        }
        console.log('resAAA', res)
      }).catch(err => {
        console.log(err)
      })
    },

    // 获取快递公司
    getGoodA () {
      const businessId = wx.getStorageSync('businessId')
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/shipper/findList',
        body: {
          'businessId': businessId,
          'pageSize': 0
        }
      }).then(res => {
        // console.log('resAAA', res)
        if (res.data) {
          this.valueA = res.data.list
          this.type = this.valueA[0].id
        }
      }).catch(err => {
        console.log(err)
      })
    },
    bindPickerChangeA (e) {
      const that = this
      this.indexA = parseInt(e.mp.detail.value)
      that.type = this.valueA[this.indexA].id
      // wx.setStorageSync('typeId', that.typeId)
      console.log('tyoeId', that.type)
    },
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
    payOrder (Info, fee) {
      const payInfo = JSON.parse(Info)
      console.log('info', JSON.parse(Info))
      wx.requestPayment(
        {
          'timeStamp': payInfo.timeStamp,
          'nonceStr': payInfo.nonceStr,
          'package': payInfo.packageValue,
          'signType': 'MD5',
          'paySign': payInfo.paySign,
          'success': (res) => {
            // this.insertOpera('支付了产品', 6, goodsId)
            wx.redirectTo({ url: `/pages/pageA/payfinish/main?price=${fee}&status=success` })
          },
          'fail': function (res) {
            wx.redirectTo({ url: `/pages/pageA/payfinish/mian?price=${fee}&status=fail` })
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
      // console.log('orderList', this.orderList)
      if (this.pageNum === 1) {
        this.orderList = res.data.list
      } else {
        this.orderList = this.orderList.concat(res.data.list)
      }
      // console.log('orderList', this.orderList)
      this.lastPage = res.data.lastPage
      this.pageNum = res.data.pageNum
      this.nextPage = res.data.nextPage
    },
    // 获取我卖出订单数据
    async getOrderListC () {
      const res = await apiOrder.orderByStatusB({ orderStatusId: this.typeIdC, pageNum: this.pageNum, pageSize: this.pageSize })

      res.data.list.map(item => {
        item.refund = 0
        item.buyDate = this.moment(item.buyDate).format('YYYY-MM-DD HH:mm:ss')
        item.totalFee = (+item.totalFee).toFixed(2)
        item.orderDetail.map(n => {
          n.unitPrice = (+n.unitPrice).toFixed(2)
        })
      })
      // console.log('orderList', this.orderList)
      if (this.pageNum === 1) {
        this.orderList = res.data.list
      } else {
        this.orderList = this.orderList.concat(res.data.list)
      }
      this.lastPage = res.data.lastPage
      this.pageNum = res.data.pageNum
      this.nextPage = res.data.nextPage
    },
    // 获取我卖出订单数据
    async getOrderListB () {
      const res = await apiOrder.orderByStatusB({ orderStatusId: this.typeIdB, pageNum: this.pageNum, pageSize: this.pageSize })

      res.data.list.map(item => {
        item.buyDate = this.moment(item.buyDate).format('YYYY-MM-DD HH:mm:ss')
        item.totalFee = (+item.totalFee).toFixed(2)
        item.orderDetail.map(n => {
          n.unitPrice = (+n.unitPrice).toFixed(2)
        })
      })
      // console.log('orderList', this.orderList)
      if (this.pageNum === 1) {
        this.orderList = res.data.list
      } else {
        this.orderList = this.orderList.concat(res.data.list)
      }
      this.lastPage = res.data.lastPage
      this.pageNum = res.data.pageNum
      this.nextPage = res.data.nextPage
    },
    // 获取我卖出订单数据
    async getOrderListA () {
      const res = await apiOrder.orderByStatusB({ orderStatusId: this.typeIdA, pageNum: this.pageNum, pageSize: this.pageSize })
      res.data.list.map(item => {
        item.buyDate = this.moment(item.buyDate).format('YYYY-MM-DD HH:mm:ss')
        item.totalFee = (+item.totalFee).toFixed(2)
        item.orderDetail.map(n => {
          n.unitPrice = (+n.unitPrice).toFixed(2)
        })
      })
      // console.log('orderListA', this.orderList)
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
      console.log('type', this.typeId)
      this.getOrderList()
      if (this.typeId === 2 || this.typeId === 3 || this.typeId === 8) {
        this.typeIdA = 0
        this.typeIdB = 0
        this.typeIdC = 0
        this.typeStaus = 0
      }
    },
    tabChangeA (id) {
      if (id === 0) {
        this.pageNum = 1
        this.typeIdA = id
        this.getOrderList()
        this.typeStaus = 0
      } else {
        this.orderList = ''
        this.pageNum = 1
        this.typeIdA = id
        this.typeStaus = 1
        this.getOrderListA()
      }
    },
    tabChangB (id) {
      if (id === 0) {
        this.pageNum = 1
        this.typeIdB = id
        this.getOrderList()
        this.typeStaus = 0
      } else {
        this.orderList = ''
        this.pageNum = 1
        this.typeIdB = id
        this.typeStaus = 1
        this.getOrderListB()
      }
    },
    tabChangC (id) {
      if (id === 0) {
        this.pageNum = 1
        this.typeIdC = id
        this.getOrderList()
        this.typeStaus = 0
      } else {
        this.orderList = ''
        this.pageNum = 1
        this.typeIdC = id
        this.typeStaus = 1
        this.getOrderListC()
      }
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
    if (this.typeId === 2 || this.typeId === 3 || this.typeId === 8) {
      this.typeIdA = 0
      this.typeIdB = 0
      this.typeIdC = 0
    }
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
  /*弹出框*/
  .Popup{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    .mian{
      width: 538rpx;
      height: 308rpx;
      padding: 30rpx;
      background: #ffffff;
      border-radius: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      .icondel2{
        position: absolute;
        right: 20rpx;
        top: 20rpx;
        color: #000000;
        font-size: 22rpx;
      }
      .express{
        display: flex;
        margin-bottom: 30rpx;
        .choose{
          width: 429rpx;
          height: 67rpx;
          display: inline-block;
          line-height: 67rpx;
          border: 1rpx solid #CCCCCC;
          border-radius: 10rpx;
          padding: 0 20rpx;
          text-align: left;
          .iconyouce{
            display: inline-block;
            color: #CCCCCC;
            transform: rotate(90deg);
            float: right;
          }
        }
      }
      .number{
        display: flex;
        margin-bottom: 30rpx;
        input{
          width: 429rpx;
          height: 67rpx;
          line-height: 67rpx;
          display: inline-block;
          border: 1rpx solid #CCCCCC;
          border-radius: 10rpx;
          padding: 0 20rpx;
          text-align: left;
        }
      }

      .bt{
        text-align: center;
        display: inline-block;
        button{
          width: 202rpx;
          height: 55rpx;
          line-height: 55rpx;
          font-size: 32rpx;
          border-radius: 20rpx;
          background: #FF903F;
          color: #ffffff;
        }
      }
    }
  }
  .tab-box {
    width: 94%;
    background-color: #f9f9f9;
    color: #9b9b9b;
    font-size: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    position: fixed;
    top: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 3%;
    li {
      display: inline-block;
      text-align: center;
    }
    .active {
      color: #FF903F;
    }
  }
  .tab-boxA{
    margin-top: 90rpx;
    width: 100%;
    color: #9b9b9b;
    font-size: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    z-index: 1000;
    text-align: center;
    li {
      display: inline-block;
      width: 25%;
      text-align: center;
    }
    .active {
      color: #FF903F;
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
      color: #FF903F;
    }
  }
}
.order-listA {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  padding: 0rpx 25rpx 112rpx;
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
      color: #FF903F;
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
  color: #FF903F;
  border-color: #FF903F;
}
</style>
