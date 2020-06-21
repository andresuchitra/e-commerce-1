import Vue from 'vue';
import './plugins/vuetify';
import GAuth from 'vue-google-oauth2'
import App from './App.vue';
import router from './router';
import store from './store';


const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account',
}

Vue.use(GAuth, gauthOption);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
