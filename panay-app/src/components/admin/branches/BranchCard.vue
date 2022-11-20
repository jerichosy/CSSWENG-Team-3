<script>
export default {
    props: {
        branch: Object
    }
}
</script>

<template>
    <div class="col-lg-4 col-sm-6 p-2 border border-2">
        <div class="container p-3 m-0 border rounded-3 bg-primary text-white">
            <h6>{{branch.branchID}}</h6>
            <h5>{{branch.branchName}}</h5>
        </div>
    </div>
</template>

<style scoped>

</style>