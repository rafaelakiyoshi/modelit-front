import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      email: '',
      nickname: '',
      id: ''
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_USER (store, obj) {
      store.user = obj.user
    },
    CLEAR_USER (store) {
      store.user = {
        email: '',
        nickname: '',
        id: ''
      }
    }
  },
  getters: {
    returnUser (state) {
      return state.user
    }
  }
})