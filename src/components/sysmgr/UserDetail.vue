<template>
  <div>
    <el-form ref="userDetailForm" 
      :model="form" 
      :rules="rules" 
      :label-width="formLabelWidth" 
      :disabled="editable.disabled"
      status-icon>
      <el-form-item label="帐号" prop="account">
        <el-input v-model="form.account" ></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item v-if="id>0?false:true" label="密码" prop="password">
        <el-input v-model="form.password" type="password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="域帐号" prop="ldapUser">
        <el-checkbox v-model="form.ldapUser"></el-checkbox>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" size="small" @click="edit" v-if="editable.edit" v-auth="'sysmgr.user.update'">编 辑</el-button>
      <el-button type="danger" size="small" @click="deleteUser" v-if="editable.delete" v-auth="'sysmgr.user.delete'">删 除</el-button>
      <el-button type="primary" size="small" @click="updateUser" v-if="editable.update" v-auth="'sysmgr.user.update'">保 存</el-button>
      <el-button type="primary" @click="reset" size="small" v-if="editable.update">重 置</el-button>
      <el-button @click="close" size="small">取 消</el-button>
    </div>
  </div>
</template>

<script>
import userApi from '@/api/sysmgr/user';

export default {
  props: {
    userId: {
      required: true
    },
    visible: Boolean,
    reload: Function
  },
  data() {
    return {
      editable: {
        edit: false,
        delete: false,
        update: false,
        disabled: false,
      },
      form: {
        id: '',
        account: '',
        name: '',
        password: '',
        email: '',
        ldapUser: true,
      },
      formLabelWidth: '120px',
      rules: {
        account: [
          { required: true, message: '请输入帐号', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 11, message: '密码长度在 6 到 11 个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
    loadForm(editable) {
      this.changeState(editable);
      if(this.id) {
        userApi.queryById(this.id, resp => {
          const result = resp.data;
          if(result.resultCode === 1) {
            this.form = result.data;
          } else {
            this.$message({
              message: '系统错误',
              type: 'error',
              duration: 1000
            });
          }
        });
      } 
    },
    updateUser() {
      const promise = this.$refs.userDetailForm.validate();
      promise.then(valid => {
        if(valid) {
          userApi.update(this.form, resp => {
          const result = resp.data;
          if(result.resultCode === 1) {
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 500
            });
            this.close();
            if(this.reload) {
              this.reload();
            }
          } else {
            this.$message({
              message: '系统错误',
              type: 'error',
              duration: 1000
            });
          }});
        }
      })
    },
    deleteUser() {
      this.$confirm('您确定要删除该用户吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userApi.deleteById(this.id, resp => {
            const result = resp.data;
            if(result.resultCode === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!',
                duration: 500
              });
              this.close();
              if(this.reload) {
                this.reload();
              }
            } else {
              this.$message({
                message: '系统错误',
                type: 'error',
                duration: 1000
              });
            }
          });
        }).catch(() => {});
    },
    edit() {
      this.editable.edit = false;
      this.editable.delete = true;
      this.editable.update = true;
      this.editable.disabled = false;
    },
    reset() {
      if(this.id) {
        this.loadForm(true);
        this.editable.delete = true;
      } else {
        this.$refs.userDetailForm.resetFields();
      }
    },
    initState() {
      this.editable = {
        edit: false,
        delete: false,
        update: false,
      }
    },
    changeState(editable) {
      if(this.id) {
        this.editable.edit = !editable;
        this.editable.delete = !editable;
        this.editable.update = editable;
        this.editable.disabled = !editable;
      } else {
        this.editable.update = true;
      }
    }
  },
  mounted() {
    this.id = this.userId;
    this.loadForm(false);
  },
  watch: {
    visible(newVal, oldVal) {
      this.$refs.userDetailForm.resetFields();
      this.id = this.userId;
      if(newVal) {
        this.loadForm(false);
      } else {
        this.initState();
      }
    }
  },

  
}
</script>

<style lang="less" scoped>
  .dialog-footer {
    text-align: right;
  }
</style>
