<template>
    <children-component 
        message="data"
        v-on:alert="alertMessage"/>
</template>

<script>
    export default {
        methods: {
            alertMessage() {
                alert('Hi!');
            }
        }
    }
</script>