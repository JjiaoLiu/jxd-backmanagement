<template>
    <section>
        <header class="t-l">
            职位信息
            &nbsp;&nbsp;
            <el-button type="primary" v-if="examineFlag" @click="examine('form',true)">
                通过
            </el-button>
            <el-button type="primary" v-if="examineFlag" @click="examine('form',false)">
                拒绝
            </el-button>
            <el-button type="primary" @click="$router.back()">
                返回
            </el-button>
            <br>
            <br>
        </header>
        <el-form ref="form" :model="form" label-position="left" label-width="120px" :inline="true">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item prop="status" label="当前状态">
                        {{form.status}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="frozenDeposit" label="押金">
                        {{form.frozenDeposit}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="jobTypeName" label="职位类型">
                        {{form.jobTypeName}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="title" label="职位标题">
                        {{form.title}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="salary" label="薪资">
                        {{form.salary}}豆币/小时
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="recruitNum" label="招聘人数">
                        {{form.recruitNum}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="offerNum" label="已报名人数">
                        {{form.signNum}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="signNum" label="已录用人数">
                        {{form.offerNum}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="gender" label="性别">
                        {{form.gender}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="datesJson" label="日期">
                        <template v-if="form.datesJson">
                            {{JSON.parse(form.datesJson)[0]}}到{{JSON.parse(form.datesJson)[1]}}
                        </template>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="datesJson" label="时间段">
                        <template v-if="form.timesJson">
                            <div v-for="(time,index) in JSON.parse(form.timesJson)">
                                {{time.start}}到{{time.end}}
                            </div>
                        </template>
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
                    <el-form-item prop="email" label="电子邮箱">
                        {{form.email}}
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
                    <el-form-item label="地区">
                        {{form.province}}{{form.city}}{{form.area}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="address" label="地址">
                        {{form.address}}{{form.addressDetail}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item prop="mapImg" label="地图截图">
                        <div style="display: inline-flex">
                            <el-image fit="contain"
                                      style="height: 28px"
                                      v-if="form.mapImg" :src="$store.state.IMGROOTURL + form.mapImg"
                                      :preview-src-list="Array.of($store.state.IMGROOTURL + form.mapImg)">
                            </el-image>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="content" label="职位描述">
                        {{form.content}}
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item prop="content" label="审核备注">
                        <el-input v-model="form.remark" :disabled="!examineFlag"></el-input>
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
        name: "JobInfo",
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
                examineFlag: this.$route.fullPath.includes('/jobExamine/')
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/admin/job/${this.id}`).then(res => {
                    this.form = res;
                })
            },
            examine(formName, rs) {
                let url = rs ? 'audited' : 'audit-failure';
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(`/admin/job/${url}`, {id: this.id, remark: this.form.remark}).then(() => {
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
