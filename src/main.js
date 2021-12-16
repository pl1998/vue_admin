import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import 'font-awesome/css/font-awesome.min.css'
// import { createI18n } from 'vue-i18n'
import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

// 图标选择
import eIconPicker from 'e-icon-picker'
import 'e-icon-picker/lib/symbol.js' // 基本彩色图标库
import 'e-icon-picker/lib/index.css' // 基本样式，包含基本图标
import 'font-awesome/css/font-awesome.min.css' // font-awesome 图标库
import 'element-ui/lib/theme-chalk/icon.css' // element-ui 图标库

Vue.use(eIconPicker, { FontAwesome: true, ElementUI: true, eIcon: true, eIconSymbol: true })

// process.env.ENV === 'production' &&
// 	Sentry.init({
// 	  dsn: 'https://912d97ea26704c828aff071141a4ca50@o408607.ingest.sentry.io/5299000',
// 	  integrations: [new VueIntegration({ Vue, attachProps: true })]
// 	})

Vue.use(Element, {
  size: 'mini' // set element-ui default size
  // locale: enLang // 如果使用中文，无需设置，请删除
})
// Vue.use(createI18n)

import * as filters from './filters' // global filters

// 引入图标库
Vue.prototype.base_host = process.env.VUE_APP_HOST + process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : 'api'
Vue.prototype.host = process.env.VUE_APP_HOST

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
