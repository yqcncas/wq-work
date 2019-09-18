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
        <div class="title"><a>我的</a></div>
        <el-form ref="postForm" :model="postForm">
          <div class="top-main">
            <span class="headImg">
              <img :src="postForm.imgUrl"/>
              <i><s>企</s></i>
            </span>
              <div class="p">
                <p class="zhiding">
                  <span class="name">{{ postForm.name }}</span>
                  <span class="job">{{ postForm.job }}</span>
                </p>
                <span class="comyname">{{ postForm.salesCompanyName}}</span>
                <span class="edit" @click="goMessage">
                  <img src="../../../static/images/消息.png"/>我的消息
                  <a class="left" v-if="num !== 0 && num < 99" >{{num}}</a>
                  <a class="right" v-else-if="num > 99" >99<s>+</s></a>
                </span>
              </div>
          </div>
        </el-form>
      </div>
    <div class="myCard">
      <div class="main">
        <div class="cardA " @click="goIndex">
          <div class="left">
            <i class="iconfont iconmingpian"></i>我的名片
          </div>
          <div class="right">
            编辑<i class="iconfont iconyouce"></i>
          </div>
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
      </div>
    </div>
    <div class="check">
      <div class="check-in">
        <img  @click="goIntegral" src="https://oss.tzyizan.com/salesInfo/201908071432331565159553627.png">
        <div class="info"  @click="goIntegral">
          <div class="info-left">
            <p class="num">{{numA}}分</p>
            <p class="size">签到积分</p>
          </div>
          <div class="info-right">
            <p class="num">{{count}}次</p>
            <p class="size">签到次数</p>
          </div>
        </div>
        <form report-submit='true' @submit='getFormID' class="form">
          <div class="Check" v-if="Check===0" @click="check()">
            <button class="check-inA"><span>签到</span></button>
          </div>
        </form>
        <div class="CheckA" v-if="Check===1" @click="checkA()">
          <button class="check-inA"><span>已签</span></button>
        </div>
      </div>
    </div>
    <div class="meber" @click="goMeber">
      <div class="meber-main" v-if="Member == '无会员'">
        <img src="https://oss.tzyizan.com/salesInfo/201908051614261564992866702.png">
      </div>
      <div class="meber-main" v-else-if="Member == '白银会员'">
        <img src="https://oss.tzyizan.com/salesInfo/201908061437361565073456909.png">
      </div>
      <div class="meber-main" v-else-if="Member == '黄金会员'">
        <img src="https://oss.tzyizan.com/salesInfo/201908061437331565073453159.png">
      </div>
      <div class="meber-main" v-else-if="Member == '钻石会员'">
        <img src="https://oss.tzyizan.com/salesInfo/201908061437391565073459176.png">
      </div>
    </div>
      <div class="choose">
        <div class="choose-main">
          <div class="choose-Map" v-for="(item,index) in chooseYellow" :key="index">
            <div @click="goInto(item.url)">
              <span class="icon"><img v-if="item.src" :src="item.src"/></span>
              <span class="title">{{ item.title }}</span>
              <span class="right">
                <i class="iconfont iconyouce"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="choose-main">
          <div class="choose-Map" v-for="(item,index) in chooseOrange" :key="index">
            <div @click="goInto(item.url)">
              <span class="icon"><img v-if="item.src" :src="item.src"/></span>
              <span class="title">{{ item.title }}</span>
              <span class="right">
                <i class="iconfont iconyouce"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="choose-main">
          <div class="choose-Map" v-for="(item,index) in chooseBlue" :key="index">
            <div @click="goInto(item.url)">
              <span class="icon"><img v-if="item.src" :src="item.src"/></span>
              <span class="title">{{ item.title }}</span>
              <span class="right">
                <i class="iconfont iconyouce"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="choose-main">
          <div class="choose-Map" v-for="(item,index) in chooseRed" :key="index">
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
    <div class="NetSucces" v-if="deleteShow === true">
      <div class="NetSucces-main">
        <div class="img">
          <img src="https://oss.tzyizan.com/salesInfo/201908161342141565934134542.png">
          <div class="main">
            <p class="suc">签到成功</p>
            <p class="title">恭 喜 你 获 得 5 积 分</p>
            <p class="info">积 分 可 用 于 名 片 置 顶 等 服 务</p>
          </div>
          <div class="delete">
            <p class="line"></p>
            <i class="iconfont iconshanchu-copy" @click="checkDelete()"></i>
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
        num: '',
        numA: 0,
        count: 0,
        selectNavIndex: 3,
        needButton: true,
        handButton: true,
        Member: '无会员',
        btnText: '个人中心',
        indicatorDots: true,
        cardStatus: true,
        Check: 0,
        deleteShow: false,
        chooseBlue: [{
          src: '../../static/images/compny.png',
          title: '企业认证',
          url: '../pageA/attestation/main'
        }, {
          src: '../../static/images/jieshao.png',
          title: '公司介绍',
          url: '../pageA/introduce/main'
        }],
        chooseYellow: [{
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
        },
        {
          src: '../../static/images/map.png',
          title: '地址管理',
          url: '/pages/pageA/addressSelect/main'
        }],
        chooseOrange: [ {
          src: '../../static/images/pifu.png',
          title: '名片模板',
          url: '../pageA/skin/main'
        }, {
          src: '../../static/images/tuike.png',
          title: '推客中心',
          url: '../pageA/Pusher/main'
        }],
        chooseRed: [{
          src: '../../static/images/xiaoxi.png',
          title: '反馈中心',
          url: '/pages/pageA/Opinion/main'
        }],
        chooseBlueA: [{
          src: '../../static/images/compny.png',
          title: '企业认证',
          url: '../pageA/attestation/main'
        }, {
          src: '../../static/images/jieshao.png',
          title: '公司介绍',
          url: '../pageA/introduce/main'
        }],
        chooseYellowA: [{
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
        },
        {
          src: '../../static/images/map.png',
          title: '地址管理',
          url: '/pages/pageA/addressSelect/main'
        }],
        chooseOrangeA: [ {
          src: '../../static/images/pifu.png',
          title: '名片模板',
          url: '../pageA/skin/main'
        }, {
          src: '../../static/images/tuike.png',
          title: '推客中心',
          url: '../pageA/Pusher/main'
        }],
        chooseRedA: [{
          src: '../../static/images/xiaoxi.png',
          title: '反馈中心',
          url: '/pages/pageA/Opinion/main'
        }],
        chooseBlueB: [{
          src: '../../static/images/compny.png',
          title: '企业认证',
          url: '../pageA/attestation/main'
        }, {
          src: '../../static/images/jieshao.png',
          title: '公司介绍',
          url: '../pageA/introduce/main'
        }],
        chooseYellowB: [{
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
          src: '../../static/images/map.png',
          title: '地址管理',
          url: '/pages/pageA/addressSelect/main'
        }],
        chooseOrangeB: [ {
          src: '../../static/images/pifu.png',
          title: '名片模板',
          url: '../pageA/skin/main'
        }, {
          src: '../../static/images/tuike.png',
          title: '推客中心',
          url: '/pages/pageA/agencyCenter/main'
        }],
        chooseRedB: [{
          src: '../../static/images/xiaoxi.png',
          title: '反馈中心',
          url: '/pages/pageA/Opinion/main'
        }],
        silver: [],
        card: false
      }
    },

    created () {
    },
    onShow () {
      this.getInfo()
      this.getRecord()
      this.getMerber()
    },
    onLoad () {
      setInterval(() => {
        const that = this
        const num = wx.getStorageSync('msgNum')
        that.num = num
        // console.log('获取消息数量', that.num)
      }, 1000)
      // this.getShop()
    },
    methods: {
      // 进入积分明细
      goIntegral () {
        wx.navigateTo({
          url: '/pages/pageA/integral/main'
        })
      },
      // 隐藏
      checkDelete () {
        this.deleteShow = false
        this.Check = 1
      },
      // 签到
      check () {
        if (this.cardStatus === true) {
          this.deleteShow = true
          this.Check = 1
          this.numA = this.numA + 5
          this.count = this.count + 1
        } else {
          wx.showToast({
            title: '请先注册名片',
            duration: 2000,
            icon: 'none'
          })
        }
      },
      checkA () {
        wx.showToast({
          title: '已签，明天继续哦',
          icon: 'none',
          duration: 2000
        })
      },
      // 查询会员等级信息
      getMerber () {
        const businessId = wx.getStorageSync('businessId')
        this.$fly.request({
          method: 'get',
          url: 'vip/findList',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          const Member = wx.getStorageSync('vipId')
          console.log('Member', Member)

          this.silver = res.data
          console.log('this.silver', this.silver)
          if (Member === 0 || Member === null || Member === '') {
            this.Member = '无会员'
            wx.setStorageSync('vipId', 0)
          } else {
            // this.Member = Member
            this.silver = res.data
            console.log('this.silver', this.silver)
            this.silver.map((item) => {
              if (Member === item.id) {
                this.Member = item.levelName
              }
            })
            console.log('resAAAA', this.Member)
          }
        }).catch(err => {
          console.log('err', err)
        })
      },
      // 进入会员中心,
      goMeber () {
        wx.navigateTo({
          url: '../pageA/Member/main'
        })
        // if (this.cardStatus === true) {
        //   wx.navigateTo({
        //     url: '../pageA/Member/main'
        //   })
        // } else {
        //   wx.showToast({
        //     title: '请先创建名片',
        //     icon: 'none',
        //     duration: 3000
        //   })
        // }
      },
      // 进入消息中心,
      goMessage () {
        if (this.card === true) {
          wx.navigateTo({
            url: '/pages/message/main'
          })
        } else {
          wx.showToast({
            title: '请先注册名片',
            duration: 2000,
            icon: 'none'
          })
        }
      },
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
            wx.setStorageSync('BuyId', 3)
            this.chooseBlue = this.chooseBlueB
            this.chooseRed = this.chooseRedB
            this.chooseYellow = this.chooseYellowB
            this.chooseOrange = this.chooseOrangeB
            // console.log('resAAA', this.choose[6].url)
          } else {
            this.chooseBlue = this.chooseBlueA
            this.chooseRed = this.chooseRedA
            this.chooseYellow = this.chooseYellowA
            this.chooseOrange = this.chooseOrangeA
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 进入数据统计
      goStats () {
        if (this.cardStatus === true) {
          wx.navigateTo({
            url: '/pages/stats/main'
          })
        } else {
          wx.showToast({
            title: '请先注册名片',
            icon: 'none',
            duration: 3000
          })
        }
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
            this.card = true
          } else {
            this.card = false
          }
          if (data !== true) {
            this.chooseBlue.map((item) => {
              item.url = '../businesscard/main'
            })
            this.chooseRed.map((item) => {
              item.url = '../businesscard/main'
            })
            this.chooseYellow.map((item) => {
              item.url = '../businesscard/main'
            })
            this.chooseOrange.map((item) => {
              item.url = '../businesscard/main'
            })
            this.cardStatus = false
          } else {
            this.cardStatus = true
            this.chooseBlue = this.chooseBlueA
            this.chooseRed = this.chooseRedA
            this.chooseYellow = this.chooseYellowA
            this.chooseOrange = this.chooseOrangeA
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
  .Check{
    position: absolute;
    z-index: 99;
    right: ~'80rpx';
    top: ~'15rpx';
    width: ~'79rpx';
    height: ~'79rpx';
    background: #FFC77A;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    .check-inA{
      animation: spin-down 2s linear infinite normal;
      width: ~'79rpx';
      height: ~'79rpx';
      border-radius: 50%;
      font-size: ~'20rpx';
      background: #FFE3BD;
      color: #FFA11F;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .CheckA{
    position: absolute;
    right: ~'80rpx';
    top: ~'15rpx';
    width: ~'79rpx';
    height: ~'79rpx';
    background: #FFC77A;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    .check-inA{
      font-size: ~'20rpx';
      //animation: spin-down 2s linear infinite normal;
      width: ~'55rpx';
      height: ~'55rpx';
      border-radius: 50%;
      background: #FFE3BD;
      color: #FFA11F;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .check{
    width: 100%;
    margin-top: ~'20rpx';
    display: flex;
    justify-content: center;
    .check-in{
      width: ~'702rpx';
      height: ~'105rpx';
      border-radius: ~'20rpx';
      position: relative;
      img{
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      .info{
        position: absolute;
        top: ~'20rpx';
        left: ~'80rpx';
        color: #ffffff;
        text-align: center;
        .info-left{
          display: inline-block;
          margin-right: ~'30rpx';
          .num{
            font-size: ~'26rpx';
            color: #ffffff;
            font-weight: 500;
          }
          .size{
            font-size: ~'24rpx';
          }
        }
        .info-right{
          display: inline-block;
          .num{
            font-size: ~'26rpx';
            font-weight: 500;
            color: #ffffff;
          }
          .size{
            font-size: ~'24rpx';
          }
        }
      }
    }
  }
  .meber{
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: ~'20rpx';
    .meber-main{
      width: ~'702rpx';
      height: ~'151rpx';
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
.top{
 width: 100%;
 /*height: ~'287rpx';*/
 /*background: #2A94EC;*/
  position: relative;
  .title{
    position: absolute;
    width: 100%;
    top: ~'50rpx';
    display: flex;
    align-items: center;
    justify-content: center;
    a{
      font-size: ~'36rpx';
      font-weight: 600;
      color: #000;
    }
  }
}
.top-main{
  padding-top:~'144rpx' ;
  height: ~'133rpx';
  position: relative;
}
.top-main .p{
  width: 75%;
  height: 75%;
  margin-right: ~'40rpx';
  float: right;
  color: #ffffff;
}
.top-main .zhiding{
  position: absolute;
  top: ~'150rpx';
  left: ~'180rpx';
}
.top-main .zhiding .name{
  /*position: absolute;*/
  color: #484848;
  /*left: ~'180rpx';*/
  /*top: ~'150rpx';*/
  font-weight: 600;
  font-size: ~'30rpx';
  padding-right: ~'20rpx';
}
 .top-main .zhiding .job{
   color: #484848;
   /*top: ~'150rpx';*/
   /*position: absolute;*/
   font-size: ~'24rpx';
   margin-top: ~'5rpx';
   /*left: ~'300rpx';*/
   font-weight: 200;
 }
 .top-main .comyname{
   top: ~'195rpx';
   color: #484848;
  position: absolute;
  left: ~'180rpx';
   font-size: ~'24rpx';
  bottom: ~'50rpx';
   font-weight: 200;
 }
 .top-main .edit{
   position: absolute;
   /*right: ~'80rpx';*/
   right: 0;
   height: ~'55rpx';
   bottom: ~'75rpx';
   font-weight: 600;
   font-size: ~'26rpx';
   border-bottom-left-radius: ~'30rpx';
   border-top-left-radius: ~'30rpx';
   background-image: linear-gradient(to right, #ff8766 30%, #FE5444);
   display: flex;
   align-items: center;
   justify-content: center;
 }
 .top-main .edit img{
   /*position: absolute;*/
   /*margin-top:~'-8rpx';*/
   /*bottom: ~'-3rpx';*/
   width: ~'35rpx';
   height: ~'35rpx';
   display: inline-block;
   /*margin-left: ~'5rpx';*/
   margin-right: ~'10rpx';
   margin-left: ~'10rpx';
 }
  .top-main .edit .left{
    display: flex;
    align-items: center;
    justify-content: center;
    width: ~'35rpx';
    height: ~'35rpx';
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    color: #ffffff;
    font-size: ~'22rpx';
    text-align: center;
    margin-left: ~'10rpx';
    margin-right: ~'10rpx';
  }
  .top-main .edit .right{
    display: flex;
    align-items: center;
    justify-content: center;
    width: ~'40rpx';
    height: ~'40rpx';
    border-radius: 50%;
    background: rgba(255,255,255,0.5);
    color: #ffffff;
    font-size: ~'22rpx';
    text-align: center;
    margin-left: ~'10rpx';
    margin-right: ~'10rpx';
    position: relative;
    s{
      display: inline-block;
      position: absolute;
      top: ~'-6rpx';
      font-size: ~'30rpx';
      font-weight: 600;
      right: ~'-4rpx';
    }
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
  border-radius: 50%;
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
  right: ~'3rpx';
  bottom: ~'0rpx';
}
.headImg i s{
  text-align: center;
}
.myCard{
  width:100%;
  display: flex;
  justify-content: center;
  .main{
    width: ~'702rpx';
    background: #ffffff;
    border-radius: ~'20rpx';
  }
  .cardA{
    margin: 0 ~'20rpx';
    padding: ~'20rpx' 0;
    border-bottom: ~'1rpx' solid #F2F2F2;
    display: flex;
    justify-content: space-between;
    .left{
      color: #484848;
      font-size: ~'28rpx';
      .iconmingpian{
        color: #FFB31A;
        display: inline-block;
        margin-right: ~'10rpx';
      }
    }
    .right{
      color: #9D9D9D;
      font-size: ~'24rpx';
      .iconyouce{
        color: #CCCCCC;
        font-size: ~'26rpx';
        display: inline-block;
      }
    }
  }
}
.look{
  width: 100%;
  padding: ~'20rpx' 0;
  /*height:~'101rpx' ;*/
  border-radius: ~'20rpx';
  background: #ffffff;
  display: inline-block;
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
  /*margin-top: ~'20rpx';*/
  margin-bottom: ~'60rpx';
  width: 100%;
  height: 100%;
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
}
.choose-main{
  background: #ffffff;
  width:~'702rpx';
  display: block;
  border-radius: ~'20rpx';
  margin:~'20rpx' auto;
}
.choose-mainA{
  background: #ffffff;
  width:~'702rpx';
  display: inline-block;
  border-radius: ~'20rpx';
}
.choose-Map{
  height: ~'80rpx';
  line-height: ~'80rpx';
  /*border-bottom:~'1rpx' solid #f2f2f2;*/
  padding: ~'10rpx' ~'50rpx';
  font-size: ~'30rpx';
  color: #484848;
}
.choose-main .title{
  padding-left: ~'20rpx';
}
.icon{
  width: ~'46rpx';
  height: ~'50rpx';
}
.icon img{
  vertical-align:middle;
  width: ~'46rpx';
  height: ~'50rpx';
}
.right{
  float: right;
}
.iconyouce{
  color: #cccccc;
}
  @keyframes spin-down {
    0% {
      opacity: 0.4;
      width: ~'79rpx';
      height: ~'79rpx';
      border-radius: 50%;
    }

    50% {
      opacity: 1;
      width: ~'50rpx';
      height: ~'50rpx';
      border-radius: 50%;
    }

    100% {
      opacity: 0.4;
      width: ~'79rpx';
      height: ~'79rpx';
      border-radius: 50%;
    }
  }
  //签到成功
  .NetSucces{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background: rgba(0,0,0,0.5);
    z-index: 99999!important;
    display: flex;
    align-items: center;
    justify-content: center;
    .NetSucces-main{
      width:~'469rpx';
      height: ~'600rpx';
      display: inline-block;
      //background: url("https://oss.tzyizan.com/salesInfo/201907231449301563864570184.png") no-repeat 50% 50%;
      .img{
        display: inline-block;
        position: relative;
        img{
          width:~'469rpx';
          height: ~'600rpx';
        }
        .main{
          color: #dddddd;
          position: absolute;
          top: ~'380rpx';
          height: ~'200rpx';
          width: ~'450rpx';
          text-align: center;
          .suc{
            color: #FFA11F;
            font-size: ~'34rpx';
          }
          .title{
            color: #000000;
            font-size: ~'26rpx';
            padding: ~'20rpx' 0;
          }
          .info{
            color: #BABABA;
            font-size: ~'24rpx';
            font-weight: normal;
          }
        }
        .delete{
          width: ~'469rpx';
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: ~'-90rpx';
          .line{
            width: ~'2rpx';
            background: #ffffff;
            height: ~'100rpx';
            position: relative;
          }
          .iconshanchu-copy{
            position: absolute;
            bottom: ~'-30rpx';
            color: #ffffff;
            font-size: ~'40rpx';
          }
        }
      }
    }
  }
</style>
