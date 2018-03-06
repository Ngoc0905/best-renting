<template>
<section>
  <div class="content columns">
    <div class="column">
        <h1>I'm tenant</h1>
        <h4>Review my previous and current appartment</h4>
        <h4>Review the appartment that I visited</h4>
        <h4>Benefit to an other review to have a best decision</h4>
        <h4>Post my announcement to find the new appartment</h4>
       
    </div>
    <div class="column">
        <img src="../assets/tenant.jpg" alt="">
    </div>
  </div>
  <div class="content columns">
    <div class="column">
        <h1>I'm owner</h1>
        <h4>Post my announcement to rent my apartment</h4>
        <h4>Easy to find the tenant</h4>
        <h4>Rent valuation</h4>
        <h4>Have an idea to invest in estate market</h4>
       
    </div>
    <div class="column">
        <img src="../assets/owner.jpg" alt="">
    </div>
  </div>
</section>
</template>

<script>
import api from "../api";
export default {
}
</script>
<style scoped>
.content{
background-color: #fff;
}
h1, h4{
  font-family: "Open Sans", Arial, sans-serif;
  float: left;
}
img{
  width: 300px;
 padding-top: 200px;
}

</style>

