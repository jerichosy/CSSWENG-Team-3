<script>
// TODO: connect backend for adding cheques
export default {
    inject: {
        branchOptions: {
            from: 'branchOptions'
        },

        categoryOptions: {
            from: 'categoryOptions'
        }
    },
    props: {
        recordType: String
    },

    computed: {
        isChequesRecord() {
            if (this.recordType === 'cheques')
                return true
            return false
        }
    }
}
</script>

<template>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addModalLabel" v-if="isChequesRecord">Add Cheque Expense</h1>
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
                                            <input type="date" class="form-control" id="addDate" />
                                            <label for="addDate">Date</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- Amount -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="input-group">
                                            <span class="input-group-text">₱</span>
                                            <div class="form-floating">
                                                <input type="number" class="form-control" id="addAmount"
                                                    placeholder="Amount" />
                                                <label for="addAmount">Amount</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- Branch -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select class="form-select" id="branchSelect">
                                                <option selected>Select branch</option>
                                                <template v-for="branch in branchOptions">
                                                    <option :value="branch.branchName">{{ branch.branchName }}</option>
                                                </template>
                                            </select>
                                            <label for="branchSelect">Branch</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- Category -->
                                <div class="row mb-2">
                                    <div class="col">
                                        <div class="form-floating">
                                            <select class="form-select" id="categorySelect">
                                                <option selected>Select category</option>
                                                <template v-for="category in categoryOptions">
                                                    <option :value="category.name">{{ category.name }}</option>
                                                </template>
                                            </select>
                                            <label for="categorySelect">Category</label>
                                        </div>
                                    </div>
                                </div>
                                <!-- Account -->
                                <div class="row">
                                    <div class="col">
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="addAccount"
                                                placeholder="Account" />
                                            <label for="addAccount">Account</label>
                                        </div>
                                    </div>
                                </div>
                            </template>


                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>