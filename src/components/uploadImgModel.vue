<template>
  <div class="j-pic-upload">
    <div class="j-upload-btn" @click="uploadImg()" :style="{'width':width || '120rpx','height':height || '120rpx'}">
      <span class="j-upload-add iconaddgrey iconfont"></span>
    </div>
    <img @click="previewImg(index)" :src="urls" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img"  alt="">
  </div>
</template>

<script>
  import { UPLOAD_FILE } from '@/api/uploadFile'
  export default {
    // props: ['width', 'height', 'max', 'srcs', 'value'],
    props: {
      width: {
        type: Object,
        default: {}
      },
      height: {
        type: String,
        default: ''
      },
      max: {
        type: Object,
        default: {}
      },
      srcs: {
        type: String,
        default: ''
      },
      value: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        urls: ''
      }
    },
    watch: {
      srcs (newValue, oldValue) {
        this.urls = ''
        console.log('newValueaaaa', newValue)
        if (newValue) {
          this.urls = newValue
          console.log('this.urls', this.urls)
          // newValue.map((item) => {
          //   this.urls.push({ imgUrl: item.imgUrl })
          // })
        }
      }
    },
    onShow () {
    },
    methods: {
      uploadImg () {
        let that = this
        if (this.urls.length < 1) {
          wx.chooseImage({
            count: that.max || 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              // res.tempFilePaths.forEach(v => {
              //   that.urls.push({ imgUrl: v })
              // })
              const token = wx.getStorageSync('token')
              wx.uploadFile({
                url: UPLOAD_FILE + '?filedir=companyInfo',
                filePath: res.tempFilePaths[0],
                name: 'file',
                header: {
                  'Content-Type': 'image/jpeg',
                  token: token
                },
                methods: 'POST',
                success: (res) => {
                  // 上传成功之后再把图片的地址更新到个人信息接口
                  // that.urls.push({imgUrl: JSON.parse(res.data).data[0]})
                  // that.$emit('choosed', { all: that.urls })
                  that.urls = JSON.parse(res.data).data[0]
                  console.log('aaa', that.urls)
                  that.$emit('choosed', { all: that.urls, currentUpload: res.tempFilePaths })
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '只能上传一张图片',
            icon: 'none',
            duration: 2000
          })
        }
      },
      previewImg (index) {
        let that = this
        wx.showActionSheet({
          itemList: ['预览', '删除'],
          success: function (res) {
            console.log('55', res)
            const urlA = that.urls.split('')
            if (res.tapIndex === 0) {
              wx.previewImage({
                current: urlA[index],
                urls: urlA
              })
            } else {
              that.urls = ''
              that.$emit('choosed', { all: that.urls, currentUpload: res.tempFilePaths })
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .j-pic-upload{
    padding: ~'10rpx'  ~'10rpx'  ~'10rpx' 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .j-upload-btn{
    border: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: ~'20rpx';
  }
  .j-upload-add{
    font-weight: 500;
    color:#C9C9C9;
  }
  .img{
    margin:~'0rpx' ~'20rpx' ~'0rpx' 0;
  }
</style>
