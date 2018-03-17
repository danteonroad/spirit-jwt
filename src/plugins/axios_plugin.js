import axios from 'axios';
import DAO from '@/db';

export const Axios = axios.create({
    // baseURL: 'http://localhost:8081/api',
    baseURL: '/api',
    timeout: 5000,
});

Axios.interceptors.request.use(config => {
    console.log(config.method)
    if (!config.url.startsWith('/auth')) {
        const currentUser = DAO.getItem('currentUser');
        // config.headers.Authorization = `Bearer ${currentUser.accessToken}`;
    }
    return config
}, error => {
    return Promise.reject(error)
});

Axios.interceptors.response.use(
    resp => {
        return resp;
    },
    err => {
        if (err.response.status === 401) {
            // 401 说明 token 验证失败
            // 可以直接跳转到登录页面，重新登录获取 token
            // location.href = '/';
        } else if (err.response.status === 500) {
            // 服务器错误
            // do something
            return Promise.reject(err.response.data)
        }
        return Promise.reject(err);
    }
);

export default {
    install(Vue) {
        Object.defineProperty(Vue.prototype, '$http', { value: Axios })
    }
}