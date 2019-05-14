<template>
    <div class="radar">
      <div class="radar-top">
        <div class="testNav">
          <div
            :class="{'selected':tab === 1,'testTitle':true}"
            @click="changTab(1)"
          >时间</div>
          <div
            :class="{'selected':tab === 2,'testTitle':true}"
            @click="changTab(2)"
          >行为</div>
          <div
            :class="{'selected':tab === 3,'testTitle':true}"
            @click="changTab(3)"
          >互动</div>
        </div>
        <div class="cont">
          <div v-if="tab===1">
            <div class="Time">
              <div class="Time-main">
                <div class="date">2019年5月20日</div>
                <div class="card">
                  <div class="card-main">
                    <!--<span><img src="../../../static/images/tiangou.jpg"/> </span>-->
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="tab===2">
            22
          </div>
          <div v-else>
            333
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        tab: 1
      }
    },
    methods: {
      changTab (index) {
        if (index === 1) {
          this.tab = index
          this.status = index
        } else if (index === 2) {
          this.tab = index
          this.status = index
        } else {
          this.tab = index
          this.status = index
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./radar";
</style>
