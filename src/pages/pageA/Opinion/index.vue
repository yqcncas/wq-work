<template>
  <div class="opinion">
    <div class="problem">
      <p class="title">反馈问题</p>
      <textarea class="input" placeholder="请输入需要反馈的问题" width="100%" height="250rpx"></textarea>
    </div>
    <div class="PIMG">
      <p class="title">相关截图 （选填）</p>
      <div class="img-wrap flexRow">
        <div class="common-size img-margin" v-for="(item,index) in richTextList" :key="index">
          <image :src="item" class="common-size" mode="aspectFill" @click="previewImg(item)"></image>
          <!--<image class="delete-img" src="/static/images/delete.png" mode="widthFix" @click="deleteImgList(index)"></image>-->
          <i class="iconfont iconshanchu-copy delete-img" @click="deleteImgList(index)"></i>
        </div>
        <div class="common-size add-img" @click="chooseImageList" v-if="richTextList.length!==4">
          <i class="iconfont iconxiangji"></i>
          <p>上传截图</p>
          <p>(最多四张)</p>
        </div>
      </div>
    </div>
    <div class="phone">
      <p class="title">联系方式 （选填）</p>
      <input placeholder="邮箱/手机号">
    </div>
    <div class="fotter">
      <button>提交</button>
    </div>
  </div>
</template>

<script>
  import { UPLOAD_FILE } from '@/api/uploadFile'
  export default {
    name: 'index',
    data () {
      return {
        richTextList: []
      }
    },
    methods: {
      // 删除图片
      deleteImgList (i) {
        this.richTextList.splice(i, 1)
        this.richImg = this.richTextList.join(',')
      },
      previewImg (img) {
        wx.previewImage({
          current: img,
          urls: this.richTextList
        })
      },
      // 选择照片列表组
      chooseImageList (e) {
        wx.chooseImage({
          count: 9, // 一次最多可以选择的图片张数
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            this.imgUrl = null
            let successUp = 0 // 成功
            let failUp = 0 // 失败
            let length = res.tempFilePaths.length // 总数
            let count = 0 // 第几张
            this.uploadOneByOne(res.tempFilePaths, successUp, failUp, count, length)
          },
          fail: function () {
          },
          complete: function () {
          }
        })
      },
      uploadOneByOne (imgPaths, successUp, failUp, count, length) {
        const token = wx.getStorageSync('token')
        wx.showLoading({
          title: '正在上传第' + count + '张'
        })
        wx.uploadFile({
          url: UPLOAD_FILE + '?filedir=voucher',
          filePath: imgPaths[count],
          name: 'file',
          header: {
            'Content-Type': 'image/jpeg',
            token: token
          },
          methods: 'POST',
          success: (res) => {
            successUp++ // 成功+1
            // 上传成功之后再把照片的图片列表更新到个人信息接口
            this.richTextList.push(JSON.parse(res.data).data[0])
            this.richImg = this.richTextList.join(',')
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
      }
    }
  }
</script>

<style lang="less" scoped>
  .opinion{
    width: 100%;
    overflow: hidden;
    .fotter{
      width: 100%;
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: ~'50rpx';
      button{
        display: inline-block;
        width: ~'654rpx';
        height: ~'97rpx';
        line-height: ~'97rpx';
        background: #FF8848;
        color: #ffffff;
        font-size: ~'30rpx';
      }
    }
    .problem{
      margin-top: ~'10rpx';
      padding: ~'20rpx' ~'60rpx';
      background: #ffffff;
      border-bottom: ~'1rpx' solid #CCCCCC;
      .title{
        font-size: ~'28rpx';
        color: #5B5B5B;
      }
      .input{
        margin-top: ~'20rpx';
        font-size: ~'28rpx';
        display: inline-block;
        width: 100%;
        height: ~'150rpx';
        color: #CCCCCC;
      }
    }
    .phone{
      padding: ~'20rpx' ~'60rpx' ~'40rpx';
      background: #ffffff;
      .title{
        font-size: ~'28rpx';
        color: #5B5B5B;
      }
      input{
        margin-top: ~'20rpx';
        font-size: ~'28rpx';
        color: #CCCCCC;
      }
    }
    .PIMG{
      padding: ~'20rpx' ~'60rpx' ~'40rpx';
      background: #ffffff;
      border-bottom: ~'1rpx' solid #CCCCCC;
      .title{
        font-size: ~'28rpx';
        color: #5B5B5B;
      }
      .img-wrap {
        margin-top: ~'20rpx';
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        .common-size {
          width: 150rpx;
          height: 150rpx;
        }

        .img-margin {
          margin-right: 30rpx;
          position: relative;
        }

        .img-margin:nth-child(4) {
          margin-right: 0;
        }

        .add-img {
          border: 2rpx dashed #ccc;
          text-align: center;
          padding-top: 10rpx;
          box-sizing: border-box;
          font-size: 22rpx;
          color: #bbb;
          display: inline-block;
        }

        .iconxiangji {
          color: #bbb;
          font-size: 60rpx;
          display: inline-block;
          line-height: 1;
        }

        .delete-img {
          position: absolute;
          width: 50rpx;
          right: -18rpx;
          top: 0;
        }
        .iconshanchu-copy{
          color: #F2F2F2;
          font-size: 32rpx;
        }
      }
    }
  }
</style>
