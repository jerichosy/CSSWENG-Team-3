<script>
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
    emits: ['changeBranchPassword', 'retrieveBranches'],

    data() {
        return {
            branchName: '',
            invalidBranchName: false,
            branchNameAlert: '',
            submitAttemptBranchName: false,
            branchNameChanged: false,

            branchPassword: '',
            branchRetypePassword: '',
            branchPasswordAlert: '',
            adminPassword: '',
            invalidBranchPassword: false,
            invalidAdminPassword: false,
            branchPasswordChanged: false,
            submitAttemptPassword: false
        }
    },

    mounted() {
        const editModalEl = document.getElementById('editModal');
        // Reset all fields and component data when modal is hidden
        // TODO: Add this for records modals
        editModalEl.addEventListener('hidden.bs.modal', event => {
            this.resetBranchNameInputs();
            this.resetBranchPasswordInputs();
        });

        // Update edit fields to show selected record data
        // TODO: Update other edit modals to use this way
        editModalEl.addEventListener('shown.bs.modal', event => {
            this.branchName = this.selectedBranch.branchName;
        });
    },

    methods: {
        validBranchName() {
            if (this.branchName.length < 3) {
                this.branchNameAlert = "Please enter a branch name with a minimum of 3 characters."
                return false;
            }
            else if (this.branches.some(b => b.branchName.toLowerCase() === this.branchName.toLowerCase())) {
                this.branchNameAlert = "This branch name already exists."
                return false;
            }
            return true;
        },
        validPassword() {
            if (this.branchPassword.length < 6) {
                this.branchPasswordAlert = "Please enter a password with a minimum of 6 characters."
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
            this.branchPasswordChanged = false;
            this.submitAttemptPassword = true;
            this.invalidBranchPassword = false;
            this.invalidAdminPassword = false;

            if (this.validPassword() && this.samePassword()) {
                const data = {
                    _id: this.selectedBranch._id,
                    newBranchPassword: this.branchPassword,
                    adminPassword: this.adminPassword
                };

                UserService.editBranchPassword(data)
                    .then(response => {
                        console.log(response.data.msg);
                        this.resetBranchPasswordInputs();
                        this.branchPasswordAlert = response.data.msg;
                        this.branchPasswordChanged = true;
                        this.submitAttemptPassword = false;
                    })
                    .catch(e => {
                        this.branchPasswordAlert = e.response.data.msg
                        if (e.response.data.reason === '_id') {
                            this.invalidBranchPassword = true;
                        }
                        else if (e.response.data.reason === 'newBranchPassword') {
                            this.invalidBranchPassword = true;
                        }
                        else if (e.response.data.reason === 'adminPassword') {
                            this.invalidAdminPassword = true;
                        }
                        // generic
                        else {
                            this.invalidBranchPassword = true;
                        }
                    });
            }
            else {
                this.invalidBranchPassword = true;
            }
        },
        onSubmitBranchName() {
            this.submitAttemptBranchName = true;

            if (this.validBranchName()) {
                this.invalidBranchName = false;
                this.branchNameAlert = '';
                const data = {
                    _id: this.selectedBranch._id,
                    newBranchName: this.branchName
                };

                UserService.editBranchName(data)
                    .then(response => {
                        this.branchNameChanged = true;
                        this.branchNameAlert = response.data.msg;
                        console.log(response.data.msg);
                        this.$emit('retrieveBranches');
                    })
                    .catch(e => {
                        console.log(e.response);
                        this.invalidBranchName = true;
                        this.branchNameChanged = false;
                        this.branchNameAlert = e.response.data.msg;
                    });
            }
            else {
                this.invalidBranchName = true;
            }
        },

        resetBranchNameInputs() {
            this.branchName = '';
            this.invalidBranchName = false;
            this.branchNameAlert = '';
            this.submitAttemptBranchName = false;
            this.branchNameChanged = false;
        },

        resetBranchPasswordInputs() {
            this.branchPassword = '';
            this.branchRetypePassword = '';
            this.adminPassword = '';
            this.invalidBranchPassword = false;
            this.invalidAdminPassword = false;
            this.branchPasswordChanged = false;
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

                        <form class="mb-3" @submit.prevent="onSubmitBranchName" novalidate>
                            <fieldset>
                                <legend>Change Branch Name</legend>
                                <div class="form-floating mb-2">
                                    <input type="text"
                                        :class="{ 'form-control': true, 'is-invalid': invalidBranchName && submitAttemptBranchName, 'is-valid': branchNameChanged }"
                                        id="edit-branch-name" placeholder="Branch Name" v-model="branchName" required />
                                    <label for="edit-branch-name">Branch Name</label>
                                    <div class="valid-feedback">
                                        {{ branchNameAlert }}
                                    </div>
                                    <div class="invalid-feedback">
                                        {{ branchNameAlert }}
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
                                        :class="{ 'form-control': true, 'is-invalid': invalidBranchPassword && submitAttemptPassword, 'is-valid': branchPasswordChanged }"
                                        id="change-branch-password" placeholder="Branch Password"
                                        v-model="branchPassword" required />
                                    <label for="change-branch-password">New Branch Password</label>
                                    <div class="invalid-feedback">
                                        {{ branchPasswordAlert }}
                                    </div>
                                    <div class="valid-feedback">
                                        {{ branchPasswordAlert }}
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
                                    <input type="password"
                                        :class="{ 'form-control': true, 'is-invalid': invalidAdminPassword && submitAttemptPassword }"
                                        id="edit-branch-admin-password" placeholder="Admin Password"
                                        v-model="adminPassword" required />
                                    <label for="edit-branch-admin-password">Admin Password</label>
                                    <div class="invalid-feedback">
                                        {{ branchPasswordAlert }}
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
                </div>
            </div>
        </div>
    </div>
</template>