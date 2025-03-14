import request from "../utils/requires.js";
// import { mapTrackPlayableStatus } from '@/utils/common';
// import { cacheAlbum, getAlbumFromCache } from '@/utils/db';

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param {number} id
 */
export function getAlbum(id: number) {
  return request({
    url: "/album",
    method: "get",
    params: {
      id,
    },
  });
}

/**
 * 全部新碟
 * 说明 : 登录后调用此接口 ,可获取全部新碟
 * - limit - 返回数量 , 默认为 30
 * - offset - 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
 * - area - ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * @param {Object} params
 * @param {number} params.limit
 * @param {number=} params.offset
 * @param {string} params.area
 */
export interface albumList {
  limit: number;
  offset: number;
  area: string;
}
export function newAlbums(params: albumList) {
  return request({
    url: "/album/new",
    method: "get",
    params,
  });
}

/**
 * 专辑动态信息
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 * - id - 专辑id
 * @param {number} id
 */
export function albumDynamicDetail(id: number) {
  return request({
    url: "/album/detail/dynamic",
    method: "get",
    params: { id, timestamp: new Date().getTime() },
  });
}

/**
 * 收藏/取消收藏专辑
 * 说明 : 调用此接口,可收藏/取消收藏专辑
 * - id - 返专辑 id
 * - t - 1 为收藏,其他为取消收藏
 * @param {Object} params
 * @param {number} params.id
 * @param {number} params.t
 */
export interface albumCollect {
  id: number;
  t: number;
}
export function likeAAlbum(params: albumCollect) {
  return request({
    url: "/album/sub",
    method: "post",
    params,
  });
}
