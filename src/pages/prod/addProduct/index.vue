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
              <input  v-model="price" placeholder="填写价格"/>
            </span>
          </div>
          <div class="studs" v-if="edit !== '1'">
            <div v-if="valueA !== ''">
            <span class="title">产品分类</span>
            <picker class="choose" mode="selector" :value="indexA" :range="valueA" range-key="typeName" @change="bindPickerChangeA">
              <span class="picker">{{ valueA[indexA].typeName}}<i class="iconfont Down iconyouce"></i></span>
            </picker>
            </div>
          </div>
          <div class="studs" v-else @click="DonT()">
            <div v-if="valueA !== ''">
            <span class="title">产品分类</span>
              <span class="pickerA">{{ stylesName }}<i class="iconfont Down right iconyouce"></i></span>
            </div>
          </div>
          <div class="studs" v-if="edit !== '1'">
            <div v-if="valueB !== ''">
              <span class="title">规格模板</span>
              <picker class="choose" mode="selector" :value="indexB" :range="valueB" range-key="type" @change="bindPickerChangeB" >
                <span class="picker">{{valueB[indexB].type}}<i class="iconfont  iconyouce Down"></i></span>
              </picker>
            </div>
          </div>
          <div class="studs" v-else @click="DonT()">
            <span class="title">规格模板</span>
            <span class="pickerA">{{guiName}}<i class="iconfont iconyouce right Down"></i></span>
          </div>
          <div class="industry" @click="model()" v-if="edit == '1'">
            <div v-if="valueB !== ''">
            <span class="title">产品规格</span>
            <span class="choose" ><i class="iconfont iconyouce"></i></span>
            </div>
          </div>
          <div class="textArea">
            <!--<textarea v-model="info" placeholder="填写产品介绍"></textarea>-->
            <div class="upload">
              <div class="title">
                <span class="product">产品展示</span>
                <!--<span class="tips">最多展示三张，第一张为封面</span>-->
                <span class="tips"><uploadImg ref="goodsImgUrlList" width="120rpx" height="120rpx" max="3" @choosed="choosed" :srcs="goodsImgUrlList" :tabA="tabB" ></uploadImg></span>
              </div>
            </div>
          </div>
          <div class="goods-detail">
            <span class="title">产品详情</span>
            <div class="flexRow bottom-wrap">
              <div class="add-same flexColumn" @click="chooseImageList">
                <i class="iconfont icontupian"></i>
                <p>插入图片</p>
              </div>
            </div>
            <div v-for="(item,i) in infoImgList" :key="i" class="info-wrap" v-if="item.name==='wImg'">
              <image class="info-img" mode="widthFix" :src="item.data.pictureUrl"></image>
              <i class="iconfont iconshanchu-copy" @click="deleteImg(infoImgList,i)"></i>
            </div>
          </div>
          <!--<div class="details" v-model="info">-->
            <!--<span class="title">产品详情</span>-->
            <!--<span class=""><uploadMore ref="MoreList" width="" height="100%" max="" v-model="info" @choosedMore="choosedMore" :srcs="MoreList" ></uploadMore></span>-->
          <!--</div>-->
        </div>
        <div class="footer" v-if="status == true">
          <button class="save" @click="getGoods()">保存</button>
        </div>
      <div class="footer" v-else-if="status == false">
        <button class="save" @click="UpdateGoods()">更新</button>
      </div>
    </div>
</template>

<script>
  import uploadImg from '@/components/uploadImg'
  import uploadMore from '@/components/uploadMore'
  import { UPLOAD_FILE } from '@/api/uploadFile'
  export default {
    name: 'index',
    components: {
      uploadImg,
      uploadMore
    },
    data () {
      return {
        productId: '',
        // typeName: '',
        // type: '',
        valueA: [{
          typeName: ''
        }], // 分类
        guiName: '',
        stylesName: '',
        valueB: [{
          type: ''
        }], // 分类,
        indexB: 0,
        indexA: 0,
        status: true,
        MoreList: [],
        choose: '',
        imgUrl: '',
        tabB: '',
        params: {
          name: '',
          price: null,
          type: null,
          goodsStyleTypeId: null,
          goodsImgUrlList: [], // 产品展示
          imgUrl: '',
          info: '',
          businessId: null
        },
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
        typeId: 0,
        goodsStyleTypeId: '',
        edit: '',
        goodsId: '',
        coverImg: '',
        infoImgList: []
      }
    },
    onShow () {
      this.getGoodA()
      this.getGoodB()
    },
    onUnload () {
      this.MoreList = ''
      this.goodsImgUrlList = []
      this.edit = ''
      this.name = ''
      this.price = ''
      this.guiName = ''
      this.stylesName = ''
      this.productId = ''
      this.coverImg = ''
      this.imgUrl = ''
      this.status = true
      this.infoImgList = []
    },
    onLoad: function (options) {
      // this.coverImg = wx.getStorageSync('coverImg')
      // console.log('this.imgUrl', this.coverImg)
      console.log(options)
      if (options.id) {
        this.edit = options.edit
        // this.editInfo(options.id)
        this.productId = options.id
        this.goodsId = options.id
      }
      if (options.edit === '1') {
        this.edit = options.edit
        this.editInfo(options.id)
        this.productId = options.id
        this.goodsId = options.id
        this.status = false
      } else if (options.add === '1') {
        this.indexB = 0
        this.indexA = 0
        this.status = true
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
      // 禁止修改
      DonT () {
        wx.showToast({
          title: '禁止更改',
          duration: 2000,
          icon: 'none'
        })
      },
      // 获取产品类型
      getStyles (id) {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/goodsType/findOne',
          body: {
            'id': id
          }
        }).then(res => {
          this.stylesName = res.data.typeName
        }).catch(err => {
          console.log(err)
        })
      },
      // 获取规格模板
      getMu (id) {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/goodsStyleType/selectOne',
          body: {
            'id': id
          }
        }).then(res => {
          this.guiName = res.data.type
          this.goodsStyleTypeId = res.data.id
        }).catch(err => {
          console.log(err)
        })
      },
      chooseImageList () {
        wx.chooseImage({
          count: 9, // 一次最多可以选择的图片张数
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: (res) => {
            let successUp = 0 // 成功
            let failUp = 0 // 失败
            let length = res.tempFilePaths.length // 总数
            let count = 0 // 第几张
            this.uploadOneByOne(res.tempFilePaths, successUp, failUp, count, length)
          },
          fail: function () {
          },
          complete: function () {
          }
        })
      },
      uploadOneByOne (imgPaths, successUp, failUp, count, length) {
        const token = wx.getStorageSync('token')
        wx.showLoading({
          title: '正在上传第' + count + '张'
        })
        wx.uploadFile({
          url: UPLOAD_FILE + '?filedir=bannerImage',
          filePath: imgPaths[count],
          name: 'file',
          header: {
            'Content-Type': 'image/jpeg',
            token: token
          },
          methods: 'POST',
          success: (res) => {
            successUp++ // 成功+1
            // 上传成功
            this.infoImgList.push({
              data: {
                pictureUrl: JSON.parse(res.data).data[0]
              },
              name: 'wImg',
              type: 'img'
            })
          },
          fail: (res) => {
            failUp++ // 失败+1
          },
          complete: (res) => {
            count++ // 下一张
            if (count === length) {
              // 上传完毕，作一下提示
              console.log('上传成功' + successUp + ',' + '失败' + failUp)
              let info = {
                id: '',
                cardType: '',
                businessId: this.businessId,
                type: 7,
                name: 'goodEdit',
                status: 0,
                info: JSON.stringify(this.infoImgList)
              }
              this.info = JSON.stringify(info)
              wx.showToast({
                title: '上传成功' + successUp,
                icon: 'none',
                duration: 2000
              })
            } else {
              // 递归调用，上传下一张
              this.uploadOneByOne(imgPaths, successUp, failUp, count, length)
              console.log('正在上传第' + count + '张')
            }
          }
        })
      },
      // 删除图片
      deleteImg (arr, i) {
        arr.splice(i, 1)
        console.log('infoImgList', arr)
      },
      bindPickerChangeA (e) {
        this.indexA = parseInt(e.mp.detail.value)
        this.typeId = this.valueA[this.indexA].id
      },
      bindPickerChangeB (e) {
        this.indexB = parseInt(e.mp.detail.value)
        this.goodsStyleTypeId = this.valueB[this.indexB].id
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
          if (res.data) {
            this.valueA = res.data
            this.typeId = this.valueA[0].id
          }
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
          if (res.data) {
            this.valueB = res.data
            this.goodsStyleTypeId = this.valueB[0].id
          }
        }).catch(err => {
          console.log(err)
        })
      },
      // 编辑产品型号
      model (id) {
        if (this.secTradeIdB === '') {
          wx.showToast({
            title: '请选择规格模板',
            duration: 2000,
            icon: 'none'
          })
        } else {
          wx.navigateTo({
            url: `../productModel/main?id=` + this.goodsStyleTypeId + '&goodsId=' + this.goodsId
          })
        }
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
          console.log('res', res.data)
          this.name = res.data.goods.name
          this.info = JSON.parse(res.data.goods.info)
          this.MoreList = JSON.parse(res.data.goods.info)
          this.getStyles(res.data.goods.type)
          this.getMu(res.data.goods.goodsStyleTypeId)
          this.price = res.data.goods.price
          this.goodsImgUrlList = res.data.goodsImgList
          this.imgUrl = res.data.goods.imgUrl
          this.infoImgList = JSON.parse(JSON.parse(res.data.goods.info).info)
          // if (this.goodsImgUrlList.length > 0) {
          //   // const num = this.infoImgList.length
          //   this.goodsImgUrlList.map((item, index) => {
          //     const pictureUrl = item.imgUrl
          //     // console.log('1112', this.imgUrl)
          //     // console.log('2112', pictureUrl)
          //     if (this.imgUrl === pictureUrl) {
          //       console.log('index', index)
          //       this.tabB = index
          //     }
          //   })
          // }
        }).catch(err => {
          console.log(err)
          if (err === '请求失败') {
          }
        })
      },
      UpdateGoods () {
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
          let info = {
            id: '',
            cardType: '',
            businessId: this.businessId,
            type: 7,
            name: 'goodEdit',
            status: 0,
            info: JSON.stringify(this.infoImgList)
          }
          this.info = JSON.stringify(info)
          const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
          const userId = wx.getStorageSync('userId') // 获取本地userId
          const token = wx.getStorageSync('token') // 获取本地bussiness
          this.$fly.request({
            method: 'post', // post/get 请求方式
            url: '/platformGoods/update',
            body: {
              'token': token,
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
            console.log('resb', res)
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
      // 保存商品请求
      getGoods () {
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
              'type': this.typeId,
              'businessId': businessId,
              'userId': userId,
              'goodsImgUrlList': this.goodsImgUrlList,
              'name': this.name,
              'price': this.price,
              'info': this.info,
              'imgUrl': this.imgUrl,
              'goodsStyleTypeId': this.goodsStyleTypeId
            }
          }).then(res => {
            if (res.code === 200) {
              console.log('resA', res)
              wx.showToast({
                title: '添加成功',
                icon: 'none',
                duration: 2000
              })
              this.status = false
              setTimeout(function () {
                wx.navigateBack(-1)
              }, 2000)
            }
          }).catch(err => {
            console.log(err)
            if (err === '请求失败') {
              wx.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      },
      choosed (val) {
        // 监听产品展示图片并添加到数组
        this.goodsImgUrlList = []
        if (val.all) {
          this.goodsImgUrlList = val.all
          this.imgUrl = this.goodsImgUrlList[val.num].imgUrl
          // console.log('valA', this.imgUrl)
        }
        // const coverNum = wx.getStorageSync('coverNum')
        // console.log('coverNum', coverNum)
        // if (coverNum) {
        //   this.imgUrl = this.goodsImgUrlList[coverNum].imgUrl
        //   console.log('this.imgUrl', this.imgUrl)
        // }
      },
      choosedMore (val) {
        // 监听产品展示图片并添加到数组
        if (val.all) {
          this.MoreList = val.all
          // console.log('valA', val.all)
          this.info = JSON.stringify(this.MoreList)
          // console.log('info', this.info)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import "style.less";
</style>
