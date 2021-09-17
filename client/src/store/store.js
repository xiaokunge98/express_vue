import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAccount: "",
    userInfo: {},
    list: []
  },
  mutations: {
    GET_USERACCOUNT(state, value) {
      state.userAccount = value;
    },
    GET_LISTINFO(state, value) {
      state.list = value;
    },
    GET_USERINFO(state, value) {
      state.userInfo = value;
    }
  },
  actions: {
    SET_MOUTATIONACCOUNT({ commit }, value) {
      commit("GET_USERACCOUNT", value);
    },
    SET_MOUTATIONUSERINFO({ commit }, value) {
      commit("GET_USERINFO", value);
    }
  },
  modules: {}
});
