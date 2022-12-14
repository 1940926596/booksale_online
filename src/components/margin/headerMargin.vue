<template>
  <nav aria-label="main navigation" class="navbar is-light" role="navigation">
    <div class="navbar-brand" style="margin-left: 20px">
      <a>
        <img class="img" style="height:50px;width: auto" src="../../assets/logo1.png" @click="main"/>
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
                <input class="input" placeholder="Find Book by BookName"  v-model="search"  type="text"/>
              </p>
              <p class="control">
                <button class="button" @click="find">搜索</button>
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
      isActive: '',
      search:'',
      book_ListRst: [],
      book: [{
        bookId: 0,
        userPublishId: 0,
        bookName: '',
        isbn: '',
        bookTypes: '',
        imageURL: '',
        isSold: '',
        text: ''
      }],
    };
  },
  methods: {
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
            self.$router.push('/userbook')
            console.log(this.$store.state.user)
            login(this.$store.state.user.forum_user_email, this.$store.state.user.forum_user_pwd)
            location.reload()
          } else
            alert("查无此人")
        }
      )
    },
    main(){
      this.$router.push("/bookMall");
      location.reload()
    },
    register() {
      this.$router.push("/mall");
      this.$emit("changePage",false)
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
      this.$emit("changePage",false)
    },
    saleList: function () {
      this.$router.push('/sellList')
      this.$emit("changePage",false)
    },
    messageList: function () {
      this.$router.push('/messageList')
      this.$emit("changePage",false)
    },
    find:function (){
      console.log(1111)
      const self = this
      let search = this.search;
        if (search) {
          self.axios.get(this.$store.state.host + "allBookList").then((response) => {
            self.book = response.data
            console.log(self.book)
          })
          this.book_ListRst = []; // 结果列表置空
          let regStr = '';
          // 初始化正则表达式
          for (let i = 0; i < search.length; i++) {
            regStr = regStr + '(' + search[i] + ')([\\s]*)'; //跨字匹配
          }
          console.log(1111)
          let reg = new RegExp(regStr);
          console.log(reg);
          for (let i = 0; i < this.book.length; i++) {
            let name = this.book[i].bookName; //按照内容匹配
            let regMatch = name.match(reg);
            if (null !== regMatch) {// 将匹配的数据放入结果列表中
              this.book_ListRst.push(this.book[i]);
            }
          }
          console.log(this.book_ListRst)
          this.$emit('Screen1', this.book_ListRst)
          this.$router.push('/mall')
        }
        else {
          this.$emit('Screen1', this.book)
          this.$router.push('/mall')
        }
      }
  },
  mounted() {
    this.axios.get(this.$store.state.host + "allBookList").then((res) => {
      this.book = res.data
      console.log(this.book[0].isbn)
      console.log(this.book)
      console.log(this.book[1].isbn)
      console.log(this.book[2].isbn)
      console.log(this.book[0].bookName)
    })
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
