<template>
    <div class="Sn">
      <div class="Netmain">
        <div class="Netmain-top">
          <!--<div class="testNav">-->
            <!--<div-->
              <!--:class="{'selected':tab === 1,'testTitle':true}"-->
              <!--@click="changTab(1)"-->
            <!--&gt;推荐</div>-->
            <!--<div-->
              <!--:class="{'selected':tab === 2,'testTitle':true}"-->
              <!--@click="changTab(2)"-->
            <!--&gt;关注</div>-->
            <!--<div-->
              <!--:class="{'selected':tab === 3,'testTitle':true}"-->
              <!--@click="changTab(3)"-->
            <!--&gt;热帖</div>-->
            <!--<div-->
              <!--:class="{'selected':tab === 4,'testTitle':true}"-->
              <!--@click="changTab(4)"-->
            <!--&gt;身边</div>-->
            <!--<div-->
              <!--:class="{'selected':tab === 5,'testTitle':true}"-->
              <!--@click="changTab(5)"-->
            <!--&gt;名片榜</div>-->
          <!--</div>-->
        </div>
        <div class="new-list shadow" v-if="newsList.length > 0">
          <div class="news-item-wrap" v-for="(item,index) in newsList" :key="index">
            <div v-if="!item.image" class="">
            <div class="news-header flexRow">
              <div class="avatar-wrp" @click="goToCard(item.salesmanId)">
                <img  v-if="item.salesmanId" class="img" :src="item.salesmanImgUrl" mode="aspectFit"/>
                <img  v-else class="img" :src="item.logo" mode="aspectFit"/>
              </div>
              <div class="author-info">
                <div v-if="item.salesmanId"  class="author-name" @click="goToCard(item.salesmanId)">
                  {{item.name?item.name:'未填'}}
                </div>
                <div v-else class="author-name" @click="goToCard(item.salesmanId)">
                  {{item.author?item.author:'未填'}}
                </div>
                <div class="author-date" @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
                  {{item.publishTime}}
                </div>
              </div>
              <div class="right-side">
                <button @click.stop open-type="share" :data-item="item" class="forward">转发</button>
                <i v-if="item.salesmanId" class="iconfont iconliaotian1" @click="routerTo(`/pages/msgcenter/main?id=${item.id}`)"></i>
              </div>
            </div>
            <div class="news-item">
              <div class="item-title" v-if="item.content!==''">
                <div :class="item.showTotal ? 'total-introduce' : 'detailed-introduce'">
                  <div v-if="item.salesmanId" class="intro-content" :title="item.content" ref="desc"  @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
                    <!--<span class="merchant-desc" v-if="introduce">-->
                    <!--{{introduce}}-->
                    <!--</span>      -->
                            <span class="merchant-desc" :id="'mydesc' + index" @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">{{item.content}}</span>
                  </div>
                  <div v-else class="intro-content" :title="item.title" ref="desc"  @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
                    <!--<span class="merchant-desc" v-if="introduce">-->
                    <!--{{introduce}}-->
                    <!--</span>      -->
                    <span class="merchant-desc" :id="'mydesc' + index" @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">{{item.title}}</span>
                  </div>
                  <div class="unfold" @click="showTotalIntro(index,item)" v-if="item.showExchangeButton">
                    <p>{{item.exchangeButton ? '展开' : '收起'}}</p>
                  </div>
                </div>
              </div>
              <div class="news-cover" v-if="item.imgUrl">
                <div class="news" v-if="item.salesmanId">
                  <i v-for="(items,indexs) in item.imgUrl"  :key="indexs">
                    <image v-if="item.imgUrl.length >1" :src="items" class="img" @click="previewImg(item.imgUrl,indexs)"  mode="aspectFit"></image>
                    <image v-else :src="item.imgUrl" class="imgA" @click="previewImg(item.imgUrl,indexs)"  mode="aspectFit"></image>
                  </i>
                </div>
                <div class="JiuImg" v-else @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
                  <image :src="item.imgUrl[0]" class="img" mode="widthFix"></image>
                  <p class="news-desc" v-if="item.abstractText">{{item.abstractText}}</p>
                </div>
              </div>
              <div class="news-cover" v-if="item.videoUrl" @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
                <image :src="item.videoUrl + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_750,m_fast'" class="imgB" mode="scaleToFill">
                  <i class="iconbofang1 iconfont"></i>
                </image>

              </div>
              <div class="news-view flexRow">
                <div class="flexRow watch">
                  <p>
                    <i v-if="item.isChan == false" class="iconfont iconliulan1"></i>
                    <i v-else class="iconfont iconyanjing1"></i>
                    <span>{{item.browseCount}}</span>
                  </p>
                  <p>
                    <i v-if="item.isPraise!==1" class="iconfont iconkongaixinfuzhi"></i>
                    <i v-else class="iconfont iconxin"></i>
                    <span>{{item.praiseCount}}</span>
                  </p>
                </div>
                <!--<p class="flexRow watch" v-if="item.count">-->
                <!--<i class="iconfont iconaixin"></i>-->
                <!--<span>{{item.count}}</span>-->
                <!--</p>-->
                <div class="btn-group-ab flexRow" :class="{'trans':item.showBtn}">
                  <p class="flexRow common-p" @click.stop="clickPraise(item.isPraise,statusA,item.id,item.salesmanId)">
                    <i class="iconfont iconaixin"></i>
                    <span>{{item.isPraise===1?'取消':'赞'}}</span>
                  </p>
                  <i class="line"></i>
                  <p class="flexRow common-p" @click.stop="showComment(item)">
                    <i class="iconfont iconpinglun1"></i>
                    <span>评论</span>
                  </p>
                </div>
                <!--<div class="wrap-btn" @click.stop="showbtnGroup(index,item)">-->
                <!--<p class="btn-click flexRow">-->
                <!--<span></span>-->
                <!--<span></span>-->
                <!--</p>-->
                <!--</div>-->
              </div>
            </div>
            <!--点赞评论 -->
            <div v-if="item.newsCommentList.length > 0 || item.nameMapList.length > 0" class="comment-map">
              <div class="praise-wrap">
                <span v-if="item.nameMapList.length>0"><i class="iconfont iconaixin"></i>{{item.praiseName}}</span>
                <div>
                  <p v-for="(child,i) in item.newsCommentList" :key="i" class="comment-wrap-s">
                    <span class="name">{{child.name?child.name:'未知'}}:</span>
                    <span class="detail">{{child.content}}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
            <!--广告-->
            <div v-else-if="item.image">
              <div v-if="item.switch === false" class="banner" @click="goToClassBanner(item)">
                <img class="imgMain" :src="item.image" mode="scaleToFill	" />
              </div>
              <div class="excitation" v-else>
                <ad :unit-id="item.appId"></ad>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="new-listBottom">
          <span>暂无数据</span>
        </div>
        <div class="input-bottom" v-if="showTextarea">
        <textarea :auto-focus="true" @confirm="addLeaveMsg" v-model="msgContent" :class="areaType" placeholder="评论"
                  :auto-height="true" :fixed="true" maxlength="120" cursor-spacing="10" :show-confirm-bar="true" @blur="deleteMsg"></textarea>
        </div>
      </div>
    </div>
</template>

<script>
  import apiproducts from '@/api/product'
  import apiNews from '@/api/news'
  import personApi from '@/api/person'
  export default {
    name: 'index',
    data () {
      return {
        introduce: '',
        // 是否展示所有文本内容
        showTotal: true,
        // 显示展开还是收起
        exchangeButton: true,
        // 是否显示展开收起按钮
        showExchangeButton: false,
        descHeight: '',
        rem: '',
        newsList: [],
        typeList: [],
        tab: 1,
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        showTextarea: false,
        circular: true,
        Grade: 'V1',
        tabs: 1,
        lastPage: '',
        apiproducts: apiproducts,
        nextPage: '',
        cards: [],
        num: 0,
        businessId: '',
        count: 0,
        pageNum: 0,
        pageSize: 5,
        Check: 0,
        windowHeight: '',
        windowHeightA: '',
        deleteShow: false,
        tradeStatus: 1,
        typeId: 0,
        latitude: '',
        longitude: '',
        keywords: '',
        postForm: false,
        pushName: '',
        commentId: ''
      }
    },
    onLoad (options) {
      console.log('options', options)
      if (options.id && options.diffA === '1') {
        this.typeId = options.id
        this.getNews({})
      } else if (options.name && options.diffA === '0') {
        this.keywords = options.name
        this.getNewsName({})
      }
      this.pageNum = 1
      this.getInfo()
      // this.getType()
    },
    onUnload () {
      this.keywords = ''
      this.typeId = ''
    },
    onShow () {
      this.tradeStatus = wx.getStorageSync('tradeStatus')
    },
    async onReachBottom () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.getNews({type: 1})
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
    },
    async onPullDownRefresh () {
      this.pageNum = 1
      this.getNews({ type: 0 })
      // 停止下拉刷新
      wx.stopPullDownRefresh()
    },
    watch: {
      newsList: function () {
        this.$nextTick(function () {
          this.newsList.map((item, index) => {
            // console.log('nextTick')
            // 判断介绍是否超过四行
            // let rem = parseFloat(this.getRem())
            // console.log('watch 中的rem', rem)
            if (!this.$refs.desc) {
              // console.log('desc null')
              return
            }
            var query = wx.createSelectorQuery()
            // var that = this
            // console.log('\'#mydesc\' + index', '#mydesc' + index)
            query.select('#mydesc' + index).boundingClientRect(function (rect) {
              // that.setData({
              //   height: rect.width + 'px'
              // })
              // console.log('rect', rect)
              this.descHeight = rect.height
              // const remA = rem + 'rpx'
              // console.log('descHeight:' + this.descHeight)
              // console.log('如果 descHeight 超过' + (rem) + '就要显示展开按钮')
              if (this.descHeight > 86) {
                // console.log('超过了四行')
                // 显示展开收起按钮
                item.showExchangeButton = true
                item.exchangeButton = true
                // 不是显示所有
                item.showTotal = false
                // console.log('showExchangeButton', item.showExchangeButton)
                // console.log('showTotal', item.showTotal)
              } else {
                // 不显示展开收起按钮
                item.showExchangeButton = false
                // 没有超过四行就显示所有
                item.showTotal = true
                // console.log('showExchangeButton', item.showExchangeButton)
                // console.log('showTotal', item.showTotal)
              }
            }).exec()
          })
        }.bind(this))
      }
    },
    methods: {
      // 跳转小程序 或 查看大图
      goToClassBanner (res) {
        // console.log('banner', res)
        if (res.type === 0) {
          wx.previewImage({
            current: res.image,
            urls: [res.image]
          })
        } else if (res.type === 2) {
          wx.navigateToMiniProgram({
            appId: res.appId,
            path: 'pages/loading/main',
            extraData: {
              fromWay: 0
            },
            envVersion: 'release',
            success (res) {
              // 打开其他小程序成功同步触发
              wx.showToast({
                title: '跳转成功'
              })
            }
          })
        }
      },
      showTotalIntro (index) {
        this.newsList[index].showTotal = !this.newsList[index].showTotal
        this.newsList[index].exchangeButton = !this.newsList[index].exchangeButton
        console.log(this.newsList[index].exchangeButton)
      },
      getRem () {
        // console.log('getRem')
        // const defaultRem = 16
        let winWidth = wx.getSystemInfoSync().windowHeight
        // console.log('winWidth:' + winWidth)
        let rem = winWidth / 5
        return rem
      },
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
      // 页面加载信息
      getInfo () {
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': userId
          }
        }).then(res => {
          if (res.data !== null) {
            this.postForm = true
            this.pushName = res.data.name
          } else {
            this.postForm = false
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      deleteMsg () {
        this.msgContent = ''
        this.showTextarea = false
      },
      goToCard (id) {
        wx.navigateTo({
          url: `../OthersCard/main?id=` + id
        })
      },
      routerTo (url) {
        if (this.postForm === true) {
          wx.navigateTo({ url })
        } else {
          wx.showToast({
            title: '请先注册名片',
            duration: 2000,
            icon: 'none'
          })
        }
      },
      routerToA (url) {
        this.newsList.map(async item => {
          item.browseCount = item.browseCount + 1
          item.isChan = true
        })
        wx.navigateTo({ url })
      },
      // 插入雷达
      async insertOpera (info, recordType, newsId) {
        let businessId = wx.getStorageSync('businessId')
        let salesmanId = wx.getStorageSync('salesManId')
        let userId = wx.getStorageSync('userId')
        await personApi.OperationInsert({ businessId, newsId, info, recordType, salesmanId, userId })
      },
      clickPraise (isPraise, status, id, salesmanId) {
        if (this.postForm === true) {
          this.name = this.pushName
        } else {
          const nickName = wx.getStorageSync('nickName')
          if (nickName !== '') {
            this.name = wx.getStorageSync('nickName')
          } else {
            this.name = '游客'
          }
        }
        this.closeBtnShow()
        console.log('this.name', this.name)
        this.newsList.map(async item => {
          if (item.id === id) {
            if (isPraise > 0) {
              await apiNews.deleteNews({ status, id: id, salesmanId })
              item.isPraise = 0
              item.praiseCount = item.praiseCount - 1
              item.nameMapList.map((m, n) => {
                if (m.name === this.name) {
                  item.nameMapList.splice(n, 1)
                }
              })
            } else {
              await apiNews.addNews({ status, id: id, salesmanId })
              this.insertOpera('点赞了新闻', 12, id)
              item.praiseCount = item.praiseCount + 1
              item.isPraise = 1
              item.nameMapList.push({ name: this.name })
            }
          }
          // 拼凑
          item.praiseName = ''
          item.nameMapList.map(child => {
            if (item.praiseName.length > 0 && item.praiseName) {
              item.praiseName = item.praiseName + ',' + child.name
            } else {
              item.praiseName = child.name
            }
          })
        })
      },
      // 评论
      showComment (item) {
        this.msgContent = ''
        this.$set(item, 'showBtn', false)
        this.showTextarea = true
        this.commentId = item.id
      },
      async addLeaveMsg () {
        if (this.msgContent === '') {
          this.showTextarea = false
          wx.showToast({
            title: '评论不能为空',
            icon: 'none',
            duration: 2000
          })
          return
        }
        wx.showToast({
          icon: 'loading',
          mask: true
        })
        console.log('item.id', this.commentId)
        this.newsList.map(item => {
          if (item.id === this.commentId) {
            item.newsCommentList.push({ name: this.name, content: this.msgContent })
          }
        })
        let userId = wx.getStorageSync('userId')
        await apiNews.addNewsA({
          commentType: 0,
          commentUserId: userId,
          commentNewsId: this.commentId,
          content: this.msgContent
        })
        wx.hideToast()
        this.showTextarea = false
      },
      closeBtnShow () {
        this.newsList.map(item => {
          item.showBtn = false
        })
        this.showTextarea = false
      },
      showbtnGroup (i, child) {
        let temp = this.newsList[i].showBtn
        this.newsList.map(item => {
          this.$set(item, 'showBtn', false)
        })
        if (temp) {
          temp = false
        } else {
          temp = true
        }
        this.$set(child, 'showBtn', temp)
      },
      async getType () {
        const { code, data, message } = await apiNews.getType(this.businessId)
        if (code === 200) {
          // this.typeList = data
          // this.typeId = data[0].id
          console.log('this.typeId', data)
          this.getNews({})
        } else {
          wx.showToast({
            title: message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      async getNews ({ type = 0, name = '' }) {
        if (this.postForm === true) {
          this.name = this.pushName
        } else {
          const nickName = wx.getStorageSync('nickName')
          if (nickName !== '') {
            this.name = wx.getStorageSync('nickName')
          } else {
            this.name = '游客'
          }
        }
        const result = await apiNews.getNewsType({ businessId: this.businessId, pageNum: this.pageNum, pageSize: this.pageSize, type: this.typeId })
        const code = result.code
        const data = result.data
        // console.log('dataA', data)
        if (code === 200) {
          data.list.map(item => {
            if (!item.image) {
              item.showTotal = true
              item.showExchangeButton = false
              item.exchangeButton = true
              item.publishTime = this.moment(item.publishTime).format('MM月DD日')
              item.isChan = false
              item.praiseName = ''
              // item.imgUrl += '?x-oss-process=style/w750'
              item.nameMapList.map(child => {
                if (item.praiseName.length > 0 && item.praiseName) {
                  item.praiseName = item.praiseName + ',' + child.name
                } else {
                  item.praiseName = child.name
                }
              })
            }
          })
          if (type === 0) {
            this.newsList = data.list
          } else {
            data.list.forEach(e => {
              this.newsList.push(e)
            })
          }
          // console.log('newsListA', data)
          this.lastPage = data.lastPage
          this.pageNum = data.pageNum
          this.nextPage = data.nextPage
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      async getNewsName ({ type = 0, name = '' }) {
        if (this.postForm === true) {
          this.name = this.pushName
        } else {
          const nickName = wx.getStorageSync('nickName')
          if (nickName !== '') {
            this.name = wx.getStorageSync('nickName')
          } else {
            this.name = '游客'
          }
        }
        const result = await apiNews.getNewsTypeName({ businessId: this.businessId, pageNum: this.pageNum, pageSize: this.pageSize, type: this.keywords })
        const code = result.code
        const data = result.data
        console.log('dataB', data)
        if (code === 200) {
          data.list.map(item => {
            item.publishTime = this.moment(item.publishTime).format('MM月DD日')
            item.praiseName = ''
            // item.imgUrl += '?x-oss-process=style/w750'
            item.nameMapList.map(child => {
              if (item.praiseName.length > 0 && item.praiseName) {
                item.praiseName = item.praiseName + ',' + child.name
              } else {
                item.praiseName = child.name
              }
            })
          })
          if (type === 0) {
            this.newsList = data.list
          } else {
            data.list.forEach(e => {
              this.newsList.push(e)
            })
          }
          // console.log('newsList', data)
          this.lastPage = data.lastPage
          this.pageNum = data.pageNum
          this.nextPage = data.nextPage
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    }
  }
</script>

<style  lang="less" scoped>
.Sn{
width: 100%;
  height: 100%;
  // 新闻内容
  .Netmain{
    width: 100%;
    height: 100%;
    .Netmain-top{
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
      background: #ffffff;
      .testNav {
        width: ~'660rpx';
        margin:  0;
        //padding: 0 ~'10rpx' 0 ~'10rpx';
        //height: ~'88rpx';
        //line-height: ~'88rpx';
        display: flex;
        //float: left;
        justify-content: space-between;
        align-items: center;
        color: #9B9B9B;
        font-size: ~'28rpx';
        div{
          padding: 0;
          //margin: 0 ~'30rpx';
          color: #9B9B9B;
        }
        .testTitle {
          //flex: 1;
          width: ~'96rpx';
          display: inline-block;
          height: ~'45rpx';
          text-align: center;
          line-height: ~'45rpx';
        }
        .selected {
          font-size: ~'28rpx';
          color: #ffffff;
          width: ~'96rpx';
          line-height: ~'45rpx';
          display: inline-block;
          height: ~'45rpx';
          border-radius: ~'30rpx';
          background: #FFAB37;
          //border-bottom: 1px solid #ffffff;
        }
      }
    }

    //新闻列表样式
    .new-list {
      background-color: #fff;
      //border-top-left-radius: 8rpx;
      //border-top-right-radius: 8rpx;
      //position: relative;
      //left: 0;
      //top: 0;
      /*margin-top: ~'10rpx';*/
      margin-bottom: ~'2rpx';
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      width: ~'750rpx';
      flex: 1;
      //overflow-x: hidden;

      .news-item-wrap {
        width: 100%;
        border-bottom: ~'2rpx' solid #eee;
        padding: ~'28rpx' ~'20rpx' ~'57rpx';
        box-sizing: border-box;
        .banner{
          width: ~'658rpx';
          height: ~'258rpx';
          margin: ~'0rpx' auto ~'-29rpx';
          display: block;
          padding: 0!important;
          .imgMain{
            width: ~'658rpx';
            height: ~'258rpx';
            display: inline-block;
            border-radius: ~'10rpx';
          }
        }
        // 流量主
        .excitation{
          width: ~'658rpx';
          margin: ~'0rpx' auto ~'-29rpx';
        }
        //新闻item 头部
        .news-header {
          height: ~'88rpx';
          width: ~'658rpx';
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconliaotian1{
            margin-top: ~'15rpx';
            font-size: ~'35rpx';
            text-align: right;
            color: #566A95;
          }
          .avatar-wrp {
            width: ~'88rpx';
            height: ~'88rpx';
            overflow: hidden;
            border-radius: 50%;
            margin: 0 auto;
            box-sizing: border-box;

            .img {
              width: 100%;
              height: 100%;
            }
          }

          .author-info {
            padding-top: ~'8rpx';
            padding-left: ~'30rpx';
            flex: 1;
            height: ~'88rpx';
            box-sizing: border-box;

            .author-name {
              font-size: ~'28rpx';
              font-weight: bold;
              margin-top: ~'-5rpx';
            }

            .author-date {
              font-size: ~'24rpx';
              margin-top: ~'15rpx';
              color: rgba(157, 157, 157, 1);
            }
          }

          .right-side {
            padding-top: ~'8rpx';
            width: ~'80rpx';

            .forward {
              text-align: right;
              font-size: ~'24rpx';
              color: #566A95;
              height: ~'44rpx';
              line-height: ~'44rpx';
            }
          }
        }

        //新闻内容
        .news-item {
          width: ~'658rpx';
          margin: 0 auto;
          //新闻标题
          .item-title {
            width: 100%;
            margin: 0 auto;
            /*padding: ~'26rpx' 0 ~'21rpx' 0;*/
            color: #4A4A4A;
            font-size: ~'32rpx';

            .title {
              width: ~'658rpx';
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              display: inline-block;
            }
          }

          //新闻封面
          .news-cover {
            //height: ~'376rpx';
            width: 100%;
            overflow: hidden;
            position: relative;
            .news{
              i{
                float: left;
                margin-right: ~'13rpx';
                margin-top: ~'10rpx';
                margin-bottom: ~'10rpx';
                width: ~'210rpx';
                //border: ~'1rpx' solid #cccccc;
                .img{
                  display: inline-block;
                  width: ~'210rpx';
                  height: ~'210rpx';
                }
                .imgA{
                  width: 100%;
                }
              }
              i:nth-child(3){
                margin-right: 0;
              }
               i:nth-child(6){
                margin-right: 0;
              }
               i:nth-child(9){
                margin-right: 0;
              }
            }
            .imgB{
              width: 100%;
              position: relative;
              .iconbofang1{
                color: #b8b8b8;
                position: absolute;
                top: 40%;
                left: 45%;
                font-size: ~'80rpx';
              }
            }
            .JiuImg{
              .img {
                height: 100%;
                display: inline-block;
                width: 100%;

              }

              .news-desc {
                width: 100%;
                max-height: ~'100rpx';
                position: absolute;
                left: 0;
                bottom: ~'9rpx';
                background: rgba(0, 0, 0, 0.47);
                padding: ~'10rpx' ~'26rpx';
                font-size: ~'26rpx';
                font-weight: 400;
                box-sizing: border-box;
                color: #ffffff;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2; // 控制多行的行数
                -webkit-box-orient: vertical;
              }
            }
          }

          //新闻浏览评论
          .news-view {
            padding: ~'32rpx' 0 ~'23rpx' 0;
            overflow: hidden;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .watch {
              font-size: ~'24rpx';
              color: #566A95;
              display: flex;
              align-items: center;
              justify-content: center;
              p{
                margin-right: ~'20rpx';
                span{
                  vertical-align: top;
                }
              }
            }

            .isLike {
              color: #2A94EC;
            }

            .iconfont {
              line-height: 1;
              margin-right: ~'4rpx';
            }

            .iconkongaixinfuzhi {
              display: inline-block;
              font-size: ~'22rpx';
            }
            .iconliulan1{
              display: inline-block;
              font-size: ~'22rpx';
            }
            .iconaixin{
              display: inline-block;
            }
            .iconyanjing1{
              display: inline-block;
              font-size: ~'22rpx';
            }
            .iconxin{
              display: inline-block;
              font-size: ~'22rpx';
            }
            .iconpinglun1{
              display: inline-block;
            }
            .icon-chakan {
            }

            // 点击展开点在评论
            .wrap-btn {
              position: absolute;
              right: ~'-20rpx';
              background-color: #fff;
              width: ~'94rpx';
              height: ~'64rpx';

              .btn-click {
                margin: ~'15rpx' 0 0 ~'10rpx';
                width: ~'64rpx';
                height: ~'34rpx';
                background-color: #F3F3F5;
                border-radius: ~'8' rpx;
                justify-content: center;
                display: flex;
                align-items: center;

                span {
                  width: ~'9rpx';
                  height: ~'9rpx';
                  border-radius: ~'10rpx';
                  background-color: #566A95;
                  display: inline-block;
                }

                span + span {
                  margin-left: ~'6rpx';
                }
              }
            }
            // 悬浮点赞评论
            .btn-group-ab {
              position: absolute;
              //background-color: #4C5254;
              color: #4C5254;
              font-size: ~'24rpx';
              //border-radius: ~'8rpx';
              // right: 74rpx;
              //transform: translateX(208 rpx);
              right: 0;
              //transition: all 0.2s ease;
              display: flex;
              align-items: center;
              span{
                vertical-align: top;
              }
              .line{
                display: inline-block;
                border-right:  ~'2rpx' solid #34373A;
                height: ~'40rpx';
                line-height: ~'40rpx';
              }
              .common-p {
                width: ~'90rpx';
                text-align: right;
                //justify-content: center;
                display: inline-block;
              }

              .common-p:first-child {
                //height: ~'40rpx';
                margin-right: ~'20rpx';
                display: inline-block;
              }
              .common-p:last-child {
                //height: ~'40rpx';
                margin-left: ~'20rpx';
                display: inline-block;
              }
            }

            .trans {
              transform: translateX(-74 rpx);
            }
          }

          .news-view:last-child {
            border: none;
          }

          //.right-item {
          //  flex: 1;
          //  margin-left: 12rpx;
          //  font-size: 28rpx;
          //  color: #4A4A4A;
          //}

        }
        // 点赞评论
        .comment-map {
          width: ~'658rpx';
          margin: 0 auto;
          background-color: #F3F3F5;
          position: relative;
          margin-top: ~'30rpx';
          font-size: ~'24rpx';
          color: #4F658F;
          padding: ~'8rpx' ~'14rpx' ~'10rpx';
          box-sizing: border-box;

          &:before {
            content: ' ';
            position: absolute;
            left: ~'10rpx';
            top: ~'-24rpx';
            width: 0;
            height: 0;
            border-width: 6px;
            border-style: solid;
            border-color: transparent transparent #F3F3F5 transparent;
          }

          .iconaixin {
            font-size: ~'30rpx';
            margin-right: ~'8rpx';
            line-height: 1;
            display: inline-block;
            vertical-align: text-bottom;
          }


          .name {
            padding-top: ~'6rpx';
            margin-right: ~'6rpx';
          }

          .detail {
            color: #000;
            margin-top: ~'6rpx';
          }

        }

      }
    }
    .new-listBottom{
      width: 100%;
      height: 100%;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      span{
        color: #9b9b9b;
        font-size: ~'30rpx';
      }
    }
    // 评论输入框
    .input-bottom {
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: #FAFAFA;
      color: #000;
      border-top: ~'1rpx' solid #bfbfbf;
      padding: ~'8rpx' ~'20rpx';
      box-sizing: border-box;

      textarea {
        background-color: #fff;
        width: 100%;
        min-height: ~'70rpx';
        padding: 0 ~'20rpx';
        box-sizing: border-box;
        font-size: ~'26rpx';
      }
    }
  }
}


// 收起展开
.total-introduce {
  height: auto;
  overflow: hidden;
  font-size: ~'28rpx';
  color: #434343;
  margin: ~'20rpx';
  .intro-content {
    .merchant-desc {
      width: 100%;
      line-height: ~'42rpx';
    }
  }
}
.unfold {
  display: block;
  z-index: 11;
  //float: right;
  width: ~'80rpx';
  height: ~'42rpx';
  p {
    margin: 0;
    line-height: ~'42rpx';
    color: #566A95;
  }
}
.detailed-introduce {
  font-size: ~'28rpx';
  color: #434343;
  position: relative;
  overflow: hidden;
  margin: ~'20rpx';

  .intro-content {
    // 最大高度设为4倍的行间距
    max-height: ~'168rpx';
    line-height: 21px;
    word-wrap: break-word;
    /*强制打散字符*/
    word-break: break-all;
    background: #ffffff;
    /*同背景色*/
    //color: #ffffff;
    overflow: hidden;
    margin-bottom: ~'50rpx';
    .merchant-desc {
      width: 100%;
      line-height: ~'42rpx';
    }

    &:after,
      // 这是展开前实际显示的内容
    &:before {
      content: attr(title);
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      color: #434343
      // overflow: hidden;
    }

    // 把最后最后一行自身的上面三行遮住
    &:before {
      display: block;
      overflow: hidden;
      z-index: 1;
      max-height: 63px;
      background: #ffffff;
    }

    &:after {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 81px;
      /*截取行数*/
      -webkit-line-clamp: 4;
      text-overflow: ellipsis;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      /*行首缩进字符数，值为[(截取行数-1)*尾部留空字符数]*/
      //text-indent: -12em;
      /*尾部留空字符数*/
      //padding-right: 4em;
    }
  }

  .unfold {
    z-index: 11;
    width: 40px;
    height: 21px;
    outline: 0;
    position: absolute;
    left: 0;
    bottom: 0;

    p {
      margin: 0;
      line-height: 21px;
      color: #566A95;
    }
  }
}

</style>
