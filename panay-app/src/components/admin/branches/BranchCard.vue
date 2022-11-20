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
    <div class="col-lg-4 col-sm-6 container border border-2 p-3">
        <div class="row h-50">
            <div class="text-start col-8 p-3 m-0 border border-0 rounded-start bg-primary text-white">
                <div class="row">
                    <div class="col-8">
                        <h6>{{branch.branchID}}</h6>
                        <h5>{{branch.branchName}}</h5>
                    </div>
                </div>
            </div>
            <div class="col-4 m-0 rounded-end bg-info">
                    
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>