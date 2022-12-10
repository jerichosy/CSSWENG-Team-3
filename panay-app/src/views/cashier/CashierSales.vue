<script>
import RecordItem from '../../components/cashier/RecordItem.vue'

export default {
    components: {
        RecordItem
    }
}
</script>

<template>
    <div id="sales-container" class="container">
        <div class="row justify-content-center p-2">
            <div class="col my-auto">
                <h1>Sales</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Sales: P1,400.00</p>
            </div>
            <div class="col my-auto text-end">
                <button class="btn btn-primary">Add</button>
            </div>
        </div>

        <div class="row-cols-1 m-1 justify-content-center">
            <RecordItem record-type="sales" />
            <RecordItem record-type="sales" />
            <RecordItem record-type="sales" />
        </div>

    </div>
</template>