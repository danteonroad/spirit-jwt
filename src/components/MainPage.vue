<template>
    <div id="mainpage">
        <el-container>
            <el-header>
                <app-header></app-header>
            </el-header>
            <el-main ref="appMain">
                <router-view></router-view>
            </el-main>
            <el-footer style="height:30px;">版权所有©️但丁无涯峰</el-footer>
        </el-container>
    </div>
</template>

<script>
import {mapGetters} from 'Vuex';
import Header from './layout/Header.vue';
export default {
    components: {
        'app-header': Header
    },
    data(){
        return {
            menus: {}
        }
    },
    computed: {
        ...mapGetters([
            'currentUser'
        ]),
        
    },
    mounted() {
        this.$store.dispatch('getMainHeight', this.$refs.appMain.$el.clientHeight);
        const that = this;
        window.onresize = function temp() {
           that.$store.dispatch('getMainHeight', that.$refs.appMain.$el.clientHeight);
        };
    }
    
}
</script>

<style lang="less" scoped>
    body {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    .el-container {
        margin: 0;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    .el-header {
        margin: 0px;
        padding: 0;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        overflow: auto;
        height: 100%;
        padding: 10px;
    }
  
    .el-footer {
        
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 30px;
        font-size: 12px;
    }
</style>
