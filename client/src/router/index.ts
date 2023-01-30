import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";

const routes: RouteRecordRaw[] = [
    {
      path: "/",
      alias: "/products",
      name: "products",
      component: () => import("../components/ProductList.vue"),

    //   El @ sigfinica al inicio del proyecto y se parte desde ahi para ir entrando en las carpetas
    //   component: () => import("@/components/TaskList.vue"),
    },
    
    {
      path: "/signin",
      name: "sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/signup",
      name: "sign-up",
      component: () => import("../views/SignUp.vue"),
    },
    // {
    //   path: "/product/new",
    //   name: "product-new",
    //   component: () => import("../components/ProductForm.vue"),
    // },
    {
      path: "/product/:id",
      name: "product-details",
      component: () => import("../components/ProductDetail.vue"),
    },
    {
      path: "/admin",
      name: "admin-view",
      beforeEnter: (to, from, next) => {
        if (store.state.user.isAdmin) {
          console.log(store.state.user.isAdmin)
          next()
        } else {
          next('/')
        }
      },
      component: () => import("../views/Admin.vue"),
    },
  ];
  
//   console.log(process.env.BASE_URL);
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;