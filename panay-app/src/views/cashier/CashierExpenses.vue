<script>
import RecordItem from '../../components/cashier/RecordItem.vue'
import AddRecordModalCashier from '../../components/cashier/AddRecordModalCashier.vue'
import RecordService from '../../services/RecordService'

export default {
    components: {
        RecordItem,
        AddRecordModalCashier
    },

    data() {
        return {
            cashierExpenses: []
        }
    },

    computed: {

        sortedExpenses: function () {
            let expenses = this.cashierExpenses;
            return expenses.sort((a, b) => {
                let modifier = -1;
                if (a['datetime'] === undefined) return 1;
                if (b['datetime'] === undefined) return -1
                if (a['datetime'] < b['datetime']) return -1 * modifier;
                if (a['datetime'] > b['datetime']) return 1 * modifier;
                return 0
            })
        },

        runningTotal: function () {
            let tempTotal = this.totalExpenses;
            let first = true;
            return this.sortedExpenses.map((expense) => {
                if (first) {
                    const firstTotal = tempTotal;
                    tempTotal -= expense.amount;
                    return firstTotal;
                }
                return tempTotal -= expense.amount;
            });
        },

        totalExpenses: function () {
            return this.cashierExpenses.reduce((accumulator, currentValue) =>
                accumulator + currentValue.amount, 0
            );
        },
    },

    methods: {
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
        this.retrieveExpenses();
    }
}
</script>

<template>
    <AddRecordModalCashier record-type="expense" />
    <div id="expenses-container" class="container">
        <div class="row justify-content-center bg-bgdefault p-2 sticky-top">
            <div class="col my-auto">
                <h1>Expenses</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Expenses: <span class="text-expense">₱{{ totalExpenses.toFixed(2)
                }}</span></p>
            </div>
            <div class="col my-auto text-end">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#addModal">Add</button>
            </div>
        </div>


        <div class="row-cols-1 m-1 justify-content-center">
            <template v-for="(expense, index) in sortedExpenses">
                <RecordItem record-type="expenses" :record="expense">
                    <template #runningTotal>
                        (₱{{ runningTotal[index].toFixed(2) }})
                    </template>
                </RecordItem>
            </template>

        </div>

    </div>
</template>