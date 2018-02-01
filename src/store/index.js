import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      nickname: '',
      id: ''
    }
  },
  mutations: {
    SET_USER (store, obj) {
      store.user = obj.user
    }
  },
  getters: {
    returnUser (state) {
      return state.user
    }
  }
})