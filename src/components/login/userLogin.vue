<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">
        <div>校园二手教材</div>
        <div>交易平台</div>
      </div>
      <div class="form-wrapper">
        <form>
        <input class="input-item" v-model="username" name="username" placeholder="username" type="text">
        <input class="input-item" v-model="userpwd" name="password" placeholder="password" type="password">
        </form>
        <div class="btn" @click="login">Login</div>
      </div>
      <div class="msg">
        Don't have account?
        <el-button @click="register">Sign up</el-button>
      </div>
      <div class="msg">
        Reset account?
        <el-button @click="findPwd">Reset password</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {login, logout} from "../api/getData";

export default {
  name: "userLogin",
  data(){
    return{
      username:'',
      userpwd:''
    }
  },
  methods: {
    register: function () {
      this.$router.push('/register')
    },
    login: function () {
      const self = this
      this.axios.get(self.$store.state.host+'sqlOneNamePwdList?user_name=' + this.username + '&user_pwd=' + this.userpwd).then(
        (response) => {
          if (response.data.length) {
          self.$store.commit('setForum_user_id', response.data[0].id)
          self.$store.commit('setForum_user_name', response.data[0].name)
          self.$store.commit('setForum_user_pwd', response.data[0].pwd)
          self.$store.commit('setForum_user_email', response.data[0].email)
          self.$store.commit('setForum_user_position', response.data[0].position)
          console.log(this.$store.state.user)
          console.log(response)
            alert("登录成功")
            self.$router.push('/bookMall')
            console.log(this.$store.state.user)
            login(this.$store.state.user.user_name, this.$store.state.user.user_pwd)
            location.reload()
          }
          else {
            alert("查无此人")
          }
        })
    },
    findPwd:function (){
      this.$router.push('/findPwd')
    }
  },
  mounted() {
    logout()
  }
}
</script>

<style scoped>
.container {

  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  overflow: hidden;
}

.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.header {
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  -webkit-background-clip: text;
  color: transparent;
  /*border:2px solid red;*/
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 81px;

}

.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}

.input-item::placeholder {
  text-transform: uppercase;
}

.btn {
  text-align: center;
  padding: 10px;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
  cursor: pointer;
}

.msg {
  margin: 0;
  text-align: center;
  line-height: 60px;
}

a {
  text-decoration-line: none;
  color: #abc1ee;
}

.btn:hover {
  color: white;
  background-color: rgb(26, 187, 246);
}
</style>
