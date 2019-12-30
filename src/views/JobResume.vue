<template>
    <section>
        <header class="t-l">
            招聘进度
            &nbsp;&nbsp;
            <el-button type="primary" @click="$router.back()">
                返回
            </el-button>
            <br>
            <br>
        </header>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="应聘人" prop="name"></el-table-column>
            <el-table-column label="招聘进度/时间">
                <template slot-scope="scope">
                    报名时间：{{scope.row.signTime}}
                    <br>
                    <span v-if="scope.row.offerTime">录用时间：{{scope.row.offerTime}}</span>
                    <br>
                    <span v-if="scope.row.arrivalTime">到岗时间：{{scope.row.arrivalTime}}</span>
                    <br>
                    <span v-if="scope.row.settleTime">结算时间：{{scope.row.settleTime}}</span>
                </template>
            </el-table-column>
            <el-table-column label="当前状态" prop="offer"></el-table-column>
            <el-table-column label="简历">
                <template slot-scope="scope">
                    <el-button @click="toResume(scope.row.resumeId)">查看</el-button>
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
        name: "JobResume",
        data() {
            return {
                data: [],
                filter: {
                    jobId: this.$route.query.id,
                    pageNo: 1,
                    pageSize: 10,
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios.get('/admin/job/resume', {params: this.filter}).then((res) => {
                    this.data = res;
                });
            },
            toResume(id) {
                this.$router.push('/home/resume/resumeInfo?id=' + id);
            }
        }
    }
</script>
