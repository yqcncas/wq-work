<template>
  <div class="more">
    <!--公司产品-->
    <div class="product" v-if="postForm.length>0">
      <!--<div class="product-top">-->
                <!--<span class="product-icont">-->
                <!--<img src="../../../static/images/morebox.png" mode="widthFix">-->
                <!--</span>-->
        <!--<span class="product-title">公司产品</span>-->
        <!--<span class="product-right" @click="goToProductA()">-->
                  <!--更多<img src="../../../static/images/right-cc.png" mode="widthFix">-->
              <!--</span>-->
      <!--</div>-->
      <div class="product-main">
        <div class="product-details" v-for="(item,index) in postForm" :key="index" @click="goToProduct(postForm[index].id)">
          <div class="product-details-img">
            <img :src="item.imgUrl + '?x-oss-process=style/c400'" mode="widthFix"/>
          </div>
          <div class="product-details-title">
            {{ item.name }}
          </div>
          <!--<div class="product-details-title">-->
          <!--{{ item.info }}-->
          <!--</div>-->
          <div class="product-details-click">
            ￥  {{ item.price }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="none">
      <span>无更多产品</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        postForm: [],
        businessId: '',
        salesmanId: '',
        userId: '',
        pageNum: 1,
        pageSize: 6,
        lastPage: 0,
        nextPage: 0
      }
    },
    onShow () {
    },
    onLoad (options) {
      console.log('options', this.salesmanId)
      if (options.id) {
        this.salesmanId = options.id
      }
      this.pageNum = 1
      this.getInfo({type: 0})
    },
    async onReachBottom () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.getInfo({type: 1})
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    },
    async onPullDownRefresh () {
      this.pageNum = 1
      this.getInfo({ type: 0 })
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    },
    methods: {
      // 传id 跳入产品信息
      goToProduct (id) {
        // this.businessId = wx.getStorageSync('businessId')
        // this.salesmanId = wx.getStorageSync('salesManId')
        // this.userId = wx.getStorageSync('userId')
        // this.insertOperaA('查看了产品', 3, id)
        wx.navigateTo({
          url: '../productA/detail/main?id=' + id
        })
      },
      // 页面加载信息
      getInfo ({ type = 0, name = '' }) {
        // console.log('userId', this.userId)
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformGoods/getAllGoodsByUserId',
          body: {
            'salesmanId': this.salesmanId,
            'status': 1,
            'pageNum': this.pageNum,
            'pageSize': this.pageSize
          }
        }).then(res => {
          if (res.data) {
            if (type === 0) {
              this.postForm = res.data.list
            } else if (type === 1) {
              res.data.list.forEach(e => {
                this.postForm.push(e)
              })
            }
            console.log('res', this.postForm)
            // this.latitude = res.data.latitude
            // this.longitude = res.data.longitude
            this.pageNum = res.data.pageNum
            this.lastPage = res.data.lastPage
            this.nextPage = res.data.nextPage
          } else if (res.data === null) {
            // this.modalFlag = true
            wx.showToast({
              title: '无更多产品',
              icon: 'none',
              duration: 2000
            })
          }
          // console.log('modalFlag', this.modalFlag)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.more{
  width: 100%;
  .none{
    width: 100%;
    margin-top: ~'400rpx';
    display: flex;
    align-items: center;
    justify-content: center;
    span{
      color: #5B5B5B;
    }
  }
  // 公司产品
  .product{
    width: ~'656rpx';
    display: block;
    margin: ~'50rpx' auto;
    .product-top{
      width: 100%;
      height: ~'60rpx';
      margin-bottom: ~'20rpx';
      .product-icont{
        width: ~'44rpx';
        height: ~'44rpx';
        img{
          width: ~'44rpx';
          height: ~'44rpx';
          vertical-align: middle;
        }
      }
      .product-title{
        font-size: ~'30rpx';
        font-weight: 600;
        margin-left: ~'30rpx';
      }
      .product-right{
        float: right;
        margin-top: ~'10rpx';
        vertical-align: middle;
        font-size: ~'24rpx';
        color: #9d9d9d;
        img{
          width: ~'20rpx';
          height: ~'20rpx';
        }
      }
    }

    .product-main{
      width: 100%;
      height: 100%;

      .product-details-video{
        width: 100%;
        height: ~'400rpx';
        margin-bottom: ~'40rpx';
        .up-video {
          width: 100%;
          height: ~'400rpx';
          border-radius: ~'10rpx';
          .cover-hw {
            width: 100%;
            height: ~ '400rpx';
            position: relative;
          }
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
      }
      .product-details{
        display: inline-block;
        width: ~'300rpx';
        background: #ffffff;
        border-radius: ~'10rpx';
        margin-bottom: ~'20rpx';
        .product-details-img{
          width: 100%;
          height: ~'300rpx';
          background: #CCCCCC;
          border-top-left-radius: ~'10rpx';
          border-top-right-radius: ~'10rpx';
          img{
            border-top-left-radius: ~'10rpx';
            border-top-right-radius: ~'10rpx';
            width: 100%;
            height: 100%;
          }
        }
        .product-details-imgA {
          width: 100%;
          height: ~'222rpx';
          background: #ffffff;
          border-radius: ~'10rpx';

          img {
            border-radius: ~'10rpx';
            width: 100%;
            height: 100%;
          }
        }

        .product-details-title{
          font-size: ~'24rpx';
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-weight: 600;
          margin: ~'20rpx' ~'20rpx' ~'10rpx';
        }
        .product-details-click{
          font-size: ~'26rpx';
          color: #d82a10;
          display: inline-block;
          padding: ~'0rpx' ~'20rpx' ~'20rpx';
          font-weight: 600;
        }
      }
      .product-details:nth-child(even){
        float: right;
      }
    }
  }
}
</style>
