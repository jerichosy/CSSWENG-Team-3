<script>
import FilterButton from '../../../../components/admin/records/FilterButton.vue'
import FilterOptions from '../../../../components/admin/records/FilterOptions.vue';

export default {
    data(){
        return {
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

    props: {
        branchOptions: [Object],
        categoryOptions: [Object],
        expenseRecords: [Object]
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
        FilterButton,
        FilterOptions
    },

    methods: {
        formatDate(date) {
            return date.replace(/-/g, '/' )
        },
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
        <FilterButton />
        <FilterOptions  :branch-options="this.branchOptions" 
                    :category-options="this.categoryOptions"
                    @update-filters="(newFilter) => this.filters = newFilter"
                    />
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
                <td>{{this.formatDate(record.date)}}</td>
                <td>{{record.itemName}}</td>
                <td>₱{{record.amount.toFixed(2).toLocaleString('en-US')}}</td>
                <td>{{record.category}}</td>
                <td>{{record.branch}}</td>
                <td>{{record.notes}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>