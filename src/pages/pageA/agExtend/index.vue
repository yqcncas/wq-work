<template>
  <div class="ag-extend-page">
    <swiper indicator-dots circular @change="changeImg">
      <block v-for="(item, index) in imgList" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" mode="widthFix" />
        </swiper-item>
      </block>
    </swiper>
    <image class="code-img" :src="url" mode="widthFix" width="248"></image>
    <p class="tip-txt">保存海报，即可到朋友圈分享</p>
    <button class="save-btn" @click="canvasToImg(saveImageToPhoto)">保存图片</button>
    <canvas canvas-id="myImg" class="canvas" hidden />
  </div>
</template>
<script>
  import apiPerson from '@/api/person'
  export default {
    data () {
      return {
        url: '',
        current: 0,
        width: null,
        codeTempUrl: '',
        saveImg: '',
        tempList: [],
        imgList: ['/static/images/agencyBg1.png']
      }
    },
    methods: {
      async getUrl () {
        const { data } = await apiPerson.agExtend()
        this.url = data
        wx.downloadFile({
          url: this.url,
          success: (res) => {
            this.codeTempUrl = res.tempFilePath
            wx.getSystemInfo({
              success: (res) => {
                this.width = res.windowWidth
                this.canvasImg()
                wx.hideLoading()
              }
            })
          }
        })
      },
      changeImg (e) {
        this.current = e.target.current
        this.canvasImg()
      },
      cal (num) {
        return (this.width * 2 / 750) * num
      },
      canvasImg () {
        const ctx = wx.createCanvasContext('myImg')
        ctx.setFillStyle('white')
        ctx.fillRect(0, 0, this.cal(375), this.cal(600))
        ctx.drawImage(this.imgList[this.current], 0, 0, this.cal(375), this.cal(600))
        ctx.drawImage(this.codeTempUrl, this.cal(118), this.cal(250), this.cal(140), this.cal(140))
        ctx.draw()
      },
      canvasToImg (callback) {
        wx.showLoading({
          title: '保存中...',
          mask: true
        })
        wx.canvasToTempFilePath({
          canvasId: 'myImg',
          success: (res) => {
            this.saveImg = res.tempFilePath
            callback()
          },
          fail: (res) => {
            console.log(res)
          }
        })
      },
      // 保存图片到相册
      saveImageToPhoto () {
        if (this.saveImg !== '') {
          wx.saveImageToPhotosAlbum({
            filePath: this.saveImg,
            success: () => {
              wx.showModal({
                title: '保存图片成功',
                content: '已经保存到相册，您可以手动分享到朋友圈！',
                showCancel: false
              })
            },
            fail: (res) => {
              if (res.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
                wx.showModal({
                  title: '保存图片失败',
                  content: '您已取消保存图片到相册！',
                  showCancel: false
                })
              } else {
                wx.showModal({
                  title: '提示',
                  content: '保存图片失败，您可以点击确定设置获取相册权限后再尝试保存！',
                  complete: (res) => {
                    if (res.confirm) {
                      wx.openSetting({}) // 打开小程序设置页面，可以设置权限
                    } else {
                      wx.showModal({
                        title: '保存图片失败',
                        content: '您已取消保存图片到相册！',
                        showCancel: false
                      })
                    }
                  }
                })
              }
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        }
      }
    },
    onLoad () {
      wx.showLoading({
        title: '正在生成中...',
        mask: true
      })
      this.getUrl()
    }
  }
</script>
<style lang='scss'>
  @import "style";
</style>
