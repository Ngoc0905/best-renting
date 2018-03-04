<template>
<nav class="navbar is-transparent is-fixed-top">
  <div class="navbar-brand">
     <router-link  class="navbar-item" to="/" >
      <div class="logo">
        <p id="letter-logo">Best Renting</p>
        <div class="stars">
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
      </div>
      </div>
    </router-link>
     
    <div class="navbar-burger burger" :class="{ 'is-active': isActive }" @click="isActive = !isActive ">
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
            <router-link class="navbar-item letter menu" to="/findrenting" @click.native="isActive =false">Find Renting</router-link>
          </p>
          <p class="control"> 
            <router-link class="navbar-item letter menu" to="/adrenting" @click.native="isActive=false">Ad Renting</router-link>
          </p>
          <p class="control"> 
            <router-link class="navbar-item letter menu" to="/adfinding" @click.native="isActive=false">Ad Finding</router-link>
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
                <div class="dropdown-item">
                  Hi {{ $root.user.name }}
                </div>
                <router-link to="/profile" class="dropdown-item">Profile</router-link>
                <router-link to="/history" class="dropdown-item">History</router-link>
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
<style scoped>
.navbar {
  background-color: transparent;
 
}
.logo{
  text-align: center;
  font-family:'Open Sans',Arial,sans-serif;
  color: #fff 
}
#letter-logo{
  font-weight: 700;
  font-size: 32px;
  text-shadow: 1px 1px 1px rgba(0,0,0,.1);
  letter-spacing: 0.5px;
  line-height: normal;
  
}
.menu{
  font-size: 16px;
  text-transform: uppercase;
  font-family:'Open Sans',Arial,sans-serif;
  color: #fff; 
  font-weight: 700;
}

</style>


