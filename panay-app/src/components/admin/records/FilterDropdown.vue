<script>

export default {
    data() {
        return {
            selectedItem: '',
            linkList: false
        }
    },
    props: {
        placeholder: String,
        options: Object,
        isLinkList: Boolean
    },

    mounted() {
        if (this.isLinkList)
            this.linkList = this.isLinkList;

        if (this.placeholder)
            this.placeholderText = this.placeholder;
    },

    methods: {
        updateSelected(option) {
            this.selectedItem = option.title;
        }
    }
    
}
</script>

<template>
    <div class="dropdown"> 
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ selectedItem }}
        </button>


        
        <ul class="dropdown-menu">
            <!-- makes items Router Links if linkList is true-->
            <li v-if="linkList" v-for="option in options">
                <RouterLink class="dropdown-item" :to=option.path @click="updateSelected(option)">{{option.title}}</RouterLink>
            </li>

            <li v-else v-for="option in options">
                <a href="">{{option.title}}</a>
            </li>
        </ul>
    </div>
</template>