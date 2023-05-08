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
  locale: string;
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
  cookie: string;
  loginTime: number;
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
    { commit }: ActionContext<AppType, RootState>,
    status: boolean = false
  ) {
    commit("userLogin", {});
  },
  // 登录
  async UserLogin(
    { commit, dispatch }: ActionContext<AppType, RootState>,
    info: userInfo_T
  ) {
    commit("userLogin", info);
    dispatch("UserRefresh");
    dispatch("getUserPlaylist", info.account.id);
    dispatch("initQueryDataa");
  },
  // 刷新登录
  async UserRefresh({
    commit,
    getters,
    state,
  }: ActionContext<AppType, RootState>) {
    if (!getters.loginStatus) return;
    const { cookie } = await _login_refresh();
    state.cookie = cookie;
    state.loginTime = new Date().getTime();
  },

  // 初始化
  async initQueryDataa(
    {
      rootState,
      state,
      dispatch,
      rootGetters,
    }: ActionContext<AppType, RootState>,
    info: userInfo_T
  ) {
    // console.log(rootState);

    if (!rootState.song.myLikeList.length) {
      dispatch("getLikelist");
      // dispatch("getLikelist");
      // dispatch("getAlbumSublist");
    }
    if (
      rootGetters.loginStatus &&
      diffDays(localStorage.getItem("loginTime") || "") > 1
    ) {
      // console.log("超过1天重新获取token", diffDays(localStorage.getItem("loginTime")), 5);
      dispatch("UserRefresh");
      dispatch("getLikelist");
    }
  },
};

const app = {
  state,
  actions,
  mutations,
};
export default app;
