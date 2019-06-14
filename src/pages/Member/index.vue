<template xmlns:wx="http://www.w3.org/1999/xhtml">
  <div class="modify">
    <el-form ref="postForm" :model="postForm" >
      <div class="TopImg">
        <i @click="back()" class="iconfont iconE leftA"></i>
        <span>成为会员</span>
        <span class="imgUrl">
          <img src="../../../static/images/tiangou.jpg">
        </span>
        <span class="name">李松阳</span>
        <span class="member">会员未开通</span>
      </div>
      <div class="test">
        <div class="testNav">
          <div
            :class="{'selected':tab === 1,'testTitle':true}"
            @click="changTab(1)"
          >白银会员</div>
          <div
            :class="{'selected':tab === 2,'testTitle':true}"
            @click="changTab(2)"
          >白金会员</div>
          <div
            :class="{'selected':tab === 3,'testTitle':true}"
            @click="changTab(3)"
          >钻石会员</div>
        </div>
        <div class="cont">
          <div v-if="tab===1" class="cont-main">
              <div class="silver">
                  <span v-for="(item,index) in silver" :key="index" :class="{'selected':tabA === item.id,'testTitle':true}" @click="changTabMeberA(item.id)">
                    <p class="date">{{ item.date }}</p>
                    <p class="money">￥{{ item.money }}</p>
                    <p class="title">{{ item.title }}</p>
                    <p class="info">{{ item.info }}</p>
                  </span>
              </div>
            <div class="footer">
              <button class="bt" @click="Opening">立即开通</button>
            </div>
          </div>
          <div  v-else-if="tab===2" class="cont-main">
            <div class="silver">
                  <span v-for="(item,index) in gold" :key="index" :class="{'selected':tabB === item.id,'testTitle':true}" @click="changTabMeberB(item.id)">
                    <p class="date">{{ item.date }}</p>
                    <p class="money">￥{{ item.money }}</p>
                    <p class="title">{{ item.title }}</p>
                    <p class="info">{{ item.info }}</p>
                  </span>
            </div>
            <div class="footer">
              <button class="bt" @click="Opening">立即开通</button>
            </div>
          </div>
          <div  v-else-if="tab===3" class="cont-main">
            <div class="silver">
                  <span v-for="(item,index) in Diamonds" :key="index" :class="{'selected':tabC === item.id,'testTitle':true}" @click="changTabMeberC(item.id)">
                    <p class="date">{{ item.date }}</p>
                    <p class="money">￥{{ item.money }}</p>
                    <p class="title">{{ item.title }}</p>
                    <p class="info">{{ item.info }}</p>
                  </span>
            </div>
            <div class="footer">
              <button class="bt" @click="Opening">立即开通</button>
            </div>
          </div>
        </div>
        <div class="MeberTitle">
          <p class="top">会员特权</p>
          <div class="Mtable">
            <div class="table">
              <div class="tableLeft">
              <span><a>等级\特权</a></span>
              <span><a>日发名片量</a></span>
              <span><a>名片样式</a></span>
              <span><a>名片夹热人数</a></span>
              <span><a>动态置顶</a></span>
              <span><a>建群数量</a></span>
              <span><a>纸质名片扫码次数</a></span>
              <span><a>展示公司介绍</a></span>
              <span><a>产品发布数量</a></span>
              </div>
              <div class="tableRight" v-for="item in Table" :key="index">
                <span v-if="index === 0"><a>{{item.meber}}</a></span>
                <span v-else class="imgUrl"><img :src="item.meber"></span>
                <span><a>{{item.dateNum}}</a></span>
                <span><a>{{item.style}}</a></span>
                <span><a>{{item.person}}人</a></span>
                <span><a>{{item.auto}}</a></span>
                <span><a>{{item.group}}</a></span>
                <span><a>{{item.number}}</a></span>
                <span><a>{{item.company}}</a></span>
                <span><a>{{item.goodNum}}</a></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data () {
    return {
      Table: [{
        meber: '非会员',
        dateNum: '10个',
        style: '无折扣',
        person: 10,
        auto: '无折扣',
        group: 1,
        number: 1,
        company: '无',
        goodNum: 1
      }, {
        meber: '../../static/images/v1.png',
        dateNum: '50个',
        style: '8.00折',
        person: 100,
        auto: '8.00折',
        group: 3,
        number: 1,
        company: '无',
        goodNum: 4
      },
      {
        meber: '../../static/images/v2.png',
        dateNum: '200个',
        style: '6.00折',
        person: 500,
        auto: '6.00折',
        group: 50,
        number: 1,
        company: '无',
        goodNum: 10
      },
      {
        meber: '../../static/images/v3.png',
        dateNum: '10个',
        style: '5.00折',
        person: '无限制',
        auto: '5.00折',
        group: '无限制',
        number: '无限制',
        company: '无',
        goodNum: '无限制'
      }
      ],
      tab: 1,
      tabA: 0,
      tabB: 0,
      tabC: 0,
      postForm: '',
      tagList: [],
      silver: [{
        id: 1,
        date: '1个月',
        money: 10,
        title: '折合￥10/月',
        info: '无折扣'
      }, {
        id: 2,
        date: '3个月',
        money: 20,
        title: '折合￥6.6/月',
        info: '立省9.99元'
      }, {
        id: 3,
        date: '12个月',
        money: 60,
        title: '折合￥50/月',
        info: '立省60元'
      }
      ],
      gold: [{
        id: 1,
        date: '1个月',
        money: 15,
        title: '折合￥15/月',
        info: '无折扣'
      }, {
        id: 2,
        date: '3个月',
        money: 20,
        title: '折合￥9.9/月',
        info: '立省18.88元'
      }, {
        id: 3,
        date: '12个月',
        money: 90,
        title: '折合￥8.88/月',
        info: '立省99元'
      }],
      Diamonds: [{
        id: 1,
        date: '1个月',
        money: 20,
        title: '折合￥20/月',
        info: '无折扣'
      }, {
        id: 2,
        date: '3个月',
        money: 30,
        title: '折合￥12.88/月',
        info: '立省28.88元'
      }, {
        id: 3,
        date: '12个月',
        money: 12,
        title: '折合￥8.88/月',
        info: '立省120元'
      }]
    }
  },

  components: {
    card
  },
  onShow () {

  },
  onLoad () {
  },
  methods: {
    // 立即开通
    Opening () {
      wx.showToast({
        title: '功能还在开发中哦',
        icon: 'none',
        duration: 2000
      })
    },
    // 选择会员
    changTabMeberA (index) {
      this.tabA = index
    },
    changTabMeberB (index) {
      this.tabB = index
    },
    changTabMeberC (index) {
      this.tabC = index
    },
    changTab (index) {
      if (index === 1) {
        this.tab = index
        this.status = index
      } else if (index === 2) {
        this.tab = index
        this.status = index
      } else {
        this.tab = index
        this.status = index
      }
    },
    // 返回上一页
    back () {
      wx.navigateBack(-1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
