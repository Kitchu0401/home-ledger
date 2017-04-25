<template>
  <div>
    <ReceiptDayGroup
      v-for="receiptGroup in receiptList"
      v-bind:key="receiptGroup.date"
      v-bind:receiptGroup="receiptGroup" />
  </div>
</template>

<script>
import ReceiptDayGroup from './ReceiptDayGroup.vue';

export default {
  name: 'ReceiptList',
  components: {
    ReceiptDayGroup
  },
  props: ['receiptList'],
  created () {

  },
  data () {
    return {
      
    };
  }
};
</script>