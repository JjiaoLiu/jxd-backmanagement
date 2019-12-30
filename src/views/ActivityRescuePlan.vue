<template>
    <section>
        <header class="t-l">
            梦想拯救计划
            <br>
            <br>
        </header>
        <el-table :data="data.records" stripe style="width: 100%"
                  :highlight-current-row="true">
            <el-table-column type="index"></el-table-column>
            <el-table-column label="创建时间" prop="createTime"/>
            <el-table-column label="期数" prop="item"/>
            <el-table-column label="姓名" prop="name"/>
            <el-table-column label="联系电话" prop="phone"/>
            <el-table-column label="期望资金" prop="amount"/>
            <el-table-column label="建议" prop="advise"/>
            <el-table-column label="对接备注">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.remark" @change="(e) => handleChange(scope.row,e)"></el-input>
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
    import {debounce} from 'lodash'

    export default {
        name: "ActivityRescuePlan",
        created() {
            this.getData()
        },
        data() {
            return {
                data: {},
                filter: {pageNo: 1, pageSize: 10}
            }
        },
        methods: {
            getData() {
                this.$axios.get(`/admin/rescue-plan`, {params: this.filter}).then(res => {
                    this.data = res;
                })
            },
            handleChange: debounce(function (row, e) {
                this.$axios.put(`/admin/rescue-plan`, {remark: e, id: row.id});
            }, 500)
        }
    }
</script>