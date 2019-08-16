<template>
  <div class="GroupCard">
    <div class="top">
      <div class="card" v-for="(item,index) in Groups" :key="index" @click="router()">
        <div class="subject">
          <span class="headImage"><img :src="item.src"></span>
          <div class="con">
            <div class="GroupName">{{ item.name }}</div>
            <div class="Icont">
              <span class="number">{{ item.number }}位成员</span>
              <span class="attribute">{{ item.attribute }}</span>
            </div>
            <div class="brief">
              <span>编辑</span>
              <i class="iconfont iconyouce"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="search">
        <i class=" iconfont iconsousuo"></i>
        <span><input placeholder="搜索" placeholder-style="color: #9d9d9d;"></span>
      </div>
      <div class="select">
        <Vselect :data="select" align="center" fix  @change="getSelectResult($event)"></Vselect>
      </div>
      <div class="cards">
        <div class="cardHold-ftMain">
          <div class="cardHold-ftMain-ct" v-for="(item,index) in commitInfo" :key="index">
            <div class="center" @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :data-type="item.type" >
              <div class="cardHold-ftMain-ct-img" @click="recover(index)">
                <img src="../../../static/images/tiangou.jpg"/>
              </div>
              <div class="cardHold-ftMain-rt" @click="recover(index)">
                <span class="icon">{{ item.icon }}</span>
                <span class="name">{{ item.name }}</span>
                <span class="job">{{ item.job }}</span>
                <span class="status">{{ item.status }}</span>
                <p class="company">{{ item.company }}</p>
              </div>
              <div class="delete" @click="delect(index)">
                踢出
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vselect from '@/components/Vselect'
  export default {
    name: 'index',
    components: { Vselect },
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
        Groups: [{
          src: '../../../static/images/tiangou.jpg',
          name: '今天你吃了吗',
          number: '3',
          attribute: '公司通讯录',
          center: '大家好这是我们的日常聊天互骚群，欢迎各位加入'
        }],
        select: [
          {
            label: '全部区域',
            option: [
              { name: '100元', value: 100 },
              { name: '200元', value: 200 },
              { name: '300元', value: 300 }
            ]
          },
          {
            label: '房地产',
            option: [
              { name: '1000M', value: 1000 },
              { name: '2000M', value: 2000 },
              { name: '3000M', value: 3000 },
              { name: '全城', value: 'all' }
            ]
          },
          {
            label: '最新',
            option: [
              { name: '很帅', value: 'asc' },
              { name: '不帅', value: 'desc' }
            ]
          }
        ],
        commitInfo: [{
          top: 'A',
          icon: '企',
          name: '李松阳',
          company: '浙江万仟科技有限公司',
          status: '已认证',
          job: '技术总监',
          type: 0
        }, {
          icon: '企',
          name: '李松阳',
          company: '浙江万仟科技有限公司',
          status: '已认证',
          job: '技术总监',
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
      },
      router () {
        wx.navigateTo({
          url: 'pages/group/main'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import "style";
</style>
