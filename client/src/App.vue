<template>
  <div id="app">
     <NavBar v-bind:avatar="avatarUrl"/>
     <section class="section">
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



