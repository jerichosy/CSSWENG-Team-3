<script>

export default {

    data(){
        return {
            buttonText: null,
            checkedOptions: [],
            numberSelected: 0,
            filterItemTextSingle: '',
            filterItemTextPlural: '',

        }
    },

    props: {
        placeholder: String,
        options: Object,
        filterItemSingle: String,
        filterItemPlural: String
    },

    mounted() {
        if (this.placeholder)
            this.placeholderText = this.placeholder;

        if (this.filterItemSingle)
            this.filterItemTextSingle = this.filterItemSingle

        if (this.filterItemPlural)
            this.filterItemTextPlural = this.filterItemPlural
    },

    computed: {
        filterLabel() {
            if (this.filterItemSingle && this.numberSelected ==1 )
                return this.numberSelected.toString() + ' ' + this.filterItemTextSingle + ' ' + 'selected';
            else if (this.filterItemPlural && this.numberSelected > 1 || this.filterItemPlural && this.numberSelected == 0)
                return this.numberSelected.toString() + ' ' + this.filterItemTextPlural + ' ' + 'selected';
        }
    },

    methods: {
        updateNumberSelected() {
            this.numberSelected = this.checkedOptions.length;
        }
    }
}
</script>

<template>
    <div class="dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
            <span>{{ filterLabel }}</span>
        </button>

        <div class="dropdown-menu form-check">
            <div v-for="option in options">
                <input class="btn-check" type="checkbox" @change="updateNumberSelected" :id="option.title" :value="option.title" v-model="checkedOptions">
                <label class="btn btn-outline-primary" :for="option.title">{{option.title}}</label>
            </div>
        </div>

    </div>

</template>