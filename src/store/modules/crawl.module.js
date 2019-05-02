import ApiService from '@/services/api.service'
import {
  CRAWL_DATES,
  CRAWL_GENRES,
  CRAWL_HEADERS,
  IS_LOADING_DATE,
  IS_LOADING_LIST
} from '../types/getters.type'
import {
  FETCH_LIST_START,
  FETCH_LIST_END,
  FETCH_DATE_START,
  FETCH_DATE_END,
  SET_ERROR,
  SET_CRAWL_DATE,
  SET_CRAWL_DATES,
  SET_CRAWL_HEADERS,
  SET_CRAWL_FILTER
} from '../types/mutations.type'
import {
  FETCH_CRAWL_DATES,
  FETCH_CRAWL_HEADERS
} from '../types/actions.type'

const state = {
  crawl_date: '',
  crawl_dates: [],
  crawl_genres: [],
  crawl_list: [],
  crawl_headers: [],
  errors: {},
  loading_list: false,
  loading_date: false
}

const getters = {
  [CRAWL_DATES]: (state) => {
    return state.crawl_dates
  },
  [CRAWL_GENRES]: (state) => {
    return state.crawl_genres
  },
  [CRAWL_HEADERS]: (state) => {
    return state.crawl_headers
  },
  [IS_LOADING_DATE]: (state) => {
    return state.loading_date
  },
  [IS_LOADING_LIST]: (state) => {
    return state.loading_list
  }
}

const mutations = {
  [FETCH_LIST_START]: (state) => {
    state.loading_list = true
  },
  [FETCH_LIST_END]: (state) => {
    state.loading_list = false
  },
  [FETCH_DATE_START]: (state) => {
    state.loading_date = true
  },
  [FETCH_DATE_END]: (state) => {
    state.loading_date = false
  },
  [SET_ERROR]: (state, errors) => {
    state.errors = errors
  },
  [SET_CRAWL_DATE]: (state, payload) => {
    state.crawl_date = payload
  },
  [SET_CRAWL_DATES]: (state, payload) => {
    if (payload) {
      for (let i in payload) {
        state.crawl_dates.push(payload[i].date)
      }
    }
    state.errors = {}
  },
  [SET_CRAWL_HEADERS]: (state, payload) => {
    if (payload) {
      state.crawl_list = payload
      state.crawl_headers = payload

      for (let i in payload) {
        state.crawl_genres.push(payload[i].genre_first)
        state.crawl_genres.push(payload[i].genre_second)
      }

      state.crawl_genres = state.crawl_genres.filter((item, index) => state.crawl_genres.indexOf(item) !== index)
      state.crawl_genres = state.crawl_genres.filter(x => x !== 'None')
    }
    state.errors = {}
  },
  [SET_CRAWL_FILTER]: (state, payload) => {
    state.crawl_headers = state.crawl_list.slice()
    if (payload.regdat.start !== '' && payload.regdat.end !== '') {
      state.crawl_headers = state.crawl_headers.filter(x => x.first_update_at >= payload.regdat.start && x.first_update_at <= payload.regdat.end)
    }
    if (payload.updat.start !== '' && payload.updat.end !== '') {
      state.crawl_headers = state.crawl_headers.filter(x => x.last_update_at >= payload.updat.start && x.last_update_at <= payload.updat.end)
    }
    if (payload.input_genre.length > 0) {
      state.crawl_headers = state.crawl_headers.filter(x => payload.input_genre.find(y => y === x.genre_first) || payload.input_genre.find(y => y === x.genre_second))
    }
    if (payload.input_favs) {
      state.crawl_headers = state.crawl_headers.filter(x => x.fav_cnt >= payload.input_favs)
    }
    if (payload.input_fave) {
      state.crawl_headers = state.crawl_headers.filter(x => x.fav_cnt <= payload.input_fave)
    }
    if (payload.input_tots) {
      state.crawl_headers = state.crawl_headers.filter(x => x.last_update_no >= payload.input_tots)
    }
    if (payload.input_tote) {
      state.crawl_headers = state.crawl_headers.filter(x => x.last_update_no <= payload.input_tote)
    }
    if (payload.input_rates) {
      state.crawl_headers = state.crawl_headers.filter(x => x.reading_rate >= payload.input_rates)
    }
    if (payload.input_ratee) {
      state.crawl_headers = state.crawl_headers.filter(x => x.reading_rate <= payload.input_ratee)
    }
  }
}

const actions = {
  [FETCH_CRAWL_DATES]: (context) => {
    context.commit(FETCH_DATE_START)
    return ApiService
      .get('crawled_date')
      .then(({
        data
      }) => {
        context.commit(SET_CRAWL_DATES, data.date)
        context.commit(FETCH_DATE_END)
      })
      .catch(({
        response
      }) => {
        context.commit(SET_ERROR, response.data.errors)
      })
  },
  [FETCH_CRAWL_HEADERS]: (context, payload) => {
    if (payload) {
      context.commit(FETCH_LIST_START)
      let dt = '?date=' + payload
      return ApiService
        .get('crawled_headers', dt)
        .then(({
          data
        }) => {
          context.commit(SET_CRAWL_HEADERS, data.headers)
          context.commit(FETCH_LIST_END)
        })
        .catch(({
          response
        }) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
