import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { RouteComponent } from "vue-router";

// music
const layout = () => import("../layout/default.vue");
const Home = () => import("../views/Home/index.vue");
const search = () => import("../views/search/index.vue");
const radio = () => import("../views/Radio/index.vue");
const setting = () => import("../views/settings/index.vue");
const About = () => import("../views/About.vue");
const TopCharts = () => import("../views/Home/TopCharts.vue");
const albums = () => import("../views/albums/index.vue");
const playListPage = () => import("../views/playListPage/index.vue");
const albumsList = () => import("../views/albums/albumsList.vue");
const playlist = () => import("../views/albums/playlist.vue");
const singer = () => import("../views/singer/index.vue");
const favorite = () => import("../views/favorite/index.vue");
const playHistroy = () => import("../views/playHistroy/index.vue");

// test page
const test = () => import("../views/test/index.vue");
const Page404 = () => import("../views/404/index.vue");

// 工具
const polymerization = () => import("../views/polymerization/index.vue");
const chatGPT = () => import("../views/polymerization/chatGPT/index.vue");
const translate = () => import("../views/polymerization/translate/index.vue");

// Gutian
const Gutian = () => import("../layout/G.vue");
const GuitarHome: RouteComponent = () => import("../views/Guitar/index.vue");
export const routes: Array<RouteRecordRaw> = [
  {
    path: "/Music",
    name: "layout",
    component: layout,
    children: [
      {
        path: "home",
        name: "home",
        meta: { title: "首页", keepalive: true },
        component: Home,
      },
      {
        path: "radio",
        name: "radio",
        meta: { title: "???", keepalive: true },
        component: radio,
      },
      {
        path: "topCharts",
        name: "topCharts",
        meta: { title: "榜单", keepalive: true },
        component: TopCharts,
      },
      {
        path: "playListPage",
        name: "playListPage",
        meta: { title: "歌单列表", keepalive: true },
        component: playListPage,
      },
      {
        path: "albums",
        name: "albums",
        meta: { title: "专辑", keepalive: true },
        component: albums,
      },
      {
        path: "albums/:id",
        name: "albums",
        meta: { title: "专辑", keepalive: true },
        component: albumsList,
      },
      {
        path: "playlist/:id",
        name: "playlist",
        meta: { title: "歌单", keepalive: true },
        component: playlist,
      },
      {
        path: "singer/:id",
        name: "singer",
        meta: { title: "歌手", keepalive: true },
        component: singer,
        // children:[
        //   { path: '', component: Page404 },
        // ]
      },
      {
        path: "about",
        name: "about",
        meta: { title: "关于", keepalive: true },
        component: About,
      },
      {
        path: "favorite",
        name: "favorite",
        meta: { title: "收藏", keepalive: true },
        component: favorite,
      },
      {
        path: "settings",
        name: "settings",
        meta: { title: "设置", keepalive: true },
        component: setting,
      },
      {
        path: "search",
        name: "search",
        meta: { title: "搜索", keepalive: false },
        component: search,
      },
      {
        path: "test",
        name: "test",
        meta: { title: "test", keepalive: false },
        component: test,
      },
      {
        path: "playHistory",
        name: "playHistory",
        meta: { title: "playHistory", keepalive: false },
        component: playHistroy,
      },
      {
        path: "polymerization",
        name: "polymerization",
        meta: { title: "聚合工具", keepalive: true },
        component: polymerization,
        children: [
          {
            path: "chatGPT",
            name: "chatGPT",
            meta: { title: "AI", keepalive: false },
            component: chatGPT,
          },
          {
            path: "translate",
            name: "translate",
            meta: { title: "translate工具", keepalive: false },
            component: translate,
          },
        ],
      },
    ],
  },
  {
    path: "/Gtp",
    name: "Gt",
    component: Gutian,
    children: [
      {
        path: "Guitar",
        name: "Guitar",
        component: GuitarHome,
      },
    ],
  },

  {
    path: "/",
    redirect: "/Music/home",
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: Page404 },
];

const router = createRouter({
  // history: createWebHistory(process?.env?.BASE_URL),
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    // debugger
    return { top: 1000 };
  },
});

export default router;

/**  守卫
  百度提交入口：https://ziyuan.baidu.com/linksubmit/url
  Google提交入口：http://www.google.com/addurl/?hl=zh-CN&continue=/addurl
  360提交入口：http://info.so.360.cn/site_submit.html
  搜狗提交入口：http://fankui.help.sogou.com/index.php/web/web/index?type=1
  必应提交入口：https://www.bing.com/toolbox/webmaster
 */

// router.beforeEach((to, from, next) => {
//   const url = [
//     "https://ziyuan.baidu.com/linksubmit/",
//     "http://www.google.com/addurl/?hl=zh-CN&continue=/",
//   ];
//   url.forEach((item) => {
//     const srcipt = window.document.createElement("script");
//     console.log("to.fullPath", to);
//     srcipt.url = item + to.fullPath;
//     window.document.body.appendChild(srcipt);
//   });
//   next();
// });

/***
 * 这种做法会影响网站性能，而且可能会被认为是垃圾邮件或黑帽 SEO。
如果你真的需要向搜索引擎提交网站链接，最好使用官方提供的接口或工具，而不是直接发送请求。例如，Google 提供了 Search Console，让你向 Google 提交链接和网站地图。Baidu 也提供了类似的工具。
如果你仍然想要向搜索引擎提交链接，可以考虑以下优化：
只在开发环境下提交链接：在生产环境下不要执行这段代码。
在组件中执行提交链接逻辑：只在特定的组件中执行提交链接逻辑，而不是在全局路由守卫中执行。
使用异步方式加载脚本：避免阻塞其他资源的加载，可以使用async 属性或 window.onload 事件来加载脚本。
只向一个搜索引擎提交链接：向多个搜索引擎同时提交链接可能会被认为是 spam，所以最好只向一个搜索引擎提交链接。
综上所述，不建议在路由守卫中直接向搜索引擎提交链接，因为这可能会被视为不合法的行为。如果你需要提交链接，最好使用官方提供的接口或工具。
 */
