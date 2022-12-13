<script>
import RecordService from '../../services/RecordService';

export default {
    inject: {
        categoryOptions: {
            from: 'categoryOptions'
        }
    },
    props: {
        recordType: String,
        selectedRecord: Object
    },
    emits: ['editSales', 'editExpense'],


    data() {
        return {
            salesInput: {
                time: '',
                amount: '',
                customerCount: null
            },

            expenseInput: {
                category: '',
                item: '',
                amount: null,
                notes: ''
            }
        }
    },

    computed: {
        isSalesRecord: function () {
            if (this.recordType === 'sales')
                return true;
            return false;
        },

        isExpenseRecord: function () {
            if (this.recordType === 'expense')
                return true;
            return false;
        },
    },

    methods: {
        computeTime(time) {
            return time.split('T')[1].split('.')[0].slice(0, -3);
        },

        onSubmit() {
            if (this.isSalesRecord) {
                let dateobj = new Date(this.selectedRecord.datetime);
                let date = dateobj.toISOString().split('T')[0];
                let datetime = new Date(date + 'T' + this.salesInput.time + ':00Z').toISOString();

                let data = {
                    id: this.selectedRecord._id,
                    branchID: this.selectedRecord.branchID,
                    amount: this.salesInput.amount,
                    customerCount: this.salesInput.customerCount,
                    datetime: datetime
                };
                this.$emit('editSales', data);
            }

            if (this.isExpenseRecord) {

                let data = {
                    id: this.selectedRecord._id,
                    branchID: this.selectedRecord.branchID,
                    amount: this.expenseInput.amount,
                    item: this.expenseInput.item,
                    category: this.expenseInput.category,
                    notes: this.expenseInput.notes,
                    datetime: this.selectedRecord.datetime
                };
                this.$emit('editExpense', data);
            }
        }
    },

    mounted() {
        const editModalEl = document.getElementById('editModal');

        // Reset all fields and component data when modal is hidden
        editModalEl.addEventListener('hidden.bs.modal', event => {
            this.salesInput = {
                time: '',
                amount: '',
                customerCount: null
            },

                this.expenseInput = {
                    category: '',
                    item: '',
                    amount: null,
                    notes: ''
                }
        });

        // Update edit fields to show selected record data
        editModalEl.addEventListener('shown.bs.modal', event => {
            if (this.isSalesRecord) {
                this.salesInput.time = this.computeTime(this.selectedRecord.datetime);
                this.salesInput.amount = this.selectedRecord.amount;
                this.salesInput.customerCount = this.selectedRecord.customerCount;
            }
            else if (this.isExpenseRecord) {
                this.expenseInput.item = this.selectedRecord.item;
                this.expenseInput.category = this.selectedRecord.category;
                this.expenseInput.amount = this.selectedRecord.amount;
                this.expenseInput.notes = this.selectedRecord.notes;
            }
        });
    }
}
</script>

<template>
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form @submit.prevent=onSubmit>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editModalLabel">
                            <template v-if="isSalesRecord">Edit Sales</template>
                            <template v-if="isExpenseRecord">Edit Expense</template>
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row-cols-1">
                                <!-- Sales -->
                                <template v-if="isSalesRecord">
                                    <div class="form-floating col mb-2">
                                        <input type="time" class="form-control" id="edit-time" v-model="salesInput.time"
                                            required />
                                        <label for="add-time">Time</label>
                                    </div>
                                    <div class="input-group col mb-2">
                                        <span class="input-group-text">₱</span>
                                        <div class="form-floating">
                                            <input type="number" class="form-control" id="edit-amount"
                                                placeholder="Amount" step=0.01 v-model="salesInput.amount" required />
                                            <label for="add-amount">Amount</label>
                                        </div>
                                    </div>
                                    <div class="form-floating col mb-2">
                                        <input type="number" class="form-control" id="edit-customer-count"
                                            placeholder="Customer Count" v-model="salesInput.customerCount" />
                                        <label for="add-customer-count">Customer Count</label>
                                    </div>
                                </template>

                                <!-- Expenses -->
                                <template v-if="isExpenseRecord">
                                    <div class="form-floating col mb-2">
                                        <select class="form-select" id="edit-category" v-model="expenseInput.category"
                                            required>
                                            <template v-for="category in categoryOptions">
                                                <option :value="category.name">{{ category.name }}</option>
                                            </template>
                                        </select>
                                        <label for="edit-category">Category</label>
                                    </div>

                                    <div class="form-floating col mb-2">
                                        <input type="text" class="form-control" id="edit-item" placeholder="Item"
                                            v-model="expenseInput.item" required />
                                        <label for="add-item">Item Name</label>
                                    </div>

                                    <div class="input-group col mb-2">
                                        <span class="input-group-text">₱</span>
                                        <div class="form-floating">
                                            <input type="number" class="form-control" id="edit-amount"
                                                placeholder="Amount" step=0.01 v-model="expenseInput.amount" required />
                                            <label for="add-amount">Amount</label>
                                        </div>
                                    </div>

                                    <div class="form-floating col">
                                        <textarea class="form-control" placeholder="Notes" id="edit-notes"
                                            maxlength="140" style="height:10rem"
                                            v-model="expenseInput.notes"></textarea>
                                        <label for="add-notes">Notes</label>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-target="#deleteModal"
                            data-bs-toggle="modal">Delete</button>
                        <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>