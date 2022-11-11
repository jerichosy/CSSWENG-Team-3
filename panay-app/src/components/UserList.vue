<script>
// For debugging HTTP Requests, delete in prod
import UserService from "../services/UserService";

export default {
    data() {
        return {
            users: [],
            currentUser: null,
            currentIndex: -1,
            title: ""
        };
    },
    methods: {
        retrieveUsers() {
            UserService.getAll()
                .then(response => {
                    this.users = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });

        },

        refreshList() {
            this.retrieveUsers();
            this.currentUser = null;
            this.currentIndex = -1;
        }
    },
    mounted() {
        this.retrieveUsers();
    }
}
</script>

<template>
    <h4>User List</h4>
    <ul>
        <li v-for="(user, index) in users" :key="index">
            {{ user }}
        </li>
    </ul>
</template>