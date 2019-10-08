<template>
  <div class="consummate">
    <div class="consummate-Header">
       <img src="/static/images/Information3.jpg" alt="">
    </div>
    <div class="consummate-main">
      <div class="email">
        <label>邮箱</label>
        <input v-model="email" placeholder="请输入邮箱" placeholder-style = 'text-align:end'/>
      </div>
      <div class="address">
        <label>地址</label>
        <picker mode="region" class="pick-region" @change="bindRegionChange" :value="region">
          <view type="text" placeholder="省份、城市、区县" class="pick-item-s">{{address}}</view>
        </picker>
      </div>
      <div class="location">
        <label>定位</label>
        <input v-model="addDetailed"/>
        <p @click="chooseLocation()">
          <!--<img src="../../../static/images/map.png">-->
          <i class="iconfont icondingweiweizhi"></i>
        </p>
      </div>
      <div class="video">
        <div class="video-top">
          <span>视频</span>
        </div>
        <div class="video-main" @click="chooseVideo">
          <i class="iconfont iconxiangji"></i>
          <p>上传视频</p>
        </div>
        <div class="up-video" v-if="video">
          <video id="myVideo" v-if="videoFlag" :src="video" @play="playA()" @ended=" end()" autoplay objectFit="fill" class="cover-hw"></video>
          <div v-else class="cover-view" >
            <div v-if="video!== '' && video!== null" @click="videoPlay">
              <i class="delete-img iconfont iconshanchu-copy" @click="deleteVideo"></i>
              <img class="FMimg" :src="videoImg" mode="scaleToFill" />
              <div class="model-btn">
                <div class="play-icon">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="next" @click="gotoProduct">完成</button>
  </div>
</template>

<script>
  import { UPLOAD_FILE, UPLOAD_API } from '@/api/uploadFile'
  export default {
    data () {
      return {
        email: '',
        addDetailed: '',
        address: ['北京市', '北京市', '东城区'],
        region: '北京市北京市东城区',
        latitude: '',
        longitude: '',
        playVoiceFlag: false,
        videoFlag: false,
        video: '',
        videoImg: ''
      }
    },
    methods: {
      bindRegionChange (e) {
        var value = e.mp.detail.value
        this.address = value[0] + '' + value[1] + '' + value[2]
        this.region = value
        console.log('value', value)
      },
      chooseLocation () {
        var that = this
        wx.chooseLocation({
          success: (res) => {
            console.log(res)
            that.addDetailed = res.name
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
      // 上传视频
      chooseVideo (e) {
        const videoContext = wx.createVideoContext('myVideo')
        videoContext.stop()
        this.videoFlag = false
        wx.chooseVideo({
          sourceType: ['album', 'camera'],
          camera: ['front', 'back'],
          success: (res) => {
            this.video = res.tempFilePath
            // 上传完成后把文件上传到服务器
            const token = wx.getStorageSync('token')
            wx.uploadFile({
              url: UPLOAD_FILE + '?filedir=salesVideo',
              filePath: res.tempFilePath,
              name: 'file',
              header: {
                'Content-Type': 'image/jpeg',
                token: token
              },
              methods: 'POST',
              success: (res) => {
                this.video = JSON.parse(res.data).data[0]
                this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
                this.getSalesmanUpdate()
              },
              fail: (res) => {
              }
            })
          },
          fail: function () {
          },
          complete: function () {
          }
        })
      },
      // 删除视频
      deleteVideo () {
      // 更新一下个人信息接口，图片传‘’
        this.videoFlag = false
        this.video = ''
        this.getSalesmanUpdate()
      },
      playA () {
        this.videoFlag = true
      },
      // 播放结束
      end () {
        this.videoFlag = false
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
      getSalesmanUpdate () {
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
                wx.showToast({
                  title: '更新成功',
                  icon: 'none',
                  duration: 2000
                })
              }
            },
            fail: function (res) {
              console.log(res)
              console.log(1111)
            },
            complete: function (res) {
              console.log(res)
            }
          })
          this.insertOpera('完善了资料', 10)
        }
      },
      videoPlay () {
        this.videoFlag = true
      }
    }
  }
</script>

<style lang='less' scoped>
.consummate{
    width: 100%;
    height: 100%;
    background:rgba(242,242,242,1);
    .consummate-Header{
        width: 100%;
        height: 290rpx;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .consummate-main{
      width: 100%;
      .email{
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 56rpx 0 39rpx;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom: 2rpx solid #ccc;
        input{
          width: 40%;
          transform: translateY(52%);
        }
      }
      .address{
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 56rpx 0 39rpx;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom: 2rpx solid #ccc;
        .pick-region {
          position: relative;
          width: 80%;
          text-align: end;
          line-height: 78rpx;
          .pick-item-s {
            width: 80%;
            font-size: ~'30rpx';
            display: inline-block;
            vertical-align: middle;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            margin-top: ~'8rpx';
          }
        }
      }
      .location{
        display: flex;
        justify-content: space-between;
        align-content: center;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 56rpx 0 39rpx;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom: 2rpx solid #ccc;
        input{
          transform: translate(25%,50%);
          overflow: hidden;
          white-space : nowrap;
          text-overflow:ellipsis;
        }
      }
      .video{
        width: 100%;
        background-color: #fff;
        .video-top{
          width: 100%;
          padding: 0 56rpx 0 39rpx;
          box-sizing: border-box;
        }
        .video-main{
          width: 150rpx;
          height: 150rpx;
          background-color: #ccc;
          text-align: center;
          padding-top: 30rpx;
          box-sizing: border-box;
          margin: 26rpx 0 0 39rpx;
          p{
            font-size: 24rpx;
            color: #9D9D9D;
          }
        }
        .up-video {
          display: inline-block;
          width: ~'615rpx';
          height: ~'410rpx';
          border-radius: ~'8rpx';
          margin-top: 80rpx;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          /*视频样式接口*/
          .cover-view {
            display: inline-block;
            width: 100%;
            height: 100%;
            position: relative;
            .delete-img {
              position: absolute;
              width: ~'60rpx';
              right: ~'6rpx';
              height: ~'60rpx';
              top: ~'6rpx';
              color:#fff;
            }
            .FMimg{
              width: 100%;
              height: ~'400rpx';
              display: inline-block;
            }
            .model-btn {
              position: absolute;
              left: 0;
              top: ~'0rpx';
              bottom: 0;
              right: 0;
              margin: ~'140rpx' auto 0;
              width: ~'140rpx';
              height: ~'140rpx';
              border: ~'4rpx' solid #fff;
              display: inline-block;
              border-radius: 50%;
              background-color: rgba(0, 0, 0, 0.3);
            }

            .play-icon {
              margin: ~'38rpx' ~'50rpx';
              border-top: ~'33rpx' solid transparent;
              border-left: ~'54rpx' solid #fff;
              border-bottom: ~'33rpx' solid transparent;
            }

            image {
              width: 100%;
              height: 100%;
              border-radius: ~'10rpx';
            }
            position: relative;
            width: 100%;
            height: 100%;
          }
        }
          }
    }
    .next{
      width:654rpx;
      height:97rpx;
      background:rgba(255,104,80,1);
      border-radius:8rpx;
      margin: 130rpx auto 0 auto;
    }
}
</style>
