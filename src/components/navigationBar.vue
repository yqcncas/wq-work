<template>
    <div class="comp-navbar">
        <!-- 占位栏 -->
        <cover-view class="placeholder-bar" :style="{height: navBarHeight + 'px'}"> </cover-view>
        <!-- 导航栏主体 -->
        <cover-view class="navbar" :style="{height: navBarHeight + 'px',backgroundColor:navBackgroundColor}">
            <!-- 状态栏 -->
            <cover-view class="nav-statusbar" :style="{height: statusBarHeight + 'px'}"></cover-view>
            <!-- 标题栏 -->
            <cover-view class="nav-titlebar" :style="{height: titleBarHeight + 'px' }">
                <!-- home及后退键 -->
                <cover-view class="bar-options" @click="backClick()">
                    <cover-view class="opt opt-back">
                      <cover-image class="back-image" :src="headImg"></cover-image>
                    </cover-view>
                    <cover-view class="opt opt-home">
                      <cover-view style="font-size: 20rpx">消息中心</cover-view><cover-view v-if="num !== 0" style="width: 22rpx;height: 22rpx;background:red;border-radius: 50rpx;color: #fff;font-size: 18rpx;padding: 4rpx;" ><cover-view style="text-align: center">{{num}}</cover-view></cover-view>
                    </cover-view>
                </cover-view>
                <!-- 标题 -->
                <cover-view class="bar-title" :style="[{color:titleColor}]">{{title}}</cover-view>
            </cover-view>
        </cover-view>
    </div>
</template>

<script>
  import personApi from '@/api/person'
  export default {
    props: {
      // 导航栏背景色
      navBackgroundColor: {
        default: 'transparent'
      },
      // 标题颜色
      titleColor: {
        default: '#000000'
      },
      // 标题文字
      title: {
        required: false,
        default: ''
      },
      // 是否显示后退按钮
      backVisible: {
        required: false,
        default: false
      },
      // home按钮的路径
      homePath: {
        required: false,
        default: ''
      }
    },
    data () {
      return {
        statusBarHeight: '', // 状态栏高度
        titleBarHeight: '', // 标题栏高度
        navBarHeight: '', // 导航栏总高度
        platform: '',
        model: '',
        brand: '',
        system: '',
        num: 0,
        headImg: 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png'
      }
    },
    beforeMount () {
      const self = this
      wx.getSystemInfo({
        success (system) {
          console.log(`system:`, system)
          self.statusBarHeight = system.statusBarHeight
          self.platform = system.platform
          self.model = system.model
          self.brand = system.brand
          self.system = system.system

          let platformReg = /ios/i
          if (platformReg.test(system.platform)) {
            self.titleBarHeight = 44
          } else {
            self.titleBarHeight = 48
          }

          self.navBarHeight = self.statusBarHeight + self.titleBarHeight
        }
      })
    },
    mounted () {
      // console.log(`this.backVisible:`, this.backVisible)
    },
    onLoad () {
      setInterval(() => {
        const that = this
        const num = wx.getStorageSync('msgNum')
        that.num = num
        // console.log('获取消息数量', that.num)
      }, 1000)
      this.getUnReadCount()
      this.getInfo()
    },
    onShow () {
      this.getUnReadCount()
    },
    methods: {
      // 页面加载信息
      getInfo () {
        this.userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': this.userId
          }
        }).then(res => {
          console.log('resa a a a ', res.data)
          if (res.data) {
            this.headImg = res.data.imgUrl
          } else {
            this.headImg = 'https://wqcdn.oss-cn-zhangjiakou.aliyuncs.com/default-avatar.png'
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 获取未读消息
      async getUnReadCount () {
        let salesManId = wx.getStorageSync('salesManId')
        const result = await personApi.selectUnReadCount({
          salesManId
        })
        this.num = result.data
        wx.setStorageSync('msgNum', this.num)
        // console.log('获取消息数量1', this.num)
      },
      // 获取未读消息数量
      getMsgNum () {
        const salesmanId = wx.getStorageSync('salesmanId')
        this.$fly.request({
          method: 'get',
          url: '/platformMessage/selectUnReadCount',
          body: {
            'salesmanId': salesmanId
          }
        }).then(res => {
          this.num = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      backClick () {
      },
      homeClick () {
        wx.redirectTo({
          url: this.homePath
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .comp-navbar {
    width: 100vw;
    .navbar {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 98;
      .nav-titlebar {
        // border: 1px solid green;
        width: 100%;
        height: 456rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .bar-options {
          // width: 87px;
          // height: 30px;
          width: 174rpx;
          height: 60rpx;
          display: flex;
          z-index: 102;
          // border: 1px solid hsla(0, 0%, 100%, .25);
          // border: 1px solid #ededed;
          box-sizing: border-box;
          align-items: center;
          justify-content: space-around;
          position: absolute;
          left: 7px;
          display: flex;
          align-items: center;
          background: hsla(0, 0%, 100%, 0.6);
          border-radius: 54rpx;
          padding-right: 5rpx;
          .opt {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .opt-back {
            .back-image {
              width: 45rpx;
              height: 45rpx;
              border-radius: 50rpx;
              float: left;
            }
          }
          .line {
            display: block;
            height: 30rpx;
            width: 1px;
            background-color: gray;
          }
          .opt-home {
            color: #ffffff;
            font-size: 14rpx;
            .home-image {
              height: 34rpx;
              color: #ffffff;
              float: left;
              z-index: 9;
            }
          }
        }
        .bar-title {
          width: 45%;
          font-size: 14px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
        }
      }
    }
    .placeholder-bar{
      background-color: transparent;
      width: 100%;
    }
  }
</style>
