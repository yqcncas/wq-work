<template>
  <div class="order-page refund-page">
    <!-- 商品列表 -->
    <div class="good-s-list shadow">
      <div class="list-item" v-for="(item,index) in orderGoods" :key="index">
        <image mode="aspectFill" class="img-h" :src="item.goodsImgUrl"></image>
        <div class="center-good">
          <p class="name">{{item.goodsName}}</p>
          <p class="model">{{item.goodsModelName||''}}</p>
          <!-- <p class="num">数量×{{item.num}}</p> -->
        </div>
        <!-- <p class="price">￥{{item.unitPrice}}</p> -->
      </div>
    </div>
    <!-- 退款 -->
    <div class="re-fund shodow common-style">
      <div class="status-wrap flexRow" @click="modal('fadeup')">
        <span>货物状态</span>
        <p class="flexRow">
          <span class="text">{{goodsStatus}}</span>
          <i class="iconfont iconyouce"></i>
        </p>
      </div>
      <div class="money-wrap flexRow">
        <span>退款金额：</span>
        <span class="blue-money">￥{{actual_price}}</span>
      </div>
    </div>
    <!-- 退款原因 -->
    <div class="reason-re shodow flexRow common-style">
      <span>退款原因：</span>
      <input v-show="modalVisible!=='fadeup'" placeholder="请输入退款原因" class="input-reason" v-model="refundReason" />
    </div>
    <!-- 上传凭证 -->
    <div class="voucher common-style shodow">
      <p class="txt-before">上传凭证</p>
      <div class="img-wrap flexRow">
        <div class="common-size img-margin" v-for="(item,index) in richTextList" :key="index">
          <image :src="item" class="common-size" mode="aspectFill" @click="previewImg(item)"></image>
          <!--<image class="delete-img" src="/static/images/delete.png" mode="widthFix" @click="deleteImgList(index)"></image>-->
          <i class="iconfont iconshanchu-copy delete-img" @click="deleteImgList(index)"></i>
        </div>
        <div class="common-size add-img" @click="chooseImageList" v-if="richTextList.length!==4">
          <i class="iconfont iconxiangji"></i>
          <p>上传凭证</p>
          <p>(最多四张)</p>
        </div>
      </div>
    </div>
    <!-- 提交 -->
    <form name="refund" report-submit='true' @submit='getFormID'>
      <button class="sub-btn" form-type="submit">提交</button>
    </form>
    <!-- 货物状态 -->
    <div class="modal-bg" catchtouchmove="ture" v-show="modalVisible==='fadeup'">
    </div>
    <div class="model-wrap" :class="modalVisible">
      <p class="title">货物状态</p>
      <div class="flexRow com-status first-border" @click="goodStatus('未收到货')">
        <span>未收到货</span>
        <i class="iconfont iconchoose" :class="{'iconxianshi_xuanzetianchong':tempChoose==='未收到货'}"></i>
      </div>
      <div class="flexRow com-status" @click="goodStatus('已收到货')">
        <span>已收到货</span>
        <i class="iconfont iconchoose" :class="{'iconxianshi_xuanzetianchong':tempChoose==='已收到货'}"></i>
      </div>
      <button class="close-btn" @click="modal('')">关闭</button>
    </div>
  </div>
</template>

<script>
import orderApi from '@/api/cart'
import personApi from '@/api/person'
import { UPLOAD_FILE } from '@/api/uploadFile'
// import personApi from '@/api/person'
export default {
  data () {
    return {
      orderId: 0,
      actual_price: '',
      orderGoods: [],
      richTextList: [],
      richImg: '',
      formId: null,
      outTradeNo: null,
      refundReason: '',
      voucher: '',
      tempChoose: '请选择',
      goodsStatus: '请选择',
      modalVisible: '',
      userId: null
    }
  },
  methods: {
    // 插入雷达
    async insertOpera (info, recordType) {
      let businessId = wx.getStorageSync('businessId')
      let salesmanId = wx.getStorageSync('salesManId')
      let userId = wx.getStorageSync('userId')
      await personApi.OperationInsert({ businessId, goodsId: this.orderGoods[0].goodsId, info, recordType, salesmanId, userId })
    },
    goodStatus (val) {
      this.tempChoose = val
    },
    modal (val) {
      this.modalVisible = val
      if (!val) {
        this.goodsStatus = this.tempChoose
      }
    },
    getFormID (e) {
      this.formId = e.target.formId
      this.submitData()
    },
    // 提交
    async submitData () {
      if (this.goodsStatus === '请选择') {
        wx.showToast({
          title: '请选择物流状态', // 提示的内容,
          icon: 'none', // 图标,
          duration: 2000 // 延迟时间,
        })
        return
      }
      const { code } = await orderApi.updateOrderStatus({ outTradeNo: this.outTradeNo, formId: this.formId, refundReason: this.refundReason, voucher: this.richImg, goodsStatus: this.goodsStatus, orderStatusId: 8, userId: this.userId })
      if (code === 200) {
        this.insertOpera('申请了退款', 7)
        wx.navigateBack({
          delta: 1
        })
      }
    },
    // 删除图片
    deleteImgList (i) {
      this.richTextList.splice(i, 1)
      this.richImg = this.richTextList.join(',')
    },
    previewImg (img) {
      wx.previewImage({
        current: img,
        urls: this.richTextList
      })
    },
    // 获取订单数据
    async getOrderDetail () {
      const { data } = await orderApi.selectDeTailOrderInfo({ id: this.orderId })

      data.orderDetailList.map(item => {
        item.unitPrice = item.unitPrice.toFixed(2)
      })
      this.orderGoods = data.orderDetailList
      this.actual_price = data.totalFee.toFixed(2)
      this.outTradeNo = data.outTradeNo
      this.userId = data.userId
    },
    // 选择照片列表组
    chooseImageList (e) {
      wx.chooseImage({
        count: 9, // 一次最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          this.imgUrl = null
          let successUp = 0 // 成功
          let failUp = 0 // 失败
          let length = res.tempFilePaths.length // 总数
          let count = 0 // 第几张
          this.uploadOneByOne(res.tempFilePaths, successUp, failUp, count, length)
        },
        fail: function () {
        },
        complete: function () {
        }
      })
    },
    uploadOneByOne (imgPaths, successUp, failUp, count, length) {
      const token = wx.getStorageSync('token')
      wx.showLoading({
        title: '正在上传第' + count + '张'
      })
      wx.uploadFile({
        url: UPLOAD_FILE + '?filedir=voucher',
        filePath: imgPaths[count],
        name: 'file',
        header: {
          'Content-Type': 'image/jpeg',
          token: token
        },
        methods: 'POST',
        success: (res) => {
          successUp++ // 成功+1
          // 上传成功之后再把照片的图片列表更新到个人信息接口
          this.richTextList.push(JSON.parse(res.data).data[0])
          this.richImg = this.richTextList.join(',')
        },
        fail: (res) => {
          failUp++ // 失败+1
        },
        complete: (res) => {
          count++ // 下一张
          if (count === length) {
            // 上传完毕，作一下提示
            console.log('上传成功' + successUp + ',' + '失败' + failUp)
            wx.showToast({
              title: '上传成功' + successUp,
              icon: 'none',
              duration: 2000
            })
          } else {
            // 递归调用，上传下一张
            this.uploadOneByOne(imgPaths, successUp, failUp, count, length)
            console.log('正在上传第' + count + '张')
          }
        }
      })
    }
  },
  onLoad (options) {
    this.orderId = options.id
    this.goodsStatus = '请选择'
    this.tempChoose = '请选择'
    this.refundReason = ''
    this.richTextList.length = 0
    this.richImg = ''
    this.getOrderDetail()
  },
  onShow () {
  }
}
</script>
<style lang='scss'>
@import "../order/style";
@import "./style";
</style>
