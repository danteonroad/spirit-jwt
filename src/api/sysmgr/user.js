import { apiService } from '@/plugins/axios-plugin';

export default {
    queryById(id, cb) {
        apiService.post(`/sysmgr/user/query_by_id/${id}`).then(resp => cb(resp));
    },
    update(user, cb) {
        apiService.post('/sysmgr/user/update_user', user).then(resp => cb(resp));
    },
    deleteById(id, cb) {
        apiService.post('/sysmgr/user/delete_user', { id: id }).then(resp => cb(resp));
    }
}