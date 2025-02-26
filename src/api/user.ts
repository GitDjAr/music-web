import request from "../utils/requires.js";

import type { RootUser } from "./types/user";
import type * as T from "./types/playList";
import * as userT from "./types/user";
export { userT };
import { often } from "./types/all";

export interface idType {
  id: string | number;
}
export interface common {
  timestamp?: number;
}
/**
 * 1. 二维码 key 生成接口
 * 说明: 调用此接口可生成一个 key
 */
export function _login_qr_key(params: object = {}) {
  return request({
    url: "/login/qr/key",
    method: "get",
    params,
  });
}
/**
 * 说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
 * @param params
 * @returns
 */
export function _login_qr_create(params: { key: string; qrimg?: string }) {
  return request({
    url: "/login/qr/create",
    method: "get",
    params,
  });
}

/**
 * 刷新登录
  说明 : 调用此接口 , 可刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie)
  调用例子 : /login/refresh
 */
export function _login_refresh() {
  return request({
    url: "/login/refresh",
    method: "get",
  });
}

/**
 * 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 * 必选参数: key,由第一个接口生成
 */
export function _login_qr_check(
  params: { key: string; noCookie?: boolean } & often,
) {
  return request({
    url: "/login/qr/check",
    method: "get",
    params,
  });
}

/**
 * 获取账号信息
 * 说明 : 登录后调用此接口 ,可获取用户账号信息
 */
export function _user_account(params?: {}) {
  return request({
    url: "/user/account",
    method: "get",
    params,
  });
}
/**
 * 登录状态
 * 说明 : 调用此接口,可获取登录状态
 */
export function loginStatus() {
  return request({
    url: "/login/status",
    method: "get",
  });
}

/**
 * 获取用户详情
 * 说明 : 登录后调用此接口 , 传入用户 id, 可以获取用户详情
 * - uid : 用户 id
 * @param {number} uid
 */
export function userDetail(uid: number) {
  return request({
    url: "/user/detail",
    method: "get",
    params: {
      uid,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取用户播放记录
 * 说明 : 登录后调用此接口 , 传入用户 id, 可获取用户播放记录
 * - uid : 用户 id
 * - type : type=1 时只返回 weekData, type=0 时返回 allData
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.type
 */
export interface PlayHistory {
  uid: number;
  type: number;
}
export function userPlayHistory(params: PlayHistory) {
  return request({
    url: "/user/record",
    method: "get",
    params,
  });
}

/**
 * 每日签到
 * 说明 : 调用此接口可签到获取积分
 * -  type: 签到类型 , 默认 0, 其中 0 为安卓端签到 ,1 为 web/PC 签到
 * @param {number} type
 */
export function dailySignin(type: number = 0) {
  return request({
    url: "/daily_signin",
    method: "post",
    params: {
      type,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取收藏的专辑（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的专辑
 * - limit : 返回数量 , 默认为 25
 * - offset : 偏移数量，用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认为 0
 * @param {Object} params
 * @param {number} params.limit
 * @param {number=} params.offset
 */
export interface followAlbum {
  limit: number;
  offset: number;
}
export function likedAlbums(params: followAlbum = { limit: 25, offset: 0 }) {
  return request({
    url: "/album/sublist",
    method: "get",
    params: {
      limit: params.limit,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取收藏的歌手（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的歌手
 */
export function likedArtists(params: any) {
  return request({
    url: "/artist/sublist",
    method: "get",
    params: {
      limit: params.limit,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取收藏的MV（需要登录）
 * 说明 : 调用此接口可获取到用户收藏的MV
 */
export function likedMVs(params: { limit: number } & common) {
  return request({
    url: "/mv/sublist",
    method: "get",
    params: {
      limit: params.limit,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * 获取歌手详情
 */
export function _artist_detail(params: { id: number | string }) {
  return request<{ data: RootUser }>({
    url: "/artist/detail",
    method: "get",
    params,
  });
}

/**
 * 歌手粉丝数量
 */
export function _artist_follow_count(params: { id: string | number }) {
  return request({
    url: "/artist/follow/count",
    method: "get",
    params,
  });
}

/**
 * 说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
 * t : 1为关注,其他为取消关注
 */
export function _follow(data: { id: number; t: number }) {
  return request({
    url: "/follow",
    method: "post",
    data,
  });
}

// 喜欢音乐列表 必选参数 : uid: 用户 id
export function likelist(params: { uid: number } & common) {
  return request({
    url: "/likelist",
    method: "get",
    params,
  });
}

// 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
export function _simi_artist(params: idType) {
  return request({
    url: "/simi/artist",
    method: "get",
    params,
  });
}

// 说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌单
export function _simi_playlist(params: idType) {
  return request({
    url: "/simi/playlist",
    method: "get",
    params,
  });
}

// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
export interface artists {
  artist: userT.artistsType;
  hotSongs: T.MusicPlayList[];
}
export type _artists = (params: idType) => Promise<artists>;
export function _artists(params: idType) {
  return request<artists>({
    url: "/artists",
    method: "get",
    params,
  });
}

// 歌手 mv limit: 20 offset: 40
export function _artist_mv(params: idType) {
  return request({
    url: "/artist/mv",
    method: "get",
    params,
  });
}

// 歌手 mv 地址
export function _mv_url(params: idType) {
  return request({
    url: "/mv/url",
    method: "get",
    params,
  });
}

//传入歌手 id, 可获得歌手专辑内容  limit: 20 offset: 40
export function _artist_album(params: object = {}) {
  return request({
    url: "/artist/album",
    method: "get",
    params,
  });
}

/**
 * 获取歌手描述
  说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
  必选参数 : id: 歌手 id
  接口地址 : /artist/desc
 */
export function _artist_desc(params: object = {}) {
  return request({
    url: "/artist/desc",
    method: "get",
    params,
  });
}

/**
 * 获取用户信息 , 歌单，收藏，mv, dj 数量
 * /user/subcount
 */
export function _user_subcount(params: object = {}) {
  return request({
    url: "/user/subcount",
    method: "get",
    params,
  });
}

/**
 * 通知 - 通知
说明 : 登录后调用此接口 ,可获取通知
可选参数 :
limit : 返回数量 , 默认为 30
lasttime : 返回数据的 time ,默认-1,传入上一次返回结果的 time,将会返回下一页的数据
接口地址 : /msg/notices
 */
export function _notice(params: object = {}) {
  return request({
    url: "/msg/notices",
    method: "get",
    params,
  });
}
