<template>
  <div class="release">
    <div class="main">
      <div class="maintop">
        <div class="studs">
            <span class="title">类型</span>
            <picker class="choose" mode="selector" :value="indexB" :range="valueB" range-key="typeName" @change="bindPickerChangeB" >
              <span class="picker">{{valueB[indexB].typeName}}<i class="iconfont  iconyouce Down"></i></span>
            </picker>
        </div>
        <div class="text">
          <textarea v-model="title" class="inputMsg" placeholder="请输入内容" maxlength="300" @input="txtInput"></textarea>
        </div>
        <div class="upload" v-if="photoId == 1">
          <uploadImgA ref="imgUrlList" :srcs="imgUrlList" width="207rpx" height="207rpx" max="9" @choosed="choosed" @delete=""></uploadImgA>
        </div>
        <div class="upload" v-if="videoId == 1">
          <uploadVideo ref="video" :srcs="video" width="207rpx" height="207rpx"  max="1" @choosedvideo="choosedvideo"></uploadVideo>
        </div>
        <div class="address" @click="chooseLocation()">
        <span class="icont">
          <i class="iconfont icondizhi-copy"></i>
        </span>
          <span class="map"> {{ location }}</span>
        </div>
      </div>
      <div class="bottom"  v-if="opId" >
        <!--<span class="cancel">取消</span>-->
        <span class="sure" @click="update(opId)">更新</span>
      </div>

      <div class="bottom" v-else>
        <span class="sure" @click="save()">确定</span>
        <!--<span class="cancel">取消</span>-->
      </div>
    </div>
  </div>
</template>
<script>
import uploadImgA from '@/components/uploadImgA'
import uploadVideo from '@/components/uploadVideo'
import { UPLOAD_API } from '@/api/uploadFile'
export default {
  name: 'index',
  components: {
    uploadImgA,
    uploadVideo
  },
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
      richTextList: [],
      opId: '',
      valueB: [{
        type: ''
      }], // 分类,
      goodsStyleTypeId: ''
    }
  },
  methods: {
    bindPickerChangeB (e) {
      this.indexB = parseInt(e.mp.detail.value)
      this.goodsStyleTypeId = this.valueB[this.indexB].id
    },
    // 获取产品模板
    getGoodB () {
      const businessId = wx.getStorageSync('businessId')
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/dynamicCategory/selectAll',
        body: {
          'businessId': businessId
        }
      }).then(res => {
        if (res.data) {
          this.valueB = res.data
          this.goodsStyleTypeId = this.valueB[0].id
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // getEditMain 编辑获取页面
    getEditMain (id) {
      const userId = wx.getStorageSync('userId')
      this.$fly.request({
        method: 'get',
        url: '/dynamic/selectOne',
        body: {
          'id': id,
          'userId': userId
        }
      }).then(res => {
        // console.log('res', res.data)
        if (res.data) {
          if (res.data.imgUrl !== null) {
            const imgUrl = res.data.imgUrl
            this.imgUrlList = imgUrl
          }
          this.title = res.data.content
          // console.log('aaa', this.imgUrlList)
          if (res.data.address) {
            this.location = res.data.address
          }
          const type = res.data.type
          console.log('typeName', type)
          console.log('valueB', this.valueB)
          this.valueB.map((item, index) => {
            if (item.id === type) {
              console.log('aaa', index)
              this.indexB = index
            }
          })
          this.video = res.data.videoUrl
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 上传视频
    choosedvideo (val) {
      if (val.all) {
        this.video = val.all
      } else {
        this.video = ''
      }
    },
    // 选择图片
    choosed (val) {
      // console.log('vaaaaal', this.imgUrlList)
      if (val.all) {
        this.imgUrlList = val.all
      } else {
        this.imgUrlList = ''
      }
      // console.log('val', this.imgUrlList)
    },
    txtInput (e) {
    },
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
    // 更新动态
    update (id) {
      // console.log('this.imgUrlList', this.imgUrlList)
      const salesmanId = wx.getStorageSync('salesmanId')
      const businessId = wx.getStorageSync('businessId')
      const tradeId = wx.getStorageSync('tradeId')
      // if (this.imgUrlList !== '') {
      //   this.imgUrlList = this.imgUrlList.join(',')
      // }
      // console.log('imgUrlList', this.imgUrlList)
      if (this.location === '定位') {
        this.address = ''
      } else {
        this.address = this.location
      }
      if (this.photoId === '1') {
        this.$fly.request({
          method: 'post',
          url: '/dynamic/update',
          body: {
            'id': id,
            'salesmanId': salesmanId,
            'businessId': businessId,
            'content': this.title,
            'imgUrlListOut': this.imgUrlList,
            'address': this.address,
            'longitude': this.longitude,
            'latitude': this.latitude,
            'tradeId': tradeId,
            'type': this.goodsStyleTypeId
          }
        }).then(res => {
          if (res.code === 200) {
            wx.showToast({
              title: '更新成功',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              setTimeout(function () {
                wx.navigateBack(-1)
              }, 2000)
            }, 2000)
          }
        }).catch(err => {
          console.log(err)
        })
      } else if (this.photoId === 0) {
        const token = wx.getStorageSync('token')
        wx.request({
          method: 'POST', // post/get 请求方式
          url: UPLOAD_API + '/dynamic/update',
          data: {
            'id': id,
            'salesmanId': salesmanId,
            'businessId': businessId,
            'content': this.title,
            'videoUrl': this.video,
            'address': this.address,
            'longitude': this.longitude,
            'latitude': this.latitude,
            'tradeId': tradeId,
            'type': this.goodsStyleTypeId
          },
          header: {
            'token': token
          },
          success: function (res) {
            console.log('res', res)
            wx.showToast({
              title: '更新成功',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              setTimeout(function () {
                wx.navigateBack(-1)
              }, 2000)
            }, 2000)
          }
        })
      //   this.$fly.request({
      //     method: 'post',
      //     url: '/dynamic/update',
      //     body: {
      //       'id': id,
      //       'salesmanId': salesmanId,
      //       'businessId': businessId,
      //       'content': this.title,
      //       'videoUrl': this.video,
      //       'address': this.address,
      //       'longitude': this.longitude,
      //       'latitude': this.latitude,
      //       'tradeId': tradeId,
      //       'type': this.goodsStyleTypeId
      //     }
      //   }).then(res => {
      //     if (res.code === 200) {
      //       wx.showToast({
      //         title: '更新成功',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //       setTimeout(function () {
      //         setTimeout(function () {
      //           wx.navigateBack(-1)
      //         }, 2000)
      //       }, 2000)
      //     }
      //   }).catch(err => {
      //     console.log(err)
      //   })
      }
    },
    // 添加动态
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
    }
  },
  onLoad (option) {
    this.getGoodB()
    // console.log('option', option)
    if (option.status !== false) {
      if (option.id) {
        this.getEditMain(option.id)
        this.opId = option.id
      } else {
        this.opId = ''
      }
      this.status = option.status
      if (option.photo) {
        this.photoId = option.photo
        this.videoId = 0
      } else if (option.video) {
        this.photoId = 0
        this.videoId = option.video
      } else {
        this.videoId = 0
        this.photoId = 0
      }
    } else if (option === {}) {
      this.title = ''
      this.video = ''
      this.imgUrlList = ''
      this.location = ''
      this.latitude = wx.getStorageSync('latitude')
      this.longitude = wx.getStorageSync('longitude')
      this.status = false
    }
  },
  onShow () {
  },
  onUnload () {
    this.location = '定位'
    this.latitude = ''
    this.longitude = ''
    this.title = ''
    this.video = ''
    this.imgUrlList = ''
    this.goodsStyleTypeId = ''
    this.indexB = 0
  }
}
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
