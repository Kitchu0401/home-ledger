<template>
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-info">Record date</a>
    <Record />
  </div>
</template>

<script>
import Record from './Record.vue';

export default {
  name: 'RecordDayGroup',
  components: {
    Record
  },
  created () {

  },
  data () {
      return {

      };
  }
};
</script>