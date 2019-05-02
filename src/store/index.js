import Vue from 'vue'
import Vuex from 'vuex'
import main from './modules/main.module'
import test from './modules/test.module'
import embed from './modules/embed.module'
import content from './modules/content.module'
import crawl from './modules/crawl.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    main,
    test,
    embed,
    content,
    crawl
  }
})
