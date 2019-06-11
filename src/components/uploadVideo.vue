<template>
  <div class="j-pic-upload">
    <div class="up-video" v-if="video !== '' ">
      <video id="myVideo" v-if="videoFlag" :src="video" @play="playA()" @ended=" end()" objectFit="fill" class="cover-hw"></video>
      <div v-else class="cover-view" >
        <div v-if="video!== ''" @click="videoPlay">
          <i class="delete-img iconfont iconshanchu-copy" @click="deleteVideo"></i>
          <img class="FMimg" :src="videoImg" mode="scaleToFill" />
          <div class="model-btn">
            <div class="play-icon">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="j-upload-btn" @click="uploadVideo()" :style="{'width':width || '200rpx','height':height || '200rpx'}">
      <span class="j-upload-add iconaddgrey iconfont"></span>
    </div>
  </div>
</template>

<script>
  import { UPLOAD_FILE } from '@/api/uploadFile'
  export default {
    props: ['width', 'height', 'max', 'srcs'],
    data () {
      return {
        videoImg: [],
        video: '',
        videoFlag: false
      }
    },
    watch: {
      srcs (newValue, oldValue) {
        if (newValue) {
          this.urls = newValue
          this.video = this.urls
          this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
        } else {
          this.video = ''
        }
      }
    },
    methods: {
      playA () {
        // this.videoFlag = true
      },
      // 播放结束
      end () {
        this.videoFlag = false
      },
      // 上传视频
      uploadVideo (e) {
        wx.chooseVideo({
          sourceType: ['album', 'camera'],
          camera: ['front', 'back'],
          success: (res) => {
            this.video = res.tempFilePath
            // 上传完成后把文件上传到服务器
            const token = wx.getStorageSync('token')
            wx.uploadFile({
              url: UPLOAD_FILE + '?filedir=dynamic',
              filePath: res.tempFilePath,
              name: 'file',
              header: {
                'Content-Type': 'image/jpeg',
                token: token
              },
              methods: 'POST',
              success: (res) => {
                let that = this
                that.video = JSON.parse(res.data).data[0]
                // that.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
                that.$emit('choosedvideo', { all: that.video })
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
      }, // 删除视频
      deleteVideo () {
        // 更新一下个人信息接口，图片传‘’
        this.videoFlag = false
        this.video = ''
      }, // 播放视频
      videoPlay () {
        this.videoFlag = true
        const videoContext = wx.createVideoContext('myVideo')
        videoContext.play()
      }
    }
  }
</script>

<style lang="less" scoped>
  .j-pic-upload{
    padding: ~'10rpx';
  }
  .j-upload-btn{
    /*border: 1px solid #ddd;*/
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #D8D8D8;
  }
  .j-upload-add{
    font-weight: 500;
    color:#C9C9C9;
  }
  .img{
    margin:~'10rpx' ~'17rpx' ~'10rpx' 0;
  }
  .img:nth-child(3n){
    margin: 0;
  }
  .iconaddgrey{
    color: #ffffff;
  }
  .up-video {
    display: inline-block;
    left: ~'45rpx';
    top: ~'427rpx';
    width: ~'100%';
    height: ~'410rpx';
    border-radius: ~'8rpx';
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
        height: ~'130rpx';
        border: ~'4rpx' solid #fff;
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
  .iconshanchu-copy{
    color: #f0f0f0;
    font-size: ~'55rpx';
  }
  #myVideo{

  }
  .cover-hw {
    width: 100%;
    height: 100%;
    position: relative;
    .delete-img {
      z-index: 99999!important;
      position: absolute;
      width: ~'60rpx';
      height: ~'60rpx';
      right: ~'6rpx';
      top: ~'6rpx';
    }
  }
</style>
