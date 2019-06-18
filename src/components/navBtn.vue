<template>
  <div class="swiper-b" :class="{'bg-white':(data.background===1),'icon-wrap':(data.iconStyle===0),'nav-btn':marginB}"
    id="aa">
    <div :class="{'for-child':(data.iconStyle===1),'icon-child':(data.iconStyle===0)}" v-for="(item,i) in data.list"
      :key="i" @click="jumpWay(item)">
      <div class="item">
        <image v-if="data.iconStyle===1" class="itemimg" :src="item.iconUrl" :style="'height:'+height+'rpx'" mode="aspectFill">
        </image>
        <image v-else class="icon-img" :src="item.iconUrl" mode="aspectFill">
        </image>
        <div class="font-24" :class="{'icon-txt':(data.iconStyle===0)}" v-if="item.title">{{item.title}}</div>
      </div>
      <!-- <div class="item" @click="makePhoneCall" v-if="item.homeInfo.textWord == 2">
        <image class="itemimg" :src="item.imageUrl">
        </image>
        <button open-type="contact" class="font-24 contact-phone">
          {{item.title}}
        </button>
      </div>
      <div class="item" @click="getAddress" v-if="item.homeInfo.textWord == 3">
        <image class="itemimg" :src="item.imageUrl"></image>
        <div class="font-24">{{item.homeInfo.title}}</div>
      </div> -->
    </div>
  </div>
</template>
<script>
import apicustom from '@/api/person'
export default {
  data () {
    return {
      height: ''
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    businessPhone: {
      type: String,
      default: ''
    },
    marginB: {
      type: Boolean,
      default: false
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
          current: item.iconUrl,
          urls: [item.iconUrl]
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
    },
    geHeight () {
      let height = (750 - 20) / this.data.list.length - 12
      if (this.data.type === 1) {
        this.height = height / 4 * 3
      } else if (this.data.type === 2) {
        this.height = height
      } else {
        this.height = height / 3 * 4
      }
    }
  },
  onLoad () {
    this.geHeight()
  },
  onShow () {
    this.geHeight()
  }
}
</script>
<style lang="scss">
.swiper-b {
  display: flex;
  align-items: center;
  padding: 0 0 12rpx;
  font-size: 30rpx;
  width: 100%;
  box-sizing: border-box;
  color: #a9a9a9;
  justify-content: space-around;
  .for-child {
    flex: 1;
  }
  .for-child + .for-child {
    margin-left: 12rpx;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    font-size: 24rpx;
    color: #9b9b9b;
  }
}
.icon-wrap {
  justify-content: flex-start;
  .icon-child {
    margin: 10rpx 0;
  }
  .icon-img {
    width: 64rpx;
    height: 64rpx;
  }
  .icon-txt {
    width: 187rpx;
    text-align: center;
  }
}
.itemimg {
  text-align: center;
  color: rgba(74, 74, 74, 1);
  width: 100%;
}
.font-24 {
  font-size: 24rpx;
  margin-top: 2rpx;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  text-align: center;
  padding: 6rpx 0;
}
.contact-phone {
  background-color: #fff;
  font-size: 30rpx;
  color: #a9a9a9;
  line-height: 1.5;
}

.contact-phone::after {
  border: none;
}
.bg-white {
  background-color: #fff;
}
.nav-btn {
  margin-bottom: 10rpx;
}
</style>
