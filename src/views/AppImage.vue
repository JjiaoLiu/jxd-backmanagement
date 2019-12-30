<template>
    <section>
        <header class="t-l">
            轮播 &nbsp;&nbsp;
            <br>
            <br>
        </header>
        <el-tabs v-model="codeType">
            <el-tab-pane label="首页轮播" name="home-swiper"></el-tab-pane>
            <!--<el-tab-pane label="" name=""></el-tab-pane>-->
            <!--<el-tab-pane label="" name=""></el-tab-pane>-->
            <!--<el-tab-pane label="" name=""></el-tab-pane>-->
        </el-tabs>
        <div v-for="(domain, index) in data" style="display: flex;"
             :key="index">
            <el-form style="display: inline-flex" label-position="left" :inline="true" :model="domain"
                     :ref="'domain_'+index" :disabled="!domain.disabled">
                <el-form-item :key="'title_'+index"
                              prop="title"
                              label="标题"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.trim="domain.title"></el-input>
                </el-form-item>
                <el-form-item :key="'targetUrl_'+index"
                              prop="targetUrl"
                              label="链接"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.trim="domain.targetUrl"></el-input>
                </el-form-item>
                <el-form-item :key="'imageUrl_'+index"
                              prop="imageUrl"
                              label="图片"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <div style="display: flex">
                        <el-image
                                style="width: 80px;"
                                fit="contain"
                                v-if="domain.imageUrl"
                                :src="$store.state.IMGROOTURL + domain.imageUrl"
                                :preview-src-list="Array.of($store.state.IMGROOTURL + domain.imageUrl)">
                        </el-image>
                        &nbsp;
                        <el-upload
                                action="/admin/upload/image"
                                :show-file-list="false"
                                :headers="headers"
                                name="imageFile"
                                :on-success="(res,file)=>{
                                 $set(domain,'imageUrl',res.data);
                                }">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item :key="'enable_'+index"
                              prop="enable"
                              label="可用"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-switch v-model="domain.enable"></el-switch>
                </el-form-item>
                <el-form-item :key="'orderNum_'+index"
                              prop="orderNum"
                              label="排序"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.number="domain.orderNum"></el-input>
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
    import {getCookie} from "../util";
    export default {
        name: "AppImage",
        data() {
            return {
                data: [],
                codeType: 'home-swiper',
                headers: {
                    Authorization: getCookie('Authorization')
                }
            }
        },
        methods: {
            getData() {
                this.$axios.get('/admin/app-image/' + this.codeType).then(res => {
                    this.data = res
                });
            },
            postData(domain) {
                this.$axios.post('/admin/app-image/' + this.codeType, domain).then(res => {
                    domain.id = res.id;
                    this.$set(domain, 'disabled', false);
                });
            },
            putData(domain) {
                this.$axios.put('/admin/app-image', domain).then(() => {
                    this.$set(domain, 'disabled', false);
                });
            },
            deleteData(index, id) {
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/admin/app-image/${id}`).then(() => {
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
                    enable: true,
                    imageUrl: "",
                    orderNum: 0,
                    targetUrl: "",
                    title: "",
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
