<script>
export default {
    data() {
        return {
            changePassword: {
                oldPassword: '',
                newPassword: '',
                newPasswordRetyped: ''
            },
            alertMessage: ''
        }
    },

    methods: {
        validatePassword() {
            // TODO: Validate old password. Show error from backend.
            // TODO: Check if new password is the same as the old password (taken from backend).
            // TODO: Submit password change if no problems.
            if (this.changePassword.newPassword !== this.changePassword.newPasswordRetyped) {
                this.alertMessage = 'Please make sure the new passwords are the same on both fields.'
            }
            else {
                this.alertMessage = ''
            }
        }
    }
}
</script>

<template>
    <div class="row">
        <h1 class="p-3 m-0">Admin Settings</h1>
        <hr />
    </div>

    <div class="row">
        {{ alertMessage }}
        <form class="col-md-8 col-sm-12">
            <fieldset>
                <legend>Change Admin Password</legend>
                <div class="form-floating mb-2">
                    <input type="password" class="form-control" id="current-password" placeholder="Current Password"
                        v-model="changePassword.oldPassword" />
                    <label for="current-password">Current Password</label>
                </div>

                <div class="form-floating mb-2">
                    <input type="password" class="form-control" id="new-password" placeholder="New Password"
                        v-model="changePassword.newPassword" />
                    <label for="new-password">New Password</label>
                </div>

                <div class="form-floating mb-2">
                    <input type="password" class="form-control" id="retype-password" placeholder="Retype New Password"
                        v-model="changePassword.newPasswordRetyped" />
                    <label for="retype-password">Retype New Password</label>
                </div>

                <div class="d-flex justify-content-end">
                    <button class="btn btn-primary" @click="validatePassword">Submit</button>
                </div>

            </fieldset>

        </form>
    </div>



</template>