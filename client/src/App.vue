<template>
  <div id="app">
     <NavBar />
     <section id="grad" class="section">
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
import NavBar  from './components/NavBar';

import api from './api';

export default {
  components: { NavBar},

  created() {
    const user = api.loadUser();
    if (user) this.$root.user = user;
  },
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




