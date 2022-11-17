<script>
import FilterDropdown from './FilterDropdown.vue'
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';
import SalesFilterOptions from './FilterOptions.vue';

export default {

    data() {
        return {
            pageOptions: [{ title: "Sales", path: "sales"}, { title: "Expenses", path: "expenses" }],
            branchOptions: [{title: "Paligsahan"}, {title: "Manila"}, {title: "QC"}]

        }
    },
    components: {
    FilterDropdown,
    FilterCheckboxDropdown,
    SalesFilterOptions
}
}
</script>

<template>

    <div class="col">
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#filterForm" aria-expanded="false" aria-controls="filterForm">
            Filters
        </button>
    </div>

    <SalesFilterOptions :branch-options="this.branchOptions"/>

    <!-- <div class="collapse" id="filterForm">
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
    </div> -->







</template>

<style scoped>

</style>