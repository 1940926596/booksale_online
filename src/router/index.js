import Vue from 'vue'
import Router from 'vue-router'
import home from "../components/home";
import userLogin from "../components/login/userLogin";
import UserRegister from "../components/login/userRegister";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: userLogin
    },
    {
      path: '/login',
      component: userLogin
    },
    {
      path: '/register',
      component: UserRegister
    },{
      path: '/home',
      component: home
    }
  ]
})
