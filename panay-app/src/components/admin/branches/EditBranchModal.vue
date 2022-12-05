<script>
// FIXME: Reset forms when outside of modal is clicked

import { Modal } from 'bootstrap';
export default {

    props: {
        selectedBranch: Object
    },
    emits: ['editBranch'],

    data() {
        return {
            branchName: '',
            branchPassword: '',
            branchRetypePassword: '',
            adminPassword: '',
            submitAttemptBranchName: false,
            submitAttemptPassword: false
        }
    },

    watch: {
        selectedBranch: {
            handler() {
                this.branchName = this.selectedBranch.branchName;
            },
            deep: true
        }
    },

    methods: {
        onSubmit() {
            // Server-side password validation
            this.$emit('editBranch');
            const editModalElement = document.getElementById('editModal');
            const modal = Modal.getInstance(editModalElement);
            modal.hide();
        },
        validBranchName() {
            if (this.branch.branchName.length < 3) {
                this.alertMessages.branchName = 'Please enter a branch name with a minimum of 3 characters.';
                return false;
            }
            else if (this.branches.some(b => b.branchName.toLowerCase() === this.branch.branchName.toLowerCase())) {
                this.alertMessages.branchName = 'This branch name already exists. Please enter another branch name.';
                return false;
            }
            return true;
        },
        validPassword() {
            if (this.branchPassword.length < 6) {
                return false;
            }
            return true;
        },
        samePassword() {
            if (this.branchPassword !== this.branchRetypePassword) {
                return false;
            }
            return true;
        },

        onSubmitPassword() {
            this.submitAttemptPassword = true;
        }
    }

}

</script>

<template>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="deleteModalLabel">Edit Branch</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <!-- Modal Body -->
                <div class="modal-body">
                    <div class="container-fluid">
                        <!-- 
                                - Change Branch Name
                                    - Check if new branch name exists already
                                - Change Branch Password
                                    - Ask for admin password
                                        - Server-side check if correct password
                                    - Ask for new Password
                                        - Server-side check if new password is the same as old password
                                    - Ask for retyped new password
                                        - Check if matched
                             -->

                        <form @submit.prevent>
                            <fieldset>
                                <legend>Change Branch Name</legend>
                                <div class="form-floating mb-2">
                                    <input type="text" :class="{ 'form-control': true, 'is-invalid': !validBranchName }"
                                        id="edit-branch-name" placeholder="Branch Name" v-model="branchName" required />
                                    <label for="edit-branch-name">Branch Name</label>
                                    <div class="invalid-feedback">
                                    </div>
                                </div>
                            </fieldset>
                            <button class="btn btn-primary" type="submit">Save Changes</button>
                        </form>

                        <form @submit.prevent="onSubmitPassword">
                            <fieldset>
                                <legend>Change Branch Password</legend>
                                <!-- Branch Password Input -->
                                <div class="form-floating mb-2">
                                    <input type="password"
                                        :class="{ 'form-control': true, 'is-invalid': !validPassword() && submitAttemptPassword }"
                                        id="change-branch-password" placeholder="Branch Password"
                                        v-model="branchPassword" required />
                                    <label for="change-branch-password">Branch Password</label>
                                    <div class="invalid-feedback">
                                        Please enter a password with a minimum of 6 characters.
                                    </div>
                                </div>
                                <!-- Retype Branch Password Input -->
                                <div class="form-floating mb-2">
                                    <input type="password"
                                        :class="{ 'form-control': true, 'is-invalid': !samePassword() && submitAttemptPassword }"
                                        @blur="branchRetypePasswordBlurred = true" id="retype-change-branch-password"
                                        placeholder="Re-type Branch Password" v-model="branchRetypePassword" required />
                                    <label for="retype-change-branch-password">Re-type Branch Password</label>
                                    <div class="invalid-feedback">
                                        The passwords do not match.
                                    </div>
                                </div>

                                <div class="form-floating mb-2">
                                    <!-- TODO: Validate Password -->
                                    <input type="password" :class="{ 'form-control': true, 'is-invalid': false }"
                                        id="edit-branch-admin-password" placeholder="Admin Password"
                                        v-model="adminPassword" required />
                                    <label for="edit-branch-admin-password">Admin Password</label>
                                    <div class="invalid-feedback">
                                        Admin password is incorrect.
                                    </div>
                                </div>
                            </fieldset>
                            <button class="btn btn-primary" type="submit">Change Password</button>
                        </form>

                    </div>
                </div>

                <!-- Modal Footer -->
                <div class="modal-footer">
                    <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal"
                        @click="resetInputs">Close</button>
                    <!-- <button type="submit" class="btn btn-primary">Save Changes</button> -->
                </div>
            </div>
        </div>
    </div>
</template>