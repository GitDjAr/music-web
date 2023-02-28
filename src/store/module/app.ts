import type { ActionContext, } from "vuex"
import { _song_url_v1, _lyric, } from "@/api/play"
import { _login_refresh } from '@/api/user'
import { useStorage } from '@vueuse/core'
import userInfo_T from '../types/userInfog'
// import type Song from '../types/song'

interface stateType {
  userInfo: userInfo_T.RootObject,
  locale: string,
  tagColor: ['red', 'orangered', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'arcoblue', 'purple', 'pinkpurple', 'magenta']
  cookie: string,
}
const state = {
  locale: useStorage('locale', 'zh-CN'),//语言
  cookie: useStorage('cookie', ''),
  loginTime: useStorage('loginTime', ''), // 记录登录时间
  tagColor: ['red', 'orangered', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'arcoblue', 'purple', 'pinkpurple', 'magenta'],
  userInfo: useStorage('userInfo', {}),
}
const mutations = {
  locale: (state: stateType, status: string): void => { state.locale = status },
  userLogin: (state: stateType, status: userInfo_T.RootObject): void => {
    state.userInfo = status
  },
}
const actions = {
  // 设置语言
  async setLocale({ commit }: ActionContext<stateType, unknown>, lang: string) {
    commit("locale", lang)
  },
  // user退出
  async UserOutin({ commit }: ActionContext<stateType, unknown>, status: boolean = false) {
    commit("userLogin", {})
  },
  // 登录
  async UserLogin({ commit, dispatch }: ActionContext<stateType, unknown>, info: userInfo_T.RootObject) {
    commit("userLogin", info)
    dispatch('getUserPlaylist', info.account.id)
  },
  // 刷新登录
  async UserRefresh({ commit, getters, state }: ActionContext<stateType, unknown>) {
    if (!getters.loginStatus) return
    const { cookie } = await _login_refresh()
    state.cookie = cookie
  },
}

export default {
  state: {
    ...state,
  },
  actions,
  mutations,
}
