<script>
export default {
    props: {
        branch: Object
    },
    emits: ['selectBranch'],

    methods: {
        selectBranch() {
            this.$emit('selectBranch', this.branch)
        }
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
                <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal"
                    @click="selectBranch()">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>