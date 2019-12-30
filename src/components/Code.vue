<!--code 编码-->
<template>
    <el-select :value="value" placeholder="请选择" @change="change">
        <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.codeName || item.jobTypeName"
                :disabled="!item.enable"
                :value="item.id">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "Code",
        props: ['value', 'codeUrl'],
        data() {
            return {
                loading: false,
                options: []
            }
        },
        created() {
            this.getOptions()
        },
        methods: {
            getOptions() {
                if (this.codeUrl) {
                    this.loading = true;
                    this.$axios.get(this.codeUrl).then(res => {
                        this.loading = false;
                        if (this.codeUrl.includes('job_type')) {
                            let arr = [];
                            res.forEach((f) => {
                                if (f.jobTypes && f.jobTypes.length) {
                                    arr.push(...f.jobTypes)
                                }
                            });
                            this.options = arr;
                            return false;
                        }
                        this.options = res;
                    })
                }
            },
            change(value) {
                this.$emit('update:value', value)
            }
        },
    }
</script>