import Vue from 'vue'
import Vuex from 'vuex'
import tickets from './tickets'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showModal: false,
    modalData: {}
  },
  mutations: {
    initialiseStore(state) {
			// Check if the ID exists
			if (localStorage.getItem('store')) {
				// Replace the state object with the stored item
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
    },
    openModal(state, data) {
      state.showModal = true 
      state.modalData = data
    },
    closeModal(state) {
      state.showModal = false 
      state.modalData = {}
    }
  },
  actions: {
  },
  getters:{
    showModal: state => state.showModal,
    modalData: state => state.modalData
  },
  modules: {
    tickets,
  }
})
