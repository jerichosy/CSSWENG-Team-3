<script setup>
import AdminNav from '../../components/admin/AdminNav.vue'
</script>

<template>
    <div class="container-fluid">
        <div class="row vh-100">
            <div class="col-md-3 col-lg-2 p-0">
                <AdminNav />
            </div>


            <div id="primary-view" class="col-md-9 col-lg-10 p-0 m-0">
                <div class="container-fluid">
                    <RouterView />
                </div>
            </div>
        </div>

    </div>
</template>