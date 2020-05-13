import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false
new Vue({
  store,
  router,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: h => h(App)
}).$mount('#app')

// Subscribe to store updates
store.subscribe((mutation, state) => {
	// Store the state object as a JSON string
	localStorage.setItem('store', JSON.stringify(state));
});