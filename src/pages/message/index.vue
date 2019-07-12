<template>
    <div class="message">
      <div class="cardHold-ftMain">
        <div v-if="commitInfo !== null || commitInfo.length !== 0 || commitInfo !== ''">
        <div class="cardHold-ftMain-ct" v-for="(item,index) in commitInfo" :key="index" @click="routeTo(item.toUserId)">
          <div class="center" @touchstart="touchStart($event)" @touchend="touchEnd($event,index)" :data-type="item.type" >
            <div class="cardHold-ftMain-ct-img" @click="recover(index)">
              <img :src="item.avatarUrl" aspectFit class="imgA"/>
              <a class="message" v-if="item.newMessageNum !== 0 || item.newMessageNum">
                {{item.newMessageNum}}
              </a>
            </div>
            <div class="cardHold-ftMain-rt" @click="recover(index)">
              <span class="name">{{ item.name }}</span>
              <span class="time">{{ item.sendTime }}</span>
              <p class="company">{{ item.message }}</p>
            </div>
            <div class="delete" @click="delect(index)">
              删除
            </div>
          </div>
        </div>
          <div class="footTabar">
            <section class="tabBar-wrap">
              <article class="tabBar-box">
                <ul class="tabBar-nav">
                  <li class="item" v-for="(item, index) in navList"
                      @click="selectNavItem(index,item.pagePath)"
                      :key="index">
                    <div>
                      <p class="item-images">
                        <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath">
                      </p>
                      <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
                        {{item.text}}
                      </p>
                    </div>
                  </li>
                </ul>
              </article>
            </section>
          </div>
          <div class="foundA" @click="goIndex()">
            <span>回到<br />首页</span>
          </div>
        </div>
        <div v-else class="fotter">
          <div>暂无任何消息通知</div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        navList: [
          {
            selectNavIndex: 0,
            pagePath: '/pages/pageA/radar/main',
            iconPath: '/static/images/radar.png',
            selectedIconPath: '/static/images/radar-se.png',
            text: '雷达'
          },
          {
            selectNavIndex: 1,
            pagePath: '/pages/message/main',
            iconPath: '/static/images/messgae.png',
            selectedIconPath: '/static/images/message-se.png',
            text: '消息'
          },
          {
            selectNavIndex: 2,
            pagePath: '/pages/pageA/custom/main',
            iconPath: '/static/images/personcard.png',
            selectedIconPath: '/static/images/personcard-se.png',
            text: '客户'
          },
          {
            selectNavIndex: 3,
            pagePath: '/pages/personal/main',
            iconPath: '/static/images/my.png',
            selectedIconPath: '/static/images/my-se.png',
            text: '我的'
          }
        ],
        selectNavIndex: 1,
        startX: 0,
        endX: 0,
        indexId: '',
        indexy: '',
        y: 0,
        toView: '',
        indexShow: false,
        scrollTop: 0,
        pageNum: '',
        pageSize: '',
        indexEnglish: '',
        commitInfo: []
      }
    },
    onShow () {
      this.getInfo(1)
      this.selectNavIndex = 1
    },
    async onPullDownRefresh () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.getInfo(this.pageNum)
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
      wx.stopPullDownRefresh()
    },
    methods: {
      // tarbar 选择
      selectNavItem (index, pagePath) {
        console.log(index)
        this.selectNavIndex = index
        if (index === this.selectNavIndex) {
          this.bindViewTap(index, pagePath)
          return false
        }

        // if (index === 0 && this.selectNavIndex === -1) {
        //   this.$emit('fetch-index')
        // }
      },
      // 返回首页
      goIndex () {
        wx.switchTab({
          url: '/pages/businesscard/main'
        })
      },
      /**
       * tabBar路由跳转
       */
      bindViewTap (index, url) {
        // if (url === '../index/main') {
        //   store.commit('setGroupsID', '');
        // }
        if (index === 1) {
        } else if (index === 3) {
          wx.switchTab({
            url
          })
        } else if (index === 0) {
          wx.reLaunch({
            url
          })
        } else {
          wx.reLaunch({
            url
          })
        }
      },
      // 获取消息
      getInfo (id) {
        this.commitInfo = []
        this.$fly.request({
          method: 'get',
          url: '/platformMessage/findListByUserId',
          body: {
            'pageNum': id,
            'pageSize': 10
          }
        }).then(res => {
          console.log('res', res)
          const data = res.data.list
          data.map(item => {
            this.commitInfo.push(item)
          })
          // this.commitInfo = res.data.list
          this.Message = res.data.list
          this.lastPage = res.data.lastPage
          this.pageNum = res.data.pageNum
          this.nextPage = res.data.nextPage
          // 时间戳转换成特定日期格式
          let today = this.moment().format('YYYY/MM/DD')
          let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
          const newList = res.data.list
          newList.map(item => {
            let temp = this.moment(item.sendTime)
            let tempData = this.moment(item.sendTime).format('YYYY/MM/DD')
            if (tempData === today) {
              item.sendTime = temp.format('A hh:mm')
            } else if (tempData === yesterday) {
              item.sendTime = '昨天'
            } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.sendTime) {
              item.sendTime = temp.format('dddd')
            } else {
              item.sendTime = tempData
            }
          })
        }).catch(err => {
          console.log(err)
        })
      },
      // 进入聊天界面
      routeTo (id) {
        wx.navigateTo({
          url: '../msgcenter/main?id=' + id
        })
      },
      touchStart (e) {
        // 获取移动距离，可以通过打印出e，然后分析e的值得出
        this.startX = e.mp.changedTouches[0].clientX
        console.log(this.startX)
      },
      touchEnd (e, index) {
        // 获取移动距离
        this.endX = e.mp.changedTouches[0].clientX
        if (this.startX - this.endX > 10) {
          for (let i = 0; i < this.commitInfo.length; i++) {
            this.commitInfo[i].type = 0
          }
          this.commitInfo[index].type = 1
        } else if (this.startX - this.endX < -10) {
          for (let i = 0; i < this.commitInfo.length; i++) {
            this.commitInfo[i].type = 0
          }
        }
      },
      // 恢复
      recover (index) {
        this.commitInfo[index].type = 0
      },
      // 删除
      delect (index) {
        this.commitInfo.splice(index, 1)
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
