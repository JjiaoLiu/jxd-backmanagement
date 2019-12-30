<template>
    <el-dialog
            class="t-l"
            :visible="dialogVisible"
            :show-close="false"
            :close-on-click-modal="false"
            width="500px">
        <el-form ref="form" :model="jobType" label-width="80px" label-position="left">
            <el-form-item label="兼职名称">
                <el-input v-model.trim="form.jobTypeName"></el-input>
            </el-form-item>
            <el-form-item label="编码">
                <el-input v-model.trim="form.code"></el-input>
            </el-form-item>
            <el-form-item label="是否可用">
                <el-switch v-model="form.enable"></el-switch>
            </el-form-item>
            <el-form-item label="图标">
                <el-upload
                        action="/admin/upload/image"
                        name="imageFile"
                        :headers="headers"
                        :show-file-list="false"
                        :on-error="handleUploadError"
                        :on-success="(res,file)=>{
                            $set(form,'imgUrl',res.data)
                        }">
                    <el-image
                            fit="contain"
                            style="height: 28px"
                            v-if="form.imgUrl" :src="$store.state.IMGROOTURL + form.imgUrl"
                            :preview-src-list="Array.of($store.state.IMGROOTURL + form.imgUrl)">
                    </el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否热门">
                <el-switch v-model="form.hot"></el-switch>
            </el-form-item>
        </el-form>
        <div class="t-c">
            <el-button @click="$emit('update:dialogVisible',false)">取 消</el-button>
            <el-button type="primary" @click="$emit('onSubmit',form)">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {getCookie} from "../util";

    export default {
        name: "jobTypeModel",
        props: ['jobType', 'dialogVisible'],
        data() {
            return {
                form: {imgUrl: null},
                imgRoot: process.env.VUE_APP_imgUrl,
                headers: {
                    Authorization: getCookie('Authorization')
                }
            }
        },
        methods: {
            handleUploadError(err, file, fileList) {
                console.log('handleUploadError', err)
            },
        },
        watch: {
            jobType: {
                handler(N) {
                    this.form = N;
                },
                immediate: true,
                deep: true
            },
        }
    }
</script>
