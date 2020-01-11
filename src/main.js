import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import api from '@/plugins/api'
Vue.config.productionTip = false

Vue.prototype.$http = axios;

Vue.use(api)
Vue.use(axios)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
