import request from "../utils/requiers"

interface idType {
  id: string | number
}
/**
 * 1. 二维码 key 生成接口
 * 说明: 调用此接口可生成一个 key
 */
export function _login_qr_key(params: object = {}) {
  return request({
    url: '/login/qr/key',
    method: 'get',
    params
  })
}
/**
 * 说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息,可使用 base64 展示图片,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
 * @param params 
 * @returns 
 */
export function _login_qr_create(params: { key: string, qrimg?: string }) {
  return request({
    url: '/login/qr/create',
    method: 'get',
    params
  })
}

/**
 * 刷新登录
  说明 : 调用此接口 , 可刷新登录状态,返回内容包含新的cookie(不支持刷新二维码登录的cookie)
  调用例子 : /login/refresh
 */
export function _login_refresh() {
  return request({
    url: '/login/refresh',
    method: 'get'
  })
}

/**
 * 说明: 轮询此接口可获取二维码扫码状态,800 为二维码过期,801 为等待扫码,802 为待确认,803 为授权登录成功(803 状态码下会返回 cookies)
 * 必选参数: key,由第一个接口生成
 */
export function _login_qr_check(params: { key: string }) {
  return request({
    url: '/login/qr/check',
    method: 'get',
    params
  })
}

/**
 * 获取账号信息
 * 说明 : 登录后调用此接口 ,可获取用户账号信息
 */
export function _user_account(params: string | undefined) {
  return request({
    url: '/user/account',
    method: 'get',
    params
  })
}

/**
 * 获取歌手详情
 */
export function _artist_detail(params: object = {}) {
  return request({
    url: '/artist/detail',
    method: 'get',
    params
  })
}

/**
 * 歌手粉丝数量
 */
export function _artist_follow_count(params: string | number) {
  return request({
    url: '/artist/follow/count',
    method: 'get',
    params
  })
}

/**
 * 说明 : 登录后调用此接口 , 传入用户 id, 和操作 t,可关注/取消关注用户
 * t : 1为关注,其他为取消关注
 */
export function _follow(data: { id: number, t: number }) {
  return request({
    url: '/follow',
    method: 'post',
    data
  })
}

// 喜欢音乐列表 必选参数 : uid: 用户 id
export function likelist(params: idType) {
  return request({
    url: '/likelist',
    method: 'get',
    params
  })
}



// 说明 : 调用此接口 , 传入歌手 id, 可获得相似歌手
export function _simi_artist(params: idType) {
  return request({
    url: '/simi/artist',
    method: 'get',
    params
  })
}

// 说明 : 调用此接口 , 传入歌曲 id, 可获得相似歌单
export function _simi_playlist(params: idType) {
  return request({
    url: '/simi/playlist',
    method: 'get',
    params
  })
}

// 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
export function _artists(params: idType) {
  return request({
    url: '/artists',
    method: 'get',
    params
  })
}

// 歌手 mv limit: 20 offset: 40
export function _artist_mv(params: idType) {
  return request({
    url: '/artist/mv',
    method: 'get',
    params
  })
}

// 歌手 mv 地址 
export function _mv_url(params: idType) {
  return request({
    url: '/mv/url',
    method: 'get',
    params
  })
}

//传入歌手 id, 可获得歌手专辑内容  limit: 20 offset: 40
export function _artist_album(params: object = {}) {
  return request({
    url: '/artist/album',
    method: 'get',
    params
  })
}

/**
 * 获取歌手描述
  说明 : 调用此接口 , 传入歌手 id, 可获得歌手描述
  必选参数 : id: 歌手 id
  接口地址 : /artist/desc
 */
export function _artist_desc(params: object = {}) {
  return request({
    url: '/artist/desc',
    method: 'get',
    params
  })
}
