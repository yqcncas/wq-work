<template>
  <div class="release">
    <div class="main">
      <div class="top"  v-if="opId" >
        <!--<span class="cancel">取消</span>-->
        <span class="sure" @click="update(opId)">更新</span>
      </div>
      <div class="top" v-else>
        <span class="sure" @click="save()">确定</span>
        <!--<span class="cancel">取消</span>-->
      </div>
      <div class="text">
        <textarea v-model="title" class="inputMsg" placeholder="请输入内容" @input="txtInput"></textarea>
      </div>
      <div class="upload" v-if="photoId == 1">
        <uploadImgA ref="imgUrlList" :srcs="imgUrlList" width="207rpx" height="207rpx" max="9" @choosed="choosed" @delete=""></uploadImgA>
      </div>
      <div class="upload" v-if="videoId == 1">
        <uploadVideo ref="video" :srcs="video" width="207rpx" height="207rpx"  max="1" @choosedvideo="choosedvideo" @delete=""></uploadVideo>
      </div>
      <div class="address" @click="chooseLocation()">
        <span class="icont">
          <i class="iconfont icondizhi-copy"></i>
        </span>
        <span class="map"> {{ location }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import uploadImgA from '@/components/uploadImgA'
import uploadVideo from '@/components/uploadVideo'
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
      location: '定位',
      title: '',
      imgUrlList: '',
      video: '',
      imgUrl: '',
      richTextList: [],
      opId: ''
    }
  },
  methods: {
    // getEditMain 编辑获取页面
    getEditMain (id) {
      const userId = wx.getStorageSync('userId')
      this.$fly.request({
        method: 'get',
        url: 'server/dynamic/selectOne',
        body: {
          'id': id,
          'userId': userId
        }
      }).then(res => {
        console.log('aaa', res)
        this.imgUrlList = res.data.imgUrlList
        this.title = res.data.title
        this.location = JSON.parse(res.data.address)
        this.video = res.data.video
      }).catch(err => {
        console.log(err)
      })
    },
    choosed (val) {
      if (val.all) {
        this.imgUrlList = val.all
      }
    },
    // 上传视频
    choosedvideo (val) {
      if (val.all) {
        this.video = val.all
        console.log('val', val.all)
      }
    },
    txtInput (e) {
    },
    chooseLocation () {
      var that = this
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          console.log(res.name)
          that.location = res.name
        }
      })
    },
    // 更新动态
    update (id) {
      console.log(id)
      const salesmanId = wx.getStorageSync('salesmanId')
      const businessId = wx.getStorageSync('businessId')
      this.$fly.request({
        method: 'post',
        url: 'server/dynamic/update',
        body: {
          'id': id,
          'salesmanId': salesmanId,
          'businessId': businessId,
          'title': this.title,
          'imgUrlList': this.imgUrlList,
          'video': this.video,
          'address': this.location
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
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    },
    // 添加动态
    save () {
      const salesmanId = wx.getStorageSync('salesmanId')
      const businessId = wx.getStorageSync('businessId')
      this.$fly.request({
        method: 'post',
        url: 'server/dynamic/insert',
        body: {
          'salesmanId': salesmanId,
          'businessId': businessId,
          'title': this.title,
          'imgUrlList': this.imgUrlList,
          'video': this.video,
          'address': this.location
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
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  onLoad (option) {
    if (option.status !== false) {
      if (option.id) {
        this.getEditMain(option.id)
        this.opId = option.id
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
      this.status = false
    }
  },
  onShow () {
  },
  onUnload () {
    this.location = '定位'
    this.title = ''
    this.video = ''
    this.imgUrlList = ''
  }
}
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
