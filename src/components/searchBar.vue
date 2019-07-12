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
        <span class="weui-search-bar__text">搜索</span>
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
  /*.weui-search-bar{*/
    /*position: relative;*/
    /*padding: 16rpx 20rpx;*/
    /*display: -webkit-box;*/
    /*display: -webkit-flex;*/
    /*display: flex;*/
    /*box-sizing: border-box;*/
    /*background-color: #efeff4;*/
    /*border-top: 1rpx solid #d7d6dc;*/
    /*border-bottom: 1rpx solid #d7d6dc;*/
   /*.weui-search-bar__box{*/
     /*width: 94%;*/
     /*display: inline-block;*/
     /*background: #ffffff;*/
     /*.weui-icon-search_in-box{*/
       /*width: ~'40rpx';*/
       /*height: ~'40rpx';*/
       /*margin-top: ~'2rpx';*/
       /*display: inline-block;*/
     /*}*/
     /*.weui-search-bar__input {*/
       /*display: inline-block;*/
       /*width: 80%;*/
       /*font-size: ~'30rpx';*/
       /*color: #cccccc;*/
     /*}*/
   /*}*/
    /*.weui-search-bar__label{*/
      /*width: 96%;*/
      /*display: inline-block;*/
      /*height: ~'56rpx';*/
      /*line-height: ~'56rpx';*/
      /*margin: ~'22rpx' 2%;*/
      /*background: #ffffff;*/
      /*text-align: center;*/
      /*border-radius: ~'10rpx';*/
      /*.weui-icon-search{*/
        /*width: ~'40rpx';*/
        /*height: ~'40rpx';*/
        /*margin-top: ~'2rpx';*/
        /*display: inline-block;*/
      /*}*/
      /*.weui-search-bar__text{*/
        /*display: inline-block;*/
        /*font-size: ~'30rpx';*/
        /*color: #cccccc;*/
      /*}*/
    /*}*/
   /*}*/
  .weui-search-bar {
    position: relative;
    padding: 16rpx 20rpx;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    box-sizing: border-box;
    background-color: #efeff4;
    border-top: 1rpx solid #d7d6dc;
    border-bottom: 1rpx solid #d7d6dc;
  }

  .weui-icon-search {
    margin-right: 16rpx;
    font-size: inherit;
  }

  .weui-icon-search_in-box {
    position: absolute;
    left: 20rpx;
    top: 14rpx;
  }

  .weui-search-bar__text {
    display: inline-block;
    font-size: 28rpx;
    vertical-align: top;
  }

  .weui-search-bar__form {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: auto;
    flex: auto;
    border-radius: 10rpx;
    background: #fff;
    border: 1rpx solid #e6e6ea;
  }

  .weui-search-bar__box {
    position: relative;
    padding-left: 60rpx;
    padding-right: 60rpx;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
  }

  .weui-search-bar__input {
    height: 56rpx;
    line-height: 56rpx;
    font-size: 28rpx;
  }

  .weui-icon-clear {
    position: absolute;
    top: 0;
    right: 0;
    padding: 14rpx 16rpx;
    font-size: 0;
  }

  .weui-search-bar__label {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    border-radius: 6rpx;
    text-align: center;
    color: #9b9b9b;
    background: #fff;
    line-height: 56rpx;
  }

  .weui-search-bar__cancel-btn {
    margin-left: 20rpx;
    line-height: 56rpx;
    color: #2a94ec;
    font-size: ~'30rpx';
    white-space: nowrap;
  }
</style>
