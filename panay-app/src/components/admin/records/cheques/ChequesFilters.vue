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
    emits: ['updateFilters'],

    data() {
        return {
            filters: {
                dateFrom: '',
                dateTo: '',
                accountSearch: '',
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
                <fieldset class="mb-2">
                    <legend class="col-form-label-sm m-0">Date Range</legend>
                    <div class="row">
                        <div class="col">
                            <input type="date" title="from" class="form-control" id="filterDateFrom"
                                v-model="filters.dateFrom" />
                        </div>
                        <div class="col">
                            <input type="date" title="to" class="form-control" id="filterDateTo"
                                v-model="filters.dateTo" />
                        </div>
                    </div>
                </fieldset>

                <div class="mb-2">
                    <div class="form-floating">
                        <input type="text" class="form-control" id="filterAccount" placeholder="Account"
                            v-model="filters.accountSearch" />
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
                                        :id="'branch' + branch.branchID" :value="branch.branchName"
                                        v-model="filters.checkedBranches" />
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
                                        :id="category.name.toLowerCase()" :value="category.name"
                                        v-model="filters.checkedCategories" />
                                    <label class="form-check-label btn btn-outline-primary text-nowrap"
                                        :for="category.name.toLowerCase()">{{ category.name }}</label>
                                </div>
                            </div>
                        </div>
                    </div>
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