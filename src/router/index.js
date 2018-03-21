import Vue from 'vue';
import Router from 'vue-router';
import Error from '@/components/error';
import Login from '@/components/Login.vue';
import MainPage from '@/components/MainPage.vue';
import Sysmgr from '@/components/sysmgr'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            component: Login
        }, {
            path: '/login',
            component: Login
        },
        {
            path: '/404',
            component: Error._404
        },
        {
            path: '/mainpage',
            component: MainPage,
            children: [{
                    path: '/500',
                    component: Error._500
                },
                {
                    path: '/sysmgr/user',
                    component: Sysmgr.User
                },
                {
                    path: '/sysmgr/syslog',
                    component: Sysmgr.Syslog
                }
            ]
        }
    ],
    mode: 'history'
})