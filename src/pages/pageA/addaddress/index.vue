<template>
  <div class="add-address">
    <div class="top-box">
      <div class="item-box">
        <span>姓名</span>
        <input class="input-text" placeholder="请输入你的名字" v-model="userName" />
      </div>
      <div class="item-box">
        <span>手机</span>
        <input class="input-text" placeholder="请输入你的手机号" v-model="telNumber" type="number" />
      </div>
      <div class="item-box right-area">
        <span>区域</span>
        <div class="area-pick">
          <picker class="picks-i" mode="region" @change="bindRegionChange" :value="region">
            <input class="input-text" type="text" placeholder="身份、城市、区县" v-model="address" disabled>
          </picker>
          <i class="iconfont icon-arrow-right"></i>
        </div>
      </div>
      <div class="item-box">
        <input class="input-text" placeholder="街道、楼牌号" v-model="detailadress" />
      </div>
      <!-- 设为默认 -->
      <div class="item-box set-default" @click="chooseActive">
        <p>设为默认</p>
        <i class="iconfont iconchoose" :class="{'iconxianshi_xuanzetianchong':active}"></i>
      </div>
    </div>
    <div class="bottom-btn">
      <p @click="wxaddress">一键导入</p>
      <p class="add-new" @click="addAddress">保存地址</p>
    </div>
  </div>
</template>
<script>
import addressApi from '@/api/address'
export default {
  mounted () {
    if (this.$root.$mp.query.res) {
      this.res = JSON.parse(decodeURIComponent(this.$root.$mp.query.res))
      this.userName = this.res.userName
      this.telNumber = this.res.telNumber
      this.region = [this.res.provinceName, this.res.cityName, this.res.countyName]
      this.address = this.region.join('')
      this.detailadress = this.res.detailInfo
    }
    if (this.$root.$mp.query.id) {
      this.id = this.$root.$mp.query.id
      this.getDetail()
    }
  },
  data () {
    return {
      region: [],
      id: null,
      res: {},
      userName: '',
      telNumber: '',
      address: '',
      detailadress: '',
      active: true
    }
  },
  methods: {
    //   设为默认
    chooseActive () {
      if (this.active) {
        this.active = false
      } else {
        this.active = true
      }
    },
    bindRegionChange (e) {
      var value = e.mp.detail.value
      this.address = value[0] + '' + value[1] + '' + value[2]
      this.region = value
    },
    async getDetail () {
      // 获取地址的详细信息
      const detail = await addressApi.orderAddressOne({ id: this.id })
      this.userName = detail.data.name
      this.telNumber = detail.data.phone
      this.region = JSON.parse(detail.data.address)
      this.address = this.region.join('')
      this.detailadress = detail.data.addressDetail
      if (detail.data.isDefault === 1) {
        this.active = true
      } else {
        this.active = false
      }
    },
    async addAddress () {
      // 更新地址信息
      let data = {}
      if (this.id) {
        data = await addressApi.updateAddress({ id: this.id, address: JSON.stringify(this.region), name: this.userName, phone: this.telNumber, addressDetail: this.detailadress, isDefault: (this.active ? 1 : 0) })
      } else {
        data = await addressApi.addAddress({ address: JSON.stringify(this.region), name: this.userName, phone: this.telNumber, addressDetail: this.detailadress, isDefault: (this.active ? 1 : 0) })
      }
      if (data.code === 200) {
        wx.showToast({
          title: '操作成功', // 提示的内容,
          icon: 'none', // 图标,
          duration: 2000 // 延迟时间,
        })
        wx.navigateBack({
          delta: 1 // 返回的页面数，如果 delta 大于现有页面数，则返回到首页,
        })
      }
    },
    wxaddress () {
      wx.chooseAddress({
        success: (res) => {
          this.userName = res.userName
          this.telNumber = res.telNumber
          this.region = [res.provinceName, res.cityName, res.countyName]
          this.address = this.region.join('')
          this.detailadress = res.detailInfo
        }
      })
    }
  },
  onLoad (options) {
    if (options.id) {
      this.id = options.id
    } else {
      this.userName = ''
      this.telNumber = ''
      this.address = ''
      this.region = []
      this.detailadress = ''
      this.active = true
      this.id = null
    }
  }
}
</script>
<style lang='scss'>
@import "style";
</style>
