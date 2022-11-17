<script>
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';

export default {
    data() {
        return {
            branchOptions: [{title: "Paligsahan"}, {title: "Manila"}, {title: "QC"}],
            categoryOptions: [{title: "Salary"}, {title: "Grocery"}, {title: "Utilities"}, 
                            {title: "Food"}, {title: "Gasul"}, {title: "Bakery Items"}, 
                            {title: "Rent"}, {title: "Misc."}, {title: "Taxes"}]
        }
    },

    props: {
        //branchOptions: [Object]
    },

    components: {
        FilterCheckboxDropdown
    },

    computed: {
        isSales() {
            return this.$route.name === 'sales';
        },

        isExpenses() {
            return this.$route.name === 'expenses';
        }
    }
}
</script>

<template>
    <div class="collapse" id="filterForm" v-if="isSales">
        <form class="card card-body">
            <fieldset>
                <legend>Date Range</legend>
                <label for="dateRangeFrom">From</label> <input id="dateRangeFrom" type="date">
                <label for="dateRangeTo">To</label> <input id="dateRangeTo" type="date">
            </fieldset>
            <fieldset>
                <legend>Time Range</legend>
                <label for="timeRangeFrom">From</label> <input id="timeRangeFrom" type="time">
                <label for="timeRangeTo">To</label> <input id="timeRangeTo" type="time">
            </fieldset>
            <FilterCheckboxDropdown filter-item-single="branch"
                                    filter-item-plural="branches"
                                    :options="this.branchOptions"
                />

            <button type="submit">Filter</button>
            <button type="reset">Reset</button>
        </form>
    </div>

    <div class="collapse" id="filterForm" v-if="isExpenses">
        <form class="card card-body">
            
            <label for="expensesItemSearch">Item Search</label> <input id="expensesItemSearch" type="text">
            <fieldset>
                <legend>Date Range</legend>
                <label for="expensesDateRangeFrom">From</label> <input id="expensesDateRangeFrom" type="date">
                <label for="expensesDateRangeTo">To</label> <input id="expensesDateangeTo" type="date">
            </fieldset>
            
            <FilterCheckboxDropdown filter-item-single="branch"
                                    filter-item-plural="branches"
                                    :options="this.branchOptions"
                />

            <FilterCheckboxDropdown filter-item-single="category"
                                filter-item-plural="categories"
                                :options="this.categoryOptions"
            />

            <button type="submit">Filter</button>
            <button type="reset">Reset</button>
        </form>
    </div>


</template>