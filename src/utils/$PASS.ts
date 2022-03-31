import { Message } from "@arco-design/web-vue"
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';
import { IconRecord } from "@arco-design/web-vue/es/icon"
import { h } from "vue"

interface resOption {
  code: number
  msg: string
}


/**
 * 通过状态码 定制返回结果
 * @param code 状态码
 * @param msg 提示信息
 * @param data 返回数据
 * @param success 成功回调
 * @param fail 失败回调
 * @param complete 完成回调
 * @param options 配置
 * @param options.isShowMsg 是否显示提示信息
 */
class PASS {
  // constructor(msg: string, code: number) {
  //   this.msg = msg
  // }
  $PASS(res: resOption) {
    if (res.code !== 200) {
      Message.warning({ icon: () => h(IconRecord), content: res.msg })
      return false
    }else{
      Message.success({ icon: () => h(IconFaceSmileFill), content: res.msg })
      return true
    }
  }
}

export default new PASS()



