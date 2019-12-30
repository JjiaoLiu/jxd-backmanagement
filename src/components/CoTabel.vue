<template>
    <section>
        <header class="t-l">
            {{title}}
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" ref="filter">
            <el-form-item label="企业名称：" prop="employerName">
                <Search search-url="/admin/search/employer" :value.sync="filter.employerName"></Search>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact">
                <el-input v-model.trim="filter.contact"></el-input>
            </el-form-item>
            <el-form-item label="企业类型：" prop="qylx">
                <Code code-url="/admin/code/qylx" :value.sync="filter.qylx"></Code>
            </el-form-item>
            <el-form-item label="行业分类：" prop="hyfl">
                <Code code-url="/admin/code/hyfl" :value.sync="filter.hyfl"></Code>
            </el-form-item>
            <el-form-item label="当前状态：" prop="status">
                <select-status :options="EmployerStatus" :value.sync="filter.status"></select-status>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">查询</el-button>
                <el-button @click="$refs['filter'].resetFields()">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true" :key="type">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="企业名称" prop="employerName"></el-table-column>
            <el-table-column label="企业类型" prop="qylxName"></el-table-column>
            <el-table-column label="行业分类" prop="hyflName"></el-table-column>
            <el-table-column label="联系人" prop="contact"></el-table-column>
            <el-table-column label="当前状态" prop="status"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row.id)" v-if="type === 'examine'">审核</el-button>
                    <el-button @click="edit(scope.row.id)" v-if="type === 'info'">查看</el-button>
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
    import Search from "./Search";
    import Code from "./Code";
    import SelectStatus from "./SelectStatus";
    import {EmployerStatus} from "./../config";

    export default {
        name: "CoTabel",
        props: ['type', 'title'],
        components: {Search, Code, SelectStatus},
        created() {
            this.getData()
        },
        data() {
            return {
                data: [],
                EmployerStatus: EmployerStatus,
                filter: {pageNo: 1, pageSize: 10}
            }
        },
        methods: {
            getData() {
                let url = this.type === 'examine' ? '/admin/employers/auditing' : '/admin/employers';
                this.$axios.get(url, {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            deleteData(index, id) {
                this.$axios.delete(`/admin/employer/${id}`).then(() => {
                    this.data.records.splice(index, 1);
                    this.data.total = this.data.total - 1
                });
            },
            edit(id) {
                this.type === 'examine' ? this.$router.push('/home/coExamine/coInfo?id=' + id) : this.$router.push('/home/coInfos/coInfo?id=' + id)
            },
        }
    }
</script>