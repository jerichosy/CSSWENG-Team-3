<script>
import FilterButton from '../../../../components/admin/records/FilterButton.vue'
import FilterOptions from '../../../../components/admin/records/FilterOptions.vue';
import DeleteRecordModal from '../../../../components/DeleteRecordModal.vue'
import EditRecordModal from '../../../../components/EditRecordModal.vue'
import RecordTable from '../../../../components/admin/records/RecordTable.vue'

export default {
    inheritAttrs: false,
    props: {
        branchOptions: [Object],
        categoryOptions: [Object],
        salesRecords: [Object],
    },
    emits: ['deleteSales', 'editSales'],
    components: {
        FilterButton,
        FilterOptions,
        DeleteRecordModal,
        EditRecordModal,
        RecordTable
    },

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


    computed: {
        filteredSales() {
            let filteredSalesRecords = this.salesRecords

            if (this.filters.checkedBranches.length) {
                filteredSalesRecords = filteredSalesRecords.filter(record => record.branchName === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branchName)])
            }

            if (this.filters.dateFrom.length && this.filters.dateTo.length) {
                filteredSalesRecords = filteredSalesRecords.filter((record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))
                filteredSalesRecords = filteredSalesRecords.filter((record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))
            }

            if (this.filters.timeFrom.length && this.filters.timeTo.length) {
                filteredSalesRecords = filteredSalesRecords.filter((record) => this.parseStartTime(this.filters.timeFrom, record))
                filteredSalesRecords = filteredSalesRecords.filter((record) => this.parseEndTime(this.filters.timeTo, record))
            }

            return filteredSalesRecords
        }
    },


    methods: {
        formatDate(date) {
            return date.replace(/-/g, '/')
        },

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
        }

    }
}
</script>

<template>
    <DeleteRecordModal :selected-record="this.selectedRecord" record-type="sales"
        @delete-record="record => deleteRecord(record)" />

    <EditRecordModal :selected-record="this.selectedRecord" record-type="sales" :branch-options="this.branchOptions"
        @edit-record="(editedRecord) => this.editSales(editedRecord)" />

    <!-- <div class="row m-0 p-2">
        <div class="col p-0 m-0">
            <FilterButton />
            <FilterOptions :branch-options="this.branchOptions" :category-options="this.categoryOptions"
                @update-filters="(newFilter) => this.filters = newFilter" />
        </div>
    </div> -->

    <div class="row m-0 p-0">
        <RecordTable :filters="filters" record-type="sales" @set-selected-record="setSelectedRecord" />
    </div>

</template>