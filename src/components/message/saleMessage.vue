<template>
  <div class="page">
    <div class="left">
      <sell-one-book v-for="(book1,index) in book" :key="index" :book-id="book1.bookId" :book-isbn="book1.isbn"
                     :book-name="book1.bookName" :book-text="book1.text" :book-type="book1.bookTypes"
                     :img-src="book1.imageURL" :publish-name="book1.userPublishId"></sell-one-book>
    </div>
    <div class="right">
      <div class="content1">发布自己不需要的教材</div>
      <el-form ref="form" :model="form" class="form" label-width="80px">
        <el-form-item label="图书名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图书类型">
          <el-select v-model="form.type" placeholder="请选择图书类型">
            <el-option label="文学类" value="文学类"></el-option>
            <el-option label="数学类" value="数学类"></el-option>
            <el-option label="计算机类" value="计算机类"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图书ISBN" style="margin-left: 2px">
          <el-input v-model="form.ISBN"></el-input>
        </el-form-item>
        <el-form-item label="你的描述">
          <textarea v-model="form.text"
                    placeholder="描述一下你的书呢"
                    style="outline-color:rgba(32,160,255,0.5);margin-top:2px;width:200px;height: 100px;resize:none;border: 0.5px solid rgba(131,145,165,0.5);border-radius: 5%"></textarea>
        </el-form-item>
        <div style="margin-left: 20px">上传图书图片（限一张）</div>

        <div class="uploadFile">
          <!-- ul、li标签用于展示从本地添加的预览图片 -->
          <ul v-show="uploadImg.length!==0">
            <li v-for="(item,index) in uploadImg"
                :key="index"
                class="addPic">
              <img :src="item">
            </li>
          </ul>
          <input id="file" accept="image/*"
                 style="border: 2px solid red"
                 type="file"
                 @change="getPicture($event)">
          <el-button v-show="showInputImg"
                     @click="callFile">+
          </el-button>
        </div>

        <el-button style="align-self: flex-end;margin-right: 150px" @click="postForm">提交表单</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import SellOneBook from "../oneComponent/sellOneBook";
import {isLogin} from "../api/getData";
export default {
  name: "saleMessage",
  components: {SellOneBook},
  data() {
    return {
      uploadImg: [],
      base64Code: '',
      form: {
        name: '',
        type: '',
        ISBN: '',
        text: ''
      },
      url: 'logo.png',
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
  computed: {
    showInputImg() {
      return this.uploadImg.length < 1;
    }
  },
  methods: {
    getPicture(e) {
      //预览图片
      let src = window.URL.createObjectURL(e.target.files[0]);
      this.uploadImg.push(src);

      console.log(src)
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      console.log(e.target.files[0])
      //将图片文件转化成base64格式图片

      console.log(reader.result)
      console.log(reader.result)
      console.log(reader.result)
      reader.onload = (e) => {
        //e.target.result  就是从本地读取的图片的base64格式,将它上传给服务器即可
        //使用axios的post方法上传即可
        this.base64Code = reader.result
        console.log(e.target)
        console.log(e.target)
        // console.log(reader.result)
      }
      //
      // console.log(reader.result)
    },
    callFile() {
      //点击添加图片按钮，触发type:"file"的input标签
      let fileDom = document.querySelector("#file")
      fileDom.click()
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    },
    postForm: function () {
      const self = this
      console.log(self.base64Code)
      this.axios.post(this.$store.state.host + "uploadImage", {
        "base64Data": self.base64Code
      }).then(function (res) {
        console.log(res)
        console.log(self.form.type)
        self.axios.post(self.$store.state.host+"bookAdd",{
          "bookId":1,
          "userPublishId":self.$store.state.user.user_id,
          "bookName":self.form.name,
          "ISBN":self.form.ISBN,
          "bookTypes":self.form.type,
          "imageURL":res.data,
          "isSold":0,
          "text":self.form.text
        }).then(()=>{
          alert("提交成功")
          self.form.name=''
          self.form.type=''
          self.form.ISBN=''
          self.form.text=''
          location.reload()
        })
      })
    }
  },
  mounted() {
    this.$emit("changePage",false)
    isLogin().then((res)=>{
      this.$emit("changePage",false)
      this.axios.get(this.$store.state.host+"bookOneUserList?userPublishId="+this.$store.state.user.user_id).then((res)=>{
        this.book=res.data
      })
    })
  }
}
</script>

<style scoped>
.page {
  background-color: rgb(245, 245, 245);
  height: 85%;
  display: flex;

  justify-content: space-around;
}

.left {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow: scroll;
  overflow-x: hidden;
  border: 2px solid pink;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px inset rgba(0, 0, 0, 0.2);
  background-color: white;
  width: 50%;
}

.right {
  border-radius: 20px;
  background-color: white;
  width: 40%;
  /*border: 2px solid red;*/
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
}

input {
  /* 隐藏默认的"打开文件"样式 */
  display: none;
}

.content1 {

  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
  -webkit-background-clip: text;
  color: transparent;
  /*border:2px solid red;*/
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  line-height: 80px;
}

.uploadFile {
  margin-left: 50px;
  display: flex;
  height: 120px;
  line-height: 120px;
  padding: 10px 0;
  border: 1px solid rgb(235, 235, 235);
  overflow: hidden;
}

.uploadFile ul {
  display: flex;
}

.uploadFile ul li {
  margin-right: 10px;
}

.uploadFile .addPic img {
  height: 100px;
  width: 100px;
}

.uploadFile button {
  height: 100px;
  width: 100px;
  font-size: 50px;
  border: 1px dashed rgb(182, 182, 182);
  color: rgb(182, 182, 182);
  background-color: rgb(243, 243, 243);
}

.form {
  margin-right: 10px;
  margin-left: 10px;
  border: 2px solid pink;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px rgba(0, 0, 0, 0.2);
  height: 80%;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: self-start;
}
</style>
