import {
  MAIN_MENUS,
  MAIN_MENU,
  SUB_MENU,
  SUB_MENUS,
  MAIN_ADS,
  CATEGORIES,
  LINKS
} from '../types/getters.type'
import {
  FETCH_START,
  FETCH_END,
  SET_MAIN_MENU,
  SET_SUB_MENU,
  SET_ERROR,
  SET_DRAWER,
  SET_TOGGLE_DRAWER
} from '../types/mutations.type'
import {
} from '../types/actions.type'

const state = {
  locale: '',
  mainmenu: 'home',
  mainmenus: require('@/data/mainmenus'),
  mainadsrcs: require.context('@/images/mainads', false, /\.jpg$/),
  submenumodel: 0,
  submenus: require('@/data/submenus'),
  articles: require('@/data/articles'),
  drawer: false,
  items: [{
    text: 'Home',
    to: '/'
  }, {
    text: 'About',
    href: '#about'
  }],
  errors: {},
  loading: false
}

const getters = {
  [MAIN_MENUS]: (state) => {
    return state.mainmenus
  },
  [MAIN_MENU]: (state) => {
    return state.mainmenu
  },
  [SUB_MENU]: (state) => {
    return state.submenumodel
  },
  [SUB_MENUS]: (state) => {
    let obj = state.submenus.filter(x => x.mainmenu === state.mainmenu)
    return obj[0].submenus
  },
  [MAIN_ADS]: (state) => {
    let mainads = []

    state.mainadsrcs.keys().forEach(function (key) {
      let mainad = {}
      mainad.src = state.mainadsrcs(key)
      mainads.push(mainad)
    })

    return mainads
  },
  [CATEGORIES]: (state) => {
    const categories = []

    for (const article of state.articles) {
      if (
        !article.category ||
        categories.includes(article.category)
      ) {
        continue
      }

      const text = article.category

      categories.push({
        text,
        to: `/category/${text}`
      })
    }

    return categories.sort().slice(0, 4)
  },
  [LINKS]: (state, getters) => {
    return state.items.concat(getters.categories)
  }
}

const mutations = {
  [FETCH_START]: (state) => {
    state.loading = true
  },
  [FETCH_END]: (state) => {
    state.loading = false
  },
  [SET_MAIN_MENU]: (state, payload) => {
    state.submenumodel = 0
    state.mainmenu = payload
  },
  [SET_SUB_MENU]: (state, payload) => {
    state.submenumodel = payload
  },
  [SET_ERROR]: (state, errors) => {
    state.errors = errors
  },
  [SET_DRAWER]: (state, payload) => {
    state.drawer = payload
  },
  [SET_TOGGLE_DRAWER]: (state) => {
    state.drawer = !state.drawer
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
