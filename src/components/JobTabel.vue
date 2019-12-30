<template>
    <section>
        <header class="t-l">
            {{title}}
            <br>
            <br>
        </header>
        <el-form :inline="true" :model="filter" ref="filter" v-if="type === 'info'">
            <el-form-item label="职位标题：" prop="title">
                <el-input v-model.trim="filter.title"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" prop="contact">
                <el-input v-model.trim="filter.contact"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" prop="tel">
                <el-input v-model.trim="filter.tel"></el-input>
            </el-form-item>
            <el-form-item label="工作类型：" prop="jobTypeId">
                <Code code-url="/admin/code/job_type" :value.sync="filter.jobTypeId"></Code>
            </el-form-item>
            <el-form-item label="当前状态：" prop="status">
                <select-status :options="JobStatus" :value.sync="filter.status"></select-status>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getData">查询</el-button>
                <el-button @click="$refs['filter'].resetFields()">重置</el-button>
            </el-form-item>
        </el-form>
        <div v-if="type === 'examine'">
            <el-button @click="opens(true)">批量通过</el-button>
            <el-button @click="opens(false)">批量决绝</el-button>
        </div>
        <el-table :data="data.records" stripe style="width: 100%" ref="multipleTable"
                  :highlight-current-row="true" @selection-change="handleSelectionChange">
            <el-table-column
                    type="expand">
                <template slot-scope="scope">
                    <div>
                        <span>工作地点：</span>
                        <span> {{scope.row.address}}</span>
                    </div>
                    <div>
                        <span>工作内容：</span>
                        <span> {{scope.row.content}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column type="selection" v-if="type === 'examine'" width="55"></el-table-column>
            <el-table-column label="职位标题" prop="title"></el-table-column>
            <el-table-column label="联系人" prop="contact"></el-table-column>
            <el-table-column label="联系电话" prop="tel"></el-table-column>
            <el-table-column label="押金" prop="frozenDeposit"></el-table-column>
            <el-table-column label="报名人数" prop="signNum"></el-table-column>
            <el-table-column label="录用人数" prop="offerNum"></el-table-column>
            <el-table-column label="开始时间" prop="startTime"></el-table-column>
            <el-table-column label="结束时间" prop="endTime"></el-table-column>
            <el-table-column label="工作类型" prop="jobTypeName"></el-table-column>
            <el-table-column label="工资（豆币/时）" prop="salary"></el-table-column>
            <el-table-column label="当前状态" prop="status"></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="open(scope.row.id)" v-if="type === 'examine'">审核</el-button>
                    <el-button @click="edit(scope.row.id)">查看</el-button>
                    <div v-if="type === 'info'">
                        <el-button @click="toJobResume(scope.row.id)">招聘详情</el-button>
                        <el-button @click="toJobProgress(scope.row.id)">工作详情</el-button>
                    </div>

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
    import {JobStatus} from "./../config";

    export default {
        name: "CoTabel",
        props: ['type', 'title'],
        components: {Search, Code, SelectStatus},
        created() {
            this.getData()
        },
        data() {
            return {
                JobStatus: JobStatus,
                data: [],
                multipleSelection: [],
                filter: {pageNo: 1, pageSize: 10}
            }
        },
        computed: {
            ids() {
                let ids = [];
                if (this.multipleSelection.length) {
                    this.multipleSelection.forEach((f) => {
                        ids.push(f.id);
                    })
                }
                return ids;
            }
        },
        methods: {
            getData() {
                let url = this.type === 'examine' ? '/admin/job/auditing' : '/admin/job';
                this.$axios.get(url, {params: this.filter}).then((res) => {
                    this.data = res
                });
            },
            edit(id) {
                this.type === 'examine' ? this.$router.push(`/home/jobExamine/jobInfo?id=${id}`) : this.$router.push(`/home/jobInfos/jobInfo?id=${id}`)
            },
            deleteData(index, id) {
                this.$axios.delete(`/admin/job/${id}`).then(() => {
                    this.data.records.splice(index, 1);
                    this.data.total = this.data.total - 1
                });
            },
            toJobResume(id) {
                this.$router.push(`/home/jobResume?id=${id}`)
            },
            toJobProgress(id) {
                this.$router.push(`/home/jobProgress?id=${id}`)
            },
            examine(rs, id, value) {
                let url = rs ? 'audited' : 'audit-failure';
                this.$axios.post(`/admin/job/${url}`, {id: id, remark: value}).then(() => {
                    this.getData();
                })
            },
            open(id) {
                this.$prompt('审核', {
                    confirmButtonText: '通过',
                    cancelButtonText: '拒绝',
                    distinguishCancelAndClose: true,
                    beforeClose:(action, instance,done)=>{
                        if (action === 'confirm') {
                            this.examine(true, id, instance.inputValue ? instance.inputValue : '');
                            done()
                        }
                        if (action === 'cancel') {
                            if(!instance.inputValue){
                                return this.$message({
                                    message: '请输入拒绝原因',
                                    type: 'warning'
                                });
                            }else{
                                this.examine(false, id, instance.inputValue);
                                done()
                            }
                        }
                        done()
                    }
                })
            },
            opens(bool) {
                this.$confirm(`确定批量${bool ? '通过' : '决绝'}？`, {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.examines(bool)
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消操作'
                    });
                });
            },
            examines(rs) {
                let url = rs ? 'audited' : 'audit-failure';
                this.$axios.post(`/admin/job/${url}`, {ids: this.ids}).then(() => {
                    this.getData();
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>
