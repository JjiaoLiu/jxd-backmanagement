<template>
    <section>
        <JobTabel type="examine" key="examine" title="待审核职位"/>
    </section>
</template>

<script>
    import JobTabel from './../components/JobTabel'

    export default {
        name: "JobExamine",
        components: {JobTabel},
    }
</script>