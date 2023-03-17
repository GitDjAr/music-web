import request from "../utils/requiers";
type Data = Object | string;

export function Login(data: Data = {}, method?: any) {
  return request({
    url: `/login/cellphone?timestamp=${new Date().getTime()}`,
    method: method || "POST",
    data: data,
    show: true,
  });
}
export function MailLogin(data: Data = {}, method?: any) {
  return request({
    url: "/login/cellphone",
    method: method || "POST",
    data: data,
    show: true,
  });
}
export function Outin() {}

// 获取每日推荐歌单
// 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
// 接口地址 : /recommend/resource
export function resource(data: Data = {}, method?: any) {
  return request({
    url: "/recommend/resource",
    method: method || "POST",
    data: data,
    show: true,
  });
}

// 获取每日推荐歌曲
// 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
// 接口地址 : /recommend/songs
// 调用例子 : /recommend/songs
export function songs(data: Data = {}, method?: any) {
  return request({
    url: "/recommend/songs",
    method: method || "POST",
    data: data,
    show: true,
  });
}

// 热门歌手
// 说明 : 调用此接口 , 可获取热门歌手数据
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /top/artists
// 调用例子 : /top/artists?offset=0&limit=30
export function artists(data: Data = {}, method?: any) {
  return request({
    url: "/top/artists",
    method: method || "POST",
    data: data,
    show: true,
  });
}

// 推荐 mv
// 说明 : 调用此接口 , 可获取推荐 mv
// 接口地址 : /personalized/mv
// 调用例子 : /personalized/mv
export function personalizedMV(data: Data = {}, method?: any) {
  return request({
    url: "/personalized/mv",
    method: method || "Get",
    data: data,
    show: true,
  });
}

// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要
// 接口地址 : /toplist/detail
export function toplist(data: Data = {}, method?: any) {
  return request({
    url: "/toplist/detail",
    method: method || "Get",
    data: data,
    show: true,
  });
}

/**
 * 说明 : 调用接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
 */
export interface cloudsearch {
  keywords: string;
  type: number;
}
export function cloudsearch(params: cloudsearch) {
  return request({
    url: "/cloudsearch",
    method: "get",
    params,
  });
}

/**
 * 说明 : 调用此接口,可获取热门搜索列表
 */
export function _search_hot(params: string) {
  return request({
    url: "/search/hot",
    method: "get",
    params,
  });
}

/**搜索多重匹配
 * 说明 : 调用此接口 , 传入搜索关键词可获得搜索结果
 */
export function _search_multimatch(params: object = {}) {
  return request({
    url: "/search/multimatch",
    method: "get",
    params,
  });
}

/**
 * 搜索建议
  说明 : 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单信息
 */
export function _search_suggest(params: object = {}) {
  return request({
    url: "/search/suggest",
    method: "get",
    params,
  });
}
