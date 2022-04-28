import axios from "axios"
import { Message } from "@arco-design/web-vue"
import { AxiosRequestConfig } from "axios"
import {h} from 'vue'
import {IconRecord} from '@arco-design/web-vue/es/icon'

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  show?: boolean
}
interface ShowMessageOptions {
  show?: boolean,
  res?:{
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
const requier = axios.create(config)
requier.interceptors.request.use(
  (cf) => {
    // cf.data.cookie = JSON.parse(localStorage.getItem("userInfo") || "{}")?.cookie
    return cf
  },
  (err) => {
    Message.error(`request err: ${err}`)
    console.log(err)
    return Promise.reject(err)
  }
)

requier.interceptors.response.use(
  (res) => {
    const { data } = res
    ShowMessage(data)
    return res.data || res
  },
  (err) => {
    ShowMessage({msg:err.message,code:500})
    return Promise.reject({data:{},err})
  }
)

// show Message
function ShowMessage(data:ShowMessageOptions) {
  // console.log('data :>> ', data);
  const msg = data.msg || data?.res?.msg || '' 
  if(!msg)return
  if (data.show && data.code === 200) {
    Message.success(data.msg)
  }else{
    Message.warning({ icon: () => h(IconRecord), content: msg})
  }
}
// 其实接口服务 直接支持 post get
//转换 object => string
function ObjInStr(data:{[string:string]:string | number}):string {
  if (!data) return ''
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


