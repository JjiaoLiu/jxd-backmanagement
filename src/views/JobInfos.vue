<template>
    <section>
        <JobTabel type="info"  key="info" title="职位列表"></JobTabel>
    </section>
</template>

<script>
    import JobTabel from './../components/JobTabel'

    export default {
        name: "JobInfos",
        components: {JobTabel}
    }
</script>