<template>
    <section>
        <header class="t-l">
            账户（账号）管理
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" ref="filter">
            <el-form-item label="关键字：" prop="keyword">
                <el-input v-model.trim="filter.keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="头像">
                <template slot-scope="scope">
                    <el-avatar :size="30" :src="$store.state.IMGROOTURL+scope.row.avatar"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="电话号码" prop="phone"></el-table-column>
            <el-table-column label="昵称" prop="nick"></el-table-column>
            <el-table-column label="性别" prop="gender"></el-table-column>
            <el-table-column label="余额" prop="balance"></el-table-column>
            <el-table-column label="冻结" prop="frozenBalance"></el-table-column>
            <el-table-column label="操作" fixed="right" width="260">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.resumeId"
                               @click="$router.push('/home/resume/resumeInfo?id=' + scope.row.resumeId)">查看简历
                    </el-button>
                    <el-button v-if="scope.row.employerId"
                               @click="$router.push('/home/coInfos/coInfo?id=' +  scope.row.employerId)">查看企业
                    </el-button>
                    <el-button v-if="scope.row.enable" @click="enable(scope.row,false)">冻结</el-button>
                    <el-button v-if="!scope.row.enable" @click="enable(scope.row,true)">解冻</el-button>
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
        name: "Users",
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
                this.$axios.get('/admin/user', {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            enable(row, bool) {
                this.$axios.post('/admin/user/enable', {id: row.id, enable: bool}).then(() => {
                    this.getData();
                });
            },
        }
    }
</script>