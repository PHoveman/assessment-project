import FormView from "@/views/FormView.vue";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "./../store/index";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/:userId",
    name: "formUserId",
    component: FormView,
    beforeEnter: (to, from, next) => {
      store.dispatch("fetchUser", to.params.userId);
      next();
    },
  },
  {
    path: "/",
    name: "form",
    component: FormView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
