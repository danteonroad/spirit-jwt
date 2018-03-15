<template>
    <div id="header">
        <el-menu 
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b" 
            :router="true"
            v-for="menu in menus">
            <el-menu-item v-if="menu.children.length === 0" :index="menu.url">{{menu.name}}</el-menu-item>
            <el-submenu v-else :index="menu.id+''">
                <template slot="title">{{menu.name}}</template>
                <el-menu-item v-for="child in menu.children" v-if="child.children.length === 0" :index="child.url">{{child.name}}</el-menu-item>
                <el-submenu v-else v-for="sub in child" :index="child.id+''">
                    <template slot="title">{{child.name}}</template>
                    <el-menu-item :index="sub.url">{{sub.url}}</el-menu-item>
                </el-submenu>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        menus: []
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    created() {
        var currentUser = this.$store.getters.currentUser;
        this.$http({
            method: 'post',
            url: `http://localhost:8081/get_user_menu/${currentUser.id}`,
            headers: {
                Authorization: `Bearer ${currentUser.accessToken}`
            }
        })
        .then(resp => {
            console.log(resp.data.data);
            this.menus = resp.data.data;
        });
    }
}
</script>

<style lang="less" scoped>
#header {
    
    width: 100%;
    margin: 0;
    .el-memu {
        width: 100%;
        margin: 0;
    }
}
</style>
