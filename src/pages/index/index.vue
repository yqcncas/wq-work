<template>
  <div class="modify">
    <el-form ref="postForm" :model="postForm" >
      <div class="TopImg">
        <img src="https://oss.tzyizan.com/salesInfo/201908191634331566203673875.png"/>
      </div>
      <div class="test">
        <i @click="back()" class="iconfont iconE leftA"></i>
        <div class="testNav">
          <div
            :class="{'selected':tab === 1,'testTitle':true}"
            @click="changTab(1)"
          >基础</div>
          <div
            :class="{'selected':tab === 2,'testTitle':true}"
            @click="changTab(2)"
          >形象</div>
          <div
            :class="{'selected':tab === 3,'testTitle':true}"
            @click="changTab(3)"
          >简介</div>
          <div
            :class="{'selected':tab === 4,'testTitle':true}"
            @click="changTab(4)"
          >照片</div>
          <div
            :class="{'selected':tab === 5,'testTitle':true}"
            @click="changTab(5)"
          >视频</div>
        </div>
        <div class="cont">
          <div v-if="tab===1">
            <div class="Basics">
              <div class="Basis-main">
                <div>
                  <label>姓名</label>
                  <input v-model="name" placeholder="请输入姓名"/>
                </div>
                <div>
                  <label>公司</label>
                  <input v-model="salesCompanyName" placeholder="请输入公司"/>
                </div>
                <div class="pak">
                  <label>行业</label>
                  <!--<picker mode="multiSelector" class="pick-region" @columnchange="bindchange"  @change="bindcolumnchange" :range="TradeData" :range-key = 'pid' :value="multiIndex">-->
                  <div class="pick"  @click="showMulLinkageTwoPicker">
                    <text type="text" @click="showMulLinkageTwoPicker"  placeholder="请输入行业" class="picker">{{pickerText}}</text>
                    <!--<i class="iconfont iconyouce"></i>-->
                  </div>
                  <mpvue-picker ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" :themeColor="themeColor" @onChange="onChange" @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerValueArray"></mpvue-picker>

                  <!--</picker>-->
                </div>
                <div>
                  <label>职位</label>
                  <input v-model="job" placeholder="请输入职位"/>
                </div>
                <div>
                  <label>手机</label>
                  <input v-model="phone" placeholder="请输入手机" type="number"/>
                </div>
                <div>
                  <label>固话</label>
                  <input v-model="fixedPhone" placeholder="请输入固话"/>
                </div>
                <div>
                  <label>邮箱</label>
                  <input v-model="email" placeholder="请输入邮箱"/>
                </div>
                <div>
                  <label>微信</label>
                  <input v-model="weChat" placeholder="请输入微信"/>
                </div>
                <div>
                  <label>地址</label>
                  <picker mode="region" class="pick-region" @change="bindRegionChange" :value="region">
                    <view type="text" placeholder="省份、城市、区县" class="pick-item-s">{{address}}</view>
                    <i class="iconfont iconyouce"></i>
                  </picker>
                </div>
                <div class="address">
                  <label>定位</label>
                  <input v-model="addDetailed"/>
                  <p @click="chooseLocation()">
                    <!--<img src="../../../static/images/map.png">-->
                    <i class="iconfont icondingweiweizhi"></i>
                  </p>
                </div>
                <!--<div class="address">-->
                  <!--<p @click="chooseLocation()">-->
                    <!--<img src="../../../static/images/map.png">-->
                  <!--</p>-->
                  <!--<input v-model="addDetailed"/>-->
                <!--</div>-->
              </div>
              <div class="Basics-footer">
                <submit class="back" @click="back()">返回</submit>
                <button v-if="isBuy === 0" class="save" @click="getSalesmanUpdate()">保存</button>
                <button v-else class="save" :disabled="disabled" @click="getBuyCard()">保存</button>
              </div>
            </div>
          </div>
          <div  v-else-if="tab===2">
            <div class="Basics">
              <div class="Basics-main">
                  <div class="vivid">
                      <div class="vivid-img">
                        <div class="img">
                          <i class="magnifier iconfont icon-fangdajing" @click="previewImg"></i>
                          <img :src="imgUrl">
                        </div>
                      </div>
                      <div class="vivid-name">
                        <span>{{ name === '' ? nick_Name:nickName }}</span>
                      </div>
                      <div class="vivid-job">
                        <span v-if="job">{{ job }}</span>
                      </div>
                      <div class="vivid-company">{{ salesCompanyName }}</div>
                      <div class="vivid-footer">
                        <button @click="chooseImage()">点击上传</button>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          <div  v-else-if="tab===3">
            <div class="intro-wrap">
              <open-data class="header-img" type="userAvatarUrl"></open-data>
              <text v-if="info === ''" class="text-area">{{infoA}}</text>
              <text v-else class="text-area">{{info}}</text>
              <p class="here-txt" @click="routeTo(info)">不会写简介？戳这里<i class="iconyouce iconfont"></i></p>
              <!-- 语音 -->
              <div class="voice-box ">
                <!--<i class="iconfont icon-yuyinqiehuan" @click="play"></i>-->
                <i class="YuYin iconfont iconyuyin" @click="play"></i>
                <div>
                  <p class="intro-p">语音介绍</p>
                  <div class="center-re">
                    <div class="small-wrap" :style="animal" :class="{'animal-point':animal!==''}">
                      <p class="small-radius"></p>
                    </div>
                    <p class="line"></p>
                  </div>
                  <p class="time-double">
                    <span>00:00</span>
                    <span class="voiceTime">{{voiceTime}}</span>
                  </p>
                </div>
                <div class="right-voice">
                  <span @click="cancelVoice">删除</span>
                  <span class="shu-line">|</span>
                  <span @click="voiceControl">{{voiceTxt}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else-if="tab===4" class="mainBT">
            <div class="photo">
              <div class="photo-main">
                <div class="box-photo">
                  <div v-for="(item,index) in richTextList" :key="index" class="box-img" :class="{'box-img-1':index===1,'box-img-2':index===2}">
                    <div class="item-box-img">
                      <div>
                        <i class="delete-img iconfont iconshanchu-copy" @click="deleteImgList(index)"/>
                        <img class="up-img-0" v-if="index===0" :src="item" mode="aspectFill">
                        <img class="up-img-1" v-else-if="index===1||index===2" :src="item" mode="aspectFill">
                        <img class="up-img-2" v-else :src="item" mode="aspectFill">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wuA" v-if="richTextList.length == 0">
                暂无照片请上传！
              </div>
            </div>
            <div>
              <submit class="img-btn-up" @click="chooseImageList">上传图片</submit>
            </div>
          </div>
          <div v-else>
            <div class="videos">
              <div class="videos-main">
                <div class="up-video">
                  <video id="myVideo" v-if="videoFlag" :src="video" @play="playA()" @ended=" end()" autoplay objectFit="fill" class="cover-hw"></video>
                  <div v-else class="cover-view" >
                    <div v-if="video!== '' && video!== null" @click="videoPlay">
                      <i class="delete-img iconfont iconshanchu-copy" @click="deleteVideo"></i>
                      <img class="FMimg" :src="videoImg" mode="scaleToFill" />
                      <div class="model-btn">
                        <div class="play-icon">
                        </div>
                      </div>
                    </div>
                    <div class="wu" v-else>
                      暂无视频请上传！
                    </div>
                  </div>
                </div>
              </div>
              <submit class="img-btn-up1" @click="chooseVideo">上传视频</submit>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import personApi from '@/api/person'
import card from '@/components/card'
import mpvuePicker from 'mpvue-picker'
import { UPLOAD_FILE, UPLOAD_API } from '@/api/uploadFile'
const innerAudioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()
export default {
  data () {
    return {
      mode: 'selector',
      deepLength: 2, // 几级联动
      pickerValueDefault: [0, 0], // 初始化值
      pickerValueArray: [], // picker 数组值
      pickerText: '',
      themeColor: '', // 颜色主题
      isBuy: '', // 控制是否支付
      disabled: false,
      mulLinkageTwoPicker: [
        {
          label: '飞机票',
          value: 0,
          children: [
            {
              label: '经济舱',
              value: 1
            },
            {
              label: '商务舱',
              value: 2
            }
          ]
        },
        {
          label: '火车票',
          value: 1,
          children: [
            {
              label: '卧铺',
              value: 1
            },
            {
              label: '坐票',
              value: 2
            },
            {
              label: '站票',
              value: 3
            }
          ]
        },
        {
          label: '汽车票',
          value: 3,
          children: [
            {
              label: '快班',
              value: 1
            },
            {
              label: '普通',
              value: 2
            }
          ]
        }
      ],
      tab: 1,
      info: '',
      personApi: personApi,
      nickName: '',
      infoA: '还没有简介吧？快去填写，让更多人认识你，了解你',
      num: 0,
      richTextList: [],
      richImg: '',
      videoImg: '',
      timeControl: '',
      longitude: '',
      latitude: '',
      time: '',
      address: ['北京市', '北京市', '东城区'],
      name: '',
      salesCompanyName: '',
      salesAddress: '',
      TradeData: [[], []],
      Data: [],
      multiArray: [],
      Trade: [],
      job: '',
      phone: '',
      imgUrl: 'https://oss.wq1516.com/default-avatar.png',
      fixedPhone: '',
      email: '',
      userId: '',
      weChat: '',
      playVoiceFlag: false,
      videoFlag: false,
      recordFlag: true,
      addDetailed: '',
      currentAudio: '',
      isDisable: false, // 表单重复提交
      voiceTime: '00:00',
      Yid: '', // 业务员id
      animal: '',
      region: '北京市北京市东城区',
      // region: [],
      regionA: [],
      multiIndex: [0, 0],
      voiceUrl: '',
      pan: false,
      video: '',
      voice: '',
      voiceTxt: '录音',
      salesManId: null,
      tagList: [],
      column: 0,
      tradeId: 0,
      phoneIp: ''
    }
  },

  components: {
    card,
    mpvuePicker
  },
  onShow () {
    // this.videoFlag = false
    this.isBuy = wx.getStorageSync('isBuy')
  },
  onLoad () {
    this.getInfo()
    this.getTrade()
    this.getIp()
  },
  methods: {
    // 查询是否购买mingp
    getBuyCard () {
      // console.log('11111')
      this.disabled = true
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/platformOrder/selectIsBuyCard',
        body: {
          'name': '9.9元名片创建费用'
        }
      }).then(res => {
        if (res.data === 1) {
          this.getSalesmanUpdate()
          this.isBuy = 0
          this.disabled = false
        } else {
          this.disabled = true
          this.getPlay()
        }
      }).catch(err => {
        this.disabled = false
        console.log(err)
      })
    },
    // 获取logo
    getBuy () {
      const businessId = wx.getStorageSync('businessId') // 获取本地userId
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/business/findById',
        body: {
          'businessId': businessId
        }
      }).then(res => {
        this.disabled = false
        this.isBuy = 0
        wx.setStorageSync('isBuy', this.isBuy)
      }).catch(err => {
        console.log(err)
      })
    },
    // 获取Ip地址
    getIp () {
      wx.request({
        url: 'http://ip-api.com/json',
        success: function (e) {
          let that = this
          that.phoneIp = e.data.query
          wx.setStorageSync('phoneIp', that.phoneIp)
        }
      })
    },
    // 订单支付接口
    pay (payInfo) {
      wx.requestPayment(
        {
          'timeStamp': payInfo.timeStamp,
          'nonceStr': payInfo.nonceStr,
          'package': payInfo.packageValue,
          'signType': 'MD5',
          'paySign': payInfo.paySign,
          'success': (res) => {
            this.getSalesmanUpdate()
            this.isBuy = 0
            this.getBuy()
            // this.insertOpera('支付了产品', 6)
          },
          'fail': (res) => {
            this.isBuy = 1
            this.disabled = false
          },
          'complete': function (res) {
          }
        })
    },
    getPlay (ip) {
      const phoneIp = wx.getStorageSync('phoneIp')
      this.$fly.request({
        method: 'post', // post/get 请求方式
        url: '/platformOrder/unifiedForCreateCard',
        body: {
          'goodsList': [],
          'name': '9.9元名片创建费用',
          'getWay': '自取',
          'unifiedOrderRequest': {
            'spbillCreateIp': phoneIp,
            'body': '9.9元名片创建费用'
          },
          'userName': this.nickName
        }
      }).then(res => {
        if (res.code === 200) {
          this.pay(res.data.payInfo)
        }
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
    // 切换
    changTab (index) {
      if (index === 1) {
        this.tab = index
        this.status = index
        innerAudioContext.stop()
        this.getInfo()
      } else if (index === 2) {
        this.tab = index
        this.status = index
        innerAudioContext.stop()
        this.getInfo()
      } else if (index === 3) {
        this.tab = index
        this.status = index
        this.getInfo()
      } else if (index === 4) {
        this.tab = index
        this.status = index
        this.getInfo()
        innerAudioContext.stop()
      } else {
        this.tab = index
        this.status = index
        this.getInfo()
        innerAudioContext.stop()
        this.videoFlag = false
        this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
      }
    },
    // 跳转到个人简介编辑
    routeTo (info) {
      wx.navigateTo({
        url: `../profile/main?id=${this.Yid}&userId=${this.userId}&name=${this.name}&info=${info}`
      })
    },
    // 返回上一页
    back () {
      wx.switchTab({
        url: '../personal/main'
      })
      innerAudioContext.pause()
    },
    // 预览图片
    previewImg () {
      let list = []
      if (this.imgUrl || this.imgUrl !== '') {
        list.push(this.imgUrl)
        wx.previewImage({
          current: this.imgUrl,
          urls: list
        })
      } else {
        wx.showToast({
          title: '请先上传图片',
          icon: 'none',
          duration: 2000
        })
      }
    },
    // 上传形象
    chooseImage (e) {
      wx.chooseImage({
        count: 1, // 一次最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          this.imgUrl = res.tempFilePaths[0]
          /** 上传完成后把文件上传到服务器 */
          const token = wx.getStorageSync('token')
          wx.uploadFile({
            url: UPLOAD_FILE + '?filedir=salesManImg',
            filePath: res.tempFilePaths[0],
            name: 'file',
            header: {
              'Content-Type': 'image/jpeg',
              token: token
            },
            methods: 'POST',
            success: (res) => {
              this.imgUrl = JSON.parse(res.data).data[0]
              wx.hideLoading()
              // 上传成功之后再把图片的地址更新到个人信息接口
              this.getSalesmanUpdate()
            },
            fail: (res) => {
            }
          })
        }
      })
    },
    // 选择照片列表组
    chooseImageList (e) {
      wx.chooseImage({
        count: 9, // 一次最多可以选择的图片张数
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: (res) => {
          this.imgUrl = null
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
    playA () {
      this.videoFlag = true
    },
    // 播放结束
    end () {
      this.videoFlag = false
    },
    // 上传图片
    uploadOneByOne (imgPaths, successUp, failUp, count, length) {
      const token = wx.getStorageSync('token')
      wx.showLoading({
        title: '正在上传第' + count + '张'
      })
      wx.uploadFile({
        url: UPLOAD_FILE + '?filedir=salesInfo',
        filePath: imgPaths[count],
        name: 'file',
        header: {
          'Content-Type': 'image/jpeg',
          token: token
        },
        methods: 'POST',
        success: (res) => {
          successUp++ // 成功+1
          // 上传成功之后再把照片的图片列表更新到个人信息接口
          this.richTextList.push(JSON.parse(res.data).data[0])
          this.richImg = this.richTextList.join(',')
        },
        fail: (res) => {
          failUp++ // 失败+1
        },
        complete: (res) => {
          count++ // 下一张
          if (count === length) {
            // 上传完毕，作一下提示
            console.log('上传成功' + successUp + ',' + '失败' + failUp)
            this.getSalesmanUpdate()
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
    deleteImgList (i) {
      this.richTextList.splice(i, 1)
      this.richImg = this.richTextList.join(',')
      if (this.richImg.richTextList === 0) {
        // console.log('aaa')
        this.richImg = ''
      }
      this.getSalesmanUpdate()
    },
    // 上传视频
    chooseVideo (e) {
      const videoContext = wx.createVideoContext('myVideo')
      videoContext.stop()
      this.videoFlag = false
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        camera: ['front', 'back'],
        success: (res) => {
          this.video = res.tempFilePath
          // 上传完成后把文件上传到服务器
          const token = wx.getStorageSync('token')
          wx.uploadFile({
            url: UPLOAD_FILE + '?filedir=salesVideo',
            filePath: res.tempFilePath,
            name: 'file',
            header: {
              'Content-Type': 'image/jpeg',
              token: token
            },
            methods: 'POST',
            success: (res) => {
              this.video = JSON.parse(res.data).data[0]
              this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
              this.getSalesmanUpdate()
            },
            fail: (res) => {
            }
          })
        },
        fail: function () {
        },
        complete: function () {
        }
      })
    }, // 删除视频
    deleteVideo () {
      // 更新一下个人信息接口，图片传‘’
      this.videoFlag = false
      this.video = ''
      this.getSalesmanUpdate()
    },
    // 页面加载获取信息
    getInfo () {
      const userId = wx.getStorageSync('userId') // 获取本地userId
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/platformSalesman/selectSelfInfo',
        body: {
          'userId': userId
        }
      }).then(res => {
        console.log('res', res)
        if (res.data) {
          this.postForm = res.data
          this.nickName = res.data.nickName
          this.voice = res.data.voice
          this.userId = userId
          this.pan = true
          this.addDetailed = res.data.salesAddDetailed
          this.Yid = res.data.id
          this.richImg = res.data.richText
          this.video = res.data.video !== '' ? res.data.video : ''
          this.name = res.data.name
          this.weChat = res.data.weChat
          this.job = res.data.job
          this.phone = res.data.phone
          this.imgUrl = res.data.imgUrl
          if (res.data.tradeName) {
            this.pickerText = res.data.tradeName
          }
          this.tradeId = res.data.tradeId
          this.fixedPhone = res.data.fixedPhone
          this.email = res.data.email
          this.salesCompanyName = res.data.salesCompanyName
          this.info = res.data.info
          this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
          const lab = typeof res.data.salesAddress
          if (this.richTextList) {
            this.richTextList = res.data.richText !== '' ? res.data.richText.split(',') : []
          }
          // if (lab === 'string') {
          //   this.region = JSON.parse(res.data.salesAddress)
          //   this.address = this.region
          // } else {
          //   this.region = JSON.parse(res.data.salesAddress)
          //   this.address = this.region.join('')
          // }      this.region = JSON.parse(usermsg.address)
          if (res.data.salesAddress !== null) {
            if (lab === 'string') {
              this.region = JSON.parse(res.data.salesAddress)
              this.address = this.region
            } else {
              this.region = JSON.parse(res.data.salesAddress)
              this.address = this.region.join('')
            }
          }
          if (this.voice !== '') {
            this.voiceTxt = '重录'
            const bg = wx.createInnerAudioContext()
            bg.src = this.voice
            // console.log('33', this.voice)
            bg.onCanplay(() => {
              console.log(bg.duration)
            })
            setTimeout(() => {
              console.log(bg.duration)
              this.num = Math.round(bg.duration)
              this.voiceTime = this.formatSeconds(this.num)
            }, 1000)
          }
        } else {
          this.region = '北京市北京市东城区'
          this.address = ['北京市', '北京市', '东城区']
          this.pan = false
          this.postForm = ''
          this.nickName = ''
          this.voice = ''
          this.userId = ''
          this.addDetailed = ''
          this.Yid = ''
          this.richImg = ''
          this.video = ''
          this.richTextList = ''
          this.name = ''
          this.weChat = ''
          this.job = ''
          this.phone = ''
          this.pickerText = ''
          this.tradeId = ''
          this.fixedPhone = ''
          this.email = ''
          this.salesCompanyName = ''
          this.info = ''
        }
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
    // 检测有没有输入值
    judgeNull (str, name) {
      if (str === '' || str.length === 0) {
        wx.showToast({
          title: name + '不能为空',
          icon: 'none',
          duration: 2000
        })
        return true
      }
    },
    // 插入雷达
    async insertOpera (info, recordType) {
      this.businessId = wx.getStorageSync('businessId')
      this.id = wx.getStorageSync('userId')
      this.salesmanId = wx.getStorageSync('salesmanId')
      await personApi.OperationInsert({ businessId: this.businessId, info, recordType, salesmanId: this.salesManId, userId: this.id })
    },
    // 更新名片信息接口
    getSalesmanUpdate () {
      if (this.judgeNull(this.name, '姓名')) return
      if (this.judgeNull(this.salesCompanyName, '公司')) return
      // if (this.judgeNull(this.pickerText, '行业')) return
      if (this.judgeNull(this.job, '职位')) return
      if (this.judgeNull(this.phone, '手机')) return
      // // 检测手机号
      // if (this.phone.length !== 0) {
      //   // var reg = /^1(3|4|5|7|8)\d{9}$/
      //   // if (!reg.test(this.phone)) {
      //   //   wx.showToast({
      //   //     title: '请输入有效的手机号',
      //   //     icon: 'none',
      //   //     duration: 2000
      //   //   })
      //   //   return false
      //   // }
      // }
      // if (this.judgeNull(this.fixedPhone, '固话')) return
      // if (this.fixedPhone) {
      //   var regF = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
      //   if (!regF.test(this.fixedPhone)) {
      //     wx.showToast({
      //       title: '请输入有效的固话，格式为0000-00000000',
      //       icon: 'none',
      //       duration: 2000
      //     })
      //     return false
      //   }
      // }
      // if (this.judgeNull(this.email, '邮箱')) return
      // 检测邮箱
      if (this.email) {
        var regE = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!regE.test(this.email)) {
          wx.showToast({
            title: '请输入有效的邮箱',
            icon: 'none',
            duration: 2000
          })
          return false
        }
      }
      // if (this.judgeNull(this.weChat, '微信')) return
      // if (this.judgeNull(this.region, '区域')) return
      // if (this.judgeNull(this.addDetailed, '详细地址')) return
      console.log('pan', this.pan)
      this.disabled = false
      if (this.pan === false) {
        const token = wx.getStorageSync('token')
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地bussiness
        wx.request({
          method: 'post', // post/get 请求方式
          url: UPLOAD_API + '/platformSalesman/add',
          data: {
            businessId: businessId,
            userId: userId,
            imgUrl: this.imgUrl,
            video: this.video,
            voice: this.voice,
            id: this.Yid, // 152
            name: this.name,
            longitude: this.longitude,
            latitude: this.latitude,
            addDetailed: this.addDetailed,
            address: JSON.stringify(this.region),
            companyName: this.salesCompanyName,
            richText: this.richImg,
            phone: this.phone,
            fixedPhone: this.fixedPhone,
            email: this.email,
            weChat: this.weChat,
            job: this.job,
            info: this.info,
            tradeId: this.tradeId
          },
          header: {
            'token': token
          },
          success: (res) => {
            if (res.data.code === 200) {
              this.pan = true
              console.log('pana', this.pan)// this.isDisable = false // 执行请求后就不能点击了
              wx.setStorageSync('Card', true)
              console.log(wx.getStorageSync('Card'))
              wx.showToast({
                title: '保存成功',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) {
            console.log(res)
          }
        })
        this.insertOpera('完善了资料', 10)
      }
      if (this.pan === true) {
        const token = wx.getStorageSync('token')
        wx.request({
          method: 'post', // post/get 请求方式
          url: UPLOAD_API + '/platformSalesman/updateBaseInfo',
          data: {
            imgUrl: this.imgUrl,
            video: this.video,
            voice: this.voice,
            id: this.Yid, // 152
            name: this.name,
            addDetailed: this.addDetailed,
            address: JSON.stringify(this.region),
            companyName: this.salesCompanyName,
            richText: this.richImg,
            phone: this.phone,
            fixedPhone: this.fixedPhone,
            email: this.email,
            weChat: this.weChat,
            job: this.job,
            longitude: this.longitude,
            latitude: this.latitude,
            info: this.info,
            tradeId: this.tradeId
          },
          header: {
            'token': token
          },
          success: function (res) {
            if (res.data.code === 200) {
              // // this.pan = 0
              // this.isDisable = false // 执行请求后就不能点击了
              wx.showToast({
                title: '更新成功',
                icon: 'none',
                duration: 2000
              })
            }
          },
          fail: function (res) {
            console.log(res)
          },
          complete: function (res) {
            console.log(res)
          }
        })
        this.insertOpera('完善了资料', 10)
      }
    },
    // 获取当前定位
    chooseLocation () {
      var that = this
      // console.log('111')
      wx.chooseLocation({
        success: (res) => {
          console.log(res)
          that.addDetailed = res.name
          that.latitude = res.latitude
          that.longitude = res.longitude
          // that.region = res.name
          // that.address = that.region
        },
        fail: (res) => {
          wx.getSetting({
            success: function (res) {
              var statu = res.authSetting
              if (!statu['scope.userLocation']) {
                wx.showModal({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                  success: function (tip) {
                    if (tip.confirm) {
                      wx.openSetting({
                        success: function (data) {
                          if (data.authSetting['scope.userLocation'] === true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            // 授权成功之后，再调用chooseLocation选择地方
                            wx.chooseLocation({
                              success: function (res) {
                                // obj.setData({
                                //   addr: res.address
                                // })
                              }
                            })
                          } else {
                            wx.showToast({
                              title: '授权失败',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        },
                        fail: function (res) {
                          wx.showToast({
                            title: '调用授权窗口失败',
                            icon: 'success',
                            duration: 1000
                          })
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      })
    },
    // 设定定时
    startCount () {
      // this.num += 1
      this.timeControl = setTimeout(this.startCount, 1000)
    },
    // 选择语音
    chooseVocie () {
      this.getSalesmanUpdate()
    },
    // 获取语音时长
    formatSeconds (value) {
      let theTime = parseInt(value)// 秒
      let middle = 0// 分
      let result = ''
      let temp = ''

      if (theTime > 60) {
        middle = parseInt(theTime / 60)
        theTime = parseInt(theTime % 60)
        if (middle > 60) {
          middle = parseInt(middle % 60)
        }
      }
      temp = parseInt(theTime)
      if ((temp + '').length === 1) {
        temp = '0' + parseInt(theTime)
        result = '00:' + temp
      } else {
        result = '00:' + temp
      }
      if (middle > 0) {
        if ((middle + '').length === 1) {
          result = '0' + parseInt(middle) + ':' + temp
        } else {
          result = '' + parseInt(middle) + ':' + temp
        }
      }
      return result
    },
    // 录音状态
    voiceControl () {
      if (this.voiceTxt === '停止') {
        this.stopVoice()
      } else {
        this.takeVoice()
      }
    },
    // 删除录音
    cancelVoice () {
      this.voice = ''
      this.getSalesmanUpdate()
      this.voiceTxt = '录音'
      this.voiceTime = '00:00'
      this.num = 0
    },
    // 开始录音
    takeVoice () {
      this.num = 0
      this.startCount()
      const options = {
        duration: 600000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'aac',
        frameSize: 50
      }
      recorderManager.start(options)
      recorderManager.onStart(() => {
        console.log('recorder start')
      })
      this.recordFlag = false
      this.voiceTxt = '停止'
    },
    // 停止录音
    stopVoice () {
      recorderManager.stop()
      recorderManager.onStop((res) => {
        clearTimeout(this.timeControl)
        console.log('recorder stop')
        this.voice = res.tempFilePath
        const token = wx.getStorageSync('token')
        wx.uploadFile({
          url: UPLOAD_FILE + '?filedir=salesVoice',
          filePath: this.voice,
          name: 'file',
          header: {
            token: token
          },
          methods: 'POST',
          success: (res) => {
            console.log(JSON.parse(res.data).data[0])
            this.voice = (JSON.parse(res.data).data[0])
            this.$nextTick(() => {
              this.voice = JSON.parse(res.data).data[0]
              this.getSalesmanUpdate()
            })
            const bgM = wx.createInnerAudioContext()// 初始化createInnerAudioContext接口
            // 设置播放地址
            bgM.src = this.voice
            bgM.onCanplay(() => {
              console.log(bgM.duration)// 0，这个方法需要执行一下，所以不能删
            })
            setTimeout(() => {
              this.num = Math.round(bgM.duration)
              console.log(this.num)
              this.voiceTime = this.formatSeconds(this.num)
            }, 1000)
            // this.chooseVocie()
          },
          fail: (res) => {
            console.log(res)
          }
        })
      })
      this.recordFlag = true
      this.voiceTxt = '重录'
    },
    // playvoice 播放
    play () {
      const url = this.voice
      if (url === '') {
        wx.showToast({
          title: '尚未添加语音',
          icon: 'none',
          duration: 2000
        })
        return
      }
      if (url === this.currentAudio) {
        innerAudioContext.pause()
        this.currentAudio = ''
        this.playVoiceFlag = false
      } else {
        this.playVoiceFlag = true
        innerAudioContext.src = url
        this.currentAudio = url
        innerAudioContext.title = 'introduction'
        wx.setInnerAudioOption({
          obeyMuteSwitch: false
        })
        innerAudioContext.play()
        let second = this.num + 1
        innerAudioContext.onPlay(() => {
          console.log('开始播放')
          this.animal = 'animation-duration:' + second + 's'
        })
        innerAudioContext.onError((res) => {
          console.log('fail')
          this.animal = ''
        })
        innerAudioContext.onEnded(() => {
          console.log('音乐播放结束')
          this.animal = ''
          this.currentAudio = ''
          this.playVoiceFlag = false
        })
        setTimeout(() => {
          // console.log(innerAudioContext.duration)
          this.time = innerAudioContext.duration
        }, 1000)
      }
    },
    // ?id=${this.id}&userId=${this.userId}&name=${this.name}&info=${info}
    // 播放视频
    videoPlay () {
      this.videoFlag = true
      // const videoContext = wx.createVideoContext('myVideo')
      // videoContext.play()
    },
    // getTrade () {
    //   this.$fly.request({
    //     method: 'get', // post/get 请求方式
    //     url: '/trade/selectAllByGroup',
    //     body: {
    //     }
    //   }).then(res => {
    //     console.log('resa', res)
    //     this.TradeData = res.data.firstTrade
    //     // this.cards = res.data.list
    //   }).catch(err => {
    //     console.log(err.status, err.message)
    //   })
    // },
    getTrade () {
      this.$fly.request({
        method: 'get', // post/get 请求方式
        url: '/trade/selectAllByGroup',
        body: {
        }
      }).then(res => {
        this.mulLinkageTwoPicker = res.data
        this.pickerText = this.mulLinkageTwoPicker[0].children[0].label
        this.tradeId = this.mulLinkageTwoPicker[0].children[0].value
      }).catch(err => {
        console.log(err)
      })
    },
    bindchange (e) {
      console.log('aaa', e)
      var value = e.mp.detail.value
      this.column = value - 1
    },
    // 选择的是行业类型
    bindcolumnchange (e) {
      var value = e.mp.detail.value
      this.TradeA = value[0] + '' + value[1]
    },
    // 二级联动选择
    showMulLinkageTwoPicker () {
      this.pickerValueArray = this.mulLinkageTwoPicker
      this.mode = 'multiLinkageSelector'
      this.deepLength = 2
      this.pickerValueDefault = [0, 0]
      this.themeColor = ''
      this.$refs.mpvuePicker.show()
    },
    onConfirm (e) {
      if (this.mode === 'multiLinkageSelector') {
        this.pickerText = e.label.split('-')[1]
        this.tradeId = e.value[1]
        console.log(',', this.tradeId)
      }
    },
    onChange (e) {
      console.log('a  ', e.value[1])
    },
    onCancel (e) {
      console.log('c', e)
    },
    // 选择的是地址插件
    bindRegionChange (e) {
      var value = e.mp.detail.value
      this.address = value[0] + '' + value[1] + '' + value[2]
      this.region = value
      console.log('value', value)
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
