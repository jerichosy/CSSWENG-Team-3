<script>
import FilterMenu from '../../../../components/admin/records/FilterMenu.vue'

export default {
    data(){
        return {
            expenseRecords: [
            {
                    date: '2022-02-01',
                    itemName: 'Butter',
                    amount: 800.00,
                    category: 'Bakery Items',
                    branch: 'Paligsahan',
                    notes: 'bought in puregold'
            },
            {
                    date: '2022-01-01',
                    itemName: 'Flax',
                    amount: 500.00,
                    category: 'Salary',
                    branch: 'Paligsahan',
                    notes: 'palengke'
            },
            {
                    date: '2022-01-01',
                    itemName: 'Flour',
                    amount: 500.00,
                    category: 'Bakery Items',
                    branch: 'Makati',
                    notes: 'palengke'
            }
            ],
            filters: {
                dateFrom: '',
                dateTo: '',
                timeFrom: '',
                timeTo: '',
                itemSearch: '',
                checkedBranches: [],
                checkedCategories: []
            }
        }
    },

    computed: {
        filteredExpenses() {
            let filteredExpenseRecords = this.expenseRecords

            if (this.filters.itemSearch.length) {
                filteredExpenseRecords =  filteredExpenseRecords.filter((record) => this.searchItem(record, this.filters.itemSearch))
            }

            if (this.filters.checkedBranches.length) {
                filteredExpenseRecords =  filteredExpenseRecords.filter(record => record.branch === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branch)])
            }

            if (this.filters.dateFrom.length && this.filters.dateTo.length) {
                filteredExpenseRecords = filteredExpenseRecords.filter( (record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))
                filteredExpenseRecords = filteredExpenseRecords.filter( (record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))
            }

            if (this.filters.checkedCategories.length) {
                filteredExpenseRecords =  filteredExpenseRecords.filter(record => record.category === this.filters.checkedCategories[this.filters.checkedCategories.indexOf(record.category)])
            }

            return filteredExpenseRecords
        }
    },

    components: {
        FilterMenu
    },

    methods: {
        searchItem(record, searchFilter) {
            const searchString = searchFilter.toLowerCase();
            const itemName = record.itemName.toLowerCase();

            if (itemName.includes(searchString))
                return true
            return false
        }
    }
}
</script>
<template>

<div class="row m-0 p-2">
    <div class="col p-0 m-0"> 
        <FilterMenu @update-filters="(newFilter) => this.filters = newFilter"/>
    </div>
</div>

<div class="table-responsive row m-0">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Item Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
                <th scope="col">Branch</th>
                <th scope="col">Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in filteredExpenses">
                <td>{{record.date}}</td>
                <td>{{record.itemName}}</td>
                <td>P{{record.amount}}</td>
                <td>{{record.category}}</td>
                <td>{{record.branch}}</td>
                <td>{{record.notes}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>