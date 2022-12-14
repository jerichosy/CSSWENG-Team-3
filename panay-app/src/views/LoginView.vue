<script>
import UserService from '../services/UserService';

export default {
    data() {
        return {
            loginID: '',
            loginPassword: '',
            idError: false,
            passwordError: false,
            alertMsg: '',
            isAdmin: false
        }
    },
    methods: {
        login() {
            const data = {
                'name': this.loginID,
                'password': this.loginPassword
            }

            this.idError = false;
            this.passwordError = false;

            console.log(data);
            UserService.login(data)
                .then(response => {
                    console.log(response.data.msg);
                    if (response.data.isAdmin) {
                        this.isAdmin = response.data.user.isAdmin;
                        this.$router.push('/admin');
                    }
                    else {
                        this.$router.push('/cashier');
                    }
                })
                .catch(e => {
                    console.log(e.response.data);

                    if (e.response.data.error === 'id')
                        this.idError = true;
                    else if (e.response.data.error === 'password')
                        this.passwordError = true;

                    this.alertMsg = e.response.data.msg;
                });
        }
    },
}
</script>

<template>
    <div class="container d-flex justify-content-center center-div align-items-center">
        <div class="col-lg-5 col-md-8 col-sm-11 col-11">
            <h1 class="text-primary">Panay Tinapay</h1>
            <form @submit.prevent="login()">
                <div class="form-floating mb-2">
                    <input type="text" :class="{ 'form-control': true, 'is-invalid': idError }" id="login-id"
                        placeholder="Password" v-model="loginID" required autocomplete />
                    <label for="login-password">Branch ID</label>
                    <div class="invalid-feedback">
                        {{ alertMsg }}
                    </div>
                </div>
                <div class="form-floating mb-2">
                    <input type="password" :class="{ 'form-control': true, 'is-invalid': passwordError }"
                        id="login-password" placeholder="Password" v-model="loginPassword" required autocomplete />
                    <label for="login-password">Password</label>
                    <div class="invalid-feedback">
                        {{ alertMsg }}
                    </div>
                </div>
                <button class="btn btn-primary col-12" type="submit">Login</button>
            </form>
        </div>


    </div>

</template>

<style scoped>
.center-div {
    min-height: 100vh;
}
</style>