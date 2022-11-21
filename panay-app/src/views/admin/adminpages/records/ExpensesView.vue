<script>
import FilterMenu from '../../../../components/admin/records/FilterMenu.vue'

export default {
    components: {
        FilterMenu
    }
}
</script>
<template>

<div class="row m-0 p-2">
    <div class="col p-0 m-0"> 
        <FilterMenu />
    </div>
</div>

<div class="table-responsive row m-0">
    <table class="table table-striped table-sm">
        <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Item Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
                <th scope="col">Branch</th>
                <th scope="col">Notes</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <!-- <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr>
            <tr>
                <td>2022/01/01</td>
                <td>Lorem ipsum dolor sit egestas.</td>
                <td>₱9,999,999,999.99</td>
                <td>Bakery Items</td>
                <td>Lorem ipsum dolor sit vivamus.</td>
                <td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus turpis risus, varius sed efficitur.</td>
            </tr> -->

        </tbody>
    </table>
</div>

</template>