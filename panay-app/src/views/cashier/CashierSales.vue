<script>
import RecordItem from '../../components/cashier/RecordItem.vue'

export default {
    components: {
        RecordItem
    },

    data() {
        return {
            cashierSales: [
                {
                    branchID: '101',
                    branchName: 'Panay Avenue Paligsahan QC',
                    amount: 1400.50,
                    customerCount: 27,
                    datetime: "2022-10-01T07:00:42.389+00:00"
                },
                {
                    branchID: '101',
                    branchName: 'Panay Avenue Paligsahan QC',
                    amount: 400.00,
                    customerCount: null,
                    datetime: "2022-10-01T08:00:42.389+00:00"
                }
            ]
        }
    },

    computed: {
        runningTotal: function () {
            let tempTotal = 0;
            return this.cashierSales.map((sales) => {
                return tempTotal += sales.amount;
            });
        },

        totalSales: function () {
            return this.runningTotal[this.runningTotal.length - 1];
        }
    }
}
</script>

<template>
    <div id="sales-container" class="container">
        <div class="row justify-content-center p-2">
            <div class="col my-auto">
                <h1>Sales</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Sales: ₱{{ totalSales.toFixed(2) }}</p>
            </div>
            <div class="col my-auto text-end">
                <button class="btn btn-primary">Add</button>
            </div>
        </div>

        <div class="row-cols-1 m-1 justify-content-center">
            <template v-for="(sales, index) in cashierSales">
                <RecordItem record-type="sales" :record="sales">
                    <template #runningTotal>
                        (₱{{ runningTotal[index].toFixed(2) }})
                    </template>
                </RecordItem>
            </template>

        </div>

    </div>
</template>