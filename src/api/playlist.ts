import request from "../utils/requires.js";
import { often } from "./types/all";
import * as T from "./types/playList";
export type { T };

type And<T = any> = {
  code: number;
  lasttime?: number;
  total?: number;
  more?: boolean;
} & T;

export type reqPage = Required<often>;

/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * - limit: 取出数量 , 默认为 30 (不支持 offset)
 * - 调用例子 : /personalized?limit=1
 * @param {Object} params
 * @param {number=} params.limit
 */
export function recommendPlaylist(params?: { limit?: number }) {
  return request<And<any>>({
    url: "/personalized",
    method: "get",
    params,
  });
}
/**
 * 获取每日推荐歌单
 * 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
 * @param {Object} params
 * @param {number=} params.limit
 */
export function dailyRecommendPlaylist(params: any) {
  return request<And<any>>({
    url: "/recommend/resource",
    method: "get",
    params: {
      params,
      timestamp: Date.now(),
    },
  });
}

/**
 * 说明 : 调用接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 */
export interface cloudsearch {
  keywords: string;
  type?: number;
}
export function cloudsearch(params: cloudsearch) {
  return request<
    And<{
      result: {
        songs: T.Track[] & T.MusicPlayList[];
        albums: T.Album[];
        artists: {
          picUrl: string;
          name: string;
        }[];
      };
    }>
  >({
    url: "/cloudsearch",
    method: "get",
    params,
  });
}

/**
 * 精品歌单标签列表
说明 : 调用此接口 , 可获取精品歌单标签列表
接口地址 : /playlist/highquality/tags
 */

export function highQualityPlaylistTags() {
  return request<And<{ tags: T.tags[] }>>({
    url: "/playlist/highquality/tags",
    method: "get",
  });
}

/**
 * 获取精品歌单
 * 说明 : 调用此接口 , 可获取精品歌单
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部", 可从精品歌单标签列表接口获取(/playlist/highquality/tags)
 * - limit: 取出歌单数量 , 默认为 20
 * - before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
 * @param {Object} params
 * @param {string} params.cat
 * @param {number=} params.limit
 * @param {number} params.before
 */
export interface getPlaylistParams {
  cat?: string;
  limit?: number;
  before?: number;
}
export function highQualityPlaylist(params?: getPlaylistParams) {
  return request<And<{ playlists: T.MusicPlayList[] }>>({
    url: "/top/playlist/highquality",
    method: "get",
    params,
  });
}

/**
 * 歌单 ( 网友精选碟 )
 * 说明 : 调用此接口 , 可获取网友精选碟歌单
 * - order: 可选值为 'new' 和 'hot', 分别对应最新和最热 , 默认为 'hot'
 * - cat: tag, 比如 " 华语 "、" 古风 " 、" 欧美 "、" 流行 ", 默认为 "全部",可从歌单分类接口获取(/playlist/catlist)
 * - limit: 取出歌单数量 , 默认为 50
 * @param {Object} params
 * @param {string} params.order
 * @param {string} params.cat
 * @param {number=} params.limit
 */
export interface internetUsersSelectDish {
  order?: string;
  cat?: string;
  limit?: number;
}
export function topPlaylist(params: internetUsersSelectDish) {
  return request<And<{ playlists: T.MusicPlayList[] }>>({
    url: "/top/playlist",
    method: "get",
    params,
  });
}

/**
 * 获取用户歌单
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户歌单
 * - uid : 用户 id
 * - limit : 返回数量 , 默认为 30
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.limit
 * @param {number=} params.offset
 */
export interface userPlaylist {
  limit?: number;
  offset?: number;
  uid: number;
}
export function userPlaylist(params: userPlaylist) {
  return request<And<{ playlist: T.MusicPlayList[] }>>({
    url: "/user/playlist",
    method: "get",
    params,
  });
}

/**
 * 歌单分类
 * 说明 : 调用此接口,可获取歌单分类,包含 category 信息
 */
export function playlistCatlist() {
  return request<And<any>>({
    url: "/playlist/catlist",
    method: "get",
  });
}

/**
 * 所有榜单
 * 说明 : 调用此接口,可获取所有榜单 接口地址 : /toplist
 */
export function toplists() {
  return request<And<any>>({
    url: "/toplist",
    method: "get",
  });
}

/**
 * 收藏/取消收藏歌单
 * 说明 : 调用此接口, 传入类型和歌单 id 可收藏歌单或者取消收藏歌单
 * - t : 类型,1:收藏,2:取消收藏
 * - id : 歌单 id
 * @param {Object} params
 * @param {number} params.t
 * @param {number} params.id
 */
export interface CollectParams {
  t: 1 | 2;
  id: number;
}
export function subscribePlaylist(params: CollectParams) {
  return request<And<any>>({
    url: "/playlist/subscribe",
    method: "post",
    params,
  });
}

// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
export interface _playlist_detail {
  id: number;
  s?: number;
}
export function _playlist_detail(params: _playlist_detail) {
  return request<And<{ playlist: T.PlayObj }>>({
    url: "/playlist/detail",
    method: "get",
    params,
  });
}

//获取歌单所有歌曲 id limit offset
export function _playlist_track_all(params: object = {}) {
  return request<And<{ songs: T.MusicPlayList[] }>>({
    url: "/playlist/track/all",
    method: "get",
    params,
  });
}

/**
 * 删除歌单
 * 说明 : 调用此接口 , 传入歌单id可删除歌单
 * - id : 歌单id,可多个,用逗号隔开
 *  * @param {number} id
 */
export function deletePlaylist(id: string) {
  return request<And<any>>({
    url: "/playlist/delete",
    method: "post",
    params: { id },
  });
}

/**
 * 新建歌单
 * 说明 : 调用此接口 , 传入歌单名字可新建歌单
 * - name : 歌单名
 * - privacy : 是否设置为隐私歌单，默认否，传'10'则设置成隐私歌单
 * - type : 歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单
 * @param {Object} params
 * @param {string} params.name
 * @param {number} params.privacy
 * @param {string} params.type
 */
export interface CreateParams {
  name: string;
  privacy?: number;
  type?: string;
  timestamp?: number;
}
export function createPlaylist(params: CreateParams) {
  params.timestamp = new Date().getTime();
  return request<And<any>>({
    url: "/playlist/create",
    method: "post",
    params,
  });
}

/**
 * 对歌单添加或删除歌曲
 * 说明 : 调用此接口 , 可以添加歌曲到歌单或者从歌单删除某首歌曲 ( 需要登录 )
 * - op: 从歌单增加单曲为 add, 删除为 del
 * - pid: 歌单 id tracks: 歌曲 id,可多个,用逗号隔开
 * @param {Object} params
 * @param {string} params.op
 * @param {string} params.pid
 */
export interface playListEdit {
  op: string;
  pid: string;
  tracks: string[];
}
export function addOrRemoveTrackFromPlaylist(params: playListEdit) {
  return request<And<any>>({
    url: "/playlist/tracks",
    method: "post",
    params,
  });
}

/**
 * 心动模式/智能播放
 * 说明 : 登录后调用此接口 , 可获取心动模式/智能播放列表 必选参数 : id : 歌曲 id
 * - id : 歌曲 id
 * - pid : 歌单 id
 * - sid : 要开始播放的歌曲的 id (可选参数)
 * @param {Object} params
 * @param {number=} params.id
 * @param {number=} params.pid
 */
export interface intelligencePlaylistType {
  id: number;
  pid: number;
  sid?: number;
}
export function intelligencePlaylist(params: intelligencePlaylistType) {
  return request<And<any>>({
    url: "/playmode/intelligence/list",
    method: "get",
    params,
  });
}

/**
 * 获取专辑内容
说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
必选参数 : id: 专辑 id
接口地址 : /album
 */
export interface albumContent {
  id: number;
}
export function albumContent(params: albumContent) {
  return request<And<any>>({
    url: "/album",
    method: "get",
    params,
  });
}

/**
 * 获取已收藏专辑列表
说明 : 调用此接口 , 可获得已收藏专辑列表
可选参数 :
limit: 取出数量 , 默认为 25
offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
接口地址 : /album/sublist
 */

export function albumSublist(params: often) {
  return request<And<any>>({
    url: "/album/sublist",
    method: "get",
    params,
  });
}

/**
 * 收藏/取消收藏专辑
  说明 : 调用此接口,可收藏/取消收藏专辑
  必选参数 :
  id : 专辑 id
  t : 1 为收藏,其他为取消收藏
  接口地址 : /album/sublist
 */
export function albumSub(params: Object) {
  return request<And<any>>({
    url: "/album/sublist",
    method: "get",
    params,
  });
}

/**
 * 最近播放-歌曲
  说明 : 调用此接口 , 可获得最近播放-歌曲
  可选参数 : limit : 返回数量 , 默认为 100
 */
export function songHistory(params: Object) {
  return request<And<any>>({
    url: "/record/recent/song",
    method: "get",
    params,
  });
}

/**
 * 推荐新音乐
说明 : 调用此接口 , 可获取推荐新音乐
可选参数 : limit: 取出数量 , 默认为 10 (不支持 offset)
接口地址 : /personalized/newsong
 */
export function newSong(params?: Object) {
  return request<And<any>>({
    url: "/personalized/newsong",
    method: "get",
    params,
  });
}

/**
 * 曲风偏好
说明: 登录后调用此接口获取我的曲风偏好
接口地址: /style/preference
 */
export function preference() {
  return request<And<any>>({
    url: "/style/preference",
    method: "get",
  });
}
