<script>
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';

export default {
    data() {
        return {
            branchOptions: [{branchName: "Paligsahan"}, {branchName: "Manila"}, {branchName: "QC"}],
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
                <label for="date-from">From</label> <input type="date" name="date-from" id="date-from">
                <label for="date-to">To</label> <input type="date" name="date-to" id="date-to">
            </fieldset>
            <fieldset>
                <legend>Time Range</legend>
                <label for="time-from">From</label> <input type="time" name="time-from" id="time-from" >
                <label for="time-to">To</label> <input type="time" name="time-to" id="time-to" >
            </fieldset>
            <fieldset>
                <legend>Branches</legend>
                <div v-for="branch in branchOptions">
                    <input type="checkbox" name="branches" :id="branch.branchName" :value="branch.branchName" />
                    <label :for="branch.branchName">{{branch.branchName}}</label>
                </div>
            </fieldset>

            <!-- <FilterCheckboxDropdown filter-item-single="branch"
                                    filter-item-plural="branches"
                                    :options="this.branchOptions"
                /> -->

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