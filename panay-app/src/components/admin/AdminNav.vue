<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <nav id="admin-sidebar" class="col-md-3 col-lg-2 p-0 sidebar text-white bg-primary">
        <span class="p-3 fs-4">Panay Tinapay</span>
        <hr>
        <ul class="nav flex-column fs-5 fw-bold">
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/dashboard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-activity">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                    </svg>
                    <span class="ps-2">Dashboard</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/records">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-book">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    <span class="ps-2">Records</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/reports">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-bar-chart-2">
                        <line x1="18" y1="20" x2="18" y2="10"></line>
                        <line x1="12" y1="20" x2="12" y2="4"></line>
                        <line x1="6" y1="20" x2="6" y2="14"></line>
                    </svg>
                    <span class="ps-2">Reports</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/branches">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-home">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span class="ps-2">View Branches</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/categories">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-archive">
                        <polyline points="21 8 21 21 3 21 3 8"></polyline>
                        <rect x="1" y="3" width="22" height="5"></rect>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                    </svg>
                    <span class="ps-2">Categories</span>
                </RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link d-flex" to="/admin/account">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="feather feather-user">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span class="ps-2">Account</span>
                </RouterLink>
            </li>
        </ul>


        <div class="nav flex-column fs-5 fw-bold position-absolute bottom-0 w-100">
            <RouterLink class="nav-link nav-item d-flex" to="/login">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                    class="feather feather-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
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
</style>