<template>
  <div class="introduce">
    <div class="top" v-for="(item,index) in modelList" :key="index">
      <div class="industry">
        <span class="title">名称</span>
        <input v-model="item.name" class="choose" placeholder="请填写名称"/>
      </div>
      <div class="industry">
        <span class="title">价格</span>
        <input v-model="item.price" class="choose" placeholder="请填写价格"/>
      </div>
      <div class="industry" v-for="(itemA,_index) in item.modelMapList" :key="_index">
        <span class="title">{{ itemA.property }}</span>
        <span class="choose">
          <input v-model="itemA.propertyValue"  :placeholder="'请填写'+itemA.property" />
        </span>
      </div>
      <div class="textArea">
        <!--<textarea v-model="info" placeholder="填写产品介绍"></textarea>-->
        <div class="upload">
          <div class="title">
            <span class="product">型号图片</span>
            <span class="tips"></span>
          </div>
          <!--<uploadImgModel ref="goodsImgUrlList" width="116rpx" height="116rpx" max="1" @choosed="choosed" :srcs="item.imgUrl" ></uploadImgModel>-->
          <div class="j-pic-upload">
          <div class="j-upload-btn" @click="uploadImg(item.imgUrl,index)" :style="{'width':width || '120rpx','height':height || '120rpx'}">
            <i class="j-upload-add iconaddgrey iconfont"></i>
            <!--<p>插入图片</p>-->
          </div>
            <div class="model">
              <img @click="previewImg(index,item.imgUrl)" :key="index" :src="item.imgUrl" :style="{'width':width || '120rpx','height':height || '120rpx'}" class="img"  alt="">
              <span v-if="item.imgUrl!== ''" class="deleteA" @click="deleteImg(index)"><i class="iconfont iconshanchu-copy"></i></span>
            </div>
        </div>
        </div>
      </div>
      <div class="delete">
        <span class="save" v-if="disabled === true" @click="saveModel(item.id,item.goodsId,item.imgUrl,item.modelMapList,item.name,item.price,index)"><img src="../../../../static/images/down.png">保存</span>
        <span class="save" v-else @click="saveModel(item.id,item.goodsId,item.imgUrl,item.modelMapList,item.name,item.price,index)"><img src="../../../../static/images/down.png">保存</span>
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
  import { UPLOAD_API, UPLOAD_FILE } from '@/api/uploadFile'
  // import uploadImgModel from '@/components/uploadImgModel'
  export default {
    name: 'index',
    components: {
      // uploadImgModel
    },
    data () {
      return {
        urls: '',
        name: '',
        price: '',
        disabled: true,
        goodsStyleId: '',
        goodsImgUrlList: [],
        goodsImg: [],
        modelList: [{
          modelMapList: [],
          name: '',
          price: '',
          imgUrl: ''
        }],
        // modelList: [],
        goodsStyleTypeId: '',
        imgUrl: '',
        goodsId: ''
      }
    },
    onLoad (options) {
      if (options.goodsId) {
        this.goodsId = options.goodsId
      }
      if (options.id) {
        this.goodsStyleTypeId = options.id
        this.getModelAll(this.goodsStyleTypeId)
        this.getGoodStyle(this.goodsStyleTypeId)
      }
      console.log('11', this.goodsId)
    },
    methods: {
      uploadImg (url, index) {
        let that = this
        if (url === '') {
          wx.chooseImage({
            count: that.max || 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              // res.tempFilePaths.forEach(v => {
              //   that.urls.push({ imgUrl: v })
              // })
              const token = wx.getStorageSync('token')
              wx.uploadFile({
                url: UPLOAD_FILE + '?filedir=goodsModelImg',
                filePath: res.tempFilePaths[0],
                name: 'file',
                header: {
                  'Content-Type': 'image/jpeg',
                  token: token
                },
                methods: 'POST',
                success: (res) => {
                  // 上传成功之后再把图片的地址更新到个人信息接口
                  // that.urls.push({imgUrl: JSON.parse(res.data).data[0]})
                  // that.$emit('choosed', { all: that.urls })
                  // that.urls = JSON.parse(res.data).data[0]
                  that.modelList[index].imgUrl = JSON.parse(res.data).data[0]
                  console.log('aaa', that.urls)
                  // that.$emit('choosed', { all: that.urls, currentUpload: res.tempFilePaths })
                }
              })
            }
          })
        } else {
          wx.showToast({
            title: '只能上传一张图片',
            icon: 'none',
            duration: 2000
          })
        }
      },
      previewImg (index, url) {
        // let that = this
        wx.showActionSheet({
          itemList: ['预览'],
          success: function (res) {
            // console.log('55', res)
            const urlA = url.split()
            if (res.tapIndex === 0) {
              wx.previewImage({
                current: urlA[0],
                urls: urlA
              })
            }
          }
        })
      },
      // 删除型号图片
      deleteImg (id) {
        let that = this
        that.modelList[id].imgUrl = ''
      },
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
              this.getModelAll(this.goodsStyleTypeId)
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
      saveModel (id, goodsId, imgUrl, list, name, price, index) {
        this.goodsStyleId = id
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
              'imgUrl': imgUrl,
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
              if (res.data.code === 200) {
                wx.showToast({
                  title: '更新成功',
                  duration: 2000,
                  icon: 'none'
                })
                // that.getModelAll(this.goodsStyleTypeId)
              }
              // console.log('65', res)
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
              'imgUrl': imgUrl,
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
              if (res.data.code === 200) {
                wx.showToast({
                  title: '保存成功',
                  duration: 2000,
                  icon: 'none'
                })
                let that = this
                that.modelList[index].id = this.goodsStyleId
                // this.disabled = false
                // console.log('11', that.modelList[index].id)
                that.onLoad()
                // let that = this
                // let that = this
              }
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
            'goodsStyleTypeId': this.goodsStyleTypeId,
            'goodsId': this.goodsId
          }
        }).then(res => {
          this.modelMapList = res.data
          // console.log('this.modelMapList', this.modelMapList)
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
            'goodsStyleTypeId': id,
            'goodsId': this.goodsId
          }
        }).then(res => {
          this.modelList = res.data
          // this.goodsImgUrlList = res.data.imgUrl
          this.goodsImgUrlList = []
          const newData = res.data
          newData.map((item) => {
            this.goodsImgUrlList.push(item.imgUrl)
          })
          console.log(' this.valueA', this.goodsImgUrlList)
        }).catch(err => {
          console.log(err)
        })
      },
      // 添加规格
      addModel () {
        this.modelList.push({ modelMapList: this.modelMapList, imgUrl: '', name: '', price: '', goodsId: this.goodsId })
        this.goodsStyleId = ''
      },
      // sha
      // deleteModel (index) {
      //   this.modelList.splice(index, 1)
      // },
      choosed (val) {
        // 监听产品展示图片并添加到数组
        if (val.all) {
          this.goodsImgUrlList = val.all
          // console.log('val', val.all)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./style";
.j-pic-upload{
  padding: ~'10rpx'  ~'10rpx'  ~'10rpx' 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
}
.j-upload-btn{
  border: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: ~'20rpx';
}
.j-upload-add{
  font-weight: 500;
  color:#C9C9C9;
}
.model{
  position: relative;
  .img{
    margin:~'0rpx' ~'20rpx' ~'0rpx' 0;
  }
  .deleteA{
    position: absolute;
    right: ~'5rpx';
    top: ~'-10rpx';
  }
}
  .iconshanchu-copy{
    color: #999999;
  }
</style>
