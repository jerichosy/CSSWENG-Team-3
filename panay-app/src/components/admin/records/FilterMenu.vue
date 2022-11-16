<script>
import FilterDropdown from './FilterDropdown.vue'

export default {

    data() {
        return {
            pageOptions: [{ title: "Sales", path: "sales"}, { title: "Expenses", path: "expenses" }],
            branchOptions: [{title: "Paligsahan"}, {title: "Manila"}, {title: "QC"}]

        }
    },
    components: {
        FilterDropdown
    }
}
</script>

<template>
    <FilterDropdown :is-link-list="true" 
                    :options="this.pageOptions"
                    placeholder='Sales' />
    <FilterDropdown :is-link-list="false"
                    :options="this.branchOptions" />
</template>

<style scoped>

</style>