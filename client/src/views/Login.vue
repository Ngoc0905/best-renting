<template>
    <section class="container" >
        <b-notification type="is-danger" has-icon v-if="error">
            {{ error.error }}
        </b-notification>
        <form @submit.prevent="login">
            <b-field label="Email"  required >
            <b-input type="email"
                placeholder="Please enter you email" v-model="email"
                maxlength="30" icon="email">
            </b-input>
            </b-field>

        <b-field label="Password">
            <b-input type="password" required v-model="password" icon="lock"
                placeholder="Please enter your password"
                password-reveal>
            </b-input>
        </b-field>
        <button class="button is-primary">Login</button>
        <div>
            <router-link to="/signup">Click here if you don't have an account</router-link>
        </div>
        </form>
    </section>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      email: "",
      password: "",

      error: null
    };
  },
  methods: {
    login() {
        this.error = null;
        api
        .login(this.email, this.password)
        .then(user => {
            this.$root.user = user;
            this.$router.push('/');
        })
        .catch(error => {
            this.error = error;
        })
    }
  }
};
</script>

<style>
.container{
    width: 500px;
}
</style>
