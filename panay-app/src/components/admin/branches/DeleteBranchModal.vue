<script>
import { Modal } from 'bootstrap';
export default {

    props: {
        selectedBranch: Object
    },
    emits: ['deleteBranch'],

    data() {
        return {
            adminPassword: ''
        }
    },

    mounted() {
        const deleteModalEl = document.getElementById('deleteModal');

        // Reset all fields and component data when modal is hidden
        deleteModalEl.addEventListener('hidden.bs.modal', event => {
            this.resetInputs();
        });
    },

    methods: {
        onSubmit() {
            // Server-side password validation
            this.$emit('deleteBranch', this.selectedBranch._id);
            const deleteModalElement = document.getElementById('deleteModal');
            const modal = Modal.getInstance(deleteModalElement);
            modal.hide();
        },

        resetInputs() {
            this.adminPassword = '';
        }
    }

}

</script>

<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="onSubmit" novalidate>

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Branch</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body">
                        <div class="container-fluid">
                            <p>Are you sure you want to delete this branch?</p>
                            <span><strong>Branch ID:</strong> {{ selectedBranch.branchID }}</span> <br />
                            <span><strong>Branch Name:</strong> {{ selectedBranch.branchName }}</span> <br /> <br />
                            <h5>Please enter your admin password to confirm.</h5>

                            <div class="form-floating mb-2">
                                <!-- TODO: Validate Password -->
                                <input type="password" :class="{ 'form-control': true, 'is-invalid': false }"
                                    id="admin-password" placeholder="Admin Password" v-model="adminPassword" required />
                                <label for="admin-password">Password</label>
                                <div class="invalid-feedback">
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-danger">Delete Branch</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>