<template>
  <div class="page"
       style="width: 800px;height: 170px;border: 1px solid rgb(100,100,100);display: flex;align-items: center;justify-content: space-around;margin: 10px">
    <div class="left">
      <img :alt="bookName" :src="require('../../photo/'+imgSrc)" style="height: 100%;width: 100%">
    </div>
    <div class="middle">
      <div class="content1">{{ bookId }}: {{ bookName }}</div>
      <div class="content2">图书类别: {{ bookType }}</div>
      <div class="content3">ISBN: {{ bookIsbn }}</div>
      <div class="content4">卖家描述: {{ bookText }}</div>
    </div>
    <div class="right">
      <div class="label1" style="border: 1px solid black;padding: 10px;cursor: pointer" @click="detail">查看详情</div>
      <!--      <div class="label1" style="border: 1px solid black;padding: 2px 20px;cursor: pointer;color: white;background-color: rgb(100,100,100);">发起报价</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "bookOne",
  data() {
    return {}
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
    console.log(this.imgSrc)
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
      this.$emit("getBookData",data)
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
  width: 25%;
  /*border: 2px solid green;*/
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.middle {
  margin-left: 20px;
  height: 80%;
  width: 50%;
  /*border: 2px solid green;*/
  overflow: hidden;
}

.content1 {
  font: 22px Georgia, "Times New Roman", Times, serif;

}

.content2 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
}

.content3 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
}

.content4 {
  font: 15px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
}

.label1 {
  font: 18px Georgia, "Times New Roman", Times, serif;
}

.label1:hover {
  color: white;
  background-color: rgb(100, 100, 100);
}

</style>
