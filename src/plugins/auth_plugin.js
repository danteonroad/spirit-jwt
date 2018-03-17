export default {
    install: function(Vue, options) {
        Vue.directive('auth', {
            inserted(el, binding, vnode) {
                const authCodes = vnode.context.$store.getters.currentUser.authoritys;
                const authCode = binding.value;
                if (!authCode || !authCodes.includes(authCode)) {
                    el.style.display = 'none';
                }
            }

        })
    }
}