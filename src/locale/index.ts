import CN from "./lang/zh-CN"
import en from "./lang/en"
import Store from "../store/index"
import { createI18n } from "vue-i18n"

const I18n = createI18n({
  locale: Store?.state?.app?.locale || "zh-CN",
  messages: {
    "zh-CN": CN,
    en
  },
})

export default I18n
