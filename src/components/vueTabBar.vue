<template>
  <section class="tabBar-wrap">
    <article class="tabBar-box">
      <ul class="tabBar-nav">
        <li class="item" v-for="(item, index) in navList"
            @click="selectNavItem(index,item.pagePath)"
            :key="index">
          <p class="item-images">
            <img :src="selectNavIndex === index ? item.selectedIconPath : item.iconPath" alt="iconPath">
          </p>
          <p :class="selectNavIndex === index ? 'item-text item-text-active' : 'item-text' ">
            {{item.text}}
          </p>
        </li>
        <!--<li v-if="needButton" style="flex: 3">-->
          <!--<div class="submit-box">-->
            <!--<button :disabled="!handButton"-->
                    <!--@click="bindNavigateTo('../order/main')"-->
                    <!--:class="handButton ? 'submit-box-btn submit-box-btn-active' : 'submit-box-btn' ">-->
              <!--{{ btnText }}-->
            <!--</button>-->
          <!--</div>-->
        <!--</li>-->
      </ul>
    </article>
  </section>
</template>

<script>
  export default {
    props: ['selectNavIndex', 'needButton', 'handButton', 'btnText'],
    data () {
      return {
        navList: [
          {
            pagePath: '../businesscard/main',
            iconPath: '/static/images/my.png',
            selectedIconPath: '/static/images/my-se.png',
            text: '我的名片'
          },
          {
            pagePath: '../logs/main',
            iconPath: '/static/images/personcard.png',
            selectedIconPath: '/static/images/personcard-se.png',
            text: '名片夹'
          },
          {
            pagePath: '../navigation/main',
            iconPath: '/static/images/more.png',
            selectedIconPath: '/static/images/more-se.png',
            text: '附近'
          },
          {
            pagePath: '../personal/main',
            iconPath: '/static/images/person.png',
            selectedIconPath: '/static/images/person-se.png',
            text: '个人中心'
          }
        ]
      }
    },
    created () {
    },
    methods: {
      /**
       * 点击导航栏
       * @param index
       */
      selectNavItem (index, pagePath) {
        console.log(index)

        if (index === this.selectNavIndex) {
          return false
        }

        if (index === 0 && this.selectNavIndex === -1) {
          this.$emit('fetch-index')
        }
        this.bindViewTap(pagePath)
      },

      /**
       * 路由跳转
       */
      bindNavigateTo (url) {
        wx.switchTab({
          url
        })
      },
      /**
       * tabBar路由跳转
       */
      bindViewTap (url) {
        // if (url === '../index/main') {
        //   store.commit('setGroupsID', '');
        // }
        wx.switchTab({
          url
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .tabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 99999;
    height: ~'80rpx';
    padding: ~'20rpx' 0;
    border-top: 1px solid #eee;
    background-color: #f8f8f8;
  }

  .tabBar-nav {
    width: 100%;
    display: flex;

    .item {
      flex: 1;
      text-align: center;
    }
    .item-text {
      color: #666;
      font-size: ~'20rpx';
      transition: .24s linear;
    }
    .item-text-active {
      color: #2A94EC;
    }

    .item-images {
      width: ~'55rpx';
      height: ~'55rpx';
      margin: 0 auto;
      text-align: center;
      transition: .24s linear;

      & img {
        display: inline;
        width: 100%;
        height: 100%;
      }
    }
  }

  /*.submit-box-btn {*/
    /*position: relative;*/
    /*z-index: 999;*/
    /*width: 85%;*/
    /*height: 90px;*/
    /*line-height: 90px;*/
    /*border-radius: 10px;*/
    /*color: #404040;*/
    /*font-size: 36px;*/
    /*border: none;*/
    /*background-color: #eee;*/
    /*text-align: center;*/
    /*border: 1px solid #eee;*/
  /*}*/

  /*.submit-box-btn-active {*/
    /*color: #fff;*/
    /*border: none;*/
    /*border: 1px solid #ff6c00;*/
    /*background-color: #ff6c00;*/
  /*}*/

  /*button {*/
    /*border: none;*/
    /*outline: none;*/
  /*}*/
</style>
