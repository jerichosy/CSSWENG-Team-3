<script>
import { computed } from '@vue/reactivity';
import MobileNav from '../../components/cashier/MobileNav.vue';
import RecordService from '../../services/RecordService';
export default {
    components: {
        MobileNav
    },
    provide() {
        return {
            categoryOptions: [{ name: "Salary" }, { name: "Grocery" }, { name: "Utilities" },
            { name: "Food" }, { name: "Gasul" }, { name: "Bakery Items" },
            { name: "Rent" }, { name: "Misc." }, { name: "Taxes" }],

            cashierSales: computed(() => this.cashierSales),
            cashierExpenses: computed(() => this.cashierExpenses)
        }
    },

    data() {
        return {
            cashierSales: [],
            cashierExpenses: []
        }
    },

    methods: {
        retrieveSales() {
            // set URLSearchParams to get branchID from session cookie
            RecordService.getCashierSales(new URLSearchParams([['branchID', 101]]))
                .then((response) => {
                    this.cashierSales = response.data;
                })
                .catch(e => {
                    console.log(e.response.data.msg);
                })
        },

        retrieveExpenses() {
            // set URLSearchParams to get branchID from session cookie
            RecordService.getCashierExpenses(new URLSearchParams([['branchID', 101]]))
                .then((response) => {
                    this.cashierExpenses = response.data;
                })
                .catch(e => {
                    console.log(e.response.data.msg);
                })
        }
    },

    mounted() {
        this.retrieveSales();
        this.retrieveExpenses();
    }
}

</script>

<template>
    <RouterView @retrieve-sales="retrieveSales" @retrieve-expenses="retrieveExpenses" />
    <!-- FIXME: Last record in cashier view sales/expense is blocked by navbar when list is filled  -->
    <MobileNav />
</template>

<style scoped>
#cashier-view-container {
    background-color: var(--bs-bgdefault);
}
</style>