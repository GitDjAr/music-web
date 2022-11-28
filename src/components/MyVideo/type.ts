import { type } from "os"

export interface VideoMethods {
  play: () => boolean             //	-	开始播放。
  pause: () => boolean             //	-	暂停播放。
  togglePlay: (toggle: boolean) => boolean             //	布尔	切换播放，如果没有传递参数，它将根据当前状态进行切换。
  stop: () => boolean             //	-	停止播放并重置以开始。
  restart: () => boolean             //	-	重新开始播放。
  rewind: (seekTime: number | undefined) => boolean             //	数	按指定的寻道时间倒回播放。如果未传递任何参数，则将使用默认寻道时间。
  forward: (seekTime: number | undefined) => boolean             //	数	按指定的寻道时间快进。如果未传递任何参数，则将使用默认寻道时间。
  increaseVolume: (step: number | undefined) => boolean             //	数	按指定步骤增加音量。如果未传递任何参数，则将使用默认步骤。
  decreaseVolume: (step: number | undefined) => boolean             //	数	按指定步骤增加音量。如果未传递任何参数，则将使用默认步骤。
  toggleCaptions: (toggle: boolean | undefined) => boolean             //	布尔	切换字幕显示。如果未传递任何参数，它将根据当前状态进行切换。
  fullscreen: {
    enter: () => boolean             //	-	进入全屏。如果不支持全屏，则改用回退“全窗口/视口”。
    exit: () => boolean             //	-	退出全屏。
    toggle: () => boolean             //	-	切换全屏。
  }
  airplay: () => boolean             //	-	在支持的设备上触发隔空播放对话框。
  setPreviewThumbnails: (source: string) => void             //	-	设置当前源的预览缩略图。
  toggleControls: (toggle: boolean) => boolean             //	布尔	切换控件（仅限视频）。采用可选的真值来强制打开/关闭它。
  on: (event, function)=> boolean             //	字符串、函数	为指定事件添加事件侦听器。
  once: (event, function)=> boolean             //	字符串、函数	为指定事件添加一次事件侦听器。
  off: (event: string, function: (e:)=> {}:any)=> any             //	字符串、函数	删除指定事件的事件侦听器。
supports: (type: string) => boolean             //	字符串	检查对 MIME 类型的支持。
destroy: () => boolean             //	-	销毁实例并垃圾回收所有元素。
}


export interface VideoEvent {
  progress: () => void, // 定期发送，以通知相关方下载媒体的进度。有关已下载的媒体的当前数量的信息可在媒体元素的属性中找到。buffered
  playing: () => void, // 在媒体开始播放时发送（第一次、暂停后或结束然后重新启动后发送）。
  play: () => void, // 暂停后开始播放媒体时发送;也就是说，当播放在先前事件后恢复时。pause
  pause: () => void, // 播放暂停时发送。
  timeupdate: () => void, // 元素属性指示的时间已更改。currentTime
  volumechange: () => void, // 在音频音量更改时发送（设置音量和更改状态时）。muted
  seeking: () => void, // 在查找操作开始时发送。
  seeked: () => void, // 在查找操作完成时发送。
  ratechange: () => void, // 播放速度更改时发送。
  ended: () => void, // 播放完成后发送。注意：这不会触发 ifis true。autoplay
  enterfullscreen: () => void, // 当播放器进入全屏模式（对于旧版浏览器，正确的全屏或全窗口回退）时发送。
  exitfullscreen: () => void, // 在播放器退出全屏模式时发送。
  captionsenabled: () => void, // 启用字幕时发送。
  captionsdisabled: () => void, // 禁用字幕时发送。
  languagechange: () => void, // 字幕语言更改时发送。
  controlshidden: () => void, // 控件隐藏时发送。
  controlsshown: () => void, // 显示控件时发送。
  ready: () => void, // 在实例准备好进行 API 调用时触发。
}

export interface videoAttribute {
  isHTML5: boolean,                 //	 -	返回一个布尔值，指示当前播放器是否为 HTML5。
  isEmbed: boolean,                 //	 -	返回一个布尔值，该值指示当前播放器是否为嵌入式播放器。
  playing: boolean,                 //	 -	返回一个布尔值，指示当前玩家是否正在玩游戏。
  paused: boolean,                 //	 -	返回一个布尔值，指示当前玩家是否已暂停。
  stopped: boolean,                 //	 -	返回一个布尔值，指示当前播放器是否已停止。
  ended: boolean,                 //	 -	返回一个布尔值，指示当前播放器是否已完成播放。
  buffered: boolean,                 //	 -	返回一个介于 0 和 1 之间的浮点数，指示缓冲了多少媒体
  currentTime: boolean,                 //	 获取或设置播放器的当前时间。二传手在几秒钟内接受浮点数。
  seeking: boolean,                 //	 -	返回一个布尔值，指示当前玩家是否正在寻找。
  duration: boolean,                 //	 -	返回当前媒体的持续时间。
  volume: boolean,                 //	 获取或设置播放器的音量。二传手接受介于 0 和 1 之间的浮点数。
  muted: boolean,                 //	 获取或设置播放器的静音状态。二传手接受布尔值。
  hasAudio: boolean,                 //	 -	返回一个布尔值，该值指示当前媒体是否具有音轨。
  speed: number,                 //	 获取或设置播放器的速度。资源库接受配置中指定的选项中的值。通常最小值应为 0.5。
  quality: string,                 //	 获取或设置播放器的质量。资源库接受配置中指定的选项中的值。
  loop: boolean,                 //	 获取或设置播放器的当前循环状态。二传手接受布尔值。
  source: {},                 //	 获取或设置播放器的当前源。资源库接受对象。有关示例，请参阅下面的源设置器。
  poster: string,                 //	 获取或设置播放器的当前海报图像。二传手接受字符串;更新后的海报图像的 URL。
  previewThumbnails: string,                 //	 获取或设置播放器的当前预览缩略图源。二传手接受字符串
  autoplay: boolean,                 //	 获取或设置播放器的自动播放状态。二传手接受布尔值。
  currentTrack: any,                 //	 按索引获取或设置字幕轨道。表示轨道丢失或标题未处于活动状态-1
  language: string,                 //	 获取或设置播放器的首选字幕语言。设置器接受 ISO 双字母语言代码。对语言的支持取决于您包含的字幕。如果您的字幕没有任何语言数据，或者您有多个使用相同语言的轨道，则可能需要使用。currentTrack
  fullscreen: {
    active: boolean,                 //	 -	返回一个布尔值，指示当前播放器是否处于全屏模式。
    enabled: boolean,                 //	 -	返回一个布尔值，指示当前播放器是否启用了全屏。
  }
  pip: boolean,                 //	 获取或设置播放器的画中画状态。二传手接受布尔值。目前仅在Safari 10+（MacOS Sierra+和iOS 10+上）和Chrome 70+上支持此功能。
  ratio: string,                 //	 获取或设置视频纵横比。二传手接受与选项格式相同的字符串。ratio
  download: string,                 //	 获取或设置下载按钮的 URL。资源库接受包含有效绝对 URL 的字符串。
}

type videoInstance = videoAttribute & VideoMethods
export default videoInstance