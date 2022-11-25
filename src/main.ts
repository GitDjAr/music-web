import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// import vuex from "./store/index"

// tailwind.css  样式覆盖问题
// https://github.com/arco-design/arco-design-vue/issues/759
import "./style/tailwind.css"
import "./style/reset-arco.scss"

import ArcoVue from "@arco-design/web-vue"// 
import ArcoVueIcon from '@arco-design/web-vue/es/icon';//额外引入图标库
import "@arco-design/web-vue/dist/arco.css"
import I18n from './locale/index'
import store from "./store/index"

import PASS from './utils/$PASS'

import Logo from "./components/logo.vue"
import image from './components/image.vue'
import "./style/index.scss"
import "./style/threm.scss"
import "./style/init.scss"

// 图源
window.rendomImgurl = 'https://img.2eka.cloud/api/random?type=pc'
// import './mock/mock'
// // mock开关，设置是否引入文件
// const mock = true
// if (mock) {
//   // require('./mock/mock') // 注意使用require，不用import，在需要的时使用。
// }

const app = createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .use(I18n)
  .component('Logo', Logo)
  .component('Image', image)

app.config.globalProperties.$PASS = PASS.$PASS

app.mount("#app")
