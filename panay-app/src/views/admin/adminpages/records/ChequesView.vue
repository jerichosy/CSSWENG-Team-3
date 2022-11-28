<script>
// TODO: Add EditRecordModal

import ChequesFilters from '../../../../components/admin/records/cheques/ChequesFilters.vue'
import DeleteRecordModal from '../../../../components/DeleteRecordModal.vue';
import AddRecordModal from '../../../../components/admin/records/AddRecordModal.vue'
import EditRecordModal from '../../../../components/EditRecordModal.vue';

export default {
    inheritAttrs: false,
    props: {
        branchOptions: [Object],
        categoryOptions: [Object],
        chequeRecords: [Object]
    },
    components: {
        ChequesFilters,
        DeleteRecordModal,
        AddRecordModal,
        EditRecordModal
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
    <EditRecordModal :selected-record="selectedRecord" record-type="cheques" />
    <AddRecordModal record-type="cheques" />


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