<script>

export default {
    props: {
        selectedRecord: Object,
        recordType: String
    },

    computed: {
        isSalesRecord() {
            if (this.recordType === 'sales')
                return true
            return false
        },
        isExpenseRecord() {
            if (this.recordType === 'expense')
                return true
            return false
        }
    },
}

</script>

<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Confirm Deletion </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete the following record?</p>
                    <table class="table table-striped table-sm" v-if="Object.keys(selectedRecord).length !== 0">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col" v-if="this.isSalesRecord">Time</th>
                                <th scope="col" v-if="this.isExpenseRecord">Item Name</th>
                                <th scope="col">Amount</th>
                                <th scope="col" v-if="this.isSalesRecord">Customer Count</th>
                                <th scope="col" v-if="this.isExpenseRecord">Category</th>
                                <th scope="col">Branch</th>
                                <th scope="col" v-if="this.isExpenseRecord">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{{ this.$parent.formatDate(selectedRecord.date) }}</td>
                                <td v-if="this.isSalesRecord">{{ this.$parent.formatTime(selectedRecord.time) }}</td>
                                <td v-if="this.isExpenseRecord">{{ selectedRecord.item }}</td>
                                <td>₱{{ selectedRecord.amount.toFixed(2).toLocaleString('en-US') }}</td>
                                <td v-if="this.isSalesRecord">{{ selectedRecord.customerCount }}</td>
                                <td v-if="this.isExpenseRecord">{{ selectedRecord.category }}</td>
                                <td>{{ selectedRecord.branchName }}</td>
                                <td v-if="this.isExpenseRecord">{{ selectedRecord.notes }}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                        @click="this.$emit('deleteRecord', this.selectedRecord)">Delete</button>
                </div>
            </div>
        </div>
    </div>
</template>