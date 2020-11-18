import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import bootstrap from 'bootstrap/dist/css/bootstrap.css'

Vue.use(bootstrap);

Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
