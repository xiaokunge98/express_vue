import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "index",
      component: () => import("../views/index.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login.vue")
    },
    {
      path: "*",
      name: "/404",
      component: () => import("../views/404.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next() : next({ path: "/login" });
  }
});
export default router;
