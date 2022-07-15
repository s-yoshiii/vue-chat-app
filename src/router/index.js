import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from "../views/HomeView.vue";
import UserList from "../views/UserList.vue";
import ChatBoard from "../views/ChatBoard.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: UserList,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/chat",
    name: "ChatBoard",
    component: ChatBoard,
  },
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "SignupView",
    component: SignupView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
