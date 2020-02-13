import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate'
import login from './modules/login'
// import clickAble from './modules/clickAble'
import invoice from './modules/invoice'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    invoice
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
});
