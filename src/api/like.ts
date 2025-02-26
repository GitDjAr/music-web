// 收藏 喜欢
import request from "../utils/requires.js";
type Data = Object | string;

// 收藏/取消收藏歌手 /artist/sub
export function artist_sub(params: Data) {
  return request({
    url: `/artist/sub`,
    method: "get",
    params,
    show: true,
  });
}

//喜欢音乐
// 必选参数 : id: 歌曲 id
// 可选参数 : like: 布尔值 , 默认为 true 即喜欢 , 若传 false, 则取消喜欢
export function like(params: Data) {
  return request({
    url: `/like`,
    method: "get",
    params,
  });
}
