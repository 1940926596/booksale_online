// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import axios from "axios";
import VueAxios from "vue-axios";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import store from './store/index.js'
axios.defaults.withCredentials=true //允许cookie跨域
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Buefy)
Vue.use(VueAxios,axios)

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
