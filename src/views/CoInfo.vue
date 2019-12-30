<template>
    <section>
        <header class="t-l">
            企业信息
            &nbsp;&nbsp;
            <div v-if="id" style="display: inline-block">
                <el-button type="primary" v-if="examineFlag"
                           @click="examine('form',true)">
                    通过
                </el-button>
                <el-button type="primary" v-if="examineFlag"
                           @click="examine('form',false)">
                    拒绝
                </el-button>
                <el-button type="primary" @click="$router.back()">
                    返回
                </el-button>
            </div>
            <br>
            <br>
        </header>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="employers">
                <el-form ref="form" :model="form" label-position="left" label-width="120px"
                         :inline="true">
                    <el-row :gutter="30">
                        <el-col :span="8">
                            <el-form-item prop="status" label="当前状态">
                                {{form.status}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="employerName" label="企业名称">
                                {{form.employerName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="qylx" label="企业类型">
                                {{form.qylxName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="hyfl" label="行业分类">
                                {{form.hyflName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="rygm" label="人员规模">
                                {{form.rygmName}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="area" label="商家地区">
                                {{form.province}}{{form.city}}{{form.area}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="address" label="商家地址">
                                {{form.address}}{{form.addressDetail}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="latitude" label="纬度">
                                {{form.latitude}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="longitude" label="经度">
                                {{form.longitude}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="contact" label="联系人">
                                {{form.contact}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="tel" label="联系人电话">
                                {{form.tel}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="duty" label="负责人">
                                {{form.duty}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="idcard" label="联系人身份证号">
                                {{form.idcard}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="businessLicense" label="营业执照">
                                <el-image fit="contain"
                                          style="height: 28px"
                                          v-if="form.businessLicense"
                                          :src="$store.state.IMGROOTURL + form.businessLicense"
                                          :preview-src-list="Array.of($store.state.IMGROOTURL + form.businessLicense)">
                                </el-image>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="idcardBack" label="企业LOGO">
                                <el-image fit="contain"
                                          style="height: 28px"
                                          v-if="form.logo" :src="$store.state.IMGROOTURL + form.logo"
                                          :preview-src-list="Array.of($store.state.IMGROOTURL + form.logo)">
                                </el-image>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="idcardBack" label="身份证反面">
                                <el-image fit="contain"
                                          style="height: 28px"
                                          v-if="form.idcardBack" :src="$store.state.IMGROOTURL + form.idcardBack"
                                          :preview-src-list="Array.of($store.state.IMGROOTURL + form.idcardBack)">
                                </el-image>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="idcardFront" label="身份证正面">
                                <el-image fit="contain"
                                          style="height: 28px"
                                          v-if="form.mapImg" :src="$store.state.IMGROOTURL + form.idcardFront"
                                          :preview-src-list="Array.of($store.state.IMGROOTURL + form.idcardFront)">
                                </el-image>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item prop="mapImg" label="地图截图">
                                <el-image fit="contain"
                                          style="height: 28px"
                                          v-if="form.mapImg" :src="$store.state.IMGROOTURL + form.mapImg"
                                          :preview-src-list="Array.of($store.state.IMGROOTURL + form.mapImg)">
                                </el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="30">
                        <el-col :span="24">
                            <el-form-item prop="introduction" label="企业介绍">
                                {{form.introduction}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="24">
                            <el-form-item prop="remark" label="备注">
                                <el-input v-model="form.remark" :disabled="!examineFlag"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import Code from '../components/Code'
    import Province from '../components/Province'

    export default {
        name: "CoInfo",
        components: {Code, Province},
        created() {
            if (this.id) {
                this.getData()
            }
        },
        data() {
            return {
                id: this.$route.query.id,
                form: {},
                activeName: 'employers',
                examineFlag: this.$route.fullPath.includes('/coExamine/')
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/admin/${this.activeName}/${this.id}`).then(res => {
                    this.form = res;
                })
            },
            handleClick(tab, event) {
                this.getData()
            },
            examine(formName, rs) {
                if (!rs && !this.form.remark) {
                    return this.$message({
                        message: '请输入备注',
                        type: 'warning'
                    });
                }
                let url = rs ? 'audited' : 'audit-failure';
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(`/admin/employer/${url}`, {id: this.id, remark: this.form.remark}).then(() => {
                            this.$router.back();
                        })
                    } else {
                        return false;
                    }
                });
            },
        },
    }
</script>
