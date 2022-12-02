<script>
export default {
    props: {
        branch: Object
    },

    methods: {

    }


}
</script>

<template>
    <div class="col-lg-4 col-sm-6 p-3">
        <div class="card border-primary" style="width: 18rem;">
            <div class="card-header bg-primary text-white">
                <h6>{{ branch.branchID }}</h6>
                <h5>{{ branch.branchName }}</h5>
            </div>


            <div class="p-3 m-0">
                <button class="btn btn-secondary text-white me-2">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>