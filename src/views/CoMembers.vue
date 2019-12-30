<template>
    <section>
        <header class="t-l">
            企业员工
            <br>
            <br>
        </header>
        <el-table :data="data" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="姓名" prop="employeeName"></el-table-column>
            <el-table-column label="所属企业" prop="employerName"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </section>
</template>

<script>

    export default {
        name: "CoMembers",
        data() {
            return {
                data: []
            }
        },
        methods: {
            edit(id) {
                this.$router.push(`/home/coMembers/coMember?id=${id}`)
            },
            getData() {
                this.$axios.get('/admin/coMembers', {params: this.filter}).then((res) => {
                    this.data = res;
                });
            }
        }
    }
</script>