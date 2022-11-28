<script>
// TODO:  Make new AddExpense component
// TODO: Add EditRecordModal


import ChequesFilters from '../../../../components/admin/records/cheques/ChequesFilters.vue'
import DeleteRecordModal from '../../../../components/DeleteRecordModal.vue';

export default {
    inheritAttrs: false,
    props: {
        branchOptions: [Object],
        categoryOptions: [Object],
        chequeRecords: [Object]
    },
    components: {
        ChequesFilters,
        DeleteRecordModal
    },

    data() {
        return {
            filters: {
                dateFrom: '',
                dateTo: '',
                accountSearch: '',
                checkedBranches: [],
                checkedCategories: []
            },
            selectedRecord: {}
        }
    },

    computed: {
        filteredChequeRecords() {
            let filteredChequeRecords = this.chequeRecords;

            if (this.filters.dateFrom.length) {
                filteredChequeRecords = filteredChequeRecords.filter((record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))
            }

            if (this.filters.dateTo.length) {
                filteredChequeRecords = filteredChequeRecords.filter((record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))
            }

            if (this.filters.accountSearch.length) {
                filteredChequeRecords = filteredChequeRecords.filter((record) => this.searchItem(record, this.filters.accountSearch))
            }

            if (this.filters.checkedBranches.length) {
                filteredChequeRecords = filteredChequeRecords.filter(record => record.branchName === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branchName)])
            }

            if (this.filters.checkedCategories.length) {
                filteredChequeRecords = filteredChequeRecords.filter(record => record.category === this.filters.checkedCategories[this.filters.checkedCategories.indexOf(record.category)])
            }

            return filteredChequeRecords
        }
    },

    methods: {
        formatDate(date) {
            return date.replace(/-/g, '/');
        },

        updateFilters(newFilter) {
            this.filters = newFilter
        },

        searchItem(record, searchFilter) {
            const searchString = searchFilter.toLowerCase();
            const accountName = record.account.toLowerCase();

            if (accountName.includes(searchString))
                return true
            return false
        },

        setSelectedRecord(record) {
            this.selectedRecord = record
        },
        clearSelectedRecord() {
            this.selectedRecord = {}
        }
    }
}
</script>

<template>
    <DeleteRecordModal :selected-record="selectedRecord" record-type="cheques" />

    <!-- Modal for Adding Cheque Expense -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addModalLabel">Add Cheque Expense</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">

                            <!-- Date -->
                            <div class="row mb-2">
                                <div class="col">
                                    <div class="form-floating">
                                        <input type="date" class="form-control" id="addDate" />
                                        <label for="addDate">Date</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Amount -->
                            <div class="row mb-2">
                                <div class="col">
                                    <div class="input-group">
                                        <span class="input-group-text">₱</span>
                                        <div class="form-floating">
                                            <input type="number" class="form-control" id="addAmount"
                                                placeholder="Amount" />
                                            <label for="addAmount">Amount</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Branch -->
                            <div class="row mb-2">
                                <div class="col">
                                    <div class="form-floating">
                                        <select class="form-select" id="branchSelect">
                                            <option selected>Select branch</option>
                                            <template v-for="branch in branchOptions">
                                                <option :value="branch.branchName">{{ branch.branchName }}</option>
                                            </template>
                                        </select>
                                        <label for="branchSelect">Branch</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Category -->
                            <div class="row mb-2">
                                <div class="col">
                                    <div class="form-floating">
                                        <select class="form-select" id="categorySelect">
                                            <option selected>Select category</option>
                                            <template v-for="category in categoryOptions">
                                                <option :value="category.name">{{ category.name }}</option>
                                            </template>
                                        </select>
                                        <label for="categorySelect">Category</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Account -->
                            <div class="row">
                                <div class="col">
                                    <div class="form-floating">
                                        <input type="text" class="form-control" id="addAccount" placeholder="Account" />
                                        <label for="addAccount">Account</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Filter Menu -->
    <div class="row m-0 p-2">

        <ChequesFilters @update-filters="updateFilters" />

        <div class="col-auto p-0">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add</button>
        </div>
    </div>

    <div class="row m-0 p-0">
        <!--  -->
        <!-- <p>{{ selectedRecord }}</p> -->
        <div class="table-responsive m-0">
            <table class="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Category</th>
                        <th scope="col">Account</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
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
                </tbody>
            </table>
        </div>
    </div>
</template>