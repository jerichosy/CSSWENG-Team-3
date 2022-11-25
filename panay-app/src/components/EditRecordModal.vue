<script>

export default {

    data() {
        return {
            inputs: {
                date: '',
                time: '',
                item: '',
                amount: 0,
                customerCount: 0,
                category: '',
                branch: '',
                notes: ''
            }
        }

    },

    watch: {
        selectedRecord() {
            this.inputs.date = this.selectedRecord.date
            this.inputs.amount = this.selectedRecord.amount
            this.inputs.branch = this.selectedRecord.branchName

            if (this.isSalesRecord) {
                this.inputs.time = this.selectedRecord.time
                this.inputs.customerCount = this.selectedRecord.customerCount
            }
            else if (this.isExpenseRecord) {
                this.inputs.item = this.selectedRecord.item
                this.inputs.category = this.selectedRecord.category
                this.inputs.notes = this.selectedRecord.notes
            }
        }
    },
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
    }
}

</script>

<template>
    <p>{{ this.selectedRecord }}</p>
    <p>{{ this.inputs }}</p>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Record </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <label for="record-date">Date</label>
                        <input id="record-date" type="date" v-model="this.inputs.date" />
                    </div>
                    <div v-if="isSalesRecord">
                        <label for="record-time">Time</label>
                        <input id="record-time" type="time" v-model="this.inputs.time" />
                    </div>
                    <div v-if="isExpenseRecord">
                        <label for="record-item">Item Name</label>
                        <input id="record-item" type="text" v-model="this.inputs.itemName" />
                    </div>
                    <div v-if="this.selectedRecord.amount !== undefined">
                        <label for="record-amount">Amount</label>
                        <input id="record-amount" type="number" v-model="this.inputs.amount" />
                    </div>
                    <div v-if="isSalesRecord">
                        <label for="record-customer">Customer Count</label>
                        <input id="record-customer" type="number" v-model="this.inputs.customerCount" />
                    </div>
                    <div v-if="isExpenseRecord">
                        <label for="record-category">Category</label>
                        <input id="record-category" type="text" v-model="this.inputs.category" />
                    </div>
                    <div>
                        <label for="record-branch">Branch</label>
                        <input id="record-branch" type="text" v-model="this.inputs.branch" />
                    </div>
                    <div v-if="isExpenseRecord">
                        <label for="record-notes">Notes</label>
                        <input id="record-notes" type="text" v-model="this.inputs.notes" />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>