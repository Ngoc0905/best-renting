<template>
<section id="bloc_contenant">
  <div class="content columns">
    <div class="column">
        <h1>I'm tenant</h1>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Review my previous and current appartment</h4>
        </div>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Review the appartment that I visited</h4>
        </div>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Benefit to an other review to have a best decision</h4>
        </div>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Post my announcement to find the new appartment</h4>
          </div> 
    </div>
    <div class="column">
        <img src="../assets/tenant.jpg" alt="">
    </div>
  </div>
  <div class="content columns">
    <div class="column">
        <img src="../assets/owner.jpg" alt="">
    </div>
    <div class="column">
        <h1>I'm owner</h1>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Post my announcement to rent my apartment</h4>
        </div>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Easy to find the tenant</h4>
        </div>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Rent valuation</h4>
        </div>
        <div class="i-letter">
          <i class="far fa-arrow-alt-circle-right"></i><h4>Have an idea to invest in estate market</h4>
        </div> 
    </div>
    
  </div>
</section>
</template>

<script>
import api from "../api";
export default {};
</script>
<style scoped>
.content {
  padding: 50px 100px;
  background-color: #fff;
}
h1,
h4 {
  font-family: "Open Sans", Arial, sans-serif;
  color: rgb(61, 61, 134);
  flex-wrap: nowrap;
  padding-left: 10px;
}
h1{
  text-align: center;
  padding-bottom: 20px;
  font-weight: bold;
}
img {
  border-radius: 8px;
  text-align: center;
}
icon{
  flex-wrap: nowrap;
}
.i-letter{
  display: flex;
  
}
</style>

