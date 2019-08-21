<template>
    <div class="Net">
      <div class="NetTop">
        <div class="title">
          <span>动态</span>
        </div>
        <div class="infoA">
          <div class="inputClass">
            <i class="iconsousuo iconfont"></i>
            <input placeholder="搜索关键字">
          </div>
        </div>
        <div class="Ndata">
          <div class="Ndata-main">
            <span>帖子112</span>
            <span>人气119</span>
            <span>成员112</span>
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
        <div class="NewClass">
          <div class="NewClass-main">
            <div class="NewChoose" v-for="item in categoryA" :key="index" @click="goToSN(item.typeName)">
             <p class="NewImg">
               <img :src="item.src">
             </p>
              <p class="NewName">
                {{item.typeName}}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!--新闻动态-->
      <div class="Netmain">
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
                <img class="img" :src="item.imgUrl" />
              </div>
              <div class="author-info">
                <div class="author-name">
                  {{item.author?item.author:'未填'}}
                </div>
                <div class="author-date">
                  {{item.publishTime}}
                </div>
              </div>
              <div class="right-side">
                <button @click.stop open-type="share" :data-item="item" class="forward">转发</button>
                <i class="iconfont iconliaotian1" @click="routerTo(`/pages/msgcenter/main?id=${item.id}`)"></i>
              </div>
            </div>
            <div class="news-item" @click="routerTo(`/pages/Networking/detail/main?id=${item.id}`)">
              <p class="item-title">
                <span class="title">{{item.text}}</span>
              </p>
              <div class="news-cover" v-if="item.img">
                <image :src="item.img[0]" class="img" mode="widthFix"></image>
                <p class="news-desc" v-if="item.abstractText">{{item.abstractText}}</p>
              </div>
              <div class="news-view flexRow">
                <div class="flexRow watch" v-if="item.count">
                  <p>
                    <i class="iconfont iconchakan1"></i>
                    <span>{{item.count}}</span>
                  </p>
                  <p>
                    <i class="iconfont iconaixin"></i>
                    <span>{{item.count}}</span>
                  </p>
                </div>
                <!--<p class="flexRow watch" v-if="item.count">-->
                  <!--<i class="iconfont iconaixin"></i>-->
                  <!--<span>{{item.count}}</span>-->
                <!--</p>-->
                <div class="btn-group-ab flexRow" :class="{'trans':item.showBtn}">
                  <p class="flexRow common-p" @click.stop="clickPraise(item.isPraise,status,item.id)">
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
            <!-- 点赞评论 -->
            <div v-if="item.praiseUser.length > 0 || item.comment.length > 0" class="comment-map">
              <div class="praise-wrap">
                <span v-if="item.praiseUser.length>0"><i class="iconfont iconaixin"></i>{{item.praiseName}}</span>
                <div>
                  <p v-for="(child,i) in item.comment" :key="i" class="comment-wrap-s">
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
        longitude: ''
      }
    },
    onLoad (options) {
      if (options.newsId) {
        wx.navigateTo({
          url: `../news/detail/main?id=${options.newsId}`
        })
      }
      this.businessId = wx.getStorageSync('businessId')
      this.pageNum = 1
      this.getType()
      this.longitude = wx.getStorageSync('longitude')
      this.latitude = wx.getStorageSync('latitude')
      // const screenHeight = wx.getSystemInfoSync().screenHeight
      // const windowHeight = wx.getSystemInfoSync().windowHeight
      // const tarbar = screenHeight - windowHeight
      // this.windowHeight = screenHeight - 278 - tarbar
      // if (screenHeight < 569) {
      //   this.windowHeight = screenHeight - 199 - tarbar
      // } else if (screenHeight > 569 && screenHeight < 668) {
      //   this.windowHeight = screenHeight - 233 - tarbar
      // } else if (screenHeight > 668 && screenHeight < 737) {
      //   this.windowHeight = screenHeight - 256 - tarbar
      // } else if (screenHeight > 738 && screenHeight < 813) {
      //   this.windowHeight = screenHeight - 233 - tarbar
      // } else if (screenHeight > 813 && screenHeight < 897) {
      //   this.windowHeight = screenHeight - 256 - tarbar
      // } else if (screenHeight > 1023 && screenHeight < 1025) {
      //   this.windowHeight = windowHeight - 480
      // } else if (screenHeight > 1025 && screenHeight < 1113) {
      //   this.windowHeight = windowHeight - 520
      // } else if (screenHeight > 1113 && screenHeight < 1367) {
      //   this.windowHeight = windowHeight - 640
      // } else if (screenHeight > 1367) {
      //   this.windowHeight = windowHeight - screenHeight / 2
      // }
      // if (windowHeight < 569) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 215) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 215) * 2
      // } else if (windowHeight > 569 && windowHeight < 668) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 305) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 305) * 2
      //   console.log('height', wx.getSystemInfoSync().screenHeight)
      // } else if (windowHeight > 668 && windowHeight < 737) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 300) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 300) * 2
      //   console.log('height', wx.getSystemInfoSync().screenHeight)
      // } else if (windowHeight > 738 && windowHeight < 813) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 335) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 335) * 2
      //   console.log('height', wx.getSystemInfoSync().screenHeight)
      // } else if (windowHeight > 1023 && windowHeight < 1024) {
      //   this.windowHeight = (wx.getSystemInfoSync().screenHeight - 100) * 2
      //   this.windowHeightA = (wx.getSystemInfoSync().screenHeight - 100) * 2
      // }
    },
    onShow () {
      this.tradeStatus = wx.getStorageSync('tradeStatus')
      this.pageNum = 1
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
      // 分类检索
      goToSN (name) {
        wx.navigateTo({
          url: '/pages/SNetworking/main?name=' + name
        })
      },
      // 选择
      changTab (index) {
        this.newsList = []
        if (index === 1) {
          this.tab = index
          this.status = index
          this.typeId = 0
          this.pageNum = 1
          this.getNews({})
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
      // 插入雷达
      async insertOpera (info, recordType, newsId) {
        let businessId = wx.getStorageSync('businessId')
        let salesmanId = wx.getStorageSync('salesManId')
        let userId = wx.getStorageSync('userId')
        await personApi.OperationInsert({ businessId, newsId, info, recordType, salesmanId, userId })
      },
      //   点赞
      clickPraise (isPraise, status, id) {
        this.closeBtnShow()
        this.newsList.map(async item => {
          if (item.id === id) {
            if (isPraise > 0) {
              await apiNews.deleteNews({ status, id: id })
              item.isPraise = 0
              item.praiseUser.map((m, n) => {
                if (m.name === this.name) {
                  item.praiseUser.splice(n, 1)
                }
              })
            } else {
              await apiNews.addNews({ status, id: id })
              this.insertOpera('点赞了新闻', 12, id)
              item.isPraise = 1
              item.praiseUser.push({ name: this.name })
            }
          }
          // 拼凑
          item.praiseName = ''
          item.praiseUser.map(child => {
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
        await apiNews.addNews({
          commentType: 0,
          commentnewsid: this.commentId,
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
        this.name = wx.getStorageSync('nickName')
        const result = await apiNews.getNews({ businessId: this.businessId, pageNum: this.pageNum, pageSize: this.pageSize, typeId: this.typeId, latitude: this.latitude, longitude: this.longitude })
        const code = result.code
        const data = result.data
        console.log('dataA', data)
        if (code === 200) {
          data.list.map(item => {
            item.publishTime = this.moment(item.publishTime).format('MM月DD日')
            if (item.img !== '' && item.img !== null) {
              const img = item.img.split(',')
              item.img = img
            }
            item.praiseName = ''
            item.imgUrl += '?x-oss-process=style/w750'
            item.praiseUser.map(child => {
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

<style lang="less" scoped>
@import "style";
</style>
<!--<style lang="scss" scoped>-->
  <!--@import "style";-->
<!--</style>-->
