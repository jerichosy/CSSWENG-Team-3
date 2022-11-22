<script>
import FilterDropdown from './FilterDropdown.vue'
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';
import FilterOptions from './FilterOptions.vue';

export default {

    data() {
        return {
            pageOptions: [{ title: "Sales", path: "sales"}, { title: "Expenses", path: "expenses" }],
            branchOptions: [{branchName: "Paligsahan"}, {branchName: "Manila"}, {branchName: "QC"}],
            categoryOptions: [{title: "Salary"}, {title: "Grocery"}, {title: "Utilities"}, 
                            {title: "Food"}, {title: "Gasul"}, {title: "Bakery Items"}, 
                            {title: "Rent"}, {title: "Misc."}, {title: "Taxes"}]

        }
    },
    components: {
    FilterDropdown,
    FilterCheckboxDropdown,
    FilterOptions
}
}
</script>

<template>

    <div class="col">
        <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#filterForm" aria-expanded="false" aria-controls="filterForm">
            Filters
        </button>
    </div>

    <FilterOptions  :branch-options="this.branchOptions" 
                    :category-options="this.categoryOptions"/>
</template>

<style scoped>

</style>