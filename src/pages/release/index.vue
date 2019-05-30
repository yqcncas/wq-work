<template>
  <div class="release">
    <div class="main">
      <div class="top">
        <span class="date">今天</span>
        <span class="choose" @click="routeTo">
          <img src="../../../static/images/release-F.png"/>
        </span>
      </div>
      <div class="conts-mains">
        <div class="resA" v-for="(item,index) in release" :key="index">
          <div class="time">
            <a>{{ item.createDate }}</a>{{ item.createMonth }}
          </div>
          <div class="middle" v-if="item.imgUrls !== ''">
            <span class="Img">
              <img src="../../../static/images/tiangou.jpg">
            </span>
            <span class="title">
             {{ item.title }}
            </span>
          </div>
          <div class="middleVideo" v-else-if="item.video !== ''">
            <span class="video">
              <video
                id="myVideo"
                :src="item.video"
                controls
              ></video>
            </span>
            <span class="title">
             {{ item.title }}
            </span>
          </div>
          <div class="middleTitle" v-else>
            <span class="title">
             {{ item.title }}
            </span>
          </div>
          <div class="rightA">
            <p class="look">100次浏览</p>
            <p class="edit">编辑</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      num: 0,
      release: [{
        createDate: '22',
        createMonth: '6月',
        imgUrls: '../../static/images/tiangou.jpg',
        video: '',
        title: '   益赞名片功能更新 | 龙虎榜模块V升级服务在升级！'
      }, {
        createDate: '22',
        createMonth: '6月',
        imgUrls: '',
        video: 'https://oss.wq1516.com/salesVideo/201902281746221551347182435.mp4',
        title: '   益赞名片功能更新 | 龙虎榜模块V升级服务在升级！'
      }, {
        createDate: '22',
        createMonth: '6月',
        imgUrls: '',
        video: '',
        title: '   益赞名片功能更新 | 龙虎榜模块V升级服务在升级 益赞名片功能更新 | 龙虎榜模块V升级服务在升级！'
      }
      ]
    }
  },
  methods: {
    routeTo () {
      wx.navigateTo({
        url: `../resEdit/main`
      })
    }
  },
  onLoad (option) {
  },
  onShow () {
  }
}
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
