import axios from "axios"
import { Message } from "@arco-design/web-vue"
import { AxiosRequestConfig } from "axios"
import Cache from './cache'
import { h } from 'vue'
import { IconRecord } from '@arco-design/web-vue/es/icon'

import store from "../store/index"

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  show?: boolean
}
interface ShowMessageOptions {
  show?: boolean,
  res?: {
    msg?: string;
  }
  msg: string
  code?: number
}

const config = {
  // 默认配置
  baseURL: "/api",
  timeout: 20000,
}
const servers = axios.create(config)
servers.interceptors.request.use(
  (cf) => {
    // const cookie = store.getters.userInfo?.cookie
    // console.log(cf, store.getters.userInfo);

    // cf.headers = {
    //   ...cf.headers,
    //   cookie,
    //   token: cookie
    // }
    return cf
  },
  (err) => {
    Message.error(`request err: ${err}`)
    console.log(err)
    return Promise.reject(err)
  }
)

servers.interceptors.response.use(
  (res) => {
    const { data = null } = res
    ShowMessage(data)
    // 进行缓存
    if (data.code === 200) {
      const CacheName = res.config.method?.toLowerCase() === "get"
        ? res.config.url
        : JSON.stringify(res.config.data)
      Cache.set(CacheName, data || res)
    }
    return data || res
  },
  (err) => {
    ShowMessage({ msg: err.message, code: 500 })
    return Promise.reject({ data: {}, err })
  }
)

// show Message
function ShowMessage(data: ShowMessageOptions) {
  // console.log('data :>> ', data);
  const msg = data.msg || data?.res?.msg || ''
  if (!msg) return
  if (data.show && data.code === 200) {
    Message.success(data.msg)
  } else {
    Message.warning({ icon: () => h(IconRecord), content: msg })
  }
}
// 其实接口服务 直接支持 post get
//转换 object => string
function ObjInStr(data: { [string: string]: string | number }): string {
  if (!data || JSON.stringify(data) === '{}') return ''
  let str = "?"
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      str += `${key}=${data[key]}&`
    }
  }
  return str
}

const apprequire = (RqConfig: MyAxiosRequestConfig) => {
  // const { data, method, url } = RqConfig
  // const type = method?.toLowerCase()
  // if (type === "get") {
  //   RqConfig.url += ObjInStr(data)
  //   delete RqConfig.data
  // }
  // debugger
  // 是否有缓存
  // const CacheName = type === "get"
  //   ? url
  //   : JSON.stringify(data)
  // // console.log('CacheName :>> ', CacheName,);

  // if (Cache.has(CacheName)) {
  //   // console.log('cache :>> ', CacheName, Cache.get(CacheName));
  //   return Promise.resolve(Cache.get(CacheName))
  // }
  // const cookie = JSON.parse(localStorage.getItem("userInfo") || "{}")?.cookie
  return servers(RqConfig)
}
export default apprequire


