<script>
import FilterMenu from '../../../../components/admin/records/FilterMenu.vue'
import FilterDropdown from '../../../../components/admin/records/FilterDropdown.vue'

export default {

    data() {
        return {
            pageOptions: [{ title: "Sales", path: "sales"}, { title: "Expenses", path: "expenses" }],
        }
    },
    components: {
        FilterMenu,
        FilterDropdown
    },

    computed: {
        currentPage() {
            if(this.$route.name === 'sales')
                return 'Sales'
            else if(this.$route.name === 'expenses')
                return 'Expenses'
        }
    }
}
</script>

<template>
    <div class="row">
        <FilterDropdown class="col-2" :is-link-list="true" 
                :options="this.pageOptions"
                :placeholder='currentPage' />
        
        <FilterMenu />
    </div>




    <RouterView />

</template>