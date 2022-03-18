import axios from "axios"
import { Message } from "@arco-design/web-vue"
import { AxiosRequestConfig } from "axios"

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  show?: boolean
}

const config = {
  baseURL: "http://8.140.43.205:3000",
  timeout: 5000,
}
const requier = axios.create(config)
requier.interceptors.request.use(
  (cf) => {
    cf.data.cookie = JSON.parse(localStorage.getItem("userInfo") || "{}")?.cookie
    return cf
  },
  (err) => {
    Message.error(`err:${err}`)
    console.log(err)
    return Promise.reject(err)
  }
)

requier.interceptors.response.use(
  (res) => {
    const { data } = res
    ShowMessage(data)
    return res.data
  },
  (err) => {
    Message.error(`err:${err}`)
    console.log(err)
    return Promise.reject(err)
  }
)

// show Message
function ShowMessage(data) {
  if (data.show) {
    Message.success(data.msg)
  }
}
// 其实接口服务 直接支持 post get
//转换 object => string
function ObjInStr(data) {
  if (!data) return
  let str = "?"
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      str += `${key}=${data[key]}&`
    }
  }
  return str
}

const apprequire = (RqConfig: MyAxiosRequestConfig) => {
  const { data, method } = RqConfig
  if (method === "get") {
    RqConfig.url += ObjInStr(data)
    delete RqConfig.data
  }
  return requier(RqConfig)
}
export default apprequire
