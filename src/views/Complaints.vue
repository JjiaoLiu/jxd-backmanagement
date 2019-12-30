<template>
    <section>
        <header class="t-l">
            投诉 &nbsp;&nbsp;
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" ref="filter">
            <el-form-item label="关键字：" prop="keyword">
                <el-input v-model.trim="filter.keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getData" type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="expand">
                <template slot-scope="scope">
                   情况描述： {{scope.row.content}}
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="用户" prop="userName"></el-table-column>
            <el-table-column label="电话" prop="phone"></el-table-column>
            <el-table-column label="投诉类型" prop="complaintType"></el-table-column>
            <el-table-column label="投诉职位" prop="jobTitle"></el-table-column>
            <el-table-column label="虚假理由" prop="contentType"></el-table-column>
            <el-table-column label="收费类型" prop="chargeType"></el-table-column>
            <el-table-column label="损失" prop="loss">
                <template slot-scope="scope">
                    {{scope.row.loss ? "有" : "无"}}
                </template>
            </el-table-column>
            <el-table-column label="损失金额" prop="amount"></el-table-column>
            <el-table-column label="面试地址" prop="address"></el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <el-image v-if="scope.row.images"
                              style="width: 100px; height: 100px"
                              :src="scope.row.images ? $store.state.IMGROOTURL + scope.row.images.split(',')[0] : ''"
                              :preview-src-list="getImageList(scope.row.images)">
                    </el-image>
                </template>
            </el-table-column>
            <el-table-column label="当前状态" prop="status">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.statusCode === 2 ? 'success' : scope.row.statusCode === 1 ? 'info' : 'danger'">
                        {{scope.row.status}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="120">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.statusCode === 0" @click="open(scope.row,1)">设置为处理中</el-button>
                    <el-button v-if="scope.row.statusCode === 1" @click="open(scope.row,2)">设置为已处理</el-button>
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
        name: "Complaints",
        data() {
            return {
                data: [],
                multipleSelection: [],
                filter: {pageNo: 1, pageSize: 10}
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios.get('/admin/complaint', {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            edit(id) {
                this.$router.push('/home/complaints/complaint?id=' + id);
            },
            getImageList(images) {
                if (!images) {
                    return [];
                }
                let arr = images.split(',');
                return arr.map((f) => {
                    return this.$store.state.IMGROOTURL + f;
                })
            },
            open(row, statusCode) {
                this.$confirm(`确认设置为${statusCode === 1 ? '处理中':'已处理'}`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.putData(row, statusCode)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            putData(row, statusCode) {
                this.$axios.put('/admin/complaint', {id: row.id, statusCode: statusCode}).then((res) => {
                    this.getData();
                });
            },
        }
    }
</script>