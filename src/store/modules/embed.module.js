import {
  VIEWER_TITLE,
  VIEWER_SUBTITLE,
  VIEWER_CONTENT,
  VIEWER_FONTFAMILYS,
  VIEWER_FONTFAMILY,
  VIEWER_FONTSIZE,
  VIEWER_LINEHEIGHT,
  VIEWER_BGCOLORS,
  VIEWER_BGCOLOR
} from '../types/getters.type'
import {
  FETCH_START,
  FETCH_END,
  SET_ERROR,
  MINUS_VIEWER_FONT_SIZE,
  PLUS_VIEWER_FONT_SIZE,
  MINUS_VIEWER_LINE_HEIGHT,
  PLUS_VIEWER_LINE_HEIGHT,
  SET_FONT_FAMILY,
  SET_FONT_SIZE,
  SET_LINE_HEIGHT,
  SET_BG_COLOR
} from '../types/mutations.type'
import {
  CHG_FONT_FAMILY,
  CHG_FONT_SIZE,
  CHG_LINE_HEIGHT,
  CHG_BG_COLOR
} from '../types/actions.type'

const state = {
  contentInfo: require('@/data/content_viewer/testnovel'),
  viewerConfig: require('@/data/content_viewer/viewer_config'),
  viewerTitle: '',
  viewerSubtitle: '',
  viewerContent: '',
  viewerFontFamily: 'NanumMyeongjoRegular',
  viewerFontSize: {'disp': '3', 'size': 'medium'},
  viewerLineHeight: {'disp': '2', 'height': '2em'},
  viewerBgColor: {'disp': '0', 'color': '#F5F5F5', 'dark': false},
  errors: {},
  loading: false
}

const getters = {
  [VIEWER_TITLE]: (state) => {
    return state.contentInfo.title
  },
  [VIEWER_SUBTITLE]: (state) => {
    return state.contentInfo.subtitle
  },
  [VIEWER_CONTENT]: (state) => {
    return state.contentInfo.content
  },
  [VIEWER_FONTFAMILYS]: (state) => {
    return state.viewerConfig.font_family
  },
  [VIEWER_FONTFAMILY]: (state) => {
    return state.viewerFontFamily
  },
  [VIEWER_FONTSIZE]: (state) => {
    return state.viewerFontSize
  },
  [VIEWER_LINEHEIGHT]: (state) => {
    return state.viewerLineHeight
  },
  [VIEWER_BGCOLORS]: (state) => {
    return state.viewerConfig.bg_color
  },
  [VIEWER_BGCOLOR]: (state) => {
    return state.viewerBgColor
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
  [MINUS_VIEWER_FONT_SIZE]: (state) => {
    if (state.viewerFontSize.disp > 1) {
      let num = parseInt(state.viewerFontSize.disp) - 1
      state.viewerFontSize = state.viewerConfig.font_size.find(x => x.disp === num.toString())
    }
  },
  [PLUS_VIEWER_FONT_SIZE]: (state) => {
    if (state.viewerFontSize.disp < 6) {
      let num = parseInt(state.viewerFontSize.disp) + 1
      state.viewerFontSize = state.viewerConfig.font_size.find(x => x.disp === num.toString())
    }
  },
  [MINUS_VIEWER_LINE_HEIGHT]: (state) => {
    if (state.viewerLineHeight.disp > 1) {
      let num = parseInt(state.viewerLineHeight.disp) - 1
      state.viewerLineHeight = state.viewerConfig.line_height.find(x => x.disp === num.toString())
    }
  },
  [PLUS_VIEWER_LINE_HEIGHT]: (state) => {
    if (state.viewerLineHeight.disp < 5) {
      let num = parseInt(state.viewerLineHeight.disp) + 1
      state.viewerLineHeight = state.viewerConfig.line_height.find(x => x.disp === num.toString())
    }
  },
  [SET_FONT_FAMILY]: (state, payload) => {
    state.viewerFontFamily = payload
  },
  [SET_FONT_SIZE]: (state, payload) => {
    state.viewerFontSize = state.viewerConfig.font_size.find(x => x.disp === payload.toString())
  },
  [SET_LINE_HEIGHT]: (state, payload) => {
    state.viewerLineHeight = state.viewerConfig.line_height.find(x => x.disp === payload.toString())
  },
  [SET_BG_COLOR]: (state, payload) => {
    state.viewerBgColor = state.viewerConfig.bg_color.find(x => x.disp === payload.toString())
  }
}

const actions = {
  [CHG_FONT_FAMILY]: (context, payload) => {
    if (payload) {
      return context.commit(SET_FONT_FAMILY, payload)
    }
  },
  [CHG_FONT_SIZE]: (context, payload) => {
    if (payload) {
      return context.commit(SET_FONT_SIZE, payload)
    }
  },
  [CHG_LINE_HEIGHT]: (context, payload) => {
    if (payload) {
      return context.commit(SET_LINE_HEIGHT, payload)
    }
  },
  [CHG_BG_COLOR]: (context, payload) => {
    if (payload) {
      return context.commit(SET_BG_COLOR, payload)
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
