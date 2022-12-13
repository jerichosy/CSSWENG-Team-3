<script>
import RecordService from '../../services/RecordService';
export default {
    emits: ['submitRecords'],

    methods: {
        submitRecords() {
            this.$emit('submitRecords');
        }
    }
}
</script>

<template>
    <div class="modal fade" id="submitModal" tabindex="-1" aria-labelledby="submitModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form @submit="submitRecords">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="submitModalLabel">
                            Submit Records
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Please ensure all records are correct before submitting.
                    </div>
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-cancel" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

