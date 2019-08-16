<template>
    <div class="simple">
      <div class="top">
        <div class="Img" v-if="imgUrl !== ''"   @click="chooseImage()">
          <image :src="imgUrl"> <span>换个头像</span></image>
        </div>
        <div class="Img" v-else  @click="chooseImage()">
          <i class="iconfont iconaddgrey" ></i>
          <p>上传头像</p>
        </div>
        <div class="name">
          <p>姓名</p>
          <input placeholder="请输入" v-model="name" placeholder-style="color:#cccccc;">
        </div>
      </div>
      <div class="main">
        <div class="phone">
          <p>联系电话</p>
          <input placeholder="请输入" v-model="phone" placeholder-style="color:#cccccc;" maxlength="11" type="number">
          <!--<button class='pop_btn' plain="true" open-type='getPhoneNumber' @getphonenumber="getPhoneNumber">aaa</button>-->
        </div>
        <div class="company">
          <p>公司全称</p>
          <input placeholder="请输入" v-model="company" placeholder-style="color:#cccccc;">
        </div>
        <div class="job">
          <p>担任职位</p>
          <input placeholder="请输入" v-model="job" placeholder-style="color:#cccccc;">
        </div>
      </div>
      <div class="footer">
        <button v-if="isBuy === 0" class="save" @click="getSalesmanUpdate()">确定</button>
        <button v-else @click="getBuyCard()">确定</button>
      </div>
    </div>
</template>

<script>
  import { UPLOAD_FILE, UPLOAD_API } from '@/api/uploadFile'
  import personApi from '@/api/person'
  export default {
    name: 'index',
    data () {
      return {
        name: '',
        job: '',
        phone: '',
        company: '',
        imgUrl: '',
        personApi: personApi,
        phoneIp: '',
        isBuy: '', // 控制是否支付
        disabled: false
      }
    },
    onShow () {
      this.isBuy = wx.getStorageSync('isBuy')
      const imgUrl = wx.getStorageSync('avatarUrl')
      const nickName = wx.getStorageSync('nickName')
      if (imgUrl) {
        this.imgUrl = imgUrl
      }
      if (nickName) {
        this.name = nickName
      }
      // console.log('imgurl', imgurl)
      // console.log('nickName', nickName)
      // wx.setStorageSync('name', e.target.userInfo.name)
    },
    methods: {
      getPhoneNumber (e) {
        console.log('111', e)
      },
      // 查询是否购买mingp
      getBuyCard () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformOrder/selectIsBuyCard',
          body: {
            'name': '9.9元名片创建费用'
          }
        }).then(res => {
          console.log('data', res.data)
          if (res.data === 1) {
            this.getSalesmanUpdate()
            this.isBuy = 0
            this.disabled = false
          } else {
            this.disabled = true
            this.getPlay()
          }
        }).catch(err => {
          this.disabled = false
          console.log(err)
        })
      },
      // 获取logo
      getBuy () {
        const businessId = wx.getStorageSync('businessId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/business/findById',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          this.disabled = false
          this.isBuy = 0
          wx.setStorageSync('isBuy', this.isBuy)
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取Ip地址
      getIp () {
        wx.request({
          url: 'http://ip-api.com/json',
          success: function (e) {
            let that = this
            that.phoneIp = e.data.query
            wx.setStorageSync('phoneIp', that.phoneIp)
          }
        })
      },
      // 订单支付接口
      pay (payInfo) {
        wx.requestPayment(
          {
            'timeStamp': payInfo.timeStamp,
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.packageValue,
            'signType': 'MD5',
            'paySign': payInfo.paySign,
            'success': (res) => {
              this.getSalesmanUpdate()
              this.isBuy = 0
              this.getBuy()
              // this.insertOpera('支付了产品', 6)
              // wx.redirectTo({ url: `../payfinish/index?price=${this.allprice}&status=success` })
            },
            'fail': (res) => {
              this.isBuy = 1
              this.disabled = false
              // wx.redirectTo({ url: `../payfinish/index?price=${this.allprice}&status=fail` })
            },
            'complete': function (res) {
            }
          })
      },
      getPlay (ip) {
        const phoneIp = wx.getStorageSync('phoneIp')
        this.$fly.request({
          method: 'post', // post/get 请求方式
          url: '/platformOrder/unifiedForCreateCard',
          body: {
            'goodsList': [],
            'name': '9.9元名片创建费用',
            'getWay': '自取',
            'unifiedOrderRequest': {
              'spbillCreateIp': phoneIp,
              'body': '9.9元名片创建费用'
            },
            'userName': this.nickName
          }
        }).then(res => {
          if (res.code === 200) {
            this.pay(res.data.payInfo)
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 检测有没有输入值
      judgeNull (str, name) {
        if (str === '' || str.length === 0) {
          wx.showToast({
            title: name + '不能为空',
            icon: 'none',
            duration: 2000
          })
          return true
        }
      },
      // 插入雷达
      async insertOpera (info, recordType) {
        this.businessId = wx.getStorageSync('businessId')
        this.id = wx.getStorageSync('userId')
        this.salesmanId = wx.getStorageSync('salesmanId')
        await personApi.OperationInsert({ businessId: this.businessId, info, recordType, salesmanId: this.salesManId, userId: this.id })
      },
      // 上传形象
      chooseImage (e) {
        wx.chooseImage({
          count: 1, // 一次最多可以选择的图片张数
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            this.imgUrl = res.tempFilePaths[0]
            /** 上传完成后把文件上传到服务器 */
            const token = wx.getStorageSync('token')
            wx.uploadFile({
              url: UPLOAD_FILE + '?filedir=salesManImg',
              filePath: res.tempFilePaths[0],
              name: 'file',
              header: {
                'Content-Type': 'image/jpeg',
                token: token
              },
              methods: 'POST',
              success: (res) => {
                this.imgUrl = JSON.parse(res.data).data[0]
                console.log('imgUrl', this.imgUrl)
                wx.hideLoading()
                // 上传成功之后再把图片的地址更新到个人信息接口
                // this.getSalesmanUpdate()
              },
              fail: (res) => {
              }
            })
          }
        })
      },
      getSalesmanUpdate () {
        if (this.judgeNull(this.imgUrl, '姓名')) return
        if (this.judgeNull(this.name, '姓名')) return
        if (this.judgeNull(this.company, '公司')) return
        if (this.judgeNull(this.job, '职位')) return
        if (this.judgeNull(this.phone, '手机')) return
        const token = wx.getStorageSync('token')
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地bussiness
        wx.request({
          method: 'post', // post/get 请求方式
          url: UPLOAD_API + '/platformSalesman/add',
          data: {
            businessId: businessId,
            userId: userId,
            imgUrl: this.imgUrl,
            name: this.name,
            companyName: this.company,
            phone: this.phone,
            job: this.job,
            video: '',
            voice: '',
            email: '',
            id: '',
            richTextList: []
          },
          header: {
            'token': token
          },
          success: (res) => {
            if (res.data.code === 200) {
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateBack(-1)
              }, 2000)
            }
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) {
            console.log(res)
          }
        })
        this.insertOpera('完善了资料', 10)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "style";
</style>
