import {
  SUB_MENUS
} from '../types/getters.type'
import {
  FETCH_START,
  FETCH_END,
  SET_ERROR
} from '../types/mutations.type'
import {
} from '../types/actions.type'

const state = {
  submenus: require('@/data/submenus'),
  errors: {},
  loading: false
}

const getters = {
  [SUB_MENUS]: (state) => {
    let obj = state.submenus.filter(x => x.mainmenu === 'test')
    return obj[0].submenus
  }
}

const mutations = {
  [FETCH_START]: (state) => {
    state.loading = true
  },
  [FETCH_END]: (state) => {
    state.loading = false
  },
  [SET_ERROR]: (state, errors) => {
    state.errors = errors
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
