import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import vuex from "./store/index"

// tailwind.css  样式覆盖问题
// https://github.com/arco-design/arco-design-vue/issues/759
import "./style/tailwind.css";
import "./style/reset-arco.scss";

import ArcoVue from "@arco-design/web-vue"; //
import ArcoVueIcon from "@arco-design/web-vue/es/icon"; //额外引入图标库
import "@arco-design/web-vue/dist/arco.css";
import I18n from "./locale/index";
import store from "./store/index";

import PASS from "./utils/$PASS";

//svg
import "virtual:svg-icons-register";
import SvgIcon from "@/components/svg/index.vue";
import Logo from "./components/logo.vue";
import image from "./components/image.vue";
import level from "./components/level.vue";
import song from "./components/song.vue";
import ModalVue from "@/components/Modal.vue";
import MyLike from "@/components/like/index.vue";
import MyVideo from "@/components/MyVideo/index.vue";
import MyPlay from "@/components/MyPlay/index.vue";

import "./style/index.scss";
import "./style/therm.scss";
import "./style/init.scss";
import loading from "./directives/loading/loading";
import hoverTitle from "./directives/hoverTitle";

import { BrowserTracing } from "@sentry/tracing";
import * as Sentry from "@sentry/vue";

// 图源

window.rendomImgUrl =
  "https://api.ixiaowai.cn/api/api2.php" ||
  "https://img.2eka.cloud/api/random?type=pc";

const app = createApp(App);

app.config.globalProperties.$PASS = PASS.$PASS;

//监控
Sentry.init({
  app,
  dsn: "https://8962dde768ed446ca227bb12f2fddb50@o4504920564432896.ingest.sentry.io/4504926220779520",
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,
  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
});

app
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .use(I18n)
  .component("Logo", Logo)
  .component("Image", image)
  .component("ModalVue", ModalVue)
  .component("MyLike", MyLike)
  .component("MyPlay", MyPlay)
  .component("MyVideo", MyVideo)
  .component("MyIcon", SvgIcon)
  .component("level", level)
  .component("song", song)
  .directive("loading", loading)
  .directive("hover", hoverTitle)
  .mount("#app");

// pwa
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/dist/sw.js')
//       .then(registration => console.log('Service Worker registered'))
//       .catch(error => console.log('Service Worker registration failed:', error));
//   });
// }
