<template>
    <section class="el-form">
        <header class="t-l">
            热门搜索 &nbsp;&nbsp;
            <br>
            <br>
        </header>
        <div v-for="(domain, index) in data" style="display: flex;"
             :key="index">
            <el-form style="display: inline-flex" label-position="left" :inline="true" :model="domain"
                     :ref="'domain_'+index" :disabled="!domain.disabled">
                <el-form-item :key="'keyword_'+index"
                              prop="keyword"
                              label="关键字"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.trim="domain.keyword"></el-input>
                </el-form-item>
                <el-form-item :key="'hits_'+index"
                              prop="hits"
                              label="点击量"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input-number v-model.trim.number="domain.hits"></el-input-number>
                </el-form-item>
                <el-form-item :key="'enabled_'+index"
                              prop="enabled"
                              label="可用"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-switch v-model="domain.enabled"></el-switch>
                </el-form-item>
            </el-form>
            <div style="display: inline-flex;margin-bottom: 18px">
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
        name: "HotResearch",
        data() {
            return {
                data: [],
            }
        },
        methods: {
            getData() {
                this.$axios.get('/admin/keyword').then(res => {
                    this.data = res.records;
                })
            },
            postData(domain) {
                this.$axios.post('/admin/keyword/', domain).then(res => {
                    domain.id = res.id;
                    this.$set(domain, 'disabled', false);
                });
            },
            putData(domain) {
                this.$axios.put('/admin/keyword', domain).then(() => {
                    this.$set(domain, 'disabled', false);
                });
            },
            deleteData(index, id) {
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/admin/keyword/${id}`).then(() => {
                        this.data.splice(index, 1);
                    });
                }).catch(() => {
                    this.$message('已取消删除');
                });
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
            addData() {
                this.data.push({
                    enabled: true,
                    hits: "",
                    keyword: "",
                    disabled: true
                });
            },
            editData(index) {
                this.$set(this.data[index], 'disabled', true)
            },
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
