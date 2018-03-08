<template>
<nav class="navbar is-transparent" :class="{'is-fixed-top white-background': isOutOfScreen}">
  <div class="navbar-brand">
     <router-link  class="navbar-item" to="/" >
      <div class="logo">
        <p id="letter-logo">Best renting</p>
        <div class="stars">
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
          <i class="far fa-star"></i>
      </div>
      </div>
    </router-link>
     
    <div class="navbar-burger burger change" :class="{ 'is-active': isActive }" @click="isActive = !isActive ">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

   <div class="navbar-menu" :class="{ 'is-active': isActive}">
    <div class="navbar-start">
      <router-link class="navbar-item letter menu" to="/findrenting" @click.native="isActive =false">Find Renting</router-link>
      <router-link class="navbar-item letter menu" to="/adrenting" @click.native="isActive=false">Renting</router-link>
      <router-link class="navbar-item letter menu" to="/adfinding" @click.native="isActive=false">Finding</router-link>
    </div>

   <div class="navbar-end">
     <router-link class="navbar-item letter menu" to="/review-appartment" @click.native="isActive =false">Review your appartment</router-link>
      <router-link v-if="!$root.user" class="navbar-item letter menu" to="/login" @click.native="isActive =false">Login</router-link>
      <router-link v-if="!$root.user" class="navbar-item letter menu" to="/signup" @click.native="isActive=false">Signup</router-link>
     <div class="navbar-item has-dropdown is-right is-hoverable" id="dropdown-menu" v-if="$root.user">
       <a class="navbar-link" href="#">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <span>
              <img v-if="imageSrc" v-bind:src="imageSrc" alt="">
            </span>
            <span class="icon is-small">
              <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </a>
        <div class="navbar-dropdown is-boxed">
            <div class="navbar-item dropdown-item">
              Hi {{ $root.user.name }}
            </div>
            <router-link to="/profile" class="navbar-item">Profile</router-link>
            <router-link to="/history" class="navbar-item">History</router-link>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="logout">Logout</a>
        </div>
      </div>
   </div>
   </div>

</nav>
</template>

<script>
import api from "../api";

export default {
  props: ["avatar"],
  data() {
    return {
      isActive: false,
      isOutOfScreen: false
    };
  },
  computed: {
    imageSrc() {
      if (!this.avatar) return null;
      return this.avatar;
    }
  },//
  methods: {
    logout() {
      api.logout();
      this.$root.user = null;
      this.$router.push("/login");
    },
    handleScroll() {
      var scrollPos =
        window.scrollY ||
        window.scrollTop ||
        document.getElementsByTagName("html")[0].scrollTop;
      this.isOutOfScreen = scrollPos > 80; // height of navbar = 80
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  }
};
</script>
<style scoped>
.navbar {
  background-color: transparent;
  border-bottom: solid rgba(245, 243, 243, 0.13);
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.navbar-burger {
  color: #fff;
  font-weight: 700;
}

.navbar-menu.is-active a {
  color: #4a4a4a;
}

.navbar-menu a.router-link-active{
  border-bottom: 5px solid rgb(131, 4, 36);
}

.navbar-menu a:hover{
  color: #4a4a4a;
}

.white-background {
  background-color: #fff;
  color: #4a4a4a;
  border-bottom: 2px solid #4a4a4a;
}

.white-background a,
.white-background p,
.white-background .logo {
  color: #4a4a4a !important;
}

.white-background .navbar-burger {
  color: #4a4a4a;
}

.navbar-link::after {
  content: none;
}

.navbar-link .icon {
  color: #000;
}

.logo {
  text-align: center;
  font-family: "Open Sans", Arial, sans-serif;
  color: #fff;
}
#letter-logo {
  font-weight: 700px;
  font-size: 28px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.5px;
  line-height: normal;
  transform: scale(1, 1);
  font-weight: 800;
}
.menu {
  font-family: "Open Sans", Arial, sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.2px;
  transform: scale(1, 0.8);
  font-weight: 700;
}

.navbar-dropdown .navbar-item {
  font-family: "Open Sans", Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
  transform: scale(1, 0.8);
}
</style>


