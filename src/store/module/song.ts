import type { ActionContext } from "vuex";
import type SongInfo from "../types/song";
import type { PlayerInstance } from "@/utils/player";
import type { RootState } from "../index";

import MusicPlayer from "@/utils/player";
import { useStorage } from "@vueuse/core";
import { _song_url_v1, GetSongDetail, _lyric, CheckMusic } from "@/api/play";
import { albumSublist, userPlaylist, T } from "@/api/playlist";
import { likelist } from "@/api/user";
import { shuffleArray } from "@/utils/gFn";
import { checkUrl } from "@/utils/common";
import { Notification } from "@arco-design/web-vue";
export interface CurSongInfo {
  song: SongInfo.Song;
  picUrl: string;
  songName: string;
  lrc: Array<{ time: number; txt: string }>;
  tlrc?: Array<{ time: number; txt: string }>;
  curLrcIndex: number;
  duration: number;
  url: string;
  id: number;
  img: string;
  user: string;
  userId: number;
}
export enum PlaybackMode {
  Random = "random",
  Order = "order",
  Loop = "loop",
  One = "one",
}

export interface paramType {
  id: number;
  playListId: string | number;
  list?: T.MusicPlayList[];
}
export interface songType {
  curPlaySong: CurSongInfo;
  playList: T.MusicPlayList[];
  randomPlayList: T.MusicPlayList[];
  playListIndex: number;
  myLikeList: Array<number>;
  musicLevel: string;
  playbackMode: "random" | "order";
  Player: PlayerInstance;
  collectList: Object;
  playListId: string | number;
}

const state = {
  myLikeList: useStorage("myLikeList", []),
  musicLevel: useStorage("musicLevel", "lossless"),
  // 当前 or 上次播放历史
  curPlaySong: useStorage("curPlaySong", {}),
  playList: useStorage<T.MusicPlayList[]>("playList", []),
  playListId: useStorage("playListId", []),
  randomPlayList: useStorage("randomPlayList", []),
  playListIndex: useStorage("playListIndex", 0),
  playbackMode: useStorage("playbackMode", "order"),
  Player: {},
  collectList: useStorage("collectList", []),
};

const actions = {
  initializePlayer(
    { state }: ActionContext<songType, songType>,
    Player: Object
  ) {
    state.Player = new MusicPlayer();
  },

  // 设置播放等级
  async setMusicLevel(
    { state }: ActionContext<songType, RootState>,
    level: string
  ) {
    state.musicLevel = level;
  },

  async getUserPlaylist(
    { state, rootState }: ActionContext<songType, RootState>,
    uid: number | null = null
  ) {
    uid ||= rootState?.app?.userInfo?.account?.id;
    console.log(rootState, rootState?.app?.userInfo?.account.id, uid);
    // return
    const { playlists } = await userPlaylist({
      uid: uid!,
      limit: 9999,
      offset: 0,
    });
    state.collectList = {
      playlist: playlists,
      total: playlists?.length || 0,
      ids: playlists.map((item: any) => item.id),
    };
  },

  // 获取喜欢列表
  async getLikelist(
    { rootState, state }: ActionContext<songType, RootState>,
    uid: number | null = null
  ) {
    uid ||= rootState?.app?.userInfo?.account?.id;
    const { ids = [] } = await likelist({ uid: 12, timestamp: Date.now() });
    state.myLikeList = ids;
  },

  // 播放列表 删除歌曲
  async deleteSong(
    { state, rootState }: ActionContext<songType, RootState>,
    id: number
  ) {
    state.playList = state.playList.filter((item) => item.id !== id);
  },

  // 收藏专辑
  async getAlbumSublist({ state }: ActionContext<songType, RootState>) {
    const { ids = [] } = await albumSublist({ timestamp: Date.now() });
    state.myLikeList = ids;
  },

  //  歌单 索引 id记录
  async SetPlayList(
    { state }: ActionContext<songType, RootState>,
    param: Partial<paramType>
  ) {
    const { id, playListId, list: updateList = [] } = param;
    const { playbackMode } = state;

    // 是否切换了歌单
    if (state.playListId != playListId) {
      state.playListId = playListId || "errId";
      state.playList = updateList;
      state.randomPlayList = shuffleArray([...updateList]);
    }
    // 歌曲id - 当前模式索引
    if (id) {
      const list =
        playbackMode === "random" ? state.randomPlayList : state.playList;
      state.playListIndex = list.findIndex((item) => item.id === id);
    }
  },

  //设置播放模式
  async SetPlaybackMode(
    { state }: ActionContext<songType, RootState>,
    str: songType["playbackMode"] | undefined
  ) {
    const { playbackMode, randomPlayList, playList } = state;

    let flag = playbackMode === "order";
    state.playbackMode = str || flag ? "random" : "order";

    const list = flag ? randomPlayList : playList;
    state.playListIndex = list.findIndex(
      (item) => item.id === state.curPlaySong.id
    );
  },

  // 上一首
  async prevSong({ state, dispatch }: ActionContext<songType, RootState>) {
    const { playListIndex } = state;
    if (playListIndex === 0) {
      Notification.info("没有上一首了");
      return;
    }
    state.playListIndex = playListIndex - 1;
    dispatch("modeCat", state.playListIndex);
  },

  // 下一首
  async nextSong({ state, dispatch }: ActionContext<songType, RootState>) {
    state.playListIndex++;
    if (state.playListIndex >= state.playList.length) {
      state.playListIndex = 0;
    }
    dispatch("modeCat", state.playListIndex);
  },

  modeCat(
    { dispatch, state }: ActionContext<songType, RootState>,
    idx: number
  ) {
    const { playList, randomPlayList, playbackMode } = state;
    const list = playbackMode === "random" ? randomPlayList : playList;
    const id = list[idx].id;
    try {
      dispatch("ToggleSong", { id, playListId: state.playListId, list: [] });
    } catch (error) {
      Notification.error("你!干了什么,居然播放失败了...\n可恶的蜘蛛");
      console.log(error);
    }
  },

  PlayStop({ state, dispatch }: ActionContext<songType, RootState>) {
    state.Player.stop();
  },

  // 切歌
  async ToggleSong(
    { state, dispatch }: ActionContext<songType, RootState>,
    param: paramType
  ) {
    const { id } = param;
    if (!id) {
      console.log(param);
      Notification.info("播放错误" + "\n请检查参数是否正确");
      return;
    }
    dispatch("SetPlayList", param);
    // 是否可用
    const { success, message } = await CheckMusic({ id });
    let PlayUrl = "";
    if (success) {
      Notification.info(message + "\n正在使用黑科技...");
    } else {
      //  https://music.163.com/song/media/outer/url?id={加上id即可播放}.mp3
      PlayUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      if (!(await checkUrl(PlayUrl))) {
        Notification.info(message + " >> 即将播放下一首");
        setTimeout(() => dispatch("nextSong"), 500);
        return;
      }
      Notification.info(message + "\n正在使用黑科技...");
    }

    const plist = [
      _song_url_v1({ id }),
      _lyric({ id }),
      GetSongDetail({ ids: id }),
    ];
    const [{ data: SongUrl }, song_lyric, SongDetail] = await Promise.all(
      plist
    );
    const songs = SongDetail?.songs[0] || {};
    const data: CurSongInfo = {
      song: songs,
      picUrl: songs?.al?.picUrl,
      songName: songs?.name,
      lrc: lrcArray(song_lyric.lrc.lyric),
      // tlrc: lrcArray(song_lyric.tlyric.lyric, 't'),//翻译版本
      curLrcIndex: 0,
      duration: songs?.dt,
      url: SongUrl[0]?.url || PlayUrl,
      id,
      img: songs.al?.picUrl + "?param=400y400",
      user: songs.ar[0].name,
      userId: songs.ar[0].id,
    };
    state.curPlaySong = data;
    if (!state.Player) {
      dispatch("initializePlayer");
    }
    state.Player._playAudioSource(data.url, true);
  },
};

function lrcArray(
  str: string,
  flag: string = "id"
): Array<{ time: number; txt: string }> {
  const f = (e: string) => {
    let time = e.split("]")[0].slice(1, -1);
    const [minutes, seconds] = time.split(":").map(parseFloat);
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds;
  };
  return str.split("\n").map((e) => ({ time: f(e), txt: e.split("]")[1] }));
}

export default {
  state: {
    ...state,
  },
  actions,
};
