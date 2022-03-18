import { Message } from "@arco-design/web-vue"
import { IconFaceSmileFill } from '@arco-design/web-vue/es/icon';
import { IconRecord } from "@arco-design/web-vue/es/icon"
import { h } from "vue"

interface resOption {
  code: number
  msg: string
}
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
