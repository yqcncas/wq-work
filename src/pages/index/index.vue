<template>
  <div class="modify">
    <el-form ref="postForm" :model="postForm" >
      <div class="TopImg">
        <img src="../../../static/images/mao.jpg"/>
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
                <div>
                  <label>职位</label>
                  <input v-model="job" placeholder="请输入职位"/>
                </div>
                <div>
                  <label>手机</label>
                  <input v-model="phone" placeholder="请输入手机"/>
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
                <p @click="chooseLocation()">
                  <img src="../../../static/images/map.png">
                </p>
              </div>
              <div class="Basics-footer">
                <submit class="back" @click="back()">返回</submit>
                <submit class="save" @click="getSalesmanUpdate()">保存</submit>
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
              <p class="here-txt" @click="routeTo(info)">不会写简介？戳这里<img src="../../../static/images/right-blue.png"/> <i class="icon-arrow-right iconfont"></i></p>
              <!-- 语音 -->
              <div class="voice-box ">
                <!--<i class="iconfont icon-yuyinqiehuan" @click="play"></i>-->
                <i class="YuYin" @click="play"><img src="../../../static/images/yuyin.png"></i>
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
                  <video id="myVideo" v-if="videoFlag" :src="video" @play="playA()" @ended=" end()" objectFit="fill" class="cover-hw"></video>
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
import card from '@/components/card'
import { UPLOAD_FILE, UPLOAD_API } from '@/api/uploadFile'
const innerAudioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()
export default {
  data () {
    return {
      tab: 3,
      info: '',
      infoA: '还没有简介吧？快去填写，让更多人认识你，了解你',
      num: 0,
      richTextList: [],
      richImg: '',
      videoImg: '',
      timeControl: '',
      time: '',
      address: '',
      name: '',
      salesCompanyName: '',
      salesAddress: '',
      job: '',
      phone: '',
      imgUrl: 'https://oss.wq1516.com/salesInfo/201906041349011559627341603.png',
      fixedPhone: '',
      email: '',
      userId: '',
      weChat: '',
      playVoiceFlag: false,
      videoFlag: false,
      recordFlag: true,
      currentAudio: '',
      voiceTime: '00:00',
      Yid: '', // 业务员id
      animal: '',
      region: [],
      voiceUrl: '',
      pan: 0,
      video: 'http://tmp/wx3f1e71e9ef9aaabf.o6zAJs2WsoIGM1QCJjQV1ccYszRs.SPKIPcvU10gP5106da2657c3eceedd1adbebacde92e3.mp4',
      voice: '',
      voiceTxt: '录音',
      salesManId: null,
      tagList: []
    }
  },

  components: {
    card
  },
  onShow () {
    this.getInfo()
    this.tab = 3
  },
  onLoad () {
  },
  methods: {
    changTab (index) {
      if (index === 1) {
        this.tab = index
        this.status = index
        innerAudioContext.stop()
      } else if (index === 2) {
        this.tab = index
        this.status = index
        innerAudioContext.stop()
      } else if (index === 3) {
        this.tab = index
        this.status = index
      } else if (index === 4) {
        this.tab = index
        this.status = index
        innerAudioContext.stop()
      } else {
        this.tab = index
        this.status = index
        innerAudioContext.stop()
        this.videoFlag = false
        this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
      }
    },
    routeTo (info) {
      wx.navigateTo({
        url: `../profile/main?id=${this.Yid}&userId=${this.userId}&name=${this.name}&info=${info}`
      })
    },
    // 返回上一页
    back () {
      wx.navigateBack(-1)
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
      // this.videoFlag = true
    },
    // 播放结束
    end () {
      this.videoFlag = false
    },
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
        console.log('aaa')
        this.richImg = ''
      }
      this.getSalesmanUpdate()
    },
    // 上传视频
    chooseVideo (e) {
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
        url: 'server/platformSalesman/selectSelfInfo',
        body: {
          'userId': userId
        }
      }).then(res => {
        console.log('res', res.data)
        if (res.data !== null) {
          this.postForm = res.data
          this.voice = res.data.voice
          this.userId = userId
          this.pan = 1
          this.Yid = res.data.id
          this.richImg = res.data.richText
          this.video = res.data.video !== '' ? res.data.video : ''
          this.richTextList = res.data.richText !== '' ? res.data.richText.split(',') : []
          this.name = res.data.name
          this.weChat = res.data.weChat
          this.job = res.data.job
          this.phone = res.data.phone
          this.imgUrl = res.data.imgUrl
          this.fixedPhone = res.data.fixedPhone
          this.email = res.data.email
          this.salesCompanyName = res.data.salesCompanyName
          this.info = res.data.info
          this.videoImg = this.video + '?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'
          const lab = typeof res.data.salesAddress
          if (lab === 'string') {
            this.region = JSON.parse(res.data.salesAddress)
            this.address = this.region
          } else {
            this.region = JSON.parse(res.data.salesAddress)
            this.address = this.region.join('')
          }
          if (this.voice !== '') {
            this.voiceTxt = '重录'
            const bg = wx.createInnerAudioContext()
            bg.src = this.voice
            console.log('33', this.voice)
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
          this.pan = 0
        }
      }).catch(err => {
        console.log(err.status, err.message)
      })
    },
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
    // 更新名片信息接口
    getSalesmanUpdate () {
      if (this.pan === 0) {
        const token = wx.getStorageSync('token')
        const businessId = wx.getStorageSync('businessId') // 获取本地bussiness
        const userId = wx.getStorageSync('userId') // 获取本地bussiness
        wx.request({
          method: 'post', // post/get 请求方式
          url: UPLOAD_API + '/server/platformSalesman/add',
          data: {
            businessId: businessId,
            userId: userId,
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
            info: this.info
          },
          header: {
            'token': token
          },
          success: function (res) {
            if (res.data.code === 200) {
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
      } else {
        const token = wx.getStorageSync('token')
        wx.request({
          method: 'post', // post/get 请求方式
          url: UPLOAD_API + '/server/platformSalesman/updateBaseInfo',
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
            info: this.info
          },
          header: {
            'token': token
          },
          success: function (res) {
            if (res.data.code === 200) {
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
      }
    },
    // 获取当前定位
    chooseLocation () {
      var that = this
      wx.chooseLocation({
        success: function (res) {
          that.region = res.address
          that.address = that.region
        }
      })
    },
    startCount () {
      // this.num += 1
      this.timeControl = setTimeout(this.startCount, 1000)
    },
    chooseVocie () {
      this.getSalesmanUpdate()
    },
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
    // playvoice
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
      const videoContext = wx.createVideoContext('myVideo')
      videoContext.play()
    },
    // 选择的是地址插件
    bindRegionChange (e) {
      var value = e.mp.detail.value
      this.address = value[0] + '' + value[1] + '' + value[2]
      this.region = value
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
