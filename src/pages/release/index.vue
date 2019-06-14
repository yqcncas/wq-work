<template>
  <div class="release">
    <div class="main">
      <div class="top">
        <span class="date">今天</span>
        <span class="choose" @click="preview">
          <img src="../../../static/images/release-F.png"/>
        </span>
      </div>
      <div class="conts-mains">
        <div class="resA" v-for="(item,index) in release" :key="index">
          <div class="time">
            <a>{{ item.createDate.date }}</a>{{ item.createDate.months + 1}}月
          </div>
          <div class="middle" v-if="item.imgUrlList !== null && item.imgUrlList[0] !== ''">
            <span class="Img">
              <img :src="item.imgUrlList[0]">
            </span>
            <span class="title">
             {{ item.title }}
            </span>
          </div>
          <div class="middleVideo" v-else-if="item.video !== null">
            <span class="video">
              <img
                id="myVideo"
                :src="item.video +  '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'"
                controls
              >
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
            <p class="look">{{ item.browseCount }}次浏览</p>
            <p class="edit" @click="goEdit(item.id,item.video,item.imgUrlList)">编辑</p>
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
      status: true,
      release: []
    }
  },
  onShow () {
    this.info = ''
    this.imgUrlList = ''
    this.getDynamic()
  },
  methods: {
    preview (index) {
      wx.showActionSheet({
        itemList: ['文字', '照片', '视频'],
        success: function (res) {
          if (res.tapIndex === 0) {
            wx.navigateTo({
              url: `../resEdit/main?`
            })
          } else if (res.tapIndex === 1) {
            wx.navigateTo({
              url: `../resEdit/main?photo=1`
            })
          } else {
            wx.navigateTo({
              url: `../resEdit/main?video=1`
            })
          }
        }
      })
    },
    // 编辑动态
    goEdit (id, video, photo) {
      if (video !== null && video !== '') {
        wx.navigateTo({
          url: `../resEdit/main?id=` + id + '&video=1' + '&status=' + this.status
        })
      } else if (photo !== null && photo !== '') {
        wx.navigateTo({
          url: `../resEdit/main?id=` + id + '&photo=1' + '&status=' + this.status
        })
      } else {
        wx.navigateTo({
          url: `../resEdit/main?id=` + id + '&status=' + this.status
        })
      }
    },
    // 获取发布动态
    getDynamic () {
      const salesmanId = wx.getStorageSync('salesmanId')
      this.$fly.request({
        method: 'get',
        url: '/dynamic/selectBySalesmanId',
        body: {
          'salesmanId': salesmanId
        }
      }).then(res => {
        console.log(res)
        this.release = res.data.list
        const newList = res.data.list
        newList.map(item => {
          let temp = this.moment(item.createDate).toObject()
          item.createDate = temp
        })
      }).catch(err => {
        console.log(err)
      })
    }
  },
  onLoad (option) {
  }
}
</script>
<style lang="less" scoped>
  @import "./style.less";
</style>
