<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
        <RouterLink to="/branches">Branches</RouterLink>
        <RouterLink to="/records">View Sales & Expenses</RouterLink>
        <RouterLink to="/generate">Generate Reports</RouterLink>
        <RouterLink to="/cheques">Add Cheque Expenses</RouterLink>
        <RouterLink to="/editcategories">Edit Expense Categories</RouterLink>
        <RouterLink to="/login">Logout</RouterLink>
</template>