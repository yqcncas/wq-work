<template>
  <div class="logistics-page">
    <div class="top-code flexRow">
      <image :src="url" class="logo" mode="aspectFill"></image>
      <div class="right-logistic">
        <p class="name">{{shipperName}}</p>
        <p class="flexRow" @click="textPaste">
          <span>单号：{{logisticCode}}</span>
          <i class="iconfont icon-fuzhicopy211"></i>
        </p>
      </div>
    </div>
    <div class="white-logistics">
      <div class="top-address flexRow">
        <span class="collect">收</span>
        <span class="address">【收货地址】{{address}} </span>
      </div>
      <div>
        <div v-for="(item,i) in list" :key="i" class="flexRow single-box" :class="{active:i===0}">
          <span class="radius-wrap" v-if="item.txt==='已签收'"><i class="iconfont icon-gouxuan"></i></span>
          <!-- <span class="radius-wrap" v-if="item.txt==='派送中'"><i class="iconfont icon-wo"></i></span> -->
          <span class="radius-wrap-small" v-if="item.txt===''"></span>
          <span class="radius-wrap" v-if="item.txt==='已揽件'"><i class="iconfont icon-shouye-fahuo"></i></span>
          <!-- <span class="radius-wrap" v-if="item.txt==='已发货'"><i class="iconfont icon-xingsszhuang"></i></span> -->
          <span class="radius-wrap" v-if="item.txt==='问题件'"><i class="iconfont icon-question"></i></span>
          <div class="right-box">
            <p v-if="item.txt!==''">{{item.txt}}</p>
            <p>{{item.acceptStation}}</p>
          </div>
          <div class="date-wrap">
            <p class="date">{{item.date}}</p>
            <p class="time">{{item.time}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<script>
import personApi from '@/api/person'
export default {
  data () {
    return {
      list: [],
      id: null,
      shipperName: '',
      state: '',
      logisticCode: '',
      url: '',
      traces: [],
      address: '',
      stateArr: ['无轨迹', '已揽件', '在途中', '已签收', '问题件']
    }
  },
  methods: {
    // 查询物流
    async insertOpera () {
      const { data: { shipperName, state, logisticCode, url, traces, address } } = await personApi.logisticsSearch(this.id)
      this.shipperName = shipperName
      this.state = state
      this.logisticCode = logisticCode
      this.url = url
      this.address = address
      traces.map(item => {
        item.date = this.moment(item.acceptTime).format('MM-DD')
        item.time = this.moment(item.acceptTime).format('HH:mm')
        item.txt = ''
      })
      traces[0].txt = this.stateArr[+state]
      this.list = traces
    },
    // 复制单号
    textPaste () {
      wx.setClipboardData({
        data: this.logisticCode,
        success: (res) => {
          wx.showToast({
            title: '复制成功',
            icon: 'none'
          })
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.insertOpera()
  },
  onShow () {
  }
}
</script>
<style lang='scss'>
@import "./style";
</style>
