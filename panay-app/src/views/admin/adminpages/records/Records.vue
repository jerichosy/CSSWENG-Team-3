<script>
import RecordService from '../../../../services/RecordService.js'
import UserService from '../../../../services/UserService.js'
import { computed } from 'vue'

// TODO: Fix Action buttons layout
// TODO: Use icons for edit and delete (and possibly filter)
export default {

    data() {
        return {
            salesRecords: [],
            expenseRecords: [],
            chequeRecords: [
                {
                    date: '2022-11-28',
                    amount: 1000.00,
                    branchName: 'Pag-asa QC',
                    category: 'Bakery Items',
                    account: 'MERALCO'
                }
            ],
            pageOptions: [{ title: "Sales", path: "sales" }, { title: "Expenses", path: "expenses" }],
            branchOptions: [],
            categoryOptions: [{ name: "Salary" }, { name: "Grocery" }, { name: "Utilities" },
            { name: "Food" }, { name: "Gasul" }, { name: "Bakery Items" },
            { name: "Rent" }, { name: "Misc." }, { name: "Taxes" }]
        }
    },

    provide() {
        return {
            branchOptions: computed(() => this.branchOptions),
            categoryOptions: computed(() => this.categoryOptions),
            salesRecords: computed(() => this.salesRecords),
            expenseRecords: computed(() => this.expenseRecords),
            chequeRecords: computed(() => this.chequeRecords)
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

        retrieveBranches() {
            UserService.getBranches()
                .then(response => {
                    this.branchOptions = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        retrieveSales() {
            RecordService.getAdminSales()
                .then(response => {
                    this.salesRecords = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        retrieveExpenses() {
            RecordService.getAdminExpenses()
                .then(response => {
                    this.expenseRecords = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        editSales(editedRecord) {
            let matchedBranch = this.branchOptions.find(branch => {
                console.log(branch.branchName, editedRecord.branchName)
                return branch.branchName === editedRecord.branchName
            })

            let datetime = new Date(editedRecord.date + 'T' + editedRecord.time + ':00Z').toISOString()

            let newEdit = {
                id: editedRecord.id,
                branchID: matchedBranch.branchID, //based on branchName,
                branchName: editedRecord.branchName,
                amount: editedRecord.amount,
                customerCount: editedRecord.customerCount,
                datetime: datetime // merge editedRecord.date and editedRecord.time
            }

            RecordService.editAdminSales(newEdit)
                .then(response => {
                    console.log(response.data);
                    this.retrieveSales(); // important for refreshing!
                })
                .catch(e => {
                    console.log(e);
                });
        },

        editExpense(editedRecord) {

            let matchedBranch = this.branchOptions.find(branch => {
                console.log(branch.branchName, editedRecord.branchName)
                return branch.branchName === editedRecord.branchName
            })

            let datetime = new Date(editedRecord.date + 'T00:00:00Z').toISOString()

            let newEdit = {
                id: editedRecord.id,
                branchID: matchedBranch.branchID, //based on branchName,
                branchName: editedRecord.branchName,
                amount: editedRecord.amount,
                item: editedRecord.item,
                category: editedRecord.category,
                notes: editedRecord.notes,
                datetime: datetime // from editedRecord.date
            }

            RecordService.editAdminExpense(newEdit)
                .then(response => {
                    console.log(response.data);
                    this.retrieveExpenses(); // important for refreshing!
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
                    this.retrieveExpenses(); // important for refreshing!
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },

    mounted() {
        this.retrieveSales();
        this.retrieveExpenses();
        this.retrieveBranches();
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
            <li class="nav-item">
                <RouterLink class="nav-link" :class="{ active: $route.name === 'cheques' }" to="cheques">Cheques
                </RouterLink>
            </li>
        </ul>
    </div>

    <div class="row container-fluid p-0 m-0">
        <RouterView :branch-options="this.branchOptions" :category-options="this.categoryOptions"
            :sales-records="this.salesRecords" :expense-records="this.expenseRecords"
            :cheque-records="this.chequeRecords" @edit-sales="editSales" @edit-expense="editExpense"
            @delete-sales="deleteSales" @delete-expense="deleteExpense" />
    </div>
</template>