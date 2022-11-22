<script>
import FilterMenu from '../../../../components/admin/records/FilterMenu.vue'

export default {
    data(){
        return {
            salesRecords: [
                {
                    date: '2022/01/01',
                    time: '08:00 AM',
                    amount: 1200.00,
                    customerCount: 10,
                    branch: 'Paligsahan'
                },
                {
                    date: '2022/01/01',
                    time: '09:00 AM',
                    amount: 1300.00,
                    customerCount: 12,
                    branch: 'Paligsahan'
                },
                {
                    date: '2022/01/02',
                    time: '09:00 AM',
                    amount: 1300.00,
                    customerCount: 12,
                    branch: 'Makati'
                }
            ],
            filters: {}
        }
    },
    components: {
        FilterMenu
    }
}
</script>
<template>

<div class="row m-0 p-2">
    <div class="col p-0 m-0"> 
        <FilterMenu @update-filter="(newFilters) => this.filters = newFilters"
                    />
    </div>
    <p>{{filters}}</p>
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
            <tr v-for="record in salesRecords">
                <td>{{record.date}}</td>
                <td>{{record.time}}</td>
                <td>P{{record.amount}}</td>
                <td>{{record.customerCount}}</td>
                <td>{{record.branch}}</td>
            </tr>
            <!--<tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>08:00 PM</td>
                <td>P9,999,999,999.99</td>
                <td>9,999,999</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
            </tr> -->
        </tbody>
    </table>
</div>

</template>