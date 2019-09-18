<template>
    <div class="Net">
      <div class="NetTop">
        <div class="title">
          <span>动态</span>
        </div>
        <div class="infoA">
          <div class="inputClass">
            <i class="iconsousuo iconfont"></i>
            <input placeholder="搜索关键字" v-model="TypeName" @confirm="searchTypeName(TypeName)">
          </div>
        </div>
        <div class="Ndata">
          <div class="Ndata-main">
            <span>帖子 {{newsCount}}</span>
            <span>人气 {{browseCount}}</span>
            <span>成员 {{memberCount}}</span>
          </div>
        </div>
        <div class="banner">
          <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" indicator-color= "#ffffff" :interval="interval" :duration="duration" :circular ="circular" class="bannerMain">
            <block v-for="item in imgUrls" :key="index">
              <swiper-item class="swiper">
                <img :src="item.image" class="slide-image"/>
              </swiper-item>
            </block>
          </swiper>
        </div>
        <div class="NewClass" v-if="dynamicStatus !== 0">
          <div class="NewClass-main">
            <div class="NewChoose" v-for="item in typeList" :key="index" @click="goToSN(item.id)">
             <p class="NewImg">
               <img :src="item.icon">
             </p>
              <p class="NewName">
                {{item.typeName}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--新闻动态-->
      <div class="Netmain" v-if=" dynamicStatus !== 0">
        <div class="Netmain-top">
          <div class="testNav">
            <div
              :class="{'selected':tab === 1,'testTitle':true}"
              @click="changTab(1)"
            >推荐</div>
            <div
              :class="{'selected':tab === 2,'testTitle':true}"
              @click="changTab(2)"
            >关注</div>
            <div
              :class="{'selected':tab === 3,'testTitle':true}"
              @click="changTab(3)"
            >热帖</div>
            <div
              :class="{'selected':tab === 4,'testTitle':true}"
              @click="changTab(4)"
            >身边</div>
            <div
              :class="{'selected':tab === 5,'testTitle':true}"
              @click="changTab(5)"
            >名片榜</div>
          </div>
        </div>
        <div class="new-list shadow" v-if="newsList.length > 0">
          <div class="news-item-wrap" v-for="(item,index) in newsList" :key="index">
            <div v-if="!item.image" class="">
              <div class="news-header flexRow">
                <div class="avatar-wrp" @click="goToCard(item.salesmanId)">
                  <img class="img" :src="item.salesmanImgUrl" />
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
                <div class="item-title" v-if="item.content!==''" >
                  <!--<span v-if="item.salesmanId" class="title">{{item.content}}</span>-->
                  <!--<span v-else class="title">{{item.title}}</span>-->

                  <div :class="item.showTotal ? 'total-introduce' : 'detailed-introduce'">
                    <div v-if="item.salesmanId" class="intro-content" :title="item.content" ref="desc" @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
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
                      <image v-if="item.imgUrl.length >1" :src="items" class="img" @click="previewImg(item.imgUrl,indexs)"  mode=""></image>
                      <image v-else :src="item.imgUrl" class="imgA" @click="previewImg(item.imgUrl,indexs)"  mode="widthFix"></image>
                    </i>
                  </div>
                  <div class="JiuImg" v-else @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
                    <image :src="item.imgUrl[0]" class="img" mode="widthFix"></image>
                    <p class="news-desc" v-if="item.abstractText">{{item.abstractText}}</p>
                  </div>
                </div>
                <div class="news-cover" v-if="item.videoUrl" @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
                  <image :src="item.videoUrl + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_750,m_fast'" class="imgB" mode="scaleToFill">
                    <i class="iconbofang iconfont"></i>
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
            <div class="banner" v-else>
              <img class="imgMain" :src="item.image" mode="widthFix" />
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
      <div v-else>
        <div class="Main-Img">
          <img src="https://oss.tzyizan.com/salesInfo/201908290855021567040102395.jpg"/>
        </div>
      </div>
      <div class="footer" @click="goNet" v-if=" dynamicStatus !== 0">
        <span>发布</span>
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
        TypeName: '',
        imgUrls: [{
          src: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
        }, {
          src: 'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640'
        }, {
          src: 'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
        }
        ],
        categoryA: [{
          id: 1,
          src: '../../../../../static/images/class1.png',
          typeName: '全部'
        }, {
          id: 2,
          src: '../../../../../static/images/class2.png',
          typeName: '全部'
        }, {
          id: 3,
          src: '../../../../../static/images/class3.png',
          typeName: '全部'
        }, {
          id: 4,
          src: '../../../../../static/images/class4.png',
          typeName: '全部'
        }, {
          id: 5,
          src: '../../../../../static/images/class5.png',
          typeName: '全部'
        }],
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        showTextarea: false,
        circular: true,
        Grade: 'V1',
        tabs: 1,
        lastPage: 1,
        apiproducts: apiproducts,
        nextPage: '',
        cards: [],
        num: 0,
        businessId: '',
        count: 0,
        pageNum: 1,
        pageSize: 5,
        Check: 0,
        windowHeight: '',
        windowHeightA: '',
        deleteShow: false,
        dynamicStatus: 1,
        typeId: 0,
        latitude: '',
        longitude: '',
        memberCount: '',
        browseCount: '',
        newsCount: '',
        postForm: false,
        pushName: ''
      }
    },
    onShareAppMessage (res) {
      console.log('me', res)
      if (res.target) {
        let item = res.target.dataset.item
        this.insertOpera('分享了新闻', 13, item.id)
        if (item.imgUrl === null) {
          let video = item.videoUrl + '?x-oss-process=video/snapshot,t_5000,f_jpg,w_750,m_fast'
          return {
            title: item.content,
            path: 'pages/loading/main?fromWay=4&param=news&newsId=' + item.id,
            imageUrl: video
          }
        } else if (item.imgUrl.length > 0) {
          return {
            title: item.content,
            path: 'pages/loading/main?fromWay=4&param=news&newsId=' + item.id,
            imageUrl: item.imgUrl[0]
          }
        } else {
          let imgUrl = [{
            url: 'https://oss.tzyizan.com/salesInfo/201908231441551566542515010.png'
          }]
          return {
            title: item.content,
            path: 'pages/loading/main?fromWay=4&param=news&newsId=' + item.id,
            imageUrl: imgUrl[0].url
          }
        }
      }
    },
    onLoad (options) {
      // this.pageNum = 1
      // this.getNews({})
      // 动态开关
      this.dynamicStatus = wx.getStorageSync('dynamicStatus')
      // this.tradeStatus = 1
      if (options.newsId) {
        wx.navigateTo({
          url: `/pages/Networking/detail/main?id=` + options.newsId
        })
      }
      this.businessId = wx.getStorageSync('businessId')
      this.getType()
      this.longitude = wx.getStorageSync('longitude')
      this.latitude = wx.getStorageSync('latitude')
      this.getNum()
      this.changTab(1)
      this.getNewsA()
    },
    onShow () {
      this.TypeName = ''
      this.getInfo()
      // this.getCard()
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
    mounted () {
      // this.init()
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
              if (this.descHeight >= 84) {
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
      // 获取广告
      getNewsA () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/advert/list',
          body: {
            pageNum: 1,
            pageSize: 5,
            position: 1
          }
        }).then(res => {
          if (res.code === 200) {
            this.imgUrls = res.data.list
          }
          // console.log('News', res)
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      showTotalIntro (index) {
        this.newsList[index].showTotal = !this.newsList[index].showTotal
        this.newsList[index].exchangeButton = !this.newsList[index].exchangeButton
        console.log(this.newsList[index].exchangeButton)
      },
      getRem () {
        console.log('getRem')
        // const defaultRem = 16
        let winWidth = wx.getSystemInfoSync().windowHeight
        console.log('winWidth:' + winWidth)
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
      // 跳转发布动态
      goNet () {
        if (this.postForm === true) {
          wx.navigateTo({
            url: '/pages/pageA/release/main'
          })
        } else {
          wx.showToast({
            title: '请先注册名片',
            duration: 2000,
            icon: 'none'
          })
        }
      },
      // 插入雷达
      async insertOpera (info, recordType, newsId) {
        let businessId = wx.getStorageSync('businessId')
        let salesmanId = wx.getStorageSync('salesManId')
        let userId = wx.getStorageSync('userId')
        await personApi.OperationInsert({ businessId, newsId, info, recordType, salesmanId, userId })
      },
      // 名称检索
      searchTypeName (name) {
        wx.navigateTo({
          url: '/pages/SNetworking/main?name=' + name + '&diffA=0'
        })
      },
      // 分类检索
      goToSN (id) {
        wx.navigateTo({
          url: '/pages/SNetworking/main?id=' + id + '&diffA=1'
        })
      },
      // 选择
      changTab (index) {
        if (index === 1) {
          this.tab = index
          this.status = index
          this.typeId = 0
          this.pageNum = 1
          this.getNews({type: 0})
        } else if (index === 2) {
          this.tab = index
          this.status = index
          this.typeId = 1
          this.pageNum = 1
          this.getNews({})
        } else if (index === 3) {
          this.tab = index
          this.status = index
          this.typeId = 2
          this.pageNum = 1
          this.getNews({})
        } else if (index === 4) {
          this.tab = index
          this.status = index
          this.typeId = 3
          this.pageNum = 1
          this.getNews({})
        } else if (index === 5) {
          this.tab = 1
          this.status = 1
          this.typeId = 0
          this.pageNum = 1
          this.getNews({})
          wx.switchTab({
            url: '/pages/logs/main'
          })
        }
      },
      goToCard (id) {
        wx.navigateTo({
          url: `../OthersCard/main?id=` + id
        })
      },
      // 获取人脉即使热门名片
      getNum () {
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/dynamic/selectCount',
          body: {
            'businessId': businessId,
            'userId': userId
          }
        }).then(res => {
          if (res.data) {
            this.memberCount = res.data.memberCount
            this.browseCount = res.data.browseCount
            this.newsCount = res.data.newsCount
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      //   点赞
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
      deleteMsg () {
        this.msgContent = ''
        this.showTextarea = false
      },
      async addLeaveMsg () {
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
        let userId = wx.getStorageSync('userId')
        await apiNews.addNewsA({
          commentType: 0,
          commentUserId: userId,
          commentNewsId: this.commentId,
          content: this.msgContent
        })
        this.newsList.map(item => {
          if (item.id === this.commentId) {
            item.newsCommentList.push({ name: this.name, content: this.msgContent })
          }
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
      bindViewTap () {
        const url = '../logs/index'
        wx.navigateTo({ url })
      },
      tabChange (data) {
        this.typeId = data.categoryId
        this.pageNum = 1
        this.getNews({})
      },
      async getType () {
        const { code, data, message } = await apiNews.getType(this.businessId)
        if (code === 200) {
          this.typeList = data
          // this.typeId = data[0].id
          console.log('this.typeId', data)
          // this.getNews({})
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
        const that = this
        const result = await apiNews.getNews({ businessId: that.businessId, pageNum: that.pageNum, pageSize: that.pageSize, typeId: that.typeId, latitude: that.latitude, longitude: that.longitude })
        const code = result.code
        const data = result.data
        // console.log('newList', result)
        if (code === 200) {
          console.log('newList', result)
          data.list.map(item => {
            if (!item.image) {
              item.showTotal = true
              item.showExchangeButton = false
              item.exchangeButton = true
              item.publishTime = this.moment(item.publishTime).format('MM月DD日')
              // if (item.img !== '' && item.img !== null) {
              //   const img = item.img.split(',')
              //   item.img = img
              // }
              item.praiseName = ''
              item.isChan = false
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
          } else if (type === 1) {
            data.list.forEach(e => {
              this.newsList.push(e)
            })
          }
          console.log('newList', this.newsList)
          this.pageNum = data.pageNum
          this.lastPage = data.lastPage
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

<style lang="less" scoped>
@import "style";
</style>
<!--<style lang="scss" scoped>-->
  <!--@import "style";-->
<!--</style>-->
