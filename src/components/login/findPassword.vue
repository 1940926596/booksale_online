<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="haveAccount">
        <div
          style="justify-self: flex-start;margin-right: 360px;font-size: 25px; background-image: linear-gradient(to right, rgb(0,240,254), rgb(43,43,43));-webkit-background-clip: text;color: transparent;">
          Forget？
        </div>
        <!--        <div class="content1">-->
        <!--          已有账号？-->
        <!--        </div>-->
        <el-button
          style="height: 60%;display:flex;align-items: center;margin-right: 50px;box-shadow: 2px 2px 5px 3px rgba(0,0,0,0.2);font-size: 18px"
          @click="login">
          登录
        </el-button>
      </div>
      <div class="posts">
        <div class="post">
          <el-form ref="ruleForm1" :model="ruleForm" :rules="rules" autocomplete="off" class="form1" inline="true"
                   label-width="80px ">
            <el-form-item label="用户名" prop="name">
              <el-input v-model="ruleForm.name"/>
            </el-form-item>
            <el-form-item label="QQ邮箱" prop="email">
              <el-input v-model="ruleForm.email"/>
            </el-form-item>

            <el-form-item label="验证码" prop="code">
              <el-input v-model="ruleForm.code" maxlength="6"/>
            </el-form-item>
            <div class="confirm1">
              <el-button round size="mini" @click="sendMsg">发送验证码</el-button>
              <span class="status">{{ statusMsg }}</span>
            </div>
            <el-form-item label="重置密码" prop="pwd">
              <el-input v-model="ruleForm.pwd" type="password"/>
            </el-form-item>
            <el-form-item label="确认密码" prop="cpwd">
              <el-input v-model="ruleForm.cpwd" type="password"/>
            </el-form-item>
          </el-form>
        </div>
        <div class="yes">
          <div class="content3">
            重置密码须知
          </div>
          <div class="content2">
            {{ textarea }}
          </div>
          <el-form ref="ruleForm2" :model="ruleForm" :rules="rules" autocomplete="off">
            <el-form-item prop="agreed" style="margin-left: 5px;margin-top: 20px">
              <el-checkbox v-model="ruleForm.agreed">同意重置密码协议</el-checkbox>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <div class="submit" @click="register">
        <el-button style="height: 70%">确认重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "findPassword",
  data() {
    return {
      code1: '',
      verification: false,
      reg1: '',
      reg2: '',
      statusMsg: '',
      error: '',
      textarea: '请仔细阅读以下协议\n' +
        '1、一切移动客户端用户在下载并浏览件时均被视为已经仔细阅读本条款并完全同意。凡以任何方式登陆网站，或直接、间接使用本资料者，均被视为自愿接受本网站相关声明和用户服务协议的约束。\n' +
        '2、转载的内容并不代表网站的意见及观点，也不意味着本网赞同其观点或证实其内容的真实性。\n' +
        '3、转载的文字、图片、音视频等资料均由用户提供，其真实性、准确性和合法性由信息发布人负责。不提供任何保证，并不承担任何法律责任。\n\n',
      ruleForm: {
        agreed: false,
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: '',
        position: '望江校区'
      },
      ifExist: {
        id: '',
        name: '',
        pwd: '',
        email: '',
        position: ''
      },
      rules: {
        agreed: [{
          required: true,
          validator: (rule, value, callback) => {
            console.log('value:' + value)
            if (value !== true) {
              callback(new Error('请确认同意注册协议'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        }],
        name: [{
          required: true,
          type: 'string',
          message: '请输入用户名',
          trigger: 'blur'
        }],
        email: [{
          required: true,
          type: 'string',
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          required: true,
          type: 'email',
          message: '请正确输入邮箱',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: '创建密码',
          trigger: 'blur'
        }],
        cpwd: [{
          required: true,
          message: '确认密码',
          trigger: 'blur'
        }, {
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pwd) {
              callback(new Error('两次输入密码不一致'))
            } else {
              callback()
            }
          },
          trigger: 'blur'
        },]
      }
    }
  },
  methods: {
    sendMsg: function () {
      const self = this
      let namePass
      let emailPass
      if (self.timerid) {
        return false
      }
      this.$refs['ruleForm1'].validateField('name', (valid) => {
        namePass = valid
      })
      self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['ruleForm1'].validateField('email', (valid) => {
        emailPass = valid
      })
      // 模拟验证码发送
      if (!namePass && !emailPass) {
        this.axios.get(this.$store.state.host + 'sendEmail?emailReceiver=' + this.ruleForm.email).then((res) => {
          this.code1 = res.data
        })
        let count = 60
        self.statusMsg = `验证码已发送,剩余${count--}秒`
        self.timerid = setInterval(function () {
          self.statusMsg = `验证码已发送,剩余${count--}秒`
          if (count === 0) {
            clearInterval(self.timerid)
          }
        }, 1000)
      }
    },
    register1: function () {
      this.$refs['ruleForm2'].validate((valid) => {
        this.reg1 = valid;
      })
    },
    register2: function () {
      this.$refs['ruleForm1'].validate((valid) => {
        this.reg2 = valid;
      })
    },
    exist: function () {
      const self = this
      this.axios.get(this.$store.state.host + 'sqlOneNameList?user_name=' + this.ruleForm.name)
        .then(function (response) {
          console.log(response.data)
          self.ifExist = response.data
          console.log(self.ifExist)
          self.axios.get(self.$store.state.host + 'getCodeList').then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              if (self.ruleForm.code === res.data[i].code)
                self.verification = true
            }
            if (self.verification) {
              if (self.ifExist.length === 0 || self.ifExist[0].email === self.ruleForm.email) {
                alert("修改成功")
                self.axios.get(self.$store.state.host + 'sqlUpdate?name=' + self.ruleForm.name + '&pwd=' + self.ruleForm.pwd + '&email=' + self.ruleForm.email)
                self.$router.push('/')
              } else {
                console.log(self.ifExist.email)
                console.log(self.ifExist.email)
                console.log(self.ifExist.email)
                alert("名字已经存在，请换个名字吧")
              }
            } else
              alert("验证码错误")
          })
        })
    },
    login: function () {
      this.$router.push('/login')
    },
    register: function () {
      this.register1()
      this.register2()
      if (this.reg1 && this.reg2) {
        this.ifExist.forum_email = ''
        this.ifExist.forum_name = ''
        this.ifExist.forum_pwd = ''
        this.exist();
      } else alert("请填写相关信息")
    }
  },
  mounted() {
    isLogin()
  }
}

</script>

<style scoped>

.page {
  height: 75%;
  border: 2px solid black;
  border-radius: 20px;
  margin-top: 10px;
  margin-left: 200px;
  margin-right: 200px;
  box-shadow: 0 5px 15px -5px rgba(0, 0, 0, .5);
}

.haveAccount {
  align-items: center;
  /*background-color: rgba(0, 0, 0, 0.05);*/
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  opacity: 0.5;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;

}

.confirm1 {
  margin-left: 20px;
  display: flex;
  /*border: 2px solid red;*/
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 0;
  margin-bottom: 5px;
}

.content2 {
  margin-top: 10px;
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
  /*box-shadow: -2px -2px 5px 3px rgba(0, 0, 0, 0.5);*/
  border-radius: 20px;
  letter-spacing: 2px;
}

.submit {
  height: 10%;
  /*border: 2px solid red;*/
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 150px;
}

.content1 {
  color: rgba(0, 0, 0, 0.6);
  font-size: 20px;
  border-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "微软雅黑";
}

.posts {
  display: flex;
  height: 80%;
  /*border: 3px solid green;*/
}

.post {
  height: 100%;
  width: 60%;
  margin-left: 50px;
  /*border: 2px solid purple;*/
}

.status {
  font-size: 12px;
  margin-left: 20px;
  color: rgb(0, 0, 0);
}

.yes {
  /*margin-top: 25px;*/
  margin-right: 150px;
  height: 100%;
  width: 40%;
}

.form1 {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 50px 100px 0 100px;
}

.el-form-item {
  padding: 2px;
}

.container {
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  overflow: hidden;
}

.login-wrapper {
  background-color: #fff;
  width: 1100px;
  height: 588px;
  border-radius: 15px;
  /*padding: 0 50px;*/
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.content3 {
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  -webkit-background-clip: text;
  color: transparent;
  margin-top: 20px;
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 2px;
  display: flex;
  justify-content: center
}
</style>
