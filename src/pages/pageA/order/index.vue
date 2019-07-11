<template>
  <div class="order-page">
    <!-- 地址 -->
    <div class="address-per" v-if="address.name" @click="toRoute('../../pageA/addressSelect/main')">
      <i class="iconfont icon-location"></i>
      <div class="center-address">
        <p class="name-phone">
          <span>{{address.name}}</span>
          <span>{{address.phone}}</span>
        </p>
        <div class="detail-box">
          <p class="address-detail">{{address.address}}{{address.addressDetail||''}}</p>
        </div>
      </div>
      <i class="iconfont icon-arrow-right"></i>
    </div>
    <div class="address-per" v-else @click="toRoute('../../pageA/addressSelect/main')">
      <p class="none-add">请选择收货地址</p>
    </div>
    <!-- 商品列表 -->
    <div class="good-s-list">
      <div class="list-item" v-for="(item,index) in listData" :key="index" @click="toRoute('/pages/product/detail/main',item.id)">
        <image mode="aspectFill" class="img-h" :src="item.imgUrl"></image>
        <div class="center-good">
          <p class="name">{{item.name}}</p>
          <p class="model">{{item.goodsModelName||''}}</p>
          <p class="num">数量×{{item.buyCount}}</p>
        </div>
        <p class="price">￥{{item.price}}</p>
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
        <span class="money-color">￥{{allprice}}</span>
      </p>
    </div>
    <!-- 余额 -->
    <div class="balance">
      <p>
        <span>余额</span>
        <span class="money">￥0</span>
      </p>
      <switch v-model="switchValue" @change="switchChange" color="#2A94EC" disabled></switch>
    </div>
    <!-- 备注 -->
    <div class="remark-box">
      <span>备注</span>
      <input class="remark-input" placeholder="请输入备注" v-model="remarks" />
    </div>
    <!-- 说明 -->
    <div class="explain">
      提示：公司随机发货，不能指定快递，少数偏远地区以及快递不到的镇、村、组的快件需自提，公司不承担额外的快递费用，快递物流时效为一个月，请在发货后7天内查询物流信息，新老包装随机发货，不能制定包装，如有疑问请联系客服。
    </div>
    <!-- 确认订单 -->
    <cover-view class="sure-order-bottom">
      <cover-view><cover-view>应付：</cover-view><cover-view class="red-money">￥{{allprice}}</cover-view></cover-view>
      <cover-view class="btn-sure" @click="sureBtn">确认订单</cover-view>
    </cover-view>
  </div>
</template>

<script>
import cartApi from '@/api/cart'
import personApi from '@/api/person'
export default {
  onLoad (option) {
    this.buyWay = option.buyWay
    this.goodsId = option.id
    this.getIp()
    this.getDetail()
  },
  onShow () {
    this.orderAddressOne()
  },
  data () {
    return {
      address: {},
      allprice: '',
      listData: [],
      ip: '',
      remarks: '',
      buyWay: null,
      goodsId: null
    }
  },
  methods: {
    // 插入雷达
    async insertOpera (info, recordType) {
      let businessId = wx.getStorageSync('businessId')
      let salesmanId = wx.getStorageSync('salesManId')
      let userId = wx.getStorageSync('userId')
      await personApi.OperationInsert({ businessId, goodsId: this.goodsId, info, recordType, salesmanId, userId })
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
    async orderAddressOne () {
      this.address = wx.getStorageSync('addressDes')
      this.address.address = JSON.parse(this.address.address).join(' ')
    },
    // 获取订单的列表
    async getDetail () {
      this.listData = JSON.parse(wx.getStorageSync('goodsList'))
      this.listData.map(item => {
        item.price = item.price.toFixed(2)
      })
      this.allprice = JSON.parse(wx.getStorageSync('allprice')).toFixed(2)
    },
    getIp () {
      wx.request({
        url: 'https://fangyuanxiaozhan.com/get_ip',
        success: (e) => {
          this.ip = e.data.query
        }
      })
    },
    // 确认订单
    async sureBtn () {
      if (!this.address.name) {
        wx.showToast({
          title: '请选择地址',
          icon: 'none',
          duration: 1500
        })
        return
      }
      wx.showLoading({
        mask: true
      })
      let goodsList = wx.getStorageSync('setgoodsList')
      const result = await cartApi.unifiedOrder({ buyWay: this.buyWay, goodsList, spbillCreateIp: this.ip, name: this.listData[0].name, remarks: this.remarks, orderAddress: this.address.address, addressDetail: this.address.addressDetail, userName: this.address.name, phone: this.address.phone })
      wx.hideLoading()
      if (result.code === 200) {
        // this.insertOpera('下单了产品', 5)
        this.pay(result.data.payInfo)
      }
    },
    pay (payInfo) {
      wx.requestPayment(
        {
          'timeStamp': payInfo.timeStamp,
          'nonceStr': payInfo.nonceStr,
          'package': payInfo.packageValue,
          'signType': 'MD5',
          'paySign': payInfo.paySign,
          'success': (res) => {
            // this.insertOpera('支付了产品', 6)
            wx.redirectTo({ url: `../payfinish/main?price=${this.allprice}&status=success` })
          },
          'fail': (res) => {
            wx.redirectTo({ url: `../payfinish/main?price=${this.allprice}&status=fail` })
          },
          'complete': function (res) {
          }
        })
    }
  }
}
</script>
<style lang='scss'>
@import "style";
</style>
