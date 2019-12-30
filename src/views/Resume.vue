<template>
    <section>
        <header class="t-l">
            个人简历
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" style="display: flex;">
            <el-form-item label="姓名" prop="name">
                <el-input v-model.trim="filter.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
                <el-input v-model.trim="filter.tel"></el-input>
            </el-form-item>
            <el-form-item label="地区" prop="area">
                <el-input v-model.trim="filter.area"></el-input>
            </el-form-item>
            <el-form-item label="学历" prop="area">
                <el-input v-model.trim="filter.area"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-input v-model.trim="filter.gender"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <span>个人介绍：</span>
                    <span>{{ props.row.content }}</span>
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="性别" prop="gender"></el-table-column>
            <el-table-column label="学历" prop="academic"></el-table-column>
            <el-table-column label="联系电话" prop="tel"></el-table-column>
            <el-table-column label="年龄" prop="age"></el-table-column>
            <el-table-column label="出生日期" prop="birthday"></el-table-column>
            <el-table-column label="星座" prop="star"></el-table-column>
            <el-table-column label="身高" prop="height"></el-table-column>
            <el-table-column label="体重" prop="weight"></el-table-column>
            <el-table-column label="地区" prop="area"></el-table-column>
            <el-table-column label="形象展示" prop="images">
                <template slot-scope="scope">
                    <el-image
                            v-if="scope.row.images"
                            style="width: 30px"
                            :src="$store.state.IMGROOTURL + scope.row.images.split(',')[0]"
                            :preview-src-list="getPreviewSrcList(scope.row.images)">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="完善度" prop="perfectionDegree"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="filter.pageSize"
                :current-page.sync="filter.pageNo"
                layout="prev, pager, next"
                :total="data.total"
                @current-change="getData"
        >
        </el-pagination>
    </section>
</template>

<script>

    export default {
        name: "resume",
        created() {
            this.getData()
        },
        data() {
            return {
                data: [],
                filter: {pageNo: 1, pageSize: 10}
            }
        },
        methods: {
            getData() {
                this.$axios.get('/admin/resume', {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            edit(id) {
                this.$router.push('/home/resume/resumeInfo?id=' + id);
            },
            deleteData(index, id) {
                this.$axios.delete(`/admin/resume/${id}`).then(() => {
                    this.data.records.splice(index, 1);
                    this.data.total = this.data.total - 1
                });
            },
            getPreviewSrcList(images) {
                return images.split(",").map((f) => {
                    return this.$store.state.IMGROOTURL + f;
                })
            }
        }
    }
</script>