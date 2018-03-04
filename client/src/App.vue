<template>
  <div id="app">
<<<<<<< HEAD
     <NavBar />
     <section id="grad" class="section">
=======
     <NavBar v-bind:avatar="avatarUrl"/>
     <section class="section">
>>>>>>> 60a25f17beedc51aa80f2058d338e4d1ccb915f1
       <router-view />
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1><h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1><h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1><h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
       <h1>Test</h1>
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
/* #grad {
  background: linear-gradient(rgb(24, 114, 84), rgb(92, 212, 108), rgb(63, 180, 131));
} */
body {
  background-image: url("https://cdn-cms.f-static.com/uploads/974296/2000_5a9b3049bc19d.jpg");
  background-size: cover;
}
</style>




