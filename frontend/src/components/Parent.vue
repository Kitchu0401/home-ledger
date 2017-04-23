<template>
    <div>
        <h1>[Test] Parent Component</h1>
        <Child v-bind:message="message" v-on:alert="alertMessage"></Child>
    </div>
</template>

<script>
import Child from './Child.vue'

export default {
    data: () => {
        return {
            message: 'test!'
        };
    },
    components: {
        Child
    },
    methods: {
        alertMessage() {
            alert('Hi!');
        }
    }
}
</script>