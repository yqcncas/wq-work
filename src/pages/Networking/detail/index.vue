<template>
  <div class="main">
    <div class="news-wrap">
      <div v-if="salesmanId !== ''">
        <div class="head">
          <!--<h1 class="title">{{title}}</h1>-->
          <div class="info">
            <span class="source js-source">{{author}}</span>
            <span class="time js-time">{{time}}</span>
          </div>
        </div>
        <div class="contentA">
          <div class="title" v-if="content!==''">
            <span>&nbsp; &nbsp; &nbsp; &nbsp;{{content}}</span>
          </div>
          <div class="imgA" v-if="imgUrl.length>0">
            <div class="imgMainA" v-for="item in imgUrl" :key="index">
              <image :src="item" class="imgB"  @click="previewImg(imgUrl,index)"  mode=""></image>
            </div>
          </div>
          <div class="up-video" v-if="video">
            <video id="myVideo" v-if="videoFlag" :src="video" @play="playA()"  @ended=" end()" autoplay objectFit="fill" class="cover-hw"></video>
            <div v-else class="cover-view" >
              <div @click="videoPlay">
                <!--<i class="delete-img iconfont iconshanchu-copy" @click="deleteVideo"></i>-->
                <img class="FMimg" :src="video + '?x-oss-process=video/snapshot,t_5000,f_jpg,w_750,m_fast'" mode="scaleToFill" />
                <div class="model-btn">
                  <div class="play-icon">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="head">
          <h1 class="title">{{title}}</h1>
          <div class="info">
            <span class="source js-source">{{author}}</span>
            <span class="time js-time">{{time}}</span>
          </div>
        </div>
        <div class="content">
          <!-- <wx-parse :content="newscontent" /> -->
          <div v-for="(item,index) in newscontent" :key="index">
            <!-- 文字 -->
            <textWan :data="item.data" v-if="item.name==='wText'"></textWan>
            <!-- 图片单个 -->
            <imgWan :data="item.data" v-if="item.name==='wImg'"></imgWan>
            <!-- 视频 -->
            <videoWan :data="item.data" v-if="item.name==='wVideo'"></videoWan>
          </div>
        </div>
      </div>
      <div class="bottom-icon">
        <div class="bottom-main">
          <p>
            <span class="iconfont iconchakan1"></span>
            <span class="news-view view-text">{{count}}</span>
          </p>
          <!--@click="clickPraise(isLike,2,id)"-->
          <p>
            <span class="iconfont icondianzan1" :class="isLike > 0? 'praise':''"></span>
            <span class="news-view view-text">{{praiseNum}}</span>
          </p>
        </div>
      </div>
    </div>

    <!--<div class="message-box">-->
      <!--<div class="msg-top">-->
        <!--<span class="better">精选留言</span>-->
        <!--<span class="to-right" @click="toMessage">写留言</span>-->
      <!--</div>-->
      <!--<div class="item-message" v-for="(item,index) in msgList" :key="index">-->
        <!--<image :src="item.avatarUrl" mode="aspectFill" class="header-img"></image>-->
        <!--<div class="detail-msg">-->
          <!--<p class="name">{{item.nickName}}</p>-->
          <!--<p>{{item.content}}</p>-->
        <!--</div>-->
        <!--<p class="right-msg-zan" @click="clickPraiseMsg(item.isLike,item.id)">-->
          <!--<span class="iconfont icon-dianzan" :class="item.isLike > 0? 'praise':''"></span>-->
          <!--<span class="news-view view-text">{{item.praiseNum}}</span>-->
        <!--</p>-->
      <!--</div>-->
      <!--&lt;!&ndash; 底线 &ndash;&gt;-->
      <!--<p class="bottom-line">-->
        <!--<span class="left-line"></span>-->
        <!--<span class="radius"></span>-->
        <!--<span class="right-line"></span>-->
      <!--</p>-->
    <!--</div>-->
  </div>
</template>
<script>
import apiNews from '@/api/news'
import personApi from '@/api/person'
import textWan from '@/components/textWan'
import imgWan from '@/components/imgWan'
import videoWan from '@/components/videoWan'

export default {
  data () {
    return {
      id: null,
      videoImg: '',
      videoFlag: false,
      motto: 'Hello World',
      userInfo: {},
      category: {},
      author: {},
      newsList: [],
      content: '',
      title: '',
      salesmanId: '',
      time: '',
      newscontent: '',
      apiNews: apiNews,
      imgUrl: '',
      praiseNum: 0,
      count: 0,
      isLike: '',
      msgList: [],
      video: '',
      img: []
    }
  },
  components: {
    textWan,
    imgWan,
    videoWan
  },
  methods: {
    // 预览图片
    previewImg (e, A) {
      var imgs = e
      var temp = []
      imgs.map(res => {
        temp.push(res)
      })
      wx.previewImage({
        current: temp[A],
        urls: temp
      })
    },
    // 播放开始
    playA () {
      this.videoFlag = true
      // const videoContext = wx.createVideoContext('myVideo')
      // videoContext.play()
    },
    // 播放结束
    end () {
      this.videoFlag = false
      // const videoContext = wx.createVideoContext('myVideo')
      // videoContext.seek(0)
      // videoContext.stop()
    },
    // 播放视频
    videoPlay () {
      this.videoFlag = true
      // const videoContext = wx.createVideoContext('myVideo')
      // videoContext.play()
    },
    // 插入雷达
    async insertOpera (info, recordType, newsId) {
      let businessId = wx.getStorageSync('businessId')
      let salesmanId = wx.getStorageSync('salesManId')
      let userId = wx.getStorageSync('userId')
      await personApi.OperationInsert({ businessId, newsId, info, recordType, salesmanId, userId })
    },
    async getNewsDetail (id) {
      const result = await apiNews.getNewsDetail(id)
      const data = result.data
      // this.title = data.text
      if (data.salesmanId) {
        this.salesmanId = data.salesmanId
        this.imgUrl = data.imgUrl
        this.author = data.name
        this.content = data.content
        console.log('content', data)
        this.time = this.moment(data.publishTime).format('YYYY-MM-DD HH:mm')
        // if (this.img !== '' && this.img !== null) {
        //   this.img = data.img.split(',')
        // }
        if (data.videoUrl !== '') {
          // 'https://oss.tzyizan.com/salesVideo/201908161121381565925698136.mp4'
          this.video = data.videoUrl
          // this.videoImg = this.video + '?x-oss-process=video/snapshot,t_t_5000,f_jpg,w_750,m_fast'
        }
        //   this.newscontent = data.content
        this.praiseNum = data.praiseNum
        this.count = data.browseCount
        this.isLike = data.isLike
      } else {
        this.title = data.title
        this.author = data.author
        this.content = data.content
        this.time = this.moment(data.publishTime).format('YYYY-MM-DD HH:mm')
        this.newscontent = JSON.parse(JSON.parse(data.content).info)
        console.log(JSON.parse(JSON.parse(data.content).info))
        this.imgUrl = data.imgUrl
        this.praiseNum = data.praiseNum
        this.count = data.count
        this.isLike = data.isLike
        this.insertOpera('查看了新闻', 11, id)
      }
      this.insertOpera('查看了新闻', 11, id)
    },
    // 获取留言
    async getMsg () {
      let { data: { list } } = await apiNews.searchAllMSg({ commentNewsId: this.id, commentType: 0 })
      this.msgList = list
    },
    // 写留言
    toMessage () {
      wx.navigateTo({
        url: '../leaveMessage/main?id=' + this.id + '&title=' + this.title
      })
    },
    // 点赞
    async clickPraise (isLike, commentType, id) {
      if (isLike > 0) {
        await apiNews.deleteNews({ commentType, commentnewsid: id })
        this.isLike = 0
        this.praiseNum = this.praiseNum - 1
      } else {
        await apiNews.addNews({ commentType, commentnewsid: id })
        this.insertOpera('点赞了新闻', 12, id)
        this.isLike = 1
        this.praiseNum = this.praiseNum + 1
      }
    },
    // 留言点赞
    clickPraiseMsg (isLike, id) {
      this.msgList.map(async item => {
        if (item.id === id) {
          if (isLike > 0) {
            await apiNews.msgPraiseCancel({ newsCommentId: id })
            item.isLike = 0
            item.praiseNum = item.praiseNum - 1
          } else {
            await apiNews.msgPraise({ newsCommentId: id })
            item.isLike = 1
            item.praiseNum = item.praiseNum + 1
          }
        }
      })
    }
  },
  onShareAppMessage () {
    this.insertOpera('分享了新闻', 13, this.id)
    return {
      title: this.title,
      path: 'pages/loading/main?fromWay=1&param=news&newsId=' + this.id,
      imageUrl: this.imgUrl
    }
  },
  onLoad (options) {
    this.videoFlag = false
    this.id = +options.id
    this.getNewsDetail(this.id)
  },
  async onPullDownRefresh () {
    // to doing..
    // 停止下拉刷新
    this.getNewsDetail(this.id)
    this.getMsg()
    wx.stopPullDownRefresh()
  },
  onShow () {
    this.getMsg()
  },
  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style lang="scss" scoped>
%common {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
}
%zan {
  color: #9d9d9d;
  .iconfont {
    font-size: 0.3rem;
  }
  .view-text {
    padding-left: 0.1rem;
    font-size: 0.28rem;
  }
}
.main{
  width: 100%;
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  margin: 0 auto;
}
.news-wrap {
  width: 100%;
  background-color: #fff;
  /*padding-bottom: 20rpx;*/
  display: inline-block;
  .head {
    padding: 40rpx 30rpx 0;
    .title {
      font-size: 0.44rem;
      font-weight: 700;
      padding: 0 0 0.3rem;
      color: #4a4a4a;
      text-overflow: ellipsis;
      overflow: hidden;
      left: 90rpx;
      line-height: 1.4;
      word-break: break-all;
    }
    .info {
      font-size: 0.3rem;
      font-weight: 400;
      margin: 0 0 0.12rem;
      color: #9b9b9b;
      .source {
        color: #595e7b;
      }
      .time {
        padding-left: 0.2rem;
      }
    }
  }
  .content {
    padding: 40rpx 30rpx 0;
    font-size: 0.32rem;
    /*word-break: break-all;*/
    color: #4a4a4a;
    /*overflow: hidden;*/
    padding-top: 0.4rem;
    .p + .p {
      margin-top: 0.2rem;
    }
    .imgMain{
      //新闻封面
      width: 100%;
      overflow: hidden;
      img{
        width: 100%;
        /*margin-top: 20rpx;*/
        /*display: inline-block;*/
      }
    }
  }
  //   点赞
  .bottom-icon{
    width: 100%;
    display: inline-block;
    .bottom-main {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      color: #9d9d9d;
      padding: 40rpx 30rpx;
      p{
        display: inline-block;
        .iconfont {
          font-size: 0.3rem;
        }
        .view-text {
          padding-left: 0.1rem;
          font-size: 0.28rem;
        }
      }
    }
  }
}
.praise {
  color: #ff8848 !important;
}
// 留言
.message-box {
  background-color: #f2f2f2;
  padding: 40rpx 30rpx 0;
  .msg-top {
    @extend %common;
    font-size: 0.28rem;
    color: #9d9d9d;
    margin-bottom: 0.4rem;
    .to-right {
      color: #595e7b;
    }
  }
  .item-message {
    display: flex;
    @extend %common;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 0.5rem;
    .header-img {
      width: 0.7rem;
      height: 0.7rem;
      border-radius: 0.08rem;
      margin-right: 0.2rem;
    }
  }
  .detail-msg {
    color: #4a4a4a;
    flex: 1;
    font-size: 0.28rem;
    line-height: 1.4;
    .name {
      color: #9d9d9d;
      line-height: 1;
      margin-bottom: 0.06rem;
    }
  }
  .right-msg-zan {
    width: 1.2rem;
    text-align: right;
    @extend %zan;
  }
}
// 底线
.bottom-line {
  @extend %common;
  justify-content: center;
  padding: 0.2rem 0 0.6rem;
  span {
    display: inline-block;
  }
  .radius {
    width: 0.08rem;
    height: 0.08rem;
    border-radius: 0.08rem;
    background-color: #ddd;
  }
  .left-line,
  .right-line {
    width: 1.6rem;
    height: 0.01rem;
    background-color: #ddd;
    margin: 0 0.08rem 0;
  }
}

.contentA {
  padding: 40rpx 30rpx 0;
  font-size: 0.32rem;
  word-break: break-all;
  color: #4a4a4a;
  padding-top: 0.4rem;
  .imgA{
    width: 100%;
    margin-top: 20rpx;
    .imgMainA {
      float: left;
      //新闻封面
      margin-right:15rpx;
      width: 220rpx;
      height: 220rpx;
      .imgB {
        width: 220rpx;
        height: 220rpx;
        display: inline-block;
        /*margin-top: 20rpx;*/
        /*display: inline-block;*/
      }
    }
    .imgMainA:nth-child(3){
      margin-right: 0;
    }
    .imgMainA:nth-child(6){
      margin-right: 0;
    }
    .imgMainA:nth-child(9){
      margin-right: 0;
    }
  }
  .up-video {
    width: 100%;
    /*height: 400rpx;*/
    border-radius: 10rpx;
    margin-top: 20rpx;
    .cover-hw {
      width: 100%;
      /*height: 400rpx;*/
      position: relative;
    }
    /*视频样式接口*/
    .cover-view {
      display: inline-block;
      width: 100%;
      height: 100%;
      position: relative;
      .delete-img {
        position: absolute;
        width: 60rpx;
        right: 6rpx;
        height: 60rpx;
        top: 6rpx;
      }
      .FMimg{
        width: 100%;
        height: 400rpx;
        display: inline-block;
      }
      .model-btn {
        position: absolute;
        left: 0;
        top: 0rpx;
        bottom: 0;
        right: 0;
        margin: 140rpx auto 0;
        width: 140rpx;
        height: 130rpx;
        border: 4rpx solid #fff;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.3);
      }

      .play-icon {
        margin: 38rpx 50rpx;
        border-top: 33rpx solid transparent;
        border-left: 54rpx solid #fff;
        border-bottom: 33rpx solid transparent;
      }

      /*image {*/
      /*width: 100%;*/
      /*height: 100%;*/
      /*border-radius: 10rpx;*/
      /*}*/
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
