<template>
  <div class="release">
    <div class="main">
      <div class="top">
        <!--<span class="cancel">取消</span>-->
        <span class="sure">确定</span>
      </div>
      <div class="text">
        <textarea class="inputMsg" placeholder="请输入内容" @input="txtInput"></textarea>
      </div>
      <div class="upload">
        <uploadImgA width="120rpx" height="120rpx" max="1" @choosed="choosed" @delete=""></uploadImgA>
      </div>
      <div class="address" @click="chooseLocation()">
        <span class="icont">
          <i class="iconfont icondizhi-copy"></i>
        </span>
        <span class="map"> {{ location }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import uploadImgA from '@/components/uploadImgA'
export default {
  name: 'index',
  components: {
    uploadImgA
  },
  data () {
    return {
      location: '定位'
    }
  },
  methods: {
    chooseLocation () {
      var that = this
      wx.chooseLocation({
        success: function (res) {
          console.log(res)
          console.log(res.name)
          that.location = res.name
        }
      })
    }
  },
  onLoad (option) {
  },
  onShow () {
    this.location = '定位'
  }
}
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
