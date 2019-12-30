<template>
    <section>
        <header class="t-l">
            个人简历
            &nbsp;&nbsp;
            <br>
            <br>
        </header>
        <el-form ref="form" :model="form" label-position="left" label-width="120px" :inline="true">
            <el-row :gutter="30">
                <el-col :span="8">
                    <el-form-item label="姓名" prop="name">
                        {{form.name}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="头像" prop="avatar">
                        <el-avatar :size="28" :src="src" fit="contain"></el-avatar>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="手机号" prop="tel">
                        {{form.tel}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="学历" prop="academic">
                        {{form.academic}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="年龄" prop="age">
                        {{form.age}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="性别" prop="gender">
                        {{form.gender}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="身高" prop="height">
                        {{form.height}}cm
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="体重" prop="weight">
                        {{form.weight}}kg
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="所在地" prop="area">
                        {{form.area}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="出生年月日" prop="birthday">
                        {{form.birthday}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="星座" prop="star">
                        {{form.star}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="个人介绍" prop="content">
                        {{form.content}}
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="完善度" prop="perfectionDegree">
                        {{form.perfectionDegree}}%
                    </el-form-item>
                </el-col>
                <el-col :span="24">
                    <el-form-item label="形象展示" prop="images">
                        <template v-if="form.images">
                            <el-image v-for="(perfection,index) in images"
                                      :key="index"
                                      style="width: 100px; height: 100px;margin-right: 15px"
                                      :src="perfection"
                                      :preview-src-list="images">
                            </el-image>
                        </template>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </section>
</template>

<script>
    import Code from "../components/Code";
    import Province from "../components/Province";

    export default {
        name: "ResumeInfo", components: {Code, Province},
        data() {
            return {
                id: this.$route.query.id,
                form: {},
            }
        },
        created() {
            if (this.id) {
                this.getData()
            }
        },
        computed: {
            images() {
                if (this.form.images) {
                    return this.form.images.split(',').map(f => {
                        return this.$store.state.IMGROOTURL + f
                    });
                }
                return []
            },
            src() {
                if (this.form.avatar) {
                    return this.$store.state.IMGROOTURL + this.form.avatar;
                }
                return ''
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/admin/resume/${this.id}`).then(res => {
                    this.form = res;
                })
            },
        }
    }
</script>
