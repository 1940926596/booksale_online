<template>
  <div class="page"
       style="background-color: white; width: 600px;height: 160px;border: 1px solid rgb(100,100,100);display: flex;align-items: center;justify-content: space-around;margin: 10px">
    <div class="left">
      <img :alt="book[0].bookName" :src="require('../../photo/'+book[0].imageURL)" style="height: 100%;width: 100%">
    </div>
    <div class="middle">
      <div class="content1">图书信息 | {{book[0].bookId}} | {{book[0].bookName}} | {{book[0].bookTypes}}</div>
      <div class="content2">交易Id号 | {{transactionId}}</div>
      <div class="content3">报价时间 | {{time}}</div>
      <div class="content4">书拥有者Email | {{sellUser[0].email}} | {{sellUser[0].position}}</div>
    </div>
    <div class="right">
      <div class="label1" style="border: 1px solid black;padding: 10px;cursor: pointer" @click="deleteDeal">撤销申请</div>
      <!--      <div class="label1" style="border: 1px solid black;padding: 2px 20px;cursor: pointer;color: white;background-color: rgb(100,100,100);">发起报价</div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: "buyOneBook",
  data() {
    return {
      book:{
        bookId: 0,
        userPublishId: 0,
        bookName: '',
        isbn: '',
        bookTypes: '',
        imageURL: '',
        isSold: '',
        text: ''
      },
      sellUser:[{
        id: '',
        name: '',
        pwd: '',
        email: '',
        position: ''
      }],
      buyUser:[{
        id: '',
        name: '',
        pwd: '',
        email: '',
        position: ''
      }]
    }
  },
  props: {
    transactionId: {
      default: 0,
      type: Number
    },
    bookId: {
      default: 0,
      type: Number
    },
    sellUserId: {
      default: 0,
      type: Number
    },
    buyUserId: {
      default: 0,
      type: Number
    },
    time: {
      default: '0000-00-00 00:00:00',
      type: String
    }
  },

  methods: {
    deleteDeal: function () {
     this.axios.get(this.$store.state.host+"InformationDelete?transactionId="+this.transactionId).then((res)=>{
       this.axios.get(this.$store.state.host+"setBookNotSold?bookId="+this.book[0].bookId).then(()=>{
         alert("撤销成功")
         location.reload()
       })
     })
    }
  },
  watch:{
    transactionId:function (val){
      const self=this
      this.axios.get(this.$store.state.host+"bookOneList?bookId="+this.bookId).then((res)=>{
        this.book=res.data
        console.log(this.book)
        this.axios.get(this.$store.state.host+"sqlOneList?user_id="+this.sellUserId).then((res)=>{
          this.sellUser=res.data
          console.log(this.sellUser)
          console.log(this.book[0].bookId)
        })
      })
    }
  },
  mounted() {
    this.axios.get(this.$store.state.host+"bookOneList?bookId="+this.bookId).then((res)=>{
      this.book=res.data
      console.log(this.book)
      this.axios.get(this.$store.state.host+"sqlOneList?user_id="+this.sellUserId).then((res)=>{
        this.sellUser=res.data
        console.log(this.sellUser)
        console.log(this.book[0].bookId)
      })
    })
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
  font: 15px Georgia, "Times New Roman", Times, serif;

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
