<template>
  <div class="buy-just">
    <p class="flex-between top-t"><span>最近购买（{{total}}）</span><span class="blue" @click="checkBuyDetail">全部</span></p>
    <div class="record-list flex-between" v-for="(item,index) in data" :key="index">
      <div class="flex-start">
        <image class="header-img" :src="item.avatarUrl" mode="aspectFill"></image>
        <p class="detail-re">{{item.nickName}}<span class="red">{{item.info}}</span>了 {{item.goodsName}}</p>
      </div>
      <span>{{item.dateBefore}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    total: {
      type: Number,
      default: null
    }
  },
  methods: {
    checkBuyDetail () {
      this.$emit('checkBuyDetail')
    }
  }
}
</script>
<style lang="scss">
%flexRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}
//   最近购买
.buy-just {
  padding: 16rpx 30rpx;
  width: 100%;
  background-color: #fff;
  font-size: 22rpx;
  color: #9b9b9b;
  box-sizing: border-box;
  margin-bottom: 10rpx;

  .blue {
    color: #2a94ec;
  }

  .red {
    color: #fe615f;
  }

  .flex-between {
    @extend %flexRow;
  }

  .top-t,
  .record-list {
    margin-bottom: 20rpx;
  }

  .header-img {
    width: 46rpx;
    height: 46rpx;
    border-radius: 4rpx;
  }

  .flex-start {
    @extend %flexRow;
    justify-content: flex-start;
  }

  .detail-re {
    margin-left: 14rpx;
    width: 460rpx;
  }
}
</style>
