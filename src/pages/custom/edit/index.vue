<template>
  <div class="remark-bg">
    <div class="addaddress">
      <div class="item">
        <span>姓名</span>
        <input class="same-size" type="text" placeholder="请输入姓名" v-model="nickName" disabled>
      </div>
      <div class="item">
        <span>备注</span>
        <input class="same-size" type="text" placeholder="请输入备注" v-model="remarks">
      </div>
      <div class="item">
        <span>公司</span>
        <input class="same-size" type="text" placeholder="请输入公司" v-model="company">
      </div>
      <div class="item">
        <span>职位</span>
        <input class="same-size" type="text" placeholder="请输入职位" v-model="job">
      </div>
      <div class="item">
        <span>手机</span>
        <input class="same-size" type="text" placeholder="请输入手机" v-model="phone">
      </div>
      <div class="item">
        <span>固话</span>
        <input class="same-size" type="text" placeholder="请输入固话" v-model="fixed_phone">
      </div>
      <div class="item">
        <span>邮箱</span>
        <input class="same-size" type="text" placeholder="请输入邮箱" v-model="email">
      </div>
      <div class="item">
        <span>微信</span>
        <input class="same-size" type="text" placeholder="请输入微信" v-model="we_chat">
      </div>
    </div>
    <div class="itemend">
      <button class="wx-address" @click="routerBack()">返回</button>
      <button @click="updateRemark" class="save-btn">
        保存
      </button>
    </div>
  </div>
</template>
<script>
import apicustom from '@/api/person'
export default {
  data () {
    return {
      id: '',
      nickName: '',
      remarks: '',
      company: '',
      job: '',
      phone: '',
      fixed_phone: '',
      email: '',
      we_chat: '',
      user_id: '',
      businessId: '',
      flag: null,
      remarkid: '',
      items: []
    }
  },
  methods: {
    routerBack () {
      wx.navigateTo({
        url: '../detail/main?id=' + this.id
      })
    },
    async updateRemark () {
      const result = await apicustom.updateRemarks({
        userId: this.user_id,
        id: this.remarkid,
        company: this.company,
        email: this.email,
        job: this.job,
        fixedPhone: this.fixed_phone,
        phone: this.phone,
        remarks: this.remarks,
        weChat: this.we_chat
      })
      if (result.code === 200) {
        wx.navigateBack({
          delta: 1
        })
      }
      this.$nextTick(() => {
        this.selectAllUserRemarks()
      })
    },
    // 查找单个客户备注
    async selectOneUserRemarks () {
      const { data } = await apicustom.selectOneUserRemarks({ userId: this.id })
      this.company = (data.company === '' || data.company === 'string' || data.company === null ? '' : data.company)
      this.email = (data.email === '' || data.email === 'string' || data.email === null ? '' : data.email)
      this.fixed_phone = (data.fixed_phone === '' || data.fixed_phone === 'string' || data.fixed_phone === null ? '' : data.fixed_phone)
      this.phone = (data.phone === '' || data.phone === 'string' || data.phone === null ? '' : data.phone)
      this.job = (data.job === '' || data.job === 'string' || data.job === null ? '' : data.job)
      this.remarks = (data.remarks === '' || data.remarks === 'string' || data.remarks === null ? '' : data.remarks)
      // 可以提取出，2，3数字
      this.nickName = data.nickName
      this.we_chat = (data.we_chat === '' || data.we_chat === 'string' || data.we_chat === null ? '' : data.we_chat)
      this.businessId = data.business_id
      this.user_id = data.user_id
      this.remarkid = data.id
      this.selectAllUserRemarks()
    }
    // // 查找所有的标签列表
    // async selectAllUserRemarks () {
    //   let businessId = this.businessId
    //   const { data } = await apicustom.allTagGet(businessId)
    //   this.items = data
    // }
  },
  onLoad (options) {
    this.id = options.id
  },
  onShow () {
    // this.selectOneUserRemarks()
    // 查找所有的标签的时候，增加进去2,3,的checked的值为true
  }
}
  </script>
<style lang="scss">
@import "./style.scss";
</style>
