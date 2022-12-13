<script>

</script>

<template>
    <ul id="mobile-nav" class="nav nav-fill fixed-bottom justify-content-center btn-group bg-white">
        <li class="nav-item">
            <RouterLink class="nav-link" to="/cashier/home">
                <i class="material-icons">
                    home
                </i>
                <br />
                <span>Home</span>
            </RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="/cashier/sales">
                <i class="material-icons">money</i>
                <br />
                <span>Sales</span>
            </RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="/cashier/expenses">
                <i class="material-icons">account_balance_wallet</i>
                <br />
                <span>Expenses</span>
            </RouterLink>
        </li>
        <li class="nav-item">
            <RouterLink class="nav-link" to="/cashier/review">
                <i class="material-icons">check_circle_outline</i>
                <br />
                <span>Review</span>
            </RouterLink>
        </li>
    </ul>
</template>

<style scoped>
#mobile-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 5;
}

.nav-link {
    --bs-nav-link-color: var(--bs-primary);
    --bs-nav-link-hover-color: var(--bs-primaryhover);
}
</style>