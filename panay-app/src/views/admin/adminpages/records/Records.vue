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
    <div class="row p-0 m-0">
        <ul class="nav nav-tabs bg-primary">
            <li class="nav-item">
                <RouterLink class="nav-link" :class="{ active: $route.name === 'sales'}" to="sales">Sales</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" :class="{ active: $route.name === 'expenses'}" to="expenses">Expenses</RouterLink>
            </li>
        </ul>
    </div>

    <div class="row container p-0 m-0">
        <RouterView />
    </div>

    <!-- <div class="row">
        <FilterDropdown class="col-2" :is-link-list="true" 
                :options="this.pageOptions"
                :placeholder='currentPage' />
        

    </div>

    <FilterMenu />



    <RouterView /> -->

</template>