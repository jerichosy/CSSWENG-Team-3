<script>
import { Modal } from 'bootstrap';
import RecordService from '../../services/RecordService';
export default {

    inject: {
        categoryOptions: {
            from: 'categoryOptions'
        }
    },
    props: {
        recordType: String
    },
    emits: ['retrieveSales', 'retrieveExpenses'],

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
        }
    },

    methods: {
        resetInputs() {
            this.salesInput = {
                time: '',
                amount: '',
                customerCount: null
            }

            this.expenseInput = {
                category: '',
                item: '',
                amount: null,
                notes: ''
            }
        },

        submitRecord() {
            // Brute-force for demo
            if (this.isSalesRecord) {
                const date = new Date();

                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                let currentDate = `${year}-${month}-${day}`;
                console.log(currentDate);
                const datetime = new Date(currentDate + 'T' + this.salesInput.time + 'Z');
                console.log(datetime);

                let data = {
                    branchID: 101,
                    branchName: 'Panay Avenue Paligsahan QC',
                    amount: this.salesInput.amount,
                    customerCount: this.salesInput.customerCount,
                    datetime: datetime
                }

                RecordService.addCashierSales(data)
                    .then(response => {
                        this.$emit('retrieveSales');
                        this.closeAddModal();
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
            else if (this.isExpenseRecord) {


                const datetime = new Date();
                let data = {
                    branchID: 101,
                    branchName: 'Panay Avenue Paligsahan QC',
                    item: this.expenseInput.item,
                    category: this.expenseInput.category,
                    amount: this.expenseInput.amount,
                    notes: this.expenseInput.notes,
                    datetime: datetime
                }

                RecordService.addCashierExpense(data)
                    .then(response => {
                        this.$emit('retrieveExpenses');
                        this.closeAddModal();
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        },

        closeAddModal() {
            let addModalEl = document.getElementById('addModal');
            let modal = Modal.getInstance(addModalEl);
            modal.hide();
        }
    },

    mounted() {
        const addModalEl = document.getElementById('addModal');
        // Reset all fields and component data when modal is hidden
        addModalEl.addEventListener('hidden.bs.modal', event => {
            this.resetInputs();
        });
    }
}
</script>

<template>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form @submit.prevent="submitRecord">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addModalLabel">
                            <template v-if="isSalesRecord">Add Sales</template>
                            <template v-if="isExpenseRecord">Add Expense</template>
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row-cols-1">
                                <!-- Sales -->
                                <template v-if="isSalesRecord">
                                    <div class="form-floating col mb-2">
                                        <input type="time" class="form-control" id="add-time" v-model="salesInput.time"
                                            required />
                                        <label for="add-time">Time</label>
                                    </div>
                                    <div class="input-group col mb-2">
                                        <span class="input-group-text">₱</span>
                                        <div class="form-floating">
                                            <input type="number" class="form-control" id="add-amount"
                                                placeholder="Amount" step=0.01 v-model="salesInput.amount" required />
                                            <label for="add-amount">Amount</label>
                                        </div>
                                    </div>
                                    <div class="form-floating col mb-2">
                                        <input type="number" class="form-control" id="add-customer-count"
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
                                        <input type="text" class="form-control" id="add-item" placeholder="Item"
                                            v-model="expenseInput.item" required />
                                        <label for="add-item">Item Name</label>
                                    </div>

                                    <div class="input-group col mb-2">
                                        <span class="input-group-text">₱</span>
                                        <div class="form-floating">
                                            <input type="number" class="form-control" id="add-amount"
                                                placeholder="Amount" step=0.01 v-model="expenseInput.amount" required />
                                            <label for="add-amount">Amount</label>
                                        </div>
                                    </div>

                                    <div class="form-floating col">
                                        <textarea class="form-control" placeholder="Notes" id="add-notes"
                                            maxlength="140" style="height:10rem"
                                            v-model="expenseInput.notes"></textarea>
                                        <label for="add-notes">Notes</label>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>