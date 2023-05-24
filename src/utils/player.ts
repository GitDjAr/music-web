import { Howler, Howl } from "howler";
import Store from "@/store";
import type { CurSongInfo } from "@/store/module/song";
// import { useStore } from 'vuex';

// const Store = useStore()

function setTitle(track: Partial<CurSongInfo>) {
  document.title = track.songName
    ? `${track.songName} · ${track.user} - Music-PlaySound`
    : "Music-PlaySound";
}

type repeatModeType = "off" | "on" | "one";
interface PlaylistSource {
  type: string;
  id: number;
}

type CurrentTrack = {
  playId: number;
} & Partial<CurSongInfo>;
export interface PlayerInstance {
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
  _currentTrack: CurrentTrack;
  _shuffledList: any[];
  _shuffledCurrent: number;
  _interval: number;
  _playlistSource: PlaylistSource;
  _playNextList: any[];
  createdBlobRecords: string[];
  _howler: any;
  _setvolume: Function;
  _SetPlayStatus: Function;
  stop: Function;
  pause: Function;
  _playAudioSource: Function;
}
class Player implements PlayerInstance {
  _name: string;
  _playing: boolean;
  _progress: number;
  _enabled: boolean;
  _repeatMode: repeatModeType;
  _shuffle: boolean;
  _reversed: boolean;
  _volume: number;
  _interval: number;
  _volumeBeforeMuted: number;
  _personalFMLoading: boolean;
  _personalFMNextLoading: boolean;
  _list: never[];
  _current: number;
  _shuffledList: never[];
  _shuffledCurrent: number;
  _playlistSource: PlaylistSource;
  _currentTrack: CurrentTrack;
  _playNextList: never[];
  createdBlobRecords: never[];
  _howler: any;
  constructor(name: string = "playerMusic") {
    this._name = name;
    // 播放器状态
    this._playing = false; // 是否正在播放中
    this._progress = 0; // 当前播放歌曲的进度
    this._enabled = false; // 是否启用Player
    this._repeatMode = "off"; // off | on | one
    this._shuffle = false; // true | false
    this._reversed = false;
    this._volume = 1; // 0 to 1
    this._interval = 0; // 0 to 1
    this._volumeBeforeMuted = 1; // 用于保存静音前的音量
    this._personalFMLoading = false; // 是否正在私人FM中加载新的track
    this._personalFMNextLoading = false; // 是否正在缓存私人FM的下一首歌曲

    // 播放信息
    this._list = []; // 播放列表
    this._current = 0; // 当前播放歌曲在播放列表里的index
    this._shuffledList = []; // 被随机打乱的播放列表，随机播放模式下会使用此播放列表
    this._shuffledCurrent = 0; // 当前播放歌曲在随机列表里面的index
    this._playlistSource = { type: "album", id: 123 }; // 当前播放列表的信息
    this._currentTrack = { playId: 0 }; // 当前播放歌曲的详细信息
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
    Object.defineProperty(this, "_howler", {
      enumerable: false,
    });

    // init
    this.initPlayer();
  }
  // 播放状态
  get playStatus(): boolean {
    return this._playing;
  }
  _SetPlayStatus(status: boolean) {
    this._playing = status;
  }

  // 音量
  get volume(): number {
    return this._volume;
  }
  _setvolume(val: number) {
    val = val > 1 ? 1 : val < 0 ? 0 : val;
    this._volume = val;
    this._howler.volume(val);
    localStorage.setItem("volume", val + "");
  }
  // 初始化
  initPlayer() {
    const curPlaySong = JSON.parse(localStorage.getItem("curPlaySong") || "{}");
    this._playAudioSource(
      curPlaySong?.url,
      false,
      localStorage.getItem("progress")
    );
    const vo = localStorage.getItem("volume") || 0.8;
    this._setvolume(+vo);
  }
  // 播放
  play() {
    this._currentTrack.playId = this._howler?.play();
    this._SetPlayStatus(true);
    window.clearInterval(this._interval);
    this._interval = window.setInterval(() => {
      this.SetSeeks();
    }, 1000);
  }
  stop() {
    this._howler.pause();
    this._SetPlayStatus(false);
    this.SetSeeks();
    window.clearInterval(this._interval);
  }
  // 设置播放 url
  _playAudioSource(source: string, autoplay = false, seek?: string | null) {
    this._currentTrack = Store.state?.song?.curPlaySong;
    try {
      Howler && Howler.unload();
      this._howler = new Howl({
        src: [source],
        html5: true,
        format: ["mp3", "flac"],
        onend: () => {
          this.nextSong();
        },
        onload: () => {},
      });

      setTitle(this._currentTrack);
      seek && this.SetSeeks(+seek);

      if (!this._howler) {
        throw new Error("播放器构建失败");
      }
      if (autoplay) {
        this.play();
      }
    } catch (e) {
      console.log(e);
    }
  }
  // 暂停 or 播放
  pause() {
    this._playing ? this.stop() : this.play();
  }

  nextSong() {
    Store.dispatch("nextSong");
  }
  prevSong() {
    Store.dispatch("prevSong");
  }
  SetSeeks(val?: number) {
    if (val) {
      this._howler.seek(val);
      this._progress = val;
    } else {
      this._progress = this._howler?.seek();
    }
    localStorage.setItem("progress", this._progress + "");
    return this._progress;
  }
  getHow() {
    return this._howler;
  }
}
export default Player;
