import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
const state = {
  searchClicked: false,
  query: "",
  pageCounter: 1,
};
const getters = {
  searchClicked: (state: { searchClicked: boolean }) => state.searchClicked,
  query: (state: { query: string }) => state.query,
  pageCounter: (state: { pageCounter: number }) => state.pageCounter,
};
const mutations = {
  setSearchClicked(state: { searchClicked: any }, data: any) {
    state.searchClicked = data;
  },
  setQuery(state: { query: any }, data: any) {
    state.query = data;
  },
  setPageCounter(state: { pageCounter: any }, data: any) {
    state.pageCounter = data;
  },
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  plugins: [createPersistedState()],
});
