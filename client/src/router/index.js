import Vue from "vue";
import Router from "vue-router";
import layout from "../views/layOut/layout.vue";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/index",
      redirect: "/home",
      component: () =>
        import(/*webpackChunkName:'index'*/ "../views/index.vue"),
      children: [
        {
          path: "/home",
          name: "首页",
          component: () =>
            import(/*webpackChunkName:'home'*/ "../views/home.vue"),
          meta: ["首页"]
        },
        {
          path: "/systemManager",
          name: "系统管理",
          component: () =>
            import(
              /*webpackChunkName:'systemManager'*/ "../views/systemManager.vue"
            )
        },
        {
          path: "",
          component: layout,
          meta: ["货物管理"],
          name: "货物管理",
          children: [
            {
              path: "/cargoManager/cargoIngo",
              name: "货物信息",
              meta: ["货物管理", "货物信息"],
              component: () =>
                import(
                  /*webpackChunkName:'systemManager'*/ "../views/cargoManagement/cargoInfo.vue"
                )
            },
            {
              path: "/cargoManager/logisticsInfo",
              name: "物流信息",
              meta: ["货物管理", "货物信息"],
              component: () =>
                import(
                  /*webpackChunkName:'systemManager'*/ "../views/cargoManagement/logisticsInfo.vue"
                )
            }
          ]
        }
      ]
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
