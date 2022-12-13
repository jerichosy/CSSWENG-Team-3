<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav id="admin-sidebar" class="col-md-3 col-lg-2 p-0 sidebar text-white bg-primary">
        <span class="p-3 fs-4">Panay Tinapay</span>
        <hr>
        <ul class="nav flex-column fs-5 fw-bold">
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/home">
                    <i class="material-icons-outlined">home</i>
                    <span class="ps-2">Home</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/records">
                    <i class="material-icons-outlined">book</i>
                    <span class="ps-2">Records</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/reports">
                    <i class="material-icons-outlined">bar_chart</i>
                    <span class="ps-2">Reports</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/branches">
                    <i class="material-icons-outlined">warehouse</i>
                    <span class="ps-2">View Branches</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/account">
                    <i class="material-icons-outlined">person</i>
                    <span class="ps-2">Admin Settings</span>
                </RouterLink>
            </li>
        </ul>


        <div class="nav flex-column fs-5 fw-bold position-absolute bottom-0 w-100">
            <RouterLink class="nav-link nav-item d-flex" to="/login">
                <i class="material-icons-outlined">logout</i>
                <span class="ps-2">Logout</span>
            </RouterLink>
        </div>
    </nav>


</template>

<style scoped>
.nav-item:hover {
    background-color: #CC7066 !important;
    transition: 0.3s !important;
}

.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
}

i {
    font-size: 36px;
}
</style>