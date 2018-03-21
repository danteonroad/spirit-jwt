import Vue from 'vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import store from '@/store';
import SpiritAuthPlugin from '@/plugins/auth-plugin';
import AxiosPlugin from '@/plugins/axios-plugin';
import WidgetPlugin from '@/plugins/widget-plugin';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(SpiritAuthPlugin);
Vue.use(AxiosPlugin);
Vue.use(WidgetPlugin);

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})