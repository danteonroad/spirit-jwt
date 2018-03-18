import { apiService } from '@/plugins/axios_plugin';

export default {
    login(authUser, cb, errorCb) {
        apiService.post('/auth/login', authUser)
            .then(resp => cb(resp))
            .catch(err => errorCb(err));
    }
}