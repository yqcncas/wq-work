<template>
  <div class="introduce">
    <div class="top" v-for="(item,index) in modelList" :key="index">
      <div class="industry">
        <span class="title">产品规格一</span>
        <span class="choose">
              <input v-model="item.modelOne" placeholder="填写规格"/>
            </span>
      </div>
      <div class="studs">
        <span class="title">产品规格二</span>
        <span class="choose">
              <input  v-model="item.modelTwo" type="number" placeholder="填写规格"/>
            </span>
      </div>
      <div class="textArea">
        <!--<textarea v-model="info" placeholder="填写产品介绍"></textarea>-->
        <div class="upload">
          <div class="title">
            <span class="product">型号图片</span>
            <span class="tips"></span>
          </div>
          <uploadImgModel ref="goodsImgUrlList" width="116rpx" height="116rpx" max="3" @choosed="choosed" :srcs="goodsImgUrlList" :key="index"></uploadImgModel>
        </div>
      </div>
      <div class="delete">
        <span v-if="modelList.length !== 1"  @click="deleteModel(index)" class="icont"><img src="../../../../static/images/delete.png">删除</span>
        <span class="save" @click="saveModel(index)"><img src="../../../../static/images/down.png">保存</span>
      </div>
    </div>
    <div class="footer">
      <button class="add" @click="addModel()">继续添加</button>
      <!--<button class="save" @click="getGoods()">确定</button>-->
    </div>
  </div>
</template>

<script>
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
        modelList: [{
          modelOne: '',
          modelTow: ''
        }]
      }
    },
    methods: {
      addModel () {
        this.modelList.push({ modelOne: '', modelTow: '' })
      },
      deleteModel (index) {
        this.modelList.splice(index, 1)
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
@import "./style";
</style>
