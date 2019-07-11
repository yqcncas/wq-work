<template>
  <div class="msg-wrp">
    <div>
      <div class="top-msg-box">
        <div v-if="type === 'sale'" class="active-div" @click="activeMsg">
          <i class="iconfont icontuiguang-kuai"></i>
          <p>主动推送</p>
          <span class="num">{{msgNum}}</span>
        </div>
        <div @click="addWeChat" v-else>
          <i class="iconfont iconweixin3"></i>
          <p>加微信</p>
        </div>
        <div @click="makePhoneCall">
          <i class="iconfont iconcaozuo-dianhua"></i>
          <p>打电话</p>
        </div>
        <div @click="contactMe">
          <i class="iconfont icon51"></i>
          <p>联系我</p>
        </div>
      </div>
      <div class="msg-for-user">
        <div v-for="(item,i) in msgforuser" :key="i" class="box-ms">
          <p class="time-msg" v-if="i>0&&(msgforuser[i-1].sendTime!==item.sendTime)">{{item.sendTime}}</p>
          <p class="time-msg" v-if="i===0">{{item.sendTime}}</p>
          <div v-if="type=== 'sale'">
            <div v-if="item.toUserId !== userId" class="left">
              <div class="leftmsg">
                <img :src="item.avatarUrl" class="img-header" />
                <span class="white">
                  {{item.message}}
                </span>
              </div>
            </div>
            <div v-else-if="item.toUserId === userId" class="right">
              <div class="rightmsg">
                <span class="green">
                  {{item.message}}
                </span>
                <img :src="item.avatarUrl" class="img-header" />
              </div>
            </div>
          </div>
          <div v-else>
            <div v-if="item.toUserId !== userId" class="left">
              <div class="leftmsg">
                <img :src="item.avatarUrl" class="img-header" />
                <span class="white">
                  {{item.message}}
                </span>
              </div>
            </div>
            <div v-else-if="item.toUserId === userId" class="right">
              <div class="rightmsg">
                <span class="green">
                  {{item.message}}
                </span>
                <img :src="item.avatarUrl" class="img-header" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-box" :style="'bottom:'+(-height)+'px;'">
      <div class="bottom">
        <span class="common-word" @click="showList">常用语</span>
        <div class="input">
          <textarea class="area" v-model="paramStrs" cursor-spacing="20" :fixed="true" :auto-height="true"
            :adjust-position="false" @focus="focusTxt" @blur="blurTxt" />
          </div>
          <form report-submit='true' @submit='getFormID' class="form">
            <button form-type="submit"  @click="sendMsg(userId)" size="mini" :loading="sendLoad" :disabled="sendLoad">发送</button>
          </form>
      </div>
      <div class="word-box">
        <p class="btn-manage" @click="toManage" v-if="wordList.length===0">暂无常用语，点击去管理</p>
        <p class="item" v-for="(item,i) in wordList" :key="i" @click="getText" :data-text="item.message">{{item.message}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import apicustom from '@/api/person'
  import apiproducts from '@/api/product'
  import { resiverMsg } from '@/utils/socket'

  export default {
    data () {
      return {
        userHeadImg: '',
        salesManHeadImg: '',
        name: '苹果',
        pageNum: 1,
        lastPage: 100,
        nextPage: 1,
        pageSize: 5,
        id: '',
        userId: 0,
        myUseId: null,
        paramStrs: '',
        msgforuser: [],
        apiproducts: apiproducts,
        apicustom: apicustom,
        flag: true,
        pageNumA: '',
        msgs: [
          {
            name: '小蓝',
            id: 1,
            msg1: '17878945612',
            msg2: '温岭市',
            msg3: '2018-11-7',
            msg4: '万仟科技'
          }
        ],
        type: 'sale',
        sendLoad: false,
        userPhone: '',
        salesPhone: '',
        weChat: '',
        height: 159,
        wordList: [],
        selfId: '',
        msgNum: 0
      }
    },
    methods: {
      // 获取用户手机号
      getUserPhone () {
        // const userId = wx.getStorageSync('userId') // 获取本地userId
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformSalesman/selectSelfInfo',
          body: {
            'userId': this.userId
          }
        }).then(res => {
          if (res.code === 200) {
            if (res.data.phone !== '') {
              this.userPhone = res.data.phone
            }
          }
        }).catch(err => {
          console.log(err.status, err.message)
        })
      },
      // 插入雷达
      async insertOpera (info, recordType) {
        let businessId = wx.getStorageSync('businessId')
        let salesmanId = wx.getStorageSync('salesManId')
        let userId = wx.getStorageSync('userId')
        await apicustom.OperationInsert({ businessId, info, recordType, salesmanId, userId })
      },
      // 获取聊天数量
      async selectSendRecord () {
        let salesManId = wx.getStorageSync('salesManId')
        const result = await apicustom.selectSendRecord({ userId: this.userId, salesmanId: salesManId })
        this.msgNum = result.data
      },
      // 获取消息
      async activeMsg () {
        if (this.msgNum === 0) return
        let salesManId = wx.getStorageSync('salesManId')
        const { code } = await apicustom.sendMsgActive({ toUserId: this.userId, salesmanId: salesManId })
        if (code === 200) {
          this.msgNum = 0
        }
      },
      async getFormID (e) {
        await apiproducts.getFormid(e.target.formId)
      },
      toManage () {
        wx.navigateTo({
          url: `../comLangage/main?userId=${this.selfId}`
        })
      },
      //   常用语
      async getList () {
        this.selfId = wx.getStorageSync('userId')
        const { code, data, message } = await apicustom.customMsgList({ userId: this.selfId })
        if (code === 200) {
          this.wordList = data
        } else {
          wx.showToast({
            title: message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      getText (e) {
        this.paramStrs = e.currentTarget.dataset.text
      },
      focusTxt (e) {
        this.height = 159 - e.mp.detail.height
      },
      blurTxt () {
        this.height = 159
      },
      //   常用语
      showList () {
        if (this.height === 0) {
          this.height = 159
        } else {
          this.height = 0
        }
      },
      // 加微信
      addWeChat () {
        if (this.type !== 'sale') {
          if (this.weChat === null || this.weChat === '') {
            wx.showToast({
              title: '对方未填写微信号',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.setClipboardData({
              data: this.weChat,
              success: (res) => {
                wx.showToast({
                  title: '微信号复制成功',
                  icon: 'none',
                  duration: 2000
                })
                this.insertOpera('复制了微信', 18)
              }
            })
          }
        } else {
          wx.showToast({
            title: '业务员不能主动添加客户微信',
            icon: 'none',
            duration: 2000
          })
        }
      },
      // 呼叫电话
      makePhoneCall () {
        let phoneNumber = ''
        if (this.type === 'sale') {
          phoneNumber = this.userPhone
        } else {
          phoneNumber = this.salesPhone
        }
        if (phoneNumber === null || phoneNumber === '') {
          wx.showToast({
            title: '对方未填写电话',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.makePhoneCall({
            phoneNumber,
            success: () => {
              if (this.type !== 'sale') {
                this.insertOpera('拨打了电话', 20)
              }
            }
          })
        }
      },
      contactMe () {
        let phoneNumber = ''
        if (this.type === 'sale') {
          phoneNumber = this.salesPhone
        } else {
          phoneNumber = this.userPhone
        }
        console.log('phoneNumber', this.userPhone)
        wx.showModal({
          content: '发送消息（您好！我的联系方式是' + phoneNumber + '）',
          confirmColor: '#2a94ec',
          success: (res) => {
            if (res.confirm) {
              this.paramStrs = '您好！我的联系方式是' + phoneNumber
              this.sendMsg(this.userId)
            } else if (res.cancel) {
              wx.showToast({
                title: '已取消',
                icon: 'none',
                duration: 2000
              })
            }
          }
        })
      },
      onMessage (res) {
        console.log(res)
        this.eatinCart(res)
      },
      eatinCart (res) {
        if (this.height === 0) {
          this.height = 159
        }
        this.sendLoad = false
        this.pageNum = 1
        this.selectMsgForUser({ pageNum: 1, mode: 1 })
        this.paramStrs = ''
      },
      async sendMsg (id) {
        this.userId = id
        if (this.paramStrs === '') {
          return wx.showToast({
            title: '消息不能为空',
            icon: 'none',
            duration: 2000
          })
        }
        this.sendLoad = true
        let data = { cmd: 'platformChat', userId: this.selfId, toUserId: this.userId, msg: { msg: this.paramStrs } }
        resiverMsg(this, data)
      },
      async selectMsgForUser ({ type = 0, mode }) {
        // console.log('1', this.pageNum)
        let result = {}
        if (this.type === 'sale') {
          result = await apicustom.selectMsgForSales({ id: this.userId, pageNum: this.pageNum, pageSize: this.pageSize })
        } else {
          result = await apicustom.selectMsgForUser({ id: this.userId, pageNum: this.pageNum, pageSize: this.pageSize })
        }
        // console.log('userId', result)
        const code = result.code
        const data = result.data.list
        // this.userHeadImg = data.userHeadImg
        // // this.salesManHeadImg = data.salesManHeadImg
        // const phone = wx.getStorageSync('myPhone')
        // this.userPhone = phone
        // this.salesPhone = data.salesPhone
        // this.weChat = data.salesWeChat
        let today = this.moment().format('YYYY/MM/DD')
        let yesterday = this.moment(new Date()).add(-1, 'days').format('YYYY/MM/DD')
        if (code === 200) {
          data.map(item => {
            let temp = this.moment(item.sendTime)
            let tempData = this.moment(item.sendTime).format('YYYY/MM/DD')
            if (tempData === today) {
              item.sendTime = temp.format('A hh:mm')
            } else if (tempData === yesterday) {
              item.sendTime = '昨天 ' + temp.format('HH:mm')
            } else if (this.moment(Date.now() - 3 * 24 * 60 * 60 * 1000) < item.sendTime) {
              item.sendTime = temp.format('dddd HH:mm')
            } else {
              item.sendTime = temp.format('YYYY/MM/DD HH:mm')
            }
          })
          if (type === 0) {
            this.msgforuser = data
            if (mode === 1) {
              this.msgforuser.reverse()
            }
          } else {
            data.forEach(e => {
              this.msgforuser.unshift(e)
            })
          }
          this.lastPage = result.data.lastPage
          this.pageNum = result.data.pageNum
          this.nextPage = result.data.nextPage
        } else {
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    },
    async onPullDownRefresh () {
      if (this.pageNum < this.lastPage) {
        this.pageNum = this.nextPage
        this.selectMsgForUser({ type: 1 })
      } else {
        wx.showToast({
          title: '没有更多了',
          icon: 'none',
          duration: 2000
        })
      }
      wx.stopPullDownRefresh()
    },
    onLoad (options) {
      this.userId = +options.id
      this.getUserPhone()
      if (options.id) {
        this.type = 'sale'
        this.pageNum = 1
        // this.selectSendRecord()
      } else {
        this.type = 'custom'
      }
      // that.selectsalesman()
      this.selectMsgForUser({ pageNum: 1, mode: 1 })
      this.paramStrs = ''
    },
    onShow () {
      this.getList()
      this.salesPhone = wx.getStorageSync('myPhone')
    }
  }
</script>
<style lang="scss">
@import "style";
</style>
