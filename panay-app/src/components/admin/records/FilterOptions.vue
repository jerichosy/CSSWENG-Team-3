<script>
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';

export default {

    components: {
        FilterCheckboxDropdown
    },

    props: {
        branchOptions: {type: Array},
        categoryOptions: {type: Array}
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
        resetFilters(){
            this.filters.dateFrom='',
            this.filters.dateTo='',
            this.filters.timeFrom='',
            this.filters.timeTo='',
            this.filters.itemSearch='',
            this.filters.checkedBranches=[],
            this.filters.checkedCategories=[]
        }
    }
}
</script>

<template>
    <!-- sales filters -->
    <form class="collapse show" id="filterForm" v-if="isSales">
        <div class="card card-body">
            <fieldset>
                <legend>Date Range</legend>
                <label for="date-from">From</label> <input type="date" name="date-from" id="date-from" v-model="filters.dateFrom">
                <label for="date-to">To</label> <input type="date" name="date-to" id="date-to" v-model="filters.dateTo">
            </fieldset>
            <fieldset>
                <legend>Time Range</legend>
                <label for="time-from">From</label> <input type="time" name="time-from" id="time-from" v-model="filters.timeFrom" >
                <label for="time-to">To</label> <input type="time" name="time-to" id="time-to" v-model="filters.timeTo" >
            </fieldset>
            <fieldset>
                <legend>Branches</legend>
                <div v-for="branch in branchOptions">
                    <input type="checkbox" name="branches" :id="branch.branchName.toLowerCase()" :value="branch.branchName" v-model="filters.checkedBranches" />
                    <label :for="branch.branchName.toLowerCase()">{{branch.branchName}}</label>
                </div>
            </fieldset>
            <button type="reset" @click="resetFilters">Reset Filters</button>
        </div>
    </form>

    <!-- expense filters -->
    <div class="collapse" id="filterForm" v-if="isExpenses">
        <div class="card card-body">
            
            <label for="item-search">Item Search</label> <input id="item-search" type="text" v-model="filters.itemSearch">
            <fieldset>
                <legend>Date Range</legend>
                <label for="date-from">From</label> <input type="date" name="date-from" id="date-from" v-model="filters.dateFrom">
                <label for="date-to">To</label> <input type="date" name="date-to" id="date-to" v-model="filters.dateTo">
                <p>{{this.formatDate(this.filters.dateFrom)}} {{this.formatDate(this.filters.dateTo)}}</p>
            </fieldset>
            
            <FilterCheckboxDropdown filter-item-single="branch"
                                    filter-item-plural="branches"
                                    :options="this.branchOptions"
                />

            <FilterCheckboxDropdown filter-item-single="category"
                                filter-item-plural="categories"
                                :options="this.categoryOptions"
            />
        </div>
    </div>


</template>