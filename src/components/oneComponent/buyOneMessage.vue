<template>
  <div class="page"
       style="background-color:white; width: 700px;height: 170px;border: 1px solid rgb(100,100,100);display: flex;align-items: center;justify-content: space-around;margin: 10px">
    <div class="left">
      <img :alt="bookName" :src="require('../../assets/'+imgSrc)" style="height: 100%;width: 100%">
    </div>
    <div class="middle">
      <div class="content1">发起报价 | 交易号: {{ dealId }}</div>
      <div class="content2">图书名: {{ bookName }}</div>
      <div class="content3">ISBN: {{ bookISBN }}</div>
      <div class="content4">报价时间: {{ dealTime }}</div>
      <div class="content4">书拥有者: {{ buyUser }}</div>
    </div>
    <div class="right">
      <div class="label1" style="border: 1px solid black;padding: 10px;cursor: pointer">撤销交易</div>
      <!--      <div class="label1" style="border: 1px solid black;padding: 2px 20px;cursor: pointer;color: white;background-color: rgb(100,100,100);">发起报价</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "buyOneMessage",
  data() {
    return {}
  },
  props: {
    imgSrc: {
      type: String,
      default: "logo.png"
    },
    dealId: {
      default: 1,
      type: Number
    },
    bookName: {
      default: "西厢记",
      type: String
    },
    bookISBN: {
      type: String,
      default: "11111-11111-1111"
    },
    dealTime: {
      type: String,
      default: "0-0-0-0"
    },
    buyUser: {
      type: String,
      default: "陈小刚"
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
  color: greenyellow;
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
