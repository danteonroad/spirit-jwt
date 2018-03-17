import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login.vue';
import MainPage from '@/components/MainPage.vue';
import Sysmgr from '@/components/sysmgr'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/mainpage',
            component: MainPage,
            children: [{
                    path: '/sysmgr/user',
                    component: Sysmgr.User
                },
                {
                    path: '/sysmgr/syslog',
                    component: Sysmgr.Syslog
                }
            ]
        }


    ]
})