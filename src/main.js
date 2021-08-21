import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "mand-mobile/components/_style/global.styl"
import "normalize.css"

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
