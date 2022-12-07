<script>
import MobileNav from '../../components/cashier/MobileNav.vue';
export default {
    components: {
        MobileNav
    }
}

</script>

<template>
    <div id="cashier-view-container" col="container-fluid bg-info">
        cashier view
        <MobileNav />
    </div>


</template>

<style scoped>
#cashier-view-container {
    background-color: rgb(224, 224, 224);
    height: 100vh;
}
</style>