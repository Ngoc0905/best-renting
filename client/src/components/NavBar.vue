<template>
<nav class="navbar is-transparent">
  <div class="navbar-brand">
     <router-link class="navbar-item" to="/" >Best Renting</router-link>
    <div class="navbar-burger burger" :class="{ 'is-active': isActive }" @click="isActive = !isActive">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

   <div  class="navbar-menu" :class="{ 'is-active': isActive}">
    <div class="navbar-start">
       <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link class="navbar-item" to="/findrenting" @click.native="isActive =false">Find Renting</router-link>
          </p>
          <p class="control"> 
            <router-link class="navbar-item" to="/adrenting" @click.native="isActive=false">Ad Renting</router-link>
          </p>
          <p class="control"> 
            <router-link class="navbar-item" to="/adfinding" @click.native="isActive=false">Ad Finding</router-link>
          </p>
        </div>
    </div>
    </div>

   <div class="navbar-end">
     <div class="navbar-item">
       <p class="control">
         <router-link class="navbar-item" to="/review-appartment" @click.native="isActive =false">Review your appartment</router-link>
       </p>
     </div>
      <div class="navbar-item">
        <div class="field is-grouped" v-if="!$root.user">
          <p class="control">
            <router-link class="navbar-item" to="/login" @click.native="isActive =false">Login</router-link>
           </p>
          <p class="control"> 
            <router-link class="navbar-item" to="/signup" @click.native="isActive=false">Signup</router-link>
          </p>
        </div>
        <div class="field is-grouped" v-else>
          <p class="control">
            HI {{ $root.user.name}}
          </p>
          <p class="control">
            <a class="navbar-item" @click="logout">Logout</a>
          </p>
        </div>
      </div>
   </div>
   </div>

</nav>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      isActive: false
    };
  },

  methods: {
    logout() {
      api.logout();
      this.$root.user = null;
      this.$router.push("/login");
    }
  }
};
</script>

