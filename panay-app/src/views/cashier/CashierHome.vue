<script>
import UserService from '../../services/UserService.js';
export default {
    inheritAttrs: false,
    data() {
        return {
            loggedUser: {
                branchID: '',
                branchName: ''
            },
            currentTime: new Date()
        }

    },

    methods:
    {
        displayUserInfo() {
            UserService.viewLoggedIn()
                .then(response => {
                    const branch = response.data.user;
                    this.loggedUser.branchID = branch.branchID;
                    this.loggedUser.branchName = branch.branchName;
                })
                .catch(e => {
                    console.log(e);
                })
        },

        logout() {
            UserService.logout()
                .then(response => {
                    this.$router.push('/login');
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    },

    created() {
        this.displayUserInfo();
    }

}
</script>

<template>
    <div class="container">
        <div class="card mt-5">
            <div class="card-body">
                <div class="text-primary">
                    <h1 class="card-title">{{ this.loggedUser.branchName }}</h1>
                    <h3>Branch ID: {{ this.loggedUser.branchID }}</h3>
                </div>
                {{ currentTime }}
            </div>
            <div class="card-footer">
                <button class="btn btn-danger" @click="logout">Logout</button>
            </div>

        </div>
    </div>
</template>