<template>
  <div style="height: 100%;width: 100%">
    <header-margin :is-u-active=true></header-margin>
    <router-view></router-view>
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
  methods:{

  },
  mounted() {
    isLogin().then((res)=>{

    })
  }
}
</script>

<style scoped>

</style>
