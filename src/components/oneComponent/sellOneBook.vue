<template>
  <div class="page"
       style="background-color: white; width: 600px;height: 150px;border: 1px solid rgb(100,100,100);display: flex;align-items: center;justify-content: space-around;margin: 10px">
    <div class="left">
      <img :alt="bookName" :src="require('../../photo/'+imgSrc)" style="height: 100%;width: 100%">
    </div>

    <div v-if="!change" class="middle">
      <div class="content1">{{ bookId }}: {{ bookName }}</div>
      <div class="content3">ISBN: {{ bookIsbn }}</div>
      <div class="content2">图书类别: {{ bookType }}</div>
      <div class="content4">你的描述: {{ bookText }}</div>
    </div>


    <div v-if="change" class="middle">
      <div style="display: flex;height: 24%;justify-content: center">
        <p class="label2" style="flex-shrink: 0;">图书书名:</p>
        <el-input v-model="bookName" size="small" style="margin-top: 1px"></el-input>
      </div>


      <div style="display: flex;height: 24%;margin-top: 2px">
        <p class="label2" style="flex-shrink: 0;">图书类别:</p>
        <el-select v-model="bookType" placeholder="请选择图书类型" size="small" style="margin-top: 1px">
          <el-option label="文学类" value="文学类"></el-option>
          <el-option label="数学类" value="数学类"></el-option>
          <el-option label="计算机类" value="计算机类"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </div>

      <div style="display: flex;height: 24%;margin-top: 2px">
        <p class="label2" style="flex-shrink: 0;">图书ISBN</p>
        <el-input v-model="bookIsbn" size="small" style="margin-top: 1px"></el-input>
      </div>

      <div style="display: flex;height: 24%;margin-top: 2px">
        <p class="label2" style="flex-shrink: 0;">你的描述:</p>
        <el-input v-model="bookText" size="small" style="margin-top: 1px"></el-input>
      </div>


    </div>

    <div class="right">
      <div v-if="!change" class="label1" style="border: 1px solid black;padding: 10px;cursor: pointer"
           @click="deleteMsg">删除记录
      </div>
      <div v-if="!change" class="label1" style="border: 1px solid black;padding: 10px;cursor: pointer"
           @click="updateMsg">修改记录
      </div>
      <div v-if="change" class="label1" style="border: 1px solid black;padding: 10px;cursor: pointer" @click="saveMsg">
        保存记录
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sellOneBook",
  data() {
    return {
      change: false,

    }
  },
  props: {
    imgSrc: {
      default: 'logo.png'
    },
    bookId: {
      default: 0,
      type: Number
    },
    publishName: {
      default: 2,
      type: Number
    },
    bookName: {
      default: "西厢记",
      type: String
    },
    bookIsbn: {
      default: "111-111-111-111",
      type: String,
    },
    bookText: {
      type: String,
      default: "九成新，可以考虑"
    },
    bookType: {
      type: String,
      default: "文学类"
    },
  },
  mounted() {

  },
  methods: {
    detail: function () {
      let data = {
        "imageURL": this.imgSrc,
        "bookId": this.bookId,
        "isbn": this.bookIsbn,
        "text": this.bookText,
        "bookTypes": this.bookType,
        "bookName": this.bookName,
        "userPublishId": this.publishName,
      }
      // data.push("imgSrc",this.imgSrc)
      // data.push("bookId",this.bookId)
      // data.push("bookIsbn",this.bookIsbn)
      // data.push("bookText",this.bookText)
      // data.push("bookType",this.bookType)
      // data.push("bookName",this.bookName)
      // data.push("publishName",this.publishName)
      console.log(data)
      this.$emit("getBookData", data)
    },
    updateMsg: function () {
      this.change = true
    },
    deleteMsg: function () {
      this.axios.get(this.$store.state.host + "bookDelete?book_id=" + this.bookId).then(() => {
        alert("删除成功")
        location.reload()
      })
    },
    saveMsg: function () {
      const self = this
      self.axios.post(self.$store.state.host + "bookUpdate", {
        "bookId": self.bookId,
        "userPublishId": self.$store.state.user.user_id,
        "bookName": self.bookName,
        "ISBN": self.bookIsbn,
        "bookTypes": self.bookType,
        "imageURL": self.imgSrc,
        "isSold": 0,
        "text": self.bookText
      }).then(() => {
        alert("修改成功")
        location.reload()
      })
    }
  }
}
</script>

<style scoped>
.left {
  height: 80%;
  width: 20%;
  /*border: 2px solid green;*/
}

.right {
  height: 80%;
  width: 35%;
  /*border: 2px solid green;*/
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.middle {
  margin-left: 20px;
  height: 80%;
  width: 40%;
  /*border: 2px solid green;*/
  overflow: hidden;
}

.content1 {
  font: 17px Georgia, "Times New Roman", Times, serif;

}

.content2 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
}

.content3 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
}

.label2 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content4 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
}

el-input {
  font: 15px Georgia, "Times New Roman", Times, serif;
}

.label1 {
  font: 18px Georgia, "Times New Roman", Times, serif;
}

.label1:hover {
  color: white;
  background-color: rgb(100, 100, 100);
}

</style>
