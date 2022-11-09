<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <nav id="admin-sidebar" class="col-md-3 col-lg-2 p-0 sidebar text-white bg-primary">
        <span class="p-3 fs-4">Panay Tinapay</span>
        <hr>

        <ul class="nav flex-column">
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/a">Dashboard</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/records">Records</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/reports">Reports</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/branches">View Branches</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/cheques">Cheques</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/editcategories">Categories</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/a/account">Account</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link fw-bold" to="/logout">Logout</RouterLink>
            </li>  
        </ul>      
    </nav>


</template>

<style scoped>
    .nav-item:hover {
        background-color: #CC7066!important;
        transition: 0.3s!important;
    }
</style>