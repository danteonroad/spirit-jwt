const ls = window.localStorage;

export default {
    getItem(key) {
        try {
            return JSON.parse(ls.getItem(key))
        } catch (err) {
            return null
        }
    },
    setItem(key, val) {
        ls.setItem(key, JSON.stringify(val))
    },
    clear() {
        ls.clear()
    },
    removeItem(key) {
        ls.removeItem(key)
    },
    currentUser() {
        return this.getItem('currentUser');
    },
    saveCurrentUser(val) {
        ls.setItem('currentUser', JSON.stringify(val))
    }
}