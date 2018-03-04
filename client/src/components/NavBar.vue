<template>
<<<<<<< HEAD
<nav class="navbar is-transparent">
  <div class="navbar-brand ">
     <router-link class="navbar-item letter" to="/" >Best Renting</router-link>
=======
<nav class="navbar is-transparent is-fixed-top">
  <div class="navbar-brand">
     <router-link class="navbar-item" to="/" >Best Renting</router-link>
>>>>>>> 60a25f17beedc51aa80f2058d338e4d1ccb915f1
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
          <p class="control ">
            <router-link class="navbar-item letter" to="/findrenting" @click.native="isActive =false">Find Renting</router-link>
          </p>
          <p class="control"> 
            <router-link class="navbar-item letter" to="/adrenting" @click.native="isActive=false">Ad Renting</router-link>
          </p>
          <p class="control"> 
            <router-link class="navbar-item letter" to="/adfinding" @click.native="isActive=false">Ad Finding</router-link>
          </p>
        </div>
    </div>
    </div>

   <div class="navbar-end ">
     <div class="navbar-item ">
       <p class="control">
         <router-link class="navbar-item letter" to="/review-appartment" @click.native="isActive =false">Review your appartment</router-link>
       </p>
     </div>
      <div class="navbar-item">
        <div class="field is-grouped" v-if="!$root.user">
          <p class="control">
            <router-link class="navbar-item letter" to="/login" @click.native="isActive =false">Login</router-link>
           </p>
          <p class="control"> 
            <router-link class="navbar-item letter" to="/signup" @click.native="isActive=false">Signup</router-link>
          </p>
        </div>
        <div class="field is-grouped" v-else>
          <div class="dropdown is-right is-hoverable">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <span>
                  <img v-if="imageSrc" v-bind:src="imageSrc" alt="">
                </span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
              <div class="dropdown-content">
<<<<<<< HEAD
                <router-link to="/profile" class="dropdown-item letter">Profile</router-link>
                <router-link to="/history" class="dropdown-item letter">History</router-link>
=======
                <div class="dropdown-item">
                  Hi {{ $root.user.name }}
                </div>
                <router-link to="/profile" class="dropdown-item">Profile</router-link>
                <router-link to="/history" class="dropdown-item">History</router-link>
>>>>>>> 60a25f17beedc51aa80f2058d338e4d1ccb915f1
                <hr class="dropdown-divider">
                <a class="dropdown-item letter" @click="logout">Logout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
   </div>
   </div>

</nav>
</template>

<script>
import api from "../api";

export default {
  props: ['avatar'],
  data() {
    return {
      isActive: false
    };
  },
  computed: {
    imageSrc() {
      if (!this.avatar) return null;
      return `http://localhost:3000${this.avatar}`;
    }
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
<style>
.navbar {
  background-color:rgb(192, 150, 34);
  opacity: 0.9;
  box-shadow: 0 4px 8px 0 rgba(6, 34, 2, 0.747), 0 6px 20px 0 rgba(140, 236, 30, 0.671);
}
.letter {
  color: beige;
  font-family: 'Nunito', sans-serif;
}
</style>


