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
          <!--<div class="studs">-->
            <!--<span class="title">产品分类</span>-->
            <!--<picker class="choose" mode="selector" :value="indexA" :range="valueA" range-key="typeName" @change="bindRegionChangeA(indexA)">-->
              <!--<span class="picker">{{ valueA[indexA].typeName}}<i class="iconfont Down iconyouce"></i></span>-->
            <!--</picker>-->
          <!--</div>-->
          <!--<div class="studs">-->
            <!--<span class="title">规格模板</span>-->
            <!--<picker class="choose" mode="selector" :value="indexB" :range="valueB" range-key="type" @change="bindRegionChangeB(indexB)" >-->
              <!--<span class="picker">{{ valueB[indexB].type }}<i class="iconfont iconyouce Down"></i></span>-->
            <!--</picker>-->
          <!--</div>-->
          <!--<div class="industry" @click="model()">-->
            <!--<span class="title">产品规格</span>-->
            <!--<span class="choose" >{{ choose }}<i class="iconfont iconyouce"></i></span>-->
          <!--</div>-->
          <div class="textArea">
            <!--<textarea v-model="info" placeholder="填写产品介绍"></textarea>-->
            <div class="upload">
              <div class="title">
                <span class="product">产品展示</span>
                <!--<span class="tips">最多展示三张，第一张为封面</span>-->
                <span class="tips"><uploadImg ref="goodsImgUrlList" width="120rpx" height="120rpx" max="3" @choosed="choosed" :srcs="goodsImgUrlList" ></uploadImg></span>
              </div>
            </div>
          </div>

          <div class="details" v-model="info">
            <span class="title">产品详情</span>
            <span class=""><uploadMore ref="MoreList" width="" height="100%" max="" v-model="info" @choosedMore="choosedMore" :srcs="MoreList" ></uploadMore></span>
          </div>
        </div>
        <div class="footer">
          <button class="save" @click="getGoods()">保存</button>
        </div>
    </div>
</template>

<script>
  import uploadImg from '@/components/uploadImg'
  import uploadMore from '@/components/uploadMore'
  export default {
    name: 'index',
    components: {
      uploadImg,
      uploadMore
    },
    data () {
      return {
        productId: '',
        typeName: '',
        type: '',
        valueA: [{
          typeName: ''
        }],
        valueB: [{
          type: ''
        }],
        MoreList: [],
        choose: '',
        imgUrl: '',
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
        info: '',
        secTradeIdA: '',
        secTradeIdB: ''
      }
    },
    onShow () {
      // this.getGoodA()
      // this.getGoodB()
    },
    onUnload () {
      this.MoreList = ''
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
      bindRegionChangeA (id) {
        this.secTradeIdA = this.valueA[id].id
        console.log('this.secTradeIdA', this.secTradeIdA)
      },
      bindRegionChangeB (id) {
        this.secTradeIdB = id
        console.log('this.secTradeIdB', this.secTradeIdB)
      },
      // 获取产品分类
      getGoodA () {
        const businessId = wx.getStorageSync('businessId')
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/goodsType/all',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          console.log('res', res)
          this.valueA = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取产品模板
      getGoodB () {
        const businessId = wx.getStorageSync('businessId')
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/goodsStyleType/selectAllForUser',
          body: {
            'businessId': businessId
          }
        }).then(res => {
          console.log('resB', res)
          this.valueB = res.data
        }).catch(err => {
          console.log(err)
        })
      },
      // 编辑产品型号
      model (id) {
        wx.navigateTo({
          url: `../productModel/main`
        })
      },
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
          this.info = JSON.parse(res.data.goods.info)
          this.MoreList = JSON.parse(res.data.goods.info)
          console.log('546545', this.MoreList)
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
                'imgUrl': this.imgUrl,
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
              'info': this.info,
              'imgUrl': this.imgUrl
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
          this.imgUrl = this.goodsImgUrlList[val.num].imgUrl
          console.log('valA', this.imgUrl)
        }
      },
      choosedMore (val) {
        // 监听产品展示图片并添加到数组
        if (val.all) {
          this.MoreList = val.all
          console.log('valA', val.all)
          this.info = JSON.stringify(this.MoreList)
          console.log('info', this.info)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import "style.less";
</style>
