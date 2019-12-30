<template>
    <el-row class="container" justify="center" align="middle" type="flex">
        <el-col class="login">
            <h1 class="t-c">后台管理系统</h1>
            <br>
            <br>
            <br>
            <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="用户" prop="username">
                    <el-input v-model.trim="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button class="w-100" type="primary" @click="submitForm('form')">提 交</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script>
    import qs from 'qs'
    import {setCookie} from "../util";

    export default {
        name: "Login",
        data() {
            return {
                form: {
                    username: 'admin',
                    password: '123456',
                    auth_type: 'password',
                    grant_type: 'password',
                    client_id: process.env.VUE_APP_client_id,
                    client_secret: process.env.VUE_APP_client_secret,
                },
                rules: {
                    pass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ],
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        await this.$axios.post("/oauth/token?" + qs.stringify(this.form)).then(res => {
                            let token_type = res.token_type.replace(res.token_type[0], res.token_type[0].toUpperCase());
                            setCookie('access_token', res.access_token);
                            setCookie('Authorization', token_type + ' ' + res.access_token);
                            this.$store.commit('loginIn');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    .container {
        height: 100%;
    }

    .login {
        max-width: 450px;
    }
</style>