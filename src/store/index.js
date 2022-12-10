import vue from 'vue'
import Vuex from 'vuex'
import {isLogin,logout} from "../components/api/getData";

vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    host:"http://localhost:8080/",
    user:{
      test:"lalalala",
      user_id: '',
      user_name: '',
      user_pwd: '',
      user_email:'',
      cookie:'',
      user_position:'',
      isUserActive:false
    }
  },
  mutations: {
    init: function (state) {
      state.user.user_id = ''
      state.user.user_name = ''
      state.user.user_pwd = ''
      state.user.user_email = ''
    },
    setForum_user_id:function (state,forum_user_id){
      state.user.user_id =forum_user_id
    },
    setForum_user_cookie:function (state,cookie){
      state.user.cookie =cookie
    },
    setForum_user_name:function (state,forum_user_name){
      state.user.user_name =forum_user_name
    },
    setForum_user_pwd:function (state,forum_user_pwd){
      state.user.user_pwd =forum_user_pwd
    },
    setForum_user_email:function (state,forum_user_email){
      state.user.user_email =forum_user_email
    },
    setForum_user_position:function (state,forum_user_position){
      state.user.user_position =forum_user_position
    }
  }

})

export default store
