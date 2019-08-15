import Vue from "vue";
import App from "./App.vue";
import VueCytoscape from "vue-cytoscape";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import "vue-cytoscape/dist/vue-cytoscape.css";

Vue.use(VueCytoscape);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
