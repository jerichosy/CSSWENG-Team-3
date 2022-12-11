<script>
import RecordItem from '../../components/cashier/RecordItem.vue'

export default {
    components: {
        RecordItem
    }
}
</script>

<template>
    <div id="expenses-container" class="container">
        <div class="row justify-content-center p-2">
            <div class="col my-auto">
                <h1>Expenses</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Expenses: P1,400.00</p>
            </div>
            <div class="col my-auto text-end">
                <button class="btn btn-primary">Add</button>
            </div>
        </div>

        <div class="row-cols-1 m-1 justify-content-center">
            <RecordItem record-type="expenses" />
            <RecordItem record-type="expenses" />
            <RecordItem record-type="expenses" />
        </div>

    </div>
</template>