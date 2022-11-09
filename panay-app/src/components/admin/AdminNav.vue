<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <nav id="admin-navbar" class="d-lg-flex flex-column flex-shrink-0 p-3 text-secondary bg-primary">
        <span class="fs-4">Panay Tinapay</span>
        <hr>
        <RouterLink class="nav-link" to="/a">Dashboard</RouterLink>
        <RouterLink class="nav-link" to="/records">Records</RouterLink>
        <RouterLink class="nav-link" to="/reports">Reports</RouterLink>
        <RouterLink class="nav-link" to="/branches">View Branches</RouterLink>
        <RouterLink class="nav-link" to="/cheques">Cheques</RouterLink>
        <RouterLink class="nav-link" to="/editcategories">Categories</RouterLink>
        <RouterLink class="nav-link" to="/a/account">Account</RouterLink>
        <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
    </nav>



</template>

<style>
    #admin-navbar {
        width:280px;
    }
</style>