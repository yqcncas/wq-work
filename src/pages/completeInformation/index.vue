<template>
  <div class="complete-Information">
      <div class="Information-Header">
        <img src="/static/images/Information1.jpg" alt="">
      </div>
      <div class="Information-main">
        <div class="user-avatarUrl">
            <span>头像</span>
            <div class="user-right">
                <img :src="imgUrl" mode="aspectFit">
                <i class="iconfont icondingweiweizhi" @click="chooseImage()"></i>
            </div>
        </div>
        <div class="line"></div>
        <div class="weChat">
            <label>微信号</label>
            <input v-model="job" placeholder="填写微信" placeholder-style = 'text-align:end'/>
        </div>
        <div class="line"></div>
        <div class="pak">
            <label>行业</label>
            <div class="pick"  @click="showMulLinkageTwoPicker">
            <text type="text" @click="showMulLinkageTwoPicker"  placeholder="请输入行业" class="picker">{{pickerText}}</text>
            </div>
            <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" :themeColor="themeColor" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>
        </div>
        <div class="line"></div>
        <div class="PIMG">
            <p class="title">形象展示</p>
            <div class="img-wrap flexRow">
                <div class="common-size img-margin" v-for="(item,index) in richTextList" :key="index">
                <image :src="item" class="common-size" mode="aspectFill" @click="previewImg(item)"></image>
                <!--<image class="delete-img" src="/static/images/delete.png" mode="widthFix" @click="deleteImgList(index)"></image>-->
                <i class="iconfont iconshanchu-copy delete-img" @click="deleteImgList(index)"></i>
                </div>
                <div class="common-size add-img" @click="chooseImageList" v-if="richTextList.length!==4">
                <i class="iconfont iconxiangji"></i>
                <p>插入图片</p>
                </div>
            </div>
        </div>


      </div>
      <button class="next" @click="gotoProduct">下一步</button>
  </div>
</template>

<script>
import { UPLOAD_FILE, UPLOAD_API } from '@/api/uploadFile'
import mpvuePicker from 'mpvue-picker'
export default {
  onload () {
    this.getInfo()
  },
  // 获取头像
  onShow () {
    const imgUrl = wx.getStorageSync('avatarUrl')
    if (imgUrl) {
      this.imgUrl = imgUrl
    }
  },
  data () {
    return {
      mode: 'selector',
      deepLength: 2, // 几级联动
      pickerValueDefault: [0, 0], // 初始化值
      pickerValueArray: [], // picker 数组值
      pickerText: '',
      themeColor: '',
      richTextList: [],
      imgUrl: '',
      mulLinkageTwoPicker: [
        {
          label: '飞机票',
          value: 0,
          children: [
            {
              label: '经济舱',
              value: 1
            },
            {
              label: '商务舱',
              value: 2
            }
          ]
        },
        {
          label: '火车票',
          value: 1,
          children: [
            {
              label: '卧铺',
              value: 1
            },
            {
              label: '坐票',
              value: 2
            },
            {
              label: '站票',
              value: 3
            }
          ]
        },
        {
          label: '汽车票',
          value: 3,
          children: [
            {
              label: '快班',
              value: 1
            },
            {
              label: '普通',
              value: 2
            }
          ]
        }
      ]
    }
  },
  components: {
    mpvuePicker
  },
  methods: {
    bindcolumnchange (e) {
      var value = e.mp.detail.value
      this.TradeA = value[0] + '' + value[1]
    },
    // 二级联动选择
    showMulLinkageTwoPicker () {
      this.pickerValueArray = this.mulLinkageTwoPicker
      this.mode = 'multiLinkageSelector'
      this.deepLength = 2
      this.pickerValueDefault = [0, 0]
      this.themeColor = ''
      this.$refs.mpvuePicker.show()
    },
    onConfirm (e) {
      if (this.mode === 'multiLinkageSelector') {
        this.pickerText = e.label.split('-')[1]
        this.tradeId = e.value[1]
        console.log(',', this.tradeId)
      }
    },
    onChange (e) {
      console.log('a  ', e.value[1])
    },
    onCancel (e) {
      console.log('c', e)
    },
    deleteImgList (i) {
      this.richTextList.splice(i, 1)
      this.richImg = this.richTextList.join(',')
    },
    // 选择图片
    previewImg (img) {
      wx.previewImage({
        current: img,
        urls: this.richTextList
      })
    },
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
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast()
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
          //   上传成功之后再把照片的图片列表更新到个人信息接口
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
    },
    // 上传头像
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
              wx.hideLoading()
              // 上传成功之后再把图片的地址更新到个人信息接口
              this.getSalesmanUpdate()
            },
            fail: (res) => {
            }
          })
        }
      })
    },
    // 更新个人信息
    getSalesmanUpdate () {
      if (this.judgeNull(this.name, '姓名')) return
      if (this.judgeNull(this.salesCompanyName, '公司')) return
      // if (this.judgeNull(this.pickerText, '行业')) return
      if (this.judgeNull(this.job, '职位')) return
      if (this.judgeNull(this.phone, '手机')) return
      // // 检测手机号
      // if (this.phone.length !== 0) {
      //   // var reg = /^1(3|4|5|7|8)\d{9}$/
      //   // if (!reg.test(this.phone)) {
      //   //   wx.showToast({
      //   //     title: '请输入有效的手机号',
      //   //     icon: 'none',
      //   //     duration: 2000
      //   //   })
      //   //   return false
      //   // }
      // }
      // if (this.judgeNull(this.fixedPhone, '固话')) return
      // if (this.fixedPhone) {
      //   var regF = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      //   if (!regF.test(this.fixedPhone)) {
      //     wx.showToast({
      //       title: '请输入有效的固话，格式为0000-00000000',
      //       icon: 'none',
      //       duration: 2000
      //     })
      //     return false
      //   }
      // }
      // if (this.judgeNull(this.email, '邮箱')) return
      // 检测邮箱
      if (this.email) {
        var regE = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!regE.test(this.email)) {
          wx.showToast({
            title: '请输入有效的邮箱',
            icon: 'none',
            duration: 2000
          })
          return false
        }
      }
      // if (this.judgeNull(this.weChat, '微信')) return
      // if (this.judgeNull(this.region, '区域')) return
      // if (this.judgeNull(this.addDetailed, '详细地址')) return
      console.log('pan', this.pan)
      this.disabled = false
      if (this.pan === false) {
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
            video: this.video,
            voice: this.voice,
            id: this.Yid, // 152
            name: this.name,
            longitude: this.longitude,
            latitude: this.latitude,
            addDetailed: this.addDetailed,
            address: JSON.stringify(this.region),
            companyName: this.salesCompanyName,
            richText: this.richImg,
            phone: this.phone,
            fixedPhone: this.fixedPhone,
            email: this.email,
            weChat: this.weChat,
            job: this.job,
            info: this.info,
            tradeId: this.tradeId
          },
          header: {
            'token': token
          },
          success: (res) => {
            if (res.data.code === 200) {
              this.pan = true
              console.log('pana', this.pan)// this.isDisable = false // 执行请求后就不能点击了
              wx.setStorageSync('Card', true)
              console.log(wx.getStorageSync('Card'))
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000
              })
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
      if (this.pan === true) {
        const token = wx.getStorageSync('token')
        wx.request({
          method: 'post', // post/get 请求方式
          url: UPLOAD_API + '/platformSalesman/updateBaseInfo',
          data: {
            imgUrl: this.imgUrl,
            video: this.video,
            voice: this.voice,
            id: this.Yid, // 152
            name: this.name,
            addDetailed: this.addDetailed,
            address: JSON.stringify(this.region),
            companyName: this.salesCompanyName,
            richText: this.richImg,
            phone: this.phone,
            fixedPhone: this.fixedPhone,
            email: this.email,
            weChat: this.weChat,
            job: this.job,
            longitude: this.longitude,
            latitude: this.latitude,
            info: this.info,
            tradeId: this.tradeId
          },
          header: {
            'token': token
          },
          success: function (res) {
            if (res.data.code === 200) {
              // // this.pan = 0
              // this.isDisable = false // 执行请求后就不能点击了
              wx.showToast({
                title: '更新成功',
                icon: 'none',
                duration: 2000
              })
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
    },
    // 页面加载获取数据
    getInfo () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/platformSalesman/selectSelfInfo',
        body: {
          'userId': userId
        }
      }).then(res => {
        console.log('res', res)
        if (res.data) {
          this.postForm = res.data
          this.nickName = res.data.nickName
          this.voice = res.data.voice
          this.userId = userId
          this.pan = true
          this.addDetailed = res.data.salesAddDetailed
          this.Yid = res.data.id
          this.richImg = res.data.richText
          this.video = res.data.video !== '' ? res.data.video : ''
          this.name = res.data.name
          this.weChat = res.data.weChat
          this.job = res.data.job
          this.phone = res.data.phone
          this.imgUrl = res.data.imgUrl
          if (res.data.tradeName) {
            this.pickerText = res.data.tradeName
          }
          this.tradeId = res.data.tradeId
          this.fixedPhone = res.data.fixedPhone
          this.email = res.data.email
          this.salesCompanyName = res.data.salesCompanyName
          this.info = res.data.info
          this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
          const lab = typeof res.data.salesAddress
          if (this.richTextList) {
            this.richTextList = res.data.richText !== '' ? res.data.richText.split(',') : []
          }
          // if (lab === 'string') {
          //   this.region = JSON.parse(res.data.salesAddress)
          //   this.address = this.region
          // } else {
          //   this.region = JSON.parse(res.data.salesAddress)
          //   this.address = this.region.join('')
          // }      this.region = JSON.parse(usermsg.address)
          if (res.data.salesAddress !== null) {
            if (lab === 'string') {
              this.region = JSON.parse(res.data.salesAddress)
              this.address = this.region
            } else {
              this.region = JSON.parse(res.data.salesAddress)
              this.address = this.region.join('')
            }
          }
          if (this.voice !== '') {
            this.voiceTxt = '重录'
            const bg = wx.createInnerAudioContext()
            bg.src = this.voice
            // console.log('33', this.voice)
            bg.onCanplay(() => {
              console.log(bg.duration)
            })
            setTimeout(() => {
              console.log(bg.duration)
              this.num = Math.round(bg.duration)
              this.voiceTime = this.formatSeconds(this.num)
            }, 1000)
          }
        } else {
          this.region = '北京市北京市东城区'
          this.address = ['北京市', '北京市', '东城区']
          this.pan = false
          this.postForm = ''
          this.nickName = ''
          this.voice = ''
          this.userId = ''
          this.addDetailed = ''
          this.Yid = ''
          this.richImg = ''
          this.video = ''
          this.richTextList = ''
          this.name = ''
          this.weChat = ''
          this.job = ''
          this.phone = ''
          this.pickerText = ''
          this.tradeId = ''
          this.fixedPhone = ''
          this.email = ''
          this.salesCompanyName = ''
          this.info = ''
        }
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
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
    gotoProduct () {
      wx.navigateTo({
        url: `../product/main`
      })
    }
  }
}
</script>

<style lang='less' scoped>
.complete-Information{
    width: 100%;
    height: 100%;
    background:rgba(242,242,242,1);
    .Information-Header{
        width: 100%;
        height: 290rpx;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .line{
        width: 100%;
        height: 4rpx;
        background-color: #ccc;
    }
    .Information-main{
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        .user-avatarUrl{
            width: 100%;
            height: 160rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40rpx 0 52rpx;
            box-sizing: border-box;
            span{
                display: inline-block;
                font-size:34rpx;
                font-family:PingFang-SC-Regular,PingFang-SC;
                font-weight:400;
                color:rgb(14, 11, 11);
                
            }
            img{
                width:97rpx;
                height:97rpx;
            }
            i{
                display: inline-block;
                width: 39rpx;
                height: 39rpx;
                margin-left: 12rpx;
                transform: translateY(-80%);
                
            }
        }
        .weChat{
            width: 100%;
            height: 90rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 40rpx 0 52rpx;
            box-sizing: border-box;
            input{
                width: 30%;
            }
        }
        .pak{
            width: 100%;
            height: 80rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40rpx 0 52rpx;
            box-sizing: border-box;
            .pick{
              position: absolute;
              top: ~'0rpx';
              float: left;
              width: 80%;
              display: inline-block;
              height: ~'60rpx';
              border-bottom: none!important;
              .picker{
                width: 100%;
                height: ~'60rpx';
                z-index: 9999;
                padding-left: ~'40rpx';
                font-size: ~'30rpx';
                color: #9d9d9d;
                }
            }
        }
        .PIMG{
            padding: ~'20rpx' ~'60rpx' ~'40rpx';
            background: #ffffff;
            border-bottom: ~'1rpx' solid #CCCCCC;
            .title{
               
            }
            .img-wrap {
                margin-top: ~'20rpx';
                display: flex;
                justify-content: flex-start;
                flex-direction: row;
                align-items: center;
                .common-size {
                width: 150rpx;
                height: 150rpx;
                }

                .img-margin {
                margin-right: 30rpx;
                position: relative;
                }

                .img-margin:nth-child(4) {
                margin-right: 0;
                }

                .add-img {
                border: 2rpx solid #ccc;
                text-align: center;
                padding-top: 10rpx;
                box-sizing: border-box;
                color: #bbb;
                display: inline-block;
                background-color: #ccc;
                }

                .iconxiangji {
                color: #bbb;
                font-size: 60rpx;
                display: inline-block;
                line-height: 1;
                }

                .delete-img {
                position: absolute;
                width: 50rpx;
                right: -18rpx;
                top: 0;
                }
                .iconshanchu-copy{
                color: #F2F2F2;
                font-size: 32rpx;
                }
          }
        }
    }
    .next{
      width: 654rpx;
      height: 97rpx;
      background:rgba(255,104,80,1);
      border-radius:8rpx;
      margin: 0 auto;
      font-size: 30rpx;
      color: #fff;
      margin-top: 130rpx;
      text-align: center;
      line-height: 97rpx;
    }
}

</style>
