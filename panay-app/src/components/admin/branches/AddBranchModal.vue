<script>
// FIXME: Reset forms when outside of modal is clicked

import { Modal } from 'bootstrap';
export default {

    inject: {
        branches: {
            from: 'branches'
        }
    },
    emits: ['addBranch'],

    data() {
        return {
            branch: {
                branchName: '',
                branchPassword: '',
                branchRetypePassword: '',
            },
            submitAttempt: false,
            valid: false,
            alertMessages: {
                branchName: '',
                branchPassword: '',
                branchRetypePassword: ''
            }
        }
    },

    methods: {
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
            if (this.branch.branchPassword.length < 6) {
                this.alertMessages.branchPassword = 'Please enter a password with a minimum of 6 characters.';
                return false;
            }

            this.alertMessages.branchPassword = '';
            return true;
        },
        samePassword() {
            if (this.branch.branchPassword !== this.branch.branchRetypePassword) {
                this.alertMessages.branchRetypePassword = 'The passwords do not match.'
                return false;
            }

            return true;
        },

        onSubmit() {
            this.submitAttempt = true;
            if (this.validBranchName() && this.validPassword() && this.samePassword()) {
                this.valid = true;
                const addModalEl = document.getElementById('addModal');
                const modal = Modal.getInstance(addModalEl);
                modal.hide();
                this.$emit('addBranch', this.branch);
                this.resetInputs();
            }
        },

        resetInputs() {
            this.branch.branchName = '';
            this.branch.branchPassword = '';
            this.branch.branchRetypePassword = '';
            this.submitAttempt = false;
            this.valid = false;
            this.alertMessages.branchName = '';
            this.alertMessages.branchPassword = '';
            this.alertMessages.branchRetypePassword = '';
        }
    }
}

</script>

<template>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="onSubmit" novalidate>

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addModalLabel">Add New Branch</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <!-- Modal Body -->
                    <div class="modal-body">
                        <div class="container-fluid">
                            <!-- Branch Name Input -->
                            <div class="form-floating mb-2">
                                <input type="text"
                                    :class="{ 'form-control': true, 'is-invalid': !validBranchName() && submitAttempt }"
                                    id="branch-name" placeholder="Branch Name" v-model="branch.branchName" required />
                                <label for="branch-name">Branch Name</label>
                                <div class="invalid-feedback">
                                    {{ alertMessages.branchName }}
                                </div>
                            </div>
                            <!-- Branch Password Input -->
                            <div class="form-floating mb-2">
                                <input type="password"
                                    :class="{ 'form-control': true, 'is-invalid': !validPassword() && submitAttempt }"
                                    id="branch-password" placeholder="Branch Password" v-model="branch.branchPassword"
                                    required />
                                <label for="branch-password">Branch Password</label>
                                <div class="invalid-feedback">
                                    {{ alertMessages.branchPassword }}
                                </div>
                            </div>
                            <!-- Retype Branch Password Input -->
                            <div class="form-floating">
                                <input type="password"
                                    :class="{ 'form-control': true, 'is-invalid': !samePassword() && submitAttempt }"
                                    @blur="branchRetypePasswordBlurred = true" id="retype-branch-password"
                                    placeholder="Re-type Branch Password" v-model="branch.branchRetypePassword"
                                    required />
                                <label for="retype-branch-password">Re-type Branch Password</label>
                                <div class="invalid-feedback">
                                    {{ alertMessages.branchRetypePassword }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal Footer -->
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal"
                            @click="resetInputs">Close</button>
                        <button type="submit" class="btn btn-primary">Add Branch</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>