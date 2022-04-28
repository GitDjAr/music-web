import Cookei from "js-cookie"
import { Commit } from "vuex"
import { GetSong ,GetSongDetail} from "@/api/play"
import Player from "@/utils/player"
import {reactive} from 'vue'

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
  curSongInfo: JSON.parse(localStorage.getItem("curSongInfo") || "{}"),
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
    console.log(song);
    
    const { url } = await GetSong({ id: 347230||song.al.id })
    // const { songs = [] } = await GetSongDetail({ ids: 347230||song.al.id })
    const data = {
      song,
      songsList:{
        "songs": [
          {
            "name": "海阔天空",
            "id": 347230,
            "pst": 0,
            "t": 0,
            "ar": [
              {
                "id": 11127,
                "name": "Beyond",
                "tns": [],
                "alias": []
              }
            ],
            "alia": [],
            "pop": 100,
            "st": 0,
            "rt": "600902000004240302",
            "fee": 1,
            "v": 112,
            "crbt": null,
            "cf": "",
            "al": {
              "id": 34209,
              "name": "海阔天空",
              "picUrl": "https://p1.music.126.net/8y8KJC1eCSO_vUKf2MyZwA==/109951165796899183.jpg",
              "tns": [],
              "pic_str": "109951165796899183",
              "pic": 109951165796899180
            },
            "dt": 326000,
            "h": {
              "br": 320001,
              "fid": 0,
              "size": 13042460,
              "vd": -5649,
              "sr": 44100
            },
            "m": {
              "br": 192001,
              "fid": 0,
              "size": 7825493,
              "vd": -3083,
              "sr": 44100
            },
            "l": {
              "br": 128001,
              "fid": 0,
              "size": 5217010,
              "vd": -1486,
              "sr": 44100
            },
            "sq": {
              "br": 798710,
              "fid": 0,
              "size": 32547445,
              "vd": -5601,
              "sr": 44100
            },
            "hr": null,
            "a": null,
            "cd": "1",
            "no": 1,
            "rtUrl": null,
            "ftype": 0,
            "rtUrls": [],
            "djId": 0,
            "copyright": 1,
            "s_id": 0,
            "mark": 8192,
            "originCoverType": 1,
            "originSongSimpleData": null,
            "tagPicList": null,
            "resourceState": true,
            "version": 112,
            "songJumpInfo": null,
            "entertainmentTags": null,
            "single": 0,
            "noCopyrightRcmd": null,
            "rtype": 0,
            "rurl": null,
            "mst": 9,
            "cp": 7002,
            "mv": 376199,
            "publishTime": 746812800000,
            "tns": [
              "Boundless Oceans, Vast Skies"
            ]
          }
        ],
        "privileges": [
          {
            "id": 347230,
            "fee": 1,
            "payed": 0,
            "st": 0,
            "pl": 0,
            "dl": 0,
            "sp": 0,
            "cp": 0,
            "subp": 0,
            "cs": false,
            "maxbr": 999000,
            "fl": 0,
            "toast": false,
            "flag": 260,
            "preSell": false,
            "playMaxbr": 999000,
            "downloadMaxbr": 999000,
            "maxBrLevel": "lossless",
            "playMaxBrLevel": "lossless",
            "downloadMaxBrLevel": "lossless",
            "plLevel": "none",
            "dlLevel": "none",
            "flLevel": "none",
            "rscl": null,
            "freeTrialPrivilege": {
              "resConsumable": false,
              "userConsumable": false,
              "listenType": null
            },
            "chargeInfoList": [
              {
                "rate": 128000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              },
              {
                "rate": 192000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              },
              {
                "rate": 320000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              },
              {
                "rate": 999000,
                "chargeUrl": null,
                "chargeMessage": null,
                "chargeType": 1
              }
            ]
          }
        ],
        "code": 200
      },
      url,
    }
    localStorage.setItem("curSongInfo", JSON.stringify(data))
    // const { url } = await CheckMusic({ id: song.al.id })
    
    commit("CurPlaySong", data)
  },
}
export default {
  state:{
    ...state,
    Player: reactive(new Player())
  },
  actions,
  mutations,
}
