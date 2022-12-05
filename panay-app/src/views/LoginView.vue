<script>
import UserService from '../services/UserService';

export default {
    data() {
        return {
            loginUsername: '',
            loginPassword: '',
            signupUsername: '',
            signupPassword: '',
            signupIsAdmin: 0,
            alert: ''
        }
    },
    methods: {
        login() {
            const data = {
                'name': this.loginUsername,
                'password': this.loginPassword
            }
            UserService.login(data)
                .then(response => {
                    console.log(response.data.msg);
                    this.alert = response.data.msg;
                })
                .catch(e => {
                    console.log(e);
                    this.alert = e;
                });
        }
    }
}
</script>

<template>
    <div class="container d-flex justify-content-center center-div align-items-center">
        <div class="col-lg-5 col-md-8 col-sm-11 col-11">
            <h1 class="text-primary">Panay Tinapay</h1>
            <form>
                <div class="form-floating mb-2">
                    <input type="text" :class="{ 'form-control': true, 'is-invalid': false }" id="login-id"
                        placeholder="Password" v-model="loginUsername" required autocomplete />
                    <label for="login-password">Branch ID</label>
                    <div class="invalid-feedback">
                        This ID does not exist. Please try again.
                    </div>
                </div>
                <div class="form-floating mb-2">
                    <input type="password" :class="{ 'form-control': true, 'is-invalid': false }" id="login-password"
                        placeholder="Password" v-model="loginPassword" required autocomplete />
                    <label for="login-password">Password</label>
                    <div class="invalid-feedback">
                        The password is incorrect. Please try again.
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