<template>
  <div class="j-pic-upload">
    <div :class="{'active':tabA === index,'chooseImg':true}" v-for="(src,index) in urls" :key="index" @click="choose(index)">
       <img :src="src.imgUrl" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img" >
      <span class="delete" @click="deleteImg(index)"><i class="iconfont iconshanchu-copy"></i></span>
      <span class="title" :key="index">{{src.title}}</span>
    </div>
    <div v-if="urls.length < 3" class="j-upload-btn" @click="uploadImg()" :style="{'width':width || '120rpx','height':height || '120rpx'}">
      <span class="j-upload-add iconaddgrey iconfont"></span>
    </div>
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
        type: Array,
        default: []
      },
      value: {
        type: Object,
        default: {}
      }
    },
    data () {
      return {
        urls: [],
        tabA: '',
        title: '',
        chooseStyle: 'chooseImg'
      }
    },
    watch: {
      srcs (newValue, oldValue) {
        this.urls = []
        if (newValue.length <= 3) {
          console.log('newValue', newValue)
          newValue.map((item) => {
            this.urls.push({ imgUrl: item.imgUrl, title: '设为封面' })
          })
          if (this.tabA !== '') {
            this.urls[this.tabA].title = '封面'
          }
        }
      }
    },
    onShow () {
      this.tabA = ''
    },
    methods: {
      // 删除
      deleteImg (index) {
        this.urls.splice(index, 1)
      },
      // 选择封面
      choose (index) {
        // 选择会员
        let that = this
        // console.log('index', index)
        // const coverImg = this.urls[index].imgUrl
        // wx.setStorageSync('coverImg', coverImg)
        if (this.tabA === index) {
          this.tabA = ''
          this.urls[index].title = '设为封面'
          that.$emit('choosed', {all: that.urls, num: that.tabA})
        } else {
          this.tabA = index
          this.urls[index].title = '封面'
          if (this.urls.length === 2) {
            if (this.tabA === 0) {
              this.urls[1].title = '设为封面'
              this.urls[0].title = '封面'
            } else if (this.tabA === 1) {
              this.urls[0].title = '设为封面'
              this.urls[1].title = '封面'
            }
          } else if (this.urls.length === 3) {
            if (this.tabA === 0) {
              this.urls[0].title = '封面'
              this.urls[1].title = '设为封面'
              this.urls[2].title = '设为封面'
            } else if (this.tabA === 1) {
              this.urls[1].title = '封面'
              this.urls[0].title = '设为封面'
              this.urls[2].title = '设为封面'
            } else if (this.tabA === 2) {
              this.urls[2].title = '封面'
              this.urls[1].title = '设为封面'
              this.urls[0].title = '设为封面'
            }
          }
          that.$emit('choosed', {all: that.urls, num: that.tabA})
        }
      },
      uploadImg () {
        let that = this
        if (this.urls.length < 3) {
          wx.chooseImage({
            count: that.max || 3,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              // this.imgUrl = res.tempFilePaths[0]
              /** 上传完成后把文件上传到服务器 */
              const token = wx.getStorageSync('token')
              wx.uploadFile({
                url: UPLOAD_FILE + '?filedir=companyProduce',
                filePath: res.tempFilePaths[0],
                name: 'file',
                header: {
                  'Content-Type': 'image/jpeg',
                  token: token
                },
                methods: 'POST',
                success: (res) => {
                  // 上传成功之后再把图片的地址更新到个人信息接口
                  that.urls.push({imgUrl: JSON.parse(res.data).data[0], title: '设为封面'})
                  that.$emit('choosed', {all: that.urls, num: that.tabA})
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '只能上传三张图片',
            icon: 'none',
            duration: 2000
          })
        }
      },
      previewImg (index) {
        let that = this
        wx.showActionSheet({
          itemList: [],
          success: function (res) {
            console.log('res', that.urls[index].imgUrl)
            const urlA = that.urls[index].imgUrl.split('')
            if (res.tapIndex === 0) {
              wx.previewImage({
                current: '',
                urls: urlA
              })
            } else {
              that.urls.splice(index, 1)
              that.$emit('choosed', { all: that.urls, currentUpload: res.tempFilePaths, num: this.tabA })
            }
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .j-pic-upload{
    /*padding: ~'10rpx'  ~'10rpx'  ~'10rpx' 0;*/
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  .active{
    width: ~'122rpx';
    height: ~'122rpx';
    display: inline-block;
    position: relative;
    border: ~'1rpx' solid #2a94ec!important;
    margin-left: ~'10rpx';
    img{
    }
    .delete{
      position: absolute;
      right: ~'-10rpx';
      top: ~'-10rpx';
      z-index: 9999;
    }
    .title{
      position: absolute;
      bottom: ~'0rpx';
      height: ~'40rpx';
      right: ~'2rpx';
      color: #ffffff;
      width: ~'120rpx';
      text-align: center;
      line-height: ~'40rpx';
      font-size: ~'24rpx';
      z-index: 9999;
      background: rgba(0,0,0,0.3);
    }
  }
  .chooseImg{
    width: ~'122rpx';
    height: ~'122rpx';
    border: ~'1rpx' solid #ffffff;
    display: inline-block;
    position: relative;
    margin-left: ~'10rpx';
    .delete{
      position: absolute;
      right: ~'-10rpx';
      top: ~'-10rpx';
      z-index: 9999;
    }
    .title{
      position: absolute;
      bottom: ~'0rpx';
      height: ~'40rpx';
      right: ~'2rpx';
      color: #ffffff;
      width: ~'120rpx';
      text-align: center;
      line-height: ~'40rpx';
      font-size: ~'24rpx';
      z-index: 9999;
      background: rgba(0,0,0,0.3);
    }
  }
  .j-upload-btn{
    border: ~'1rpx' solid #ddd;
    width: ~'118rpx'!important;
    height: ~'118rpx'!important;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-left: ~'10rpx';
  }
  .j-upload-add{
    font-weight: 500;
    color:#C9C9C9;
  }
  .img{
    margin:~'3rpx' ~'10rpx' ~'0rpx' 0;
  }
</style>
