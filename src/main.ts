import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
// import vuex from "./store/index"

// tailwind.css  样式覆盖问题
// https://github.com/arco-design/arco-design-vue/issues/759
import 'vue-plyr/dist/vue-plyr.css'
import "./style/tailwind.css"
import "./style/reset-arco.scss"

import ArcoVue from "@arco-design/web-vue"// 
import vueplyr from 'vue-plyr'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';//额外引入图标库
import "@arco-design/web-vue/dist/arco.css"
import I18n from './locale/index'
import store from "./store/index"

import AxiosError from './axiosErrorCatch'
import PASS from './utils/$PASS'

import Logo from "./components/logo.vue"
import image from './components/image.vue'
import ModalVue from "@/components/Modal.vue";
import MyLike from "@/components/like/index.vue";

import "./style/index.scss"
import "./style/threm.scss"
import "./style/init.scss"
import loading from './directives/loading/loading'
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
  .use(vueplyr, { play: {} })
  .use(store)
  .use(router)
  .use(I18n)
  .component('Logo', Logo)
  .component('Image', image)
  .component('ModalVue', ModalVue)
  .component('MyLike', MyLike)
  .directive('loading', loading)

app.config.globalProperties.$PASS = PASS.$PASS

app.mount("#app")


// 注册全局请求错误捕获
window.addEventListener('error', (e) => {

  if (e.target instanceof XMLHttpRequest) {
    AxiosError(e)
  }
})
throw new Error('11')