import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const layout = ()=>import("../layout/default.vue")
const Home = ()=>import( "../views/Home.vue")
const setting = ()=>import( "../views/settings/index.vue")
const About = ()=>import( "../views/About.vue")
const TopCharts = ()=>import( "../views/TopCharts.vue")

const routes: Array<RouteRecordRaw> = [

  {
    path: "/D",
    name: "layout",
    component: layout,
  },
  {
    path:'/Home',
    name:'Home',
    component:Home
  },
  {
    path:'/topCharts',
    name:'TopCharts',
    component:TopCharts
  },
  {
    path:'/About',
    name:'About',
    component:About
  },
  {
    path:'/settings',
    name:'settings',
    component:setting
  },
  {
    path:'/*',
    redirect:'/Home'
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  // history: createWebHistory(process?.env?.BASE_URL),
  history: createWebHistory(),
  routes,
});

export default router;
