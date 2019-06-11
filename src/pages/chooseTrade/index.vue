<template>
    <div class="addGroup">
      <!--群类型-->
      <div class="main">
        <div class="type">
          <div class="type-Main">
            <div v-for="(item,index) in Trade" :key="index">
               <span :class="{'selected':tab === item.id,'testTitle':true}"
                     @click="changTab(item.id,item.tradeName )">{{item.tradeName}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--保存-->
      <div class="footer">
        <button class="save" @click="goBackTrade()">确定</button>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'index',
    data () {
      return {
        tab: 0,
        Trade: [],
        TradeId: '',
        tradeName: ''
      }
    },
    onShow () {
      this.getTrade() // 获取行业
    },
    onLoad (options) {
      console.log(options)
      this.tab = parseInt(options.id)
      this.tradeName = options.name
      this.TradeId = options.id
    },
    methods: {
      // 获取行业选择
      getTrade () {
        this.$fly.request({
          method: 'get', // post/get 请求方式
          url: '/trade/selectAll',
          body: {
          }
        }).then(res => {
          console.log('ara', res)
          this.Trade = res.data.list
        }).catch(err => {
          console.log(err)
        })
      },
      // 选择行业
      changTab (index, name) {
        this.tab = index
        this.status = index
        this.TradeId = index
        this.tradeName = name
        console.log(this.TradeId)
      },
      // 行业确定选择
      goBackTrade () {
        wx.redirectTo({
          url: '../introduce/main?id=' + this.TradeId + '&name=' + this.tradeName + '&pan=2'
        })
      }
    }
  }
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
