<script>
import FilterDropdown from './FilterDropdown.vue'
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';

export default {

    data() {
        return {
            pageOptions: [{ title: "Sales", path: "sales"}, { title: "Expenses", path: "expenses" }],
            branchOptions: [{title: "Paligsahan"}, {title: "Manila"}, {title: "QC"}]

        }
    },
    components: {
        FilterDropdown,
        FilterCheckboxDropdown
    }
}
</script>

<template>
    <div class="row m-0">
        <div class="col-2">
        <FilterDropdown :is-link-list="true" 
                    :options="this.pageOptions"
                    placeholder='Sales' />
        </div>

        <div class="col">
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#filterForm" aria-expanded="false" aria-controls="filterForm">
            Filters
            </button>
        </div>

        <div class="collapse" id="filterForm">
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
                        <fieldset>
                            <FilterCheckboxDropdown filter-item-single="branch"
                                                    filter-item-plural="branches"
                                                    :options="this.branchOptions"
                             />
                        </fieldset>

                        <button type="submit">Filter</button>
                        <button type="reset">Reset</button>
                </form>
        </div>





    </div>


</template>

<style scoped>

</style>