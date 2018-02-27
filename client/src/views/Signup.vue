<template>
    <section>
        <b-notification type="is-danger" has-icon v-if="error">
            {{ error.error }}
        </b-notification>
        <form @submit.prevent="signup">
            <b-field label="Name">
                <b-input v-model="name" placeholder="Enter your name" required></b-input>
            </b-field>

            <b-field label="Email" >
                <b-input v-model="email" type="email" placeholder="Enter your email" maxlength="30" required icon="email"></b-input>
            </b-field>

            <b-field label="Password">
                <b-input v-model="password" type="password" password-reveal required icon="lock"></b-input>
            </b-field>
            <button class="button is-primary">Signup</button>
        </form>
    </section>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      name: "",
      email:"",
      password:"",

       error: null
    };
  },
  methods:{
      signup(){
          this.error = null;
          api
          .signup({
              name: this.name,
              email: this.email,
              password: this.password
          })
          .then(()=> {
              this.$router.push('/login');
          })
          .catch((error) => {
              this.error = error;
          })
      }
  }
};
</script>