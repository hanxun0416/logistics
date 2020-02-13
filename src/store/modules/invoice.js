const state = {
    id: '',        //用户所选待上传发票订单的id
}
const getters = {

}
const mutations = {
    /**
    * 更新门店编号
    * @param {*} state 
    * @param {*} userCode 
    */
    updateId(state, id) {
        state.id = id
    },
}
const actions = {

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}