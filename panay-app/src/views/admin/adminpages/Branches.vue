<script>
import BranchCard from '../../../components/admin/branches/BranchCard.vue'

export default {
    data() {
        return {
            branches: [{branchID: 101, branchName: 'Paligsahan QC'}, {branchID: 102, branchName: 'Pag-asa QC'}, {branchID: 103, branchName: 'Tandang Sora QC'}]
        }
    },
    components: {
        BranchCard
    }
}
</script>

<template>
    <div class="container-fluid">
        <div class="row border border-2">
            <h1>Manage Branches</h1>
        </div>
        <div class="row border border-2">
            <button class="col-2">Add</button>
        </div>
        <div class="row container m-1 p-1">
            <BranchCard v-for="singleBranch in branches" :branch="singleBranch"/>
        </div>
    </div>

</template>