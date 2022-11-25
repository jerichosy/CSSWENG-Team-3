<script>
import FilterButton from '../../../../components/admin/records/FilterButton.vue'
import FilterOptions from '../../../../components/admin/records/FilterOptions.vue';
import DeleteRecordModal from '../../../../components/DeleteRecordModal.vue'

export default {
    data() {
        return {
            filters: {
                dateFrom: '',
                dateTo: '',
                timeFrom: '',
                timeTo: '',
                itemSearch: '',
                checkedBranches: [],
                checkedCategories: []
            },
            selectedRecord: {}
        }
    },

    emits: ['deleteExpense', 'deleteSales'],

    props: {
        branchOptions: [Object],
        categoryOptions: [Object],
        expenseRecords: [Object],
        salesRecords: [Object] //pass this to get rid of Vue console warning
    },

    computed: {
        filteredExpenses() {
            let filteredExpenseRecords = this.expenseRecords

            if (this.filters.itemSearch.length) {
                filteredExpenseRecords = filteredExpenseRecords.filter((record) => this.searchItem(record, this.filters.itemSearch))
            }

            if (this.filters.checkedBranches.length) {
                filteredExpenseRecords = filteredExpenseRecords.filter(record => record.branchName === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branchName)])
            }

            if (this.filters.dateFrom.length && this.filters.dateTo.length) {
                filteredExpenseRecords = filteredExpenseRecords.filter((record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))
                filteredExpenseRecords = filteredExpenseRecords.filter((record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))
            }

            if (this.filters.checkedCategories.length) {
                filteredExpenseRecords = filteredExpenseRecords.filter(record => record.category === this.filters.checkedCategories[this.filters.checkedCategories.indexOf(record.category)])
            }

            return filteredExpenseRecords
        }
    },

    components: {
        FilterButton,
        FilterOptions,
        DeleteRecordModal
    },

    methods: {
        formatDate(date) {
            return date.replace(/-/g, '/')
        },
        searchItem(record, searchFilter) {
            const searchString = searchFilter.toLowerCase();
            const itemName = record.item.toLowerCase();

            if (itemName.includes(searchString))
                return true
            return false
        },

        setSelectedRecord(record) {
            this.selectedRecord = record
        },
        clearSelectedRecord() {
            this.selectedRecord = {}
        },

        deleteRecord(record) {
            this.$emit('deleteExpense', record._id)
        }
    }
}
</script>
<template>

    <DeleteRecordModal :selected-record="this.selectedRecord" record-type="expense"
        @delete-record="record => deleteRecord(record)" />

    <div class="row m-0 p-2">
        <div class="col p-0 m-0">
            <FilterButton />
            <FilterOptions :branch-options="this.branchOptions" :category-options="this.categoryOptions"
                @update-filters="(newFilter) => this.filters = newFilter" />
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
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="record in filteredExpenses" :key="record._id">
                    <td>{{ this.formatDate(record.date) }}</td>
                    <td>{{ record.item }}</td>
                    <td>₱{{ record.amount.toFixed(2).toLocaleString('en-US') }}</td>
                    <td>{{ record.category }}</td>
                    <td>{{ record.branchName }}</td>
                    <td>{{ record.notes }}</td>
                    <td>
                        <div class="col">
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#deleteModal" @click="setSelectedRecord(record)">
                                Delete
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</template>