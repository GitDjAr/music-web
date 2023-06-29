import type { ActionContext } from "vuex";
import { _song_url_v1, _lyric } from "@/api/play";
import { _login_refresh } from "@/api/user";
import { useStorage } from "@vueuse/core";
import { userInfo_T } from "../types/userInfog";
import { diffDays } from "@/utils/format";
// import type Song from '../types/song'
import type { RootState } from "../index";

export interface AppType {
  userInfo: userInfo_T;
  locale?: string;
  tagColor: [
    "red",
    "orangered",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "arcoblue",
    "purple",
    "pinkpurple",
    "magenta"
  ];
  cookie?: string;
  loginTime?: number;
}
const tagColor = [
  "red",
  "orangered",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "arcoblue",
  "purple",
  "pinkpurple",
  "magenta",
];
const state = {
  locale: useStorage("locale", "zh-CN"), //语言
  cookie: useStorage("cookie", ""),
  loginTime: useStorage("loginTime", ""), // 记录登录时间
  tagColor,
  userInfo: useStorage<userInfo_T>("userInfo", {} as userInfo_T),
};
const mutations = {
  locale: (state: AppType, status: string): void => {
    state.locale = status;
  },
  userLogin: (state: AppType, status: userInfo_T): void => {
    state.userInfo = status;
  },
};
const actions = {
  // 设置语言
  async setLocale({ commit }: ActionContext<AppType, RootState>, lang: string) {
    commit("locale", lang);
  },
  // user退出
  async UserOuting(
    { commit, dispatch, state, rootState }: ActionContext<AppType, RootState>,
    status: boolean = false
  ) {
    state.loginTime = 0;
    state.cookie = "";
    rootState.song.myLikeList = [];
    commit("userLogin", {});
  },
  // 登录
  async UserLogin(
    { commit, dispatch, state }: ActionContext<AppType, RootState>,
    info: userInfo_T
  ) {
    commit("userLogin", info);
    state.loginTime = new Date().getTime() - 2 * 60 * 60 * 1000;
    dispatch("UserRefresh");
    dispatch("getLikelist");
    dispatch("recommendPlaylist");
    dispatch("recommendSong");
    dispatch("getUserPlaylist");
  },
  // 刷新登录
  async UserRefresh({
    commit,
    getters,
    state,
  }: ActionContext<AppType, RootState>) {
    if (state.userInfo?.profile?.userId) {
      const { cookie } = await _login_refresh();
      state.cookie = cookie;
      state.loginTime = new Date().getTime();
    }
  },

  // 初始化  每天刷新
  async initQueryData(
    {
      rootState,
      state,
      dispatch,
      rootGetters,
    }: ActionContext<AppType, RootState>,
    info: userInfo_T
  ) {
    if (rootGetters.loginStatus && diffDays(state.loginTime + "") > 1) {
      // console.log("超过1天重新获取token", diffDays(localStorage.getItem("loginTime")), 5);
      dispatch("UserRefresh");
      dispatch("getLikelist");
      dispatch("recommendPlaylist");
      dispatch("recommendSong");
      dispatch("getUserPlaylist");
    }
  },
};

const app = {
  state,
  actions,
  mutations,
};
export default app;
