<template>
  <div class="j-pic-upload">
    <img @click="previewImg(index)" v-for="(src,index) in urls" :key="src" :src="src" :style="{'width':width || '200rpx','height':height || '200rpx'}" class="img" >
    <div v-if="urls.length < 9" class="j-upload-btn" @click="uploadImg()" :style="{'width':width || '200rpx','height':height || '200rpx'}">
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
        urls: [],
        urlsA: [],
        imgUrl: null,
        richTextList: []
      }
    },
    watch: {
      srcs (newValue, oldValue) {
        console.log('newValue', newValue)
        if (newValue.length > 0) {
          this.urls = newValue
        } else {
          this.urls = newValue || []
        }
      }
    },
    methods: {
      uploadImg () {
        let that = this
        wx.chooseImage({
          count: that.max || 9,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            // res.tempFilePaths.forEach(v => {
            //   that.urls.push(v)
            // })
            that.imgUrl = null
            let successUp = 0 // 成功
            let failUp = 0 // 失败
            let length = res.tempFilePaths.length // 总数
            let count = 0 // 第几张
            that.uploadOneByOne(res.tempFilePaths, successUp, failUp, count, length)
          }
        })
      },
      // 上传到oss
      uploadOneByOne (imgPaths, successUp, failUp, count, length) {
        const token = wx.getStorageSync('token')
        let that = this
        wx.showLoading({
          title: '正在上传第' + count + '张'
        })
        wx.uploadFile({
          url: UPLOAD_FILE + '?filedir=dynamic',
          filePath: imgPaths[count],
          name: 'file',
          header: {
            'Content-Type': 'image/jpeg',
            token: token
          },
          methods: 'POST',
          success: (res) => {
            console.log('成功', JSON.parse(res.data).data[0])
            successUp++ // 成功+1
            // 上传成功之后再把照片的图片列表更新到个人信息接口
            that.urls.push(JSON.parse(res.data).data[0])
            // that.urls = that.urlsA
            that.$emit('choosed', { all: that.urls })
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
      previewImg (index) {
        let that = this
        wx.showActionSheet({
          itemList: ['预览', '删除'],
          success: function (res) {
            if (res.tapIndex === 0) {
              wx.previewImage({
                current: that.urls[index],
                urls: that.urls
              })
            } else {
              that.urls.splice(index, 1)
              that.$emit('choosed', that.urls)
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .j-pic-upload{
    padding: ~'10rpx';
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
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
</style>
