<template>
    <section>
        <header class="t-l">
            兼职分类
            &nbsp;&nbsp;<el-button type="primary" @click="addTypes(null)">新 增</el-button>
            <br>
            <br>
        </header>
        <el-table :data="data" stripe style="width: 100%"
                  :highlight-current-row="true" @current-change="changeActiveJobType">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <div style="padding-left: 25px">
                        <el-table :data="props.row.jobTypes" style="width: 100%" @current-change="changeActiveJobType">
                            <el-table-column type="index"></el-table-column>
                            <el-table-column label="类型">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.jobTypeName"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="编码">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.code"
                                              @change="handleChange"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="热门">
                                <template slot-scope="scope">
                                    <el-switch active-color="#13ce66" inactive-color="#eeeeee"
                                               v-model="scope.row.hot"
                                               @change="handleChange"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="图片">
                                <template slot-scope="scope">
                                    <div style="display: inline-flex;align-items: center">
                                        <el-image fit="contain"
                                                  style="height: 28px;"
                                                  v-if="scope.row.imgUrl"
                                                  :src="$store.state.IMGROOTURL + scope.row.imgUrl"
                                                  :preview-src-list="Array.of($store.state.IMGROOTURL + scope.row.imgUrl)">
                                        </el-image>
                                        &nbsp;
                                        <el-upload
                                                :with-credentials="true"
                                                name="imageFile"
                                                action="/admin/upload/image"
                                                :headers="headers"
                                                :show-file-list="false"
                                                :on-success="handleUpload">
                                            <i class="el-icon-plus avatar-uploader-icon"></i>
                                        </el-upload>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="可用">
                                <template slot-scope="scope">
                                    <el-switch active-color="#13ce66" inactive-color="#eeeeee"
                                               v-model="scope.row.enable"
                                               @change="handleChange"></el-switch>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" type="danger" @click="deleteDate(scope.$index,scope.row)">
                                        删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="类型">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.jobTypeName" @change="handleChange"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="编码">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.code" @change="handleChange"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="图片">
                <template slot-scope="scope">
                    <div style="display: inline-flex;align-items: center">
                        <el-image fit="contain"
                                  style="height: 28px;"
                                  v-if="scope.row.imgUrl" :src="$store.state.IMGROOTURL + scope.row.imgUrl"
                                  :preview-src-list="Array.of($store.state.IMGROOTURL + scope.row.imgUrl)">
                        </el-image>
                        &nbsp;
                        <el-upload
                                :with-credentials="true"
                                name="imageFile"
                                :headers="headers"
                                action="/admin/upload/image"
                                :show-file-list="false"
                                :on-success="handleUpload">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" v-if="!(scope.row.jobTypes && scope.row.jobTypes.length)"
                               @click="deleteDate(scope.$index,scope.row)">删除
                    </el-button>
                    <el-button @click.stop="addTypes(scope.row.id)">新增下一级</el-button>
                </template>
            </el-table-column>
        </el-table>
        <JobTypeModel :dialogVisible.sync="dialogVisible" :jobType="activeJobType"
                      @onSubmit="postData"></JobTypeModel>
    </section>
</template>
<script>
    import JobTypeModel from '../components/JobTypeModel'
    import {debounce} from 'lodash'
    import {getCookie} from "../util";

    export default {
        name: 'jobTypes',
        components: {JobTypeModel},
        data() {
            return {
                activeJobType: {},
                topLevel: false,
                dialogVisible: false,
                data: [],
                headers: {
                    Authorization: getCookie('Authorization')
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                this.$axios.get('/admin/code/job_type').then((res) => {
                    this.data = res
                })
            },
            putData(data) {
                this.$axios.put('/admin/code/job_type', data).then(() => {
                    return false
                })
            },
            postData(data) {
                this.$axios.post('/admin/code/admin/job_type', data).then((res) => {
                    if (res.parentId) {
                        this.data.find((item) => {
                            return item.id === res.parentId
                        }).jobTypes.push(res)
                    } else {
                        this.data.push(res)
                    }
                    this.dialogVisible = false;
                })
            },
            deleteDate(index, data) {
                this.$axios.delete(`/admin/code/job_type/${data.id}`).then(() => {
                    if (data.parentId) {
                        this.data.find((item) => {
                            return item.id === data.parentId
                        }).jobTypes.splice(index, 1);
                        return false
                    }
                    this.data.splice(index, 1);
                });
            },
            changeActiveJobType(currentRow, oldCurrentRow) {
                this.activeJobType = currentRow;
            },
            handleChange: debounce(function () {
                this.putData(this.activeJobType)
            }, 500),
            handleUpload(res, file) {
                this.$set(this.activeJobType, 'imgUrl', res.data);
                this.handleChange()
            },
            addTypes(parentId) {
                this.activeJobType = {parentId: parentId};
                this.dialogVisible = true;
            },
        }
    }
</script>
