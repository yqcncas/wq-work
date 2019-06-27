<template>
  <div class="introduce">
    <div class="top" v-for="(item,index) in modelList" :key="index">
      <div class="industry" v-for="(itemA,_index) in item.modelMapList" :key="_index">
        <span class="title">{{ itemA.property }}</span>
        <span class="choose">
              <input v-model="itemA.propertyValue" placeholder="填写规格"/>
            </span>
      </div>
      <div class="textArea">
        <!--<textarea v-model="info" placeholder="填写产品介绍"></textarea>-->
        <div class="upload">
          <div class="title">
            <span class="product">型号图片</span>
            <span class="tips"></span>
          </div>
          <uploadImgModel ref="goodsImgUrlList" width="116rpx" height="116rpx" max="1" @choosed="choosed" :srcs="item.imgUrl" :key="index"></uploadImgModel>
        </div>
      </div>
      <div class="delete">
        <span class="save" @click="saveModel(item.id,item.goodsId,item.imgUrl,item.modelMapList,item.name,item.price)"><img src="../../../../static/images/down.png">保存</span>
        <span @click="deleteModel(item.id, index)" class="icont"><img src="../../../../static/images/delete.png">删除</span>
      </div>
    </div>
    <div class="footer">
      <button class="add" @click="addModel()">添加</button>
      <!--<button class="save" @click="getGoods()">确定</button>-->
    </div>
  </div>
</template>

<script>
  import { UPLOAD_API } from '@/api/uploadFile'
  import uploadImgModel from '@/components/uploadImgModel'
  export default {
    name: 'index',
    components: {
      uploadImgModel
    },
    data () {
      return {
        name: '',
        price: '',
        goodsImgUrlList: [],
        // modelList: [{
        //   modelMapList: '',
        //   name: '',
        //   price: '',
        //   imgUrl: ''
        // }],
        modelList: [],
        goodsStyleTypeId: '',
        imgUrl: '',
        goodsId: ''
      }
    },
    onLoad (options) {
      console.log(options)
      if (options.id) {
        this.goodsStyleTypeId = options.id
        this.getModelAll(this.goodsStyleTypeId)
        this.getGoodStyle(this.goodsStyleTypeId)
      }
      if (options.goodsId) {
        this.goodsId = options.goodsId
      }
    },
    methods: {
      // 删除规格
      deleteModel (id, index) {
        if (id) {
          this.$fly.request({
            method: 'POST', // post/get 请求方式
            url: '/goodsModel/deleteModel',
            body: {
              'id': id
            }
          }).then(res => {
            if (res.code === 200) {
              wx.showToast({
                title: '删除成功',
                duration: 2000,
                icon: 'none'
              })
              this.getModelAll()
            }
            console.log('delete', res)
          }).catch(err => {
            console.log(err)
          })
        } else {
          this.modelList.splice(index, 1)
        }
      },
      // 保存类型
      saveModel (id, goodsId, imgUrl, list, name, price) {
        console.log('IDDD', id)
        if (id !== undefined) {
          // console.log('list', JSON.parse(JSON.stringify(list).replace(/id/g, 'goodsModelId')))
          const listA = JSON.parse(JSON.stringify(list).replace(/id/g, 'goodsModelId'))
          const listB = JSON.parse(JSON.stringify(listA).replace(/goodsPropertyId/g, 'id'))
          console.log('list', listB)
          const token = wx.getStorageSync('token')
          wx.request({
            method: 'POST', // post/get 请求方式
            url: UPLOAD_API + '/goodsModel/saveModel',
            data: {
              'id': id,
              'imgUrl': this.goodsImgUrlList || imgUrl,
              'goodsId': goodsId,
              'goodsStyleTypeId': this.goodsStyleTypeId,
              'list': listB,
              'name': name,
              'price': price
            },
            header: {
              'token': token
            },
            success: function (res) {
              if (res.code === 200) {
                wx.showToast({
                  title: '保存成功',
                  duration: 2000,
                  icon: 'none'
                })
                this.getModelAll()
              }
              console.log(res.data)
            }
          })
        } else {
          // console.log('list', JSON.parse(JSON.stringify(list).replace(/id/g, 'goodsModelId')))
          const listA = JSON.parse(JSON.stringify(list).replace(/id/g, 'goodsStyleId'))
          console.log('list', listA)
          const token = wx.getStorageSync('token')
          wx.request({
            method: 'POST', // post/get 请求方式
            url: UPLOAD_API + '/goodsModel/saveModel',
            data: {
              'imgUrl': this.goodsImgUrlList || imgUrl,
              'goodsId': goodsId,
              'goodsStyleTypeId': this.goodsStyleTypeId,
              'list': listA,
              'name': name,
              'price': price
            },
            header: {
              'token': token
            },
            success: function (res) {
              console.log(res.data)
            }
          })
        }
      },
      // 查询所有规格
      getGoodStyle () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/goodsStyle/selectAll',
          body: {
            'goodsStyleTypeId': this.goodsStyleTypeId
          }
        }).then(res => {
          this.modelMapList = res.data
          console.log('this.modelMapList', this.modelMapList)
        }).catch(err => {
          console.log(err)
        })
      },
      // 查询所有商品类型
      getModelAll (id) {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/goodsModel/selectAll',
          body: {
            'goodsStyleTypeId': id
          }
        }).then(res => {
          this.modelList = res.data
          this.goodsImgUrlList = res.data.imgUrl
          console.log(' this.valueA', res.data)
        }).catch(err => {
          console.log(err)
        })
      },
      // 添加规格
      addModel () {
        this.modelList.push({ modelMapList: this.modelMapList, imgUrl: '', name: '', price: '', goodsId: this.goodsId })
      },
      // sha
      // deleteModel (index) {
      //   this.modelList.splice(index, 1)
      // },
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
@import "./style";
</style>
