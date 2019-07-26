<template>
  <div class="stats">
    <div class="test">
      <div class="testNav">
        <div
          :class="{'selected':tab === 1,'testTitle':true}"
          @click="changTab(1)"
        >看过我</div>
        <div
          :class="{'selected':tab === 2,'testTitle':true}"
          @click="changTab(2)"
        >收藏我</div>
        <div
          :class="{'selected':tab === 3,'testTitle':true}"
          @click="changTab(3)"
        >赞过我</div>
        <div
          :class="{'selected':tab === 4,'testTitle':true}"
          @click="changTab(4)"
        >我看过</div>
      </div>
      <div class="cont">
        <div v-if="tab===1">
          <div class="cont-main"  v-for="(item,index) in statsA" :key="index">
          <div class="card">
            <div class="main">
              <span class="imgUrl" @click="goToCard(item.salesmanId)"><img class="img" :src="item.imgUrl"></span>
              <span class="name" v-if="item.name">{{item.name}}</span>
              <span class="name" v-else>无姓名</span>
              <span class="job" v-if="item.job">{{item.job}}</span>
              <span class="job" v-else>无工作</span>
              <span class="company" v-if="item.companyName">{{item.companyName}}</span>
              <span class="company" v-else>无公司名称</span>
              <span class="date">{{item.browseDate}}</span>
            </div>
          </div>
        </div>
        </div>
        <div  v-else-if="tab===2" class="">
          <div class="cont-main"  v-for="(item,index) in statsB" :key="index">
            <div class="card">
              <div class="main">
                <span class="imgUrl"  @click="goToCard(item.salesmanId)"><img class="img" :src="item.imgUrl"></span>
                <span class="name" v-if="item.name">{{item.name}}</span>
                <span class="name" v-else>无姓名</span>
                <span class="job" v-if="item.job">{{item.job}}</span>
                <span class="job" v-else>无工作</span>
                <span class="company" v-if="item.companyName">{{item.companyName}}</span>
                <span class="company" v-else>无公司名称</span>
                <span class="date">{{item.browseDate}}</span>
              </div>
            </div>
          </div>
        </div>
        <div  v-else-if="tab===3" class="">
          <div class="cont-main" v-for="(item,index) in statsC" :key="index">
            <div class="card">
              <div class="main">
                <span class="imgUrl"  @click="goToCard(item.salesmanId)"><img class="img" :src="item.imgUrl"></span>
                <span class="name" v-if="item.name">{{item.name}}</span>
                <span class="name" v-else>无姓名</span>
                <span class="job" v-if="item.job">{{item.job}}</span>
                <span class="job" v-else>无工作</span>
                <span class="company" v-if="item.companyName">{{item.companyName}}</span>
                <span class="company" v-else>无公司名称</span>
                <span class="date">{{item.browseDate}}</span>
              </div>
            </div>
          </div>
        </div>
        <div  v-else-if="tab===4" class="">
          <div class="cont-main" v-for="(item,index) in statsD" :key="index">
            <div class="card">
              <div class="main">
                <span class="imgUrl"  @click="goToCard(item.salesmanId)"><img class="img" :src="item.imgUrl"></span>
                <span class="name" v-if="item.name">{{item.name}}</span>
                <span class="name" v-else>无姓名</span>
                <span class="job" v-if="item.job">{{item.job}}</span>
                <span class="job" v-else>无工作</span>
                <span class="company" v-if="item.companyName">{{item.companyName}}</span>
                <span class="company" v-else>无公司名称</span>
                <span class="date">{{item.browseDate}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  import card from '@/components/card'
  export default {
    data () {
      return {
        statsA: [],
        statsB: [],
        statsC: [],
        statsD: [],
        tab: 1,
        tabA: 0,
        tabB: 0,
        tabC: 0,
        postForm: '',
        tagList: [],
        pageNumA: 1,
        lastPageA: '',
        nextPageA: '',
        pageNumB: 1,
        lastPageB: '',
        nextPageB: '',
        pageNumC: 1,
        lastPageC: '',
        nextPageC: '',
        pageNumD: 1,
        lastPageD: '',
        nextPageD: ''
      }
    },

    components: {
      card
    },
    onShow () {
      this.getInfoA(1)
    },
    onLoad () {
    },
    async onReachBottom () {
      if (this.tab === 1) {
        if (this.pageNumA < this.lastPageA) {
          this.pageNumA = this.nextPageA
          this.getInfoA(this.pageNumA)
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
      } else if (this.tab === 2) {
        if (this.pageNumB < this.lastPageB) {
          this.pageNumB = this.nextPageB
          this.getInfoB(this.pageNumB)
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
      } else if (this.tab === 3) {
        if (this.pageNumC < this.lastPageC) {
          this.pageNumC = this.nextPageC
          this.getInfoC(this.pageNumC)
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
      } else if (this.tab === 4) {
        if (this.pageNumD < this.lastPageD) {
          this.pageNumD = this.nextPageD
          this.getInfoD(this.pageNumD)
        } else {
          wx.showToast({
            title: '没有更多了',
            icon: 'none',
            duration: 2000
          })
        }
      }
    },
    methods: {
      // 点击跳转进入名片页
      goToCard (id) {
        if (id) {
          wx.navigateTo({
            url: `../../OthersCard/main?id=` + id
          })
        } else {
          wx.showToast({
            title: '该用户没有创建名片',
            icon: 'none',
            duration: 2000
          })
        }
      },
      // 获取数据
      getInfoA (id) {
        this.$fly.request({
          method: 'get',
          url: '/platformOperationRecord/selectForUser',
          body: {
            pageNum: id,
            pageSize: 10,
            recordType: 23,
            status: 0
          }
        }).then(res => {
          // console.log('res', res)
          this.statsA = res.data.list
          // 时间戳转换成特定日期格式
          let today = this.moment().format('YYYY/MM/DD')
          let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
          const newList = res.data.list
          newList.map(item => {
            let temp = this.moment(item.browseDate)
            let tempData = this.moment(item.browseDate).format('YYYY/MM/DD')
            if (tempData === today) {
              item.browseDate = temp.format('A hh:mm')
            } else if (tempData === yesterday) {
              item.browseDate = '昨天'
            } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.browseDate) {
              item.browseDate = temp.format('dddd')
            } else {
              item.browseDate = tempData
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取数据
      getInfoB (id) {
        this.$fly.request({
          method: 'get',
          url: '/platformOperationRecord/selectForUser',
          body: {
            pageNum: id,
            pageSize: 10,
            recordType: 22,
            status: 0
          }
        }).then(res => {
          this.statsB = res.data.list
          // 时间戳转换成特定日期格式
          let today = this.moment().format('YYYY/MM/DD')
          let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
          const newList = res.data.list
          newList.map(item => {
            let temp = this.moment(item.browseDate)
            let tempData = this.moment(item.browseDate).format('YYYY/MM/DD')
            if (tempData === today) {
              item.browseDate = temp.format('A hh:mm')
            } else if (tempData === yesterday) {
              item.browseDate = '昨天'
            } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.browseDate) {
              item.browseDate = temp.format('dddd')
            } else {
              item.browseDate = tempData
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取数据
      getInfoC (id) {
        this.$fly.request({
          method: 'get',
          url: '/platformOperationRecord/selectForUser',
          body: {
            pageNum: id,
            pageSize: 10,
            recordType: 24,
            status: 0
          }
        }).then(res => {
          this.statsC = res.data.list
          // 时间戳转换成特定日期格式
          let today = this.moment().format('YYYY/MM/DD')
          let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
          const newList = res.data.list
          newList.map(item => {
            let temp = this.moment(item.browseDate)
            let tempData = this.moment(item.browseDate).format('YYYY/MM/DD')
            if (tempData === today) {
              item.browseDate = temp.format('A hh:mm')
            } else if (tempData === yesterday) {
              item.browseDate = '昨天'
            } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.browseDate) {
              item.browseDate = temp.format('dddd')
            } else {
              item.browseDate = tempData
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取数据
      getInfoD (id) {
        this.$fly.request({
          method: 'get',
          url: '/platformOperationRecord/selectForUser',
          body: {
            pageNum: id,
            pageSize: 10,
            recordType: 23,
            status: 1
          }
        }).then(res => {
          this.statsD = res.data.list
          const data = res.data.list
          data.map(item => {
            this.statsD.push(item)
          })
          this.lastPageD = res.data.lastPage
          this.pageNumD = res.data.pageNum
          this.nextPageD = res.data.nextPage
          // 时间戳转换成特定日期格式
          let today = this.moment().format('YYYY/MM/DD')
          let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
          const newList = res.data.list
          newList.map(item => {
            let temp = this.moment(item.browseDate)
            let tempData = this.moment(item.browseDate).format('YYYY/MM/DD')
            if (tempData === today) {
              item.browseDate = temp.format('A hh:mm')
            } else if (tempData === yesterday) {
              item.browseDate = '昨天'
            } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.browseDate) {
              item.browseDate = temp.format('dddd')
            } else {
              item.browseDate = tempData
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      // 选择
      changTab (index) {
        if (index === 1) {
          this.getInfoA(1)
          this.tab = index
          this.status = index
        } else if (index === 2) {
          this.getInfoB(1)
          this.tab = index
          this.status = index
        } else if (index === 3) {
          this.getInfoC(1)
          this.tab = index
          this.status = index
        } else if (index === 4) {
          this.getInfoD(1)
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
