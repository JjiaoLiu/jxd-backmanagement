<template>
    <section class="el-form">
        <header class="t-l">
            码表 &nbsp;&nbsp;
            <br>
            <br>
        </header>
        <el-tabs v-model="codeType">
            <el-tab-pane label="行业分类" name="hyfl"></el-tab-pane>
            <el-tab-pane label="企业类型" name="qylx"></el-tab-pane>
            <el-tab-pane label="人员规模" name="rygm"></el-tab-pane>
            <el-tab-pane label="学历" name="academic"></el-tab-pane>
        </el-tabs>
        <div v-for="(domain, index) in data" style="display: flex;"
             :key="index">
            <el-form label-position="left" :inline="true" :model="domain" style="display: inline-flex"
                     :ref="'domain_'+index" :disabled="!domain.disabled">
                <el-form-item :key="'code_'+index"
                              prop="code"
                              label="code"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.trim="domain.code"></el-input>
                </el-form-item>
                <el-form-item :key="'codeName_'+index"
                              prop="codeName"
                              label="codeName"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.trim="domain.codeName"></el-input>
                </el-form-item>
                <el-form-item :key="'enable_'+index"
                              prop="enable"
                              label="enable"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-switch v-model="domain.enable"></el-switch>
                </el-form-item>
                <el-form-item :key="'orderNum_'+index"
                              prop="orderNum"
                              label="orderNum"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.number="domain.orderNum"></el-input>
                </el-form-item>

            </el-form>
            <div style="margin-bottom: 18px;display: inline-flex">
                <el-button type="danger" @click="deleteData(index,domain.id)">删除</el-button>
                <el-button type="danger" @click="editData(index)" v-if="!domain.disabled">
                    编辑
                </el-button>
                <el-button type="danger" @click="submitData('domain_' + index,domain)" v-if="domain.disabled">
                    保存
                </el-button>
            </div>
        </div>
        <br>
        <br>
        <el-button @click="addData">新 增</el-button>
        <br>
        <br>
    </section>
</template>

<script>

    export default {
        name: "codeTabel",
        data() {
            return {
                data: [],
                codeType: 'hyfl'
            }
        },
        methods: {
            addData() {
                this.data.push({
                    code: '',
                    codeName: '',
                    enable: true,
                    orderNum: 10,
                    disabled: true
                });
            },
            editData(index) {
                this.$set(this.data[index], 'disabled', true)
            },
            getData() {
                this.$axios.get('/admin/code/' + this.codeType).then(res => {
                    this.data = res
                })
            },
            submitData(formName, domain) {
                this.$refs[formName][0].validate((valid) => {
                    if (valid) {
                        if (domain.id) {
                            this.putData(domain)
                        } else {
                            this.postData(domain)
                        }

                    } else {
                        return false;
                    }
                });
            },
            postData(domain) {
                this.$axios.post('/admin/code/' + this.codeType, domain).then(res => {
                    domain.id = res.id;
                    this.$set(domain, 'disabled', false);
                });
            },
            putData(domain) {
                this.$axios.put('/admin/code/', domain).then(() => {
                    this.$set(domain, 'disabled', false);
                });
            },
            deleteData(index, id) {
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/admin/code/${id}`).then(() => {
                        this.data.splice(index, 1);
                    });
                }).catch(() => {
                    this.$message('已取消删除');
                });
            }
        },
        watch: {
            codeType: {
                handler() {
                    this.getData()
                },
                immediate: true
            }
        }
    }
</script>
