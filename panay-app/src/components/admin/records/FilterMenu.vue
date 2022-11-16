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
    <div class="row m-0">
        <div class="col">
        <FilterDropdown :is-link-list="true" 
                    :options="this.pageOptions"
                    placeholder='Sales' />
    </div>
    <div class="col">
        <FilterDropdown :is-link-list="false"
                    dropdown-type="date"
                    :options="this.branchOptions"
                    placeholder="Date Range" />
    </div>

    <div class="col">
        <FilterDropdown :is-link-list="false"
                    dropdown-type="time"
                    :options="this.branchOptions"
                    placeholder="Time Range" />
    </div>

    <div class="col">
        <FilterDropdown :is-link-list="false"
                        dropdown-type="checkbox"
                    :options="this.branchOptions"
                     />
    </div>
    </div>


</template>

<style scoped>

</style>