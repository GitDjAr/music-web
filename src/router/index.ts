import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import type { RouteComponent } from 'vue-router'

// muisc
const layout = () => import("../layout/default.vue")
const Home = () => import("../views/Home/index.vue")
const radio = () => import("../views/Radio/index.vue")
const setting = () => import("../views/settings/index.vue")
const About = () => import("../views/About.vue")
const TopCharts = () => import("../views/Home/TopCharts.vue")

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
        path: 'Home',
        name: 'Home',
        component: Home
      },
      {
        path: 'radio',
        name: 'radio',
        component: radio
      },
      {
        path: 'topCharts',
        name: 'TopCharts',
        component: TopCharts
      },
      {
        path: 'About',
        name: 'About',
        component: About
      },
      {
        path: 'settings',
        name: 'settings',
        component: setting
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
  scrollBehavior:()=>{
    // debugger
    return { top: 1000 }
  }
});

export default router;
