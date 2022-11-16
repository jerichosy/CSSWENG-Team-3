<script>

export default {
    data() {
        return {
            placeholderText: 'Select',
            selectedItem: '',
            linkList: false,
            type: ''
        }
    },
    props: {
        placeholder: String,
        options: Object,
        isLinkList: Boolean,
        dropdownType: String
    },

    mounted() {
        if (this.isLinkList)
            this.linkList = this.isLinkList;

        if (this.placeholder)
            this.placeholderText = this.placeholder;

        if (this.dropdownType)
            this.type = this.dropdownType;
        else
            this.type = 'list'
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
            <span v-if="selectedItem !== ''">{{ selectedItem }}</span>
            <span v-if="selectedItem === ''">{{ placeholderText }}</span>
        </button>


        
        <ul v-if="this.type === 'list'" class="dropdown-menu">
            <!-- makes items Router Links if linkList is true-->
            <li v-if="linkList" v-for="option in options">
                <RouterLink class="dropdown-item" :to=option.path @click="updateSelected(option)">{{option.title}}</RouterLink>
            </li>

            <li v-else v-for="option in options">
                <a class="dropdown-item" :to=option.path @click="updateSelected(option)" >{{option.title}}</a>
            </li>
        </ul>

        <ul v-if="this.type === 'date'" class="dropdown-menu">
            <!-- makes items Router Links if linkList is true-->
            <li>
                <form>
                    <input type="date">
                    <input type="date">
                </form>
            </li>
        </ul>

        <ul v-if="this.type === 'time'" class="dropdown-menu">
            <!-- makes items Router Links if linkList is true-->
            <li>
                <form>
                    <input type="time">
                    <input type="time">
                </form>
            </li>
        </ul>
    </div>
</template>