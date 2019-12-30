<template>
    <section>
        <header class="t-l">
            交易明细 &nbsp;&nbsp;
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" ref="filter">
            <el-form-item label="交易人：" prop="tradeUserName">
                <el-input v-model.trim="filter.tradeUserName"></el-input>
            </el-form-item>
            <el-form-item label="用户：" prop="username">
                <el-input v-model.trim="filter.username"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="getData" type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="交易编号" prop="tradeNo"></el-table-column>
            <el-table-column label="用户" prop="user"></el-table-column>
            <el-table-column label="交易人" prop="tradeUser"></el-table-column>
            <el-table-column label="交易类型" prop="tradeType"></el-table-column>
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="交易时间" prop="tradeTime"></el-table-column>
            <el-table-column label="豆币" prop="amount"></el-table-column>
            <el-table-column label="豆币余额" prop="balance"></el-table-column>
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
    import Search from "../components/Search";

    export default {
        name: "Trades",
        components: {Search},
        data() {
            return {
                data: [],
                filter: {pageNo: 1, pageSize: 10}
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios.get('/admin/account/trade-details', {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
        }
    }
</script>