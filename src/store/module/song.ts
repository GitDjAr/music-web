import type { ActionContext, } from "vuex"
import { _song_url_v1, GetSongDetail, GetSong, _lyric, CheckMusic } from "@/api/play"
import { likelist } from '@/api/user'
import { useStorage, RemovableRef } from '@vueuse/core'
import { Notification } from "@arco-design/web-vue"
import MusicPlayer from "@/utils/player"
// import type Song from '../types/song'

enum mode {
  random = 'random',
  order = 'order',
  loop = 'loop',
  one = 'one',
}

interface songType {
  curPlaySong: Object,
  playList: Array<Object>,
  randomPlayList: Array<Object>,
  playListIndex: number,
  myLikeList: Array<number>,
  musicLevel: string,
  playbackMode: 'random' | 'order',
  Player: Object,
}

const state = {
  myLikeList: useStorage('myLikeList', []),
  musicLevel: useStorage('musicLevel', 'lossless'),
  // 当前 or 上次播放历史
  curPlaySong: useStorage('curPlaySong', {}),
  playList: useStorage('playList', []),
  randomPlayList: useStorage('randomPlayList', []),
  playListIndex: useStorage('playListIndex', 0),
  playbackMode: useStorage('playbackMode', 'order'),
  Player: {}
}

const actions = {
  initializePlayer({ state }: ActionContext<songType, songType>, Player: Object) {
    state.Player = new MusicPlayer()
  },
  // 播放等级
  async setMusicLevel({ state }: ActionContext<songType, unknown>, level: string) {
    state.musicLevel = level
  },
  // 喜欢列表
  async getLikelist({ state }: ActionContext<songType, unknown>) {
    const { ids = [] } = await likelist({ timestamp: Date.now() })
    state.myLikeList = ids
  },
  async SetPlayList({ state }: ActionContext<songType, unknown>, list: Array<Object>) {
    state.playList = list
    function shuffleArray<T>(array: T[]): T[] {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array
    }
    state.randomPlayList = shuffleArray([...list])
  },
  async SetPlaybackMode({ state }: ActionContext<songType, unknown>, str: songType['playbackMode'] | undefined) {
    const { playbackMode, randomPlayList, playList } = state

    let flag = playbackMode === 'order'
    state.playbackMode = str || flag ? 'random' : 'order'

    const list = flag ? randomPlayList : playList
    state.playListIndex = list.findIndex(item => item.id === state.curPlaySong.id)
  },
  // 上一首
  async prevSong({ state, dispatch }: ActionContext<songType, unknown>) {
    const { playListIndex } = state
    if (playListIndex === 0) {
      Notification.info('没有上一首了')
      return
    }
    state.playListIndex = playListIndex - 1
    dispatch('modeCat', state.playListIndex)
  },
  // 下一首
  async nextSong({ state, dispatch }: ActionContext<songType, unknown>) {
    state.playListIndex++
    if (state.playListIndex >= state.playList.length) {
      state.playListIndex = 0
    }
    dispatch('modeCat', state.playListIndex)
  },
  modeCat({ dispatch, state }: ActionContext<songType, unknown>, idx: number) {
    const { playList, randomPlayList, playbackMode } = state
    const list = playbackMode === 'random' ? randomPlayList : playList
    const id = list[idx].id
    state.playListIndex = list.findIndex(item => item.id === id)
    try {
      dispatch('ToggleSong', id)
    } catch (error) {
      Notification.error('你!干了什么,居然播放失败了...\n可恶的蜘蛛')
      console.log(error);
    }
  },
  // 切歌
  async ToggleSong({ state, dispatch }: ActionContext<songType, unknown>, id: { id: number }) {
    const { playList, randomPlayList, playbackMode } = state
    const list = playbackMode === 'random' ? randomPlayList : playList
    state.playListIndex = list.findIndex(item => item.id === id)
    // 是否可用
    const { success, message } = await CheckMusic({ id })
    if (success) {
      Notification.info(message + '\n正在使用黑科技...')
      // return
    }
    //  https://music.163.com/song/media/outer/url?id={加上id即可播放}.mp3
    const PlayUrl = `https://music.163.com/song/media/outer/url?id=${id}.mp3`

    const plist = [_song_url_v1({ id }), _lyric({ id }), GetSongDetail({ ids: id })]
    const [{ data: SongUrl }, song_lyric, SongDetail] = await Promise.all(plist)
    const songs = SongDetail?.songs[0] || {}
    const data: any = {
      song: songs,
      picUrl: songs?.al?.picUrl,
      songName: songs?.name,
      lrc: lrcArray(song_lyric.lrc.lyric),
      tlrc: lrcArray(song_lyric.tlyric.lyric, 't'),//翻译版本
      curLrcIndex: 0,
      duration: songs?.dt,
      url: SongUrl[0]?.url || PlayUrl,
      id,
      img: songs.al?.picUrl,
      user: songs.ar[0].name,
      userId: songs.ar[0].id,
    }
    state.curPlaySong = data
    if (!state.Player) {
      dispatch("initializePlayer");
    }
    state.Player._playAudioSource(data.url, true)
  },
}

function lrcArray(str: string, flag: string = 'id'): Array<{ time: number, txt: string }> {
  const f = (e: string) => {
    let time = e.split(']')[0].slice(1, -1)
    const [minutes, seconds] = time.split(':').map(parseFloat);
    const totalSeconds = minutes * 60 + seconds;
    return totalSeconds
  }
  return str.split('\n').map(e => ({ time: f(e), txt: e.split(']')[1] }))
}
export default {
  state: {
    ...state,
  },
  actions,
}
