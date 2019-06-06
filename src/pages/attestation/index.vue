<template>
  <div class="action">
      <div class="action-main">
        <p class="action-img"><img src="../../../static/images/renzheng.png"/> </p>
        <div class="message">
          <p class="action-name"><input v-model="companyName" :disabled="disabled" placeholder="企业名称"/></p>
          <p class="action-FdName"><input v-model="legalPersonaName" :disabled="disabled" placeholder="法定代表人姓名" /></p>
          <p class="action-RzName"><input v-model="name" :disabled="disabled" placeholder="认证人姓名" /></p>
          <p class="action-card"><input v-model="idCard" :disabled="disabled" placeholder="身份证号" /></p>
          <p class="action-jod"><input v-model="job" :disabled="disabled" placeholder="认证职位" /></p>
        </div>
      </div>
      <div class="footer">
        <button class="footer-btA" v-if="status === 0">审核中</button>
        <button class="footer-btA" v-else-if="status === 1">审核成功</button>
        <button class="footer-bt" @click="updateInfo" v-else-if="status === 2">重新审核</button>
        <button class="footer-bt" @click="getInfo" v-else>申请认证</button>
      </div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  components: {
    card
  },

  data () {
    return {
      companyName: '',
      legalPersonaName: '',
      name: '',
      idCard: '',
      job: '',
      disabled: false,
      status: ''
    }
  },
  onShow () {
    this.getSalesmanId()
    this.getInfomation()
  },
  methods: {
    // 查询salesmanId
    getSalesmanId () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get',
        url: 'server/platformSalesman/selectSelfInfo',
        body: {
          'userId': userId
        }
      }).then(res => {
        const salesmanId = res.data.id
        wx.setStorageSync('salesmanId', salesmanId)
      }).catch(err => {
        console.log(err)
      })
    },
    // 如果申请过 获取认证信息
    getInfomation () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get',
        url: 'server/certification/selectOne',
        body: {
          'userId': userId
        }
      }).then(res => {
        console.log('1', res)
        wx.setStorageSync('id', res.data.id)
        this.legalPersonaName = res.data.legalPersonaName
        this.name = res.data.name
        this.idCard = res.data.idCard
        this.companyName = res.data.companyName
        this.job = res.data.job
        this.status = res.data.status
        if (this.status === 0 || this.status === 1) {
          this.disabled = true
        } else if (this.status === 2) {
          this.disabled = false
        } else {
          console.log('111')
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 更新审核数据
    updateInfo () {
      const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
      const userId = wx.getStorageSync('userId') // 获取本地userId
      const salesmanId = wx.getStorageSync('salesmanId') // salesmanId
      const id = wx.getStorageSync('id') // salesmanId
      this.$fly.request({
        method: 'post', // post/get 请求方式
        url: 'server/certification/update',
        body: {
          'businessId': businessId,
          'userId': userId,
          'id': id,
          'salesmanId': salesmanId,
          'idCard': this.idCard,
          'status': 0,
          'companyName': this.companyName,
          'name': this.name,
          'job': this.job,
          'legalPersonaName': this.legalPersonaName
        }
      }).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '修改认证数据成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateBack(-1)
          }, 3000)
        }
      }).catch(err => {
        console.log(err)
        if (err === '请求失败') {
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 1000
          })
        }
      })
    },
    // 认证
    getInfo () {
      const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
      const userId = wx.getStorageSync('userId') // 获取本地userId
      const salesmanId = wx.getStorageSync('salesmanId') // salesmanId
      this.$fly.request({
        method: 'post', // post/get 请求方式
        url: 'server/certification/insert',
        body: {
          'businessId': businessId,
          'userId': userId,
          'salesmanId': salesmanId,
          'idCard': this.idCard,
          'companyName': this.companyName,
          'name': this.name,
          'job': this.job,
          'legalPersonaName': this.legalPersonaName
        }
      }).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '申请认证成功',
            icon: 'none',
            duration: 2000
          })
          setTimeout(function () {
            console.log('111')
            wx.navigateBack(-1)
          }, 3000)
        }
      }).catch(err => {
        console.log(err)
        if (err === '请求失败') {
          wx.showToast({
            title: '网络错误',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .action {
    width: 100%;
    height: 100%;
  }
  .action-main{
    width: 90%;
    height: ~'830rpx';
    background: #ffffff;
    display: block;
    margin: 5% auto;
    border-radius: ~'10rpx';
    position: relative;
  }
  .action-img{
    width: 100%;
    height: ~'400rpx';
  }
  .action-img img{
    width: 100%;
    height: ~'350rpx'
  }
  .message{
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .message p{
    font-size: ~'30rpx';
    padding: ~'20rpx';
    border-bottom: ~'1rpx' solid #CCCCCC;
  }
  .message p input{
    font-size: ~'30rpx';
    border: none;
    width: 100%;
    height: 100%;
  }
  .message p:last-child{
    border-bottom:none;
  }
  .footer{
    width: 90%;
    display: block;
    margin: ~'80rpx' auto;
  }
  .footer-bt{
    border: none;
    height: ~'97rpx';
    line-height: ~'97rpx';
    font-size: ~'30rpx';
    font-weight: 400;
    color: #ffffff;
    background: #FF6850;
  }
  .footer-btA{
    border: none;
    height: ~'97rpx';
    line-height: ~'97rpx';
    font-size: ~'30rpx';
    font-weight: 400;
    color: #ffffff;
    background: #CCCCCC;
  }
</style>
