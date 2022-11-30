<script>
import RecordFilters from '../../../../components/admin/records/RecordFilters.vue';
import DeleteRecordModal from '../../../../components/DeleteRecordModal.vue';
import AddRecordModal from '../../../../components/admin/records/AddRecordModal.vue';
import EditRecordModal from '../../../../components/EditRecordModal.vue';
import RecordTable from '../../../../components/admin/records/RecordTable.vue';

export default {
    inheritAttrs: false,
    props: {
        branchOptions: [Object],
        categoryOptions: [Object],
        chequeRecords: [Object]
    },
    emits: ['deleteCheque'],
    components: {
        RecordFilters,
        DeleteRecordModal,
        AddRecordModal,
        EditRecordModal,
        RecordTable
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

    methods: {
        updateFilters(newFilter) {
            this.filters = newFilter
        },

        setSelectedRecord(record) {
            console.log(record)
            this.selectedRecord = record
        },
        clearSelectedRecord() {
            this.selectedRecord = {}
        },

        deleteRecord(record) {
            this.$emit('deleteCheque', record._id)
        }
    }
}
</script>

<template>
    <DeleteRecordModal :selected-record="selectedRecord" record-type="cheques"
        @delete-record="record => deleteRecord(record)" />
    <EditRecordModal :selected-record="selectedRecord" record-type="cheques" />
    <AddRecordModal record-type="cheques" />

    <!-- Filter Menu -->
    <div class="row m-0 p-2">
        <RecordFilters record-type="cheques" @update-filters="updateFilters" />

        <!-- Button for Add Modal -->
        <div class="col-auto p-0">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add</button>
        </div>
    </div>

    <div class="row m-0 p-0">
        <RecordTable :filters="filters" record-type="cheques" @set-selected-record="setSelectedRecord" />
    </div>
</template>