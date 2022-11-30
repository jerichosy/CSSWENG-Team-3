<script>
import DeleteRecordModal from '../../../../components/DeleteRecordModal.vue'
import EditRecordModal from '../../../../components/EditRecordModal.vue'
import RecordTable from '../../../../components/admin/records/RecordTable.vue'
import RecordFilters from '../../../../components/admin/records/RecordFilters.vue';

export default {
    inheritAttrs: false,
    props: {
        branchOptions: [Object],
        categoryOptions: [Object],
        salesRecords: [Object],
    },
    emits: ['deleteSales', 'editSales'],
    components: {
        DeleteRecordModal,
        EditRecordModal,
        RecordTable,
        RecordFilters
    },

    data() {
        return {
            filters: {
                dateFrom: '',
                dateTo: '',
                timeFrom: '',
                timeTo: '',
                checkedBranches: [],
                checkedCategories: []
            },
            selectedRecord: {}
        }
    },

    methods: {
        setSelectedRecord(record) {
            this.selectedRecord = record
        },
        clearSelectedRecord() {
            this.selectedRecord = {}
        },

        deleteRecord(record) {
            this.$emit('deleteSales', record._id)
        },

        editSales(editedRecord) {
            this.$emit('editSales', editedRecord)
        },
        updateFilters(newFilter) {
            this.filters = newFilter
        }

    }
}
</script>

<template>
    <DeleteRecordModal :selected-record="this.selectedRecord" record-type="sales"
        @delete-record="record => deleteRecord(record)" />
    <EditRecordModal :selected-record="this.selectedRecord" record-type="sales" :branch-options="this.branchOptions"
        @edit-record="(editedRecord) => this.editSales(editedRecord)" />

    <div class="row m-0 p-2">
        <RecordFilters record-type="sales" @update-filters="updateFilters" />
    </div>

    <div class="row m-0 p-0">
        <RecordTable :filters="filters" record-type="sales" @set-selected-record="setSelectedRecord" />
    </div>

</template>