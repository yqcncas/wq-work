<template>
  <div class="Ify">
    <div class="IfyTop">
      <div class="IfyTop-input">
        <p>
          <input placeholder="搜索关键词" placeholder-style="color: #cccccc;"/>
          <span class="IfyTop--button"><img src="../../../static/images/search.png"></span>
        </p>
      </div>
    </div>
    <div class="Ify-Middle">
      <div class="area">
        <Vselect :data="select" align="center" fix  @change="getSelectResult($event)"></Vselect>
      </div>
    </div>
    <div class="Ify-Main">
      <div class="card" v-for="(item,index) in cards" :key="index">
        <div class="cardImg"><img :src="item.headImg"/></div>
        <div class="card-main">
          <span class="qiye">企</span>
          <div class="all">
            <span class="names">{{ item.name }}</span>
            <span class="job">{{ item.job }}</span>
            <span class="status">{{ item.status }}</span>
          </div>
          <p class="company">{{ item.Companyname }}</p>
        </div>
        <div class="card-right">
          <p class="eye"><img src="../../../static/images/eye.png"/><span>{{ item.eye }}</span> </p>
          <p class="star"><img src="../../../static/images/star.png"/><span>{{ item.star }}</span> </p>
          <i><img src="../../../static/images/addpersonal.png"/></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vselect from '@/components/Vselect'
  export default {
    name: 'index',
    components: { Vselect },
    data () {
      return {
        select: [
          {
            label: '全部区域',
            option: [
              { name: '100元', value: 100 },
              { name: '200元', value: 200 },
              { name: '300元', value: 300 }
            ]
          },
          {
            label: '房地产',
            option: [
              { name: '1000M', value: 1000 },
              { name: '2000M', value: 2000 },
              { name: '3000M', value: 3000 },
              { name: '全城', value: 'all' }
            ]
          },
          {
            label: '最新',
            option: [
              { name: '很帅', value: 'asc' },
              { name: '不帅', value: 'desc' }
            ]
          }
        ],
        cards: [{
          headImg: '../../static/images/gongzhonghao.jpg',
          name: '李松阳',
          job: '技术总监',
          status: '已认证',
          eye: 10,
          star: 10,
          Companyname: '浙江万仟科技有限公司'
        }, {
          headImg: '../../static/images/gongzhonghao.jpg',
          name: '李松阳',
          job: '技术总监',
          status: '已认证',
          eye: 10,
          star: 10,
          Companyname: '浙江万仟科技有限公司'
        }, {
          headImg: '../../static/images/gongzhonghao.jpg',
          name: '李松阳',
          job: '技术总监',
          status: '已认证',
          eye: 10,
          star: 10,
          Companyname: '浙江万仟科技有限公司'
        }]
      }
    },
    methods: {
    }
  }
</script>

<style lang="less" scoped>
@import "./style";
</style>
