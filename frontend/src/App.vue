<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  },
  created () {

  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
