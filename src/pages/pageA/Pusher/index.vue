<template>
    <div class="pusher">
      <div class="TopImg">
        <i @click="back()" class="iconfont iconE leftA"></i>
        <span>推客中心</span>
      </div>
      <div class="mian">
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
        tabA: 0
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
