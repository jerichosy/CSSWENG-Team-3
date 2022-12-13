<script>
import RecordItem from '../../components/cashier/RecordItem.vue'
import AddRecordModalCashier from '../../components/cashier/AddRecordModalCashier.vue'

export default {
    components: {
        RecordItem,
        AddRecordModalCashier
    },

    data() {
        return {
            cashierExpenses: [
                {
                    branchID: 101,
                    branchName: "Panay Avenue Paligsahan QC",
                    datetime: "2022-10-01T07:00:42.389Z",
                    item: "LPG",
                    category: "Gasul",
                    amount: 2458,
                    notes: "John's LPG"
                },
                {
                    branchID: 101,
                    branchName: "Panay Avenue Paligsahan QC",
                    datetime: "2022-10-01T08:00:42.389Z",
                    item: "Salt",
                    category: "Grocery",
                    amount: 281,
                    notes: "Puregold"
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-01T09:00:42.389Z",
                    "item": "Orange Juice",
                    "category": "Food",
                    "amount": 1534,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-02T07:00:42.389Z",
                    "item": "Sugar",
                    "category": "Grocery",
                    "amount": 423,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-02T08:00:42.389Z",
                    "item": "Aluminum Foil",
                    "category": "Bakery Items",
                    "amount": 206,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-02T09:00:42.389Z",
                    "item": "Milk",
                    "category": "Grocery",
                    "amount": 1979,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-03T07:00:42.389Z",
                    "item": "Ice",
                    "category": "Grocery",
                    "amount": 313,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-03T08:00:42.389Z",
                    "item": "Plastic Bag",
                    "category": "Bakery Items",
                    "amount": 491,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-03T09:00:42.389Z",
                    "item": "Yeast",
                    "category": "Grocery",
                    "amount": 136,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-04T07:00:42.389Z",
                    "item": "Chocolate",
                    "category": "Grocery",
                    "amount": 2061,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-04T08:00:42.389Z",
                    "item": "Water",
                    "category": "Utilities",
                    "amount": 1753,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-04T09:00:42.389Z",
                    "item": "Tape",
                    "category": "Misc.",
                    "amount": 58,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-05T07:00:42.389Z",
                    "item": "Baking Paper",
                    "category": "Bakery Items",
                    "amount": 38,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-05T08:00:42.389Z",
                    "item": "Rolling Pin",
                    "category": "Bakery Items",
                    "amount": 1231,
                    "notes": ""
                },
                {
                    "branchID": 101,
                    "branchName": "Panay Avenue Paligsahan QC",
                    "datetime": "2022-10-05T09:00:42.389Z",
                    "item": "Flour",
                    "category": "Grocery",
                    "amount": 605,
                    "notes": ""
                }
            ]
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