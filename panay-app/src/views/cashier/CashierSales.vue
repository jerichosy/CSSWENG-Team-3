<script>
import RecordItem from '../../components/cashier/RecordItem.vue';
import AddRecordModalCashier from '../../components/cashier/AddRecordModalCashier.vue';
import EditRecordModalCashier from '../../components/cashier/EditRecordModalCashier.vue';
import RecordService from '../../services/RecordService';
import DeleteRecordModalCashier from '../../components/cashier/DeleteRecordModalCashier.vue'

export default {
    inheritAttrs: false,
    components: {
        RecordItem,
        AddRecordModalCashier,
        EditRecordModalCashier,
        DeleteRecordModalCashier
    },
    inject: {
        cashierSales: {
            from: 'cashierSales'
        }
    },
    emits: ['retrieveSales', 'closeDeleteModal'],

    data() {
        return {
            selectedSales: {}
        }
    },

    computed: {

        sortedSales: function () {
            let sales = this.cashierSales;
            return sales.sort((a, b) => {
                let modifier = -1;
                if (a['datetime'] === undefined) return 1;
                if (b['datetime'] === undefined) return -1
                if (a['datetime'] < b['datetime']) return -1 * modifier;
                if (a['datetime'] > b['datetime']) return 1 * modifier;
                return 0
            })
        },

        runningTotal: function () {
            let tempTotal = this.totalSales;
            let first = true;
            return this.sortedSales.map((sales) => {
                if (first) {
                    const firstTotal = tempTotal;
                    tempTotal -= sales.amount;
                    return firstTotal;
                }
                return tempTotal -= sales.amount;
            });
        },

        totalSales: function () {
            return this.cashierSales.reduce((accumulator, currentValue) =>
                accumulator + currentValue.amount, 0
            );
        },
    },

    methods: {
        selectRecord(record) {
            this.selectedSales = record;
        },

        editSales(data) {
            RecordService.editCashierSales(data)
                .then(response => {
                    this.$emit('retrieveSales');
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e.response.data);
                })
        },

        deleteSales(data) {
            RecordService.deleteCashierSales(data)
                .then(response => {
                    this.$emit('retrieveSales');
                    this.$emit('closeDeleteModal');
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e.response.data);
                })
        }
    },

    mounted() {
        const editModalEl = document.getElementById('editModal');

        // Reset all fields and component data when modal is hidden
        editModalEl.addEventListener('hidden.bs.modal', event => {
            // this.selectedSales = {};
        });
    }
}
</script>

<template>
    <AddRecordModalCashier record-type="sales" @retrieve-sales="this.$emit('retrieveSales')" />
    <EditRecordModalCashier record-type="sales" :selected-record="selectedSales" @edit-sales="editSales" />
    <DeleteRecordModalCashier :selected-record="selectedSales" @delete-record="deleteSales" />
    <div id="sales-container" class="container">
        <div class="row justify-content-center bg-bgdefault p-2 sticky-top">
            <div class="col my-auto">
                <h1>Sales</h1>
            </div>
            <div class="col text-center my-auto">
                <p class="h5 align-middle">Total Sales: <span class="text-sale">₱{{ totalSales.toFixed(2) }}</span></p>
            </div>
            <div class="col my-auto text-end">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#addModal">Add</button>
            </div>
        </div>
        <div class="row-cols-1 m-1 justify-content-center">
            <template v-for="(sales, index) in sortedSales">
                <RecordItem record-type="sales" :record="sales" @select-record="selectRecord">
                    <template #runningTotal>
                        (₱{{ runningTotal[index].toFixed(2) }})
                    </template>
                </RecordItem>
            </template>

        </div>

    </div>
</template>