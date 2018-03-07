<template>
  <div id="app">
    <div id="background"></div>
    <div id="overlay"></div>
     <NavBar v-bind:avatar="avatarUrl"/>
     <section id="grad">
       <router-view />
 
     </section>

    <footer class="footer">
        <div class="content has-text-centered">
          <div class="columns" id="letter">
            <div class="column" >
              <a href="#">ABOUT US</a> 
            </div>
            <div class="column">
              <a href="#">AGENT SUPPORT</a> 
            </div>
            <div class="column">
              <a href="#">TENANTS INFORMATIONS</a> 
            </div>
            <div class="column">
              <a href="#">PRIVACY/TERMS</a> 
            </div>
            <div class="column">
              <a href="#">CONTACT US</a> 
            </div>
          </div>
          <div id="rs" class="columns">
            <h3>Join us</h3>
            <div id="icon">
              <a href="#" title="Find us on Facebook"><i class="fab fa-facebook-square"></i></a>
              <a href="#" title="Find us on LinkedIn"><i class="fab fa-twitter-square"></i></a>
              <a href="#" title="Find us on LinkedIn"><i class="fab fa-linkedin"></i></a>
              <a href="#" title="Find us on Youtube"><i class="fab fa-youtube-square"></i></a>
            </div>
          </div>
          <p>
            <strong>@2018 Website "Best- Renting"</strong> created by BICH Ngoc LE
          </p>
        </div>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

import api from "./api";

export default {
  components: { NavBar },
  data() {
    return {
      avatarUrl: null
    };
  },
  created() {
    const user = api.loadUser();
    if (user) {
      this.$root.user = user;
      this.getUserImage();
    }

    this.$root.$on("avatarChanged", data => {
      this.getUserImage(data);
    });
  },
  methods: {
    getUserImage(url) {
      if (url) {
        this.avatarUrl = url;
      } else {
        api.getUserAvatar().then(responseFromServer => {
          this.avatarUrl = responseFromServer.data;
        });
      }
    }
  }
};
</script>
<style>
#background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("./assets/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  height: 900px;
  background-position: 0 -150px;
  z-index: -2;
}

@media (max-width: 768px) {
  #background {
    background-position: 50% 0;
  }
}

@media (max-width: 1366px) {
  #background {
    background-position: 0 -200px;
  }
}
#overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
}
.label {
  color: #fff !important;
}
#rs {
  list-style-type: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
}
#icon {
  display: flex;
  flex-wrap: nowrap;
}

#icon a {
  font-size: 30px;
 padding-left: 20px;
}
#letter a{
  letter-spacing: 0.2px;
  transform: scale(1, 0.8);
  font-weight: 900;
  color: rgb(74, 74, 74);
}
#letter a:hover {
  color: rgb(89, 89, 185);
}
footer h3 {
  letter-spacing: 0.2px;
  transform: scale(1, 0.8);
  font-weight: bold;
  color: rgb(74, 74, 74);
  margin: 10px;
}
form{
    margin-bottom: 20px;
}
</style>
<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>





