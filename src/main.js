import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './plugins/element.js'
import settings from './settings';

Vue.prototype.$settings = settings;

import axios from "axios";
import cookie from 'js-cookie';
//创建默认实列
const instance=axios.create({
  baseURL:'http://10.248.153.74:9999',
  timeout:5000,
});
//拦截器
instance.interceptors.request.use(config=> {
      if (cookie.get('x-token')) {
        //把获取cookie值放到header里面
        config.headers['x-token'] = cookie.get('x-token');
      }
      return config;
    },
    error => {
      return Promise.reject(error)
    })
instance.interceptors.response.use(response => {
    // console.log("response.headers", response.headers)
    // console.log("response.headers.new-token", response.headers.new-token)
    // console.log("response.headers.new-expires-at", response.headers.new-expires-at)
    // if (response.headers.new-token && response.headers.new-expires-at) {
    //     cookie.set("x-token", response.headers.new_token, {domain:'localhost', expires: response.headers.new_expires_at})
    // }
    return response
})
//暴露实例出去
// export default instance;

instance.defaults.withCredentials = false; // false表示阻止ajax附带cookie
Vue.prototype.$axios = instance; // 把对象挂载vue中
import "./permission";


// 导入极验的sdk
import '../public/static/js/gt.js'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
