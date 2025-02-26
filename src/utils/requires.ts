import axios from "axios";
import { Message, Notification } from "@arco-design/web-vue";
import { AxiosRequestConfig, AxiosError } from "axios";
import Cache from "./cache";
import { h } from "vue";
import { IconRecord } from "@arco-design/web-vue/es/icon";

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  show?: boolean;
  timestamp?: number;
}
interface ShowMessageOptions {
  show?: boolean;
  res?: {
    msg?: string;
  };
  msg?: string;
  message: string;
  code?: number;
}

const config = {
  // 默认配置
  baseURL: import.meta.env.VITE_APP_api,
  timeout: 20000,
  withCredentials: true,
  // headers: {
  //   Cookie: document.cookie,
  // },
};
const servers = axios.create(config);
servers.interceptors.request.use(
  (cf) => {
    const cookie = localStorage.getItem("cookie");
    // 必须是网易云接口
    if (cf.baseURL === "/api") {
      if (cf.url?.includes("?")) {
        cf.url += `&cookie=${cookie}`;
      } else {
        cf.url += `?cookie=${cookie}`;
      }
    }
    return cf;
  },
  (err) => {
    Message.error(`request err: ${err}`);
    return Promise.reject(err);
  },
);

servers.interceptors.response.use(
  async (res) => {
    const { data = {} } = res;
    ShowMessage(data);
    let co = data.code;
    // 进行缓存
    if (co === 200) {
      const CacheName =
        res.config.method?.toLowerCase() === "get"
          ? res.config.url
          : JSON.stringify(res.config.data);
      Cache.set(CacheName, data || res);
    } else if (co === 301) {
      Notification.warning(res.data.msg);
    } else if ([404, 500, 502, 503].includes(co)) {
      return Promise.reject(data);
    }
    return data || res;
  },
  async (err: AxiosError) => {
    ShowMessage({
      show: true,
      code: 500,
      message: err.message || err.response?.statusText || "未知错误",
    });
    return Promise.reject({ data: {}, err });
  },
);

// show Message
function ShowMessage(data: ShowMessageOptions) {
  const msg = data.message || data.msg || data?.res?.msg || "";

  if (!msg) return;
  if (data.show && data.code === 200) {
    Message.success(msg);
  } else if (data.show) {
    Message.warning({ icon: () => h(IconRecord), content: msg });
  }
}

// 其实接口服务 直接支持 post get
//转换 object => string
// function ObjInStr(data: { [string: string]: string | number }): string {
//   if (!data || JSON.stringify(data) === '{}') return ''
//   let str = "?"
//   for (const key in data) {
//     if (Object.prototype.hasOwnProperty.call(data, key)) {
//       str += `${key}=${data[key]}&`
//     }
//   }
//   return str
// }

function apprentice<T = any>(RqConfig: MyAxiosRequestConfig = {}): Promise<T> {
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
  // const cookie = JSON.parse(localStorage.getItem("userInfo") || "{}")?.cookie;
  return servers({ ...RqConfig }) as unknown as Promise<T>;
}
export default apprentice;
