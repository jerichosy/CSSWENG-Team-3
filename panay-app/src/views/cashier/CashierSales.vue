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
            cashierSales: []
        }
    },

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

        runningTotal: function () {
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
    },

    methods: {
        retrieveSales() {
            // set URLSearchParams to get branchID from session cookie
            RecordService.getCashierSales(new URLSearchParams([['branchID', 101]]))
                .then((response) => {
                    this.cashierSales = response.data;
                    console.log(response);
                })
                .catch(e => {
                    console.log(e.response.data.msg);
                })
        }
    },

    mounted() {
        this.retrieveSales();
    }
}
</script>

<template>
    <AddRecordModalCashier record-type="sales" />
    <div id="sales-container" class="container">
        <div class="row justify-content-center p-2 sticky-top">
            <div class="col my-auto">
                <h1>Sales</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Sales: <span class="text-sale">₱{{ totalSales.toFixed(2) }}</span></p>
            </div>
            <div class="col my-auto text-end">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#addModal">Add</button>
            </div>
        </div>

        <div class="row-cols-1 m-1 justify-content-center">
            <template v-for="(sales, index) in sortedSales">
                <RecordItem record-type="sales" :record="sales">
                    <template #runningTotal>
                        (₱{{ runningTotal[index].toFixed(2) }})
                    </template>
                </RecordItem>
            </template>

        </div>

    </div>
</template>