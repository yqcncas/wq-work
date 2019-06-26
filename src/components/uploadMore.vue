<template>
  <div class="j-pic-upload">
    <div class="j-upload-btn" @click="uploadImg()" :style="{'width': '150rpx','height': '103rpx'}">
      <p class="j-upload-add iconaddgrey iconfont"></p>
      <p class="">插入图片</p>
    </div>
    <div class="imgList" v-for="(src,index) in urls" :key="src">
      <img @click="previewImg(index)" :src="src" class="img" >
      <i v-if="urls.length!== 0" @click="deleteA(index)" class="iconfont iconshanchu-copy delete"></i>
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
      // 删除
      deleteA (index) {
        this.urls.splice(index, 1)
      },
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
            that.$emit('choosedMore', { all: that.urls })
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
              that.$emit('choosedMore', that.urls)
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .j-pic-upload{
    padding: ~'20rpx' 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .j-upload-btn{
    /*border: 1px solid #ddd;*/
    display: inline-block;
    /*flex-direction: ;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    background: #ffffff;
    border: ~'1rpx' solid #d8d8d8;
    text-align: center;
    .iconaddgrey{
      color: #999999;
      margin-top: ~'20rpx';
      font-size: ~'28rpx'!important;
    }
    p{
      width: ~'150rpx';
      display: inline-block;
      font-size: ~'24rpx';
    }
  }
  .j-upload-add{
    font-weight: 500;
    color:#C9C9C9;
  }
  .imgList{
    position: relative;
    width: 100%;
    height: 100%;
    .iconshanchu-copy{
      font-size: ~'50rpx';
      display: inline-block;
      color: #999999;
    }
    .img{
      /*padding:~'10rpx' ~'17rpx' ~'10rpx' 0;*/
      width: ~'670rpx';
      padding: ~'40rpx' 0 0;
      display: block;
    }
    .delete{
      font-size: ~'36rpx';
      position: absolute;
      top:~'0rpx';
      right: ~'-10rpx';
    }
  }
  /*.img:nth-child(3n){*/
    /*margin: 0;*/
  /*}*/
  .iconaddgrey{
    color: #ffffff;
  }
</style>
