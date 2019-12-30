<template>
    <el-select :value="value" @change="change" placeholder="请选择">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: "SelectStatus",
        props: ['options', 'value'],
        methods: {
            change(value) {
                this.$emit('update:value', value)
            }
        }
    }
</script>

<style scoped>

</style>