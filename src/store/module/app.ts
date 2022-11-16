import { Store, Commit } from "vuex"
import { _song_url_v1, GetSongDetail, GetSong, CheckMusic } from "@/api/play"
import Player from "@/utils/player"
import { reactive } from 'vue'
import { Notification } from "@arco-design/web-vue"
// import type Song from '../types/song'

interface userInfoOption {
  [string: string]: Object
}
const appuser = localStorage.getItem("userInfo") || "{}"
const cp = localStorage.getItem("CurPlaySong") || '{}'
const state = {
  locale: localStorage.getItem("locale") || "zh-CN",
  musicLevel: localStorage.getItem('musicLevel') || 'lossless',

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
  musicLevel: (state, status): void => (state.musicLevel = status),
}
const actions = {
  // 设置语言
  async setLocale({ commit }: { commit: Commit }, lang: string) {
    commit("locale", lang)
    localStorage.setItem("locale", lang)
  },
  // 播放等级
  async setMusicLevel({ commit }: { commit: Commit }, level: string) {
    commit("musicLevel", level)
    localStorage.setItem("musicLevel", level)
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
  async ToggleSong({ commit }: { commit: Commit }, { id }: { id: number }) {
    // 是否可用
    // const { success, message } = await CheckMusic({ id })
    // if (!success) {
    //   Notification.info(message)
    //   return
    // }
    const plist = [GetSong({ id }, true), GetSongDetail({ ids: id })]
    const [{ data: SongUrl }, SongDetail] = await Promise.all(plist)
    console.log(id, SongUrl, SongDetail)
    const data: any = {
      song: SongDetail,
      picUrl: SongDetail.al.picUrl,
      songName: SongDetail.al.name,
      duration: SongDetail.dt,
      songsList: SongDetail,
      url: SongUrl[0]?.url,
    }
    localStorage.setItem("CurPlaySong", JSON.stringify(data))
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
