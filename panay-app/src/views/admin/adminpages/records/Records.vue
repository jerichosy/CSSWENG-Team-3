<script>
import RecordService from '../../../../services/RecordService.js'

export default {

    data() {
        return {
            // {
            //         date: '2022-03-04',
            //         time: '08:00',
            //         amount: 1200.05,
            //         customerCount: 10,
            //         branch: 'Paligsahan'
            //     },
            //     {
            //         date: '2022-02-03',
            //         time: '09:00',
            //         amount: 1300.00,
            //         customerCount: 12,
            //         branch: 'Paligsahan'
            //     },
            //     {
            //         date: '2022-01-02',
            //         time: '21:00',
            //         amount: 1300.00,
            //         customerCount: 12,
            //         branch: 'Makati'
            //     }
            // {
            //         date: '2022-02-01',
            //         itemName: 'Butter',
            //         amount: 800.00,
            //         category: 'Bakery Items',
            //         branch: 'Paligsahan',
            //         notes: 'bought in puregold'
            //     },
            //     {
            //         date: '2022-01-01',
            //         itemName: 'Flax',
            //         amount: 500.00,
            //         category: 'Salary',
            //         branch: 'Paligsahan',
            //         notes: 'palengke'
            //     },
            //     {
            //         date: '2022-01-01',
            //         itemName: 'Flour',
            //         amount: 500.00,
            //         category: 'Bakery Items',
            //         branch: 'Makati',
            //         notes: 'palengke'
            //     }
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
        }


    },

    mounted() {
        this.retrieveSales();
        this.retrieveExpenses();
    }
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
            :sales-records="this.salesRecords" :expense-records="this.expenseRecords" />
    </div>
</template>