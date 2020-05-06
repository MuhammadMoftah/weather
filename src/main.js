import Vue from "vue";
import App from "./App.vue";
import router from './router/router'

// import 'fullpage.js/vendors/scrolloverflow' 
// Optional. When using scrollOverflow:true
// import 'fullpage.scrollHorizontally.min' 
// Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'

Vue.use(VueFullPage);


Vue.config.productionTip = false;


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
