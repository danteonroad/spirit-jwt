import dao from '@/db';
const authCodes = dao.currentUser() ? dao.currentUser().authoritys : [];

let checkAuth = function(el, authCode) {
    if (!authCode || !authCodes.includes(authCode)) {
        // el.style.display = 'none';
        el.parentNode.removeChild(el);
    }
}

export default {
    install: function(Vue, options) {
        Vue.directive('auth', {
            inserted(el, binding, vnode) {
                // const authCodes = vnode.context.$store.getters.currentUser.authoritys;               
                checkAuth(el, binding.value)
            },
            update(el, binding) {
                checkAuth(el, binding.value)
            }
        })
    }
}