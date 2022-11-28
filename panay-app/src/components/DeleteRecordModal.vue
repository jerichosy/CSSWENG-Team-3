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
        },
        isChequesRecord() {
            if (this.recordType === 'cheques')
                return true
            return false
        }
    },

    methods: {
        formatDate(date) {
            return date.replace(/-/g, '/')
        },

        formatTime(time) {
            if (time) {
                return new Date('1970-01-01T' + time + 'Z')
                    .toLocaleTimeString('en-US',
                        { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
                    );
            }
        }
    }
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
                                <template v-if="isSalesRecord">
                                    <th scope="col">Date</th>
                                    <th scope="col">Time</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Customer Count</th>
                                    <th scope="col">Branch</th>
                                </template>

                                <template v-if="isExpenseRecord">
                                    <th scope="col">Date</th>
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Branch</th>
                                </template>

                                <template v-if="isChequesRecord">
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Branch</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Account</th>
                                </template>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <template v-if="isSalesRecord">
                                    <td>{{ formatDate(selectedRecord.date) }}</td>
                                    <td>{{ formatTime(selectedRecord.time) }}</td>
                                    <td>₱{{ selectedRecord.amount.toFixed(2).toLocaleString('en-US') }}</td>
                                    <td>{{ selectedRecord.customerCount }}</td>
                                    <td>{{ selectedRecord.branchName }}</td>
                                </template>

                                <template v-if="isExpenseRecord">
                                    <td>{{ formatDate(selectedRecord.date) }}</td>
                                    <td>{{ selectedRecord.item }}</td>
                                    <td>₱{{ selectedRecord.amount.toFixed(2).toLocaleString('en-US') }}</td>
                                    <td>{{ selectedRecord.category }}</td>
                                    <td>{{ selectedRecord.branchName }}</td>
                                </template>

                                <template v-if="isChequesRecord">
                                    <td>{{ formatDate(selectedRecord.date) }}</td>
                                    <td>₱{{ selectedRecord.amount.toFixed(2).toLocaleString('en-US') }}</td>
                                    <td>{{ selectedRecord.branchName }}</td>
                                    <td>{{ selectedRecord.category }}</td>
                                    <td>{{ selectedRecord.account }}</td>
                                </template>
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