import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    avatar: "",
    name: "",
    nickname: "",
    authorityId: "",
    email: "",
    phone: ""
  },
  getters: {
  },
  mutations: {
    updateNickName(state, data){
      state.nickname=data
    },updateName(state, data){
      state.name=data
    },updateEmail(state, data){
      state.email=data
    },updateAvatar(state, data){
      state.avatar=data
    },updateAuthorityId(state, data){
      state.authorityId=data
    },updatePhone(state, data){
      state.phone=data
    },
  },
  actions: {
  },
  modules: {
  }
})
