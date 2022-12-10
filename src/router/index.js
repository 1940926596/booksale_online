import Vue from 'vue'
import Router from 'vue-router'
import home from "../components/home";
import userLogin from "../components/login/userLogin";
import UserRegister from "../components/login/userRegister";
import bookMall from "../components/mall/bookMall";
import findPassword from "../components/login/findPassword";
import buyMessage from "../components/message/buyMessage";
import saleMessage from "../components/message/saleMessage";
import message from "../components/message/message";

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
    }, {
      path: '/home',
      component: home
    }, {
      path: '/findPwd',
      component: findPassword
    }, {
      path: '/bookMall',
      component: bookMall,
      children: [{
          path: '/buyList',
          component: buyMessage
        },{
          path: '/sellList',
          component: saleMessage
        },{
          path: '/messageList',
          component: message
        }
      ]
    }
  ]
})
