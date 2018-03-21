import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
// import Login from './auth/login';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        // Login
    },
    state: {
        mainHeight: 0
    },
    getters,
    mutations,
    actions,
});