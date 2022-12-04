<script>
import BranchCard from '../../../components/admin/branches/BranchCard.vue'
import AddBranchModal from '../../../components/admin/branches/AddBranchModal.vue'
import DeleteBranchModal from '../../../components/admin/branches/DeleteBranchModal.vue'
import UserService from '../../../services/UserService.js'
import { computed } from 'vue'

export default {
    components: {
        BranchCard,
        AddBranchModal,
        DeleteBranchModal
    },
    data() {
        return {
            branches: [],
            selectedBranch: {}
        }
    },
    provide() {
        return {
            branches: computed(() => this.branches)
        }
    },


    mounted() {
        this.retrieveBranches();
    },


    methods: {
        selectBranch(branch) {
            this.selectedBranch = branch;
        },
        deselectBranch() {
            this.selectedBranch = {};
        },
        retrieveBranches() {
            UserService.getBranches()
                .then(response => {
                    this.branches = response.data
                })
                .catch(e => {
                    console.log(e);
                })
        },
        addBranch(branch) {
            const newBranch = {
                name: branch.branchName,
                password: branch.branchPassword,
                isadmin: 0
            }

            UserService.signup(newBranch)
                .then(response => {
                    console.log(response);
                    this.retrieveBranches();
                })
                .catch(e => {
                    console.log(e);
                })
        },

        deleteBranch(id) {
            // TODO: Bring up id property naming to devs
            const data = {
                "id": id
            }
            console.log(data);

            UserService.deleteBranch(data)
                .then(response => {
                    console.log(response);
                    this.deselectBranch();
                    this.retrieveBranches();
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }
}
</script>

<template>
    <AddBranchModal @add-branch="addBranch" />
    <DeleteBranchModal :selected-branch="selectedBranch" @delete-branch="deleteBranch" />
    <div class="row">
        <h1 class="p-3 m-0">Branches</h1>
        <hr />
    </div>
    <div class="row justify-content-end ps-3 pe-3 mb-2">
        <div class="col-auto">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add</button>
        </div>
    </div>
    <div class="row ps-2 pe-2">
        <BranchCard v-for="branch in branches" :branch="branch" @select-branch="selectBranch" />
    </div>
</template>