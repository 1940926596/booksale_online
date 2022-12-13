<template>
  <!--1.首先，弹窗页面中要有el-dialog组件即弹窗组件，我们把弹窗中的内容放在el-dialog组件中-->
  <!--2.设置:visible.sync属性，动态绑定一个布尔值，通过这个属性来控制弹窗是否弹出-->
  <div>
    <el-dialog :visible.sync="detailVisible" title="图书详情" >
      <div class="page">
        <div class="left">
          <img :alt="bookName" :src="require('../../photo/'+imgSrc)" style="height: 100%;width: 100%">
        </div>
        <div class="right">
          <div class="content1">{{ bookId }}</div>
          <div class="content2">{{ bookName }} | {{ bookIsbn }} | {{ bookType }}</div>
          <div class="content3">{{ publishName }} | {{ bookText }}</div>
          <div class="label1" style="border: 1px solid black;padding: 10px;cursor: pointer" @close="closeDialog">发起报价
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "bookOneDetail",
  data() {
    return {
      detailVisible: false
    }
  },
  methods: {
    //3.定义一个init函数，通过设置detailVisible值为true来让弹窗弹出，这个函数会在父组件的方法中被调用
    init(data) {
      this.detailVisible = true;
      //data是父组件弹窗传递过来的值，我们可以打印看看
      console.log(data);
    },
    closeDialog: function () {
      const flag = false;
      this.$emit("changeVisible", flag)
    }
  },
  props: {
    imgSrc: {
      type: String,
      default: "919473827d0a4ab1b4c8fd7d38b9828c.jpg"
    },
    bookName: {
      type: String,
      default: "西厢记"
    },
    bookId: {
      default: 1,
      type: Number
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
    publishName: {
      type: String,
      default: "王小虎"
    }
  }
}
</script>

<style scoped>
.page {
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  /*border: 2px solid #fbc2eb;*/
}

.left {
  width: 40%;
  height: 90%;
  /*border: 1px solid red;*/
}

.right {
  padding: 5px;
  background-color: rgb(241, 241, 241);
  width: 50%;
  height: 80%;
  /*border: 1px solid red;*/
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.content1 {
  height: 20%;
  /*border: 1px solid rebeccapurple;*/
  font: 30px Georgia, "Times New Roman", Times, serif;
  /*margin-top: 10px;*/
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  width: 100%;
}

.content2 {
  height: 20%;
  border-bottom: 1px solid black;
  font: 25px Georgia, "Times New Roman", Times, serif;
  padding-bottom: 50px;
  width: 100%;
  color: black;
}

.el-dialog__header{
  background: #f7f7f7;
  text-align: left;
  font-weight: 600;
}

{
  background: #f7f7f7;
  text-align: left;
  font-weight: 600;
}

.content3 {
  height: 20%;
  /*border: 1px solid rebeccapurple;*/
  font: 25px Georgia, "Times New Roman", Times, serif;
  margin-top: 10px;
  width: 100%;
  color: black;
}

.label1 {
  font: 18px Georgia, "Times New Roman", Times, serif;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
}

.label1:hover {
  color: white;
  background-color: rgb(100, 100, 100);
}
</style>
