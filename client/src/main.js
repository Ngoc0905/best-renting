import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Buefy from 'buefy';
import VueScrollTo from 'vue-scrollto';
import 'buefy/lib/buefy.css';


Vue.use(Buefy);
Vue.use(VueScrollTo);
Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    user: null,
  },
  render: h => h(App)
}).$mount('#app');