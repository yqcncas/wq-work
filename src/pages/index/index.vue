<template>
  <div class="modify">
    <div class="TopImg">
      <img src="../../../static/images/mao.jpg"/>
    </div>
    <div class="test">
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
                <input placeholder="请输入姓名"/>
              </div>
              <div>
                <label>公司</label>
                <input placeholder="请输入公司"/>
              </div>
              <div>
                <label>职位</label>
                <input placeholder="请输入职位"/>
              </div>
              <div>
                <label>手机</label>
                <input placeholder="请输入手机"/>
              </div>
              <div>
                <label>固话</label>
                <input placeholder="请输入固话"/>
              </div>
              <div>
                <label>邮箱</label>
                <input placeholder="请输入邮箱"/>
              </div>
              <div>
                <label>微信</label>
                <input placeholder="请输入微信"/>
              </div>
              <div>
                <label>地址</label>
                <input placeholder="请输入地址"/>
              </div>
              <p>
                <img src="../../../static/images/map.png">
              </p>
            </div>
            <div class="Basics-footer">
              <submit class="back">返回</submit>
              <submit class="save">保存</submit>
            </div>
          </div>
        </div>
        <div  v-else-if="tab===2">
          <div class="Basics">
            <div class="Basics-main">
                <div class="vivid">
                    <div class="vivid-img">
                      <img src="../../../static/images/gongzhonghao.jpg">
                    </div>
                    <div class="vivid-name">
                      <span>李松阳</span>
                    </div>
                    <div class="vivid-job">
                      <span>技术总监</span>
                    </div>
                    <div class="vivid-company">浙江万仟科技有限公司</div>
                    <div class="vivid-footer">
                      <button>点击上传</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div  v-else-if="tab===3">
          <div class="intro-wrap">
            <open-data class="header-img" type="userAvatarUrl"></open-data>
            <text class="text-area">{{info}}</text>
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
        <div v-else-if="tab===4">
          <div class="photo">
            <div class="photo-main">
              <div class="box-photo">
                <div v-for="(item,index) in richTextList" :key="index" class="box-img" :class="{'box-img-1':index===1,'box-img-2':index===2}">
                  <div class="item-box-img">
                    <img class="delete-img" src="../../../static/images/delete.png" mode="widthFix" @click="deleteImgList(index)"/>
                    <img class="up-img-0" v-if="index===0" :src="item.img" mode="aspectFill">
                    <img class="up-img-1" v-else-if="index===1||index===2" :src="item.img" mode="aspectFill">
                    <img class="up-img-2" v-else :src="item.img" mode="aspectFill">
                  </div>
                </div>
              </div>
            </div>
          </div>
            <submit class="img-btn-up" @click="chooseImageList">上传图片</submit>
        </div>
        <div v-else>
          <div class="videos">
            <div class="videos-main">
              <div class="up-video">
                <video id="myVideo" v-if="videoFlag" :src="video" objectFit="cover" class="cover-hw"></video>
                <div v-else class="cover-view" @click="videoPlay">
                  <img class="delete-img" src="../../../static/images/delete.png" mode="widthFix" @click="deleteVideo"/>
                  <img :src="video+'?x-oss-process=video/snapshot,t_0,f_jpg,w_750,m_fast'" mode="aspectFill" />
                  <div class="model-btn">
                    <div class="play-icon">
                    </div>
                  </div>
                </div>
              </div>
            </div>
              <submit class="img-btn-up1" @click="chooseVideo">上传视频</submit>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import { UPLOAD_FILE } from '@/api/uploadFile'
export default {
  data () {
    return {
      tab: 3,
      info: '您好！我是万仟科技的lifetea您好！我是万仟科技的lifetea您好！我是万仟科技的李松阳！',
      num: 0,
      richTextList: [{
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }, {
        img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
      }],
      timeControl: '',
      time: '',
      videoFlag: false,
      voiceTime: '00:00',
      animal: '',
      video: 'https://oss.wq1516.com/salesVideo/201904260909511556240991808.mp4',
      voice: '',
      voiceTxt: '录音',
      salesManId: null,
      tagList: []
    }
  },

  components: {
    card
  },

  methods: {
    changTab (index) {
      if (index === 1) {
        this.tab = index
        this.status = index
      } else if (index === 2) {
        this.tab = index
        this.status = index
      } else if (index === 3) {
        this.tab = index
        this.status = index
      } else if (index === 4) {
        this.tab = index
        this.status = index
      } else {
        this.tab = index
        this.status = index
      }
    },
    routeTo (info) {
      wx.navigateTo({
        url: `../profile/main`
      })
    },
    // ?id=${this.id}&userId=${this.userId}&name=${this.name}&info=${info}
    // 播放视频
    videoPlay () {
      this.videoFlag = true
      const videoContext = wx.createVideoContext('myVideo')
      videoContext.play()
    },
    deleteVideo () {
      // 更新一下个人信息接口，图片传‘’
      this.video = ''
      this.getSalesmanUpdate()
    },
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
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
  @import "./style.less";
</style>
