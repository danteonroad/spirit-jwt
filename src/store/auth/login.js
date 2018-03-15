import axios from 'axios'
import CONSTS from '../consts'
import DAO from '@/db'

const state = {
    authinfo: {}
};

const getters = {
    authinfo(state) {
        return state.authinfo;
    }
};

const mutations = {
    [CONSTS.DO_LOGIN](state, authInfo) {
        state.authinfo = authInfo;
        DAO.setItem('currentUser', authInfo);
    }
};

const actions = {
    doLogin({ commit }, user) {
        axios.post('http://localhost:8081/auth/login', user)
            .then(resp => {
                if (resp.data.resultCode === 1) {
                    console.log(resp.data.data);
                    commit(CONSTS.DO_LOGIN, resp.data.data);
                }
            }).catch(err => {

            });
    }
};


export default {
    state,
    getters,
    mutations,
    actions
};