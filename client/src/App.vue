<template>
  <div id="app">
    <div id="background"></div>
    <div id="overlay"></div>
     <NavBar v-bind:avatar="avatarUrl"/>
     <section id="grad" class="section">
       <router-view />
 
     </section>

    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered">
          <p>
            <strong>Website " Best- Renting"</strong> by Ngoc Le 2018
          </p>
        </div>
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
  background-size:cover;
  background-repeat: no-repeat;
  height: 900px;
  background-position: 0 -300px;
}

@media (max-width: 768px) {
  #background{
    background-position: 50% 0;
  }
}
#overlay{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
}
</style>




