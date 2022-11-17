<script>
import FilterDropdown from './FilterDropdown.vue'
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';
import FilterOptions from './FilterOptions.vue';

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

    <FilterOptions :branch-options="this.branchOptions"/>
</template>

<style scoped>

</style>