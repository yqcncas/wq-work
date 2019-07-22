<template>
  <div class="agency-page">
    <div class="top-wrap">
      <image class="bg" src="/static/images/bg-blue.png"></image>
      <!-- navbar -->
      <div class="absolute-wrap">
        <p class="nav-bar" :style="styleBar" @click="backTo">
          <i class="iconfont iconE"></i>
        </p>
        <!-- 佣金 信息-->
        <div class="flexRow sec-wrap">
          <image class="header-img" mode="aspectFill" :src="detailData.avatarUrl"></image>
          <div>
            <p class="headNmae">
              <span class="big-size">{{detailData.name?detailData.name:detailData.nickName}}</span>
              <span class="radius-border">{{detailData.levelName}}</span>
            </p>
            <p class="headUserName">
              <span class="margin-r">推荐人：{{detailData.recommendUserName}}</span>
              <!-- <span>邀请码：6598</span> -->
            </p>
          </div>
        </div>
        <!-- 佣金 金额 -->
        <div class="flexRow money-wrap">
          <div>
            <p>成功提现佣金（元）</p>
            <p class="money-num">{{detailData.getMoneyS}}</p>
          </div>
          <div>
            <p>可提现佣金（元）</p>
            <p class="flexRow">
              <span class="money-num">{{detailData.moneyS}}</span>
              <span class="btn-m" @click="routeTo(`../agCash/main?moneyS=${detailData.moneyS}&money=${detailData.money}`)">提现</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 功能 -->
    <div class="function">
      <div class="part-of-three" @click="routeTo(`../agCommission/main?detail=${JSON.stringify(detailData)}`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconjinqian"></i>
          <p>分销佣金</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agOrder/main?id=${detailData.id}&total=${detailData.totalS}`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont icondingdan1"></i>
          <p>分销订单</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agCashDetail/main`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconzuomingxi"></i>
          <p>提现明细</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agMyTeam/main?id=${detailData.id}`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont icontuandui"></i>
          <p>我的团队</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../agExtend/main`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconerweima"></i>
          <p>推广代理</p>
        </div>
      </div>
      <div class="part-of-three" @click="routeTo(`../Pusher/main`)">
        <div class="flex-wrap flexColumn">
          <i class="iconfont iconkuaisushengji"></i>
          <p>分销升级</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import apiPerson from '@/api/person'
  export default {
    data () {
      return {
        styleBar: '',
        detailData: {}
      }
    },
    methods: {
      fmoney (s, n) {
        n = n > 0 && n <= 20 ? n : 2
        s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + ''
        var l = s.split('.')[0].split('').reverse()
        var r = s.split('.')[1]
        let t = ''
        for (let i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
        }
        return t.split('').reverse().join('') + '.' + r
      },
      info () {
        wx.getSystemInfo({
          success: (res) => {
            let totalTopHeight = 68
            if (res.model.indexOf('iPhone X') !== -1) {
              totalTopHeight = 88
            } else if (res.model.indexOf('iPhone') !== -1) {
              totalTopHeight = 64
            }
            let height = totalTopHeight - res.statusBarHeight
            this.styleBar = `margin-top:${res.statusBarHeight}px;height:${height}px;line-height:${height}px`
          }
        })
      },
      backTo () {
        wx.navigateBack({
          delta: 1
        })
      },
      routeTo (url) {
        wx.navigateTo({
          url
        })
      },
      async getInfo () {
        const { data } = await apiPerson.distributorOne()
        data.getMoneyS = this.fmoney(data.getMoney, 2)// 已提现的钱 成功提现佣金
        data.moneyS = this.fmoney(data.money, 2)// 可提现的钱
        data.totalS = this.fmoney(data.totalMoney, 2)// 累计佣金
        data.applyMoneyS = this.fmoney(data.applyMoney, 2)// 已申请佣金
        //   data.applyMoneyS = this.fmoney(data.applyMoney, 2)// 待打款佣金
        //   data.applyMoneyS = this.fmoney(data.applyMoney, 2)// 无效佣金
        data.waitMoneyS = this.fmoney(data.waitMoney, 2)// 待收货佣金
        data.uncheckMoneyS = this.fmoney(data.uncheckMoney, 2)// 未结算佣金
        this.detailData = data
      }
    },
    onLoad () {
      this.info()
    },
    onShow () {
      this.getInfo()
    }
  }
</script>
<style lang='scss' scoped>
  .agency-page {
    position: relative;
    font-size: 0;
    %flexRow {
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
    }

    .bg {
      width: 100%;
      height: 464rpx;
    }

    .absolute-wrap {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 464rpx;
      box-sizing: border-box;
    }

    .nav-bar {
      color: #fff;
      margin-left: 10rpx;
    }

    .icon-arrow-right {
      transform: rotate(-180deg);
      width: 60rpx;
      font-size: 46rpx;
    }

    //   头像佣金
    .sec-wrap {
      font-size: 24rpx;
      margin: 10rpx 0 0 44rpx;
      color: rgba(255, 255, 255, 0.7);
      display: flex;
    }

    .big-size {
      font-size: 28rpx;
      font-weight: bold;
      margin-right: 20rpx;
      color: #fff;
    }

    .header-img {
      width: 90rpx;
      height: 90rpx;
      border-radius: 50%;
      margin-right: 18rpx;
    }

    .margin-r {
      margin-right: 34rpx;
    }

    .radius-border {
      border: 2rpx solid rgba(255, 255, 255, 0.6);
      border-radius: 100rpx;
      text-align: center;
      line-height: 34rpx;
      display: inline-block;
      padding: 0 14rpx;

      .mar-txt {
        margin-right: 16rpx;
      }
    }

    //   佣金 金额
    .money-wrap {
      color: #fff;
      font-size: 28rpx;
      justify-content: space-between;
      margin: 64rpx 88rpx 0;
      display: flex;
      .money-num {
        font-size: 40rpx;
      }

      .btn-m {
        width: 76rpx;
        height: 36rpx;
        font-size: 26rpx;
        line-height: 36rpx;
        text-align: center;
        background-color: #fff;
        color: #2A94EC;
        display: inline-block;
        font-weight: bold;
        border-radius: 100rpx;
        margin-left: 12rpx;
      }
    }

    // 功能
    .function {
      background-color: #fff;
      font-size: 26rpx;
      color: #5B5B5B;
      position: relative;

      &:after {
        content: ' ';
        width: 2rpx;
        height: 328rpx;
        background-color: #f2f2f2;
        position: absolute;
        left: 33.3%;
        top: 30rpx;
      }
      &:before {
        content: ' ';
        width: 2rpx;
        height: 328rpx;
        background-color: #f2f2f2;
        position: absolute;
        right: 33.3%;
        top: 30rpx;
      }
    }

    .part-of-three {
      width: 33.3%;
      display: inline-block;
      text-align: center;
      border-bottom: 2rpx solid #f2f2f2;
      box-sizing: border-box;
      height: 194rpx;
    }
    .part-of-three:nth-child(4),
    .part-of-three:nth-child(5)  {
      border-bottom: none;
    }
    .flex-wrap{
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    .iconfont{
      font-size: 42rpx;
    }
    .iconjinqian{
      color: #FF9100;
    }
    .icondingdan1{
      color: #57A6FF;
    }
    .iconzuomingxi{
      color: #FBC600;
    }
    .icontuandui{
      color: #FF5858;
    }
    .iconerweima{
      color: #0DC423;
    }
    .iconkuaisushengji{
      color: #6DB8FF;
    }
  }

</style>
