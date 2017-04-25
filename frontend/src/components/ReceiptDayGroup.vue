<template>
  <div class="list-group">
    <a href="#" class="list-group-item list-group-item-info">
      {{ receiptGroup.date }}
      <span class="pull-right">{{ receiptGroup.totalAmount }}</span>
    </a>
    <Receipt
      v-for="receipt in receiptGroup.receipts"
      v-bind:key="receipt.id"
      v-bind:receipt="receipt" />
  </div>
</template>

<script>
import Receipt from './Receipt.vue';

export default {
  name: 'ReceiptDayGroup',
  components: {
    Receipt
  },
  props: ['receiptGroup'],
  created () {
    console.debug(this.receiptGroup)
  },
  data () {
    return {

    };
  }
};
</script>