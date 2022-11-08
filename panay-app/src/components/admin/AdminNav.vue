<script setup>
    import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
        <RouterLink to="/branches">Branches</RouterLink> <br/>
        <RouterLink to="/records">View Sales & Expenses</RouterLink><br/>
        <RouterLink to="/generate">Generate Reports</RouterLink><br/>
        <RouterLink to="/cheques">Add Cheque Expenses</RouterLink><br/>
        <RouterLink to="/editcategories">Edit Expense Categories</RouterLink><br/>
        <RouterLink to="/logout">Logout</RouterLink>
</template>