<!--检索-->
<template>
    <el-select
            v-model="vm"
            filterable
            remote
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            @change="change"
            :loading="loading">
        <el-option
                v-for="item in options"
                :key="item.id"
                :label="item.employerName"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    import {debounce} from 'lodash';

    export default {
        name: "Search",
        props: ['value', 'searchUrl'],
        data() {
            return {
                loading: false,
                vm: '',
                options: []
            }
        },
        methods: {
            remoteMethod: debounce(function (query) {
                if (query !== '') {
                    this.loading = true;
                    this.$axios.get(this.searchUrl, {params: {searchKey: query}}).then(res => {
                        this.loading = false;
                        this.options = res.records;
                    })
                } else {
                    this.options = [];
                }
            }, 500),
            change(value) {
                this.$emit('update:value', value)
            }
        },
        watch: {
            value: {
                handler(N) {
                    this.vm = N
                }
            }
        }
    }
</script>