<script>
import RecordItem from '../../components/cashier/RecordItem.vue'

export default {
    components: {
        RecordItem
    }
}
</script>

<template>
    <div id="review-container" class="container">
        <div class="row justify-content-center p-2">
            <div class="col my-auto">
                <h1>Review & Submit</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Sales: P1,400.00</p>
                <p class="h5 align-middle">Total Expenses: P1,400.00</p>

            </div>
            <div class="col my-auto text-end">
                <button class="btn btn-primary">Submit</button>
            </div>
        </div>


        <div class="row-cols-1 mb-5 justify-content-center">
            <h2>Sales</h2>
            <RecordItem record-type="sales" />
            <RecordItem record-type="sales" />
            <RecordItem record-type="sales" />
        </div>

        <div class="row-cols-1 justify-content-center">
            <h2>Expenses</h2>
            <RecordItem record-type="expenses" />
            <RecordItem record-type="expenses" />
            <RecordItem record-type="expenses" />
        </div>

    </div>
</template>