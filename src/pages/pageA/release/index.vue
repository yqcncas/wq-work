<template>
  <div class="release">
    <div class="main">
      <div class="top">
        <span class="date">今天</span>
        <span class="choose" @click="preview">
          <img src="../../../../static/images/release-F.png"/>
        </span>
      </div>
      <div class="conts-mains">
        <div class="resA" v-for="(item,index) in release" :key="index">
          <div class="time">
            <a>{{ item.createDate.date }}</a>{{ item.createDate.months + 1}}月
          </div>
          <div class="middle" v-if="item.imgUrl !== null && item.imgUrl[0] !== ''">
            <span class="Img">
              <img :src="item.imgUrl[0]">
            </span>
            <span class="title">
             {{ item.content }}
            </span>
          </div>
          <div class="middleVideo" v-else-if="item.videoUrl !== null && item.videoUrl !==''">
            <span class="video">
              <img
                id="myVideo"
                :src="item.videoUrl +  '?x-oss-process=video/snapshot,t_2000,f_jpg,w_800,h_600'"
                controls
              >
              <i class="iconbofang1 iconfont"></i>
            </span>
            <span class="title">
             {{ item.content }}
            </span>
          </div>
          <div class="middleTitle" v-else>
            <span class="title">
             {{ item.content }}
            </span>
          </div>
          <div class="rightA">
            <p class="look">{{ item.browseCount }}次浏览</p>
            <p class="bottom">
              <span class="edit" @click="goEdit(item.id,item.videoUrl,item.imgUrl)">编辑</span>
              <span class="line"></span>
              <span class="delete" @click="goDelete(item.id)">删除</span>
            </p>
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
    // 删除动态
    goDelete (id) {
      this.$fly.request({
        method: 'post',
        url: '/news/delete',
        body: {
          'id': id
        }
      }).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getDynamic()
          wx.showToast({
            title: '删除成功',
            icon: 'none',
            duration: 2000
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 选择发布何种类型
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
      } else if (photo !== null && photo[0] !== '') {
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
        if (res.code === 200) {
          this.release = res.data.list
          const newList = res.data.list
          newList.map(item => {
            let temp = this.moment(item.createDate).toObject()
            item.createDate = temp
          })
        }
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
