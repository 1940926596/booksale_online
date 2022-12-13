<template>
  <nav aria-label="main navigation" class="navbar is-light" role="navigation">
    <div class="navbar-brand" style="margin-left: 20px">
      <a>
        <img class="img" style="height:50px;width: auto" src="../../assets/logo1.png"/>
      </a>
      <a
        aria-expanded="false"
        aria-label="menu"
        class="navbar-burger burger"
        data-target="navbarBasicExample"
        role="button">

        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu" style="margin-left: 10px">
      <div class="navbar-start">
        <a class="navbar-item" @click="register">二手书商城</a>

        <!--        <a class="navbar-item">商城</a>-->
        <a class="navbar-item" @click="buyList">购买记录</a>
        <a class="navbar-item" @click="saleList">发布记录</a>
        <a class="navbar-item" @click="messageList">消息列表</a>

        <!--        <div class="navbar-item has-dropdown is-hoverable">-->
        <!--          <a class="navbar-link">更多</a>-->

        <!--          <div class="navbar-dropdown">-->
        <!--            <a class="navbar-item" @click="userhome">个人主页</a>-->
        <!--            <a class="navbar-item">全部板块</a>-->
        <!--            <a class="navbar-item">全部帖子</a>-->
        <!--            <hr class="navbar-divider"/>-->
        <!--            <a class="navbar-item">Report an issue</a>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5"></p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" placeholder="Find a Book" type="text"/>
              </p>
              <p class="control">
                <button class="button">搜索</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!--      <div v-if="!isUActive" class="navbar-end">-->
      <!--        <div class="navbar-item">-->
      <!--          <div class="buttons">-->
      <!--            <b-button outlined type="is-info" @click="register1">注册</b-button>-->
      <!--            <div class="navbar-menu">-->
      <!--              <div class="navbar-end">-->
      <!--                <b-dropdown aria-role="menu" position="is-bottom-left" trap-focus>-->
      <!--                  <a slot="trigger" class="navbar-item" role="button">-->
      <!--                    <b-button outlined type="is-info">登录</b-button>-->
      <!--                  </a>-->

      <!--                  <b-dropdown-item :focusable="false" aria-role="menu-item" custom paddingless>-->
      <!--                    <div class="modal-card" style="width:300px;">-->
      <!--                      <section class="modal-card-body">-->
      <!--                        <b-field label="Email">-->
      <!--                          <b-input v-model="email" placeholder="Your email" required type="email"></b-input>-->
      <!--                        </b-field>-->

      <!--                        <b-field label="密码">-->
      <!--                          <b-input-->
      <!--                            v-model="password"-->
      <!--                            password-reveal-->
      <!--                            placeholder="Your password"-->
      <!--                            required-->
      <!--                            type="password"-->
      <!--                          ></b-input>-->
      <!--                        </b-field>-->

      <!--                        <b-checkbox>记住我</b-checkbox>-->
      <!--                      </section>-->
      <!--                      <footer class="modal-card-foot">-->
      <!--                        <button class="button is-primary" @click="login">登录</button>-->
      <!--                      </footer>-->
      <!--                    </div>-->
      <!--                  </b-dropdown-item>-->
      <!--                </b-dropdown>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <div v-if="isUActive" class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <b-button outlined type="is-info" @click="logout">登出账号</b-button>
            <!--            <div class="navbar-menu">-->
            <!--              <div class="navbar-end">-->
            <!--                <b-dropdown aria-role="menu" position="is-bottom-left" trap-focus>-->
            <!--                  <a slot="trigger" class="navbar-item" role="button">-->
            <!--                    <b-button outlined type="is-info">登录</b-button>-->
            <!--                  </a>-->

            <!--                  <b-dropdown-item :focusable="false" aria-role="menu-item" custom paddingless>-->
            <!--                    <div class="modal-card" style="width:300px;">-->
            <!--                      <section class="modal-card-body">-->
            <!--                        <b-field label="Email">-->
            <!--                          <b-input v-model="email" placeholder="Your email" required type="email"></b-input>-->
            <!--                        </b-field>-->

            <!--                        <b-field label="密码">-->
            <!--                          <b-input-->
            <!--                            v-model="password"-->
            <!--                            password-reveal-->
            <!--                            placeholder="Your password"-->
            <!--                            required-->
            <!--                            type="password"-->
            <!--                          ></b-input>-->
            <!--                        </b-field>-->

            <!--                        <b-checkbox>记住我</b-checkbox>-->
            <!--                      </section>-->
            <!--                      <footer class="modal-card-foot">-->
            <!--                        <button class="button is-primary" @click="login">登录</button>-->
            <!--                      </footer>-->
            <!--                    </div>-->
            <!--                  </b-dropdown-item>-->
            <!--                </b-dropdown>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>

import {isLogin, logout} from "../api/getData";

export default {
  name: "headerMargin",
  data() {
    return {
      email: "",
      password: "",
      isActive: ''
    };
  },
  methods: {
    // userhome() {
    //   if (this.$store.state.user.forum_user_id === '')
    //     alert('请先登录')
    //   else
    //     this.$router.push("/userPage");
    // },
    login() {
      const self = this
      this.axios.get(this.$store.state.host+'forum_oneUser_list_email?forum_user_email=' + this.email + '&forum_user_pwd=' + this.password).then(
        (response) => {
          console.log(this.$store.state.user)
          console.log(response)
          if (response.data.length) {
            alert("登录成功")
            self.$store.commit('setForum_user_id', response.data[0].forum_id)
            self.$store.commit('setForum_user_name', response.data[0].forum_name)
            self.$store.commit('setForum_user_pwd', response.data[0].forum_pwd)
            self.$store.commit('setForum_user_email', response.data[0].forum_email)
            self.$router.push('/userPage')
            console.log(this.$store.state.user)
            login(this.$store.state.user.forum_user_email, this.$store.state.user.forum_user_pwd)
            location.reload()
          } else
            alert("查无此人")
        }
      )
    },
    register() {
      this.$router.push("/mall");
    },
    register1() {
      this.$router.push("/register");
    },
    logout: function () {
      logout()
      this.$router.push('/login')
      location.reload()
    },
    buyList: function () {
      this.$router.push('/buyList')
    },
    saleList: function () {
      this.$router.push('/sellList')
    },
    messageList: function () {
      this.$router.push('/messageList')
    }
  },
  mounted() {

  },
  props: {
    isUActive: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style scoped>
.img {
  height: 50px;
  width: auto;
  margin-top: 10px;
}

</style>
