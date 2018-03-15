import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import Login from './auth/login';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Login
    },
    getters
});