<template>
  <div class="img-wam-wrap" :class="{'mar-30-2-img':data.padding===1,shadow:data.bgshadow===1}" @click="jumpWay(data)">
    <image mode="widthFix" :src="data.pictureUrl" class="img-wan"></image>
  </div>
</template>
<script>
import apicustom from '@/api/person'
export default {
  data () {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    businessPhone: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 插入雷达
    async insertOpera (info, recordType) {
      let businessId = wx.getStorageSync('businessId')
      let salesmanId = wx.getStorageSync('salesManId')
      let userId = wx.getStorageSync('userId')
      await apicustom.OperationInsert({ businessId, info, recordType, salesmanId, userId })
    },
    jumpWay (item) {
      let jumpType = item.jumpType
      if (jumpType === 0) {
        wx.previewImage({
          current: item.pictureUrl,
          urls: [item.pictureUrl]
        })
      } else if (jumpType === 1) {
        if (item.data.product.name === '地图导航') {
          this.$emit('getAddress')
        } else if (item.data.product.name === '联系电话') {
          this.makePhoneCall()
        } else {
          this.$emit('productId', [item.data.product.id, jumpType])
        }
      } else if (jumpType === 2) {
        this.$emit('productId', [item.data.pointerPage.id, jumpType])
      }
    },
    // 呼叫电话
    makePhoneCall () {
      wx.makePhoneCall({
        phoneNumber: this.businessPhone,
        success: () => {
          this.insertOpera('拨打了电话', 20)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.img-wam-wrap {
  font-size: 0;
}
.mar-30-2-img {
  margin: 16rpx 25rpx;
}
.img-wan {
  width: 100%;
}
</style>
