import request from "../utils/requires.js";
type Data = Object | string;
import Store from "@/store";

//获取音乐 url
// 说明 : 使用歌单详情接口后 , 能得到的音乐的 id, 但不能得到的音乐 url, 调用此接口, 传入的音乐 id( 可多个 , 用逗号隔开 ), 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
export function GetSong(params: {}) {
  return request({
    url: `/song/url`,
    method: "get",
    params: {
      ...params,
      timestamp: new Date().getTime(),
    },
  });
}
// 获取歌曲详情
// 说明 : 调用此接口 , 传入音乐 id(支持多个 id, 用 , 隔开), 可获得歌曲详情(dt为歌曲时长)
// 必选参数 : ids: 音乐 id, 如 ids=347230
export function GetSongDetail(params: Data = {}, method?: any) {
  return request({
    url: "/song/detail",
    method: "get",
    params,
  });
}
//音乐是否可用
// 必选参数 : id : 歌曲 id
// 可选参数 : br: 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
export function CheckMusic(params: {}) {
  return request({
    url: "/check/music",
    method: "get",
    params,
  });
}

/**获取音乐 url - 新版
说明 : 使用注意事项同上
必选参数 : id : 音乐 id level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
 */
export function _song_url_v1(params: {}) {
  console.log(Store);

  return request({
    url: "/song/url/v1",
    method: "get",
    params: {
      ...params,
      level: Store.state.song.musicLevel,
    },
  });
}

//获取歌词 id
export function _lyric(params: object = {}) {
  return request({
    url: "/lyric",
    method: "get",
    params,
  });
}

/**
 * 获取相似音乐
说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌曲
必选参数 : id: 歌曲 id
接口地址 : /simi/song
调用例子 : /simi/song?id=347230 ( 对应 ' 光辉岁月 ' 相似歌曲 )
 */
export function _simi_song(params: { id: number }) {
  return request({
    url: "/simi/song",
    method: "get",
    params,
  });
}
