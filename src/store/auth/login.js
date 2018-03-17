// import axios from 'axios'
import { Axios } from '@/plugins/axios_plugin'
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
        DAO.removeItem('currentUser');
        DAO.setItem('currentUser', authInfo);
    }
};

const actions = {
    doLogin({ commit }, user) {
        Axios.post('/auth/login', user)
            .then(resp => {
                if (resp.data.resultCode === 1) {
                    console.log(resp.data.data);
                    commit(CONSTS.DO_LOGIN, resp.data.data);
                } else {
                    console.log('3333333333')
                }
            }).catch(err => {
                console.log('1111111111111')
            });
    }
};


export default {
    state,
    getters,
    mutations,
    actions
};