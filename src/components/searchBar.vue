<template>
  <div class="weui-search-bar">
    <div class="weui-search-bar__form">
      <div class="weui-search-bar__box">
        <icon class="weui-icon-search_in-box" type="search" size="14"></icon>
        <input type="text" class="weui-search-bar__input" :placeholder="placeholder" :value="inputValue" :focus="isFocus"
          :confirm-type="confirmType" @input="input" @blur="blur" @focus="focus" @confirm="confirm" />
        <div class="weui-icon-clear" v-if="inputValue.length > 0" @click="clearInput">
          <icon type="clear" size="14"></icon>
        </div>
      </div>
      <label class="weui-search-bar__label" :hidden="isFocus" @click="showInput">
        <icon class="weui-icon-search" type="search" size="14"></icon>
        <div class="weui-search-bar__text">搜索</div>
      </label>
    </div>
    <div class="weui-search-bar__cancel-btn" :hidden="!isFocus" @click="hideInput">取消</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: this.value
    }
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    isFocus: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '搜索'
    },
    confirmType: {
      type: String,
      default: 'done'
    }
  },
  watch: {
    value (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    }
  },
  methods: {
    showInput () {
      this.isFocus = true
    },
    hideInput () {
      this.inputValue = ''
      this.isFocus = false
      this.$emit('cancel', false)
    },
    clearInput () {
      this.inputValue = ''
    },
    /* 键盘输入时触发 */
    input (e) {
      this.$emit('on-input', e)
    },
    /* 输入框失去焦点时触发 */
    blur (e) {
      this.$emit('blur', e)
    },
    /* 输入框聚焦时触发 */
    focus (e) {
      this.$emit('focus', e)
    },
    /* 点击完成时触发 */
    confirm (e) {
      this.$emit('confirm', e)
    }
  }
}
</script>

<style lang="less" scoped>
  .weui-search-bar{
    width: 100%;
    height: ~'100rpx';
   .weui-search-bar__box{
     width: 94%;
     display: inline-block;
     border-radius: ~'40rpx';
     margin: ~'20rpx' 3%;
     height: ~'60rpx';
     .weui-icon-search_in-box{
       float: left;
       margin: ~'18rpx' 0 0 ~'15rpx';
     }
     .weui-search-bar__input{
       float: left;
       width: 80%;
       font-size: ~'24rpx';
       margin: ~'5rpx' 0 0 ~'20rpx';
     }
   }
    .weui-search-bar__label{

    }
  }
</style>
