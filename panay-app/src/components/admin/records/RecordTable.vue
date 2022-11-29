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

    computed: {
        filteredChequeRecords() {
            let filteredChequeRecords = this.chequeRecords;

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
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Customer Count</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Actions</th>
                    </tr>
                </template>

                <!-- Expenses Head -->
                <template v-if="isExpenseRecord">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Item Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Actions</th>
                    </tr>
                </template>

                <!-- Cheques Head -->
                <template v-if="isChequesRecord">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Category</th>
                        <th scope="col">Account</th>
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
                                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                        data-bs-target="#editModal" @click="setSelectedRecord(record)">
                                        Edit
                                    </button>
                                </div>
                                <div class="col-3">
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
                                <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                    data-bs-target="#editModal" @click="setSelectedRecord(record)">
                                    Edit
                                </button>
                            </div>
                            <div class="col-3">
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
                    <tr v-for="record in filteredChequeRecords">
                        <td>{{ formatDate(record.date) }}</td>
                        <td>{{ record.amount }}</td>
                        <td>{{ record.branchName }}</td>
                        <td>{{ record.category }}</td>
                        <td>{{ record.account }}</td>
                        <td>
                            <div class="row">
                                <div class="col-auto">
                                    <button type="button" class="btn btn-secondary btn-sm" data-bs-toggle="modal"
                                        data-bs-target="#editModal" @click="setSelectedRecord(record)">
                                        Edit
                                    </button>
                                </div>
                                <div class="col-auto">
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
    </div>
</template>