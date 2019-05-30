let state = {
  num: 1
}

let mutations = {
  addNum(state){
    state.num = state.num + 1
  },
}

let getters = {

}

let store = {
  namespaced: true,
  state: state,
  mutations: mutations,
  getters: getters
}

export default store
