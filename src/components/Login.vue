<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户登录</span>
        </div>
        <div>
            <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon="true">
                <el-form-item label="用户名" prop="account">
                    <el-input ref="account" type="text" v-model="form.account" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密  码" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" auto-complete="off" @keyup.enter.native="doLogin"></el-input>
                </el-form-item>
                <div class="err" v-show="errMsg">{{errMsg}}</div>
                <el-form-item style="text-align: right;">
                    <el-button type="success" plain @click="doLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
import loginApi from '@/api/login'; 
import dao from '@/db';

export default {
    data() {
        return {
            form: {
                account: '',
                password: '',
            },
            errMsg: '',
            rules: {
                account: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 6, max: 11, message: '密码长度在 6 到 11 个字符', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        doLogin() {
            this.$refs.form.validate(valid => {
                if(!valid) return;
                loginApi.login(this.form, 
                    resp => {
                        const result = resp.data;
                        if(result.resultCode === 1) {
                            dao.saveCurrentUser(result.data);
                            this.$router.replace('/mainpage');
                        } else {
                            this.errMsg = '用户名或密码错误';
                        }
                    },
                    err => {
                        this.errMsg = '系统错误，请联系系统管理员！';
                    }
                ); 
            });
        }
    },
    mounted() {
        this.$refs.account.focus();
    }
}
</script>

<style lang="less" scoped>
    .box-card {
        margin: 0 auto;
        margin-top: 15%;
        width: 480px;

        .item {
            margin-bottom: 18px;
        }
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }
    .err{
        color: #f56c6c;
        font-size: 12px;
        line-height: 1;
        text-align: center;
    }

</style>
