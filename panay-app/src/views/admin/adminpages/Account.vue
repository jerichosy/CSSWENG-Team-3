<script>
import UserService from '../../../services/UserService.js'
export default {
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            newPasswordRetyped: '',
            alertMessages: {
                oldPassword: '',
                newPassword: '',
                newPasswordRetyped: '',
                generic: ''
            }
        }
    },

    methods: {
        validateRetypedPassword() {
            if (this.newPassword !== this.newPasswordRetyped) {
                this.alertMessages.newPasswordRetyped = 'Please make sure the new passwords are the same on both fields.'
                return false;
            }
            else {
                this.alertMessages.newPasswordRetyped = ''
                return true;
            }
        },

        editAdminPassword() {
            this.resetAlertMessages();
            const data = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword
            };

            if (this.validateRetypedPassword()) {
                UserService.editAdminPassword(data)
                    .then(response => {
                        this.resetAlertMessages();
                        this.resetInputs();
                        this.alertMessages.generic = "Password successfully changed!"
                    })
                    .catch(e => {
                        const msg = e.response.data.msg;
                        const reason = e.response.data.reason;

                        switch (reason) {
                            case 'oldPassword':
                                this.alertMessages.oldPassword = msg;
                                break;
                            case 'newPassword':
                                this.alertMessages.newPassword = msg;
                                break;
                            default:
                                this.alertMessages.generic = msg;
                        }
                    })
            }
            else {
                console.log(this.alertMessages);
            }

        },

        resetInputs() {
            this.oldPassword = '';
            this.newPassword = '';
            this.newPasswordRetyped = '';
        },

        resetAlertMessages() {
            this.alertMessages = {
                oldPassword: '',
                newPassword: '',
                newPasswordRetyped: '',
                generic: ''
            };
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
        <form @click="resetAlertMessages" @submit.prevent="editAdminPassword" class="col-md-8 col-sm-12">
            <span class="text-success">{{ alertMessages.generic }}</span>
            <fieldset>
                <legend>Change Admin Password</legend>
                <div class="form-floating mb-2">
                    <input type="password"
                        :class="{ 'form-control': true, 'is-invalid': this.alertMessages.oldPassword }"
                        id="current-password" placeholder="Current Password" v-model="oldPassword" required
                        autocomplete />
                    <label for="current-password">Current Password</label>
                    <div class="invalid-feedback">
                        {{ alertMessages.oldPassword }}
                    </div>
                </div>

                <div class="form-floating mb-2">
                    <input type="password"
                        :class="{ 'form-control': true, 'is-invalid': this.alertMessages.newPassword }" id="
                        new-password" placeholder="New Password" minlength="6" v-model="newPassword" required
                        autocomplete="false" />
                    <label for="new-password">New Password</label>
                    <div class="invalid-feedback">
                        {{ alertMessages.newPassword }}
                    </div>
                </div>

                <div class="form-floating mb-2">
                    <input type="password"
                        :class="{ 'form-control': true, 'is-invalid': this.alertMessages.newPasswordRetyped }" id="
                        retype-password" placeholder="Retype New Password" minlength="6" v-model="newPasswordRetyped"
                        required autocomplete="false" />
                    <label for="retype-password">Retype New Password</label>
                    <div class="invalid-feedback">
                        {{ alertMessages.newPasswordRetyped }}
                    </div>
                </div>

                <div class="d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>

            </fieldset>

        </form>
    </div>



</template>