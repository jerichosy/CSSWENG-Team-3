<script>
// TODO: connect backend for editing cheques
export default {
    inject: {
        branchOptions: {
            from: 'branchOptions'
        },

        categoryOptions: {
            from: 'categoryOptions'
        }
    },
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
                notes: '',
                account: '',
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
            else if (this.isChequesRecord) {
                this.inputs.category = this.selectedRecord.category
                this.inputs.account = this.selectedRecord.account
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
        isChequesRecord() {
            if (this.recordType === 'cheques')
                return true
            return false
        }
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

            else if (this.isChequesRecord) {
                let editedCheque = {
                    id: this.selectedRecord._id,
                    account: this.selectedRecord.account,
                    branchName: this.inputs.branchName,
                    amount: this.inputs.amount.toFixed(2),
                    category: this.inputs.category,
                    date: this.inputs.date
                }
                this.$emit('editRecord', editedCheque)
            }

        }

    }
}

</script>

<template>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editModalLabel">Edit Record</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">

                            <!-- Cheques -->
                            <template v-if="isChequesRecord">
                                <!-- Date -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="edit-date" v-model="inputs.date"
                                                required />
                                            <label for="edit-date">Date</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Amount -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="input-group">
                                            <span class="input-group-text">₱</span>
                                            <div class="form-floating">
                                                <input type="number" class="form-control" id="edit-amount"
                                                    placeholder="Amount" v-model="inputs.amount" required />
                                                <label for="edit-amount">Amount</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Branch -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select class="form-select" id="edit-branch" v-model="inputs.branchName"
                                                required>
                                                <option selected>Select branch</option>
                                                <template v-for="branch in branchOptions">
                                                    <option :value="branch.branchName">{{ branch.branchName }}</option>
                                                </template>
                                            </select>
                                            <label for="edit-branch">Branch</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Category -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select class="form-select" id="edit-category" v-model="inputs.category"
                                                required>
                                                <template v-for="category in categoryOptions">
                                                    <option :value="category.name">{{ category.name }}</option>
                                                </template>
                                            </select>
                                            <label for="edit-category">Category</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Account -->
                                <div class="row">
                                    <div class="col">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="edit-account"
                                                placeholder="Account" v-model="inputs.account" required />
                                            <label for="edit-account">Account</label>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- Sales -->
                            <template v-if="isSalesRecord">
                                <!-- Date -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="edit-date" v-model="inputs.date"
                                                required />
                                            <label for="edit-date">Date</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- Time -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <input type="time" class="form-control" id="edit-time"
                                                v-model="this.inputs.time" required />
                                            <label for="edit-time">Time</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Amount -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="input-group">
                                            <span class="input-group-text">₱</span>
                                            <div class="form-floating">
                                                <input type="number" class="form-control" id="edit-amount"
                                                    placeholder="Amount" v-model="inputs.amount" required />
                                                <label for="edit-amount">Amount</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Customer Count -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="input-group">
                                            <div class="form-floating">
                                                <input type="number" class="form-control" id="edit-customer-count"
                                                    placeholder="Customer Count" v-model="inputs.customerCount" />
                                                <label for="edit-customer-count">Customer Count</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Branch -->
                                <div class="row">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select class="form-select" id="edit-branch" v-model="inputs.branchName"
                                                required>
                                                <option selected>Select branch</option>
                                                <template v-for="branch in branchOptions">
                                                    <option :value="branch.branchName">{{ branch.branchName }}</option>
                                                </template>
                                            </select>
                                            <label for="edit-branch">Branch</label>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <template v-if="isExpenseRecord">
                                <!-- Date -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <input type="date" class="form-control" id="edit-date" v-model="inputs.date"
                                                required />
                                            <label for="edit-date">Date</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Item Name -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="edit-item-name"
                                                placeholder="Item Name" v-model="inputs.item" required />
                                            <label for="edit-item-name">Item Name</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Amount -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="input-group">
                                            <span class="input-group-text">₱</span>
                                            <div class="form-floating">
                                                <input type="number" class="form-control" id="edit-amount"
                                                    placeholder="Amount" v-model="inputs.amount" required />
                                                <label for="edit-amount">Amount</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Category -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select class="form-select" id="edit-category" v-model="inputs.category"
                                                required>
                                                <template v-for="category in categoryOptions">
                                                    <option :value="category.name">{{ category.name }}</option>
                                                </template>
                                            </select>
                                            <label for="edit-category">Category</label>
                                        </div>
                                    </div>
                                </div>

                                <!-- Branch -->
                                <div class="row">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select class="form-select" id="edit-branch" v-model="inputs.branchName"
                                                required>
                                                <option selected>Select branch</option>
                                                <template v-for="branch in branchOptions">
                                                    <option :value="branch.branchName">{{ branch.branchName }}</option>
                                                </template>
                                            </select>
                                            <label for="edit-branch">Branch</label>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-cancel" data-bs-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="this.sendChanges()">Save
                            Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>