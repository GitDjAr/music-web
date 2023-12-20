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
  iconPse?: string;
  lyricColor?: boolean;
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
    "magenta",
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
  lyricColor: useStorage("lyricColor", true), //语言
  cookie: useStorage("cookie", ""),
  loginTime: useStorage("loginTime", ""), // 记录登录时间
  tagColor,
  userInfo: useStorage<userInfo_T>("userInfo", {} as userInfo_T),
  iconPse: useStorage("iconPse", '/src/assets/icon/runDag.gif'),
};
const mutations = {
  locale: (state: AppType, status: string): void => {
    state.locale = status;
  },
  iconPse: (state: AppType, status: string): void => {
    state.iconPse = status;
  },
  userLogin: (state: AppType, status: userInfo_T): void => {
    state.userInfo = status;
  },
  setLyricColor: (state: AppType, status: boolean): void => {
    console.log("setLyricColor", status);

    state.lyricColor = status;
  },
};
const actions = {
  // 设置语言
  async setLocale({ commit }: ActionContext<AppType, RootState>, lang: string) {
    commit("locale", lang);
  },
  //图标
  async setIcon({ commit }: ActionContext<AppType, RootState>, icon: string) {
    commit("iconPse", icon);
  },
  // user退出
  async UserOuting(
    { commit, dispatch, state, rootState }: ActionContext<AppType, RootState>,
    status: boolean = false,
  ) {
    state.loginTime = 0;
    state.cookie = "";
    rootState.song.myLikeList = [];
    commit("userLogin", {});
  },
  // 登录
  async UserLogin(
    { commit, dispatch, state }: ActionContext<AppType, RootState>,
    info: userInfo_T,
  ) {
    state.loginTime = new Date().getTime() - 2 * 60 * 60 * 1000;
    commit("userLogin", info);
    dispatch("initMusicApp");
  },
  // 刷新登录
  async UserRefresh({
    commit,
    getters,
    state,
  }: ActionContext<AppType, RootState>) {
    if (state.userInfo?.profile?.userId) {
      //不支持刷新二维码登录的cookie)
      // const { cookie } = await _login_refresh();
      // if(isQrlogin){

      // }
      state.cookie = localStorage.getItem("cookie") || "";
    }
    state.loginTime = new Date().getTime();
  },

  // 初始化  每天刷新
  async initQueryData(
    {
      rootState,
      state,
      dispatch,
      rootGetters,
    }: ActionContext<AppType, RootState>,
    info: userInfo_T,
  ) {
    if (rootGetters.loginStatus && diffDays(state.loginTime + "") >= 1) {
      // console.log("超过1天重新获取token", diffDays(localStorage.getItem("loginTime")), 5);
      dispatch("initMusicApp");
    }
  },
  // 暴露 异常调用
  async initMusicApp({
    rootState,
    state,
    dispatch,
    rootGetters,
  }: ActionContext<AppType, RootState>) {
    dispatch("UserRefresh");
    dispatch("getLikelist");
    dispatch("recommendPlaylist");
    dispatch("recommendSong");
    dispatch("getUserPlaylist");
  },
};

const app = {
  state,
  actions,
  mutations,
};
export default app;
