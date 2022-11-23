<script>
import FilterMenu from '../../../../components/admin/records/FilterMenu.vue'

export default {
    data(){
        return {
            salesRecords: [
                {
                    date: '2022-03-04',
                    time: '08:00',
                    amount: 1200.00,
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
            console.log('filtering')
            let filteredSalesRecords = this.salesRecords

            if (this.filters.checkedBranches.length) {
                filteredSalesRecords =  filteredSalesRecords.filter(record => record.branch === this.filters.checkedBranches[this.filters.checkedBranches.indexOf(record.branch)])
            }

            if (this.filters.dateFrom.length && this.filters.dateTo.length) {
                filteredSalesRecords = filteredSalesRecords.filter( (record) => Date.parse(record.date) >= Date.parse(this.filters.dateFrom))
                filteredSalesRecords = filteredSalesRecords.filter( (record) => Date.parse(record.date) <= Date.parse(this.filters.dateTo))
                
            }

            if (this.filters.timeFrom.length && this.filters.timeTo.length) {
                // not working yet
                // console.log(Date.parse(this.formatTime(this.filters.timeFrom)))
                // filteredSalesRecords = filteredSalesRecords.filter( (record) => Date.parse(record.time) >= Date.parse(this.filters.timeFrom))
                // filteredSalesRecords = filteredSalesRecords.filter( (record) => Date.parse(record.time) >= Date.parse(this.filters.timeTo))
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
        <p>{{this.filters}}</p>
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
                <td>{{record.date}}</td>
                <td>{{record.time}}</td>
                <td>P{{record.amount}}</td>
                <td>{{record.customerCount}}</td>
                <td>{{record.branch}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>