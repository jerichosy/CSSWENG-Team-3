<script>
import RecordService from '../../../../services/RecordService.js'

export default {

    data() {
        return {
            salesRecords: [],
            expenseRecords: [],
            pageOptions: [{ title: "Sales", path: "sales" }, { title: "Expenses", path: "expenses" }],
            branchOptions: [{ branchName: "Paligsahan" }, { branchName: "Manila" }, { branchName: "QC" }, { branchName: "Makati" }, { branchName: "Mandaluyong" }],
            categoryOptions: [{ name: "Salary" }, { name: "Grocery" }, { name: "Utilities" },
            { name: "Food" }, { name: "Gasul" }, { name: "Bakery Items" },
            { name: "Rent" }, { name: "Misc." }, { name: "Taxes" }]
        }
    },

    computed: {
        currentPage() {
            if (this.$route.name === 'sales')
                return 'Sales'
            else if (this.$route.name === 'expenses')
                return 'Expenses'
        }
    },

    methods: {
        retrieveSales() {
            RecordService.getAdminSales()
                .then(response => {
                    this.salesRecords = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        retrieveExpenses() {
            RecordService.getAdminExpenses()
                .then(response => {
                    this.expenseRecords = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteSales(id) {
            const data = {
                "id": id
            }
            RecordService.deleteAdminSales(data)
                .then(response => {
                    console.log(response.data);
                    this.retrieveSales();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteExpense(id) {
            const data = {
                "id": id
            }
            RecordService.deleteAdminExpense(data)
                .then(response => {
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });

            this.retrieveExpenses();
        }


    },

    mounted() {
        this.retrieveSales();
        this.retrieveExpenses();
    },

}
</script>

<template>
    <div class="row p-0 m-0">
        <ul class="nav nav-tabs bg-primary">
            <li class="nav-item">
                <RouterLink class="nav-link" :class="{ active: $route.name === 'sales' }" to="sales">Sales</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" :class="{ active: $route.name === 'expenses' }" to="expenses">Expenses
                </RouterLink>
            </li>
        </ul>
    </div>

    <div class="row container-fluid p-0 m-0">
        <RouterView :branch-options="this.branchOptions" :category-options="this.categoryOptions"
            :sales-records="this.salesRecords" :expense-records="this.expenseRecords" @delete-sales="deleteSales"
            @delete-expense="deleteExpense" />
    </div>
</template>