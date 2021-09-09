import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccount: "",
    list: []
  },
  mutations: {
    GET_USERACCOUNT(state, value) {
      state.userAccount = value;
    },
    GET_LISTINFO(state, value) {
      state.list = value;
    }
  },
  actions: {},
  modules: {}
});
