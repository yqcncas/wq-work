<template>
  <div class="product">
      <div class="product-Header">
           <img src="/static/images/Information2.jpg" alt="">
      </div>
      <div class="product-main">
          <div class="trends">
            <p>发布动态</p>
          </div> 
          <div class="issue">
            <button @click="save()">发布</button>
          </div>
          <div class="text">
            <textarea v-model="title" class="inputMsg" placeholder="请输入内容" maxlength="300" @input="txtInput"></textarea>
          </div>
          <div class="uploadImg">
            <div class="img-wrap flexRow">
                <div class="common-size img-margin" v-for="(item,index) in expression" :key="index">
                <image :src="item" class="common-size" mode="aspectFill" @click="previewImg(item)"></image>
                <!--<image class="delete-img" src="/static/images/delete.png" mode="widthFix" @click="deleteImgList(index)"></image>-->
                <i class="iconfont iconshanchu-copy delete-img" @click="deleteImgList(index)"></i>
                </div>
                <div class="common-size add-img" @click="chooseImageList" v-if="expression.length!==4">
                <i class="iconfont iconxiangji"></i>
                </div>
            </div>
          </div>
           <div class="address" @click="chooseLocation()">
            <span class="icont">
              <i class="iconfont icondizhi-copy"></i>
            </span>
              <span class="map"> {{ location }}</span>
          </div>
      </div>
      <div class="productInfomation">
        <div class="productInfomation-top">
          <p>产品</p>
        </div>
        <div class="productInfomation-main">
          <div class="img-wrap flexRow">
                <div class="common-size img-margin" v-for="(item,index) in productsA" :key="index">
                 <img :src="item.imgUrl" @click="modify(item.id)">
                <i class="iconfont iconshanchu-copy delete-img"  @click="deleteA(item.id, 0)"></i>
                </div>
              <div class="product-details" @click="updataProduct" v-if="productsA.length!==4">
                <i class="iconfont iconxiangji"></i>
                <p>上传产品</p>
              </div>
            </div>
        </div>
      </div>
      <button class="next" @click="gotoConsummate">下一步</button>
  </div>
</template>

<script>
import { UPLOAD_FILE } from '@/api/uploadFile'
export default {
  data () {
    return {
      status: false,
      videoId: 0,
      photoId: 0,
      indexB: 0,
      location: '定位',
      address: '',
      longitude: '', // 精度
      latitude: '', // 维度
      title: '',
      imgUrlList: '',
      video: '',
      imgUrl: '',
      expression: [],
      opId: '',
      valueB: [{
        type: ''
      }], // 分类,
      goodsStyleTypeId: '',
      productsA: []
    }
  },
  methods: {
    deleteImgList (i) {
      this.expression.splice(i, 1)
      this.richImg = this.expression.join(',')
    },
    // 选择图片
    previewImg (img) {
      wx.previewImage({
        current: img,
        urls: this.expression
      })
    },
    chooseImageList (e) {
      wx.chooseImage({
        count: 9, // 一次最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
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
          this.expression.push(JSON.parse(res.data).data[0])
          this.richImg = this.expression.join(',')
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
    // 定位
    chooseLocation () {
      var that = this
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          that.location = res.name
          that.latitude = res.latitude
          that.longitude = res.longitude
        },
        fail: (res) => {
          wx.getSetting({
            success: function (res) {
              var statu = res.authSetting
              if (!statu['scope.userLocation']) {
                wx.showModal({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                  success: function (tip) {
                    if (tip.confirm) {
                      wx.openSetting({
                        success: function (data) {
                          if (data.authSetting['scope.userLocation'] === true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            // 授权成功之后，再调用chooseLocation选择地方
                            wx.chooseLocation({
                              success: function (res) {
                                // obj.setData({
                                //   addr: res.address
                                // })
                              }
                            })
                          } else {
                            wx.showToast({
                              title: '授权失败',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        },
                        fail: function (res) {
                          wx.showToast({
                            title: '调用授权窗口失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      })
    },
    // 发布
    save () {
      const salesmanId = wx.getStorageSync('salesmanId')
      const businessId = wx.getStorageSync('businessId')
      const tradeId = wx.getStorageSync('tradeId')
      // if (this.imgUrlList !== '') {
      //   this.imgUrlList = this.imgUrlList.join(',')
      // }
      if (this.location === '定位') {
        this.address = ''
      } else {
        this.address = this.location
      }
      this.$fly.request({
        method: 'post',
        url: '/dynamic/insert',
        body: {
          'salesmanId': salesmanId,
          'businessId': businessId,
          'content': this.title,
          'imgUrlListOut': this.imgUrlList,
          'videoUrl': this.video,
          'address': this.address,
          'longitude': this.longitude,
          'latitude': this.latitude,
          'tradeId': tradeId,
          'type': this.goodsStyleTypeId
        }
      }).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '发布成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack(-1)
          }, 2000)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    txtInput (e) {
    },
    gotoConsummate () {
      wx.navigateTo({
        url: `../consummate/main`
      })
    }
  }
}
</script>

<style lang='less' scoped>
.product{
    width: 100%;
    height: 100%;
    background:rgba(242,242,242,1);
    .product-Header{
        width: 100%;
        height: 290rpx;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .product-main{
        width: 100%;
        background-color: #fff;
        padding: 24rpx 39rpx;
        box-sizing: border-box;
        border-bottom:2rpx solid #ccc;
        .trends{
          width: 100%;
          height: 80rpx;
          border-bottom: 2rpx solid #ccc;
          p{
            font-size: 28rpx;
            font-family:PingFang-SC-Regular,PingFang-SC;
            font-weight:400;
            color:rgba(0,0,0,1);
            line-height:80rpx;
          }
        }
        .issue{
          width: 100%;
          margin: 20rpx 24rpx 0 580rpx;
          box-sizing: border-box;
          button{
            width: 87rpx;
            height: 52rpx;
            background: #FF903F;
            color: #fff;
            line-height: 52rpx;
            text-align: center;
          }
        }
        .uploadImg{
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
              p{
                font-size: 28rpx;
              }
          }
        }
        .address{
          margin-top: ~'20rpx';
          width: 100%;
          .icont{
            .icondizhi-copy{
              font-size: ~'30rpx';
              display: inline-block;
            }
          }
        .map{
          font-size: ~'28rpx';
        }
        .text{
          width: 100%;
          textarea{
            width: 100% !important;
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
    .productInfomation{
      padding: 24rpx 39rpx;
      box-sizing: border-box;
      background-color: #fff;
      .product-details{
        width: 150rpx;
        height: 150rpx;
        background-color: #ccc;
        text-align: center;
        margin-top: 16rpx;
        padding-top: 30rpx;
        box-sizing: border-box;

      }
    }
}
</style>
