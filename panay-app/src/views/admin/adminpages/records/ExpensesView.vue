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
        expenseRecords: [Object]
    },
    emits: ['deleteExpense', 'editExpense'],
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
                itemSearch: '',
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
            this.$emit('deleteExpense', record._id)
        },

        editExpense(editedRecord) {
            this.$emit('editExpense', editedRecord)
        },
        updateFilters(newFilter) {
            this.filters = newFilter
        }
    }
}
</script>
<template>

    <DeleteRecordModal :selected-record="this.selectedRecord" record-type="expense"
        @delete-record="record => deleteRecord(record)" />
    <EditRecordModal :selected-record="this.selectedRecord" record-type="expense" :branch-options="this.branchOptions"
        @edit-record="(editedRecord) => this.editExpense(editedRecord)" />

    <div class="row m-0 p-2">
        <RecordFilters record-type="expenses" @update-filters="updateFilters" />
    </div>

    <div class="row m-0 p-0">
        <RecordTable :filters="filters" record-type="expenses" @set-selected-record="setSelectedRecord" />
    </div>

</template>