import Vue from 'vue'
import activity from './index.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(activity)
}).$mount('#app')