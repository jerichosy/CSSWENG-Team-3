<script>
import FilterCheckboxDropdown from './FilterCheckboxDropdown.vue';

export default {
    data() {
        return {
            dateFrom: '',
            dateTo: '',
            timeFrom: '',
            timeTo: '',
            checkedBranches: [],
            checkedCategories: [],
            itemSearch: ''
        }
    },

    props: {
        branchOptions: {type: Array},
        categoryOptions: {type: Array}
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
        },

        filterRows() {
            let startDate = this.localizeDate(this.startDate)
            let endDate = this.localizeDate(this.endDate)
        }
    },
    
    methods: {
        localizeDate(date) {
            if (!date || !date.includes('-')) return date
            const [yyyy, mm, dd] = date.split('-')
            return new Date(`${yyyy}/${mm}/${dd}`)
        }
    }
}
</script>

<template>
    <div class="collapse" id="filterForm" v-if="isSales">
        <div class="card card-body">
            <fieldset>
                <legend>Date Range</legend>
                <label for="date-from">From</label> <input type="date" name="date-from" id="date-from" v-model="dateFrom">
                <label for="date-to">To</label> <input type="date" name="date-to" id="date-to" v-model="dateTo">
                <p>{{startDate}} {{endDate}}</p>
            </fieldset>
            <fieldset>
                <legend>Time Range</legend>
                <label for="time-from">From</label> <input type="time" name="time-from" id="time-from" v-model="timeFrom" >
                <label for="time-to">To</label> <input type="time" name="time-to" id="time-to" v-model="timeTo" >
            </fieldset>
            <fieldset>
                <legend>Branches</legend>
                <div v-for="branch in branchOptions">
                    <input type="checkbox" name="branches" :id="branch.branchName.toLowerCase()" :value="branch.branchName" v-model="checkedBranches" />
                    <label :for="branch.branchName.toLowerCase()">{{branch.branchName}}</label>
                </div>
            </fieldset>
        </div>
    </div>

    <div class="collapse" id="filterForm" v-if="isExpenses">
        <div class="card card-body">
            
            <label for="item-search">Item Search</label> <input id="item-search" type="text" v-model="itemSearch">
            <fieldset>
                <legend>Date Range</legend>
                <label for="date-from">From</label> <input id="date-from" type="date" v-model="dateFrom">
                <label for="date-to">To</label> <input id="date-to" type="date" v-model="dateTo">
            </fieldset>
            
            <FilterCheckboxDropdown filter-item-single="branch"
                                    filter-item-plural="branches"
                                    :options="this.branchOptions"
                />

            <FilterCheckboxDropdown filter-item-single="category"
                                filter-item-plural="categories"
                                :options="this.categoryOptions"
            />
        </div>
    </div>


</template>