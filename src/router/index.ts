import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { RouteComponent } from "vue-router";

// music
const Page404 = () => import("../views/404/index.vue");
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
const t = () => import("../views/favorite/t.vue");
const playHistroy = () => import("../views/playHistroy/index.vue");
const test = () => import("../views/zzz_test/index.vue");
const chatGPT = () => import("../views/chatGPT/index.vue");

// Gutian
const Gutian = () => import("../layout/G.vue");
const GuitarHome: RouteComponent = () => import("../views/Guitar/index.vue");
const routes: Array<RouteRecordRaw> = [
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
        children: [{ path: "/t", component: t }],
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
        path: "playHistory",
        name: "playHistory",
        meta: { title: "playHistory", keepalive: false },
        component: playHistroy,
      },
      {
        path: "chatGPT",
        name: "chatGPT",
        meta: { title: "chatGPT", keepalive: false },
        component: chatGPT,
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
