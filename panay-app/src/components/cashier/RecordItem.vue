<script>

export default {

    props: {
        recordType: String,
        record: Object,
        currentTotal: Number
    },

    data() {
        return {
            salesRecord: {
                branchID: this.record.branchID,
                branchName: this.record.branchName,
                amount: this.record.amount,
                customerCount: this.record.customerCount,
                datetime: this.record.datetime
            }
        }
    },

    computed: {
        computedCustomerCount() {
            if (this.salesRecord.customerCount === null) {
                return '--';
            }
            else {
                return this.salesRecord.customerCount;
            }
        },

        computedTime() {
            const time = this.salesRecord.datetime.split('T')[1].split('.')[0].slice(0, -3)
            return new Date('1970-01-01T' + time + 'Z')
                .toLocaleTimeString('en-US',
                    { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
                );
        }
    }
}
</script>

<template>
    <div class="col mb-2 border border-1 border-primary bg-white">
        <div class="row p-2">

            <template v-if="recordType === 'sales'">
                <div class="col">
                    <div class="row-cols-1 text-start">
                        <div class="col h4">
                            {{ computedTime }}
                        </div>
                        <div class="col h6">
                            Customer Count: {{ computedCustomerCount }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row-cols-1 text-end">
                        <div class="col h4">
                            ₱{{ salesRecord.amount.toFixed(2) }}
                        </div>
                        <div class="col h6">
                            <slot name="runningTotal">
                                (₱ 0.00)
                            </slot>
                        </div>
                    </div>
                </div>
            </template>

            <template v-if="recordType === 'expenses'">
                <div class="col">
                    <div class="row-cols-1 text-start">
                        <div class="col h4">
                            Category
                        </div>
                        <div class="col h6">
                            Item Name
                        </div>
                        <div class="col h6">
                            Description
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row-cols-1 text-end">
                        <div class="col h4">
                            P500.00
                        </div>
                        <div class="col h6">
                            (P500.00)
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

</template>

<style scoped>

</style>