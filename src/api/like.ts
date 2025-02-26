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

/**
 * 当前账号关注的用户/歌手
说明 : 调用此接口, 可获得当前账号关注的用户/歌手
可选参数 : size : 返回数量 , 默认为 30
cursor : 返回数据的 cursor, 默认为 0 , 传入上一次返回结果的 cursor,将会返回下一页的数据
scene : 场景, 0 表示所有关注, 1 表示关注的歌手, 2 表示关注的用户, 默认为 0
 */
export function user_follow_mixed(params: Data) {
  return request({
    url: `/user/follow/mixed`,
    method: "get",
    params,
    show: true,
  });
}
