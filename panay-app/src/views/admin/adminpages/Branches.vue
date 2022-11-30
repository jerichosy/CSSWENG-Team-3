<script>
import BranchCard from '../../../components/admin/branches/BranchCard.vue'
import UserService from '../../../services/UserService.js'

export default {
    data() {
        return {
            branches: []
        }
    },
    components: {
        BranchCard
    },

    mounted() {
        this.retrieveBranches();
    },


    methods: {
        retrieveBranches() {
            UserService.getBranches()
                .then(response => {
                    this.branches = response.data
                })
                .catch(e => {
                    console.log(e);
                })
        }
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
            <BranchCard v-for="branch in branches" :branch="branch" />
        </div>
    </div>

</template>