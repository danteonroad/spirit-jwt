<template>
  <div id="header">
    <el-menu 
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b" 
      :router="true"
      v-for="menu in menus"
      :key="menu.id">
      <el-menu-item 
        v-if="menu.children.length === 0" 
        :index="menu.url">{{menu.name}}</el-menu-item>
      <el-submenu v-else :index="menu.id+''">
        <template slot="title">{{menu.name}}</template>
        <el-menu-item 
          v-for="child in menu.children" 
          v-if="child.children.length === 0" 
          :index="child.url" 
          :key="child.id">{{child.name}}</el-menu-item>
        <el-submenu 
          v-else 
          v-for="sub in child" 
          :index="child.id+''" 
          :key="sub.id">
          <template slot="title">{{child.name}}</template>
          <el-menu-item :index="sub.url">{{sub.url}}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import headerApi from '@/api/header';

export default {
  data() {
    return {
      menus: []
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    headerApi.loadMenu(
        resp => {
            this.menus = resp.data.data;
        },
        err => {}
    )
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
