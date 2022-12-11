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