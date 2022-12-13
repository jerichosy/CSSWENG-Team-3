<script>
import RecordItem from '../../components/cashier/RecordItem.vue'
import RecordService from '../../services/RecordService';
import ConfirmSubmitModal from '../../components/cashier/ConfirmSubmitModal.vue'
import { Modal } from 'bootstrap';

export default {
    inheritAttrs: false,
    components: {
        RecordItem,
        ConfirmSubmitModal
    },
    inject: {
        cashierSales: {
            from: 'cashierSales'
        },
        cashierExpenses: {
            from: 'cashierExpenses'
        }
    },
    emits: ['retrieveSales', 'retrieveExpenses'],

    computed: {
        sortedSales: function () {
            let sales = this.cashierSales;
            return sales.sort((a, b) => {
                let modifier = -1;
                if (a['datetime'] === undefined) return 1;
                if (b['datetime'] === undefined) return -1
                if (a['datetime'] < b['datetime']) return -1 * modifier;
                if (a['datetime'] > b['datetime']) return 1 * modifier;
                return 0
            })
        },

        runningTotalSales: function () {
            let tempTotal = this.totalSales;
            let first = true;
            return this.sortedSales.map((sales) => {
                if (first) {
                    const firstTotal = tempTotal;
                    tempTotal -= sales.amount;
                    return firstTotal;
                }
                return tempTotal -= sales.amount;
            });
        },

        totalSales: function () {
            return this.cashierSales.reduce((accumulator, currentValue) =>
                accumulator + currentValue.amount, 0
            );
        },

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

        runningTotalExpenses: function () {
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
        submitRecords() {
            RecordService.submitRecords(new URLSearchParams([['branchID', 101]]))
                .then((response) => {
                    this.closeSubmitModal();
                    this.$emit('retrieveSales');
                    this.$emit('retrieveExpenses');
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
        },

        closeSubmitModal() {
            let submitModalEl = document.getElementById('submitModal');
            let modal = Modal.getInstance(submitModalEl);
            modal.hide();
        }
    }
}
</script>

<template>
    <ConfirmSubmitModal @submit="submitRecords" />
    <div id="review-container" class="container">
        <div class="row justify-content-center bg-bgdefault p-2 sticky-top">
            <div class="col my-auto">
                <h1>Review & Submit</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Sales: <span class="text-sale">₱{{ totalSales.toFixed(2) }}</span></p>
                <p class="h5 align-middle">Total Expenses: <span class="text-expense">₱{{ totalExpenses.toFixed(2)
                }}</span></p>

            </div>
            <div class="col my-auto text-end">
                <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#submitModal">Submit</button>
            </div>
        </div>


        <div class="row-cols-1 mb-5 justify-content-center">
            <h2 class="text-sale">Sales</h2>
            <template v-for="(sales, index) in sortedSales">
                <RecordItem record-type="sales" :record="sales">
                    <template #runningTotal>
                        (₱{{ runningTotalSales[index].toFixed(2) }})
                    </template>
                </RecordItem>
            </template>
        </div>

        <div class="row-cols-1 justify-content-center">
            <h2 class="text-expense">Expenses</h2>
            <template v-for="(expense, index) in sortedExpenses">
                <RecordItem record-type="expenses" :record="expense">
                    <template #runningTotal>
                        (₱{{ runningTotalExpenses[index].toFixed(2) }})
                    </template>
                </RecordItem>
            </template>
        </div>

    </div>
</template>