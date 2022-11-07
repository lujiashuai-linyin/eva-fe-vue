import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'
import settings from './settings';

Vue.prototype.$settings = settings;

import axios from "axios"
axios.defaults.withCredentials = false; // false表示阻止ajax附带cookie
Vue.prototype.$axios = axios; // 把对象挂载vue中


// 导入极验的sdk
import '../public/static/js/gt.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
