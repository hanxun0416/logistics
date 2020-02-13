import store from "..";

const state = {
  token: "" ,//用户token
  date :'',
  isCarrier:false
};
const getters = {};
const mutations = {
  /**
   * 更新token
   * @param {*} state
   * @param {*} token
   */
  updateToken(state, payload) {
    state.token =payload.token;
    state.isCarrier =payload.isCarrier
    store.commit('login/setDate')
  },
  /**
   * 移除token
   * @param {*} state
   */
  removeToken(state){
 state.token = ''
  },
  /**
   * 设置过期时间date
   * @param {*} state
   */
  setDate(state){
    state.date = Date.now()+1000*60*60*120
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
