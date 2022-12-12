<script>

export default {

    props: {
        recordType: String,
        record: Object,
        currentTotal: Number
    },

    computed: {
        computedCustomerCount() {
            if (this.record.customerCount === null) {
                return '--';
            }
            else {
                return this.record.customerCount;
            }
        },

        computedTime() {
            const time = this.record.datetime.split('T')[1].split('.')[0].slice(0, -3)
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
                        <div class="col h4 text-sale">
                            <strong>₱{{ record.amount.toFixed(2) }}</strong>
                        </div>
                        <div class="col h6 text-sale">
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
                            {{ record.category }}
                        </div>
                        <div class="col h6">
                            {{ record.item }}
                        </div>
                        <div class="col h6">
                            {{ record.notes }}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row-cols-1 text-end">
                        <div class="col h4 text-expense">
                            <strong>₱{{ record.amount.toFixed(2) }}</strong>
                        </div>
                        <div class="col h6 text-expense">
                            <slot name="runningTotal">
                                (₱ 0.00)
                            </slot>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>

</template>

<style scoped>

</style>