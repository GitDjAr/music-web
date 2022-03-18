import Cookei from "js-cookie"
import { Commit } from "vuex"
import { GetSong } from "@/api/play"

interface active {
  commit: Commit
  state: () => {}
}
interface userInfoOption {
  [string: string]: Object
}
const appuser = localStorage.getItem("userInfo") || "{}"
const state = {
  locale: Cookei.get("locale") || "zh-CN",
  userInfo: JSON.parse(appuser) || {},
  loginStatus: Cookei.get("loginStatus"),

  // 当前 or 上次播放历史
  curSongInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
}
const mutations = {
  locale: (state, status): void => (state.locale = status),
  userLogin: (state, status): void => (state.userInfo = status),
  loginStatus: (state, status): void => (state.loginStatus = status),
  CurPlaySong: (state, status): void => (state.curSongInfo = status),
}
const actions = {
  async setLocale({ commit, state }: active, lang: string) {
    commit("locale", lang)
    Cookei.set("locale", lang)
  },
  async UserOutin({ commit }: active, status: boolean = false) {
    commit("loginStatus", status)
    Cookei.remove("loginStatus")
    localStorage.setItem("userInfo", "{}")
  },
  async UserLogin({ commit }: active, info: userInfoOption) {
    commit("loginStatus", true)
    Cookei.set("loginStatus", true)
    commit("userLogin", info)
    localStorage.setItem("userInfo", JSON.stringify(info))
  },
  // 切歌
  async ToggleSong({ commit }: active, song) {
    const { url } = await GetSong({ id: song.al.id })
    
    commit("CurPlaySong", song)
  },
}

export default {
  state,
  actions,
  mutations,
}
