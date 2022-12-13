<script>
import MobileNav from '../../components/cashier/MobileNav.vue';
export default {
    components: {
        MobileNav
    },

    provide() {
        return {
            categoryOptions: [{ name: "Salary" }, { name: "Grocery" }, { name: "Utilities" },
            { name: "Food" }, { name: "Gasul" }, { name: "Bakery Items" },
            { name: "Rent" }, { name: "Misc." }, { name: "Taxes" }]
        }
    },
}

</script>

<template>
    <RouterView />
    <!-- FIXME: Last record in cashier view sales/expense is blocked by navbar when list is filled  -->
    <MobileNav />
</template>

<style scoped>
#cashier-view-container {
    background-color: var(--bs-bgdefault);
}
</style>