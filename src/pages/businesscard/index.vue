<template>
  <!-- 名片 -->
    <div class="business">
      <div class="business-main">
        <div class="cards">
            <div class="card-top">
              <img src="../../../static/images/tiangou.jpg" />
              <div class="cards-M">
                <div class="cards-main">
                  <p class="cards-img"><img src="../../../static/images/tiangou.jpg" /></p>
                  <p class="cards-name">
                    <span>李松阳</span>
                  </p>
                  <p class="cards-job">
                    <span>技术总监</span>
                  </p>
                  <p class="cards-company">
                    <span>浙江万仟科技有限公司</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <submit class="share">分享名片</submit>
              <submit class="save">保存名片</submit>
            </div>
        </div>
        <!-- 标签 -->
        <div class="over-grid">
          <div class="grid">
            <div class="col-1" @click="makePhoneCall" v-if="fixedPhone">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/phone.png"></span>
                <text class="txt">{{fixedPhone}}</text>
              </div>
            </div>
            <div class="col-1" @click="textPaste" v-if="weChat">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/wechat.png"></span>
                <text class="txt">{{weChat}}</text>
              </div>
            </div>
            <div class="col-1" @click="getAddress" v-if="address">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/dingwei.png"></span>
                <text class="txt">{{address}}</text>
              </div>
            </div>
            <div class="col-1" @click="textPasteEmail" v-if="email">
              <div class="desc-wrap">
                <span class="icon-wrap"><img class="icon-4" src="../../../static/images/email.png"></span>
                <text class="txt">{{email}}</text>
              </div>
            </div>
          </div>
        </div>
        <!-- 浏览 -->
        <div class="look">
          <div class="block-4">
            <div class="group-3">
              <!--浏览记录的头像-->
              <span class="logo-main"><img v-for="(item,index) in headImgList" :key="index" :src="item.img" class="logo" /></span>
              <div class="word">…</div>
            </div>
            <div class="zan">
              <img v-if="salesmanRecord&&salesmanRecord.isPraise==1? 'up':'down'" src="../../../static/images/love-se.png" class="icon-8" />
              <img v-else src="../../../static/images/love.png" class="icon-8" />
              <!--<span class="iconfont icon-dianzan" :class="salesmanRecord&&salesmanRecord.isPraise==1? 'up':'down'" @click="clickThumb"></span>-->
            </div>
          </div>
          <div class="group-4">
            <span class="people-browse">{{recordNum}}人浏览</span>
            <div class="block-5">
              <text class="reliable">点赞</text>
              <text class="reliable-next">{{praiseNum}}</text>
            </div>
          </div>
          <!-- 名片码 -->
          <div class="card-ma" @click="routerTo(`./showQrcode/index?companyName=${companyName}&logo=${logo}&qrcode=${qrCodeUrl}&name=${name}&job=${job}&imgUrl=${imgUrl}`)">
            <p class="ma-txt">名片码</p>
            <div class="radius-img">
              <img :src="qrCodeUrl" mode="aspectFill">
            </div>
          </div>
          <!-- 个人简介 -->
          <div class="personal">
            <div class="personal-top">
              <span class="personal-icont">
                <img src="../../../static/images/personalA.png">
              </span>
              <span class="personal-title">个人简介</span>
            </div>
            <div class="personal-main">
              <div class="personal-maimT">
                <div class="personalVoice">
                 <span class="personal-img">
                  <img class="personal-img" src="../../../static/images/gongzhonghao.jpg">
                 </span>
                  <span class="personal-voice">
                    <!--<img class="personal-voice" src="../../../static/images/voice.png">-->
                    <div class="action-bg" @click="playAudio">
                      <div class="back iconfont icon-icon-test3"></div>
                      <span class="playan iconfont iconyihuifu" v-if="!changeVoiceFlag"></span>
                      <span class="playan iconfont iconicon-test3 animation" v-if="changeVoiceFlag"></span>
                    </div>
                    <div class="block-10">
                      <span class="icon-13" />
                      <text class="txt-2">{{num}}''</text>
                    </div>
                  </span>
                </div>
                <div class="personal-text">
                    <div class="personal-wel">
                      <span>你好！我是万仟科技的李松阳</span>
                    </div>
                    <div class="personal-teach">
                      <span>
                          啊来获得绿卡监控力度加快垃圾的卡就开了啦可就大了卡就考虑啊来获得绿卡监控力度加快垃圾的卡就开了啦可就大了卡就考虑的金克拉金克拉的进阿里就大家快来的的金克拉金克拉的进阿里就大家快来的金克拉金克拉金克拉柯急啊啊来获得绿卡监控力度加快垃圾的卡就开a a a
                      </span>
                    </div>
                </div>
              </div>
            </div>
          </div>

          <!--公司介绍-->
          <div class="company">
            <div class="company-top">
              <span class="company-icont">
                <img src="../../../static/images/lou.png">
              </span>
              <span class="company-title">公司介绍</span>
            </div>
            <div class="company-main">
                <div class="company-bg">
                  <img src="../../../static/images/back.png"/>
                </div>
                <div class="company-title">
                  <span> 啊来获得绿卡监控力度加快垃圾的卡就开了啦可就大了卡就考虑啊来获得绿卡监控力度加快垃圾的卡就开了啦可就大了卡就考虑的金克拉金克拉的进阿里就大家快来的的金克拉金克拉的进阿里就大家快来的金克拉金克拉金克拉柯急啊啊来获得绿卡监控力度加快垃圾的卡就开a a a</span>
                </div>
            </div>
          </div>

          <!--公司产品-->
          <div class="product">
            <div class="product-top">
              <span class="product-icont">
              <img src="../../../static/images/morebox.png">
              </span>
              <span class="product-title">公司产品</span>
              <span class="product-right">
                更多<img src="../../../static/images/right-cc.png">
              </span>
            </div>
            <div class="product-main">
              <div class="product-details" v-for="(item,index) in details" :key="index">
                  <div class="product-details-img">
                    <img :src="item.img"/>
                  </div>
                  <div class="product-details-title">
                    {{ item.title }}
                  </div>
                  <div class="product-details-click">
                    {{ item.mores }}
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        fixedPhone: '15988993797',
        weChat: 'Williamchen',
        phone: '15988993797',
        qrCodeUrl: 'https://oss.wq1516.com/default.png',
        address: '浙江温岭',
        email: '351574718@qq.com',
        recordNum: 999,
        praiseNum: 888,
        num: 10,
        headImgList: [{
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
        }, {
          img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
        }, {
          img: 'https://recruit-server.oss-cn-zhangjiakou.aliyuncs.com/headImg/201904301640501556613650695.png'
        }],
        details: [{
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '点击了解更多'
        }, {
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '点击了解更多'
        }, {
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '点击了解更多'
        }, {
          img: '../../static/images/tiangou.jpg',
          title: '系统产品',
          mores: '点击了解更多'
        }]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "./style";
</style>
