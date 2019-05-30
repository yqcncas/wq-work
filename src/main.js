import Vue from 'vue'
import App from './App'
import './style/iconfont.css'
import fly from './utils/request'
import moment from 'moment'

moment.locale('zh-cn')
Vue.prototype.moment = moment
Vue.prototype.$fly = fly
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
