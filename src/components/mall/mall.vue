<template>
  <div class="page">
    <div class="left">
      <div class="category">
        <div style="margin-top: 20px;font-size: 25px;font-weight: 700;letter-spacing: 2px;color: rgba(0,0,0,0.6)">所有分类
        </div>
        <div style="width: 80%;margin-top: 30px;border: 1px solid rgba(0,0,0,0.2)">
          <div
            style="width: 100%;height: 50px;border-bottom: 1px solid rgba(0,0,0,0.2);display: flex;align-items: center;font-size: 15px;font-weight: 700;">
            <p style="padding:0;margin-left: 20px">图书名分类</p></div>
          <div
            style="width: 100%;height: 200px;border-bottom: 1px solid rgba(0,0,0,0.2);display: flex;justify-content: center;flex-wrap: wrap">
            <div class="label1" @click="getTypeBooks('文学类')">文学类</div>
            <div class="label1" @click="getTypeBooks('数学类')">数学类</div>
            <div class="label1" @click="getTypeBooks('计算机类')">计算机类</div>
            <div class="label1" @click="getTypeBooks('其他')">其他</div>
          </div>
          <div
            style="width: 100%;height: 50px;display: flex;align-items: center;font-size: 15px;justify-content: center;font-weight: 700;color: rgba(0,0,0,0.6)">
            点击你感兴趣的版块
          </div>
        </div>
      </div>
    </div>
    <div class="right">

      <book-one-detail v-if="visible" ref="dialog" :book-id="book1.bookId" :book-isbn="book1.isbn"
                       :book-name="book1.bookName" :book-text="book1.text" :book-type="book1.bookTypes"
                       :img-src="book1.imageURL"
                       :publish-name="bookSeller.name" :publish-user-id="bookSeller.id" @closeDialog="closeDialog"></book-one-detail>

<!--      <button @click="handleClick('父组件')">点击</button>-->

      <book-one v-for="(book1,index) in book" :key="index" :book-id="book1.bookId" :book-isbn="book1.isbn"
                :book-name="book1.bookName" :book-text="book1.text" :book-type="book1.bookTypes"
                :img-src="book1.imageURL" :publish-name="book1.userPublishId" v-on:getBookData="getBookData"></book-one>
    </div>
  </div>
</template>

<script>
import BookOne from "../oneComponent/bookOne";
import BookOneDetail from "../oneComponent/bookOneDetail";

export default {
  name: "mall",
  components: {BookOneDetail, BookOne},
  data() {
    return {
      url: 'logo.png',
      visible: false,
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
      book1: {
        bookId: 0,
        userPublishId: '',
        bookName: '',
        isbn: '',
        bookTypes: '',
        imageURL: '',
        text: ''
      },
      bookSeller:{
        id:0,
        name:'',
        pwd:'',
        email:'',
        position:''
      }
    }
  },
  mounted() {
    this.$emit("changePage",false)
    this.axios.get(this.$store.state.host + "bookNotSoldList").then((res) => {
      this.book = res.data
      console.log(this.book[0].isbn)
      console.log(this.book)
      console.log(this.book[1].isbn)
      console.log(this.book[2].isbn)
      console.log(this.book[0].bookName)
    })
  },
  methods: {
    handleClick(data) {
      this.visible = true;
      this.$nextTick(() => {
        //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
        //init调用的是dialog-component组件里面的init方法
        //data是传递给弹窗页面的值
        this.$refs.dialog.init(data);
      })
      console.log(this.book1[0])
    },
    closeDialog: function (val) {
      this.visible = val;
    },
    getBookData: function (val) {
      this.book1 = val
      this.axios.get(this.$store.state.host+'sqlOneList?user_id='+this.book1.userPublishId).then((res)=>{
        this.bookSeller=res.data[0]
        console.log(this.bookSeller)
        this.handleClick(val)
        console.log(this.book1)
      })
    },
    getTypeBooks:function (type){
      this.axios.get(this.$store.state.host+'bookTypeList?bookType='+type).then((res)=>{
        this.book = res.data
      })
    }
  },
  props:{
    book2:[]
  },
  watch:{
    book2:function (val) {
      console.log(val);
      this.book=val
    }
  },
}
</script>

<style scoped>
.page {
  /*background-color: rgb(245,245,245);*/
  /*border: 2px solid red;*/
  height: 85%;
  display: flex;
  justify-content: space-around;
}

.left {
  /*border: 2px solid pink;*/
  /*width: 25%;*/
}

.right {
  overflow: scroll;
  overflow-x: hidden;
  border: 2px solid pink;
  width: 60%;
  border-radius: 20px;
  box-shadow: 2px 2px 5px 3px inset rgba(0, 0, 0, 0.2);
  background-color: white;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  /*align-items: center;*/
}

.label1 {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(26, 187, 246, 1);
  color: rgba(26, 187, 246);
  font-size: 15px;
  padding: 10px;
  height: 40px;
  border-radius: 5px;
  margin: 10px 5px 5px;
  cursor: pointer;
}

.label1:hover {
  color: white;
  background-color: rgb(26, 187, 246);
}

.category {
  margin-top: 100px;
  height: 70%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
