<script>
export default {
    inheritAttrs: false,
    data() {
        return {
            currentTime: new Date()
        }

    }

}
</script>

<template>
    <div class="container">
        <div class="card mt-5">
            <div class="card-body">
                <div class="text-primary">
                    <h1 class="card-title">Panay Avenue Paligsahan QC</h1>
                    <h2>Branch ID: 101</h2>
                </div>
                {{ currentTime }}
            </div>
            <div class="card-footer">
                <RouterLink to="/login">
                    <button class="btn btn-danger">Logout</button>
                </RouterLink>

            </div>

        </div>
    </div>
</template>