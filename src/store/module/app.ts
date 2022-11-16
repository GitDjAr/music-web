import { Store, Commit } from "vuex"
import { GetSong, GetSongDetail } from "@/api/play"
import Player from "@/utils/player"
import { reactive } from 'vue'
// import type Song from '../types/song'

interface userInfoOption {
  [string: string]: Object
}
const appuser = localStorage.getItem("userInfo") || "{}"
const cp = localStorage.getItem("CurPlaySong") || '{}'
const state = {
  locale: localStorage.getItem("locale") || "zh-CN",
  userInfo: JSON.parse(appuser) || {},

  // 当前 or 上次播放历史
  CurPlaySong: JSON.parse(cp) || {},
  // CurPlaySong:{},
}
const mutations = {
  locale: (state, status): void => (state.locale = status),
  userLogin: (state, status): void => (state.userInfo = status),
  CurPlaySong: (state, status): void => {
    state.CurPlaySong = status
  },
}
const actions = {
  // 设置语言
  async setLocale({ commit, state }: { commit: Commit }, lang: string) {
    commit("locale", lang)
    localStorage.setItem("locale", lang)
  },
  // user退出
  async UserOutin({ commit }: { commit: Commit }, status: boolean = false) {
    localStorage.setItem("userInfo", "{}")
    commit("userLogin", {})
  },
  // 登录
  async UserLogin({ commit }: { commit: Commit }, info: userInfoOption) {
    commit("userLogin", info)
    localStorage.setItem("userInfo", JSON.stringify(info))
  },
  // 切歌
  async ToggleSong({ commit }: { commit: Commit }, song: any) {
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

// 代理 music 播放器
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
