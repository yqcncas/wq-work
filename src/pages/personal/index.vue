<template>
  <div class="index">
    <!--<vue-tab-bar-->
      <!--@fetch-index="clickIndexNav"-->
      <!--:selectNavIndex=selectNavIndex-->
      <!--:needButton="needButton"-->
      <!--:handButton="handButton"-->
      <!--:btnText="btnText">-->
    <!--</vue-tab-bar>-->
    <!--<button class='pop_btn' plain="false" open-type='getPhoneNumber' bindgetphonenumber="getPhoneNumber">获取用户手机号</button>-->
      <div class="top">
        <el-form ref="postForm" :model="postForm">
          <div class="top-main" @click="goIndex">
          <span class="headImg">
            <img :src="postForm.imgUrl"/>
            <i><s>企</s></i>
          </span>
            <p class="">
              <span class="name">{{ postForm.name }}</span>
              <span class="job">{{ postForm.job }}</span>
              <span class="comyname">{{ postForm.salesCompanyName}}</span>
              <span class="edit">
              编辑<img src="../../../static/images/right.png"/>
            </span>
            </p>
          </div>
        </el-form>
      </div>
    <div class="look" @click="goStats()">
      <el-form ref="resForm" :model="resForm">
        <div class="look-main">
          <p class="num">{{resForm.lookMeNum}}</p>
          <p class="title">看过我</p>
        </div>
        <div class="look-main">
          <p class="num">{{resForm.collectMeNum}}</p>
          <p class="title">收藏我</p>
        </div>
        <div class="look-main">
          <p class="num">{{resForm.praiseMeNum}}</p>
          <p class="title">赞过我</p>
        </div>
        <div class="look-main">
          <p class="num">{{resForm.iLookNum}}</p>
          <p class="title">我看过</p>
        </div>
      </el-form>
    </div>
      <div class="choose">
        <div class="choose-main">
          <div class="choose-Map" v-for="(item,index) in choose" :key="index">
            <div @click="goInto(item.url)">
              <span class="icon"><img v-if="item.src" :src="item.src"/></span>
              <span class="title">{{ item.title }}</span>
              <span class="right">
                <i class="iconfont iconyouce"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import vueTabBar from '../../components/vueTabBar'
  export default {
    components: {
      vueTabBar
    },

    data () {
      return {
        postForm: {
          imgUrl: 'https://oss.wq1516.com/default-avatar.png',
          name: '无姓名',
          job: '无工作',
          salesCompanyName: '无公司名称'
        },
        resForm: {
          lookMeNum: 0,
          collectMeNum: 0,
          praiseMeNum: 0,
          iLookNum: 0
        },
        selectNavIndex: 3,
        needButton: true,
        handButton: true,
        btnText: '个人中心',
        indicatorDots: true,
        choose: [{
          src: '../../static/images/chanpin.png',
          title: '产品管理',
          url: '../prod/product/main'
        }, {
          src: '../../static/images/product.png',
          title: '我的订单',
          url: '/pages/pageA/orderlist/main?typeId=0'
        }, {
          src: '../../static/images/release.png',
          title: '我的发布',
          url: '../pageA/release/main'
        }, {
          src: '../../static/images/message.png',
          title: '消息中心',
          url: '../message/main'
        }, {
          src: '../../static/images/pifu.png',
          title: '名片模板',
          url: '../pageA/skin/main'
        }, {
          src: '../../static/images/Member.png',
          title: '会员中心',
          url: '../pageA/Member/main'
        }, {
          src: '../../static/images/tuike.png',
          title: '推客中心',
          url: '../pageA/Pusher/main'
        }, {
          src: '../../static/images/compny.png',
          title: '企业认证',
          url: '../pageA/attestation/main'
        }, {
          src: '../../static/images/jieshao.png',
          title: '公司介绍',
          url: '../pageA/introduce/main'
        }],
        chooseA: [ {
          src: '../../static/images/chanpin.png',
          title: '产品管理',
          url: '../prod/product/main'
        }, {
          src: '../../static/images/product.png',
          title: '我的订单',
          url: '/pages/pageA/orderlist/main?typeId=0'
        }, {
          src: '../../static/images/release.png',
          title: '我的发布',
          url: '../pageA/release/main'
        }, {
          src: '../../static/images/message.png',
          title: '消息中心',
          url: '../message/main'
        }, {
          src: '../../static/images/pifu.png',
          title: '名片模板',
          url: '../pageA/skin/main'
        }, {
          src: '../../static/images/Member.png',
          title: '会员中心',
          url: '../pageA/Member/main'
        }, {
          src: '../../static/images/tuike.png',
          title: '推客中心',
          url: '../pageA/Pusher/main'
        }, {
          src: '../../static/images/compny.png',
          title: '企业认证',
          url: '../pageA/attestation/main'
        }, {
          src: '../../static/images/jieshao.png',
          title: '公司介绍',
          url: '../pageA/introduce/main'
        }],
        chooseB: [{
          src: '../../static/images/chanpin.png',
          title: '产品管理',
          url: '../prod/product/main'
        }, {
          src: '../../static/images/product.png',
          title: '我的订单',
          url: '/pages/pageA/orderlist/main?typeId=0'
        }, {
          src: '../../static/images/release.png',
          title: '我的发布',
          url: '../pageA/release/main'
        }, {
          src: '../../static/images/message.png',
          title: '消息中心',
          url: '../message/main'
        }, {
          src: '../../static/images/pifu.png',
          title: '名片模板',
          url: '../pageA/skin/main'
        }, {
          src: '../../static/images/Member.png',
          title: '会员中心',
          url: '../pageA/Member/main'
        }, {
          src: '../../static/images/tuike.png',
          title: '推客中心',
          url: '../pageA/agencyCenter/main'
        }, {
          src: '../../static/images/compny.png',
          title: '企业认证',
          url: '../pageA/attestation/main'
        }, {
          src: '../../static/images/jieshao.png',
          title: '公司介绍',
          url: '../pageA/introduce/main'
        }]
      }
    },

    created () {
    },
    onShow () {
      this.getInfo()
      this.getRecord()
    },
    onLoad () {
      // this.getShop()
    },
    methods: {
      // 获取分销商信息
      getShop () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/distributor/selectOne',
          body: {
          }
        }).then(res => {
          const isDistributor = res.data.isDistributor
          // console.log('isDistributor', isDistributor)
          if (isDistributor === 1) {
            // this.choose[6].url = '/pages/pageA/agencyCenter/main'
            // wx.redirectTo({
            //   url: '/pages/pageA/agencyCenter/main'
            // })
            this.choose = this.chooseB
            // console.log('resAAA', this.choose[6].url)
          } else {
            this.choose = this.chooseA
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 进入数据统计
      goStats () {
        wx.navigateTo({
          url: '../pageA/stats/main'
        })
      },
      // 页面加载信息
      getInfo () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': userId
          }
        }).then(res => {
          const data = wx.getStorageSync('Card')
          if (res.data !== null) {
            this.postForm = res.data
          }
          if (data !== true) {
            this.choose.map((item) => {
              item.url = '../businesscard/main'
            })
          } else {
            this.choose = this.chooseA
            this.getShop()
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 获取信息
      getRecord () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformOperationRecord/selectOperationForUser',
          body: {
            'userId': userId
          }
        }).then(res => {
          this.resForm = res.data
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      goInto (url) {
        if (url === '../businesscard/main') {
          wx.switchTab({
            url
          })
        } else {
          wx.navigateTo({
            url
          })
        }
      },
      goIndex () {
        wx.navigateTo({
          url: '../index/main'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.top{
 width: 100%;
 height: ~'287rpx';
 background: #2A94EC;
}
.top-main{
  padding-top:~'144rpx' ;
  height: ~'143rpx';
  position: relative;
}
.top-main p{
  width: 75%;
  height: 75%;
  margin-right: ~'40rpx';
  float: right;
  color: #ffffff;
}
.top-main .name{
  position: absolute;
  left: ~'180rpx';
  font-size: ~'34rpx';
}
 .top-main .job{
   position: absolute;
   font-size: ~'28rpx';
   margin-top: ~'5rpx';
   left: ~'300rpx';
   font-weight: 200;
 }
 .top-main .comyname{
  position: absolute;
  left: ~'180rpx';
   font-size: ~'30rpx';
  bottom: ~'50rpx';
   font-weight: 200;
 }
 .top-main .edit{
   position: absolute;
   right: ~'80rpx';
   bottom: ~'75rpx';
   font-weight: 200;
   font-size: ~'30rpx';
 }
 .top-main .edit img{
   position: absolute;
   margin-top:~'-8rpx';
   bottom: ~'-3rpx';
   width: ~'50rpx';
   height: ~'50rpx';
 }
.headImg{
  display: block;
  width: ~'100rpx';
  height: ~'100rpx';
  position: absolute;
  left: ~'40rpx';
}
.headImg img{
  width: 100%;
   height: 100%;
  border-radius: ~'10rpx';
  position: relative;
}
.headImg i{
  width: ~'30rpx';
  height: ~'30rpx';
  font-size: ~'20rpx';
  color: #ffffff;
  border-radius: ~'25rpx';
  background: #FFD65C;
  position: absolute;
  right: ~'-10rpx';
  bottom: ~'-10rpx';
}
.headImg i s{
  text-align: center;
}
.look{
  width: 100%;
  height:~'101rpx' ;
  background: #ffffff;
}
.look-main{
  width: 25%;
  float: left;
  text-align: center;
  padding: ~'10rpx' 0;
  font-size: ~'30rpx';
}
.num{
  color: #484848;
}
.look .title{
  color: #9D9D9D;
}
.choose{
  margin-top: ~'30rpx';
  display: block;
  width: 100%;
  height: 100%;
  background: #ffffff;
}
.choose-main{
  width: 100%;
  height: 100%;
}
.choose-Map{
  height: ~'80rpx';
  line-height: ~'80rpx';
  border-bottom:~'1rpx' solid #f2f2f2;
  padding: ~'10rpx' ~'50rpx';
  font-size: ~'30rpx';
}
.choose-main .title{
  padding-left: ~'20rpx';
}
.icon{
  width: ~'50rpx';
  height: ~'50rpx';
}
.icon img{
  vertical-align:middle;
  width: ~'50rpx';
  height: ~'50rpx';
}
.right{
  float: right;
}
.iconyouce{
  color: #cccccc;
}
</style>
