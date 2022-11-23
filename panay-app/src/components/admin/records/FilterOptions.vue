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
    <form class="collapse" id="filterForm">
        <div class="card card-body">

            <fieldset v-if="isExpenses">
                <label for="item-search">Item Search</label> <input id="item-search" type="text" v-model="filters.itemSearch"/>
            </fieldset>

            <fieldset v-if="isSales || isExpenses">
                <legend>Date Range</legend>
                <label for="date-from">From</label> <input type="date" name="date-from" id="date-from" v-model="filters.dateFrom">
                <label for="date-to">To</label> <input type="date" name="date-to" id="date-to" v-model="filters.dateTo">
            </fieldset>

            <fieldset v-if="isSales">
                <legend>Time Range</legend>
                <label for="time-from">From</label> <input type="time" name="time-from" id="time-from" v-model="filters.timeFrom" >
                <label for="time-to">To</label> <input type="time" name="time-to" id="time-to" v-model="filters.timeTo" >
            </fieldset>

            <fieldset v-if="isSales || isExpenses">
                <legend>Branches</legend>
                <div v-for="branch in branchOptions">
                    <input type="checkbox" name="branches" :id="branch.branchName.toLowerCase()" :value="branch.branchName" v-model="filters.checkedBranches" />
                    <label :for="branch.branchName.toLowerCase()">{{branch.branchName}}</label>
                </div>
            </fieldset>

            <fieldset v-if="isExpenses">
                <legend>Categories</legend>
                <div v-for="category in categoryOptions">
                    <input type="checkbox" name="branches" :id="category.name.toLowerCase()" :value="category.name" v-model="filters.checkedCategories" />
                    <label :for="category.name.toLowerCase()">{{category.name}}</label>
                </div>
            </fieldset>

            <button type="reset" @click="resetFilters">Reset Filters</button>
        </div>
    </form>

    <!-- expense filters -->
    <!-- <div class="collapse" id="filterForm" v-if="isExpenses">
        <div class="card card-body">
            
            <label for="item-search">Item Search</label> <input id="item-search" type="text" v-model="filters.itemSearch">
            <fieldset>
                <legend>Date Range</legend>
                <label for="date-from">From</label> <input type="date" name="date-from" id="date-from" v-model="filters.dateFrom">
                <label for="date-to">To</label> <input type="date" name="date-to" id="date-to" v-model="filters.dateTo">
               
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
    </div> -->


</template>