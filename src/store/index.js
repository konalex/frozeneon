import Vue from 'vue';
import Vuex from 'vuex';
// import searchPackage from '@/api/search';
import Search from '@/api/search';

function prepareResults(items) {
  if (!items) return [];
  return items.map((item) => item.package);
}

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    items: [],
    total: 0,
    query: {
      name: '',
      page: 1,
    },
    loading: false,
    package: {},
  },
  getters: {
    getSearchResults: (state) => state.items,
    getTotal: (state) => state.total,
    getPage: (state) => state.query.page,
    getLoading: (state) => state.loading,
    getPackage: (state) => state.package,
  },
  mutations: {
    setResults(state, data) {
      state.items = data;
    },
    setTotal(state, data) {
      state.total = data;
    },
    setName(state, data) {
      state.query.name = data;
    },
    setPage(state, data) {
      state.query.page = data;
    },
    setPackage(state, data) {
      state.package = data;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {
    async search({ commit, state }, name) {
      commit('toggleLoading');
      commit('setName', name);
      const result = await new Search().searchPackage(state.query.name, state.query.page);
      commit('setTotal', result.total);
      commit('toggleLoading');
      commit('setResults', prepareResults(result.objects));
    },
    async get({ commit }, name) {
      commit('setName', name);
      const result = await new Search().getPackage(name);
      commit('setPackage', result);
    },
    clear({ commit }) {
      commit('setName', '');
      commit('setTotal', 0);
      commit('setResults', []);
      commit('setPage', 1);
    },
    setPage({ commit, dispatch, state }, page) {
      commit('setPage', page);
      dispatch('search', state.query.name);
    },
    clearDetails({ commit }) {
      commit('setPackage', {});
    },
  },
});
