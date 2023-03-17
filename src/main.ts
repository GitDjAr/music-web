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
import vuePlyer from 'vue-plyr'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';//额外引入图标库
import "@arco-design/web-vue/dist/arco.css"
import I18n from './locale/index'
import store from "./store/index"

import PASS from './utils/$PASS'

import Logo from "./components/logo.vue"
import image from './components/image.vue'
import ModalVue from "@/components/Modal.vue";
import MyLike from "@/components/like/index.vue";
import MyVideo from "@/components/MyVideo/index.vue";
import MyPlay from "@/components/MyPlay/index.vue";

import "./style/index.scss"
import "./style/therm.scss"
import "./style/init.scss"
import loading from './directives/loading/loading'
// 图源

window.rendomImgUrl = 'https://api.ixiaowai.cn/api/api2.php' || 'https://img.2eka.cloud/api/random?type=pc'



const app = createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(vuePlyer, { play: {} })
  .use(store)
  .use(router)
  .use(I18n)
  .component('Logo', Logo)
  .component('Image', image)
  .component('ModalVue', ModalVue)
  .component('MyLike', MyLike)
  .component('MyPlay', MyPlay)
  .component('MyVideo', MyVideo)
  .directive('loading', loading)

app.config.globalProperties.$PASS = PASS.$PASS

app.mount("#app")

// pwa
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/dist/sw.js')
//       .then(registration => console.log('Service Worker registered'))
//       .catch(error => console.log('Service Worker registration failed:', error));
//   });
// }
