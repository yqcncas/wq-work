<template>
  <div class="index">
    <vue-tab-bar
      @fetch-index="clickIndexNav"
      :selectNavIndex=selectNavIndex
      :needButton="needButton"
      :handButton="handButton"
      :btnText="btnText">
    </vue-tab-bar>
      <div class="top">
        <div class="top-main" @click="goIndex">
          <span class="headImg">
            <img src="../../../static/images/gongzhonghao.jpg"/>
            <i><s>企</s></i>
          </span>
          <p class="">
            <span class="name">李松阳</span>
            <span class="job">技术总监</span>
            <span class="comyname">浙江万千科技有限公司</span>
            <span class="edit">
              编辑<img src="../../../static/images/right.png"/>
            </span>
          </p>
        </div>
      </div>
    <div class="look">
      <div class="look-main" v-for="(item,index) in nav" :key="index">
        <p class="num">{{ item.num }}</p>
        <p class="title">{{ item.title }}</p>
      </div>
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
        selectNavIndex: 3,
        needButton: true,
        handButton: true,
        btnText: '个人中心',
        indicatorDots: true,
        nav: [{
          num: 1,
          title: '看过我'
        }, {
          num: 1,
          title: '收藏我'
        }, {
          num: 99,
          title: '赞过我'
        }, {
          num: 99,
          title: '我看过'
        }],
        choose: [{
          src: '../../static/images/compny.png',
          title: '企业认证',
          url: '../attestation/main'
        }, {
          src: '../../static/images/jieshao.png',
          title: '公司介绍',
          url: '../introduce/main'
        }, {
          src: '../../static/images/chanpin.png',
          title: '产品管理',
          url: '../product/main'
        }, {
          src: '../../static/images/release.png',
          title: '我的发布',
          url: '../release/main'
        }, {
          src: '../../static/images/message.png',
          title: '消息中心',
          url: '../message/main'
        }, {
          src: '../../static/images/Member.png',
          title: '会员中心'
        }]
      }
    },

    created () {
    },
    onShow () {
      wx.hideTabBar()
    },
    methods: {
      goInto (url) {
        wx.navigateTo({
          url
        })
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
