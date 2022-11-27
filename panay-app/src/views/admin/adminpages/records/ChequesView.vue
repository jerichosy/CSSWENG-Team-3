<script>

export default {
    props: {
        branchOptions: [Object],
        categoryOptions: [Object]
    }
}

</script>

<template>

    <!-- Modal for Adding Cheque Expense -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <form>
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addModalLabel">Add Cheque Expense</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">

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
                                        <input type="text" class="form-control" id="addAccount" placeholder="Account" />
                                        <label for="addAccount">Account</label>
                                    </div>
                                </div>
                            </div>
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

    <!-- Filter Menu -->
    <div class="row m-0 p-2">
        <div class="col-5 me-auto p-0">
            <div class="dropdown">
                <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                    aria-expanded="false" data-bs-auto-close="outside">
                    Filters
                </button>
                <form id="filter-dropdown" class="dropdown-menu p-4">
                    <fieldset class="mb-2">
                        <legend class="col-form-label-sm m-0">Date Range</legend>
                        <div class="row">
                            <div class="col">
                                <input type="date" title="from" class="form-control" id="filterDateFrom" />
                            </div>
                            <div class="col">
                                <input type="date" title="to" class="form-control" id="filterDateTo" />
                            </div>
                        </div>


                    </fieldset>

                    <div class="mb-2">
                        <div class="form-floating">
                            <input type="text" class="form-control" id="filterAccount" placeholder="Account" />
                            <label for="filterAccount">Search for an account</label>
                        </div>
                    </div>

                    <div class="mb-2">
                        <div class="row">
                            <div class="col-auto dropdown">
                                <button type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Branches
                                </button>
                                <div id="branch-dropdown" class="dropdown-menu p-4">
                                    <div class="form-check" v-for="branch in branchOptions">
                                        <input class="form-check-input btn-check" type="checkbox" name="branches"
                                            :id="'branch' + branch.branchID" :value="branch.branchName" />
                                        <label class="form-check-label btn btn-outline-primary text-nowrap"
                                            :for="'branch' + branch.branchID">{{ branch.branchName }}</label>
                                    </div>
                                </div>
                            </div>

                            <div class="col-auto dropdown">
                                <button type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Categories
                                </button>
                                <div id="category-dropdown" class="dropdown-menu p-4">
                                    <div class="form-check" v-for="category in categoryOptions">
                                        <input class="form-check-input btn-check" type="checkbox" name="branches"
                                            :id="category.name.toLowerCase()" :value="category.name" />
                                        <label class="form-check-label btn btn-outline-primary text-nowrap"
                                            :for="category.name.toLowerCase()">{{ category.name }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                    <button type="reset" class="btn btn-primary">Reset Filters</button>
                </form>
            </div>
        </div>



        <div class="col-auto p-0">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addModal">Add</button>
        </div>
    </div>

    <div class="row m-0 p-2">
        <div class="table-responsive m-0">
            <table class="table table-striped table-hover table-sm">
                <thead>
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Category</th>
                        <th scope="col">Account</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                        <td>test</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
#branch-dropdown,
#category-dropdown {
    max-height: 280px !important;
    min-width: auto !important;
    overflow-y: auto !important;
}
</style>