<script>
import { computed } from '@vue/reactivity';
import MobileNav from '../../components/cashier/MobileNav.vue';
import RecordService from '../../services/RecordService';
import { Modal } from 'bootstrap';

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
            RecordService.getCashierSales()
                .then((response) => {
                    this.cashierSales = response.data;
                })
                .catch(e => {
                    console.log(e.response.data.msg);
                })
        },

        retrieveExpenses() {
            // set URLSearchParams to get branchID from session cookie
            RecordService.getCashierExpenses()
                .then((response) => {
                    this.cashierExpenses = response.data;
                })
                .catch(e => {
                    console.log(e.response.data.msg);
                })
        },

        closeDeleteModal() {
            let deleteModalEl = document.getElementById('deleteModal');
            let modal = Modal.getInstance(deleteModalEl);
            modal.hide();
        }
    },

    mounted() {
        this.retrieveSales();
        this.retrieveExpenses();
    }
}

</script>

<template>
    <RouterView @retrieve-sales="retrieveSales" @retrieve-expenses="retrieveExpenses"
        @close-delete-modal="closeDeleteModal" />
    <MobileNav />
</template>

<style scoped>
#cashier-view-container {
    background-color: var(--bs-bgdefault);
}
</style>