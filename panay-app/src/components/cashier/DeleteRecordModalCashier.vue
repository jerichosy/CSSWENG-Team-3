<script>

export default {
    props: {
        recordType: String,
        selectedRecord: Object
    },
    methods: {
        deleteRecord() {
            let data = { id: this.selectedRecord._id };
            this.$emit('deleteRecord', data);
        }
    }
}

</script>

<template>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <form @submit.prevent="deleteRecord">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteModalLabel">
                            Confirm deletion
                        </h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            Are you sure you want to delete this record?
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="reset" class="btn btn-cancel" data-bs-target="#editModal"
                            data-bs-toggle="modal">Cancel</button>
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>