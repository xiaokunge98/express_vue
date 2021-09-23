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
      name: "根目录",
      meta: [],
      component: () =>
        import(/*webpackChunkName:'index'*/ "../views/index.vue"),
      children: [
        {
          path: "/home",
          name: "首页",
          meta: { icon: "el-icon-s-home", info: [] },
          component: () =>
            import(/*webpackChunkName:'home'*/ "../views/home.vue")
        },

        {
          path: "/cargoManager",
          component: layout,
          name: "货物管理",
          meta: {
            icon: "el-icon-s-management",
            info: []
          },
          redirect: "/cargoManager/cargoIngo",
          children: [
            {
              path: "/cargoManager/cargoIngo",
              name: "货物信息",
              meta: {
                icon: "el-icon-box",
                info: [
                  { path: "/cargoManager", name: "货物管理" },
                  { path: "/cargoManager/cargoIngo", name: "货物管理" }
                ]
              },
              component: () =>
                import(
                  /*webpackChunkName:'systemManager'*/ "../views/cargoManagement/cargoInfo.vue"
                )
            },
            {
              path: "/cargoManager/logisticsInfo",
              name: "物流信息",
              meta: {
                icon: "el-icon-truck",
                info: [
                  { path: "/cargoManager", name: "货物管理" },
                  { path: "/cargoManager/logisticsInfo", name: "物流信息" }
                ]
              },
              component: () =>
                import(
                  /*webpackChunkName:'systemManager'*/ "../views/cargoManagement/logisticsInfo.vue"
                )
            }
          ]
        },
        {
          // path: "/userInfo/:id/:name",
          path: "/userInfo",
          name: "用户设置",
          meta: {
            icon: "el-icon-user-solid",
            info: [{ path: "/userInfo", name: "用户信息" }]
          },
          component: () =>
            import(
              /*webpackChunkName:'userInfo'*/ "../views/userInfo/userInfo.vue"
            )
        },
        {
          path: "/systemManager",
          name: "系统管理",
          meta: {
            icon: "el-icon-s-tools",
            info: [{ path: "/systemManager", name: "系统管理" }]
          },
          component: () =>
            import(
              /*webpackChunkName:'systemManager'*/ "../views/systemManager.vue"
            )
        }
      ]
    },
    {
      path: "/home",
      name: "首页",
      component: () => import(/*webpackChunkName:'home'*/ "../views/home.vue"),
      meta: ["首页"]
    },
    {
      path: "/",
      name: "登录页",
      redirect: "/login"
    },
    // {
    //   path: "/login",
    //   name: "登录t",
    //   component: () =>
    //     import(/*webpackChunkName:'logint'*/ "../views/login.vue")
    // },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/*webpackChunkName:'register'*/ "../views/register.vue")
    },
    {
      path: "/login",
      name: "登录注册",
      component: () => import(/*webpackChunkName:'login'*/ "../views/login.vue")
    },
    {
      path: "*",
      name: "/404",
      component: () => import(/*webpackChunkName:'404'*/ "../views/404.vue")
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
