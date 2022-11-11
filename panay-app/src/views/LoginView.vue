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
            created: ''
        }
    },
    methods: {
        signUp() {
            const data = {
                'name': this.signupUsername,
                'password': this.signupPassword,
                'isadmin': this.signupIsAdmin
            };
            UserService.signup(data);
        },

        login() {
            const data = {
                'name': this.loginUsername,
                'password': this.loginPassword
            }
            UserService.login(data);
        }
    }
}
</script>

<template>
    <div>
        <input type="text" v-model="loginUsername" placeholder="Username" id="username" name="name" required />
        <input type="text" v-model="loginPassword" placeholder="Password" id="password" name="password" required />
        <button @click="login">Login</button>
    </div>

    <div>
        <input type="text" placeholder="Username" v-model="signupUsername" required name="name" />
        <input type="text" placeholder="Password" v-model="signupPassword" required name="password" />
        <input type="number" placeholder="isAdmin" v-model="signupIsAdmin" required name="isadmin" />
        <button @click="signUp">Sign Up</button>
    </div>

    <p>{{ created }}</p>

</template>