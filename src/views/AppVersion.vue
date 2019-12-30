<template>
    <section>
        <header class="t-l">
            版本控制
            <br>
            <br>
        </header>
        <div v-for="(domain, index) in data" style="display: flex;"
             :key="index">
            <el-form style="display: inline-flex" label-position="left" :inline="true" :model="domain"
                     :ref="'domain_'+index" :disabled="!domain.disabled">
                <el-form-item :key="'versionCode_'+index"
                              prop="versionCode"
                              label="版本号"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.trim.number="domain.versionCode"></el-input>
                </el-form-item>
                <el-form-item :key="'versionName_'+index"
                              prop="versionName"
                              label="版本名"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input v-model.trim="domain.versionName"></el-input>
                </el-form-item>
                <el-form-item :key="'downloadUrl_'+index"
                              prop="downloadUrl"
                              label="资源包"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <div style="display: flex">
                        <el-upload
                                action="/admin/app-version/upload-apk"
                                :headers="headers"
                                :show-file-list="false"
                                name="apkFile"
                                :on-error="onerror"
                                :on-success="(res,file)=>{
                                 $set(domain,'downloadUrl',res.data.downloadUrl);
                                 $set(domain,'apkMd5',res.data.apkMd5);
                                 $set(domain,'apkSize',res.data.apkSize);
                                }">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <a title="下载" :href="$store.state.IMGROOTURL+domain.downloadUrl"
                           :download="domain.versionName+'.apk'">
                            <i class="el-icon-mobile"></i>
                        </a>
                        <span>{{domain.apkSize}}M</span>
                    </div>
                </el-form-item>
                <el-form-item :key="'modifyContent_'+index"
                              prop="modifyContent"
                              label="更新记录"
                              :rules="{required: true, message: '不能为空', trigger: 'blur'}"
                >
                    <el-input type="textarea" v-model="domain.modifyContent"></el-input>
                </el-form-item>
                <el-form-item :key="'flag_'+index"
                              prop="flag"
                              label="更新"
                >
                    <el-radio-group v-model="domain.flag">
                        <el-radio :label="0" :value="0">可以不更新</el-radio>
                        <br>
                        <el-radio :label="1"  :value="1">有版本更新，不需要强制升级</el-radio><br>
                        <el-radio :label="2"  :value="2">版本更新，需要强制升级</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div style="display: inline-flex;margin-bottom: 18px" v-if="!domain.current">
                <el-button type="danger" @click="deleteData(index,domain.id)">删除</el-button>
                <el-button type="danger" @click="editData(index)" v-if="!domain.disabled">
                    编辑
                </el-button>
                <el-button type="danger" @click="submitData('domain_' + index,domain)" v-if="domain.disabled">
                    保存
                </el-button>
                <el-button type="danger" @click="setData(domain)" v-if="!domain.disabled">
                    设置为当前版本
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
    import {getCookie} from './../util'

    export default {
        name: "AppImage",
        data() {
            return {
                data: [],
                codeType: 'app-version',
                headers: {
                    Authorization: getCookie('Authorization')
                }
            }
        },
        methods: {
            onerror(err, file, fileList) {
                console.log(err)
            },
            getData() {
                this.$axios.get(`/admin/${this.codeType}`).then(res => {
                    this.data = res
                })
            },
            postData(domain) {
                this.$axios.post(`/admin/${this.codeType}`, domain).then(res => {
                    domain.id = res;
                    this.$set(domain, 'disabled', false);
                });
            },
            putData(domain) {
                this.$axios.put(`/admin/${this.codeType}`, domain).then(() => {
                    this.$set(domain, 'disabled', false);
                });
            },
            setData(domain) {
                this.$axios.post(`/admin/${this.codeType}/set-current/${domain.id}`).then(() => {
                    this.$set(domain, 'current', true);
                    this.data.forEach((f) => {
                        if (f.id === domain.id) {
                            return false;
                        }
                        this.$set(f, 'current', false);
                    })
                });
            },
            deleteData(index, id) {
                this.$confirm('确认删除？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.delete(`/admin/${this.codeType}/${id}`).then(() => {
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
                    current: false,
                    downloadUrl: "",
                    flag: 1,
                    modifyContent: "",
                    versionCode: '',
                    versionName: "",
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
