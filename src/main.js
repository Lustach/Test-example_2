import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import api from '@/plugins/api'
import {Pagination} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.use(Pagination);
Vue.use(api)
Vue.use(axios)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
