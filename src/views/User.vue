<template>
    <section>
        <header class="t-l">
            用户信息
            &nbsp;&nbsp;
            <el-button type="primary" @click="enable">{{form.enable ? '冻结':'解冻'}}</el-button>
            <el-button type="primary" @click="$router.back()">
                返回
            </el-button>
            <br>
            <br>
        </header>
        <el-form ref="form" label-position="left" label-width="120px" :inline="true">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="用户名">
                        {{form.username}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="电话">
                        {{form.phone}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="昵称">
                        {{form.nick}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别">
                        {{form.gender}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="生日">
                        {{form.birthday}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="可用">
                        {{form.enable}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="头像">
                        <el-avatar :src="$store.state.IMGROOTURL+form.avatar"></el-avatar>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="邮箱">
                        {{form.email}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最近一次登录时间">
                        {{form.lastLoginTime}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="最近一次登录IP">
                        {{form.lastLoginIp}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="积分">
                        {{form.integration}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="等级">
                        {{form.rankPoints}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="豆币">
                        {{form.balance}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="可用豆币">
                        {{form.availBalance}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="冻结豆币">
                        {{form.frozenBalance}}
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>
    import Code from '../components/Code'
    import Province from '../components/Province'

    export default {
        name: "User",
        components: {Code, Province},
        created() {
            if (this.id) {
                this.getData()
            }
        },
        data() {
            return {
                id: this.$route.query.id,
                form: {}
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/admin/user/${this.id}`).then(res => {
                    this.form = res;
                })
            },
            enable() {
                this.$axios.post('/admin/user/enable', {id: this.id, enable: !this.form.enable}).then(() => {
                    this.$router.back()
                });
            },
        },
    }
</script>
