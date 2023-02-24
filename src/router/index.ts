import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { RouteComponent } from 'vue-router'

// music
const Page404 = () => import("../views/404/index.vue")
const layout = () => import("../layout/default.vue")
const Home = () => import("../views/Home/index.vue")
const search = () => import("../views/search/index.vue")
const radio = () => import("../views/Radio/index.vue")
const setting = () => import("../views/settings/index.vue")
const About = () => import("../views/About.vue")
const TopCharts = () => import("../views/Home/TopCharts.vue")
const albums = () => import("../views/albums/index.vue")
const albumsList = () => import("../views/albums/albumsList.vue")
const singer = () => import("../views/singer/index.vue")
const favorite = () => import("../views/favorite/index.vue")
const test = () => import("../views/zzz_test/index.vue")

// Gutian
const Gutian = () => import("../layout/G.vue")
const GuitarHome: RouteComponent = () => import("../views/Guitar/index.vue")
const routes: Array<RouteRecordRaw> = [
  {
    path: "/Music",
    name: "layout",
    component: layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: { title: '首页', keepalive: true },
        component: Home
      },
      {
        path: 'radio',
        name: 'radio',
        meta: { title: '???', keepalive: true },
        component: radio
      },
      {
        path: 'topCharts',
        name: 'TopCharts',
        meta: { title: '榜单', keepalive: true },
        component: TopCharts
      },
      {
        path: 'albums',
        name: 'albums',
        meta: { title: '专辑', keepalive: true },
        component: albums,
      },
      {
        path: 'albums/:id',
        name: 'albums',
        meta: { title: '专辑', keepalive: true },
        component: albumsList,
      },
      {
        path: 'singer/:id',
        name: 'singer',
        meta: { title: '歌手', keepalive: false },
        component: singer,
        // children:[
        //   { path: '', component: Page404 },
        // ]
      },
      {
        path: 'About',
        name: 'About',
        meta: { title: '关于', keepalive: true },
        component: About
      },
      {
        path: 'favorite',
        name: 'favorite',
        meta: { title: '收藏', keepalive: true },
        component: favorite
      },
      {
        path: 'settings',
        name: 'settings',
        meta: { title: '设置', keepalive: true },
        component: setting
      },
      {
        path: 'search',
        name: 'search',
        meta: { title: '搜索', keepalive: false },
        component: search
      },
      {
        path: 'test',
        name: 'test',
        meta: { title: 'test', keepalive: false },
        component: test
      },
    ]
  },
  {
    path: "/Gtp",
    name: "Gt",
    component: Gutian,
    children: [
      {
        path: 'Guitar',
        name: 'Guitar',
        component: GuitarHome
      }
    ]
  },
  {
    path: "/",
    redirect: "/Music/Home"
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: Page404 },
];

const router = createRouter({
  // history: createWebHistory(process?.env?.BASE_URL),
  history: createWebHistory(),
  routes,
  scrollBehavior: () => {
    // debugger
    return { top: 1000 }
  }
});

export default router;
