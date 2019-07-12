<template>
    <div :class="pusherA">
      <div class="TopImg">
        <i @click="back()" class="iconfont iconE leftA"></i>
        <span>推客中心</span>
      </div>
      <div :class="Active">
        <div class="choose">
          <div v-for="(item,index) in pusher" :key="index"  :class="{'selected':tabA === item.id,'block':true}" @click="changTabMeberA(item.id)">
            <div class="flex">
              <div class="top">
                <span class="title">{{item.name}}</span>
                <span class="blue">￥{{item.price}}</span>
              </div>
              <div class="last">
                <span>{{item.title}}}</span>
              </div>
            </div>
            <div class="chooseImg">
              <img v-if=" tabA === item.id" class="choose" src="/static/images/Tchoose-se.png"/>
              <img v-else class="choose" src="/static/images/Tchoose.png"/>
            </div>
          </div>
          <div class="open" @click="open">
            <button>开通</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        pusher: [{
          id: 0,
          title: '直接比例:15%,间接比例:5%',
          name: '基础推客',
          price: '10.00'
        }, {
          id: 1,
          title: '直接比例:25%,间接比例:15%',
          name: '中级推客',
          price: '50.00'
        }, {
          id: 2,
          title: '直接比例:35%,间接比例:25%',
          name: '高级推客',
          price: '100.00'
        }
        ],
        tabA: 0,
        Active: 'main',
        pusherA: 'pusher'
      }
    },
    onShow () {
      this.height = wx.getSystemInfoSync().windowHeight
      console.log('height', this.height)
      if (this.height > 800 && this.height < 1000) {
        this.Active = 'mainA'
        this.pusherA = 'pusher'
      } else if (this.height > 1000 && this.height < 1025) {
        this.pusherA = 'pusherA'
        this.Active = 'mainB'
      } else if (this.height > 1025 && this.height < 1113) {
        this.pusherA = 'pusherA'
        this.Active = 'mainC'
      } else if (this.height > 1113 && this.height < 1367) {
        this.pusherA = 'pusherA'
        this.Active = 'mainD'
      } else {
        this.pusherA = 'pusher'
        this.Active = 'main'
      }
    },
    methods: {
      // 选择会员
      changTabMeberA (id) {
        if (this.tabA !== id) {
          this.tabA = id
        } else {
          this.tabA = ''
        }
        // this.tabA = id
      },
      // 返回上一页
      back () {
        wx.navigateBack(-1)
      },
      // 开通推客
      open () {
        wx.showToast({
          title: '功能还在开发中哦',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
</script>

<style scoped lang="less">
  @import "less";
</style>
