<template>
  <div class="poster-page">
    <canvas canvas-id="myCanvas" class="canvas" @click="canvasToImg(previewImg)" />
    <button class="save-to-share" @click="canvasToImg(saveImageToPhoto)">保存名片海报后分享</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      params: {},
      saveImg: '',
      width: null
    }
  },
  methods: {
    canvasToImg (callback) {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
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
              content: '名片海报已经保存到相册，您可以手动分享到朋友圈！',
              showCancel: false,
              success: (res) => {
                if (res.confirm) {
                  this.previewImg()
                }
              }
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
          }
        })
      }
    },
    previewImg () {
      wx.previewImage({
        current: this.saveImg,
        urls: [this.saveImg]
      })
    },
    cal (num) {
      return (this.width * 2 / 750) * num
    },
    showImg () {
      let obj = this.params
      const ctx = wx.createCanvasContext('myCanvas')
      ctx.setFillStyle('white')
      ctx.fillRect(0, 0, this.cal(308), this.cal(492))
      // imgUrl downloadimgUrl
      ctx.drawImage(obj.downloadimgUrl, 0, 0, this.cal(308), this.cal(obj.imgHeight / obj.imgWidth * 308))
      ctx.setFillStyle('white')
      ctx.fillRect(0, this.cal(280), this.cal(308), this.cal(492))
      //   名字
      ctx.setFillStyle('#000')
      ctx.setFontSize(this.cal(21))
      ctx.fillText(obj.name || '', this.cal(25), this.cal(316))
      //   工作
      ctx.setFillStyle('#9D9D9D')
      ctx.setFontSize(this.cal(12))
      ctx.fillText(obj.job || '', this.cal(110), this.cal(315))
      // //   标签
      // this.tagMap(ctx)
      // //   logo downLogo
      // ctx.drawImage(obj.downLogo, this.cal(248), this.cal(308), this.cal(36), this.cal(36))
      //   间距线
      ctx.setFillStyle('#eee')
      ctx.fillRect(this.cal(16), this.cal(380), this.cal(276), this.cal(1))
      //   电话
      ctx.beginPath()
      ctx.arc(this.cal(34), this.cal(405), this.cal(8), 0, 2 * Math.PI)
      ctx.setFillStyle('#FF8848')
      ctx.fill()
      ctx.drawImage('/static/images/icon1.png', this.cal(30), this.cal(401), this.cal(8), this.cal(8))
      ctx.setFillStyle('#9D9D9D')
      ctx.setFontSize(this.cal(12))
      ctx.fillText(obj.fixedPhone || '', this.cal(48), this.cal(410))
      //   微信
      ctx.beginPath()
      ctx.arc(this.cal(34), this.cal(427), this.cal(8), 0, 2 * Math.PI)
      ctx.setFillStyle('#FF8848')
      ctx.fill()
      ctx.drawImage('/static/images/icon2.png', this.cal(30), this.cal(422), this.cal(9), this.cal(9))
      ctx.setFillStyle('#9D9D9D')
      ctx.setFontSize(this.cal(12))
      ctx.fillText(obj.weChat || '', this.cal(50), this.cal(432))
      //   邮件
      ctx.beginPath()
      ctx.arc(this.cal(34), this.cal(449), this.cal(8), 0, 2 * Math.PI)
      ctx.setFillStyle('#FF8848')
      ctx.fill()
      ctx.drawImage('/static/images/icon3.png', this.cal(30), this.cal(445), this.cal(8), this.cal(8))
      ctx.setFillStyle('#9D9D9D')
      ctx.setFontSize(this.cal(12))
      ctx.fillText(obj.email || '', this.cal(50), this.cal(454))
      //   地址
      ctx.beginPath()
      ctx.arc(this.cal(34), this.cal(471), this.cal(8), 0, 2 * Math.PI)
      ctx.setFillStyle('#FF8848')
      ctx.fill()
      ctx.drawImage('/static/images/icon4.png', this.cal(29), this.cal(466), this.cal(10), this.cal(10))
      ctx.setFillStyle('#9D9D9D')
      ctx.setFontSize(this.cal(12))
      ctx.fillText(obj.address || '', this.cal(50), this.cal(476))
      //   太阳码 qrCodeUrl downloadqrCodeUrl
      ctx.drawImage(obj.downloadqrCodeUrl, this.cal(228), this.cal(398), this.cal(64), this.cal(64))
      ctx.draw()
      wx.hideLoading()
    },
    tagMap (context) {
      // let tagX = 25
      // this.params.tagList.map((item) => {
      //   item.width = context.measureText(item.tag).width / ((this.width * 2) / 750) + 12
      //   this.roundRectColor(context, this.cal(tagX), this.cal(330), this.cal(item.width), this.cal(24), this.cal(8))
      //   context.setFontSize(this.cal(12))
      //   context.setFillStyle('#000')
      //   context.fillText(item.tag, this.cal(tagX + 6), this.cal(346))
      //   tagX = item.width + tagX + 6
      // })
    },
    // 绘制圆角矩形（纯色填充）
    roundRectColor (context, x, y, w, h, r) {
      context.setFillStyle('#E9E9E9')
      context.setStrokeStyle('#E9E9E9')
      context.setLineJoin('round') // 交点设置成圆角
      context.setLineWidth(this.cal(r))
      context.strokeRect(x + r / 2, y + r / 2, w - r, h - r)
      context.fillRect(x + r, y + r, w - r * 2, h - r * 2)
      context.stroke()
      context.closePath()
    },
    // 下载资源
    downImg () {
      wx.downloadFile({
        url: this.params.qrCodeUrl,
        success: (res) => {
          if (res.statusCode === 200) {
            this.params.downloadqrCodeUrl = res.tempFilePath
            wx.downloadFile({
              url: this.params.imgUrl,
              success: (res) => {
                if (res.statusCode === 200) {
                  this.params.downloadimgUrl = res.tempFilePath
                  wx.getSystemInfo({
                    success: (res) => {
                      this.width = res.windowWidth
                      this.showImg()
                    }
                  })
                }
              }
            })
            // wx.downloadFile({
            //   url: this.params.logo,
            //   success: (res) => {
            //     if (res.statusCode === 200) {
            //       this.params.downLogo = res.tempFilePath
            //     }
            //   }
            // })
          }
        }
      })
    }
  },
  onLoad (options) {
    this.params = JSON.parse(decodeURIComponent(options.val))
    console.log('aa', this.params)
    wx.showLoading({
      title: '正在生成中...',
      mask: true
    })
    this.downImg()
  }
}
</script>
<style lang="scss">
@import "style";
</style>
