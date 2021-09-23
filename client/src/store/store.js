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
    /**  1、设置用户登录的邮箱账号*/
    GET_USERACCOUNT(state, value) {
      state.userAccount = value;
    },
    GET_LISTINFO(state, value) {
      state.list = value;
    },
    /** 2、设置用户登录后的个人信息*/

    GET_USERINFO(state, value) {
      state.userInfo = value;
    }
  },
  actions: {
    /**  1、设置用户登录的邮箱账号*/
    SET_MOUTATIONACCOUNT({ commit }, value) {
      commit("GET_USERACCOUNT", value);
    },
    /** 2、设置用户登录后的个人信息*/

    SET_MOUTATIONUSERINFO({ commit }, value) {
      commit("GET_USERINFO", value);
    }
  },
  modules: {}
});
