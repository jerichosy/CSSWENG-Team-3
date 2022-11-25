<script>
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';

export default {

    components: {
        FilterCheckboxDropdown
    },

    props: {
        branchOptions: [Object],
        categoryOptions: [Object]
    },

    emits: ['updateFilters'],

    data() {
        return {
            filters: {
                dateFrom: '',
                dateTo: '',
                timeFrom: '',
                timeTo: '',
                itemSearch: '',
                checkedBranches: [],
                checkedCategories: []
            }
        }
    },

    watch: {
        filters: {
            handler(newFilter) {
                this.updateFilter(newFilter)
            },
            deep: true
        }
    },

    computed: {
        isSales() {
            return this.$route.name === 'sales';
        },

        isExpenses() {
            return this.$route.name === 'expenses';
        },

        filterRows() {
            let startDate = this.formatDate(this.startDate)
            let endDate = this.formatDate(this.endDate)
        }
    },

    methods: {
        updateFilter(newFilter) {
            return this.$emit('updateFilters', newFilter)
        },
        resetFilters() {
            this.filters.dateFrom = '',
                this.filters.dateTo = '',
                this.filters.timeFrom = '',
                this.filters.timeTo = '',
                this.filters.itemSearch = '',
                this.filters.checkedBranches = [],
                this.filters.checkedCategories = []
        }
    }
}
</script>

<template>
    <form class="collapse" id="filterForm">
        <div class="card card-body">
            <fieldset class="row" v-if="isExpenses">
                <div class="form-floating">
                    <input id="item-search" class="form-control" type="text" v-model="filters.itemSearch" />
                    <label class="ms-2" for="item-search">Item Search</label>
                </div>

            </fieldset>

            <fieldset class="row" v-if="isSales || isExpenses">
                <legend>Date Range</legend>
                <div class="col-6 form-floating">
                    <input type="date" class="form-control" name="date-from" id="date-from" v-model="filters.dateFrom">
                    <label class="ms-2" for="date-from">From</label>
                </div>

                <div class="col-6 form-floating">
                    <input type="date" class="form-control" name="date-to" id="date-to" v-model="filters.dateTo">
                    <label class="ms-2" for="date-to">To</label>
                </div>
            </fieldset>

            <fieldset class="row" v-if="isSales">
                <legend>Time Range</legend>
                <div class="col-6 form-floating">
                    <input type="time" class="form-control" name="time-from" id="time-from" v-model="filters.timeFrom">
                    <label class="ms-2" for="time-from">From</label>
                </div>

                <div class="col-6 form-floating">
                    <input type="time" class="form-control" name="time-to" id="time-to" v-model="filters.timeTo">
                    <label class="ms-2" for="time-to">To</label>
                </div>

            </fieldset>

            <fieldset v-if="isSales || isExpenses">
                <legend>Branches</legend>
                <div class="form-check form-check-inline" v-for="branch in this.branchOptions" :key="branch.branchID">
                    <input class="form-check-input" type="checkbox" name="branches" :id="'branch' + branch.branchID"
                        :value="branch.branchName" v-model="filters.checkedBranches" />
                    <label class="form-check-label" :for="'branch' + branch.branchID">{{
                            branch.branchName
                    }}</label>
                </div>
            </fieldset>

            <fieldset v-if="isExpenses">
                <legend>Categories</legend>
                <div class="form-check form-check-inline" v-for="category in categoryOptions">
                    <input class="form-check-input" type="checkbox" name="branches" :id="category.name.toLowerCase()"
                        :value="category.name" v-model="filters.checkedCategories" />
                    <label class="form-check-label" :for="category.name.toLowerCase()">{{ category.name
                    }}</label>
                </div>
            </fieldset>

            <div class="container-fluid">
                <div class="col float-end">
                    <button class="btn btn-primary" type="reset" @click="resetFilters">Reset Filters</button>
                </div>
            </div>

        </div>
    </form>
</template>