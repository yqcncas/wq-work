<template>
  <div class="cart">
    <div class="cartlist">
      <!-- 获得后台加入购物车的列表 -->
      <div class="item" @touchstart="startMove" @touchmove="deleteGoods" :data-index="index" v-for="(item,index) in listData"
        :key="index">
        <div class="con" :style="item.textStyle">
          <!-- 获得后台加入购物车的列表 -->
          <div class="left">
            <!--左边的勾勾，图片，标题价格； -->
            <div class="iconfont iconchoose" @click="changeColor(index,item.goodsId,item.modelId, item.number,item.img,item.goodsName,item.retailPrice,item.modelName,item.number)"
              :class="[ Listids[index] ? 'iconxianshi_xuanzetianchong' : '',{active:allcheck}]"></div>
            <image class="img" @click="skipProduct(item.goodsId)" mode="aspectFill" :src="item.img"></image>
            <div class="info" @click="skipProduct(item.goodsId)">
              <p class="good-name">{{item.goodsName}}</p>
              <p class="model-name">{{item.modelName||''}}</p>
              <p class="price"><span class="small">￥</span>{{item.retailPrice}}</p>
            </div>
          </div>
          <!--右边的数量-->
          <div class="right">
            <span>x</span>
            <span class="num">{{item.number}}</span>
          </div>
        </div>
        <!--向左滑动删除-->
        <div @click="delGoods(item.id,index)" class="delete">
          <div>
            删除
          </div>
        </div>
      </div>
    </div>
    <!--删除了-->
    <div v-if="false" class="nogoods">
      <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/noCart-a8fe3f12e5.png"
        alt="">
    </div>
    <!--固定在下面的条框-->
    <div class="fixed">
      <div @click="allCheck">
        <i :class="{'iconxianshi_xuanzetianchong':allcheck}" class="iconfont iconchoose"></i>
        <span class="text-all">全选({{isCheckedNumber}})</span>
      </div>
      <div class="right">
        <div>
          <span class="small">￥</span>{{allPrise}}
        </div>
        <div @click="orderDown">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import {// get,// post,// login,// getStorageOpenid
} from '../../../utils'
import cartApi from '@/api/cart'
export default {
  onLoad () {
    // this.openId = getStorageOpenid()
    this.getListData()
  },
  data () {
    return {
      orderAddressId: '',
      datalist: [{
        goods_id: 1045000,
        goods_name: '绿茶蛋黄酥 200克/4枚入',
        id: 363,
        list_pic_url: 'http://yanxuan.nosdn.127.net/b2adc3fd9b84a289a1be03e8ee400e61.png',
        number: 1,
        retail_price: 28,
        user_id: 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c'
      }, {
        goods_id: 1023003,
        goods_name: '100年传世珐琅锅 全家系列',
        id: 350,
        list_pic_url: 'http://yanxuan.nosdn.127.net/c39d54c06a71b4b61b6092a0d31f2335.png',
        number: 1,
        retail_price: 398,
        user_id: 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c'
      }],
      openId: '',
      allcheck: false,
      listData: [],
      numberlist: [],
      modellist: [],
      Listids: [],
      userInfo: {},
      startX: '',
      moveX: '',
      X: 0
    }
  },
  components: {},
  methods: {
    skipProduct (id) {
      wx.navigateTo({
        url: '/pages/productA/detail/main?id=' + id
      })
    },
    initTextStyle () {
      // 滑动之前先初始化数据
      this.listData.map(item => {
        item.textStyle = ''
      })
    },
    startMove (e) {
      this.startX = e.touches[0].pageX
    },
    deleteGoods (e) {
      // 滑动之前先初始化样式数据
      this.initTextStyle()
      var index = e.currentTarget.dataset.index

      this.moveX = e.touches[0].pageX
      this.X = this.moveX - this.startX
      if (this.X >= 80 || this.X >= -80) {
        this.X = 0
      }
      if (this.X <= -80) {
        this.X = -160
      }
      this.listData[index].textStyle = `transform:translateX(${this.X}rpx);`
    },
    async orderDown () {
      if (this.Listids.length === 0) {
        wx.showToast({
          title: '请选择商品',
          icon: 'none',
          duration: 1500
        })
        return false
      }
      wx.showLoading({
        mask: true
      })
      let goodsList = []
      this.Listids.map((item, i) => {
        goodsList.push({ id: this.Listids[i], goodsModelId: this.modellist[i], buyCount: this.numberlist[i] })
      })
      wx.setStorageSync('setgoodsList', goodsList)
      const { code, data, message } = await cartApi.unified({ goodsList })
      wx.hideLoading()
      if (code === 200) {
        let addressDes = { name: data.userName, phone: data.phone, address: data.orderAddress, addressDetail: data.addressDetail }
        wx.setStorageSync('orderId', data.id)
        wx.setStorageSync('addressDes', addressDes)
        wx.setStorageSync('allprice', JSON.stringify(data.totalFee))
        wx.setStorageSync('goodsList', JSON.stringify(data.goodsList))
        wx.setStorageSync('payInfo', JSON.stringify(data.payInfo))
        wx.navigateTo({
          url: '../order/main?buyWay=1'
        })
      } else {
        wx.showToast({
          title: message,
          duration: 2000,
          icon: 'none'
        })
      }
    },
    async delGoods (id, index) {
      wx.showModal({
        title: '',
        content: '是否要删除该商品',
        success: (res) => {
          if (res.confirm) {
            // 这里主要是删除的接口
            this.deleteCart(id, index)
          } else if (res.cancel) {
            // 滑动之前先初始化样式数据
            this.initTextStyle()
          }
        }
      })
    },
    async deleteCart (id, index) {
      const { code, message } = await cartApi.deleteCart(id)
      if (code === 200) {
        this.listData.splice(index, 1)
        this.getListData()
      } else {
        wx.showToast({
          title: message,
          icon: 'none',
          duration: 2000
        })
      }
    },
    async getListData () {
      const result = await cartApi.getCartList()
      const procartlist = result.data.cartList
      for (var i = 0; i < procartlist.length; i++) {
        procartlist[i].textStyle = ''
      }
      this.listData = procartlist
    },
    allCheck () {
      // 先清空
      this.Listids = []
      this.modellist = []
      this.numberlist = []
      if (this.allcheck) {
        this.allcheck = false
      } else {
        this.allcheck = true
        // 循环遍历所有的商品id
        for (let i = 0; i < this.listData.length; i++) {
          const element = this.listData[i]
          this.Listids.push(element.goodsId)
          this.modellist.push(element.modelId)
          this.numberlist.push(element.number)
        }
      }
    },
    change (e) { },
    changeColor (index, id, modelid, number, img, goodsName, retailPrice, modelName, dnumber) {
      if (this.Listids[index]) {
        this.$set(this.Listids, index, false)
        this.$set(this.modellist, index, false)
        this.$set(this.numberlist, index, false)
      } else {
        this.$set(this.Listids, index, id)
        this.$set(this.modellist, index, modelid)
        this.$set(this.numberlist, index, number)
      }
    }
  },
  onShow () {
    this.getListData()
  },
  onHide () {
    this.Listids = []
    this.modellist = []
    this.numberlist = []
  },
  computed: {
    isCheckedNumber () {
      let number = 0
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          number++
        }
      }
      if (number === this.listData.length && number !== 0) {
        this.allcheck = true
      } else {
        this.allcheck = false
      }
      return number
    },
    allPrise () {
      var Prise = 0
      for (let i = 0; i < this.Listids.length; i++) {
        if (this.Listids[i]) {
          Prise = Prise + this.listData[i].retailPrice * this.listData[i].number
        }
      }
      return Prise.toFixed(2)
    }
  }
}
</script>
<style lang='scss'>
@import "style";
</style>
