<template>
  <div class="address-page">
    <div class="top-box">
      <div class="item-list" v-for="(item,index) in listData" :key="index" @click="chooseAddress(item)">
        <p class="name-phone">
          <span>{{item.name}}</span>
          <span>{{item.phone}}</span>
        </p>
        <p class="address-s">
          <i class="iconfont icondizhi-copy"></i>
          <span>{{item.address}}{{item.addressDetail||''}}</span>
        </p>
        <div class="bottom-set">
          <p @click.stop="chooseActive(index)">
            <i class="iconfont iconchoose" :class="{'iconxianshi_xuanzetianchong':item.active}"></i>
            <span class="set-ad">设为默认</span>
          </p>
          <div class="right-icon-txt">
            <p class="delete-box" @click.stop="deleteAddress(item.id)">
              <i class="iconfont icon-shanchu2"></i>
              <span>删除</span>
            </p>
            <p @click.stop="toDetail(item.id)">
              <i class="iconfont icon-bianji2"></i>
              <span>编辑</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <p @click="wxaddress">一键导入</p>
      <p class="add-new" @click="wxaddress(1)">新建地址</p>
    </div>
  </div>
</template>
<script>
import addressApi from '@/api/address'
import orderApi from '@/api/cart'
export default {
  onShow () {
    this.getAddressList()
  },
  created () { },
  data () {
    return {
      id: '',
      listData: [],
      type: ''
    }
  },
  methods: {
    // 删除收货地址的接口
    async deleteAddress (id) {
      await addressApi.deleteAddress({ id }).then(res => {
        this.getAddressList()
      })
    },
    async apiCheck (id, active) {
      let isDefault = (active ? 1 : 0)
      await addressApi.updateAddress({ id, isDefault })
    },
    //   选择默认
    chooseActive (i) {
      this.listData.map((item, index) => {
        if (i === index) {
          if (item.active) {
            item.active = false
            this.apiCheck(item.id, false)
          } else {
            item.active = true
            this.apiCheck(item.id, true)
            wx.setStorageSync('addressDes', item)
          }
        } else {
          item.active = false
        }
      })
    },
    async chooseAddress (item) {
      if (this.type === '1') return
      const id = wx.getStorageSync('orderId')
      wx.setStorageSync('addressDes', item)// 在跳转之前更新orderid，因为订单页面地址也是存储在store中
      // id是订单页面传过来的订单id，然后orderAddressId是地址的id
      await orderApi.updateOrderAddress({ id: id, orderAddress: item.address, orderAddressDetail: item.addressDetail, userName: item.name, phone: item.phone })
      wx.navigateBack({
        delta: 1
      })
    },
    toDetail (id) {
      wx.navigateTo({
        url: '../addaddress/main?id=' + id
      })
    },
    async getAddressList () {
      // 获取地址的列表接口
      const { data } = await addressApi.orderAddressAll()
      data.map(item => {
        if (item.address.indexOf('[') !== -1) {
          item.address = JSON.parse(item.address).join(' ')
        }
        if (item.isDefault) {
          item.active = true
          wx.setStorageSync('addressDes', item)
        } else {
          item.active = false
        }
      })
      this.listData = data
    },
    wxaddress (index) {
      if (index === 1) {
        wx.navigateTo({
          url: '../addaddress/main'
        })
      } else {
        wx.chooseAddress({
          success: (res) => {
            res = encodeURIComponent(JSON.stringify(res))
            wx.navigateTo({
              url: '../addaddress/main?res=' + res
            })
          }
        })
      }
    }
  },
  onLoad (options) {
    this.type = options.type
  },
  onPullDownRefresh () {
    // 停止下拉刷新
    this.getAddressList()
    wx.stopPullDownRefresh()
  }
}
</script>

<style lang='scss' scoped>
@import "style";
</style>
