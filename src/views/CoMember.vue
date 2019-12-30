<template>
    <section>
        <header class="t-l">
            员工信息
            &nbsp;&nbsp;
            <el-button type="primary" @click="$router.back()">保存</el-button>
            <br>
            <br>
        </header>
        <el-form ref="form" :model="form" label-position="left" label-width="120px" :inline="true">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item prop="employerName" label="所属企业">
                        {{form.employerName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="idcard" label="身份证号">
                        {{form.idcard}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="idcardBack" label="身份证反面">
                        <el-image fit="contain"
                                  style="height: 28px"
                                  v-if="formBase.idcardBack" :src="$store.state.IMGROOTURL + formBase.idcardBack"
                                  :preview-src-list="Array.of($store.state.IMGROOTURL + formBase.idcardBack)">
                        </el-image>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="idcardFront" label="身份证正面">
                        <el-image fit="contain"
                                  style="height: 28px"
                                  v-if="form.idcardFront" :src="$store.state.IMGROOTURL + form.idcardFront"
                                  :preview-src-list="Array.of($store.state.IMGROOTURL + form.idcardFront)">
                        </el-image>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>
    import Search from '../components/Search'

    export default {
        name: "CoInfo",
        components: {Search},
        created() {
            if (this.id) this.getData();
        },
        data() {
            return {
                id: this.$route.query.id,
                form: {},
            }
        },
        methods: {
            getData() {
                this.$axios.get('/admin/employer').then(res => {
                    this.form = res;
                })
            }
        },
    }
</script>
