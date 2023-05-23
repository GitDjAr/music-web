import request from "../../utils/requiers";

/**
 * 接口翻译
 * {
    "text": "Hello World",
    "source_lang": "EN",
    "target_lang": "ZH"
  }
 */
export interface TranslateParams {
  text: string;
  source_lang: string;
  target_lang: string;
}
export function translateAPI(data: TranslateParams) {
  return request({
    url: "/translate",
    baseURL: "/tran/",
    method: "post",
    show: true,
    data,
  });
}
