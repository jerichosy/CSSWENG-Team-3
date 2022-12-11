<script>

export default {
    props: {
        recordType: String
    },

    mounted() {
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
                            06:00 AM
                        </div>
                        <div class="col h6">
                            Customer Count --
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row-cols-1 text-end">
                        <div class="col h4">
                            P1,400.00
                        </div>
                        <div class="col h6">
                            (P1,400.00)
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