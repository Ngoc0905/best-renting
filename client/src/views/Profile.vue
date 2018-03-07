<template>
    <section class="container">
      <b-notification type="is-success" :active.sync="isSucceeded">
        Your profile has been updated!
      </b-notification>
        <nav class="panel">
            <p class="panel-heading">
                Your Profile
            </p>
            <div class="panel-block">
                <form v-if="profile" @submit.prevent="onSubmit">
                  <b-field label="Name">
                    <b-input v-model="profile.name" icon="account" required></b-input>
                  </b-field>
                  <b-field label="Email">
                    <b-input type="email" icon="email" v-model="profile.email" required></b-input>
                  </b-field>
                  <b-field label="Phone">
                    <b-input type="tel" icon="phone" v-model="profile.phone"></b-input>
                  </b-field>
                  <b-field label="Profile picture">
                    <b-upload v-model="profile.avatar" @input="previewImage">
                        <a class="button is-primary">
                            <b-icon icon="upload"></b-icon>
                            <span>Upload</span>
                        </a>
                    </b-upload>
                  </b-field>
                  <img class="avatar" v-if="imageHasUploaded" :src="imageSrcBase64" alt="">
                  <img class="avatar" v-if="!imageHasUploaded" :src="imageSrc" alt="">
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

<script>
import api from "../api";
export default {
  data() {
    return {
      profile: null,
      imageHasUploaded: false,
      imageSrcBase64: null,
      isSucceeded: false
    };
  },
  mounted() {
    this.getProfile();
  },
  computed: {
    imageSrc() {
      if (this.profile.avatar)
        return `http://localhost:3000${this.profile.avatar}`;
      return null;
    }
  },
  methods: {
    getProfile() {
      api.getProfileByUserId(this.$root.user.id).then(responseFromServer => {
        this.profile = responseFromServer.data;
      });
    },
    previewImage(files) {
      this.imageHasUploaded = false;
      if (files && files[0]) {
        this.imageHasUploaded = true;

        var reader = new FileReader();

        reader.onload = e => {
          this.imageSrcBase64 = e.target.result;
        };

        reader.readAsDataURL(files[0]);
      }
    },
    onSubmit() {
      this.isSucceeded = false;
      var formData = new FormData();
      formData.append("avatar", this.profile.avatar[0]);
      formData.append("name", this.profile.name);
      formData.append("email", this.profile.email);
      formData.append("phone", this.profile.phone);

      api
        .updateUserProfile(this.$root.user.id, formData)
        .then(responseFromServer => {
          this.isSucceeded = true;
          this.$root.$emit('avatarChanged', responseFromServer.data.avatar);
        });
    }
  }
};
</script>

<style scoped>
.container {
  padding-top: 10px;
  width: 50%;
}
form {
  width: 100%;
}

img.avatar {
  width: 160px;
  height: 160px;
}
p{
  font-weight: bold;
}
@media (max-width: 768px){
  .button.is-primary{
    width: 90px;
  }
}
</style>