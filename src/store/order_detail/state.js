let state = {
  id: 'PC12334'
}

let mutations = {
  setId(state,id){
    state.id = id
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
