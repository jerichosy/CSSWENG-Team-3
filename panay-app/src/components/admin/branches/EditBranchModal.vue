<script>
// FIXME: Reset forms when outside of modal is clicked

import { Modal } from 'bootstrap';
import UserService from '../../../services/UserService';
export default {
    inject: {
        branches: {
            from: 'branches'
        }
    },
    props: {
        selectedBranch: Object
    },
    emits: ['changeBranchPassword'],

    data() {
        return {
            branchName: '',
            branchPassword: '',
            branchRetypePassword: '',
            adminPassword: '',
            submitAttemptBranchName: false,
            submitAttemptPassword: false,
            adminPasswordIsCorrect: false
        }
    },

    mounted() {
        const editModalEl = document.getElementById('editModal');
        // Reset all fields and component data when modal is hidden
        // TODO: Add this for other modals
        editModalEl.addEventListener('hidden.bs.modal', event => {
            this.resetInputs();
        })
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
        validBranchName() {
            if (this.branchName.length < 3) {
                return false;
            }
            else if (this.branches.some(b => b.branchName.toLowerCase() === this.branchName.toLowerCase())) {
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
        validatePassword(data) {
            this.adminPasswordIsCorrect = UserService.validatePassword(data);
            console.log(this.adminPasswordIsCorrect);
            // .then(response => {
            //     // expecting boolean
            //     console.log(response);
            //     this.adminPasswordIsCorrect = response;
            // })
            // .catch(e => {
            //     console.log(e);
            // })
        },

        onSubmitPassword() {
            this.submitAttemptPassword = true;

            const adminData = {
                // TODO: get _id or similar from session
                "_id": 1234,
                "password": this.adminPassword
            };
            this.validatePassword(adminData);

            if (this.validPassword() && this.samePassword() && this.adminPasswordIsCorrect) {
                const data = {
                    "id": this.selectedBranch._id,
                    "branchPassword": this.branchPassword
                }
                console.log('changing branch password');
                // TODO: emit change branch password
                // this.$emit('changeBranchPassword', data);
                this.resetInputs();
            }
        },
        onSubmitBranchName() {
            this.submitAttemptBranchName = true;
        },

        resetInputs() {
            this.branchName = '';
            this.branchPassword = '';
            this.branchRetypePassword = '';
            this.adminPassword = '';
            this.adminPasswordIsCorrect = false;
            this.submitAttemptBranchName = false;
            this.submitAttemptPassword = false;
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
                        <form @submit.prevent="onSubmitBranchName" novalidate>
                            <fieldset>
                                <legend>Change Branch Name</legend>
                                <div class="form-floating mb-2">
                                    <input type="text"
                                        :class="{ 'form-control': true, 'is-invalid': !validBranchName() && submitAttemptBranchName }"
                                        id="edit-branch-name" placeholder="Branch Name" v-model="branchName" required />
                                    <label for="edit-branch-name">Branch Name</label>
                                    <div class="invalid-feedback">
                                        Please enter a branch name with a minimum of 3 characters.
                                    </div>
                                </div>
                            </fieldset>
                            <button class="btn btn-primary" type="submit">Save Changes</button>
                        </form>

                        <form @submit.prevent="onSubmitPassword" novalidate>
                            <fieldset>
                                <legend>Change Branch Password</legend>
                                <!-- Branch Password Input -->
                                <div class="form-floating mb-2">
                                    <input type="password"
                                        :class="{ 'form-control': true, 'is-invalid': !validPassword() && submitAttemptPassword }"
                                        id="change-branch-password" placeholder="Branch Password"
                                        v-model="branchPassword" required />
                                    <label for="change-branch-password">New Branch Password</label>
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
                                    <label for="retype-change-branch-password">Re-type New Branch Password</label>
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
                    <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                    <!-- <button type="submit" class="btn btn-primary">Save Changes</button> -->
                </div>
            </div>
        </div>
    </div>
</template>