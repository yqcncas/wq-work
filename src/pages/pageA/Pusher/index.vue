<template>
    <div :class="pusherA">
      <div class="TopImg">
        <i @click="back()" class="iconfont iconE leftA"></i>
        <span>推客中心</span>
      </div>
      <div :class="Active">
        <div class="choose">
          <div v-for="(item,index) in pusher" :key="index"  :class="{'selected':tabA === item.id,'block':true}" @click="changTabMeberA(item.id,item.upType)">
            <div class="flex">
              <div class="top">
                <span class="title">{{item.levelName}}</span>
                <span v-if="item.upType === 2" class="blue">￥{{item.upCondition}}</span>
                <span v-else class="blue">消费满{{item.upCondition}}</span>
              </div>
              <div class="last">
                <span>直接比例:{{item.firstPercent}}%,间接比例:{{item.secondPercent}}%</span>
              </div>
            </div>
            <div class="chooseImg">
              <img v-if=" tabA === item.id" class="choose" src="/static/images/Tchoose-se.png"/>
              <img v-else class="choose" src="/static/images/Tchoose.png"/>
            </div>
          </div>
          <div :class="classA"  @click="Opening(tabA,num)">
            <button>{{title}}</button>
          </div>
          <!--<div v-else class="open" @click="Opening(tabA)">-->
            <!--<button>开通</button>-->
          <!--</div>-->
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        pusher: [],
        tabA: 0,
        title: '开通',
        Active: 'main',
        pusherA: 'pusher',
        upType: '',
        classA: 'open',
        num: '',
        levelId: '',
        upgrade: 0,
        isDistributor: '',
        goTo: 0,
        isBuy: 0,
        status: 0
      }
    },
    onShow () {
      this.getShopGrade()
      this.getShop()
      this.height = wx.getSystemInfoSync().windowHeight
      if (this.height > 800 && this.height < 1000) {
        this.Active = 'mainA'
        this.pusherA = 'pusher'
      } else if (this.height > 1000 && this.height < 1025) {
        this.pusherA = 'pusherA'
        this.Active = 'mainB'
      } else if (this.height > 1025 && this.height < 1113) {
        this.pusherA = 'pusherA'
        this.Active = 'mainC'
      } else if (this.height > 1113 && this.height < 1367) {
        this.pusherA = 'pusherA'
        this.Active = 'mainD'
      } else {
        this.pusherA = 'pusher'
        this.Active = 'main'
      }
    },
    onUnload () {
      this.isDistributor = ''
      this.tabA = ''
      this.num = ''
      this.upType = ''
      this.levelId = ''
      this.classA = 'open'
      this.upgrade = 0
    },
    onLoad () {
      const isBuy = wx.getStorageSync('BuyId')
      // console.log('dklaa', isBuy)
      if (isBuy !== 0) {
        this.isBuy = isBuy
      } else {
        this.isBuy = 0
        wx.setStorageSync('BuyId', 0)
      }
      const status = wx.getStorageSync('status')
      // console.log('status', status)
      if (status !== 0) {
        this.upType = 1
        this.status = status
      } else {
        this.status = 0
        wx.setStorageSync('status', 0)
      }
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
          if (res.data) {
            this.isDistributor = res.data.isDistributor
            this.levelId = res.data.levelId
            this.num = 1
            this.tabA = ''
            this.changTabMeberA(this.levelId, this.upType)
            if (this.isDistributor === 1) {
              // wx.redirectTo({
              //   url: '/pages/pageA/agencyCenter/main'
              // })
            } else if (this.isDistributor === 2) {
              wx.showToast({
                title: '提交审核中',
                icon: 'none',
                duration: 3000
              })
              this.upgrade = 1
            }
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 订单支付接口
      pay (payInfo) {
        wx.requestPayment(
          {
            'timeStamp': payInfo.timeStamp,
            'nonceStr': payInfo.nonceStr,
            'package': payInfo.packageValue,
            'signType': 'MD5',
            'paySign': payInfo.paySign,
            'success': (res) => {
              this.isBuy = 1
              wx.setStorageSync('BuyId', 1)
              this.getShop()
              // this.getSalesmanUpdate()
              // this.insertOpera('支付了产品', 6)
              // wx.redirectTo({ url: `../payfinish/index?price=${this.allprice}&status=success` })
            },
            'fail': (res) => {
              // wx.redirectTo({ url: `../payfinish/index?price=${this.allprice}&status=fail` })
            },
            'complete': function (res) {
            }
          })
      },
      // 获取Ip地址
      getIp () {
        wx.request({
          url: 'http://ip-api.com/json',
          success: function (e) {
            let that = this
            that.phoneIp = e.data.query
            wx.setStorageSync('phoneIp', that.phoneIp)
          }
        })
      },
      // 立即开通
      Opening (id, num) {
        console.log('upType', this.num)
        if (this.upgrade === 0) {
          if (num === 2) {
            if (this.upType === 2) {
              const phoneIp = wx.getStorageSync('phoneIp')
              this.$fly.request({
                method: 'post',
                url: 'platformOrder/unifiedForDistributor',
                body: {
                  'distributorLevelId': id,
                  'goodsList': [],
                  'name': '',
                  'getWay': '自取',
                  'unifiedOrderRequest': {
                    'spbillCreateIp': phoneIp,
                    'body': ''
                  },
                  'userName': this.nickName
                }
              }).then(res => {
                this.pay(res.data.payInfo)
              }).catch(err => {
                console.log('err', err)
              })
            } else if (this.upType === 1) {
              const userId = wx.getStorageSync('userId')
              this.$fly.request({
                method: 'post',
                url: 'distributor/updateIsDistributor',
                body: {
                  'isDistributor': 2,
                  'levelId': id,
                  'userId': userId
                }
              }).then(res => {
                console.log('up1', res)
                if (res.code === 200) {
                  this.title = '申请中'
                  this.classA = 'openA'
                  this.upgrade = 1
                  this.status = 1
                  wx.setStorageSync('status', 1)
                  wx.showToast({
                    title: '申请成功',
                    icon: 'none',
                    duration: 2000
                  })
                }
                // this.pay(res.data.payInfo)
              }).catch(err => {
                console.log('err', err)
              })
            }
          } else if (num === 1) {
            wx.showToast({
              title: '已开通',
              icon: 'none',
              duration: 2000
            })
          } else if (num === 0) {
            wx.showToast({
              title: '已开通更高级别',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '还在审核中',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          wx.showToast({
            title: '还在审核中',
            icon: 'none',
            duration: 2000
          })
        }
      },
      // 获取当前商户分销等级
      getShopGrade () {
        const businessId = wx.getStorageSync('businessId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/distributorLevel/getAll',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          if (res.data) {
            console.log('res', res.data)
            this.pusher = res.data
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 选择会员
      changTabMeberA (id, upType) {
        console.log('buy', this.isBuy)
        if (this.isBuy === 1) {
          if (this.tabA !== id) {
            this.tabA = id
            this.upType = upType
            // console.log('upType', this.upType)
            // console.log('tabA', this.tabA)
            // console.log('levelId', this.levelId)
            if (this.upType === 2) {
              if (this.levelId > id) {
                this.title = '已开通更高级别'
                this.classA = 'openA'
                this.num = 0
              } else if (this.levelId === id) {
                this.title = '已开通'
                this.classA = 'openA'
                this.num = 1
              } else if (this.levelId < id) {
                this.title = '立即升级'
                this.classA = 'open'
                this.num = 2
              }
            } else if (this.upType === 1) {
              if (this.status === 0) {
                this.title = '申请'
                this.classA = 'open'
              } else if (this.status === 1) {
                this.title = '申请中'
                this.classA = 'openA'
                this.upgrade = 1
              }
            }
            // console.log('upType', this.upType)
            // console.log('tabA', this.tabA)
          } else {
            this.tabA = ''
          }
        } else if (this.isBuy === 0) {
          // this.upgrade = 0
          this.num = 2
          this.tabA = id
          this.upType = upType
          console.log('statusAA', this.status)
          if (this.upType === 2) {
            this.title = '开通'
            this.classA = 'open'
          } else if (this.upType === 1) {
            if (this.status === 0) {
              this.title = '申请'
              this.classA = 'open'
            } else if (this.status === 1) {
              this.title = '申请中'
              this.classA = 'openA'
              this.upgrade = 1
            }
          }
          // console.log('upType', this.upType)
          // console.log('tabA', this.tabA)
          // console.log('levelId', this.levelId)
        }
        // this.tabA = id
      },
      // 返回上一页
      back () {
        wx.navigateBack(-1)
      },
      // 开通推客
      open () {
        wx.showToast({
          title: '功能还在开发中哦',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "less";
</style>
