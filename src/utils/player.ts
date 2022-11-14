


import { Howler, Howl, } from 'howler';

type repeatModeType = 'off' | 'on' | 'one'

class Player {
  _name: string;
  _playing: boolean;
  _progress: number;
  _enabled: boolean;
  _repeatMode: repeatModeType;
  _shuffle: boolean;
  _reversed: boolean;
  _volume: number;
  _volumeBeforeMuted: number;
  _personalFMLoading: boolean;
  _personalFMNextLoading: boolean;
  _list: any[];
  _current: number;
  _currentTrack: { id: number };
  _shuffledList: any[];
  _shuffledCurrent: number;
  _playlistSource: { type: string, id: number };
  _playNextList: any[];
  createdBlobRecords: string[];
  _howler: any;

  constructor(name: string = 'playerMusic') {
    type thisType = Player
    this._name = name
    // 播放器状态
    this._playing = false; // 是否正在播放中
    this._progress = 0; // 当前播放歌曲的进度
    this._enabled = false; // 是否启用Player
    this._repeatMode = 'off'; // off | on | one
    this._shuffle = false; // true | false
    this._reversed = false;
    this._volume = 1; // 0 to 1
    this._volumeBeforeMuted = 1; // 用于保存静音前的音量
    this._personalFMLoading = false; // 是否正在私人FM中加载新的track
    this._personalFMNextLoading = false; // 是否正在缓存私人FM的下一首歌曲

    // 播放信息
    this._list = []; // 播放列表
    this._current = 0; // 当前播放歌曲在播放列表里的index
    this._shuffledList = []; // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
    this._shuffledCurrent = 0; // 当前播放歌曲在随机列表里面的index
    this._playlistSource = { type: 'album', id: 123 }; // 当前播放列表的信息
    this._currentTrack = { id: 86827685 }; // 当前播放歌曲的详细信息
    this._playNextList = []; // 当这个list不为空时，会优先播放这个list的歌
    // this._isPersonalFM = false; // 是否是私人FM模式
    // this._personalFMTrack = { id: 0 }; // 私人FM当前歌曲
    // this._personalFMNextTrack = { id: 0 }; // 私人FM下一首歌曲信息（为了快速加载下一首）

    /**
     * The blob records for cleanup.
     *
     * @private
     * @type {string[]}
     */
    this.createdBlobRecords = [];

    // howler (https://github.com/goldfire/howler.js)
    this._howler = null;
    Object.defineProperty(this, '_howler', {
      enumerable: false,
    });

    // init
    this.initPlayer()
  }
  // 播放状态
  get playStatus(): boolean {
    return this._playing
  }
  _setplayStatus(status: boolean) {
    this._playing = status
  }
  // 播放列表
  _setList(val: any[]) {
    this._list = val
  }

  // 音量
  get volume(): number {
    return this._volume
  }
  _setvolume(val: number) {
    this._volume = val
    this._howler.volume(val)
  }
  // 初始化
  initPlayer() {
  }
  // 播放
  play() {
    this._currentTrack.id = this._howler?.play()
    this._setplayStatus(true)
  }
  // 设置播放 url
  _playAudioSource(source: string, autoplay = false) {
    console.log(source);
    try {
      Howler.unload();
      this._howler = new Howl({
        src: [source],
        html5: true,
        format: ['mp3', 'flac'],
        onend: () => {
          this._nextTrack();
        },
        onload: () => {
          setInterval(() => {
            window.requestAnimationFrame(() => this.progress());
          }, 1000)
        }
      });
      if (!this._howler) {
        throw new Error('播放器构建失败')
      }
      if (autoplay) {
        this.play();
        // if (this._currentTrack.name) {
        //   setTitle(this._currentTrack);
        // }
        // setTrayLikeState(store.state.liked.songs.includes(this.currentTrack.id));
      }
      // this.setOutputDevice();
    } catch (e) {
      console.log(e)
    }
  }
  // 暂停 or 播放
  pause() {
    if (this._playing) {
      this._howler.pause()
      this._setplayStatus(false)
    } else {
      this.play()
    }
  }

  _nextTrack() {
    console.log('next');
  }
  prov() {

  }
  progress(val?: number, id?: number) {
    if (val) {
      this._howler.seek(val, id || this._currentTrack.id)
      this._progress = val
    } else {
      this._progress = this._howler.seek()
      return this._progress
    }
  }

}
// const Play = reactive(new Player('palyer-sound',{}) )

// setTimeout(() => {
//   console.log(Play.playstatus);

// Play.play = ()=>{}    
// console.log(Play.playstatus);

// }, 1000);
// watch(()=>Play,(newVal)=>{
//   console.log(newVal);
// })

export default Player
