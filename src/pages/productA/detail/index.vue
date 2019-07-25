<template>
  <div class="pro-detail">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="500">
      <block v-for="(item,index) in goodsImgList" :key="index">
        <swiper-item class="swiper-item">
          <image :src="item.imgUrl+'?x-oss-process=image/resize,limit_0,m_fill,w_750,h_750/quality,q_100'" class="slide-image"
            mode="aspectFill" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 收藏分享按钮 -->
    <div class="button-group flexRow">
      <p class="bg-wrap">
        <i class="iconfont" :class="[isCollect === 1 ? 'iconshoucang1' :'iconshoucang2']" @click="collect(id,isCollect)"></i>
      </p>
      <button open-type="share" class="share-btn bg-wrap">
        <i class="iconfont icon31zhuanfa" @click="shareGoods"></i>
      </button>
    </div>
    <!-- 标题 -->
    <div class="pro-d-title">
      <p class="price" v-if="priceStatus!==0"><span class="small-p">￥</span>{{price}}</p>
      <p class="name">{{name}}</p>
    </div>
    <!-- 选择型号 -->
    <div class="choose-model" @click="showType" v-if="goodmodel.length>0">
      <span class="text-choose">选择型号</span>
      <span class="c-model-d">{{modelText}}</span>
      <i class="iconfont icon-arrow-right"></i>
    </div>
    <!-- 围观人数 -->
    <div class="people-num flexRow" @click="routerTo(`./buyHis/main?browseCount=${browseCount}&goodsId=${goodsId}`)">
      <div class="left-p">
        <p>{{browseCount}}</p>
        <p class="txt">围观人数</p>
      </div>
      <div class="right-p flexRow">
        <image class="avatarUrl" v-for="(m,n) in avatarUrlList" :key="n" :src="m.avatarUrl" mode="aspectFill"></image>
        <p class="avatarUrl more" v-if="browseCount>12">
          <span class="radius" v-for="(i,j) in 3" :key="j"></span>
        </p>
      </div>
    </div>
    <!-- 富文本 -->
    <div class="rich-content">
       <!--<wx-parse :content="info" :imageProp="{mode:'widthFix'}" /> -->
      <div v-for="(item,index) in info" :key="index" :style="{'background':(item.name==='wText'?'#fff':'')}">
        <!-- 文字 -->
        <textWan :data="item.data" v-if="item.name==='wText'"></textWan>
         <!--图片单个-->
        <imgWan :data="item.data" v-if="item.name==='wImg'"></imgWan>
        <!--<imgWan :data="item" ></imgWan>-->
        <!-- 视频 -->
        <videoWan :data="item.data" v-if="item.name==='wVideo'"></videoWan>
        <!-- 最近购买 -->
        <buyJust :total="total" :data="buyList" v-if="item.name==='buyHis'&&total>0" @checkBuyDetail="checkBuyDetail"></buyJust>
        <!-- tabbar导航 -->
        <navBtn @productId="getJumpWay" :data="item.data" v-if="item.name==='wNav'" :marginB="true"></navBtn>
      </div>
    </div>
    <!-- 常见问题 -->
    <div class="common-problem" hidden>
      <div class="h">
        <div class="line"></div>
        <text class="title">常见问题</text>
        <div class="line"></div>
      </div>
      <div class="b">
        <div class="item" v-for="(item, index) in issueList" :key="index">
          <div class="question-box">
            <text class="spot"></text>
            <text class="question">{{item.question}}</text>
          </div>
          <div class="answer">
            {{item.answer}}
          </div>
        </div>
      </div>
    </div>
    <!-- 选择产品型号 -->
    <div v-show="showpop" @click="showType" class="pop" catchtouchmove="ture">
    </div>
    <div class="choose-model-flex" :class="[showpop ? 'fadeup' : '']" catchtouchmove="ture">
      <div class="box-two">
        <div class="top-box-model">
          <image class="model-img" v-show="index === flag3" v-for="(item,index) in goodmodel" :key="index" :src="item.imgUrl"
            mode="aspectFill"></image>
          <div class="detail-model">
            <p v-show="index === flag3" v-for="(item,index) in goodmodel" :key="index"><span class="left-title">价格：</span><span
                class="big-num price">￥{{item.price}}</span></p>
            <div v-for="(item,index) in goodmodel" :key="index" v-show="index === flag3">
              <p v-for="(k,i) in item.modelMapList" :key="i"><span class="left-title">{{k.property}}：</span><span class="big-num">{{k.propertyValue}}</span></p>
            </div>
          </div>
        </div>
        <div class="model-l-box">
          <div class="model-list">
            <span class="item-model" v-for="(item,index) in goodmodel" :key="index" @click="changeModalColor(index,item.name)"
              :class="clicknum === index? 'tored':''">{{item.name}}</span>
          </div>
          <!-- 数量 -->
          <div class="count">
            <div @click="reduce" class="cut">-</div>
            <input class="number" v-model="number" @input="countNumber" type="number" />
            <div @click="add" class="add">+</div>
          </div>
        </div>
      </div>
      <div class="cancel-bg">
        <div class="cancel-model" @click="showType">取消</div>
      </div>
    </div>
    <!-- 加入购物车 -->
    <div class="add-cart" v-if="buyStatus !== 0 || buyStatus == null">
      <div class="icon-box">
        <div class="icon-btn" @click="routerTo('../../pageA/cart/main')">
          <i class="iconfont iconshop-cart"><span class="tip-num" v-if="allnumber>0">{{allnumber}}</span></i>
          <p>购物车</p>
        </div>
        <div class="icon-btn" @click="routerTo(url)">
          <i class="iconfont iconpinglun"><span class="tip-num" v-if="msgNum>0">{{msgNum}}</span></i>
          <p>客服</p>
        </div>
      </div>
      <div class="add-btn common-btn" :class="{'disabled-bg':buyStatus===0}" @click="addCart">加入购物车</div>
      <div class="buy-now common-btn" :class="{'disabled-bg':buyStatus===0}" @click="buy">立即购买</div>
    </div>
    <div v-else class="add-cart">
      <div class="icon-box">
        <div class="icon-btn" @click="routerTo('/pages/OthersCard/main?id=' + salesmanIdA)">
          <!--<i class="iconfont iconshop-cart"><span class="tip-num" v-if="allnumber>0">{{allnumber}}</span></i>-->
          <i><img :src="salesmanHeadUrl"></i>
          <p>更多</p>
        </div>
      </div>
      <div class="add-btnA common-btnA"  @click="routerToA('/pages/msgcenter/main?id=' + userIdA)">咨询</div>
    </div>
  </div>
</template>
<script>
import addressApi from '@/api/address'
import productApi from '@/api/product'
import cartApi from '@/api/cart'
import personApi from '@/api/person'
import { getIsSalesMan } from '@/utils/index'
import textWan from '@/components/textWan'
import imgWan from '@/components/imgWan'
import videoWan from '@/components/videoWan'
import navBtn from '@/components/navBtn'
import buyJust from '@/components/buyJust'
export default {
  data () {
    return {
      modelText: '请选择型号',
      orderAddressId: '',
      goodsIdList: [],
      numList: [],
      goodsModelIdList: [],
      goodsId: '',
      modelId: null,
      modelName: '',
      allnumber: 0,
      isCollect: '',
      msgNum: 0,
      id: '',
      collectFlag: false,
      goodsImgList: [],
      status: 1,
      flag3: 0,
      clicknum: 0,
      goodmodel: [],
      salesmanHeadUrl: '',
      userId: '',
      tomodeimg: 'model1',
      number: 1,
      issueList: [{
        question: '如何保证质量问题？',
        answer: '如果发现质量问题七天内包退换'
      }, {
        question: '如何保证质量问题？',
        answer: '如果发现质量问题七天内包退换'
      }, {
        question: '如何保证质量问题？',
        answer: '如果发现质量问题七天内包退换'
      }, {
        question: '如何保证质量问题？',
        answer: '如果发现质量问题七天内包退换'
      }, {
        question: '如何保证质量问题？',
        answer: '如果发现质量问题七天内包退换'
      }
      ],
      salesmanIdA: '',
      showpop: false,
      title: '',
      time: '',
      banners: '',
      banners2: '',
      productApi: productApi,
      flag: false,
      name: '',
      info: '',
      imgurl: '',
      promotionPrice: '',
      price: '',
      isSalesMan: null,
      goodsModelId: null,
      url: '',
      businessId: '',
      salesmanId: '',
      userIdA: '',
      buyList: [],
      total: null,
      priceStatus: 0,
      buyStatus: null,
      browseCount: null,
      avatarUrlList: []
    }
  },
  components: {
    textWan,
    imgWan,
    videoWan,
    navBtn,
    buyJust,
    addressApi
  },
  methods: {
    getJumpWay (data) {
      if (data[1] === 1) {
        wx.navigateTo({
          url: '../detail/main?id=' + data[0]
        })
      } else if (data[1] === 2) {
        wx.navigateTo({
          url: `../../../pagesA/customPage/main?id=${data[0]}`
        })
      }
    },
    //   显示购买信息
    async getBuyDetail () {
      wx.showLoading({
        mask: true
      })
      const { code, data: { buyInfo: { list, total } } } = await productApi.getBuyDetail({ goodsId: this.id, pageNum: 1, pageSize: 5 })
      wx.hideLoading()
      if (code === 200) {
        this.buyList = list
        this.total = total
      }
    },
    //   分享
    shareGoods () {
      wx.updateShareMenu({
        withShareTicket: true,
        success () { }
      })
    },
    routerTo (url) {
      wx.navigateTo({
        url
      })
    },
    routerToA (url) {
      wx.navigateTo({
        url
      })
    },
    // 获取未读消息
    async getUnReadCount () {
      let salesManId = wx.getStorageSync('salesManId')
      const result = await personApi.selectUnReadCount({ salesManId, sendDir: (this.isSalesMan === 1 ? 0 : 1) })
      this.msgNum = result.data
    },
    // 跳转到查看商品购买记录的细节
    checkBuyDetail () {
      wx.navigateTo({
        url: './buydetail/main?goodsId=' + this.id
      })
    },
    // 关闭商品规格页面的X
    showType () {
      this.showpop = !this.showpop
    },
    // 增加数量
    add () {
      this.number = +this.number + 1
    },
    // 减少数量
    reduce () {
      if (this.number > 1) {
        this.number = +this.number - 1
      } else {
        this.number = 0
      }
    },
    // 数量输入框
    countNumber (e) {
      let value = e.target.value
      if (value === '' || value < 1) {
        this.number = 0
      } else if (+value.substr(0, 1) === 0) {
        this.number = +value.substr(1)
      }
    },
    // 收藏按钮的逻辑，如果标志位false表明没有加入收藏夹
    collect (id, flag) {
      if (flag === 0) {
        // this.praiseCount = 1
        const isCollect = 1
        this.getCollect(this.goodsId, this.goodsModelId, isCollect)
      } else {
        // this.deleteComment({ commentType: 2, commentgoodsid: id })
        // this.praiseCount = 0
        const isCollect = 0
        this.getCollect(this.goodsId, this.goodsModelId, isCollect)
      }
    },
    // 添加 取消 收藏
    getCollect (goodsId, goodsModelId, status) {
      const salesmanId = wx.getStorageSync('salesmanId')
      this.$fly.request({
        method: 'post', // post/get 请求方式
        url: '/platformGoods/collectGoods',
        body: {
          'goodsId': goodsId,
          'goodsModelId': goodsModelId,
          'isCollect': status,
          'salesmanId': salesmanId
        }
      }).then(res => {
        if (res.code === 200) {
          this.getProdDetail(goodsId)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 一个点击赞之后的收藏的按钮,数据库里增加赞的记录
    async addComment ({ commentType, commentgoodsid, commentuserid }) {
      await productApi.addComment({ commentType: commentType, commentgoodsid: commentgoodsid, commentuserid: commentuserid })
    },
    // 一个点击赞空白的按钮,数据库里取消赞的记录
    async deleteComment ({ commentType, commentgoodsid, commentuserid }) {
      await productApi.deleteComment({ commentType: commentType, commentgoodsid: commentgoodsid, commentuserid: commentuserid })
    },
    async buy () {
      if (this.buyStatus === 0) return
      if (this.modelText !== '请选择型号' || this.goodmodel.length === 0) {
        if (this.number === 0) {
          wx.showToast({
            title: '请选择商品数量', // 提示的内容,
            duration: 2000, // 延迟时间,
            icon: 'none',
            mask: true // 显示透明蒙层，防止触摸穿透,
          })
          return false
        }
        wx.showLoading({
          mask: true
        })
        this.goodsIdList = [{ id: this.goodsId, goodsModelId: this.modelId, buyCount: this.number }]
        wx.setStorageSync('setgoodsList', this.goodsIdList)
        const { code, data, message } = await cartApi.unified({ goodsList: this.goodsIdList })
        wx.hideLoading()
        if (code === 200) {
          this.showpop = false
          let addressDes = { name: data.userName, phone: data.phone, address: data.orderAddress, addressDetail: data.addressDetail }
          wx.setStorageSync('orderId', data.id)
          wx.setStorageSync('addressDes', addressDes)
          wx.setStorageSync('allprice', JSON.stringify(data.totalFee))
          wx.setStorageSync('goodsList', JSON.stringify(data.goodsList))
          wx.setStorageSync('payInfo', JSON.stringify(data.payInfo))
          wx.navigateTo({
            url: '/pages/pageA/order/main?buyWay=0&id=' + this.id
          })
        } else {
          wx.showToast({
            title: message,
            duration: 2000,
            icon: 'none'
          })
        }
      } else {
        wx.showToast({
          title: '请选择型号', // 提示的内容,
          duration: 2000, // 延迟时间,
          icon: 'none'
        })
        this.showpop = true
      }
    },
    // 加入购物的逻辑
    async addCart () {
      if (this.buyStatus === 0) return
      if (this.modelText !== '请选择型号' || this.goodmodel.length === 0) {
        // this.getProdDetail(this.id).then(res => {
        const result = cartApi.addCart({ 'goodsId': this.goodsId, 'number': this.number, 'modelId': this.modelId, 'modelName': this.modelName })
        if (result) {
          this.allnumber = this.allnumber + this.number
          wx.showToast({
            title: '添加购物车成功',
            icon: 'success',
            duration: 1500
          })
          this.showpop = false
          this.insertOpera('加入购物车', 4)
        }
        // })
      } else {
        wx.showToast({
          title: '请选择型号', // 提示的内容,
          duration: 2000, // 延迟时间,
          icon: 'none'
        })
        this.showpop = true
      }
    },
    // 插入雷达
    async insertOpera (info, recordType) {
      await personApi.OperationInsert({ businessId: this.businessId, goodsId: this.goodsId, info, recordType, salesmanId: this.salesmanId, userId: this.userId })
    },
    changeModalColor (index, name) {
      this.flag3 = index // 控制modal的显示，参数，图片，
      this.clicknum = index // 控制v-for出的所有按钮，点击的按钮显示红色
      this.modelText = name
      this.modelId = this.goodmodel[index].id
      this.modelName = this.goodmodel[index].name
      this.price = this.goodmodel[index].price
    },
    tomode2 () {
      this.tomodeimg = 'model2'
    },
    tomode3 () {
      this.tomodeimg = 'model3'
    },
    // 得到一个商品的详情
    async getProdDetail (id) {
      const result = await productApi.getProdDetail(id)
      console.log('44', result)
      this.goodsImgList = result.data.goodsImgList
      const gooddetail = result.data.goods
      this.goodmodel = result.data.goodsModels
      this.name = gooddetail.name
      wx.setNavigationBarTitle({
        title: this.name
      })
      this.salesmanIdA = result.data.goods.salesmanId
      // console.log('goodmodel', this.goodmodel)
      // this.info = gooddetail.info
      this.salesmanHeadUrl = result.data.salesmanHeadUrl
      this.userIdA = result.data.userId
      this.price = gooddetail.price.toFixed(2)
      this.promotionPrice = gooddetail.promotionPrice
      this.imgurl = gooddetail.imgUrl
      this.priceStatus = gooddetail.priceStatus
      this.buyStatus = gooddetail.buyStatus
      // 商品的model
      this.goodsId = gooddetail.id
      this.goodsModelId = gooddetail.goodsModelId
      this.isCollect = result.data.isCollect
      //   围观人数
      this.browseCount = result.data.userNum
      //   围观头像
      this.avatarUrlList = result.data.avatarUrlList
      // this.allnumber = gooddetail.allnumber
      // if (gooddetail.praiseCount > 0) {
      //   this.collectFlag = true
      // } else {
      //   this.collectFlag = false
      // }
      //   insert雷达
      this.businessId = wx.getStorageSync('businessId')
      this.salesmanId = wx.getStorageSync('salesManId')
      this.userId = wx.getStorageSync('userId')
      // this.insertOpera('查看了产品', 3)
      this.info = JSON.parse(JSON.parse(gooddetail.info).info)
      // console.log('445', JSON.parse(JSON.parse(gooddetail.info).info))
    },
    // 获取所有的购物车里的数量
    async getCartCount () {
      const result = await cartApi.getCartCount()
      this.allnumber = result.data.cartTotal.goodsCount
    },
    switchToPic () {
      this.flag = false
      this.status = 1
    },
    switchToComment () {
      this.flag = true
      this.status = 0
    }
  },
  onShareAppMessage (options) {
    const salesmanId = wx.getStorageSync('salesmanId')
    // console.log('a', salesmanId)
    return {
      title: this.name,
      path: 'pages/loading/main?goodsId=' + this.id + '&id=' + salesmanId + '&fromWay=1&prams=product'
    }
  },
  onLoad (options) {
    if (options.id) {
      console.log('options', options)
      this.getProdDetail(options.id)
    }
    // const id = options.id
    this.isSalesMan = getIsSalesMan()
    if (this.isSalesMan === 1) {
      this.url = '../../message/main?id='
    } else {
      this.url = '../../msgcenter/main?id='
    }
    this.clicknum = null
    this.modelText = '请选择型号'
    this.modelId = null
    this.modelName = ''
    this.flag3 = 0
    this.number = 1
    this.id = options.id
    this.collectFlag = false
    this.buyStatus = null
    this.getBuyDetail()
  },
  onShow () {
    this.getCartCount()
    this.getUnReadCount()
  },
  onUnload () {
    this.goodsImgList.length = 0
    this.info = ''
  }
}
</script>
<style lang="scss">
@import "./style.scss";
</style>
