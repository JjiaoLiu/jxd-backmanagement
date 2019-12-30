<template>
    <el-container style="height: 100%">
        <el-aside width="200px" style="height: 100%;background: #545c64">
            <el-row class="nav">
                <el-col :span="24">
                    <el-menu
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b"
                            :router="true">
                        <el-submenu index="8">
                            <template slot="title">
                                <span>页面配置</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/appImage">轮播管理</el-menu-item>
                                <el-menu-item index="/home/hotResearch">热门搜索</el-menu-item>
                                <el-menu-item index="/home/appVersion">版本控制</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="1">
                            <template slot="title">
                                <span>职位管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/jobTypes">职位分类</el-menu-item>
                                <el-menu-item index="/home/jobExamine">待审核职位</el-menu-item>
                                <el-menu-item index="/home/jobInfos">职位列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <span>用户管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/users">账户（账号）管理</el-menu-item>
                                <el-menu-item index="/home/breaches">违规记录</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <span>企业账户</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/coExamine">企业审核</el-menu-item>
                                <el-menu-item index="/home/coInfos">企业信息</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <span>个人账号</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/resume">个人简历</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>

                        <el-submenu index="11">
                            <template slot="title">
                                <span>异常处理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/complaints">投诉处理</el-menu-item>
                                <el-menu-item index="/home/rejectJob">异常结算</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="9">
                            <template slot="title">
                                <span>财务管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/withdraw">提现审核</el-menu-item>
                                <el-menu-item index="/home/trades">交易明细</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="10">
                            <template slot="title">
                                <span>活动管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/home/activity/activityRescuePlan">梦想拯救计划</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <!-- <el-submenu index="4">-->
                        <!-- <template slot="title">-->
                        <!-- <span>系统管理</span>-->
                        <!-- </template>-->
                        <!--  <el-menu-item-group>-->
                        <!-- <el-menu-item index="/home/codeTabel">码表</el-menu-item>-->
                        <!-- </el-menu-item-group>-->
                        <!-- </el-submenu>-->
                    </el-menu>
                </el-col>
            </el-row>
        </el-aside>
        <el-container>
            <el-header>
                <div class="user">
                    {{userName}}
                    <el-dropdown trigger="click" @command="handleCommand">
                        <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="rewrite">修改密码</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    &nbsp;<el-button size="mini" @click="handleLoginOut">退出</el-button>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <el-form label-width="80px" :model="form" ref="form" :rules="rules">
                <el-form-item label="旧密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="pass">
                    <el-input v-model="form.pass"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="newPassword">
                    <el-input v-model="form.newPassword"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="rewrite('form')">确 定</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    import {mapState, mapMutations} from 'vuex'
    import {getCookie} from "../util";

    export default {
        name: 'home',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.form.newPassword !== '') {
                        this.$refs.form.validateField('newPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                userName: '',
                dialogVisible: false,
                form: {},
                rules: {
                    password: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    pass: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    newPassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ],
                }
            }
        },
        created() {
            this.checkToken()
        },
        computed: {
            ...mapState(['auth'])
        },
        methods: {
            ...mapMutations(['loginOut']),
            handleCommand(command) {
                if (command === 'rewrite') {
                    this.dialogVisible = true;
                }
            },
            rewrite(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.put('/admin/edit-password',this.form).then(res => {
                            this.dialogVisible = false
                        })
                    } else {
                        return false;
                    }
                });
            },
            handleLoginOut() {
                this.loginOut()
            },
            checkToken() {
                this.$axios.get('/oauth/check_token?token=' + getCookie('access_token')).then(res => {
                    this.userName = res.user_name
                })
            }
        }
    }
</script>
<style lang="scss">
    .nav {
        color: white;
    }

    .user {
        text-align: right;
        border-bottom: 1px solid #ededed;
        padding: 15px 0;

        .login-out-btn {

        }
    }
</style>
