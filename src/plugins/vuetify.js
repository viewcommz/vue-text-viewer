import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
// import '@fortawesome/fontawesome-free/css/all.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  theme: {
    primary: '#FF8F00',
    secondary: '#CFD8DC'
  },
  iconfont: 'mdi'
})
