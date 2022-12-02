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
    <div class="row">
        <h1 class="p-3 m-0">Branches</h1>
        <hr />
    </div>
    <div class="row justify-content-end ps-3 pe-3 mb-2">
        <div class="col-auto">
            <button class="btn btn-primary">Add</button>
        </div>
    </div>
    <div class="row ps-2 pe-2">
        <BranchCard v-for="branch in branches" :branch="branch" />
    </div>
</template>