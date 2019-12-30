<template>
    <section>
        <header class="t-l">
            提现审核
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" ref="filter">
            <el-form-item label="用户：" prop="username">
                <el-input v-model.trim="filter.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column label="用户" prop="username"></el-table-column>
            <el-table-column label="提取豆币" prop="amount"></el-table-column>
            <el-table-column label="支付宝账号" prop="alipay"></el-table-column>
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="当前状态" prop="status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.statusCode === 2 ? 'success' : scope.row.statusCode === 1 ? 'info' : 'danger'">
                        {{scope.row.status}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="审核人" prop="auditor"></el-table-column>
            <el-table-column label="审核时间" prop="auditTime"></el-table-column>
            <el-table-column label="审核备注" prop="remark"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <template v-if="scope.row.statusCode === 1">
                        <el-button @click="open(scope.row.id)" type="danger">审核</el-button>
                    </template>
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
        name: "Withdraw",
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
                this.$axios.get('/admin/account/withdraw', {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            open(id) {
                this.$prompt('审核', {
                    confirmButtonText: '通过',
                    cancelButtonText: '拒绝',
                    distinguishCancelAndClose:true,
                    beforeClose: (action, instance,done) => {
                        if (action === 'confirm') {
                            this.examin(true, id, instance.inputValue ? instance.inputValue : '');
                            done()
                        }
                        if (action === 'cancel') {
                            if(!instance.inputValue){
                               return  this.$message({
                                    message: '请输入拒绝原因',
                                    type: 'warning'
                                });
                            } else {
                                this.examin(false, id, instance.inputValue);
                                done()
                            }
                        }
                    }
                })
            },
            examin(rs, id, value) {
                let url = rs ? 'audit-success' : 'audit-failure';
                this.$axios.get(`/admin/account/withdraw/${url}`, {params:{id: id, remark: value}}).then(() => {
                    this.getData();
                });
            },
        }
    }
</script>