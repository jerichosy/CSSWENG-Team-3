<script>
import FilterMenu from '../../../../components/admin/records/FilterMenu.vue'

export default {
    data(){
        return {
            salesRecords: [
                {
                    date: '2022-03-04',
                    time: '08:00',
                    amount: 1200.05,
                    customerCount: 10,
                    branch: 'Paligsahan'
                },
                {
                    date: '2022-02-03',
                    time: '09:00',
                    amount: 1300.00,
                    customerCount: 12,
                    branch: 'Paligsahan'
                },
                {
                    date: '2022-01-02',
                    time: '21:00',
                    amount: 1300.00,
                    customerCount: 12,
                    branch: 'Makati'
                }
            ],
            filters: {
                dateFrom: '',
                dateTo: '',
                timeFrom: '',
                timeTo: '',
                itemSearch: '',
                checkedBranches: [],
                checkedCategories: []
            }
        }
    },

    computed: {
        filteredSales() {
            let filteredSalesRecords = this.salesRecords

            if (this.filters.checkedBranches.length) {
                filteredSalesRecords =  filteredSalesRecords.filter(record => record.branch === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branch)])
            }

            if (this.filters.dateFrom.length && this.filters.dateTo.length) {
                filteredSalesRecords = filteredSalesRecords.filter( (record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))
                filteredSalesRecords = filteredSalesRecords.filter( (record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))
            }

            if (this.filters.timeFrom.length && this.filters.timeTo.length) {
                filteredSalesRecords = filteredSalesRecords.filter( (record) => this.parseStartTime(this.filters.timeFrom, record))
                filteredSalesRecords = filteredSalesRecords.filter( (record) => this.parseEndTime(this.filters.timeTo, record))
            }

            return filteredSalesRecords
        }
    },
    components: {
        FilterMenu
    },

    methods: {
        formatDate(date) {
            return date.replace(/-/g, '/' )
        },
        formatTime(time) {
            if (time) {
                return new Date('1970-01-01T' + time + 'Z')
                .toLocaleTimeString('en-US',
                    {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'}
                );
            }
        },

        parseStartTime(startTime, record) {
            const startDate = new Date('1970-01-01T' + startTime + ':00')
            const recordDate = new Date('1970-01-01T' + record.time + ':00')

            if (Date.parse(recordDate) >= Date.parse(startDate))
                return true
            return false
        },

        parseEndTime(endTime, record) {
            const endDate = new Date('1970-01-01T' + endTime + ':00')
            const recordDate = new Date('1970-01-01T' + record.time + ':00')

            if (Date.parse(recordDate) <= Date.parse(endDate))
                return true
            return false
        },

        checkIfFiltersEmpty: (x) => {
            x.length
        }
    }
}
</script>

<template>

<div class="row m-0 p-2">
    <div class="col p-0 m-0"> 
        <FilterMenu @update-filters="(newFilter) => this.filters = newFilter"/>
    </div>
</div>

<div class="table-responsive row m-0">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Amount</th>
                <th scope="col">Customer Count</th>
                <th scope="col">Branch</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="record in filteredSales">
                <td>{{this.formatDate(record.date)}}</td>
                <td>{{this.formatTime(record.time)}}</td>
                <td>₱{{record.amount.toFixed(2).toLocaleString('en-US')}}</td>
                <td>{{record.customerCount}}</td>
                <td>{{record.branch}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>