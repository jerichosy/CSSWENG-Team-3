<script setup>
import AdminNav from '../../components/admin/AdminNav.vue'
</script>

<template>
    <div class="container-fluid">
        <div class="row vh-100">
            <div class="col-md-3 col-lg-2 p-0">
                <AdminNav />
            </div>
                

            <div id="primary-view" class="container-fluid col-md-9 col-lg-10 p-0 m-0">
                <RouterView />
            </div>
        </div>
        
    </div>
</template>