<template>
  <div :class="{'pad-25-2':data.padding===1}" :style="{color:data.textColor,'text-align':(data.textStyle===2?'right':(data.textStyle===1?'center':'left')),'font-size':data.wordSize*2+'rpx'}">
    <text class="default-bg" :style="style">{{data.textWords}}</text>
  </div>
</template>
<script>
export default {
  data () {
    return {
      style: ''
    }
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    getStyle () {
      let arr = this.data.textFormat.split(',')
      let styleArr = []
      arr.map(item => {
        let temp = ''
        if (item === '') return
        if (item === '0') {
          temp = 'font-weight:bold'
        } else if (item === '1') {
          temp = 'font-style:italic'
        } else if (item === '2') {
          temp = 'text-decoration:underline'
        }
        styleArr.push(temp)
      })
      this.style = styleArr.join(';')
    }
  },
  onLoad () {
    this.getStyle()
  }
}
</script>
<style lang="scss">
.default-bg {
//   background-color: #fff;
  line-height: 1.2;
}
</style>
