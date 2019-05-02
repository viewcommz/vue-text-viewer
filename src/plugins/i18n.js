import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'ko',
  fallbackLocale: 'ko',
  messages: {
    'ko': require('@/translation/ko'),
    'en': require('@/translation/en'),
    'cn': require('@/translation/cn'),
    'jp': require('@/translation/jp')
  }
})

