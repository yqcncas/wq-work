<template>
    <div class="introduce">
        <div class="top">
          <div class="industry">
            <span class="title">产品标题</span>
            <span class="choose">
              <input placeholder="填写标题"/>
            </span>
          </div>
          <div class="studs">
            <span class="title">产品价格</span>
            <span class="choose">
              <input placeholder="填写价格"/>
            </span>
          </div>
          <div class="textArea">
            <textarea placeholder="填写产品介绍"></textarea>
            <div class="upload">
              <div class="title">
                <span class="product">产品展示</span>
                <span class="tips">最多展示三张，第一张为封面</span>
              </div>
            </div>
            <uploadImg width="116rpx" height="116rpx" max="1" @choosed="choosed" @delete="" ></uploadImg>

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
@import "style.less";
</style>
