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
                branchName: '',
                notes: ''
            },
        }

    },

    emits: ['editRecord'],

    watch: {
        selectedRecord() {
            this.inputs.date = this.selectedRecord.date
            this.inputs.amount = this.selectedRecord.amount
            this.inputs.branchName = this.selectedRecord.branchName

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
        recordType: String,
        branchOptions: [Object]
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
    },

    methods: {
        sendChanges() {
            if (this.isSalesRecord) {
                let editedSales = {
                    id: this.selectedRecord._id,
                    branchName: this.inputs.branchName,
                    amount: this.inputs.amount.toFixed(2),
                    customerCount: this.inputs.customerCount,
                    date: this.inputs.date,
                    time: this.inputs.time
                }
                this.$emit('editRecord', editedSales)
            }

            else if (this.isExpenseRecord) {
                let editedExpense = {
                    id: this.selectedRecord._id,
                    branchName: this.inputs.branchName,
                    amount: this.inputs.amount.toFixed(2),
                    item: this.inputs.item,
                    category: this.inputs.category,
                    notes: this.inputs.notes,
                    date: this.inputs.date
                }
                this.$emit('editRecord', editedExpense)
            }

        },

    }
}

</script>

<template>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Record </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body container pe-5 ps-5">
                    <div class="row form-floating">
                        <input id="record-date" class="form-control" type="date" v-model="this.inputs.date" />
                        <label for="record-date">Date</label>
                    </div>
                    <div class="row form-floating" v-if="isSalesRecord">
                        <input id="record-time" class="form-control" type="time" v-model="this.inputs.time" />
                        <label for="record-time">Time</label>
                    </div>
                    <div class="row form-floating" v-if="isExpenseRecord">
                        <input id="record-item" class="form-control" type="text" v-model="this.inputs.item" />
                        <label for="record-item">Item Name</label>
                    </div>
                    <div class="row form-floating" v-if="this.selectedRecord.amount !== undefined">
                        <input id="record-amount" class="form-control" type="number" min="0.00"
                            v-model="this.inputs.amount" />
                        <label for="record-amount">Amount</label>
                    </div>
                    <div class="row form-floating" v-if="isSalesRecord">
                        <input id="record-customer" class="form-control" type="number"
                            v-model="this.inputs.customerCount" />
                        <label for="record-customer">Customer Count</label>
                    </div>
                    <div class="row form-floating" v-if="isExpenseRecord">
                        <input id="record-category" class="form-control" type="text" v-model="this.inputs.category" />
                        <label for="record-category">Category</label>
                    </div>
                    <div class="row form-floating">
                        <select id="record-branch" class="form-control" v-model="this.inputs.branchName">
                            <template v-for="branch in this.branchOptions" :key="branch.branchID">
                                <option :value="branch.branchName">{{ branch.branchName }}</option>
                            </template>
                        </select>
                        <label for="record-branch">Branch</label>
                    </div>
                    <div class="row form-floating" v-if="isExpenseRecord">
                        <input id="record-notes" class="form-control" type="text" v-model="this.inputs.notes" />
                        <label for="record-notes">Notes</label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="this.sendChanges()">Save
                        Changes</button>
                </div>
            </div>
        </div>
    </div>
</template>