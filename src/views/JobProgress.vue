<template>
    <section>
        <header class="t-l">
            工作进度
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
            <el-table-column label="雇员" prop="name"></el-table-column>
            <el-table-column label="职位标题" prop="title"></el-table-column>
            <el-table-column label="工作时间">
                <template slot-scope="scope">
                    {{scope.row.startTime}} <br>
                    {{scope.row.endTime}}
                </template>
            </el-table-column>
            <el-table-column label="当前状态/时间" prop="arrival">
                <template slot-scope="scope">
                    {{scope.row.arrival}}/{{scope.row.arrivalTime}}
                </template>
            </el-table-column>
            <el-table-column label="实际结算/应结算（元）" prop="settleAmount">
                <template slot-scope="scope">
                    {{scope.row.settleAmount}}/{{scope.row.amount}}
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
        name: "JobProgress",
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
                this.$axios.get('/admin/job/work', {params: this.filter}).then((res) => {
                    this.data = res;
                });
            },
        }
    }
</script>
