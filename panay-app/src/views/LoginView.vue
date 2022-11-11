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
        signUp() {
            const data = {
                'name': this.signupUsername,
                'password': this.signupPassword,
                'isadmin': this.signupIsAdmin
            };
            UserService.signup(data)
                .then(response => {
                    console.log(response.data.msg);
                    this.alert = response.data.msg;
                })
                .catch(e => {
                    console.log(e);
                    this.alert = e;
                });
        },

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
    <form method="POST">
        <input type="text" v-model="loginUsername" placeholder="Username" id="username" name="name" required />
        <input type="password" v-model="loginPassword" placeholder="Password" id="password" name="password" required />
        <button type="submit" @click="login">Login</button>
    </form>

    <p>{{ alert }}</p>

    <div>
        <input type="text" placeholder="Username" v-model="signupUsername" required name="name" />
        <input type="text" placeholder="Password" v-model="signupPassword" required name="password" />
        <input type="number" placeholder="isAdmin" v-model="signupIsAdmin" required name="isadmin" />
        <button @click="signUp">Sign Up</button>
    </div>

</template>