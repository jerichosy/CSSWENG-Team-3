<script>
export default {
    inject: {
        salesRecords: {
            from: 'salesRecords'
        },
        expenseRecords: {
            from: 'expenseRecords'
        },
        chequeRecords: {
            from: 'chequeRecords'
        }
    },
    props: {
        filters: Object,
        recordType: String
    },

    data() {
        return {
            currentSort: 'date',
            currentSortDir: 'desc',
        }
    },

    computed: {

        sortedRecords() {
            return this.chequeRecords.sort((a, b) => {
                let modifier = 1;
                if (this.currentSortDir === 'desc') modifier = -1;
                if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                return 0
            });
        },

        filteredSales() {
            let filteredSalesRecords = this.sortedRecords;

            if (this.filters.checkedBranches.length)
                filteredSalesRecords = filteredSalesRecords.filter(record => record.branchName === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branchName)])


            if (this.filters.dateFrom.length)
                filteredSalesRecords = filteredSalesRecords.filter((record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))

            if (this.filters.dateTo.length)
                filteredSalesRecords = filteredSalesRecords.filter((record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))


            if (this.filters.timeFrom.length)
                filteredSalesRecords = filteredSalesRecords.filter((record) => this.parseStartTime(this.filters.timeFrom, record))

            if (this.filters.timeTo.length)
                filteredSalesRecords = filteredSalesRecords.filter((record) => this.parseEndTime(this.filters.timeTo, record))

            return filteredSalesRecords
        },

        filteredExpenses() {
            let filteredExpenseRecords = this.sortedRecords;

            if (this.filters.itemSearch.length)
                filteredExpenseRecords = filteredExpenseRecords.filter((record) => this.searchItem(record, this.filters.itemSearch))


            if (this.filters.checkedBranches.length)
                filteredExpenseRecords = filteredExpenseRecords.filter(record => record.branchName === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branchName)])


            if (this.filters.dateFrom.length)
                filteredExpenseRecords = filteredExpenseRecords.filter((record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))

            if (this.filters.dateTo.length)
                filteredExpenseRecords = filteredExpenseRecords.filter((record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))


            if (this.filters.checkedCategories.length)
                filteredExpenseRecords = filteredExpenseRecords.filter(record => record.category === this.filters.checkedCategories[this.filters.checkedCategories.indexOf(record.category)])

            return filteredExpenseRecords
        },

        filteredCheques() {
            let filteredChequeRecords = this.sortedRecords;

            if (this.filters.dateFrom.length)
                filteredChequeRecords = filteredChequeRecords.filter((record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))

            if (this.filters.dateTo.length)
                filteredChequeRecords = filteredChequeRecords.filter((record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))

            if (this.filters.accountSearch.length)
                filteredChequeRecords = filteredChequeRecords.filter((record) => this.searchItem(record, this.filters.accountSearch))

            if (this.filters.checkedBranches.length)
                filteredChequeRecords = filteredChequeRecords.filter(record => record.branchName === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branchName)])

            if (this.filters.checkedCategories.length)
                filteredChequeRecords = filteredChequeRecords.filter(record => record.category === this.filters.checkedCategories[this.filters.checkedCategories.indexOf(record.category)])

            return filteredChequeRecords
        },

        isSalesRecord() {
            if (this.recordType === 'sales')
                return true
            return false
        },
        isExpenseRecord() {
            if (this.recordType === 'expense')
                return true
            return false
        },
        isChequesRecord() {
            if (this.recordType === 'cheques')
                return true
            return false
        }
    },

    methods: {
        formatDate(date) {
            return date.replace(/-/g, '/');
        },

        searchItem(record, searchFilter) {
            const searchString = searchFilter.toLowerCase();
            const accountName = record.account.toLowerCase();

            if (accountName.includes(searchString))
                return true
            return false
        },

        setSelectedRecord(record) {
            this.$emit('setSelectedRecord', record);
        },

        sort: function (s) {
            if (s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        }
    }
}
</script>

<template>
    <div class="table-responsive m-0">
        <table class="table table-striped table-hover table-sm">

            <thead>
                <!-- Sales Head -->
                <template v-if="isSalesRecord">
                    <tr>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('date')">Date</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('time')">Time</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('amount')">Amount</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('customerCount')">Customer Count
                        </th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('branchName')">Branch</th>
                        <th class="data-header bg-bgdefault" scope="col">Actions</th>
                    </tr>
                </template>

                <!-- Expenses Head -->
                <template v-if="isExpenseRecord">
                    <tr>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('date')">Date</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('item')">Item Name</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('amount')">Amount</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('category')">Category</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('branchName')">Branch</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('notes')">Notes</th>
                        <th class="data-header bg-bgdefault" scope="col">Actions</th>
                    </tr>
                </template>

                <!-- Cheques Head -->
                <template v-if="isChequesRecord">
                    <tr>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('date')">Date</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('amount')">Amount</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('branchName')">Branch</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('category')">Category</th>
                        <th class="data-header bg-bgdefault" scope="col" @click="sort('account')">Account</th>
                        <th scope="col">Actions</th>
                    </tr>
                </template>
            </thead>

            <tbody>
                <!-- Sales Body -->
                <template v-if="isSalesRecord">
                    <tr v-for="record in filteredSales" :key="record._id">
                        <td>{{ this.formatDate(record.date) }}</td>
                        <td>{{ this.formatTime(record.time) }}</td>
                        <td>₱{{ record.amount.toFixed(2).toLocaleString('en-US') }}</td>
                        <td>{{ record.customerCount }}</td>
                        <td>{{ record.branchName }}</td>
                        <td>
                            <div class="row">
                                <div class="col-3">
                                    <!-- Button for Edit Modal -->
                                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                        data-bs-target="#editModal" @click="setSelectedRecord(record)">
                                        Edit
                                    </button>
                                </div>
                                <div class="col-3">
                                    <!-- Button for Delete Modal -->
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                        data-bs-target="#deleteModal" @click="setSelectedRecord(record)">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>

                <!-- Expense Body -->
                <template v-if="isExpenseRecord">
                    <tr v-for="record in filteredExpenses" :key="record._id">
                        <td>{{ this.formatDate(record.date) }}</td>
                        <td>{{ record.item }}</td>
                        <td>₱{{ record.amount.toFixed(2).toLocaleString('en-US') }}</td>
                        <td>{{ record.category }}</td>
                        <td>{{ record.branchName }}</td>
                        <td>{{ record.notes }}</td>
                        <td>
                            <div class="col-3">
                                <!-- Button for Edit Modal -->
                                <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#editModal" @click="setSelectedRecord(record)">
                                    Edit
                                </button>
                            </div>
                            <div class="col-3">
                                <!-- Button for Delete Modal -->
                                <button type="button" class="btn btn-danger" data-bs-toggle="modal"
                                    data-bs-target="#deleteModal" @click="setSelectedRecord(record)">
                                    Delete
                                </button>
                            </div>
                        </td>
                    </tr>
                </template>

                <!-- Cheques Body -->
                <template v-if="isChequesRecord">
                    <tr v-for="record in filteredCheques">
                        <td>{{ formatDate(record.date) }}</td>
                        <td>{{ record.amount }}</td>
                        <td>{{ record.branchName }}</td>
                        <td>{{ record.category }}</td>
                        <td>{{ record.account }}</td>
                        <td>
                            <div class="row">
                                <div class="col-auto">
                                    <!-- Button for Edit Modal -->
                                    <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal"
                                        data-bs-target="#editModal" @click="setSelectedRecord(record)">
                                        Edit
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <!-- Button for Delete Modal -->
                                    <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"
                                        data-bs-target="#deleteModal" @click="setSelectedRecord(record)">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </template>

            </tbody>

        </table>

        <!-- debug: sort={{ currentSort }}, dir={{ currentSortDir }} -->
    </div>
</template>

<style scoped>
.data-header:hover {
    cursor: pointer;
    filter: brightness(0.95);
}
</style>