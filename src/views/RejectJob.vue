<template>
    <section>
        <header class="t-l">
            异常结算
            <br>
            <br>
        </header>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="用户" prop="name">
                <template slot-scope="scope">
                    <a href="javascript:void(0)" @click="toUsers(scope.row.userId)">{{scope.row.name}}</a>
                </template>
            </el-table-column>
            <el-table-column label="用户电话" prop="tel"></el-table-column>
            <el-table-column label="职位标题" prop="title">
                <template slot-scope="scope">
                    <a href="javascript:void(0)" @click="toJob(scope.row.jobId)">{{scope.row.title}}</a>
                </template>
            </el-table-column>
            <el-table-column label="开始时间" prop="startTime"></el-table-column>
            <el-table-column label="结束时间" prop="endTime"></el-table-column>
            <el-table-column label="实际结算/应结算（豆币）" prop="settleAmount">
                <template slot-scope="scope">
                    {{scope.row.settleAmount}}/{{scope.row.amount}}
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>

    export default {
        name: "RejectJob",
        components: {},
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
                this.$axios.get('/admin/job/reject-work', {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            toUsers(id) {
                this.$router.push(`/home/users/user?id=${id}`);
            },
            toJob(id) {
                this.$router.push(`/home/jobInfos/jobInfo?id=${id}`);
            },
        }
    }
</script>