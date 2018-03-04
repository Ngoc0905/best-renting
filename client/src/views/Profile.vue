<template>
    <section class="container">
        <nav class="panel">
            <p class="panel-heading">
                Profile
            </p>
            <div class="panel-block">
                <form v-if="profile">
                  <b-field label="Name">
                    <b-input v-model="profile.name"></b-input>
                  </b-field>
                  <b-field label="Email">
                    <b-input type="email" v-model="profile.email"></b-input>
                  </b-field>
                  <b-field label="Phone">
                    <b-input type="tel" icon="phone" v-model="profile.phone"></b-input>
                  </b-field>
                  <b-field label="Profile picture">
                    <b-upload v-model="profile.avatar">
                        <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Click to upload your picture</span>
                        </a>
                    </b-upload>
                  </b-field>
                  <div class="field is-grouped">
                    <div class="control">
                      <button class="button is-link">Submit</button>
                    </div>
                  </div>
                </form>
            </div>
        </nav>
    </section>
</template>
<style scoped>
form {
  width: 100%;
}
</style>

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
  watch: {
    'profile.avatar': function(val){
      console.log(val);
    }
  },
  methods: {
    getProfile() {
      api.getProfileByUserId(this.$root.user.id).then(responseFromServer => {
        this.profile = responseFromServer.data;
      });
    }
  }
};
</script>