<template>
    <div class="message">
      <div class="cardHold-ftMain">
        <div class="cardHold-ftMain-ct" v-for="(item,index) in commitInfo" :key="index">
          <div class="center" @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :data-type="item.type" >
            <div class="cardHold-ftMain-ct-img" @click="recover(index)">
              <img src="../../../static/images/tiangou.jpg"/>
            </div>
            <div class="cardHold-ftMain-rt" @click="recover(index)">
              <!--<span class="icon">{{ item.icon }}</span>-->
              <span class="name">{{ item.name }}</span>
              <!--<span class="job">{{ item.job }}</span>-->
              <!--<span class="status">{{ item.status }}</span>-->
              <!--<span class="grade">{{ item.grade }}</span>-->
              <p class="company">{{ item.company }}</p>
            </div>
            <div class="delete" @click="delect(index)">
              删除
            </div>
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
        startX: 0,
        endX: 0,
        indexId: '',
        indexy: '',
        y: 0,
        toView: '',
        indexShow: false,
        scrollTop: 0,
        indexEnglish: '',
        commitInfo: [{
          top: 'A',
          icon: '企',
          name: '李松阳',
          company: '浙江万仟科技有限公司浙江万仟科技有限公司浙江万仟科技有限公司',
          status: '已认证',
          grade: 'V1',
          type: 0
        }, {
          top: 'B',
          icon: '企',
          name: '李松阳',
          company: '浙江万仟科技有限公司',
          status: '已认证',
          grade: 'V2',
          type: 0
        }, {
          top: 'Z',
          icon: '企',
          name: '李松阳',
          company: '浙江万仟科技有限公司',
          status: '已认证',
          grade: 'V3',
          type: 0
        }, {
          top: 'X',
          icon: '企',
          name: '李松阳',
          company: '浙江万仟科技有限公司',
          status: '已认证',
          grade: 'V1',
          type: 0
        }]
      }
    },
    methods: {
      touchStart (e) {
        // 获取移动距离，可以通过打印出e，然后分析e的值得出
        this.startX = e.mp.changedTouches[0].clientX
        console.log(this.startX)
      },
      touchEnd (e, index) {
        // 获取移动距离
        this.endX = e.mp.changedTouches[0].clientX
        if (this.startX - this.endX > 10) {
          for (let i = 0; i < this.commitInfo.length; i++) {
            this.commitInfo[i].type = 0
          }
          this.commitInfo[index].type = 1
        } else if (this.startX - this.endX < -10) {
          for (let i = 0; i < this.commitInfo.length; i++) {
            this.commitInfo[i].type = 0
          }
        }
      },
      recover (index) {
        this.commitInfo[index].type = 0
      },
      // 删除
      delect (index) {
        this.commitInfo.splice(index, 1)
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
