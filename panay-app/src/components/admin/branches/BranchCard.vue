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
    <div class="col-lg-4 col-sm-6 p-3 d-flex justify-content-center">
        <div class="card border-primary" style="height: 10rem; width: 18rem;">
            <div class="card-header bg-primary text-white" style="height: 6rem;">
                <h6>{{ branch.branchID }}</h6>
                <h5>{{ branch.branchName }}</h5>
            </div>


            <div class="p-2 m-1">
                <button class="btn btn-secondary text-white me-2">Edit</button>
                <button class="btn btn-danger">Delete</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>