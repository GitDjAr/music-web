import Cookei from "js-cookie"
import { Commit } from "vuex"
import { GetSong, GetSongDetail } from "@/api/play"
import Player from "@/utils/player"
import { reactive } from 'vue'
// import type Song from '../types/song'


interface active {
  commit: Commit
  state: () => {}
}
interface userInfoOption {
  [string: string]: Object
}
const appuser = localStorage.getItem("userInfo") || "{}"
const cp = localStorage.getItem("CurPlaySong") || '{}'
const state = {
  locale: Cookei.get("locale") || "zh-CN",
  test: "test",
  userInfo: JSON.parse(appuser) || {},
  loginStatus: Cookei.get("loginStatus"),

  // 当前 or 上次播放历史
  CurPlaySong: JSON.parse(cp) || {},
  // CurPlaySong:{},
}
const mutations = {
  locale: (state, status): void => (state.locale = status),
  test: (state, status): void => (state.test = status),
  userLogin: (state, status): void => (state.userInfo = status),
  loginStatus: (state, status): void => (state.loginStatus = status),
  CurPlaySong: (state, status): void => {
    state.CurPlaySong = status
  },
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
  async ToggleSong({ commit }: active, song: any) {
    const { data: SongInfo } = await GetSong({ id: song.id }, true)
    const Detail = await GetSongDetail({ ids: song.id })
    // const { data: {songs} } = Detail
    // debugger
    // let songsList: Song.RootObject[]
    const data: any = {
      song,
      picUrl: song.al.picUrl,
      songName: song.al.name,
      duration: song.dt,
      songsList: Detail,
      url: SongInfo[0]?.url,
    }
    localStorage.setItem("CurPlaySong", JSON.stringify(data))
    // const { url } = await CheckMusic({ id: song.al.id })
    playerMusic._playAudioSource(data?.url, true)
    commit("CurPlaySong", data)
    console.log(data);
  },
}

function selfish(target: any) {
  const cache = new WeakMap();
  const handler = {
    set(target: any, prop: string, val: any) {
      // console.log({ prop, val });
      target[prop] = val;
      if (prop === '_howler') return true;
      // target.saveSelfToLocalStorage();
      // target.sendSelfToIpcMain();
      return true;
      // console.log(target, key);

      // const value = Reflect.get(target, key);
      // debugger
      // if (typeof value !== 'function') {
      //   return value;
      // }
      // if (!cache.has(value)) {
      //   cache.set(value, value.bind(target));
      // }
      // return cache.get(value);
    },

  };
  const proxy = new Proxy(target, handler);
  return proxy;
}

const playerMusic = selfish(new Player())

// playerMusic.initPlayer()

export default {
  state: {
    ...state,
    Player: playerMusic
  },
  actions,
  mutations,
}
