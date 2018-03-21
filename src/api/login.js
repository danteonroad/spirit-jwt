import { apiService } from '@/plugins/axios-plugin';

export default {
    login(authUser, cb, errorCb) {
        apiService.post('/auth/login', authUser)
            .then(resp => cb(resp))
            .catch(err => errorCb(err));
    }
}