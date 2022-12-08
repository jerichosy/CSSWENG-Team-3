<script>
import { Modal } from 'bootstrap';
import UserService from '../../../services/UserService';
export default {

    props: {
        selectedBranch: Object
    },
    emits: ['deleteBranch', 'retrieveBranches'],

    data() {
        return {
            adminPassword: '',
            adminPasswordAlert: '',
            submitAttempt: false,
            invalidAdminPassword: false
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
        onSubmitDeleteBranch() {
            this.invalidAdminPassword = false;
            this.submitAttempt = true;

            const data = {
                _id: this.selectedBranch._id,
                adminPassword: this.adminPassword
            };

            UserService.deleteBranch(data)
                .then(response => {
                    console.log(response);
                    this.$emit('retrieveBranches');
                    const deleteModalEl = document.getElementById('deleteModal');
                    const modal = Modal.getInstance(deleteModalEl);
                    modal.hide();
                })
                .catch(e => {
                    this.invalidAdminPassword = true;
                    console.log(e)
                    if (e.response.data.reason === 'adminPassword') {
                        this.adminPasswordAlert = e.response.data.msg;
                    }
                    else {
                        console.log(e.response.data.msg);
                    }
                });
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
                <form @submit.prevent="onSubmitDeleteBranch" novalidate>

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
                                <input type="password"
                                    :class="{ 'form-control': true, 'is-invalid': submitAttempt && invalidAdminPassword }"
                                    id="admin-password" placeholder="Admin Password" v-model="adminPassword" required />
                                <label for="admin-password">Password</label>
                                <div class="invalid-feedback">
                                    {{ adminPasswordAlert }}
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