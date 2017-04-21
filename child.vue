<template>
    <h3>{{ message }}</h3>
</template>

<script>
    export default {
        props: ['message'],
        methods: {
            sendMessage() {
                this.$emit('alert')
            }
        }
    } 
</script>