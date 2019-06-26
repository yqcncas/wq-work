<template>
    <div class="introduce">
        <div class="top">
          <div class="industry">
            <span class="title">产品标题</span>
            <span class="choose">
              <input v-model="name" placeholder="填写标题"/>
            </span>
          </div>
          <div class="studs">
            <span class="title">产品价格</span>
            <span class="choose">
              <input  v-model="price" type="number" placeholder="填写价格"/>
            </span>
          </div>
          <div class="textArea">
            <textarea v-model="info" placeholder="填写产品介绍"></textarea>
            <div class="upload">
              <div class="title">
                <span class="product">产品展示</span>
                <span class="tips">最多展示三张，第一张为封面</span>
              </div>
            </div>
            <uploadImg ref="goodsImgUrlList" width="116rpx" height="116rpx" max="3" @choosed="choosed" :srcs="goodsImgUrlList" ></uploadImg>
          </div>
        </div>
        <div class="footer">
          <button class="save" @click="getGoods()">保存</button>
        </div>
    </div>
</template>

<script>
  import uploadImg from '@/components/uploadImg'
  export default {
    name: 'index',
    components: {
      uploadImg
    },
    data () {
      return {
        productId: '',
        goodsImgUrlListA: [{
          imgUrl: ''
        },
        {
          imgUrl: ''
        },
        {
          imgUrl: ''
        }],
        goodsImgUrlList: [],
        price: '',
        name: '',
        info: ''
      }
    },
    onShow () {
    },
    onLoad: function (options) {
      console.log(options)
      if (options.add === 1) {
      } else if (options.id) {
        this.editInfo(options.id)
        this.productId = options.id
      } else {
        this.name = ''
        this.price = ''
        this.info = ''
        this.productId = ''
        this.goodsImgUrlList = []
      }
    },
    onHide () {
    },
    methods: {
      // 编辑产品获取单个内容
      editInfo (id) {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/platformGoods/findOneForUser',
          body: {
            'id': id
          }
        }).then(res => {
          this.name = res.data.goods.name
          this.info = res.data.goods.info
          this.price = res.data.goods.price
          this.goodsImgUrlList = res.data.goodsImgList
        }).catch(err => {
          console.log(err)
          if (err === '请求失败') {
          }
        })
      },
      // 保存商品请求
      getGoods () {
        if (this.productId === '') {
          const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
          const userId = wx.getStorageSync('userId') // 获取本地userId
          const token = wx.getStorageSync('token') // 获取本地bussiness
          if (this.name === '') {
            wx.showToast({
              title: '请填入产品标题',
              icon: 'none',
              duration: 1000
            })
          } else if (this.price === '') {
            wx.showToast({
              title: '请填入产品价格',
              icon: 'none',
              duration: 1000
            })
          } else if (this.info === '') {
            wx.showToast({
              title: '请填入产品介绍',
              icon: 'none',
              duration: 1000
            })
          } else if (this.goodsImgUrlList.length === 0) {
            wx.showToast({
              title: '请上传产品展示图',
              icon: 'none',
              duration: 1000
            })
          } else {
            this.$fly.request({
              method: 'post', // post/get 请求方式
              url: '/platformGoods/add',
              body: {
                'token': token,
                'type': 0,
                'businessId': businessId,
                'userId': userId,
                'goodsImgUrlList': this.goodsImgUrlList,
                'name': this.name,
                'price': this.price,
                'info': this.info,
                'goodsStyleTypeId': 0
              }
            }).then(res => {
              if (res.code === 200) {
                wx.showToast({
                  title: '添加成功',
                  icon: 'none',
                  duration: 2000
                })
                setTimeout(function () {
                  wx.navigateBack(-1)
                }, 2000)
              }
            }).catch(err => {
              console.log(err)
              if (err === '请求失败') {
                wx.showToast({
                  title: '请稍后',
                  icon: 'none',
                  duration: 1000
                })
              }
            })
          }
        } else { // 保存编辑商品
          const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
          const userId = wx.getStorageSync('userId') // 获取本地userId
          const token = wx.getStorageSync('token') // 获取本地bussiness
          this.$fly.request({
            method: 'post', // post/get 请求方式
            url: '/platformGoods/update',
            body: {
              'token': token,
              'type': 0,
              'businessId': businessId,
              'userId': userId,
              'goodsStyleTypeId': 0,
              'id': this.productId,
              'goodsImgUrlList': this.goodsImgUrlList,
              'name': this.name,
              'price': this.price,
              'info': this.info
            }
          }).then(res => {
            if (res.code === 200) {
              wx.showToast({
                title: '修改成功',
                icon: 'none',
                duration: 2000
              })
              setTimeout(function () {
                wx.navigateBack(-1)
              }, 2000)
            }
          }).catch(err => {
            console.log(err)
            if (err === '请求失败') {
              wx.showToast({
                title: '请稍后',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      },
      choosed (val) {
        // 监听产品展示图片并添加到数组
        if (val.all) {
          this.goodsImgUrlList = val.all
          console.log('val', val.all)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import "style.less";
</style>
