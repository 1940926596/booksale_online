import axios from "axios";

import store from "../../store/index"


/**
 * 登陆
 */

export const isLogin = () => {
  console.log(777777)
  return new Promise((resolve, reject) => {
    axios.get(store.state.host + "getBookUserCookie").then((response) => {
      console.log(response.data)
      store.commit('setForum_user_cookie', response.data)
      console.log(store.state.user.cookie)
      if (response.data !== "no cookie") {
        store.state.user.user_name = store.state.user.cookie
        store.state.user.isUserActive = true
        axios.get(store.state.host + "sqlOneNameList?user_name=" + store.state.user.user_name).then((response) => {
          console.log(response.data)
          store.state.user.user_id = response.data[0].id
          console.log(store.state.user.user_id)
          console.log(response.data[0].id)
          store.state.user.user_pwd = response.data[0].pwd
          store.state.user.user_email = response.data[0].email
          store.state.user.user_position = response.data[0].position
          resolve('success')
        })
      } else {
        store.state.user.isUserActive = false
        store.state.user.user_name = ''
        resolve('err')
      }
    }).catch((err) => {
      console.log(err)
      //阻塞
      reject('err')
    })
  })
}

export const logout = () => axios.get(store.state.host + "booksale_logout")

export const login = (name, pwd) => axios.get(store.state.host + "booksale_login?booksale_name=" + name + "&booksale_pwd=" + pwd)

// export const test=()=>(console.log("hello"))
//
// export const fun=function(){
//
// }
