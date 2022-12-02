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
            chequeRecords: [],
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

        retrieveCheques() {
            RecordService.getAdminCheques()
                .then(response => {
                    console.log(response.data);
                    this.chequeRecords = response.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        addCheque(addedCheque) {
            let matchedBranch = this.branchOptions.find(branch => {
                return branch.branchName === addedCheque.branchName
            })

            let datetime = new Date(addedCheque.date + 'T00:00:00Z').toISOString()

            let newCheque = {
                datetime: datetime,
                amount: addedCheque.amount,
                branchID: matchedBranch.branchID,
                branchName: addedCheque.branchName,
                category: addedCheque.category,
                account: addedCheque.account
            }

            RecordService.addAdminCheque(newCheque)
                .then(response => {
                    console.log(response.data);
                    this.retrieveCheques(); // important for refreshing!
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

        editCheque(editedRecord) {

            let matchedBranch = this.branchOptions.find(branch => {
                return branch.branchName === editedRecord.branchName
            })

            let datetime = new Date(editedRecord.date + 'T00:00:00Z').toISOString()

            let newEdit = {
                id: editedRecord.id,
                account: editedRecord.account,
                branchID: matchedBranch.branchID, //based on branchName,
                branchName: editedRecord.branchName,
                amount: editedRecord.amount,
                category: editedRecord.category,
                datetime: datetime // from editedRecord.date
            }

            RecordService.editAdminCheque(newEdit)
                .then(response => {
                    console.log(response.data);
                    this.retrieveCheques(); // important for refreshing!
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
        },

        deleteCheque(id) {
            const data = {
                "id": id
            }
            RecordService.deleteAdminCheque(data)
                .then(response => {
                    console.log(response.data);
                    this.retrieveCheques(); // important for refreshing!
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },

    mounted() {
        this.retrieveSales();
        this.retrieveExpenses();
        this.retrieveCheques();
        this.retrieveBranches();
    },

}
</script>

<template>
    <div class="row">
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

    <div class="row">
        <div class="container-fluid">
            <RouterView :branch-options="this.branchOptions" :category-options="this.categoryOptions"
                :sales-records="this.salesRecords" :expense-records="this.expenseRecords"
                :cheque-records="this.chequeRecords" @add-cheque="addCheque" @edit-sales="editSales"
                @edit-expense="editExpense" @edit-cheque="editCheque" @delete-sales="deleteSales"
                @delete-expense="deleteExpense" @delete-cheque="deleteCheque" />
        </div>
    </div>
</template>