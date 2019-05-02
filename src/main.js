// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import '@/plugins/vuetify'
import '@/plugins/base'
import 'babel-polyfill'
import App from './App'
import router from '@/router'
import store from '@/store/index'
import { i18n } from '@/plugins/i18n'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { API_URL } from '@/services/config'
import '@/styles/quill-editor/quill.core'
import VuetifyDaterangePicker from 'vuetify-daterange-picker'
import 'vuetify-daterange-picker/dist/vuetify-daterange-picker.css'

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()
Vue.use(VueAxios, axios)
Vue.use(VuetifyDaterangePicker)
Vue.axios.defaults.baseURL = API_URL

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
