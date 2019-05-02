import ApiService from '@/services/api.service'
import Vue from 'vue'
import {
  CONTENTS,
  SHOW_DESC
} from '../types/getters.type'
import {
  FETCH_START,
  FETCH_END,
  SET_ERROR,
  SET_CONTENT_LIST,
  SET_SHOW_DESC
} from '../types/mutations.type'
import {
  FETCH_CONTENT_LIST
} from '../types/actions.type'

const state = {
  contents: [],
  errors: {},
  loading: false,
  show_desc: {}
}

const getters = {
  [CONTENTS]: (state) => {
    return state.contents
  },
  [SHOW_DESC]: (state) => (postId) => {
    return state.show_desc[postId]
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
  },
  [SET_CONTENT_LIST]: (state, pNovelList) => {
    state.contents = pNovelList
    pNovelList.forEach(function (value) {
      Vue.set(state.show_desc, value.post_id, false)
    })
    state.errors = {}
  },
  [SET_SHOW_DESC]: (state, payload) => {
    state.show_desc[payload] = !state.show_desc[payload]
  }
}

const actions = {
  [FETCH_CONTENT_LIST]: (context) => {
    context.commit(FETCH_START)
    return ApiService
      .get('contents')
      .then(({
        data
      }) => {
        context.commit(SET_CONTENT_LIST, data.contents)
        context.commit(FETCH_END)
      })
      .catch(({
        response
      }) => {
        context.commit(SET_ERROR, response.data.errors)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
