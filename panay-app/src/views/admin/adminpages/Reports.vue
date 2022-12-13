<script>
import RecordService from '../../../services/RecordService';
import UserService from '../../../services/UserService';

export default {
    data() {
        return {
            branchOptions: [],
            monthlyInputs: {
                branchName: '',
                date: ''
            },

            quarterlyInputs: {
                branchName: '',
                quarter: '',
                year: ''
            }
        }
    },

    methods: {
        submitMonthly() {
            const date = new Date(this.monthlyInputs.date);
            console.log(date)

            let matchedBranch = this.branchOptions.find(branch => {
                return branch.branchName === this.monthlyInputs.branchName;
            });

            let data = {
                branchID: matchedBranch.branchID,
                date: date
            }

            console.log(this.monthlyInputs.date)

            RecordService.generateMonthlyReport(data)
                .then((response) => {
                    // create file link in browser's memory
                    const href = URL.createObjectURL(response.data);

                    // create "a" HTML element with href to file & click
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', 'file.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                    // clean up "a" element & remove ObjectURL
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                })
                .catch(e => {
                    console.log(e.response);
                })
        },

        submitQuarterly() {
            const date = new Date(this.quarterlyInputs.year + '-' + this.quarterlyInputs.quarter);

            let matchedBranch = this.branchOptions.find(branch => {
                return branch.branchName === this.quarterlyInputs.branchName;
            });

            let data = {
                branchID: matchedBranch.branchID,
                date: date
            }

            RecordService.generateQuarterlyReport(data)
                .then((response) => {
                    // create file link in browser's memory
                    const href = URL.createObjectURL(response.data);

                    // create "a" HTML element with href to file & click
                    const link = document.createElement('a');
                    link.href = href;
                    link.setAttribute('download', 'file.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();

                    // clean up "a" element & remove ObjectURL
                    document.body.removeChild(link);
                    URL.revokeObjectURL(href);
                })
                .catch(e => {
                    console.log(e.response);
                });
        },

        retrieveBranches() {
            UserService.getBranches(new URLSearchParams([['showDeleted', true]]))
                .then(response => {
                    this.branchOptions = response.data;
                })
                .catch(e => {
                    console.log(e.response.data.msg);
                })
        }
    },

    mounted() {
        this.retrieveBranches();
    }
}
</script>

<template>
    <form @submit.prevent="submitMonthly">
        <div class="form-floating">
            <select class="form-select" id="select-branch" v-model="monthlyInputs.branchName">
                <template v-for="branch in branchOptions">
                    <option :value="branch.branchName">{{ branch.branchName }}</option>
                </template>
            </select>
            <label for="select-branch">Branch</label>
        </div>
        <div class="form-floating">
            <input type="month" class="form-control" id="select-date" v-model="monthlyInputs.date" />
            <label for="select-date">Date</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <form @submit.prevent="submitQuarterly">
        <div class="form-floating">
            <select class="form-select" id="select-branch-quarterly" v-model="quarterlyInputs.branchName">
                <template v-for="branch in branchOptions">
                    <option :value="branch.branchName">{{ branch.branchName }}</option>
                </template>
            </select>
            <label for="select-branch-quarterly">Branch</label>
        </div>

        <div class="form-floating">
            <select class="form-select" id="select-quarter" v-model="quarterlyInputs.quarter">
                <option value="01-01">Q1</option>
                <option value="04-01">Q2</option>
                <option value="07-01">Q3</option>
                <option value="10-01">Q4</option>
            </select>
            <label for="select-quarter">Quarter</label>
        </div>

        <div class="form-floating">
            <select class="form-select" id="select-year" v-model="quarterlyInputs.year">
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
            </select>
            <label for="select-year">Year</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>

</template>