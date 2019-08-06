<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  onShow () {
    // wx.onSocketOpen(() => {
    //   wx.closeSocket()
    // })
    // var socketOpen = false
    // var socketMsgQueue = [1]
    // const userid = wx.getStorageSync('userId')
    // if (userid) {
    //   wx.connectSocket({
    //     url: Shop.WSS_URL
    //   })
    //   wx.onSocketOpen((res) => {
    //     console.log(32423)
    //     socketOpen = true
    //     for (var i = 0; i < socketMsgQueue.length; i++) {
    //       sendSocketMessage(socketMsgQueue[i])
    //     }
    //     socketMsgQueue = []
    //   })
    // }
    // function sendSocketMessage (msg) {
    //   if (socketOpen) {
    //     wx.sendSocketMessage({
    //       data: msg + 'mmm'
    //     })
    //   } else {
    //     socketMsgQueue.push(msg)
    //   }
    // }
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate((res) => {
      // 请求完新版本信息的回调
      console.log('update:' + res.hasUpdate)
      if (res.hasUpdate) {
        wx.showModal({
          title: '更新提示',
          content: '已有新的版本是否更新并重启？',
          showCancel: false,
          success: (res) => {
            if (res.confirm) {
              wx.showLoading({
                title: '应用重启中',
                mask: true
              })
              updateManager.onUpdateReady(() => {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                wx.hideLoading()
                updateManager.applyUpdate()
              })
              updateManager.onUpdateFailed(function () {
                // 新版本下载失败
                wx.hideLoading()
                wx.showModal({// 新的版本下载失败
                  title: '已经有新版本了哟~',
                  content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                })
              })
            }
          }
        })
      }
    })
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style lang="less">
  @import url(style/iconfont.css);
  page {
    height: 100%;
    background: #F2F2F2;
    font-family: PingFangSC-Regular, Helvetica, sans-serif;
  }
  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
    display: none;
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: ~'200rpx' 0;
    box-sizing: border-box;
  }
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }
  .pad-30 {
    padding: 0 ~'30rpx';
  }
  .pad-25-2 {
    margin: ~'12rpx' ~'25rpx';
  }
  .mar-30-2 {
    margin: ~'12rpx' ~'25rpx';
  }
  button {
    padding: 0;
    margin: 0;
  }
  button::after {
    border: none;
  }
  .button-hover,
  button {
    background-color: transparent;
  }

  .flexColumn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  /*page{*/
    /*display: table;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background: #F2F2F2!important;*/
  /*}*/
/*.container {*/
  /*height: 100%;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
  /*justify-content: space-between;*/
  /*padding: ~'200rpx' 0;*/
  /*box-sizing: border-box;*/
/*}*/
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
