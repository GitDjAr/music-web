import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import vuex from "./store/index"
import ArcoVue from "@arco-design/web-vue"// 
import ArcoVueIcon from '@arco-design/web-vue/es/icon';//额外引入图标库
import "@arco-design/web-vue/dist/arco.css"
import I18n from './locale/index'
import store from "./store/index"

import PASS from './utils/$PASS'

import Logo from "./components/logo.vue"
import "./style/index.scss"
import "./style/threm.scss"
import "./style/init.scss"

const app = createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .use(I18n)
  .component('Logo',Logo)
  
app.config.globalProperties.$PASS = PASS.$PASS

app.mount("#app")