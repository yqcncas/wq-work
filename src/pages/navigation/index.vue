<template>
  <scroll-view scroll-top="0">
    <div class="index">
      <vue-tab-bar
        @fetch-index="clickIndexNav"
        :selectNavIndex=selectNavIndex
        :needButton="needButton"
        :handButton="handButton"
        :btnText="btnText">
      </vue-tab-bar>
      <div class="top">
        <section class="sec-nav">
          <navigation-bar
            :back-visible="true"
            :home-path="'/pages/index/main'"></navigation-bar>
        </section>
        <section class="content">
          <img class="bj" src="../../../static/images/indexbj.png"/>
        </section>
        <div class="search">
          <p>
            <input placeholder="搜索客户资源" placeholder-style="color: #cccccc;"/>
            <span class="sbutton"><img src="../../../static/images/search.png"></span>
          </p>
        </div>
      </div>
      <div class="main">
        <div class="test">
          <div class="testNav">
            <div
              :class="{'selected':tab === 1,'testTitle':true}"
              @click="changTab(1)"
            >人脉集市</div>
            <div
              :class="{'selected':tab === 2,'testTitle':true}"
              @click="changTab(2)"
            >信息广场</div>
          </div>
          <div class="cont">
            <div v-if="tab===1">
                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular= 'circular' :interval="interval" :duration="duration">
                    <swiper-item>
                      <span class="lf-main" v-for="(item, index) in Types" :key="index">
                        <span class="Typesrc"><img :src="item.src"></span>
                        <span class="title">{{ item.title }}</span>
                      </span>
                      <!--<image :src="item.url" class="slide-image" mode="aspectFill"/>-->
                    </swiper-item>
                    <swiper-item>
                      <span class="lf-main" v-for="(item, index) in Types1" :key="index">
                        <span class="Typesrc"><img :src="item.src"></span>
                        <span class="title">{{ item.title }}</span>
                      </span>
                      <!--<image :src="item.url" class="slide-image" mode="aspectFill"/>-->
                    </swiper-item>
                </swiper>
            </div>
            <div v-else>
              <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular= 'circular' :interval="interval" :duration="duration">
                <swiper-item>
                      <span class="lf-main" v-for="(item, index) in Types2" :key="index">
                        <span class="Typesrc"><img :src="item.src"></span>
                        <span class="title">{{ item.title }}</span>
                      </span>
                  <!--<image :src="item.url" class="slide-image" mode="aspectFill"/>-->
                </swiper-item>
              </swiper>
            </div>
          </div>
        </div>
      </div>
      <div class="fotter" v-if="status === 1">
        <div class="test1">
          <div class="testNav1">
            <div
              :class="{'selected2':tabs,'testTitle1':true}"
            >{{ cardRen }}</div>
            <div
              :class="{'testTitle2':true}"
              @click="changTabs(tabs)"
            ><img src="../../../static/images/qiehuan.png" class="switch"/> {{cardsMap }}</div>
          </div>
          <div class="conts">
            <div class="conts-main" v-if="tabs===1">
              <div class="card" v-for="(item,index) in cards" :key="index">
                <span><img :src="item.headImg"></span>
                <div class="card-main">
                  <div class="qiye">
                    <span class="img"><s>企</s></span>
                    <b>{{ item.name }}</b>
                    <span class="job">{{ item.job }}</span>
                    <span v-if="!item.status" class="status">无状态</span>
                    <span v-else class="status">{{ item.status }}</span>
                  </div>
                  <p class="comyname">{{ item.Companyname}}</p>
                </div>
                <div class="card-right">
                  <p class="eye"><img src="../../../static/images/eye.png"/><span>{{ item.eye }}</span> </p>
                  <p class="star"><img src="../../../static/images/star.png"/><span>{{ item.star }}</span> </p>
                  <i><img src="../../../static/images/addpersonal.png"/></i>
                </div>
              </div>
            </div>
            <div class="conts-main" v-else>
              <div class="card" v-for="(item,index) in enclosure" :key="index">
                <span><img :src="item.headImg"></span>
                <div class="card-main">
                  <div class="qiye">
                    <span class="img"><s>企</s></span>
                    <b>{{ item.name }}</b>
                    <span class="job">{{ item.job }}</span>
                    <span v-if="!item.status" class="status">无状态</span>
                    <span v-else class="status">{{ item.status }}</span>
                  </div>
                  <p class="comyname">{{ item.Companyname}}</p>
                </div>
                <div class="card-right">
                  <p class="eye"><img src="../../../static/images/eye.png"/><span>{{ item.eye }}</span> </p>
                  <p class="star"><img src="../../../static/images/star.png"/><span>{{ item.star }}</span> </p>
                  <i><img src="../../../static/images/addpersonal.png"/></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="info" v-else>
        <div class="infoTest">
          <div class="InfoNav">
            <div
              :class="{'selected1':info,'testTitle1':true}"
            >{{ infoTop }}</div>
            <div
              :class="{'testTitle2':true}"
              @click="changInfo(info)"
            ><img src="../../../static/images/qiehuan.png" class="switch"/> 切换为{{ infoTitle }}</div>
          </div>
        </div>
        <div class="conts">
          <div class="conts-mains" v-if="info===1">
            <div class="infoCard">
              <span class="headImg"><img src="../../../static/images/gongzhonghao.jpg"></span>
              <div class="infoCard-main">
                <div class="infoTop">
                  <span class="headName">李颂扬</span>
                  <span class="headMap">
                    <s class="headMaps">浙江温岭</s>·<s>100次浏览</s>
                  </span>
                  <span class="headTitle">
                    空间看垃圾堆了卡记录的借口啦来到了卡就绿卡就对了卡机看了多久啊离开卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿克苏垃圾啊卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿
                  </span>
                  <span class="headFotter">
                    <span class="headTime">昨天14：00</span>
                    <span v-if="zan === 1" class="headZan"><img src="../../../static/images/zan.png"/> </span>
                    <span v-else class="headZan"><img src="../../../static/images/zan-se.png"/> </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="infoCard">
              <span class="headImg"><img src="../../../static/images/gongzhonghao.jpg"></span>
              <div class="infoCard-main">
                <div class="infoTop">
                  <span class="headName">李颂扬</span>
                  <span class="headMap">
                    <s class="headMaps">浙江温岭</s>· <s>100次浏览</s>
                  </span>
                  <span class="headTitle">
                    空间看垃圾堆了卡记录的借口啦来到了卡就绿卡就对了卡机看了多久啊离开卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿克苏垃圾啊卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿
                  </span>
                  <span class="headImage">
                   <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                   <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                   <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                    <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                   <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                   <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                    <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                   <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                   <i><img src="../../../static/images/gongzhonghao.jpg"/> </i>
                  </span>
                  <span class="headFotter">
                    <span class="headTime">昨天14：00</span>
                    <span class="headZan"><img src="../../../static/images/zan.png"/> </span>
                  </span>
                </div>
              </div>
            </div>
            <div class="infoCard">
              <span class="headImg"><img src="../../../static/images/gongzhonghao.jpg"></span>
              <div class="infoCard-main">
                <div class="infoTop">
                  <span class="headName">李颂扬</span>
                  <span class="headMap">
                    <s class="headMaps">浙江温岭</s>·<s>100次浏览</s>
                  </span>
                  <span class="headTitle">
                    空间看垃圾堆了卡记录的借口啦来到了卡就绿卡就对了卡机看了多久啊离开卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿克苏垃圾啊卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿
                  </span>
                  <span class="headVideo">
                    <video controls>
                     <source src="https://oss.wq1516.com/salesVideo/201904260909511556240991808.mp4" type="video/mp4"><!--兼容IE9+、Chrome和Safari-->
                    </video>
                    <!--<video src="../../../static/images/mei.mp4"></video>-->
                  </span>
                  <span class="headFotter">
                    <span class="headTime">昨天14：00</span>
                    <span class="headZan"><img src="../../../static/images/zan.png"/> </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="conts-mains" v-else>
            <div class="infoCard">
            <span class="headImg"><img src="../../../static/images/gongzhonghao.jpg"></span>
            <div class="infoCard-main">
              <div class="infoTop">
                <span class="headName">李颂扬</span>
                <span class="headMap">
                    <s class="headMaps">浙江温岭</s>·<s>100次浏览</s>
                  </span>
                <span class="headTitle">
                    空间看垃圾堆了卡记录的借口啦来到了卡就绿卡就对了卡机看了多久啊离开卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿克苏垃圾啊卡里克多久啦大家垃圾堆了阿姐了解垃圾堆了阿
                  </span>
                <span class="headFotter">
                    <span class="headTime">昨天14：00</span>
                    <span class="headZan"><img src="../../../static/images/zan.png"/> </span>
                  </span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
import navigationBar from '../../components/navigationBar.vue'
import vueTabBar from '../../components/vueTabBar'
export default {
  components: {
    navigationBar,
    vueTabBar
  },
  data () {
    return {
      data: '',
      tab: 1,
      tabs: 1,
      info: 1,
      status: 1,
      zan: 2,
      cardRen: '热门名片',
      cardsMap: '附近名片',
      infoTitle: '附近消息',
      infoTop: '推荐信息',
      selectNavIndex: 1,
      needButton: true,
      handButton: true,
      btnText: '附近',
      indicatorDots: true,
      autoplay: false,
      circular: true,
      interval: 3000,
      duration: 500,
      Types: [
        {
          title: '互联网',
          src: '../../static/svg/hu.svg'
        },
        {
          title: '文化传媒',
          src: '../../static/svg/wen.svg'
        },
        {
          title: '服装零售',
          src: '../../static/svg/fu.svg'
        },
        {
          title: '加工制造',
          src: '../../static/svg/jia.svg'
        },
        {
          title: '交通物流',
          src: '../../static/svg/jiao.svg'
        },
        {
          title: '金融保险',
          src: '../../static/svg/jin.svg'
        },
        {
          title: '机械机电',
          src: '../../static/svg/ji.svg'
        },
        {
          title: '家电电器',
          src: '../../static/svg/home.svg'
        },
        {
          title: '房地产',
          src: '../../static/svg/fang.svg'
        },
        {
          title: '印刷包装',
          src: '../../static/svg/yin.svg'
        }
      ],
      Types1: [ {
        title: '安全防护',
        src: '../../static/svg/an.svg'
      },
      {
        title: '环保绿化',
        src: '../../static/svg/huan.svg'
      },
      {
        title: '农林牧渔',
        src: '../../static/svg/nong.svg'
      },
      {
        title: '旅游休闲',
        src: '../../static/svg/lv.svg'
      },
      {
        title: '冶金矿产',
        src: '../../static/svg/zhi.svg'
      },
      {
        title: '文化教育',
        src: '../../static/svg/wen.svg'
      },
      {
        title: '医药卫生',
        src: '../../static/svg/yi.svg'
      },
      {
        title: '体育健康',
        src: '../../static/svg/ti.svg'
      },
      {
        title: '家电电器',
        src: '../../static/svg/home.svg'
      },
      {
        title: '轻工业',
        src: '../../static/svg/qin.svg'
      }],
      Types2: [ {
        title: '同城跑腿',
        src: '../../static/svg/information/tong.svg'
      },
      {
        title: '相亲交友',
        src: '../../static/svg/information/xiang.svg'
      },
      {
        title: '家政服务',
        src: '../../static/svg/information/jia.svg'
      },
      {
        title: '招聘求职',
        src: '../../static/svg/information/zhao.svg'
      },
      {
        title: '餐饮美食',
        src: '../../static/svg/information/can.svg'
      },
      {
        title: '微商专区',
        src: '../../static/svg/information/wei.svg'
      },
      {
        title: '招商加盟',
        src: '../../static/svg/information/zhaos.svg'
      },
      {
        title: '房屋租聘',
        src: '../../static/svg/information/fang.svg'
      },
      {
        title: '二手市场',
        src: '../../static/svg/information/ershou.svg'
      },
      {
        title: '其他',
        src: '../../static/svg/information/qi.svg'
      }],
      cards: [{
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }, {
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }, {
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }, {
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }, {
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }, {
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }, {
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }],
      enclosure: [{
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }, {
        headImg: '../../static/images/gongzhonghao.jpg',
        name: '李松阳',
        job: '技术总监',
        status: '已认证',
        eye: 10,
        star: 10,
        Companyname: '浙江万仟科技有限公司'
      }]
    }
  },
  onShow () {
    wx.hideTabBar()
  },
  methods: {
    changTab (index) {
      if (index === 1) {
        this.tab = index
        this.status = index
      } else {
        this.tab = index
        this.status = index
      }
    },
    changTabs (index) {
      if (index === 1) {
        this.cardRen = '热门名片'
        this.cardsMap = '附近名片'
        this.tabs = 2
      } else {
        this.cardRen = '附近名片'
        this.cardsMap = '热门名片'
        this.tabs = 1
      }
    },
    changInfo (index) {
      if (index === 1) {
        this.infoTitle = '附近消息'
        this.infoTop = '推荐信息'
        this.info = 2
      } else {
        this.infoTitle = '推荐信息'
        this.infoTop = '附近消息'
        this.info = 1
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import "./style";
</style>
