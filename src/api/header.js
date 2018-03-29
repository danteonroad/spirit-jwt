import { apiService } from '@/plugins/axios-plugin';
import dao from '@/db';

export default {
    loadMenu(cb, errorCb) {
        const currentUser = dao.currentUser();
        apiService.post(`/get_user_menu/${currentUser.id}`)
            .then(resp => cb(resp))
            .catch(err => errorCb(err));
    }
}