import type { ActionContext, } from "vuex"
import { _song_url_v1, _lyric, } from "@/api/play"
import { _login_refresh } from '@/api/user'
import { useStorage } from '@vueuse/core'
import userInfo_T from '../types/userInfog'
import { diffDays } from "@/utils/format";
// import type Song from '../types/song'

interface stateType {
  userInfo: userInfo_T.RootObject,
  locale: string,
  tagColor: ['red', 'orangered', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'arcoblue', 'purple', 'pinkpurple', 'magenta']
  cookie: string,
  loginTime: number,
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
    dispatch('initQueryDate')
  },
  // 刷新登录
  async UserRefresh({ commit, getters, state }: ActionContext<stateType, unknown>) {
    if (!getters.loginStatus) return
    const { cookie } = await _login_refresh()
    state.cookie = cookie
    state.loginTime = new Date().getTime()
  },

  // 初始化
  async initQueryDate({ rootState, state, dispatch, rootGetters }: ActionContext<stateType, unknown>, info: userInfo_T.RootObject) {
    console.log(rootState);

    if (!rootState.song.myLikeList.length) {
      dispatch("getLikelist");
      // dispatch("getLikelist");
      // dispatch("getAlbumSublist");
    }
    if (rootGetters.loginStatus && diffDays(localStorage.getItem("loginTime")) > 1) {
      // console.log("超过1天重新获取token", diffDays(localStorage.getItem("loginTime")), 5);
      dispatch("UserRefresh");
      dispatch("getLikelist");
    }
  },


}

export default {
  state: {
    ...state,
  },
  actions,
  mutations,
}
