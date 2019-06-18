<template>
  <div class="wrap-video" :class="{'mar-30-2':data.padding===1}">
    <div class="video-url">
      <div class="cover-wrap">
        <video v-if="videoFlag" id="myVideo" :src="data.videoUrl" objectFit="cover" class="video-top" @ended="videoStop"  @fullscreenchange="fullScreen">
        </video>
        <div v-else class="cover-view" @click="videoPlay">
          <image class="img" :src="data.coverUrl" mode="aspectFill"></image>
          <div class="model-btn">
            <div class="play-icon">
            </div>
          </div>
        </div>
      </div>
      <div class="video-bottom">
        <div class="video-title" :style="{'text-align':(data.textStyle===2?'right':(data.textStyle===1?'center':'left'))}">{{data.title}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      videoNumber: -1,
      videoFlag: false,
      videoContext: null
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    fullScreen () {
      wx.hideTabBar()
    },
    // 结束视频播放的时候
    videoStop () {
      this.videoFlag = false
      this.videoContext = null
    },
    // 播放视频
    videoPlay () {
      this.videoFlag = true
      this.videoContext = wx.createVideoContext('myVideo')
      this.videoContext.play()
    }
  }
}
</script>
<style lang="scss">
.wrap-video {
  display: flex;
  background: #f2f2f2;
  flex-wrap: wrap;
  justify-content: space-between;
  .cover-wrap {
    width: 100%;
    height: 410rpx;
  }
  .video-top {
    width: 100%;
    height: 410rpx;
    display: block;
    margin: 0 auto;
  }
  .video-bottom {
    width: 100%;
    height: 94rpx;
    background-color: #fff;
    padding: 30rpx;
    box-sizing: border-box;
    font-weight: 700;
    font-size: 28rpx;
  }
  .video-url {
    background-color: #fff;
    box-shadow: 2rpx 4rpx 8rpx 0 rgba(218, 218, 218, 0.5);
    position: relative;
    font-size: 0;
    width: 100%;
    overflow: hidden;
    .viedo .video-title {
      padding: 15rpx;
      font-size: 26rpx;
      font-weight: 900;
    }
  }
  .cover-view {
    .img {
      width: 100%;
      height: 410rpx;
    }
    .model-btn {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: 188rpx auto 0;
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .play-icon {
      margin: 28rpx 42rpx;
      border-top: 26rpx solid transparent;
      border-left: 36rpx solid #fff;
      border-bottom: 22rpx solid transparent;
    }

    image {
      width: 100%;
    }

    width: 100%;
    height: 100%;
  }
}
.mar-30-2 {
  .video-url {
    border-radius: 10rpx;
    padding-top: 0;
  }
  .video-top {
    border-top-right-radius: 10rpx;
    border-top-left-radius: 10rpx;
    overflow: hidden;
  }
}
</style>
