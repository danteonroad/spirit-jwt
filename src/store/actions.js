import CONSTS from './consts';

const actions = {
    getMainHeight({ commit }, height) {
        commit(CONSTS.GET_MAIN_HEIGHT, height)
    }
}

export default actions;