<template>
  <div>
    <header-margin></header-margin>
    <footer-margin></footer-margin>
  </div>
</template>

<script>
import FooterMargin from "./margin/footerMargin";
import HeaderMargin from "./margin/headerMargin";
export default {
  name: "home",
  components: {HeaderMargin, FooterMargin}
}
</script>

<style scoped>

</style>
