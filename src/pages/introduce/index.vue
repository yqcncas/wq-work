<template>
    <div class="introduce">
        <div class="top">
          <div class="industry">
            <span class="title">行业</span>
            <span class="choose" @click="goToTrade()" >{{ choose }}<i class="iconfont iconyouce"></i></span>
          </div>
          <div class="studs">
            <span class="title">类型</span>
            <picker class="choose" mode="selector" :value="index" :range="valueA" range-key="tradeName" @change="bindRegionChange( valueA[index].id)">
              <span class="picker">{{ valueA[index].tradeName}}<i class="iconfont iconyouce"></i></span>
            </picker>
          </div>
          <div class="textArea">
            <textarea v-model="info" placeholder="填写公司简介"></textarea>
            <uploadImg ref="imtUrl" width="120rpx" height="120rpx" max="1" @choosed="choosed" :srcs="imgUrl"></uploadImg>
          </div>
        </div>
        <div v-if="panA === 1" class="footer">
          <button class="save" @click="save()">保存</button>
        </div>
        <div v-else class="footer">
          <button  class="save" @click="update()">更新</button>
        </div>
    </div>
</template>

<script>
  import uploadImg from '@/components/uploadImgOne'
  export default {
    name: 'index',
    components: {
      uploadImg
    },
    data () {
      return {
        array: ['美国', '中国', '巴西', '日本'],
        TradeId: 0,
        salesmanId: '',
        info: '',
        imtUrl: '',
        valueA: [{
          tradeName: ''
        }],
        tradeName: '',
        select: '',
        choose: '去选择',
        label: '',
        TradeName: '',
        index: 0,
        tradeId: '',
        imgUrl: '',
        secTradeId: '',
        pan: 1,
        panA: ''
      }
    },
    onShow () {
      this.getSalesmanId()
      this.getSelectOne()
      if (this.pan === 2) {
      } else {
        this.panA = 1
      }
    },
    onLoad: function (options) {
      this.TradeName = options.name
      this.choose = this.TradeName
      this.TradeId = options.id
      this.tradeId = options.id
      if (options.pan) {
        this.pan = options.pan
      } else {
        this.pan = 1
      }
      if (options.id) {
        this.lookUp()
      }
    },
    methods: {
      goToTrade () {
        wx.navigateTo({
          url: `../chooseTrade/main?id=` + this.TradeId + '&name=' + this.choose
        })
      },
      goTo () {
        wx.navigateTo({
          url: `../personal/main`
        })
      },
      // 查询salesmanId
      getSalesmanId () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get',
          url: 'server/platformSalesman/selectSelfInfo',
          body: {
            'userId': userId
          }
        }).then(res => {
          const salesmanId = res.data.id
          wx.setStorageSync('salesmanId', salesmanId)
        }).catch(err => {
          console.log(err)
        })
      },
      // 查询单个
      // 查询salesmanId
      getSelectOne () {
        const salesmanId = wx.getStorageSync('salesmanId') // 获取本地userId
        this.$fly.request({
          method: 'get',
          url: 'server/companyInfo/selectOne',
          body: {
            'salesmanId': salesmanId
          }
        }).then(res => {
          console.log('11', res)
          if (res.code === 200) {
            this.imgUrl = res.data.imgUrl
            this.info = res.data.info
            this.tradeId = res.data.tradeId
            this.TradeId = res.data.tradeId
            this.id = res.data.id
            this.choose = res.data.tradeName
            this.label = res.data.sechTradeName
            this.panA = 2
            this.lookUp()
          } else {
            this.panA = 1
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 查找类型
      lookUp (id) {
        this.$fly.request({
          method: 'get',
          url: 'server/trade/selectAllByTradeId',
          body: {
            'tradeId': this.TradeId
          }
        }).then(res => {
          this.valueA = res.data.list
          this.secTradeId = res.data.id
        }).catch(err => {
          console.log(err)
        })
      },
      // Change
      bindRegionChange (e) {
        this.secTradeId = e
      },
      // 图片选择
      choosed (val) {
        if (val.all) {
          this.imgUrl = val.all
          // this.imgUrls = this.imtUrl.imtUrl
        }
      },
      // 更新公司介绍
      update () {
        const salesmanId = wx.getStorageSync('salesmanId')
        this.$fly.request({
          method: 'post',
          url: 'server/companyInfo/update',
          body: {
            'id': this.id,
            'info': this.info,
            'salesmanId': salesmanId,
            'imgUrl': this.imgUrl,
            'tradeId': this.tradeId,
            'secTradeId': this.secTradeId
          }
        }).then(res => {
          if (res.code === 200) {
            wx.showToast({
              title: '更新成功',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack(-1)
            }, 3000)
          }
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      },
      // 保存公司介绍
      save () {
        const salesmanId = wx.getStorageSync('salesmanId')
        this.$fly.request({
          method: 'post',
          url: 'server/companyInfo/insert',
          body: {
            'info': this.info,
            'salesmanId': salesmanId,
            'imgUrl': this.imgUrl,
            'tradeId': this.tradeId,
            'secTradeId': this.secTradeId
          }
        }).then(res => {
          if (res.code === 200) {
            wx.showToast({
              title: '保存成功',
              icon: 'none',
              duration: 2000
            })
            setTimeout(function () {
              wx.navigateBack(-1)
            }, 3000)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
