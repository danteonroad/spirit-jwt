import DAO from '@/db';

const getters = {
    accessToken(state, getters) {
        return getters.currentUser.accessToken;
    },
    currentUser() {
        return DAO.getItem('currentUser');
    }
};

export default getters;