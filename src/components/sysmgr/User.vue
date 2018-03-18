<template>
    <div id="userMgr">
        <h2 v-auth="auth.update">用户信息管理</h2>
        <br/>
        <h2 @click="changeAuth">用户信息管理2</h2>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            auth: {
                update: 'sysmgr.user.update'
            }
        }
    },
    methods: {
        changeAuth() {
            this.auth.update = '111'
        }
    }
}
</script>

<style lang="less" scoped>
    #userMgr {
        height: 700px;
    }
</style>


