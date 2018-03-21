import axios from 'axios';
import dao from '@/db';

export const apiService = axios.create({
    // baseURL: 'http://localhost:8081/api',
    baseURL: '/api',
    timeout: 5000,
});

apiService.interceptors.request.use(config => {
    if (!config.url.startsWith('/auth')) {
        const currentUser = dao.currentUser();
        config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }
    return config
}, error => {
    return Promise.reject(error)
});

apiService.interceptors.response.use(
    resp => {
        return resp;
    },
    err => {
        if (err.response.status === 401) {
            // 401 说明 token 验证失败
            dao.clearCurrentUser();
            location.href = '/login';
        } else if (err.response.status === 404) {
            console.log('------------------')
        } else if (err.response.status === 500) {
            // 服务器错误
            // location.href = '/500';
            return Promise.reject(err.response.data);
        }
        return Promise.reject(err);
    }
);

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', { value: apiService })
    }
}