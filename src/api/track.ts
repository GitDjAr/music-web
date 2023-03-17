// import store from '@/store';
import request from "../utils/requiers";
// import { mapTrackPlayableStatus } from '@/utils/common';

/**
 * 新歌速递
 * 说明 : 调用此接口 , 可获取新歌速递
 * @param {number} type - 地区类型 id, 对应以下: 全部:0 华语:7 欧美:96 日本:8 韩国:16
 */
export function topSong(type: number | null = null) {
  return request({
    url: "/top/song",
    method: "get",
    params: {
      type,
    },
  });
}

/**
 * 听歌打卡
 * 说明 : 调用此接口 , 传入音乐 id, 来源 id，歌曲时间 time，更新听歌排行数据
 * - id - 歌曲 id
 * - sourceid - 歌单或专辑 id
 * - time - 歌曲播放时间,单位为秒
 * @param {Object} params
 * @param {number} params.id
 * @param {number} params.sourceid
 * @param {number=} params.time
 */
export interface toplistOfSong {
  id: number;
  sourceid: number;
  time: number;
  timestamp?: number;
}
export function scrobble(params: toplistOfSong) {
  params.timestamp = new Date().getTime();
  return request({
    url: "/scrobble",
    method: "get",
    params,
  });
}
