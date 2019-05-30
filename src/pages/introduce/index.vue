<template>
    <div class="introduce">
        <div class="top">
          <div class="industry">
            <span class="title">行业</span>
            <span class="choose">去选择<i class="iconfont iconyouce"></i></span>
          </div>
          <div class="studs">
            <span class="title">类型</span>
            <span class="choose">类型1<i class="iconfont iconyouce"></i></span>
          </div>
          <div class="textArea">
            <textarea placeholder="填写公司简介"></textarea>
            <uploadImg width="120rpx" height="120rpx" max="1" @choosed="choosed" @delete=""></uploadImg>
          </div>
        </div>
        <div class="footer">
          <button class="save">保存</button>
        </div>
    </div>
</template>

<script>
  import uploadImg from '@/components/uploadImg'
  export default {
    name: 'index',
    components: {
      uploadImg
    }
  }
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
