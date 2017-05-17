<template>
  <div v-on:click="toggleShow">
    <div class="btn-group btn-group-justified" role="group">현 시각 미세먼지 농도<div>
    <br/>
    <table id="dustForecastMap" class="table table-bordered" v-show="show">
      <tbody>
        
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'dustForecast',
  created () {
    
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    toggleShow () {
      this.show = !this.show
    }
  }
}
</script>

<style>

</style>
