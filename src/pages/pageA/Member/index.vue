<template xmlns:wx="http://www.w3.org/1999/xhtml">
  <div class="modify">
    <el-form ref="postForm" :model="postForm" >
      <div class="TopImg">
        <i @click="back()" class="iconfont iconE leftA"></i>
        <span>成为会员</span>
        <span class="imgUrl">
          <img :src="imgUrl">
        </span>
        <span class="name">{{name}}</span>
        <span class="member">{{Member}}</span>
      </div>
      <div class="test">
        <div class="cont">
          <div class="cont-main">
              <div class="silver">
                  <span v-for="(item,index) in silver" :key="index" :class="{'selected':tabA === item.id,'testTitle':true}" @click="changTabMeberA(item.id,item.upType)">
                    <p class="date">{{ item.levelName }}</p>
                    <p class="money">￥{{ item.upCondition }}</p>
                    <p class="title">{{ item.title }}</p>
                    <p class="info" v-if="item.discount === 0 ">无折扣</p>
                      <p class="info" v-else>{{item.discount}}折</p>
                  </span>
              </div>
            <div class="footer">
              <button :class="classA" @click="Opening(tabA,num)">{{title}}</button>
            </div>
          </div>
        </div>
        <div class="MeberTitle">
          <p class="top">会员特权</p>
          <div class="Mtable">
            <div class="table">
              <div class="tableLeft">
              <span><a>等级\特权</a></span>
              <span><a>日发名片量</a></span>
              <span><a>名片样式</a></span>
              <span><a>名片夹热人数</a></span>
              <span><a>动态置顶</a></span>
              <span><a>建群数量</a></span>
              <span><a>纸质名片扫码次数</a></span>
              <span><a>展示公司介绍</a></span>
              <span><a>产品发布数量</a></span>
              </div>
              <div class="tableRight" v-for="item in Table" :key="index">
                <span v-if="index === 0"><a>{{item.meber}}</a></span>
                <span v-else class="imgUrl"><img :src="item.meber"></span>
                <span><a>{{item.dateNum}}</a></span>
                <span><a>{{item.style}}</a></span>
                <span><a>{{item.person}}</a></span>
                <span><a>{{item.auto}}</a></span>
                <span><a>{{item.group}}</a></span>
                <span><a>{{item.number}}</a></span>
                <span><a>{{item.company}}</a></span>
                <span><a>{{item.goodNum}}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data () {
    return {
      imgUrl: '',
      name: '',
      title: '立即开通',
      Table: [{
        meber: '非会员',
        dateNum: '10个',
        style: '无折扣',
        person: '10人',
        auto: '*',
        group: 1,
        number: 1,
        company: '无',
        goodNum: 1
      }, {
        meber: '../../../static/images/v1.png',
        dateNum: '50个',
        style: '8.00折',
        person: '100人',
        auto: '8.00折',
        group: 3,
        number: 1,
        company: '无',
        goodNum: 4
      },
      {
        meber: '../../../static/images/v2.png',
        dateNum: '200个',
        style: '6.00折',
        person: '500人',
        auto: '6.00折',
        group: 50,
        number: 1,
        company: '无',
        goodNum: 10
      },
      {
        meber: '../../../static/images/v3.png',
        dateNum: '无限制',
        style: '5.00折',
        person: '无限制',
        auto: '5.00折',
        group: '无限制',
        number: '无限制',
        company: '无',
        goodNum: '无限制'
      }
      ],
      tab: 1,
      tabA: 4,
      postForm: '',
      tagList: [],
      silver: [],
      Member: '',
      levelNum: '',
      id: '',
      upType: 0,
      classA: 'bt',
      num: 0,
      buy: 1
    }
  },

  components: {
    card
  },
  onShow () {
    this.id = this.tabA
    this.getIp()
    this.getMerber()
    this.getInfo()
    const Member = wx.getStorageSync('vipId')
    console.log('Member', Member)
    if (Member === 0 || Member === null || Member === '') {
      this.Member = '会员未开通'
      this.title = '立即开通'
      this.classA = 'bt'
      this.buy = 0
    } else {
      this.MemberNum(Member)
      this.buy = 1
      this.changTabMeberA(Member)
    }
  },
  onLoad () {
  },
  onUnload () {
    this.tabA = ''
  },
  methods: {
    // 查询等级
    MemberNum (id) {
      this.$fly.request({
        method: 'get',
        url: 'vip/findOne',
        body: {
          'id': id
        }
      }).then(res => {
        // console.log('ajhdad', res)
        if (res.code === 200) {
          this.Member = res.data.levelName
        }
        // this.levelNum = res.data.levelNum
        // wx.setStorageSync('vipId', this.levelNum)
      }).catch(err => {
        console.log('err', err)
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
        console.log('res', res)
        if (res.code === 200) {
          this.silver = res.data
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    // 更新会员等级
    updateMerber (id) {
      this.$fly.request({
        method: 'post',
        url: 'platformUser/updateVip',
        body: {
          'id': id
        }
      }).then(res => {
        // console.log('vipIdres', res)
      }).catch(err => {
        console.log('err', err)
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
            this.updateMerber(this.tabA)
            wx.setStorageSync('vipId', this.tabA)
            this.levelNum = this.tabA
            this.MemberNum(this.tabA)
            this.changTabMeberA(this.tabA)
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
      // console.log('upType', this.upType)
      if (this.upType === 2) {
        if (num === 2) {
          const phoneIp = wx.getStorageSync('phoneIp')
          this.$fly.request({
            method: 'post',
            url: 'platformOrder/unifiedForVip',
            body: {
              'vipId': id,
              'goodsList': [],
              'name': '驿站会员费用',
              'getWay': '自取',
              'unifiedOrderRequest': {
                'spbillCreateIp': phoneIp,
                'body': '驿站会员费用'
              },
              'userName': this.nickName
            }
          }).then(res => {
            this.pay(res.data.payInfo)
          }).catch(err => {
            console.log('err', err)
          })
        } else if (num === 1) {
          wx.showToast({
            title: '已开通',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '已开通更高权限',
            icon: 'none',
            duration: 2000
          })
        }
      } else {
        wx.showToast({
          title: '暂不能升级',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 页面加载获取信息
    getInfo () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/platformSalesman/selectSelfInfo',
        body: {
          'userId': userId
        }
      }).then(res => {
        console.log('resaaa', res)
        if (res.data !== null) {
          this.nickName = res.data.nickName
          this.imgUrl = res.data.imgUrl
          this.name = res.data.name
        } else {
          this.nickName = wx.getStorageSync('nickName')
          this.imgUrl = wx.getStorageSync('avatarUrl')
          this.name = wx.getStorageSync('nickName')
        }
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
    // 选择会员
    changTabMeberA (id, type) {
      this.upType = type
      if (type === 2) {
        if (this.buy === 1) {
          this.tabA = id
          this.id = this.tabA
          const levelNum = wx.getStorageSync('vipId')
          if (levelNum > id) {
            this.title = '已开通更高等级'
            this.classA = 'btA'
            this.num = 0
          } else if (levelNum === id) {
            this.title = '已开通'
            this.classA = 'btA'
            this.num = 1
          } else if (levelNum < id) {
            this.title = '立即升级'
            this.classA = 'bt'
            this.num = 2
          }
        } else if (this.buy === 0) {
          this.tabA = id
          this.title = '立即开通'
          this.classA = 'bt'
          this.num = 2
        }
      } else {
        if (this.buy === 1) {
          this.tabA = id
          this.id = this.tabA
          const levelNum = wx.getStorageSync('vipId')
          if (levelNum > id) {
            this.title = '已开通更高等级'
            this.classA = 'btA'
            this.num = 0
          } else if (levelNum === id) {
            this.title = '已开通'
            this.classA = 'btA'
            this.num = 1
          } else if (levelNum < id) {
            this.title = '立即升级'
            this.classA = 'btA'
            this.num = 2
          }
        } else if (this.buy === 0) {
          this.tabA = id
          this.title = '立即开通'
          this.classA = 'bt'
          this.num = 2
        }
      }
    },
    // // 选择
    // changTab (index) {
    //   if (index === 1) {
    //     this.tab = index
    //     this.status = index
    //   } else if (index === 2) {
    //     this.tab = index
    //     this.status = index
    //   } else {
    //     this.tab = index
    //     this.status = index
    //   }
    // },
    // 返回上一页
    back () {
      wx.navigateBack(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
