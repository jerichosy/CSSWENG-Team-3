<script>
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
    emits: ['updateFilters'],

    data() {
        return {
            filters: {
                dateFrom: '',
                dateTo: '',
                timeFrom: '',
                timeTo: '',
                accountSearch: '',
                itemSearch: '',
                checkedBranches: [],
                checkedCategories: []
            },
        }
    },

    watch: {
        filters: {
            handler(newFilter) {
                this.updateSelectedFilters(newFilter)
            },
            deep: true
        }
    },

    computed: {
        isSalesRecord() {
            if (this.recordType === 'sales')
                return true
            return false
        },
        isExpenseRecord() {
            if (this.recordType === 'expenses')
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
        updateSelectedFilters(newFilter) {
            return this.$emit('updateFilters', newFilter);
        },

        resetFilters() {
            this.filters.dateFrom = '',
                this.filters.dateTo = '',
                this.filters.accountSearch = '',
                this.filters.checkedBranches = [],
                this.filters.checkedCategories = []
        }
    }
}

</script>

<template>
    <div class="col-5 me-auto p-0">
        <div class="dropdown">
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false" data-bs-auto-close="outside">
                Filters
            </button>


            <form id="filter-dropdown" class="dropdown-menu p-4">
                <div class="container-fluid">

                    <template v-if="isSalesRecord">
                        <!-- Date Range -->
                        <div class="row mb-2">
                            <fieldset>
                                <legend class="col-form-label-sm m-0 pt-0">Date Range</legend>
                                <div class="row gx-2">
                                    <div class="col">
                                        <input type="date" title="from" class="form-control" id="filter-date-from"
                                            v-model="filters.dateFrom" />
                                    </div>
                                    <div class="col">
                                        <input type="date" title="to" class="form-control" id="filter-date-to"
                                            v-model="filters.dateTo" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <!-- Time Range -->
                        <div class="row mb-2">
                            <fieldset>
                                <legend class="col-form-label-sm m-0 pt-0">Time Range</legend>
                                <div class="row gx-2">
                                    <div class="col">
                                        <input type="time" title="from" class="form-control" id="filter-time-from"
                                            v-model="filters.timeFrom" />
                                    </div>
                                    <div class="col">
                                        <input type="time" title="to" class="form-control" id="filter-time-to"
                                            v-model="filters.timeTo" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <!-- Branch Dropdown -->
                        <div class="row mb-2 gx-2">
                            <div class="col-auto dropdown">
                                <button type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Branches
                                </button>
                                <div id="branch-dropdown" class="dropdown-menu p-4">
                                    <div class="form-check" v-for="branch in branchOptions">
                                        <input class="form-check-input btn-check" type="checkbox" name="branches"
                                            :id="'branch' + branch.branchID" :value="branch.branchName"
                                            v-model="filters.checkedBranches" />
                                        <label class="form-check-label btn btn-outline-primary text-nowrap"
                                            :for="'branch' + branch.branchID">{{ branch.branchName }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                    <!-- Expense Filters -->
                    <template v-if="isExpenseRecord">

                        <!-- Date Range -->
                        <div class="row mb-2">
                            <fieldset>
                                <legend class="col-form-label-sm m-0 pt-0">Date Range</legend>
                                <div class="row gx-2">
                                    <div class="col">
                                        <input type="date" title="from" class="form-control" id="filter-date-from"
                                            v-model="filters.dateFrom" />
                                    </div>
                                    <div class="col">
                                        <input type="date" title="to" class="form-control" id="filter-date-to"
                                            v-model="filters.dateTo" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <!-- Account Search -->
                        <div class="row mb-2">
                            <div class="col">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="filter-item" placeholder="Account"
                                        v-model="filters.itemSearch" />
                                    <label for="filter-item">Search for an item</label>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-2 gx-2">
                            <!-- Branch Dropdown -->
                            <div class="col-auto dropdown">
                                <button type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Branches
                                </button>
                                <div id="branch-dropdown" class="dropdown-menu p-4">
                                    <div class="form-check" v-for="branch in branchOptions">
                                        <input class="form-check-input btn-check" type="checkbox" name="branches"
                                            :id="'branch' + branch.branchID" :value="branch.branchName"
                                            v-model="filters.checkedBranches" />
                                        <label class="form-check-label btn btn-outline-primary text-nowrap"
                                            :for="'branch' + branch.branchID">{{ branch.branchName }}</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Category Dropdown -->
                            <div class="col-auto dropdown">
                                <button type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Categories
                                </button>
                                <div id="category-dropdown" class="dropdown-menu p-4">
                                    <div class="form-check" v-for="category in categoryOptions">
                                        <input class="form-check-input btn-check" type="checkbox" name="branches"
                                            :id="category.name.toLowerCase()" :value="category.name"
                                            v-model="filters.checkedCategories" />
                                        <label class="form-check-label btn btn-outline-primary text-nowrap"
                                            :for="category.name.toLowerCase()">{{ category.name }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </template>

                    <!-- Cheques Filters -->
                    <template v-if="isChequesRecord">
                        <!-- Date Range -->
                        <div class="row mb-2">
                            <fieldset>
                                <legend class="col-form-label-sm m-0 pt-0">Date Range</legend>
                                <div class="row gx-2">
                                    <div class="col">
                                        <input type="date" title="from" class="form-control" id="filter-date-from"
                                            v-model="filters.dateFrom" />
                                    </div>
                                    <div class="col">
                                        <input type="date" title="to" class="form-control" id="filter-date-to"
                                            v-model="filters.dateTo" />
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <!-- Account Search -->
                        <div class="row mb-2">
                            <div class="col">
                                <div class="form-floating">
                                    <input type="text" class="form-control" id="filter-account" placeholder="Account"
                                        v-model="filters.accountSearch" />
                                    <label for="filter-account">Search for an Account</label>
                                </div>
                            </div>
                        </div>

                        <!-- Branch Dropdown -->
                        <div class="row mb-2 gx-2">
                            <div class="col-auto dropdown">
                                <button type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Branches
                                </button>
                                <div id="branch-dropdown" class="dropdown-menu p-4">
                                    <div class="form-check" v-for="branch in branchOptions">
                                        <input class="form-check-input btn-check" type="checkbox" name="branches"
                                            :id="'branch' + branch.branchID" :value="branch.branchName"
                                            v-model="filters.checkedBranches" />
                                        <label class="form-check-label btn btn-outline-primary text-nowrap"
                                            :for="'branch' + branch.branchID">{{ branch.branchName }}</label>
                                    </div>
                                </div>
                            </div>

                            <!-- Category Dropdown -->
                            <div class="col-auto dropdown">
                                <button type="button" class="btn btn-outline-primary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside">
                                    Categories
                                </button>
                                <div id="category-dropdown" class="dropdown-menu p-4">
                                    <div class="form-check" v-for="category in categoryOptions">
                                        <input class="form-check-input btn-check" type="checkbox" name="branches"
                                            :id="category.name.toLowerCase()" :value="category.name"
                                            v-model="filters.checkedCategories" />
                                        <label class="form-check-label btn btn-outline-primary text-nowrap"
                                            :for="category.name.toLowerCase()">{{ category.name }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>

                </div>

                <div class="dropdown-divider mt-3 mb-3"></div>
                <button type="reset" class="btn btn-cancel float-end" @click="resetFilters">Reset Filters</button>
            </form>


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