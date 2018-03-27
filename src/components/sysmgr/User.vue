<template>
  <div id="userMgr">
    <el-form ref="userForm" :model="query" :inline="true" class="searchForm" size="mini">
      <el-col :span="20">
        <el-form-item label="帐号" prop="account">
          <el-input placeholder="帐号" v-model="query.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="2" :offset="2">
        <el-form-item>
          <el-button type="primary" icon="el-icon-plus" @click="userdetail(110)">新增</el-button>
        </el-form-item>
      </el-col>
    </el-form>
    <spirit-table
      ref="userTable"
      :table="table" 
      :url="url" 
      :pages="pages"
      :remoteSort="remoteSort"
      :handleCurrentChange="handleCurrentChange"
      :handleSizeChange="handleSizeChange"
      :handleRowEdit="handleRowEdit">
    </spirit-table>
    <el-dialog title="用户详情" :visible.sync="showDetail">
      <UserDetail :id="userId"></UserDetail>
    </el-dialog>
  </div>
</template>

<script>
import Component from 'vue-class-component';
import Config from './user-config';
import BaseTable from '@/util/table-util';
import UserDetail from './UserDetail.vue';

@Component({
  components: {
    UserDetail
  }
})
export default class UserList extends BaseTable {
  url = '/sysmgr/user/query_page';
  table = Config;
  searchFormHeight = 0;
  showDetail = false;
  userId = 0;

  query = {
    account: ''
  };

  search() {
    this.loadData();
  }

  reset() {
    this.$refs.userForm.resetFields();
  }

  userdetail(id) {
    this.userId = id;
    this.showDetail = true;
  }

  created () {
      this.pages.q = this.query;
      this.loadData();
  }

  mounted () {
    this.table.searchHeight = this.$refs.userForm.$el.clientHeight;
    const that = this;
    window.onresize = function temp() {
        that.table.searchHeight = that.$refs.userForm.$el.clientHeight;
    };
  }

  handleRowEdit() {
    console.log('==============================')
  }
}
</script>

<style lang="less" scoped>
    
</style>


