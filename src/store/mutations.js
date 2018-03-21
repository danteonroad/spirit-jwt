import CONSTS from './consts';

const mutations = {
    [CONSTS.GET_MAIN_HEIGHT](state, height) {
        state.mainHeight = height;
    }
}

export default mutations;