<template>
    <section class="container">
        <h1>Profile</h1>
        <p> {{profile}} </p>               
    </section>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      profile: null
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      api.getProfileByUserId(this.$root.user.id).then(responseFromServer => {
        this.profile = responseFromServer.data;
        console.log(profile);
      });
    }
  }
};
</script>