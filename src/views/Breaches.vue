<template>
    <section>
        <header class="t-l">
            违约记录
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" ref="filter">
            <el-form-item label="手机号：" prop="keywords">
                <el-input v-model.trim="filter.keywords"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
                <el-select v-model.trim="filter.status">
                    <el-option value="ENABLE" label="有效"/>
                    <el-option value="DISABLE" label="无效"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="用户名" prop="username"></el-table-column>
            <el-table-column label="状态" prop="status"></el-table-column>
            <el-table-column label="内容" prop="content"></el-table-column>
            <el-table-column label="操作备注" prop="remark"></el-table-column>
            <el-table-column label="操作" fixed="right" width="260">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.status === '有效'" @click="enable(scope.row,'无效')">
                       设置为无效
                    </el-button>
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
                this.$axios.get('/admin/breach', {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            enable(row, bool) {
                this.$prompt('请输入备注', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(async ({value}) => {
                    await this.$axios.put('/admin/breach', {id: row.id, status: bool, remark: value ? value : ''});
                    await this.getData();
                }).catch(() => {
                    this.$message({type: 'info', message: '取消输入'});
                });
            }
        }
    }
</script>