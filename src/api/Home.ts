import requier from "../utils/requiers"
type Data = Object | string

export function Login(data: Data = {}, method?: any) {
  return requier({
    url: "/login/cellphone",
    method: method || "POST",
    data: data,
    show: true,
  })
}
export function MailLogin(data: Data = {}, method?: any) {
  return requier({
    url: "/login/cellphone",
    method: method || "POST",
    data: data,
    show: true,
  })
}
export function Outin() {}

// 获取每日推荐歌单
// 说明 : 调用此接口 , 可获得每日推荐歌单 ( 需要登录 )
// 接口地址 : /recommend/resource
export function resource(data: Data = {}, method?: any) {
  return requier({
    url: "/recommend/resource",
    method: method || "POST",
    data: data,
    show: true,
  })
}

// 获取每日推荐歌曲
// 说明 : 调用此接口 , 可获得每日推荐歌曲 ( 需要登录 )
// 接口地址 : /recommend/songs
// 调用例子 : /recommend/songs
export function songs(data: Data = {}, method?: any) {
  return requier({
    url: "/recommend/songs",
    method: method || "POST",
    data: data,
    show: true,
  })
}

// 热门歌手
// 说明 : 调用此接口 , 可获取热门歌手数据
// 可选参数 : limit: 取出数量 , 默认为 50
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
// 接口地址 : /top/artists
// 调用例子 : /top/artists?offset=0&limit=30
export function artists(data: Data = {}, method?: any) {
  return requier({
    url: "/top/artists",
    method: method || "POST",
    data: data,
    show: true,
  })
}

// 推荐 mv
// 说明 : 调用此接口 , 可获取推荐 mv
// 接口地址 : /personalized/mv
// 调用例子 : /personalized/mv
export function personalizedMV(data: Data = {}, method?: any) {
  return requier({
    url: "/personalized/mv",
    method: method || "Get",
    data: data,
    show: true,
  })
}

// 所有榜单内容摘要
// 说明 : 调用此接口,可获取所有榜单内容摘要
// 接口地址 : /toplist/detail
export function toplist(data: Data = {}, method?: any) {
  return requier({
    url: "/toplist/detail",
    method: method || "Get",
    data: data,
    show: true,
  })
}

// 获取歌单详情
// 说明 : 歌单能看到歌单名字, 但看不到具体歌单内容 , 调用此接口 , 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单,登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song/detail 接口获取所有歌曲的详情 (https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
// 必选参数 : id : 歌单 id
// 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
// 接口地址 : /playlist/detail
// 调用例子 : /playlist/detail?id=24381616
export function playlist(data: Data = {}, method?: any) {
  return requier({
    url: "/playlist/detail",
    method: method || "Get",
    data: data,
    show: true,
  })
}