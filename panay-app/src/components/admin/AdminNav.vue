<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
    <nav id="admin-sidebar" class="col-md-3 col-lg-2 sidebar text-white bg-primary">
        <span class="fs-4">Panay Tinapay</span>
        <hr>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/a">Dashboard</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/records">Records</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/reports">Reports</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/branches">View Branches</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/cheques">Cheques</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/editcategories">Categories</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/a/account">Account</RouterLink>
        </div>
        <div class="nav-item">
            <RouterLink class="nav-link" to="/logout">Logout</RouterLink>
        </div>        
    </nav>


</template>

<style>

</style>