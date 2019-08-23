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
                <img :src="item.src" class="slide-image"/>
              </swiper-item>
            </block>
          </swiper>
        </div>
        <div class="NewClass" v-if="tradeStatus !== 0">
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
      <div class="Netmain" v-if=" tradeStatus !== 0">
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
            <div class="news-header flexRow">
              <div class="avatar-wrp">
                <img class="img" :src="item.salesmanImgUrl" />
              </div>
              <div class="author-info">
                <div v-if="item.salesmanId"  class="author-name">
                  {{item.name?item.name:'未填'}}
                </div>
                <div v-else class="author-name">
                  {{item.author?item.author:'未填'}}
                </div>
                <div class="author-date">
                  {{item.publishTime}}
                </div>
              </div>
              <div class="right-side">
                <button @click.stop open-type="share" :data-item="item" class="forward">转发</button>
                <i v-if="item.salesmanId" class="iconfont iconliaotian1" @click="routerTo(`/pages/msgcenter/main?id=${item.id}`)"></i>
              </div>
            </div>
            <div class="news-item" @click="routerToA(`/pages/Networking/detail/main?id=${item.id}`)">
              <p class="item-title" v-if="item.content!==''">
                <span v-if="item.salesmanId" class="title">{{item.content}}</span>
              </p>
              <div class="news-cover" v-if="item.imgUrl">
                <image :src="item.imgUrl[0]" class="img" mode="widthFix"></image>
                <p class="news-desc" v-if="item.abstractText">{{item.abstractText}}</p>
              </div>
              <div class="news-cover" v-if="item.videoUrl">
                <image :src="item.videoUrl + '?x-oss-process=video/snapshot,t_5000,f_jpg,w_750,m_fast'" class="img" mode="widthFix"></image>
              </div>
              <div class="news-view flexRow">
                <div class="flexRow watch">
                  <p>
                    <i class="iconfont iconchakan1"></i>
                    <span>{{item.browseCount}}</span>
                  </p>
                  <p>
                    <i class="iconfont iconaixin"></i>
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
        </div>
        <div v-else class="new-listBottom">
          <span>暂无数据</span>
        </div>
        <div class="input-bottom" v-if="showTextarea">
        <textarea :auto-focus="true" @confirm="addLeaveMsg" v-model="msgContent" :class="areaType" placeholder="评论"
                  :auto-height="true" :fixed="true" cursor-spacing="10"></textarea>
        </div>
      </div>
      <div v-else>
        <div class="Main-Img">
          <img src="https://oss.tzyizan.com/salesInfo/201908231552121566546732906.jpg"/>
        </div>
      </div>
      <!--名片-->
      <!--<div class="NetCard" v-if="tradeStatus !== 0">-->
        <!--<div class="NetCard-top">-->
            <!--<span class="title">热门名片</span>-->
            <!--<span class="fire"><i class="iconfont iconremen"></i>我要上热门</span>-->
        <!--</div>-->
        <!--<div class="NetCard-main" >-->
          <!--<scroll-view class="scroll-view" scroll-y @scrolltolower = "getScroll()" :style="'height:' + windowHeight + 'px'">-->
          <!--<div class="conts-main">-->
            <!--<div v-if="cards !== ''|| cards !== null">-->
              <!--<div class="card" v-for="(item,index) in cards" :key="index">-->
                <!--<div @click="goToCard(item.id)">-->
                  <!--<span>-->
                    <!--<img class="imga" :src="item.imgUrl + '?x-oss-process=style/c400'">-->
                    <!--<div class="grade">-->
                       <!--<i v-if="item.leavelNum === 1">-->
                          <!--<img src="../../../static/images/v1.png">-->
                       <!--</i>-->
                       <!--<i v-else-if="Grade === 2">-->
                          <!--<img src="../../../static/images/v2.png">-->
                       <!--</i>-->
                       <!--<i v-else-if="Grade === 3">-->
                          <!--<img src="../../../static/images/v3.png">-->
                       <!--</i>-->
                      <!--<i v-else></i>-->
                    <!--</div>-->
                  <!--</span>-->
                  <!--<div class="card-main">-->
                    <!--<div class="qiye">-->
                      <!--<span class="img"><s>企</s></span>-->
                      <!--<b>{{ item.name }}</b>-->
                      <!--<span class="job">{{ item.job }}</span>-->
                      <!--&lt;!&ndash;<span v-if="item.isCertification === 0" class="status">已认证</span>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span v-else class="status">无状态</span>&ndash;&gt;-->
                    <!--</div>-->
                    <!--<p class="comyname" v-if="item.salesCompanyName === null">无公司</p>-->
                    <!--<p class="comyname" v-else>{{ item.salesCompanyName}}</p>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="card-right">-->
                  <!--<p class="eye"><img src="../../../static/images/eye.png"/><span>{{ item.browseCount }}</span> </p>-->
                  <!--<p class="star"><img src="../../../static/images/star.png"/><span>{{ item.praiseCount }}</span> </p>-->
                  <!--<i v-if="item.isCollect === 0" @click="getCollect(item.id, index)"><img src="../../../static/images/addpersonal.png"/></i>-->
                  <!--<i v-else></i>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div v-else class="no">-->
              <!--<p class="title">暂无热门名片</p>-->
            <!--</div>-->
          <!--</div>-->
          <!--</scroll-view>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class=" NetCard" v-else>-->
        <!--<div class="NetCard-mainA" :style="'height:' + windowHeight + 'px'">-->
          <!--<img  class="img" src="https://oss.tzyizan.com/audit-img.jpg?x-oss-process=style/w750">-->
        <!--</div>-->
      <!--</div>-->


      <!--<div class="NetSucces" v-if="deleteShow === true">-->
        <!--<div class="NetSucces-main">-->
          <!--<div class="img">-->
            <!--<img src="https://oss.tzyizan.com/salesInfo/201907231449301563864570184.png">-->
            <!--<div class="main">-->
              <!--<p class="suc">签到成功</p>-->
              <!--<p class="title">恭 喜 你 获 得 5 积 分</p>-->
              <!--<p class="info">积 分 可 用 于 名 片 置 顶 等 服 务</p>-->
            <!--</div>-->
            <!--<div class="delete">-->
              <!--<p class="line"></p>-->
              <!--<i class="iconfont iconshanchu-copy" @click="checkDelete()"></i>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
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
        tradeStatus: 1,
        typeId: 0,
        latitude: '',
        longitude: '',
        memberCount: '',
        browseCount: '',
        newsCount: ''
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
          let imgUrl = 'https://oss.tzyizan.com/salesInfo/201908231441551566542515010.png?x-oss-process=style/c400'
          return {
            title: item.content,
            path: 'pages/loading/main?fromWay=4&param=news&newsId=' + item.id,
            imageUrl: imgUrl
          }
        }
      }
    },
    onLoad (options) {
      // this.pageNum = 1
      // this.getNews({})
      this.tradeStatus = wx.getStorageSync('tradeStatus')
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
    },
    onShow () {
      this.TypeName = ''
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
    methods: {
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
      // // 监测滚动到底部加载分页
      // getScroll () {
      //   if (this.pageNum < this.lastPage) {
      //     this.pageNum = this.nextPage
      //     this.getCard(this.pageNum)
      //   } else {
      //     wx.showToast({
      //       title: '没有更多了',
      //       icon: 'none',
      //       duration: 2000
      //     })
      //   }
      // },
      // // 获取人脉即使热门名片
      // getCard () {
      //   const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
      //   const userId = wx.getStorageSync('userId') // 获取本地userId
      //   this.$fly.request({
      //     method: 'get', // post/get 请求方式
      //     url: '/platformSalesman/getByCode',
      //     body: {
      //       'pageNum': this.pageNum,
      //       'pageSize': 10,
      //       'businessId': businessId,
      //       'userId': userId
      //     }
      //   }).then(res => {
      //     if (res.code === 200) {
      //       const data = res.data.list
      //       data.map(item => {
      //         this.cards.push(item)
      //         if (item.imgUrl === '') {
      //           item.imgUrl = 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png'
      //         }
      //       })
      //       console.log('data', this.cards)
      //       this.lastPage = res.data.lastPage
      //       this.pageNum = res.data.pageNum
      //       this.nextPage = res.data.nextPage
      //     } else {
      //       wx.showToast({
      //         title: '加载失败',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //   }).catch(err => {
      //     console.log(err.status, err.message)
      //   })
      // },
      // // 获取收藏
      // getCollect (id, index) {
      //   const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
      //   const userId = wx.getStorageSync('userId') // 获取本地userId
      //   this.$fly.request({
      //     method: 'post', // post/get 请求方式
      //     url: '/platformUserSalesman/insert',
      //     body: {
      //       'salesmanId': id,
      //       'userId': userId,
      //       'businessId': businessId
      //     }
      //   }).then(res => {
      //     if (res.code === 200) {
      //       const that = this
      //       this.number = this.lastPage
      //       that.cards[index].isCollect = 1
      //       wx.showToast({
      //         title: '收藏成功',
      //         icon: 'none',
      //         duration: 2000
      //       })
      //     }
      //   }).catch(err => {
      //     console.log(err.status, err.message)
      //   })
      // },
      //   点赞
      clickPraise (isPraise, status, id, salesmanId) {
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
        wx.navigateTo({ url })
      },
      routerToA (url) {
        this.newsList.map(async item => {
          item.browseCount = item.browseCount + 1
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
        // this.name = wx.getStorageSync('nickName')
        const that = this
        const result = await apiNews.getNews({ businessId: that.businessId, pageNum: that.pageNum, pageSize: that.pageSize, typeId: that.typeId, latitude: that.latitude, longitude: that.longitude })
        const code = result.code
        const data = result.data
        if (code === 200) {
          data.list.map(item => {
            item.publishTime = this.moment(item.publishTime).format('MM月DD日')
            // if (item.img !== '' && item.img !== null) {
            //   const img = item.img.split(',')
            //   item.img = img
            // }
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
          } else if (type === 1) {
            data.list.forEach(e => {
              this.newsList.push(e)
            })
          }
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
