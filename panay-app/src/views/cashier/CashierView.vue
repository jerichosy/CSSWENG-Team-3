<script>
import MobileNav from '../../components/cashier/MobileNav.vue';
export default {
    components: {
        MobileNav
    }
}

</script>

<template>
    <RouterView />
    <MobileNav />
</template>

<style scoped>
#cashier-view-container {
    background-color: var(--bs-bgdefault);
}
</style>