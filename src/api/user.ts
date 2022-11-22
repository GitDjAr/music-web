import request from "../utils/requiers"

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