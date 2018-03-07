<template>
    <section class="container" >
        <h2>Login</h2>
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
            <router-link to="/signup" class="signup-url">Click here if you don't have an account</router-link>
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

<style scoped>
.container{
    width: 500px;
    padding-top: 100px;
}
.signup-url {
    color: #fff;
}
.signup-url:hover{
    color: rgb(66, 59, 168);
}
@media (max-width: 768px) {
    .container{
        width: 100%;
        padding: 15px;
    }
}
</style>
