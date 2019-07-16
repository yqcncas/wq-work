<template>
  <div class="ag-extend-page">
    <div class="extend-wrap">
      <image class="code-img" :src="url" mode="widthFix"></image>
    </div>
  </div>
</template>
<script>
import apiPerson from '@/api/person'
export default {
  data () {
    return {
      url: ''
    }
  },
  methods: {
    async getUrl () {
      const { data } = await apiPerson.agExtend()
      this.url = data
    }
  },
  onLoad () {
    this.getUrl()
  }
}
</script>
<style lang='scss'>
@import "style";
</style>
