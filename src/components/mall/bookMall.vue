<template>
  <div style="height: 100%;width: 100%">
    <header-margin :is-u-active=true @Screen1="Screen1" @changePage="changePage"></header-margin>
    <!--    子组件向父组件传值-->
    <router-view :book2="book2" @changePage="changePage"></router-view>
<!--    刷新的时候可以不变-->
    <div v-if="isPage"  class="image1">
      <img class="image2"  src="../../assets/back2.png">
    </div>
    <!--    父组件向子组件传值-->
    <footer-margin></footer-margin>
  </div>
</template>

<script>
import HeaderMargin from "../margin/headerMargin";
import FooterMargin from "../margin/footerMargin";
import {isLogin} from "../api/getData";

export default {
  name: "bookMall",
  components: {FooterMargin, HeaderMargin},
  data(){
    return{
      book2:[],
      isPage:true
    }
  },
  methods:{
    Screen1:function (val){
      console.log(val)
      this.book2=val
    },
    changePage:function (val){
      this.isPage=val
    }
  },
  mounted() {
    // this.isPage=true
    console.log(this.isPage)
    isLogin().then((res)=>{
    })
  }
}
</script>

<style scoped>
.image1{
  /*border: 1px solid rebeccapurple;*/
  align-items: center;
  display: flex;
  justify-content: center;
  height: 85%;
  width: 100%;
}

.image2{
  height: 100%;
  /*width: 100%;*/
  width: auto;
}
</style>
